import type { Dispatch, SetStateAction } from 'react';
import { Filter } from 'lucide-react';
import { INTENTIONS } from '../../data/navigation';
import { Input } from '../common/Input';
import type { ProductCategoryId } from '../../types/product';
import type { CatalogCategory } from '../../services/catalogApi';

export interface FilterSidebarProps {
  categories: CatalogCategory[];
  category: ProductCategoryId;
  setCategory: Dispatch<SetStateAction<ProductCategoryId>>;
  intention: string;
  setIntention: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  maxPrice: number;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  onClose?: () => void;
}

export function FilterSidebar({
  categories,
  category,
  setCategory,
  intention,
  setIntention,
  searchTerm,
  setSearchTerm,
  maxPrice,
  setMaxPrice,
  onClose
}: FilterSidebarProps) {
  return (
    <aside className="space-y-5 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-slate-500" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900">Filters</h2>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Search</p>
        <Input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search products" />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Category</p>
        <div className="grid gap-2">
          <button
            type="button"
            onClick={() => {
              setCategory('all' as ProductCategoryId);
              onClose?.();
            }}
            className={`cursor-pointer rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
              category === 'all'
                ? 'border-slate-950 bg-slate-950 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            All Products
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCategory((item.slug ?? item.id) as ProductCategoryId);
                onClose?.();
              }}
              className={`cursor-pointer rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                category === (item.slug ?? item.id)
                  ? 'border-slate-950 bg-slate-950 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Intention</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setIntention('all')}
            className={`cursor-pointer rounded-full border px-3 py-2 text-xs font-medium ${intention === 'all' ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-700'}`}
          >
            All
          </button>
          {INTENTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setIntention(item.id);
                onClose?.();
              }}
              className={`cursor-pointer rounded-full border px-3 py-2 text-xs font-medium ${intention === item.id ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-700'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Budget</p>
        <input
          type="range"
          min="100"
          max="25000"
          step="100"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="w-full accent-slate-950"
        />
        <div className="text-sm text-slate-600">Up to ₹{maxPrice.toLocaleString('en-IN')}</div>
      </div>
    </aside>
  );
}

