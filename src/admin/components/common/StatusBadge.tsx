import type { ReactNode } from 'react';

export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  customLabel?: string;
  icon?: ReactNode;
}

export function StatusBadge({ status, variant, customLabel, icon }: StatusBadgeProps) {
  const getVariant = (): StatusVariant => {
    if (variant) return variant;
    const s = status.toLowerCase();
    if (['active', 'paid', 'delivered', 'published', 'subscribed', 'read'].includes(s)) return 'success';
    if (['pending', 'processing', 'unread', 'draft'].includes(s)) return 'warning';
    if (['inactive', 'failed', 'cancelled', 'blocked', 'out_of_stock', 'unsubscribed'].includes(s)) return 'error';
    if (['shipped', 'replied'].includes(s)) return 'info';
    return 'neutral';
  };

  const currentVariant = getVariant();

  const variantClasses: Record<StatusVariant, string> = {
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    error: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    info: 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
  };

  const displayLabel = customLabel || status.replace(/_/g, ' ').toUpperCase();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${variantClasses[currentVariant]}`}
    >
      {icon}
      <span>{displayLabel}</span>
    </span>
  );
}
