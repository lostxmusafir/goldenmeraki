import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export interface SortBarProps {
  sortBy: string;
  onChange: (value: string) => void;
  count: number;
}

export function SortBar({ sortBy, onChange, count }: SortBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <SlidersHorizontal className="h-4 w-4 text-slate-500" />
        <span>{count.toLocaleString()} products</span>
      </div>
      <label className="relative inline-flex items-center gap-2">
        <span className="text-sm text-slate-500">Sort</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(event) => onChange(event.target.value)}
            className="appearance-none rounded-full border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm text-slate-950 outline-none transition-colors focus:border-slate-300"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>
      </label>
    </div>
  );
}

