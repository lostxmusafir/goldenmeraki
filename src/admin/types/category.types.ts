export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  status: 'active' | 'inactive';
  productCount: number;
  category?: string;
  parent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDTO {
  name: string;
  slug?: string;
  description: string;
  image?: string;
  status: 'active' | 'inactive';
  category?: string;
  parent?: string;
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;
