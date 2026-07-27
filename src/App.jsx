import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { ProductCatalog } from './components/ProductCatalog';
import { ReviewsSection } from './components/ReviewsSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { AuraCanvas } from './components/AuraCanvas';
import { ChakraQuiz } from './components/ChakraQuiz';
import { BraceletBuilder } from './components/BraceletBuilder';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastNotification } from './components/ToastNotification';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PRODUCTS } from './data/products';

export function App() {
  const [cartItems, setCartItems] = useState([
    { ...PRODUCTS[0], quantity: 1 } // Pyrite Cluster by default in cart
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
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // Cart Operations
  const handleAddToCart = (product) => {
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

  const handleBuyNow = (product) => {
    handleAddToCart(product);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCartItems(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Operations
  const handleToggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists
        ? prev.filter(id => id !== productId)
        : [...prev, productId];

      const product = PRODUCTS.find(p => p.id === productId);
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
        onSelectProduct={(p) => setQuickViewProduct(p)}
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
          onQuickView={(product) => setQuickViewProduct(product)}
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
        onSelectProduct={(p) => setQuickViewProduct(p)}
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
