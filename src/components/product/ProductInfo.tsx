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

  const rawWidthSizes = product.widthSizes || [];
  const isBracelet =
    product.category === 'bracelets' ||
    product.name.toLowerCase().includes('bracelet') ||
    product.tags?.some((t) => t.toLowerCase().includes('bracelet'));

  const parsedSizes = rawWidthSizes.map((s) =>
    typeof s === 'string'
      ? { size: s, price: product.price }
      : { size: s.size, price: s.price ?? product.price, stock: s.stock },
  );

  const sizesList =
    parsedSizes.length > 0
      ? parsedSizes
      : isBracelet
      ? [
          { size: '8 mm', price: product.price },
          { size: '10 mm', price: product.price },
        ]
      : [];

  const [selectedSize, setSelectedSize] = useState<string>(sizesList[0]?.size || '');
  const activeSize = selectedSize || sizesList[0]?.size;
  const currentSizeObj = sizesList.find((s) => s.size === activeSize) || sizesList[0];
  const currentPrice = currentSizeObj?.price ?? product.price;

  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = product.inventoryStatus === 'OUT_OF_STOCK' || product.stock <= 0;
  const isComingSoon = product.inventoryStatus === 'COMING_SOON';
  const isDiscontinued = product.inventoryStatus === 'DISCONTINUED';

  const originalPrice = product.originalPrice || currentPrice;
  const discount =
    originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      price: currentPrice,
      selectedWidthSize: activeSize,
    });
  };

  const handleBuyNow = () => {
    onBuyNow({
      ...product,
      price: currentPrice,
      selectedWidthSize: activeSize,
    });
  };

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
            {formatCurrency(currentPrice)}
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

      {sizesList.length > 0 && (
        <div className="space-y-2.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-700">
            Width Size
          </p>
          <div className="flex flex-wrap gap-3">
            {sizesList.map((item) => {
              const isSelected = item.size === activeSize;
              return (
                <button
                  key={item.size}
                  type="button"
                  onClick={() => setSelectedSize(item.size)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500 text-white shadow-sm ring-2 ring-amber-500/30'
                      : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs">{isSelected ? '●' : '○'}</span>
                  <span>{item.size}</span>
                  {item.price && item.price !== product.price ? (
                    <span className="text-xs opacity-80">(₹{item.price})</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}

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
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>

                <Button
                  className="w-full border border-slate-200 bg-white py-3 text-slate-900 sm:flex-1 hover:bg-slate-50"
                  onClick={handleBuyNow}
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
        selectedWidthSize={activeSize}
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
      />
    </div>
  );
}