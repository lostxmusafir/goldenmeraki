import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { HeroSlideProps } from './types';

export function HeroSlide({ slide, isActive }: HeroSlideProps) {
  return (
    <div className="min-w-0 flex-[0_0_100%] relative w-full overflow-hidden select-none">
      <div className="relative w-full min-h-[440px] sm:h-[500px] md:h-[620px] bg-[#FAF8F5] flex items-center justify-center">
        {/* Soft luxury ambient background highlights */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-gradient-to-br from-amber-100/40 via-amber-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-gradient-to-tr from-stone-200/30 via-stone-100/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className={`lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6 transition-all duration-500 transform ${
              isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
            }`}>
              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-stone-900 tracking-tight leading-[1.12]">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base font-medium uppercase tracking-widest text-amber-800/80">
                  {slide.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="max-w-xl text-xs sm:text-sm md:text-base text-stone-600 font-light leading-relaxed">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <Link
                  to={slide.href}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-medium tracking-wider text-white uppercase bg-stone-900 hover:bg-stone-800 rounded-full transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
                >
                  <span>{slide.primaryButton}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to={slide.secondaryHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-medium tracking-wider text-stone-800 uppercase bg-white/90 hover:bg-white border border-stone-300/80 hover:border-stone-400 rounded-full transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 backdrop-blur-sm"
                >
                  <span>{slide.secondaryButton}</span>
                </Link>
              </div>
            </div>

            {/* Right Image Showcase Column */}
            <div className={`lg:col-span-5 flex items-center justify-center transition-all duration-500 delay-100 transform ${
              isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-90'
            }`}>
              <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] aspect-square flex items-center justify-center">
                {/* Decorative background frame */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-stone-200/60 to-amber-100/40 transform rotate-3 scale-95 transition-transform duration-500 hover:rotate-1" />
                
                {/* Image container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-stone-200/80 bg-white/60 shadow-xl backdrop-blur-sm p-4 flex items-center justify-center group">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain transform transition-transform duration-700 ease-out group-hover:scale-105"
                    loading={slide.id === 1 ? 'eager' : 'lazy'}
                  />
                  {/* Subtle lighting highlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-white/20 pointer-events-none rounded-3xl" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
