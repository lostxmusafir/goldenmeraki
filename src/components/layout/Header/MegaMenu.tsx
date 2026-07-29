import { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import type { NavigationItem } from './navigation';

export interface MegaMenuProps {
  item: NavigationItem;
  onNavigateToSection: (categoryId?: string) => void;
}

export const MegaMenu = memo(function MegaMenu({ item, onNavigateToSection }: MegaMenuProps) {
  if (item.type !== 'mega') return null;

  return (
    <div className="absolute left-1/2 top-full z-50 mt-1 hidden w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 lg:block">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.16)]">
        <div className="grid grid-cols-[1.1fr_1.2fr_1fr_0.95fr] gap-0">
          <div className="space-y-4 border-r border-slate-100 bg-slate-950 p-6 text-white">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
              {item.featured?.label}
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-light tracking-tight text-white">{item.featured?.title}</h3>
              <p className="max-w-sm text-sm leading-6 text-slate-300">{item.featured?.description}</p>
            </div>
            {item.featured ? (
              <button
                type="button"
                onClick={() => onNavigateToSection()}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition-transform hover:translate-y-[-1px]"
              >
                Explore collection
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : null}
            {item.featured ? (
              <img
                src={item.featured.image}
                alt={item.featured.title}
                className="mt-auto aspect-[4/5] w-full rounded-[1.5rem] object-cover opacity-90"
              />
            ) : null}
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            {item.sections?.map((section) => (
              <div key={section.title} className="space-y-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{section.title}</div>
                <div className="grid gap-2">
                  {section.items.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => onNavigateToSection()}
                      className="group flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3 text-left transition-all hover:border-slate-200 hover:bg-slate-50"
                    >
                      <span className="text-sm font-medium text-slate-900">{link.label}</span>
                      <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-700" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6 border-l border-slate-100 p-6">
            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Brands</div>
              <div className="grid gap-2">
                {item.brands?.map((brand) => (
                  <button
                    key={brand.label}
                    type="button"
                    onClick={() => onNavigateToSection()}
                    className="rounded-2xl border border-slate-100 px-4 py-3 text-left text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
                  >
                    {brand.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Trending</div>
              <div className="flex flex-wrap gap-2">
                {item.trending?.map((trending) => (
                  <button
                    key={trending.label}
                    type="button"
                    onClick={() => onNavigateToSection()}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                  >
                    {trending.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToSection()}
            className="group relative min-h-full overflow-hidden bg-slate-100 text-left"
          >
            <img src={item.banner?.image} alt={item.banner?.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/35 to-slate-950/80" />
            <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 text-white">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">
                {item.banner?.eyebrow}
              </div>
              <h3 className="text-2xl font-light leading-tight">{item.banner?.title}</h3>
              <p className="text-sm leading-6 text-slate-200">{item.banner?.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                {item.banner?.cta}
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
});

