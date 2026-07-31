import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from '../types/category.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';
import { mockStorage } from './mockData';

export const categoryService = {
  async getCategories(params: PaginationParams = {}): Promise<PaginatedResponse<Category>> {
    await new Promise((res) => setTimeout(res, 300));
    let items = mockStorage.getCategories();

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
    await new Promise((res) => setTimeout(res, 200));
    const items = mockStorage.getCategories();
    return items.find((c) => c.id === id) || null;
  },

  async createCategory(dto: CreateCategoryDTO): Promise<Category> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getCategories();
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: dto.name,
      slug: dto.slug || dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: dto.description,
      image: dto.image || 'https://images.unsplash.com/photo-1611591475240-4f20c16a0846?auto=format&fit=crop&w=600&q=80',
      status: dto.status,
      productCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    items.unshift(newCategory);
    mockStorage.setCategories(items);
    return newCategory;
  },

  async updateCategory(id: string, dto: UpdateCategoryDTO): Promise<Category> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getCategories();
    const index = items.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Category not found');

    const updated: Category = {
      ...items[index],
      ...dto,
      updatedAt: new Date().toISOString()
    };

    items[index] = updated;
    mockStorage.setCategories(items);
    return updated;
  },

  async deleteCategory(id: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getCategories();
    const next = items.filter((c) => c.id !== id);
    mockStorage.setCategories(next);
  }
};
