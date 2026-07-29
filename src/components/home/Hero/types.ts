export interface HeroSlide {
  id: number;
  collection: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryButton: string;
  secondaryButton: string;
  href: string;
  secondaryHref: string;
  badge?: string;
}

export interface HeroSlideProps {
  slide: HeroSlide;
  isActive: boolean;
}

export interface HeroNavigationProps {
  slideCount: number;
  selectedIndex: number;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  progressPercent: number;
  isAutoplayPlaying: boolean;
  toggleAutoplay?: () => void;
}

export interface HeroCarouselProps {
  slides?: HeroSlide[];
}
