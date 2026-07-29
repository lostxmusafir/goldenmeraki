import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { HeroNavigationProps } from './types';

export function HeroNavigation({
  slideCount,
  selectedIndex,
  scrollPrev,
  scrollNext,
  scrollTo,
  canScrollPrev,
  canScrollNext,
  progressPercent,
  isAutoplayPlaying,
  toggleAutoplay
}: HeroNavigationProps) {
  return (
    <div className="absolute inset-x-0 bottom-4 sm:bottom-6 z-20 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Pagination Dots & Autoplay Toggle */}
        <div className="pointer-events-auto flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-stone-200/80 shadow-sm">
          {toggleAutoplay && (
            <button
              type="button"
              onClick={toggleAutoplay}
              aria-label={isAutoplayPlaying ? 'Pause autoplay' : 'Start autoplay'}
              className="text-stone-600 hover:text-stone-900 transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-stone-400 rounded-full"
            >
              {isAutoplayPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
            </button>
          )}

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Carousel Slides">
            {Array.from({ length: slideCount }).map((_, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Go to slide ${index + 1} of ${slideCount}`}
                  onClick={() => scrollTo(index)}
                  className={`relative overflow-hidden transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-stone-400 ${
                    isSelected
                      ? 'w-8 h-2 bg-stone-900'
                      : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                >
                  {isSelected && (
                    <div
                      className="absolute inset-y-0 left-0 bg-amber-600 transition-all duration-100 ease-linear"
                      style={{ width: `${progressPercent}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-mono font-medium text-stone-500 pl-1 border-l border-stone-200">
            0{selectedIndex + 1} / 0{slideCount}
          </span>
        </div>

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
