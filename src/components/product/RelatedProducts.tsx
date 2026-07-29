import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatCurrency, productSlug } from '../../utils/catalog';

export interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Related products</p>
          <h2 className="mt-2 text-2xl font-light tracking-tight text-slate-950">More pieces from the same world.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${productSlug(product)}`} className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-center gap-1 text-sm text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium text-slate-900">{product.rating}</span>
                </div>
                <div className="text-sm font-medium text-slate-950">{product.name}</div>
                <div className="text-sm text-slate-600">{formatCurrency(product.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

