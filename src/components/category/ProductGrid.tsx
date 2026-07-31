import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatCurrency, productSlug } from '../../utils/catalog';
import { getImageUrl } from '../../utils/image';

export interface ProductGridProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, wishlist, onToggleWishlist, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const isWishlisted = wishlist.includes(product.id);
        return (
          <article key={product.id} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <Link to={`/product/${productSlug(product)}`} className="block">
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img src={getImageUrl(product.image)} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    onToggleWishlist(product.id);
                  }}
                  className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:text-rose-600"
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'fill-current text-rose-500' : ''}`} />
                </button>
              </div>
            </Link>
            <div className="space-y-4 p-5">
              <div>
                <div className="flex items-center gap-1 text-sm text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium text-slate-900">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount})</span>
                </div>
                <Link to={`/product/${productSlug(product)}`} className="mt-2 block text-base font-medium leading-6 text-slate-950">
                  {product.name}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-medium text-slate-950">{formatCurrency(product.price)}</div>
                  <div className="text-xs text-slate-400 line-through">{formatCurrency(product.originalPrice)}</div>
                </div>
                <button
                  type="button"
                  onClick={() => onAddToCart(product)}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-medium text-white transition-all hover:bg-slate-800"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

