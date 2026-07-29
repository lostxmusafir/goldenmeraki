import { Compass, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import type { HeaderActionsProps } from './types';

export function HeaderActions({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  onOpenBuilder
}: HeaderActionsProps) {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <button
        onClick={onOpenBuilder}
        className="hidden xl:flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-sm hover:shadow-md transition-all border border-amber-600/30 active:scale-95"
      >
        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
        <span>Design Bracelet</span>
      </button>

      <button
        onClick={onOpenQuiz}
        className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all border border-slate-800 active:scale-95"
      >
        <Compass className="w-3.5 h-3.5 text-emerald-400" />
        <span>Crystal Finder</span>
      </button>

      <button
        onClick={onOpenWishlist}
        className="p-2.5 rounded-xl bg-violet-50 text-indigo-950 hover:bg-violet-100 hover:text-pink-600 transition-all relative border border-violet-100"
        title="Saved Wishlist"
      >
        <Heart className="w-5 h-5" />
        {wishlistCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-pink-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
            {wishlistCount}
          </span>
        )}
      </button>

      <button
        onClick={onOpenCart}
        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-700 via-indigo-700 to-purple-800 hover:from-violet-600 hover:to-indigo-600 text-white font-extrabold text-xs shadow-md shadow-violet-200 transition-all border border-violet-600 group active:scale-95"
      >
        <ShoppingBag className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-black hidden sm:inline">Bag</span>
        <span className="bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-lg shadow-sm">
          {cartCount}
        </span>
      </button>
    </div>
  );
}

