import { apiClient } from './apiClient';
import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from '../types/category.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';

const unwrapData = <T>(response: { data: { data: T } }): T => response.data.data;

const mapCategory = (item: any): Category => ({
  id: item._id ?? item.id,
  name: item.name ?? 'Untitled Category',
  slug: item.slug ?? item.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ?? 'category',
  description: item.description ?? '',
  image: item.image ?? '',
  status: item.isActive === false ? 'inactive' : 'active',
  productCount: item.productCount ?? 0,
  category: item.category ?? '',
  parent: item.parent?._id ?? item.parent ?? '',
  createdAt: item.createdAt ?? new Date().toISOString(),
  updatedAt: item.updatedAt ?? item.createdAt ?? new Date().toISOString()
});

export const categoryService = {
  async getCategories(params: PaginationParams = {}): Promise<PaginatedResponse<Category>> {
    const response = await apiClient.get('/categories', {
      params: { includeInactive: true }
    });

    let items = (unwrapData<any[]>(response) ?? []).map(mapCategory);

    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }

    const page = params.page || 1;
    const limit = params.limit || 10;
    const total = items.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const data = items.slice(start, start + limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages
    };
  },

  async getCategoryById(id: string): Promise<Category | null> {
    const response = await apiClient.get(`/categories/${id}`);
    return mapCategory(unwrapData<any>(response));
  },

  async createCategory(dto: CreateCategoryDTO): Promise<Category> {
    const response = await apiClient.post('/categories', {
      name: dto.name,
      description: dto.description,
      image: dto.image,
      category: dto.category,
      parent: dto.parent,
      isActive: dto.status === 'active'
    });

    return mapCategory(unwrapData<any>(response));
  },

  async updateCategory(id: string, dto: UpdateCategoryDTO): Promise<Category> {
    const response = await apiClient.patch(`/categories/${id}`, {
      name: dto.name,
      description: dto.description,
      image: dto.image,
      category: dto.category,
      parent: dto.parent,
      isActive: dto.status === 'active'
    });

    return mapCategory(unwrapData<any>(response));
  },

  async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  },

  async uploadImage(id: string, file: File): Promise<Category> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post(`/categories/${id}/image/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return mapCategory(unwrapData<any>(response));
  },

  async deleteImage(id: string): Promise<Category> {
    const response = await apiClient.delete(`/categories/${id}/image`);
    return mapCategory(unwrapData<any>(response));
  }
};
