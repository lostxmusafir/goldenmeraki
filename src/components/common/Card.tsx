import type { PropsWithChildren, ReactNode } from 'react';

export function Card({
  children,
  className = ''
}: PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

export function CardSection({
  title,
  subtitle,
  action,
  children,
  className = ''
}: PropsWithChildren<{
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}>) {
  return (
    <Card className={className}>
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div className="space-y-1">
            {title ? <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">{title}</h3> : null}
            {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </Card>
  );
}

