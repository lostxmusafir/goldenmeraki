import type { LucideIcon } from 'lucide-react';
import { Gem, Gift, Globe2, BookOpen, Crown, Leaf, Layers } from 'lucide-react';
import type { ProductCategoryId } from '../../../types/product';

export type NavigationItemType = 'link' | 'category' | 'mega';

export interface NavigationLink {
  label: string;
  href: string;
}

export interface MegaMenuSection {
  title: string;
  items: NavigationLink[];
}

export interface FeaturedCard {
  label: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  type: NavigationItemType;
  categoryId?: ProductCategoryId;
  icon?: LucideIcon;
  sections?: MegaMenuSection[];
  featured?: FeaturedCard;
  trending?: NavigationLink[];
  brands?: NavigationLink[];
  banner?: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    image: string;
    cta: string;
  };
}

export const ANNOUNCEMENTS = [
  'Free shipping on orders above ₹999',
  'Use GOLDEN50 for instant savings',
  'Need help? Speak to our support team'
] as const;

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    label: 'Crystals',
    href: '#catalog-section',
    type: 'category',
    categoryId: 'raw-stones',
    icon: Gem
  },
  {
    label: 'Jewelry',
    href: '#catalog-section',
    type: 'category',
    categoryId: 'bracelets',
    icon: Crown
  },
  {
    label: 'Collections',
    href: '#collections',
    type: 'mega',
    icon: Layers,
    featured: {
      label: 'Featured Collection',
      title: 'The Golden Meridian Edit',
      description: 'A refined curation of crystals chosen for clarity, balance, and quiet luxury.',
      href: '#catalog-section',
      image: '/images/pyrite_cluster.png'
    },
    sections: [
      {
        title: 'Categories',
        items: [
          { label: 'Raw Crystals', href: '#catalog-section' },
          { label: 'Bracelets', href: '#catalog-section' },
          { label: 'Feng Shui Decor', href: '#catalog-section' },
          { label: 'Wellness Tools', href: '#catalog-section' }
        ]
      },
      {
        title: 'Trending',
        items: [
          { label: 'Pyrite Clusters', href: '#catalog-section' },
          { label: '7 Chakra Bracelets', href: '#catalog-section' },
          { label: 'Amethyst Geodes', href: '#catalog-section' },
          { label: 'Rose Quartz Gua Sha', href: '#catalog-section' }
        ]
      }
    ],
    brands: [
      { label: 'Golden Meraki', href: '#catalog-section' },
      { label: 'Aurum Rituals', href: '#catalog-section' },
      { label: 'Vastu Studio', href: '#catalog-section' },
      { label: 'Earth Alchemy', href: '#catalog-section' }
    ],
    trending: [
      { label: 'Healing', href: '#catalog-section' },
      { label: 'Prosperity', href: '#catalog-section' },
      { label: 'Protection', href: '#catalog-section' },
      { label: 'Mindfulness', href: '#catalog-section' }
    ],
    banner: {
      eyebrow: 'Limited Capsule',
      title: 'A quiet drop for your most intentional rituals.',
      description: 'Explore premium stones and modern spiritual objects designed for elevated everyday spaces.',
      href: '#catalog-section',
      image: '/images/fengshui_crystal_tree.png',
      cta: 'Shop the Edit'
    }
  },
  {
    label: 'Wellness',
    href: '#catalog-section',
    type: 'category',
    categoryId: 'face-wellness',
    icon: Leaf
  },
  {
    label: 'Journal',
    href: '#journal',
    type: 'link',
    icon: BookOpen
  },
  {
    label: 'Gifts',
    href: '#catalog-section',
    type: 'link',
    icon: Gift
  },
  {
    label: 'World of Meraki',
    href: '#catalog-section',
    type: 'link',
    icon: Globe2
  }
];

