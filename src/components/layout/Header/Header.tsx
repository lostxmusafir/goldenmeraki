import { MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PRODUCTS } from './data';
import { DesktopNav } from './DesktopNav';
import { HeaderActions } from './HeaderActions';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { SearchBar } from './SearchBar';
import type { HeaderProps } from './types';

export function Header(props: HeaderProps) {
  const {
    cartCount,
    wishlistCount,
    onOpenCart,
    onOpenWishlist,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    onOpenQuiz,
    onOpenBuilder,
    onOpenCanvas,
    onSelectProduct
  } = props;

  const [pincode, setPincode] = useState('400054');
  const [editingPincode, setEditingPincode] = useState(false);

  const products = useMemo(() => PRODUCTS, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-violet-100 shadow-sm">
      <div className="bg-slate-900 text-slate-200 text-[11px] font-semibold py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Certified Natural Healing Gemstones</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Deliver to: </span>
              {editingPincode ? (
                <input
                  type="text"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value)}
                  onBlur={() => setEditingPincode(false)}
                  className="w-16 px-1 py-0 bg-white text-indigo-950 rounded text-center font-bold text-xs"
                  autoFocus
                />
              ) : (
                <button onClick={() => setEditingPincode(true)} className="font-bold underline text-amber-300 hover:text-white">
                  {pincode} (Mumbai)
                </button>
              )}
            </div>

            <a href="tel:+919930000944" className="flex items-center space-x-1 hover:text-amber-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Support: <strong className="text-white">+91 99300 00944</strong>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <MobileNav
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onOpenQuiz={onOpenQuiz}
              onOpenBuilder={onOpenBuilder}
            />

            <div
              onClick={() => {
                setSelectedCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer"
            >
              <Logo />
            </div>
          </div>

          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} products={products} onSelectProduct={onSelectProduct} />

          <HeaderActions
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            onOpenCart={onOpenCart}
            onOpenWishlist={onOpenWishlist}
            onOpenQuiz={onOpenQuiz}
            onOpenBuilder={onOpenBuilder}
          />
        </div>
      </div>

      <DesktopNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenBuilder={onOpenBuilder}
        onOpenQuiz={onOpenQuiz}
      />

    </header>
  );
}
