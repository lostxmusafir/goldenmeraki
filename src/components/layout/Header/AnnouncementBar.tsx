import { memo } from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { ANNOUNCEMENTS } from './navigation';

export const AnnouncementBar = memo(function AnnouncementBar() {
  return (
    <div className="hidden lg:block border-b border-slate-200/70 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-2 text-[11px] font-medium tracking-[0.18em] uppercase">
        <div className="flex items-center gap-2 text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{ANNOUNCEMENTS[0]}</span>
        </div>
        <div className="flex items-center gap-8 text-slate-300">
          <span>{ANNOUNCEMENTS[1]}</span>
          <a href="tel:+919998583126" className="flex items-center gap-2 text-slate-100 transition-colors hover:text-amber-300">
            <Phone className="h-3.5 w-3.5 text-emerald-300" />
            <span>{ANNOUNCEMENTS[2]}</span>
          </a>
        </div>
      </div>
    </div>
  );
});

