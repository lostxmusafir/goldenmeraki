import type { BaseEntity, ImagePath, Nullable } from './common';

export type ProductCategoryId = string;

export type ProductIntentionId = string;

export type ProductChakraId = string;

export type ProductSubcategoryId = string;

export interface ProductSpecification {
  origin: string;
  authenticity: string;
}

export interface Product extends BaseEntity {
  id: string;
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
  stone: string;
  tags: string[];
  benefits: string[];
  specifications: Record<string, string> | ProductSpecification;
  slug?: string;
}

export interface CustomBead extends BaseEntity {
  name: string;
  color: string;
  pricePerBead: number;
  energy: string;
  image: ImagePath;
}
