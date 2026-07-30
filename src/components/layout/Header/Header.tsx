import { memo, useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HeaderActions } from './HeaderActions';
import { Logo } from './Logo';
import { MobileNavigation } from './MobileNavigation';
import { SearchBar } from './SearchBar';
import { CATEGORIES, INTENTIONS, PRODUCTS } from './data';
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
  const navigate = useNavigate();
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
                navigate('/');
                scrollToTop();
              }}
              className="group flex cursor-pointer items-center gap-3 rounded-full transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
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

          <div className="hidden items-center gap-2 xl:flex">
            <div className="relative group">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
              >
                Category
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
              <div className="invisible absolute left-0 top-full z-30 mt-0 min-w-[18rem] overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)] opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                {CATEGORIES.filter((category) => category.id !== 'all').map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category.id);
                      navigate(`/category/${category.id}`);
                    }}
                    className="w-full cursor-pointer rounded-full px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
              >
                Intention
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
              <div className="invisible absolute left-0 top-full z-30 -mt-px min-w-[18rem] overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)] opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                {INTENTIONS.map((intention) => (
                  <button
                    key={intention.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      navigate(`/category/all?intent=${encodeURIComponent(intention.id)}`);
                    }}
                    className="w-full cursor-pointer rounded-full px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    {intention.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
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

    </header>
  );
});
