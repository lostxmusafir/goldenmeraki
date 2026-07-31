import { Heart, ShoppingBag, Zap } from 'lucide-react';
import type { Product } from '../../types/product';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/catalog';

export interface ProductInfoProps {
  product: Product;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export function ProductInfo({
  product,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  quantity,
  setQuantity,
}: ProductInfoProps) {
  const isWishlisted = wishlist.includes(product.id);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="w-full min-w-0 space-y-6 overflow-hidden">
      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          Product Detail
        </p>

        <h1 className="break-words text-2xl font-light leading-tight tracking-tight text-slate-950 sm:text-4xl">
          {product.name}
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-3xl font-light text-slate-950">
            {formatCurrency(product.price)}
          </span>

          <span className="text-sm text-slate-400 line-through">
            {formatCurrency(product.originalPrice)}
          </span>

          <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
            {discount}% off
          </Badge>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Stone
            </p>

            <p className="mt-1 text-sm">{product.stone}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Certificate
            </p>

            <p className="mt-1 break-words text-sm">
              {product.certificate}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Quantity
        </p>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100"
            >
              -
            </button>

            <span className="min-w-10 px-3 text-center font-medium">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100"
            >
              +
            </button>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Button
              className="w-full bg-slate-950 py-3 text-white sm:flex-1"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to cart
            </Button>

            <Button
              className="w-full border border-slate-200 bg-white py-3 text-slate-900 sm:flex-1"
              onClick={() => onBuyNow(product)}
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 transition ${
            isWishlisted
              ? 'border-slate-950 bg-slate-950 text-white'
              : 'border-slate-200 bg-white'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          Wishlist
        </button>

        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-emerald-700">
          <Zap className="h-4 w-4" />
          Certified natural
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          About this item
        </p>

        <p className="mt-3 break-words text-sm leading-7 text-slate-700 sm:text-base">
          {product.description}
        </p>
      </div>
    </div>
  );
}