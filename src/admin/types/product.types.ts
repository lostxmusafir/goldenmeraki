export interface AdminProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  status: 'active' | 'draft' | 'out_of_stock';
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDTO {
  sku: string;
  name: string;
  slug?: string;
  categoryId: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  status: 'active' | 'draft' | 'out_of_stock';
  description: string;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
