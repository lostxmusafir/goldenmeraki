export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  status: 'active' | 'inactive';
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDTO {
  name: string;
  slug?: string;
  description: string;
  image?: string;
  status: 'active' | 'inactive';
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;
