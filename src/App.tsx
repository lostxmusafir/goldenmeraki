import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CartDrawer } from './components/layout/CartDrawer';
import { CategoryPage } from './pages/CategoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { PageLoader } from './components/common/PageLoader';
import type { CartItem } from './types/cart';
import type { Product } from './types/product';
import { productSlug } from './utils/catalog';
import { AdminRoutes } from './admin/routes/AdminRoutes';

type ToastType = 'cart' | 'wishlist';

interface ToastMessage {
  type: ToastType;
  message: string;
}

interface AppShellProps {
  cartCount: number;
  wishlistCount: number;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenQuiz: () => void;
  onOpenBuilder: () => void;
  onOpenCanvas: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onToggleWishlist: (productId: string, productName?: string) => void;
  wishlist: string[];
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart?: () => void;
}

function HomeRoute(props: AppShellProps) {
  return <HomePage {...props} />;
}

function CategoryRoute(props: AppShellProps) {
  const { slug = 'all' } = useParams();
  return <CategoryPage {...props} slug={slug} />;
}

function ProductRoute(props: AppShellProps) {
  const { slug = '' } = useParams();
  return <ProductPage {...props} slug={slug} />;
}

function CartRoute(props: AppShellProps) {
  return <CartPage {...props} />;
}

function CheckoutRoute(props: AppShellProps) {
  return <CheckoutPage {...props} />;
}

function ThankYouRoute(props: AppShellProps) {
  return <ThankYouPage {...props} />;
}

export function App() {
  const navigate = useNavigate();
  const location = useLocation();


  const [isAppLoading, setIsAppLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    // Show the splash screen loader for 3.5 seconds on every app load
    const timer = setTimeout(() => setIsAppLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const pathCategory = location.pathname.startsWith('/category/')
      ? location.pathname.split('/category/')[1]?.split('/')[0]
      : 'all';

    setSelectedCategory(pathCategory || 'all');
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (product: Product, quantityToAdd = 1) => {
    const availableStock = Number(product.stock ?? 10);
    let limitReached = false;
    let addedQty = quantityToAdd;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.selectedWidthSize === product.selectedWidthSize,
      );

      const existingQty = existing ? existing.quantity : 0;
      const desiredQty = existingQty + quantityToAdd;

      if (desiredQty > availableStock) {
        limitReached = true;
        const addable = Math.max(0, availableStock - existingQty);
        addedQty = addable;

        if (existing) {
          return prev.map((item) =>
            item.id === product.id && item.selectedWidthSize === product.selectedWidthSize
              ? { ...item, quantity: availableStock, stock: availableStock }
              : item,
          );
        }
        if (addable > 0) {
          return [...prev, { ...product, quantity: addable, stock: availableStock }];
        }
        return prev;
      }

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedWidthSize === product.selectedWidthSize
            ? { ...item, quantity: desiredQty, stock: availableStock }
            : item,
        );
      }

      return [...prev, { ...product, quantity: quantityToAdd, stock: availableStock }];
    });

    const sizeSuffix = product.selectedWidthSize ? ` (${product.selectedWidthSize})` : '';
    if (limitReached) {
      setToast({
        type: 'cart',
        message: addedQty > 0
          ? `Only ${availableStock} in stock. Added ${addedQty} x ${product.name}${sizeSuffix} to cart.`
          : `Cannot add more. Maximum available stock (${availableStock}) already in cart.`,
      });
    } else {
      setToast({ type: 'cart', message: `Added ${quantityToAdd} x ${product.name}${sizeSuffix} to cart.` });
    }
    setIsCartDrawerOpen(true);
  };

  const handleBuyNow = (product: Product, quantityToAdd = 1) => {
    handleAddToCart(product, quantityToAdd);
    navigate('/checkout');
  };

  const handleUpdateQuantity = (productId: string, quantity: number, selectedWidthSize?: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        const isMatch = item.id === productId && (selectedWidthSize ? item.selectedWidthSize === selectedWidthSize : true);
        if (isMatch) {
          const maxStock = Number(item.stock ?? 10);
          if (quantity > maxStock) {
            setToast({
              type: 'cart',
              message: `Only ${maxStock} unit(s) available in stock.`,
            });
            return { ...item, quantity: maxStock };
          }
          return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      }),
    );
  };

  const handleRemoveItem = (productId: string, selectedWidthSize?: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && (selectedWidthSize ? item.selectedWidthSize === selectedWidthSize : true))),
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (productId: string, productName?: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];

      setToast({
        type: 'wishlist',
        message: exists ? 'Removed from wishlist.' : `Saved ${productName ?? 'item'} to wishlist.`
      });

      return next;
    });
  };

  const handleOpenWishlist = () => {
    navigate('/category/all');
  };

  const handleOpenAccount = () => {
    navigate('/checkout');
  };

  const handleOpenQuiz = () => {
    navigate('/category/raw-stones');
  };

  const handleOpenBuilder = () => {
    navigate('/category/bracelets');
  };

  const handleOpenCanvas = () => {
    navigate('/category/raw-stones');
  };

  const handleSelectProduct = (product: Product) => {
    navigate(`/product/${productSlug(product)}`);
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  const handlePlaceOrder = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const shellProps: AppShellProps = {
    cartCount,
    wishlistCount: wishlist.length,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    onOpenCart: () => setIsCartDrawerOpen(true),
    onOpenWishlist: handleOpenWishlist,
    onOpenAccount: handleOpenAccount,
    onOpenQuiz: handleOpenQuiz,
    onOpenBuilder: handleOpenBuilder,
    onOpenCanvas: handleOpenCanvas,
    onSelectProduct: handleSelectProduct,
    onAddToCart: handleAddToCart,
    onBuyNow: handleBuyNow,
    onToggleWishlist: handleToggleWishlist,
    wishlist,
    cartItems,
    onUpdateQuantity: handleUpdateQuantity,
    onRemoveItem: handleRemoveItem,
    onClearCart: handleClearCart,
  };

  useEffect(() => {
    if (!toast) return undefined;

    const timeout = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  if (location.pathname.startsWith('/admin')) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    );
  }

  if (isAppLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<HomeRoute {...shellProps} />} />
        <Route path="/category/:slug" element={<CategoryRoute {...shellProps} />} />
        <Route path="/product/:slug" element={<ProductRoute {...shellProps} />} />
        <Route path="/cart" element={<CartRoute {...shellProps} />} />
        <Route path="/checkout" element={<CheckoutRoute {...shellProps} />} />
        <Route path="/loader" element={<PageLoader />} />
        <Route path="/thank-you" element={<ThankYouRoute {...shellProps} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {toast ? (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
          {toast.message}
        </div>
      ) : null}

      <CartDrawer
        open={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onViewCart={handleViewCart}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}

export default App;
