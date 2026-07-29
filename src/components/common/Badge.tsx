import type { PropsWithChildren } from 'react';

export function Badge({ className = '', children }: PropsWithChildren<{ className?: string }>) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${className}`}>{children}</span>;
}

