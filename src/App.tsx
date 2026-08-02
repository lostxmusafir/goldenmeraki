import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CartDrawer } from './components/layout/CartDrawer';
import { CategoryPage } from './pages/CategoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { PRODUCTS } from './data/products';
import { PageLoader } from './components/common/PageLoader';
import type { CartItem } from './types/cart';
import type { Product } from './types/product';
import { productSlug } from './utils/catalog';

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
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
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

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const products = useMemo(() => PRODUCTS as Product[], []);

  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [routeVariant, setRouteVariant] = useState<'category' | 'product'>('category');
  const isFirstRender = useRef(true);

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
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (location.pathname.startsWith('/product/')) {
      setRouteVariant('product');
      setIsRouteLoading(true);
      const timer = setTimeout(() => setIsRouteLoading(false), 1200);
      return () => clearTimeout(timer);
    } else if (location.pathname.startsWith('/category/')) {
      setRouteVariant('category');
      setIsRouteLoading(true);
      const timer = setTimeout(() => setIsRouteLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

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

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setToast({ type: 'cart', message: `Added ${product.name} to cart.` });
    setIsCartDrawerOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    navigate('/checkout');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      const product = products.find((item) => item.id === productId);

      setToast({
        type: 'wishlist',
        message: exists ? 'Removed from wishlist.' : `Saved ${product?.name ?? 'item'} to wishlist.`
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
    onRemoveItem: handleRemoveItem
  };

  useEffect(() => {
    if (!toast) return undefined;

    const timeout = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  if (isAppLoading) {
    return <PageLoader variant="splash" />;
  }

  return (
    <div className="min-h-screen bg-white">
      {isRouteLoading && <PageLoader variant={routeVariant} />}
      <Routes>
        <Route path="/" element={<HomeRoute {...shellProps} />} />
        <Route path="/category/:slug" element={<CategoryRoute {...shellProps} />} />
        <Route path="/product/:slug" element={<ProductRoute {...shellProps} />} />
        <Route path="/cart" element={<CartRoute {...shellProps} />} />
        <Route path="/checkout" element={<CheckoutRoute {...shellProps} />} />
        <Route path="/loader" element={<PageLoader />} />
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
