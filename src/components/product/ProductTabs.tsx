import type { Product } from '../../types/product';

export interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const specifications = product.specifications || {};

  return (
    <div className="space-y-4">
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">Description</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{product.description}</p>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">Specifications</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {Object.entries(specifications).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{key}</p>
              <p className="mt-1 text-sm text-slate-950">{String(value)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">Reviews</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">Verified buyer reviews can be surfaced here with rating filters and review sorting.</p>
      </div>
    </div>
  );
}
