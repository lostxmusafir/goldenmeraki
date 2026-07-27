import React from 'react';
import { Home, Grid, Sparkles, Heart, ShoppingBag } from 'lucide-react';

export const MobileBottomNav = ({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist,
  onOpenBuilder,
  onSelectCategory
}) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-t border-violet-100 py-2 px-4 shadow-2xl flex items-center justify-around text-[10px] font-bold text-indigo-950">
      
      {/* Home */}
      <button 
        type="button"
        onClick={() => {
          onSelectCategory('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex flex-col items-center space-y-1 text-violet-700 hover:text-violet-900 active:scale-95 transition-transform"
      >
        <Home className="w-5 h-5 text-violet-600" />
        <span>Home</span>
      </button>

      {/* Categories / Shop */}
      <button 
        type="button"
        onClick={() => {
          const elem = document.getElementById('catalog-section');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex flex-col items-center space-y-1 text-slate-600 hover:text-violet-700 active:scale-95 transition-transform"
      >
        <Grid className="w-5 h-5 text-slate-500" />
        <span>Shop</span>
      </button>

      {/* Custom Studio Center Floating Button */}
      <button 
        type="button"
        onClick={onOpenBuilder}
        className="flex flex-col items-center space-y-1 -mt-6 active:scale-95 transition-transform"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 text-indigo-950 flex items-center justify-center shadow-lg shadow-amber-300 border-2 border-white">
          <Sparkles className="w-6 h-6 text-white animate-pulse" />
        </div>
        <span className="text-amber-900 font-black text-[9px]">Custom</span>
      </button>

      {/* Wishlist */}
      <button 
        type="button"
        onClick={onOpenWishlist}
        className="flex flex-col items-center space-y-1 text-slate-600 hover:text-pink-600 active:scale-95 transition-transform relative"
      >
        <Heart className="w-5 h-5 text-slate-500" />
        <span>Wishlist</span>
        {wishlistCount > 0 && (
          <span className="absolute -top-1 right-1 bg-pink-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* Cart Bag */}
      <button 
        type="button"
        onClick={onOpenCart}
        className="flex flex-col items-center space-y-1 text-violet-700 active:scale-95 transition-transform relative"
      >
        <ShoppingBag className="w-5 h-5 text-violet-600" />
        <span>Bag</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 right-1 bg-amber-400 text-indigo-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

    </div>
  );
};
