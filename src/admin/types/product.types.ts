export interface AdminProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  status: 'active' | 'draft' | 'out_of_stock';
  description: string;
  badge?: string;
  certificate?: string;
  chakra?: string;
  intention?: string;
  stone?: string;
  subCategory?: string;
  benefits?: string[];
  tags?: string[];
  weights?: string[];
  isFeatured?: boolean;
  attributes?: Record<string, string>;
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDTO {
  sku?: string;
  name: string;
  slug?: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  status: 'active' | 'draft' | 'out_of_stock';
  description: string;
  badge?: string;
  certificate?: string;
  chakra?: string;
  intention?: string;
  stone?: string;
  subCategory?: string;
  benefits?: string[];
  tags?: string[];
  weights?: string[];
  isFeatured?: boolean;
  attributes?: Record<string, string>;
  specifications?: Record<string, string>;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
