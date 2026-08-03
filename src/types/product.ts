import type { BaseEntity, ImagePath } from './common';

export type ProductCategoryId = string;
export type InventoryStatusType = 'IN_STOCK' | 'OUT_OF_STOCK' | 'COMING_SOON' | 'DISCONTINUED';

export interface Product extends BaseEntity {
  id: string;
  name: string;
  slug?: string;
  category: ProductCategoryId;
  subCategory?: string;
  intention?: string;
  chakra?: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  stock: number;
  inventoryStatus: InventoryStatusType;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  image?: ImagePath;
  images: ImagePath[];
  description: string;
  stone?: string;
  certificate?: string;
  weights?: string[];
  tags?: string[];
  benefits?: string[];
  specifications?: Record<string, string> | any;
  isFeatured?: boolean;
  isActive?: boolean;
  widthSizes?: (string | { size: string; price?: number; stock?: number })[];
  selectedWidthSize?: string;
}
