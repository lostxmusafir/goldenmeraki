export type InventoryStatusType = 'IN_STOCK' | 'OUT_OF_STOCK' | 'COMING_SOON' | 'DISCONTINUED';

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName?: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  stock: number;
  inventoryStatus: InventoryStatusType;
  images: string[];
  status: 'active' | 'draft';
  description: string;
  badge?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  widthSizes?: (string | { size: string; price?: number; stock?: number })[];
  ratings?: {
    average: number;
    count: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDTO {
  name: string;
  slug?: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  stock: number;
  inventoryStatus: InventoryStatusType;
  images: string[];
  status?: 'active' | 'draft';
  description: string;
  badge?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  widthSizes?: (string | { size: string; price?: number; stock?: number })[];
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
