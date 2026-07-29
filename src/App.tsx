import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/home/Hero';
import { Categories } from './components/home/Categories';
import { ProductCatalog } from './components/home/ProductCatalog';
import { ReviewsSection } from './components/home/ReviewsSection';
import { BlogSection } from './components/home/BlogSection';
import { Footer } from './components/layout/Footer/Footer';
import { AuraCanvas } from './components/effects/AuraCanvas';
import { ChakraQuiz } from './components/home/ChakraQuiz';
import { BraceletBuilder } from './components/home/BraceletBuilder';
import { ProductDetailModal } from './components/home/ProductDetailModal';
import { CartDrawer } from './components/layout/CartDrawer';
import { CheckoutModal } from './components/layout/CheckoutModal';
import { ToastNotification } from './components/ToastNotification';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { PRODUCTS } from './data/products';
import type { CartItem } from './types/cart';
import type { Product } from './types/product';

type ToastType = 'cart' | 'wishlist';

interface ToastMessage {
  type: ToastType;
  message: string;
}

export function App() {
  const products = PRODUCTS as Product[];

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { ...products[0], quantity: 1 } // Pyrite Cluster by default in cart
  ]);
  const [wishlist, setWishlist] = useState(['prod-2', 'prod-4']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal & Drawer States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Cart Operations
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setToast({
      type: 'cart',
      message: `✨ Added ${product.name} to bag!`
    });
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Operations
  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists
        ? prev.filter(id => id !== productId)
        : [...prev, productId];

      const product = products.find(p => p.id === productId);
      setToast({
        type: 'wishlist',
        message: exists
          ? `Removed from wishlist`
          : `💖 Saved ${product ? product.name : 'crystal'} to wishlist!`
      });

      return updated;
    });
  };

  const handleOpenWishlist = () => {
    if (wishlist.length === 0) {
      setToast({
        type: 'wishlist',
        message: 'Your wishlist is currently empty. Tap the heart on any crystal!'
      });
      return;
    }
    const elem = document.getElementById('catalog-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-violet-50/30 text-indigo-950 font-body flex flex-col justify-between selection:bg-cyan-200 selection:text-indigo-950 pb-16 sm:pb-0">
      
      {/* Header Navigation */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={handleOpenWishlist}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBuilder={() => setIsBuilderOpen(true)}
        onOpenCanvas={() => setIsCanvasOpen(true)}
        onSelectProduct={(p: Product) => setQuickViewProduct(p)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => {
            const elem = document.getElementById('catalog-section');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenBuilder={() => setIsBuilderOpen(true)}
          onOpenCanvas={() => setIsCanvasOpen(true)}
        />

        {/* Category Visual Grid */}
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Main Product Catalog */}
        <ProductCatalog
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(product: Product) => setQuickViewProduct(product)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

        {/* Customer Reviews & Social Proof */}
        <ReviewsSection />

        {/* Holistic Blog & Journal Guides */}
        <BlogSection />
      </main>

      {/* Footer & Store Locator */}
      <Footer
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBuilder={() => setIsBuilderOpen(true)}
        onOpenCanvas={() => setIsCanvasOpen(true)}
      />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={handleOpenWishlist}
        onOpenBuilder={() => setIsBuilderOpen(true)}
        onSelectCategory={setSelectedCategory}
      />

      {/* Modals & Drawers */}
      <AuraCanvas
        isOpen={isCanvasOpen}
        onClose={() => setIsCanvasOpen(false)}
      />

      <ChakraQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p: Product) => setQuickViewProduct(p)}
      />

      <BraceletBuilder
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        onAddCustomBracelet={handleAddToCart}
      />

      <ProductDetailModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}

export default App;
