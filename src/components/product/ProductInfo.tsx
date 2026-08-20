import { useState, useEffect } from 'react';
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
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
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

  // Check if product is a tree or bracelet or has size configurations
  const isBracelet =
    product.name?.toLowerCase().includes('bracelet') ||
    product.category?.toLowerCase().includes('bracelet') ||
    (product.sizes && product.sizes.some((s) => s.size.toLowerCase().includes('mm')));

  const isTree =
    product.name?.toLowerCase().includes('tree') ||
    product.category?.toLowerCase().includes('tree') ||
    (product.sizes && product.sizes.some((s) => s.size.toLowerCase().includes('bead')));

  const standardBraceletSizes = ['8mm', '10mm'];
  const standardTreeSizes = ['100 Beads', '160 Beads', '300 Beads', '500 Beads'];
  const rawSizes = product.sizes || [];

  // Determine complete list of size options to display
  const displaySizeList = (() => {
    if (rawSizes.length === 0 && !isBracelet && !isTree) {
      return [];
    }

    const sizeLabels = new Set<string>();
    if (isTree || rawSizes.some((s) => s.size.toLowerCase().includes('bead'))) {
      standardTreeSizes.forEach((sz) => sizeLabels.add(sz));
    } else if (isBracelet || rawSizes.some((s) => standardBraceletSizes.includes(s.size.toLowerCase()))) {
      standardBraceletSizes.forEach((sz) => sizeLabels.add(sz));
    }
    rawSizes.forEach((s) => sizeLabels.add(s.size));

    return Array.from(sizeLabels).map((label) => {
      const found = rawSizes.find((s) => s.size.toLowerCase() === label.toLowerCase());
      if (found && found.isActive !== false) {
        return {
          size: found.size || label,
          price: Number(found.price ?? 0),
          originalPrice: found.originalPrice != null ? Number(found.originalPrice) : undefined,
          discountPrice: found.discountPrice != null ? Number(found.discountPrice) : undefined,
          stock: Number(found.stock ?? 0),
          isActive: true,
          isAvailable: true,
        };
      }
      return {
        size: label,
        price: 0,
        stock: 0,
        isActive: false,
        isAvailable: false,
      };
    });
  })();

  const availableSizes = displaySizeList.filter((s) => s.isAvailable);
  const hasActiveSizes = availableSizes.length > 0;

  // Selected size state - auto selects first active available size
  const [selectedSize, setSelectedSize] = useState<string>(() => availableSizes[0]?.size || '');

  // Keep selected size in sync when product or sizes update
  useEffect(() => {
    if (availableSizes.length > 0) {
      if (!selectedSize || !availableSizes.some((s) => s.size === selectedSize)) {
        setSelectedSize(availableSizes[0].size);
      }
    } else {
      setSelectedSize('');
    }
  }, [product.id, product.sizes]);

  const currentSizeObj = availableSizes.find((s) => s.size === selectedSize) || availableSizes[0];

  // Price calculations
  const currentPrice =
    currentSizeObj?.price && currentSizeObj.price > 0 ? currentSizeObj.price : product.price;
  const currentOriginalPrice =
    currentSizeObj?.originalPrice && currentSizeObj.originalPrice > 0
      ? currentSizeObj.originalPrice
      : product.originalPrice && product.originalPrice > currentPrice
      ? product.originalPrice
      : currentPrice;
  const currentStock = hasActiveSizes ? (currentSizeObj?.stock ?? 0) : product.stock;

  // Auto-adjust quantity if currentStock decreases below current quantity
  useEffect(() => {
    if (currentStock > 0 && quantity > currentStock) {
      setQuantity(currentStock);
    }
  }, [currentStock, selectedSize]);

  const isWishlisted = wishlist.includes(product.id);

  // Per-size stock check for sized products; product-level for non-sized
  const isOutOfStock = hasActiveSizes
    ? currentStock <= 0
    : product.inventoryStatus === 'OUT_OF_STOCK' || product.stock <= 0;
  const isComingSoon = product.inventoryStatus === 'COMING_SOON';
  const isDiscontinued = product.inventoryStatus === 'DISCONTINUED';

  const discount =
    currentOriginalPrice > currentPrice
      ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
      : 0;

  const activeSizeLabel = selectedSize || currentSizeObj?.size || '';

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      stock: currentStock,
      selectedWidthSize: hasActiveSizes ? (selectedSize || currentSizeObj?.size) : undefined,
    }, quantity);
  };

  const handleBuyNow = () => {
    onBuyNow({
      ...product,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      stock: currentStock,
      selectedWidthSize: hasActiveSizes ? (selectedSize || currentSizeObj?.size) : undefined,
    }, quantity);
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
                {formatCurrency(currentOriginalPrice)}
              </span>

              <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
                {discount}% off
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Size / Bead Count Selection */}
      {displaySizeList.length > 0 && (
        <div className="space-y-2.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-700">
              {isTree ? 'Select Bead Count' : 'Select Bead Size'}
            </p>
            {hasActiveSizes && (
              <span className="text-xs font-medium text-amber-600">
                Selected: {activeSizeLabel}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {displaySizeList.map((sizeItem) => {
              const isSelected = sizeItem.size === activeSizeLabel && sizeItem.isAvailable;
              const isDisabled = !sizeItem.isAvailable;
              const sizeOutOfStock = sizeItem.isAvailable && sizeItem.stock <= 0;

              return (
                <button
                  key={sizeItem.size}
                  type="button"
                  onClick={() => {
                    if (!isDisabled) {
                      setSelectedSize(sizeItem.size);
                    }
                  }}
                  disabled={isDisabled || sizeOutOfStock}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    isDisabled
                      ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50 line-through'
                      : sizeOutOfStock
                      ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-60 line-through'
                      : isSelected
                      ? 'border-amber-500 bg-amber-500 text-white shadow-sm ring-2 ring-amber-500/30 cursor-pointer'
                      : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 cursor-pointer'
                  }`}
                  title={
                    isDisabled
                      ? `${sizeItem.size} size is currently disabled`
                      : sizeOutOfStock
                      ? `${sizeItem.size} is out of stock`
                      : `Select ${sizeItem.size}`
                  }
                >
                  <span className="text-xs">
                    {isDisabled ? '✕' : sizeOutOfStock ? '✕' : isSelected ? '●' : '○'}
                  </span>
                  <span>{sizeItem.size}</span>
                  {sizeItem.isAvailable ? (
                    <span className="text-xs opacity-90">(₹{sizeItem.price})</span>
                  ) : (
                    <span className="text-[10px] uppercase opacity-75">(Disabled)</span>
                  )}
                </button>
              );
            })}
          </div>

          {hasActiveSizes && currentStock <= 0 && (
            <p className="text-xs text-rose-500 font-medium mt-1">
              {activeSizeLabel} is currently out of stock
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
              <div className="flex flex-col gap-1">
                <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || currentStock <= 0}
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                      quantity <= 1 || currentStock <= 0
                        ? 'opacity-40 cursor-not-allowed text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700 cursor-pointer'
                    }`}
                  >
                    -
                  </button>

                  <span className="min-w-10 px-3 text-center font-medium">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                    disabled={quantity >= currentStock || currentStock <= 0}
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                      quantity >= currentStock || currentStock <= 0
                        ? 'opacity-40 cursor-not-allowed text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700 cursor-pointer'
                    }`}
                  >
                    +
                  </button>
                </div>
                {quantity >= currentStock && currentStock > 0 && (
                  <span className="text-[11px] font-medium text-amber-600">
                    Max available stock ({currentStock}) reached
                  </span>
                )}
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
        selectedWidthSize={activeSizeLabel}
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
      />
    </div>
  );
}