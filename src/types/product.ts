import type { BaseEntity, ImagePath, Nullable } from './common';

export type ProductCategoryId =
  | 'all'
  | 'bracelets'
  | 'raw-stones'
  | 'trees-decor'
  | 'malas-jewelry'
  | 'face-wellness'
  | 'zodiac-kits';

export type ProductIntentionId = 'wealth' | 'love' | 'peace' | 'protection' | 'health';

export type ProductChakraId =
  | 'crown'
  | 'third-eye'
  | 'throat'
  | 'heart'
  | 'solar'
  | 'sacral'
  | 'root';

export type ProductSubcategoryId = string;

export interface ProductSpecification {
  origin: string;
  authenticity: string;
}

export interface Product extends BaseEntity {
  name: string;
  category: ProductCategoryId;
  subCategory: ProductSubcategoryId;
  intention: ProductIntentionId;
  chakra: ProductChakraId;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  badge: string;
  image: ImagePath;
  images: ImagePath[];
  certificate: string;
  description: string;
  weights: string[];
  sku: string;
  stone: string;
  tags: string[];
  benefits: string[];
  specifications: ProductSpecification;
}

export interface CustomBead extends BaseEntity {
  name: string;
  color: string;
  pricePerBead: number;
  energy: string;
  image: ImagePath;
}

