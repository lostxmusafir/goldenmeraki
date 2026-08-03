import { useState } from 'react';
import { Bell, Heart, ShoppingBag, Zap } from 'lucide-react';
import type { Product } from '../../types/product';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/catalog';
import { NotifyMeModal } from '../NotifyMeModal';

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
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const isOutOfStock = product.inventoryStatus === 'OUT_OF_STOCK' || product.stock <= 0;
  const isComingSoon = product.inventoryStatus === 'COMING_SOON';
  const isDiscontinued = product.inventoryStatus === 'DISCONTINUED';

  const originalPrice = product.originalPrice || product.price;
  const discount = originalPrice > product.price
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 0;

  return (
    <div className="w-full min-w-0 space-y-6 overflow-hidden">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Product Detail
          </p>
          {isOutOfStock ? (
            <Badge className="border-rose-200 bg-rose-50 text-rose-700">Out of Stock</Badge>
          ) : isComingSoon ? (
            <Badge className="border-amber-200 bg-amber-50 text-amber-700">Coming Soon</Badge>
          ) : isDiscontinued ? (
            <Badge className="border-slate-200 bg-slate-100 text-slate-600">Discontinued</Badge>
          ) : (
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">In Stock</Badge>
          )}
        </div>

        <h1 className="break-words text-2xl font-light leading-tight tracking-tight text-slate-950 sm:text-4xl">
          {product.name}
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-3xl font-light text-slate-950">
            {formatCurrency(product.price)}
          </span>

          {discount > 0 && (
            <>
              <span className="text-sm text-slate-400 line-through">
                {formatCurrency(originalPrice)}
              </span>

              <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
                {discount}% off
              </Badge>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {!isOutOfStock && !isComingSoon && !isDiscontinued ? (
          <>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Quantity
            </p>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100"
                >
                  -
                </button>

                <span className="min-w-10 px-3 text-center font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100"
                >
                  +
                </button>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button
                  className="w-full bg-slate-950 py-3 text-white sm:flex-1 hover:bg-slate-800"
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>

                <Button
                  className="w-full border border-slate-200 bg-white py-3 text-slate-900 sm:flex-1 hover:bg-slate-50"
                  onClick={() => onBuyNow(product)}
                >
                  Buy now
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-amber-600" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {isComingSoon ? 'Item Coming Soon' : isDiscontinued ? 'Item Discontinued' : 'Currently Out of Stock'}
                </h4>
                <p className="text-xs text-slate-600">
                  Register your request to get notified on WhatsApp immediately when this item is restocked.
                </p>
              </div>
            </div>
            <Button
              className="w-full bg-amber-500 py-3 text-white font-semibold hover:bg-amber-600 shadow-sm"
              onClick={() => setIsNotifyModalOpen(true)}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notify Me
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 transition ${
            isWishlisted
              ? 'border-slate-950 bg-slate-950 text-white'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          Wishlist
        </button>

        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-emerald-700">
          <Zap className="h-4 w-4" />
          Golden Meraki Verified
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

      <NotifyMeModal
        productId={product.id}
        productTitle={product.name}
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
      />
    </div>
  );
}