import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroNavigationProps } from './types';

export function HeroNavigation({
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
  progressPercent,
}: HeroNavigationProps) {
  return (
    <div className="absolute inset-x-0 bottom-4 sm:bottom-6 z-20 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-end gap-3">
        {/* Previous / Next Arrow Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-stone-800 disabled:opacity-40 disabled:cursor-not-allowed border border-stone-200/80 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-stone-800 disabled:opacity-40 disabled:cursor-not-allowed border border-stone-200/80 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-stone-200/40">
        <div
          className="h-full bg-amber-700/80 transition-all duration-100 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
