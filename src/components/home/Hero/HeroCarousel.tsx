import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { HeroSlide } from './HeroSlide';
import { HeroNavigation } from './HeroNavigation';
import { heroSlides } from './heroSlides';
import type { HeroCarouselProps } from './types';

const AUTOPLAY_DELAY_MS = 5500;

export function HeroCarousel({ slides = heroSlides }: HeroCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(true);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isAutoplayPlaying, setIsAutoplayPlaying] = useState(true);

  const autoplayPlugin = useRef(
    Autoplay({
      delay: AUTOPLAY_DELAY_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: true
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 30,
      skipSnaps: false
    },
    [autoplayPlugin.current]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setProgressPercent(0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Keyboard Navigation Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        scrollNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext]);

  // Autoplay Progress Bar Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    let startTime = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min((elapsed / AUTOPLAY_DELAY_MS) * 100, 100);
      setProgressPercent(progress);

      if (elapsed < AUTOPLAY_DELAY_MS) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    if (isAutoplayPlaying) {
      startTime = performance.now();
      animationFrameId = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [selectedIndex, isAutoplayPlaying]);

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    if (autoplay.isPlaying()) {
      autoplay.stop();
      setIsAutoplayPlaying(false);
    } else {
      autoplay.play();
      setIsAutoplayPlaying(true);
    }
  }, [emblaApi]);

  return (
    <section
      aria-label="Featured Collections Hero Carousel"
      className="relative w-full overflow-hidden bg-[#FAF8F5]"
      onMouseEnter={() => setIsAutoplayPlaying(false)}
      onMouseLeave={() => setIsAutoplayPlaying(true)}
    >
      <div ref={emblaRef} className="overflow-hidden w-full cursor-grab active:cursor-grabbing">
        <div className="flex w-full">
          {slides.map((slide, index) => (
            <HeroSlide
              key={slide.id}
              slide={slide}
              isActive={index === selectedIndex}
            />
          ))}
        </div>
      </div>

      <HeroNavigation
        slideCount={slides.length}
        selectedIndex={selectedIndex}
        scrollPrev={scrollPrev}
        scrollNext={scrollNext}
        scrollTo={scrollTo}
        canScrollPrev={canScrollPrev}
        canScrollNext={canScrollNext}
        progressPercent={progressPercent}
        isAutoplayPlaying={isAutoplayPlaying}
        toggleAutoplay={toggleAutoplay}
      />
    </section>
  );
}
