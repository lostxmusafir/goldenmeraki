import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { formatCurrency, productSlug } from '../../utils/catalog';
import type { Product } from '../../types/product';
import { getImageUrl } from '../../utils/image';
import { getProducts } from '../../services/catalogApi';

export interface TrendingProductsProps {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string, productName?: string) => void;
  wishlist: string[];
}

export function TrendingProducts({ onAddToCart, onToggleWishlist, wishlist }: TrendingProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      try {
        const response = await getProducts({ limit: 20 });
        if (isActive) {
          setProducts(response.products);
        }
      } catch (error) {
        console.error('Failed to load trending products', error);
      }
    };

    loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  const featuredProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviewsCount || 0) - (a.reviewsCount || 0))
      .slice(0, 8);
  }, [products]);

  return (
    <section className="bg-[linear-gradient(180deg,#fff_0%,#fbfbfb_100%)] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Trending / Best sellers</p>
            <h2 className="mt-2 text-2xl font-light tracking-tight text-slate-950 sm:text-3xl">Best sellers with a quieter, more elevated presentation.</h2>
          </div>
          <Link to="/category/all" className="self-end text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 sm:self-auto">
            Shop all
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <article key={product.id} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <Link to={`/product/${productSlug(product)}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    <img src={getImageUrl(product.image)} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {/* <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        onToggleWishlist(product.id, product.name);
                      }}
                      className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:text-rose-600"
                      aria-label="Toggle wishlist"
                    >
                      <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'fill-current text-rose-500' : ''}`} />
                    </button> */}
                    <div className="absolute left-3 top-3 rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-medium text-white">
                      Best seller
                    </div>
                  </div>
                </Link>
                <div className="space-y-4 p-5">
                  <div>
                    <Link to={`/product/${productSlug(product)}`} className="mt-2 block text-base font-medium leading-6 text-slate-950">
                      {product.name}
                    </Link>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-medium text-slate-950">{formatCurrency(product.price)}</div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="text-xs text-slate-400 line-through">{formatCurrency(product.originalPrice)}</div>
                      )}
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
      </div>
    </section>
  );
}
