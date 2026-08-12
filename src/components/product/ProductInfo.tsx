import { useState } from 'react';
import { Bell, Heart, ShoppingBag, Zap } from 'lucide-react';
import type { Product, SizeVariant } from '../../types/product';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/catalog';
import { NotifyMeModal } from '../NotifyMeModal';

export interface ProductInfoProps {
  product: Product;
  wishlist: string[];
  onToggleWishlist: (productId: string, productName?: string) => void;
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

  // Use the new structured sizes array from the API
  const activeSizes = (product.sizes || []).filter((s) => s.isActive);

  const [selectedSize, setSelectedSize] = useState<string>(activeSizes[0]?.size || '');

  const currentSizeObj: SizeVariant | undefined = activeSizes.find((s) => s.size === selectedSize) || activeSizes[0];
  const hasSizes = activeSizes.length > 0;

  // Derive current values from the selected size or product defaults
  const currentPrice = currentSizeObj?.price ?? product.price;
  const currentOriginalPrice = currentSizeObj?.originalPrice ?? product.originalPrice ?? currentPrice;
  const currentDiscountPrice = currentSizeObj?.discountPrice ?? product.discountPrice;
  const currentStock = hasSizes ? (currentSizeObj?.stock ?? 0) : product.stock;

  const isWishlisted = wishlist.includes(product.id);

  // Per-size stock check for sized products; product-level for non-sized
  const isOutOfStock = hasSizes
    ? currentStock <= 0
    : product.inventoryStatus === 'OUT_OF_STOCK' || product.stock <= 0;
  const isComingSoon = product.inventoryStatus === 'COMING_SOON';
  const isDiscontinued = product.inventoryStatus === 'DISCONTINUED';

  const discount =
    currentOriginalPrice > currentPrice
      ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) return; // Should not happen since we auto-select first
    onAddToCart({
      ...product,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      stock: currentStock,
      selectedWidthSize: hasSizes ? (selectedSize || currentSizeObj?.size) : undefined,
    });
  };

  const handleBuyNow = () => {
    if (hasSizes && !selectedSize) return;
    onBuyNow({
      ...product,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      stock: currentStock,
      selectedWidthSize: hasSizes ? (selectedSize || currentSizeObj?.size) : undefined,
    });
  };

  const activeSize = selectedSize || currentSizeObj?.size || '';

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
                {formatCurrency(currentOriginalPrice)}
              </span>

              <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
                {discount}% off
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Size Selection */}
      {hasSizes && (
        <div className="space-y-2.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-700">
            Size
          </p>
          <div className="flex flex-wrap gap-3">
            {activeSizes.map((sizeItem) => {
              const isSelected = sizeItem.size === activeSize;
              const sizeOutOfStock = sizeItem.stock <= 0;
              return (
                <button
                  key={sizeItem.size}
                  type="button"
                  onClick={() => setSelectedSize(sizeItem.size)}
                  disabled={sizeOutOfStock}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${
                    sizeOutOfStock
                      ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed opacity-60 line-through'
                      : isSelected
                      ? 'border-amber-500 bg-amber-500 text-white shadow-sm ring-2 ring-amber-500/30'
                      : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs">{sizeOutOfStock ? '✕' : isSelected ? '●' : '○'}</span>
                  <span>{sizeItem.size}</span>
                  <span className="text-xs opacity-80">(₹{sizeItem.price})</span>
                </button>
              );
            })}
          </div>
          {hasSizes && isOutOfStock && (
            <p className="text-xs text-rose-500 font-medium mt-1">
              {activeSize} is currently out of stock
            </p>
          )}
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
          onClick={() => onToggleWishlist(product.id, product.name)}
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