import { ChevronRight } from 'lucide-react';
import type { MegaMenuProps } from './types';

export function MegaMenu({ activeCategoryTab, setActiveCategoryTab, setSelectedCategory, onClose }: MegaMenuProps) {
  return (
    <div className="absolute top-full left-0 mt-1 w-[700px] bg-white rounded-2xl shadow-2xl border border-violet-100 overflow-hidden z-50 flex grid grid-cols-12 animate-in fade-in">
      <div className="col-span-5 bg-violet-50/70 p-3 space-y-1 border-r border-violet-100">
        {activeCategoryTab && null}
        {/** rendered by DesktopNav using the data array */}
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
                onClose();
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
  );
}

