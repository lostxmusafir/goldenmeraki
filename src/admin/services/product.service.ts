import type { AdminProduct, CreateProductDTO, UpdateProductDTO } from '../types/product.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';
import { mockStorage } from './mockData';

export interface ProductQueryParams extends PaginationParams {
  categoryId?: string;
  status?: string;
}

export const productService = {
  async getProducts(params: ProductQueryParams = {}): Promise<PaginatedResponse<AdminProduct>> {
    await new Promise((res) => setTimeout(res, 300));
    let items = mockStorage.getProducts();

    if (params.categoryId && params.categoryId !== 'all') {
      items = items.filter((p) => p.categoryId === params.categoryId);
    }

    if (params.status && params.status !== 'all') {
      items = items.filter((p) => p.status === params.status);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
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

  async getProductById(id: string): Promise<AdminProduct | null> {
    await new Promise((res) => setTimeout(res, 200));
    const items = mockStorage.getProducts();
    return items.find((p) => p.id === id) || null;
  },

  async createProduct(dto: CreateProductDTO): Promise<AdminProduct> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getProducts();
    const categories = mockStorage.getCategories();
    const category = categories.find((c) => c.id === dto.categoryId);

    const newProduct: AdminProduct = {
      id: `prod-${Date.now()}`,
      sku: dto.sku || `GM-PROD-${Math.floor(100 + Math.random() * 900)}`,
      name: dto.name,
      slug: dto.slug || dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryId: dto.categoryId,
      categoryName: category?.name || 'Uncategorized',
      price: dto.price,
      discountPrice: dto.discountPrice,
      stock: dto.stock,
      images: dto.images.length > 0 ? dto.images : ['https://images.unsplash.com/photo-1611591475240-4f20c16a0846?auto=format&fit=crop&w=600&q=80'],
      status: dto.status,
      description: dto.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    items.unshift(newProduct);
    mockStorage.setProducts(items);

    if (category) {
      category.productCount += 1;
      mockStorage.setCategories(categories);
    }

    return newProduct;
  },

  async updateProduct(id: string, dto: UpdateProductDTO): Promise<AdminProduct> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getProducts();
    const index = items.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');

    let categoryName = items[index].categoryName;
    if (dto.categoryId && dto.categoryId !== items[index].categoryId) {
      const categories = mockStorage.getCategories();
      const cat = categories.find((c) => c.id === dto.categoryId);
      if (cat) categoryName = cat.name;
    }

    const updated: AdminProduct = {
      ...items[index],
      ...dto,
      categoryName,
      updatedAt: new Date().toISOString()
    };

    items[index] = updated;
    mockStorage.setProducts(items);
    return updated;
  },

  async deleteProduct(id: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getProducts();
    const next = items.filter((p) => p.id !== id);
    mockStorage.setProducts(next);
  }
};
