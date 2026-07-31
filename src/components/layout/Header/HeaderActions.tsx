import { memo } from 'react';
import { Bell, User, ShoppingBag } from 'lucide-react';

export interface HeaderActionsProps {
  wishlistCount?: number;
  cartCount: number;
  notificationCount?: number;
  onOpenWishlist?: () => void;
  onOpenCart: () => void;
  onOpenAccount?: () => void;
  onOpenBuilder?: () => void;
}

export const HeaderActions = memo(function HeaderActions({
  cartCount,
  notificationCount = 0,
  onOpenCart,
  onOpenAccount
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={onOpenAccount}
        className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:text-slate-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 md:inline-flex"
        aria-label="Account"
      >
        <User className="h-4.5 w-4.5" />
        {notificationCount > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-semibold text-slate-950">
            {notificationCount}
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={onOpenCart}
        className="relative inline-flex h-11 items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-medium text-white shadow-[0_12px_24px_rgba(15,23,42,0.14)] transition-all hover:bg-slate-800 hover:shadow-[0_16px_32px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
        aria-label={`Cart, ${cartCount} items`}
      >
        <ShoppingBag className="h-4.5 w-4.5" />
        <span className="hidden sm:inline">Cart</span>
        <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-semibold text-slate-950">
          {cartCount}
        </span>
      </button>

      <button
        type="button"
        onClick={onOpenAccount}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:text-slate-950 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 md:hidden"
        aria-label="Account"
      >
        <Bell className="h-4.5 w-4.5" />
      </button>
    </div>
  );
});
