import { memo, useEffect, useMemo, useState } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { DesktopNavigation } from './DesktopNavigation';
import { HeaderActions } from './HeaderActions';
import { Logo } from './Logo';
import { MobileNavigation } from './MobileNavigation';
import { SearchBar } from './SearchBar';
import { PRODUCTS } from './data';
import type { HeaderProps } from './types';
import type { Product } from '../../../types/product';

function scrollToCatalog() {
  const element = document.getElementById('catalog-section');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export const Header = memo(function Header({
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
  onOpenAccount,
  onSelectProduct
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [products] = useState<Product[]>(() => PRODUCTS as Product[]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClassName = useMemo(
    () =>
      [
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'backdrop-blur-xl bg-white/88 shadow-[0_12px_32px_rgba(15,23,42,0.08)] border-b border-white/60'
          : 'bg-white/95 border-b border-slate-200/70'
      ].join(' '),
    [isScrolled]
  );

  return (
    <header className={headerClassName}>
      <AnnouncementBar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 py-3 lg:py-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <MobileNavigation
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              wishlistCount={wishlistCount}
              cartCount={cartCount}
              onOpenWishlist={onOpenWishlist}
              onOpenCart={onOpenCart}
              onOpenBuilder={onOpenBuilder}
              onSelectProduct={onSelectProduct}
              products={products}
            />

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                scrollToTop();
              }}
              className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
              aria-label="Go to home"
            >
              <Logo className="h-10 sm:h-11 lg:h-12" />
            </button>
          </div>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              products={products}
              onSelectProduct={onSelectProduct}
              className="w-full max-w-[34rem]"
            />
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                onOpenQuiz();
              }}
              className="hidden rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:text-slate-950 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 md:inline-flex"
            >
              Crystal Finder
            </button>

            <button
              type="button"
              onClick={onOpenBuilder}
              className="hidden rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:text-slate-950 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 xl:inline-flex"
            >
              Studio
            </button>

            <HeaderActions
              wishlistCount={wishlistCount}
              cartCount={cartCount}
              notificationCount={0}
              onOpenWishlist={onOpenWishlist}
              onOpenCart={onOpenCart}
              onOpenAccount={onOpenAccount}
              onOpenBuilder={onOpenBuilder}
            />
          </div>
        </div>
      </div>

      <DesktopNavigation
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSelectProduct={onSelectProduct}
      />
    </header>
  );
});
