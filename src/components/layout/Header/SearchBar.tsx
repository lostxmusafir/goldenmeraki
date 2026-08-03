import { memo, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { Product } from '../../../types/product';
import { getImageUrl } from '../../../utils/image';

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  className?: string;
}

export const SearchBar = memo(function SearchBar({
  searchTerm,
  setSearchTerm,
  products,
  onSelectProduct,
  className = ''
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const deferredSearch = useDeferredValue(searchTerm);

  const suggestions = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    if (!query) return [] as Product[];

    return products
      .filter((product) => {
        const haystacks = [product.name, product.category, product.stone || '', (product.tags || []).join(' ')];
        return haystacks.some((value) => (value || '').toLowerCase().includes(query));
      })
      .slice(0, 5);
  }, [deferredSearch, products]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setIsOpen(false);
    }
  }, [searchTerm]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setIsOpen(false), 180);
          }}
          placeholder="Search crystals, bracelets, journals..."
          aria-label="Search products"
          aria-expanded={isOpen}
          aria-controls="header-search-suggestions"
          className="w-full rounded-full border border-slate-200 bg-white/90 py-3 pl-11 pr-11 text-sm text-slate-950 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:shadow-md lg:w-[22rem] lg:focus:w-[28rem]"
        />
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-500" />
        {searchTerm ? (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {isOpen && suggestions.length > 0 ? (
        <div
          id="header-search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-50 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
        >
          <div className="border-b border-slate-100 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Quick matches
          </div>
          <div className="max-h-80 overflow-auto p-2">
            {suggestions.map((product) => (
              <button
                key={product.id}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onSelectProduct(product);
                  setSearchTerm('');
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
                role="option"
              >
                <img src={getImageUrl(product.image)} alt={product.name} className="h-12 w-12 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-slate-950">{product.name}</div>
                  <div className="truncate text-xs text-slate-500">{product.certificate || 'Certified'}</div>
                </div>
                <div className="text-sm font-semibold text-slate-950">₹{product.price.toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
});
