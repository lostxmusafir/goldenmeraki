import { ChevronDown, ChevronRight, Compass, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { MASTER_TAXONOMY } from './data';
import { MegaMenu } from './MegaMenu';
import type { DesktopNavProps } from './types';
import type { NavigationCategory } from '../../../types/navigation';

export function DesktopNav({ selectedCategory, setSelectedCategory, onOpenBuilder, onOpenQuiz }: DesktopNavProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<NavigationCategory>(MASTER_TAXONOMY[0]);

  return (
    <nav className="hidden lg:block bg-violet-50/80 border-t border-violet-100 text-xs font-bold text-indigo-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-1 py-1.5">
          <div className="relative">
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-violet-700 text-white font-bold hover:bg-violet-800 transition-colors shadow-sm"
            >
              <span>ALL CATEGORIES & SUBCATEGORIES</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {megaMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-[700px] bg-white rounded-2xl shadow-2xl border border-violet-100 overflow-hidden z-50 flex grid grid-cols-12 animate-in fade-in">
                <div className="col-span-5 bg-violet-50/70 p-3 space-y-1 border-r border-violet-100">
                  {MASTER_TAXONOMY.map((cat) => (
                    <button
                      key={cat.id}
                      onMouseEnter={() => setActiveCategoryTab(cat)}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setMegaMenuOpen(false);
                        const elem = document.getElementById('catalog-section');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        activeCategoryTab.id === cat.id ? 'bg-violet-700 text-white shadow-sm' : 'text-indigo-950 hover:bg-violet-100'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  ))}
                </div>

                <div className="col-span-7 p-4 space-y-3 bg-white">
                  <div className="font-extrabold text-xs text-violet-700 uppercase tracking-wider pb-1 border-b border-violet-100">
                    {activeCategoryTab.name} Subcategories
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {activeCategoryTab.subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setSelectedCategory(activeCategoryTab.id);
                          setMegaMenuOpen(false);
                          const elem = document.getElementById('catalog-section');
                          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-2 rounded-xl text-left text-xs font-semibold text-indigo-950 hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center space-x-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                        <span className="truncate">{sub.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setSelectedCategory('bracelets');
              const elem = document.getElementById('catalog-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1.5 rounded-lg hover:bg-violet-100 transition-colors"
          >
            Energy Bracelets
          </button>

          <button
            onClick={() => {
              setSelectedCategory('raw-stones');
              const elem = document.getElementById('catalog-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1.5 rounded-lg hover:bg-violet-100 transition-colors"
          >
            Raw Crystals
          </button>

          <button
            onClick={() => {
              setSelectedCategory('trees-decor');
              const elem = document.getElementById('catalog-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1.5 rounded-lg hover:bg-violet-100 transition-colors"
          >
            Feng Shui Trees
          </button>

          <button
            onClick={onOpenBuilder}
            className="px-3 py-1.5 rounded-lg text-amber-800 font-extrabold hover:bg-amber-100 transition-colors"
          >
            Custom Studio
          </button>
        </div>

        <div className="flex items-center space-x-2 text-emerald-800 text-xs font-extrabold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Certified Natural Gemstones</span>
        </div>
      </div>
    </nav>
  );
}

