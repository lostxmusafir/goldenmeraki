import { memo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { MAIN_NAVIGATION } from './navigation';
import { MegaMenu } from './MegaMenu';
import type { NavigationItem } from './navigation';
import type { Product } from '../../../types/product';

export interface DesktopNavigationProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenBuilder: () => void;
}

function scrollToCatalog() {
  const element = document.getElementById('catalog-section');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export const DesktopNavigation = memo(function DesktopNavigation({
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
  onOpenBuilder
}: DesktopNavigationProps) {
  const [activeMegaItem, setActiveMegaItem] = useState<NavigationItem | null>(null);

  const navigateToCategory = (categoryId?: string) => {
    if (categoryId) setSelectedCategory(categoryId);
    scrollToCatalog();
  };

  return (
    <>
      <nav className="hidden lg:block border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {MAIN_NAVIGATION.map((item) => {
              const isActive = item.type === 'category' && selectedCategory === item.categoryId;
              const isMegaActive = activeMegaItem?.label === item.label;

              if (item.type === 'mega') {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveMegaItem(item)}
                    onMouseLeave={() => setActiveMegaItem((current) => (current?.label === item.label ? null : current))}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveMegaItem((current) => (current?.label === item.label ? null : item))}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
                      aria-haspopup="menu"
                      aria-expanded={isMegaActive}
                    >
                      {item.label}
                      <ChevronRight className={`h-4 w-4 transition-transform ${isMegaActive ? 'rotate-90' : ''}`} />
                    </button>
                    {isMegaActive ? <MegaMenu item={item} onNavigateToSection={() => navigateToCategory('all')} /> : null}
                  </div>
                );
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigateToCategory(item.categoryId)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 ${
                    isActive
                      ? 'border-slate-950 bg-slate-950 text-white shadow-sm'
                      : 'border-transparent bg-transparent text-slate-700 hover:border-slate-200 hover:bg-white hover:text-slate-950'
                  }`}
                >
                  {item.icon ? <item.icon className="h-4 w-4" /> : null}
                  {item.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={onOpenBuilder}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition-all hover:border-amber-300 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
            >
              Crystal Finder & Studio
            </button>
          </div>
        </div>
      </nav>

      <nav className="hidden border-t border-slate-200/70 bg-white/90 md:block lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MAIN_NAVIGATION.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => navigateToCategory(item.categoryId)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-colors ${
                item.type === 'category' && selectedCategory === item.categoryId
                  ? 'border-slate-950 bg-slate-950 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {item.icon ? <item.icon className="h-3.5 w-3.5" /> : null}
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={onOpenBuilder}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 transition-colors hover:border-amber-300 hover:bg-amber-100"
          >
            Studio
          </button>
        </div>
      </nav>
    </>
  );
});

