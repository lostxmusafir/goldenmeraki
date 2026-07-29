import type { PropsWithChildren } from 'react';

export function Drawer({
  open,
  onClose,
  title,
  children
}: PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title: string;
}>) {
  return (
    <div className={`fixed inset-0 z-[70] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close drawer"
        className={`absolute inset-0 bg-slate-950/45 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute left-0 top-0 h-full w-[min(90vw,24rem)] overflow-y-auto border-r border-slate-200 bg-white shadow-[24px_0_60px_rgba(15,23,42,0.18)] transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {children}
      </div>
    </div>
  );
}

