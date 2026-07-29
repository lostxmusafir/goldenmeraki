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

export function ProductInfo({ product, wishlist, onToggleWishlist, onAddToCart, onBuyNow, quantity, setQuantity }: ProductInfoProps) {
  const isWishlisted = wishlist.includes(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Product detail</p>
        <h1 className="text-3xl font-light tracking-tight text-slate-950 sm:text-4xl">{product.name}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-3xl font-light text-slate-950">{formatCurrency(product.price)}</span>
          <span className="text-sm text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
          <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">{discount}% off</Badge>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Stone</p>
            <p className="mt-1 text-sm text-slate-950">{product.stone}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Certificate</p>
            <p className="mt-1 text-sm text-slate-950">{product.certificate}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Quantity</p>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700">
            -
          </button>
          <button type="button" className="inline-flex h-11 min-w-14 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900">
            {quantity}
          </button>
          <button type="button" onClick={() => setQuantity(quantity + 1)} className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700">
            +
          </button>
          <Button className="bg-slate-950 px-5 text-white hover:bg-slate-800" onClick={() => onAddToCart(product)}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to cart
          </Button>
          <Button className="border border-slate-200 bg-white px-5 text-slate-900 hover:border-slate-300 hover:bg-slate-50" onClick={() => onBuyNow(product)}>
            Buy now
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors ${
            isWishlisted ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-700'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          Wishlist
        </button>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
          <Zap className="h-4 w-4" />
          Certified natural
        </div>
      </div>

      <p className="max-w-2xl text-base leading-7 text-slate-600">{product.description}</p>
    </div>
  );
}
