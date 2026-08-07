import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { MASTER_TAXONOMY } from './data';
import type { MobileNavProps } from './types';

export function MobileNav({ selectedCategory, setSelectedCategory, onOpenQuiz, onOpenBuilder }: MobileNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 rounded-xl text-indigo-950 hover:bg-violet-50"
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-violet-100 p-4 space-y-4 animate-in slide-in-from-top-4">
          <div className="font-bold text-xs text-slate-400 uppercase tracking-wider">Golden Meraki Categories</div>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {MASTER_TAXONOMY.map((cat) => (
              <div key={cat.id} className="bg-violet-50/50 rounded-xl p-2.5 border border-violet-100 space-y-2">
                <button
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setMobileMenuOpen(false);
                    const elem = document.getElementById('catalog-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-extrabold text-xs text-indigo-950 w-full text-left"
                >
                  {cat.name}
                </button>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
                  {cat.subcategories.map((sub) => (
                    <span key={sub.id} className="truncate">
                      • {sub.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-violet-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200"
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Crystal Finder Quiz</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBuilder();
              }}
              className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200"
            >
              <span>Custom Bracelet Studio</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

