import { memo, useEffect, useRef, useState } from 'react';
import { Menu, Search, X, ArrowRight, Heart, User, ShoppingBag } from 'lucide-react';
import { MAIN_NAVIGATION } from './navigation';
import type { Product } from '../../../types/product';

export interface MobileNavigationProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenBuilder: () => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

function scrollToCatalog() {
  const element = document.getElementById('catalog-section');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export const MobileNavigation = memo(function MobileNavigation({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
  onOpenBuilder,
  onSelectProduct,
  products
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    drawerRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeDrawer = () => setIsOpen(false);

  const onNavigate = (categoryId?: string) => {
    if (categoryId) setSelectedCategory(categoryId);
    closeDrawer();
    scrollToCatalog();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-sm transition-all hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        className={`fixed inset-0 z-[70] lg:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={closeDrawer}
          className={`absolute inset-0 bg-slate-950/45 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        <div
          ref={drawerRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute left-0 top-0 flex h-full w-[min(90vw,22rem)] flex-col border-r border-slate-200 bg-white shadow-[24px_0_60px_rgba(15,23,42,0.18)] transition-transform duration-300 ease-out focus-visible:outline-none ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Menu</div>
            <button
              type="button"
              onClick={closeDrawer}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
              aria-label="Close navigation menu"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="border-b border-slate-100 px-5 py-4">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products"
                aria-label="Search products"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:shadow-sm"
              />
            </label>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-2">
              {MAIN_NAVIGATION.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onNavigate(item.categoryId)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
                    item.type === 'category' && selectedCategory === item.categoryId
                      ? 'border-slate-950 bg-slate-950 text-white'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon ? <item.icon className="h-4.5 w-4.5" /> : null}
                    <span className="text-sm font-medium">{item.label}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  onOpenWishlist();
                }}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <Heart className="h-4.5 w-4.5" />
                  Wishlist
                </span>
                {wishlistCount > 0 ? <span className="rounded-full bg-slate-950 px-2 py-0.5 text-xs text-white">{wishlistCount}</span> : null}
              </button>

              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  onOpenCart();
                }}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag className="h-4.5 w-4.5" />
                  Cart
                </span>
                {cartCount > 0 ? <span className="rounded-full bg-slate-950 px-2 py-0.5 text-xs text-white">{cartCount}</span> : null}
              </button>

              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  onOpenBuilder();
                }}
                className="rounded-2xl bg-slate-950 px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Design your bracelet
              </button>

              <button
                type="button"
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
                aria-label="Account"
              >
                <User className="h-4.5 w-4.5" />
                Account
              </button>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="border-t border-slate-100 p-4">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Popular search</div>
              <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {products.slice(0, 4).map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      onSelectProduct(product);
                      closeDrawer();
                    }}
                    className="min-w-[10rem] rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm"
                  >
                    <img src={product.image} alt={product.name} className="mb-3 h-24 w-full rounded-xl object-cover" />
                    <div className="truncate text-sm font-medium text-slate-950">{product.name}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-950">₹{product.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
});

