import { useState } from 'react';
import { Search } from 'lucide-react';
import type { HeaderSearchBarProps } from './types';

export function SearchBar({ searchTerm, setSearchTerm, products, onSelectProduct }: HeaderSearchBarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  const searchResults = searchTerm.trim()
    ? products
        .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 4)
    : [];

  return (
    <div className="hidden sm:block flex-1 max-w-lg mx-4 relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Pyrite, 7 Chakra Bracelet, Amethyst..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          className="w-full pl-10 pr-10 py-2.5 rounded-full bg-violet-50/70 border border-violet-200 text-xs text-indigo-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all shadow-inner"
        />
        <Search className="w-4 h-4 text-violet-500 absolute left-3.5 top-3" />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-indigo-950 bg-violet-100 rounded-full w-4 h-4 flex items-center justify-center"
          >
            ×
          </button>
        )}
      </div>

      {searchFocused && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-violet-100 overflow-hidden z-50 p-2 space-y-1 animate-in fade-in">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
            Matching Products ({searchResults.length})
          </div>
          {searchResults.map((prod) => (
            <button
              key={prod.id}
              type="button"
              onClick={() => {
                onSelectProduct(prod);
                setSearchTerm('');
              }}
              className="w-full p-2 rounded-xl hover:bg-violet-50 cursor-pointer flex items-center space-x-3 transition-colors text-left"
            >
              <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded-lg object-cover border border-violet-100" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs text-indigo-950 truncate">{prod.name}</div>
                <div className="text-[10px] text-emerald-700 font-semibold">{prod.certificate}</div>
              </div>
              <div className="font-extrabold text-xs text-indigo-950">₹{prod.price.toLocaleString()}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

