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
  progressPercent: number;
}

export interface HeroCarouselProps {
  slides?: HeroSlide[];
}
