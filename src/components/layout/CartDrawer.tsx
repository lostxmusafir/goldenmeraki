import { useEffect } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, ShoppingBag, Trash2, X } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/catalog';
import type { CartItem } from '../../types/cart';
import { getImageUrl } from '../../utils/image';

export interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, selectedWidthSize?: string) => void;
  onRemoveItem: (productId: string, selectedWidthSize?: string) => void;
  onViewCart: () => void;
  onPlaceOrder: () => void;
}

export function CartDrawer({
  open,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onViewCart,
  onPlaceOrder,
}: CartDrawerProps) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed inset-0 z-[80] transition-all duration-300 ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        onClick={onClose}
        className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Close cart drawer"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.24)] transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Cart</div>
            <h2 id="cart-drawer-title" className="mt-1 text-lg font-medium text-slate-950">
              Shopping bag ({cartItems.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-950"
            aria-label="Close drawer"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <div className="grid h-full place-items-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
              <div className="space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <p className="text-sm text-slate-500">Your cart is empty.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <article key={`${item.id}-${item.selectedWidthSize || 'default'}`} className="rounded-[1.5rem] border border-slate-200 p-3">
                  <div className="flex gap-3">
                    <img src={getImageUrl(item.image)} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-medium text-slate-950">{item.name}</h3>
                          {item.selectedWidthSize ? (
                            <p className="text-xs font-semibold text-amber-600 dark:text-amber-500">
                              Variant: {item.selectedWidthSize}
                            </p>
                          ) : null}
                          <p className="mt-0.5 text-xs text-slate-500">{formatCurrency(item.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id, item.selectedWidthSize)}
                          className="inline-flex items-center gap-1 rounded-lg p-1 text-xs font-medium text-rose-500 transition-colors hover:bg-rose-50 hover:text-rose-700"
                          aria-label={`Remove ${item.name}`}
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4 text-rose-500" />
                          <span>Remove</span>
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Badge className="border-slate-200 bg-slate-50 text-slate-600">{item.category}</Badge>
                        {item.selectedWidthSize ? (
                          <Badge className="border-amber-200 bg-amber-50 text-amber-700">{item.selectedWidthSize}</Badge>
                        ) : null}
                        <span className="text-xs text-slate-500">Qty {item.quantity}</span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedWidthSize)}
                            disabled={item.quantity <= 1}
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                              item.quantity <= 1 ? 'opacity-40 cursor-not-allowed text-slate-300' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950'
                            }`}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                          <span className="min-w-9 px-2 text-center text-sm font-medium text-slate-950">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.selectedWidthSize)}
                            disabled={item.stock != null && item.quantity >= item.stock}
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                              item.stock != null && item.quantity >= item.stock ? 'opacity-40 cursor-not-allowed text-slate-300' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950'
                            }`}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-sm font-medium text-slate-950">{formatCurrency(item.price * item.quantity)}</div>
                      </div>
                      
                      {item.stock != null && item.quantity >= item.stock && item.stock > 0 && (
                        <div className="mt-1.5 text-[11px] font-medium text-amber-600">
                          Max available stock ({item.stock}) reached
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-slate-950">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium text-slate-950">
                {subtotal === 0 ? formatCurrency(0) : subtotal > 999 ? 'Free' : formatCurrency(99)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              type="button"
              onClick={onViewCart}
              className="flex-1 border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50"
            >
              View cart
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              type="button"
              onClick={onPlaceOrder}
              disabled={cartItems.length === 0}
              className="flex-1 bg-slate-950 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to checkout
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
