import { apiClient } from './apiClient';
import type { AdminProduct, CreateProductDTO, UpdateProductDTO } from '../types/product.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';

export interface ProductQueryParams extends PaginationParams {
  categoryId?: string;
  status?: string;
}

const unwrapData = <T>(response: { data: { data: T } }): T => response.data.data;

const normalizeArrayField = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === 'string') {
    return value.split(',').map((entry) => entry.trim()).filter(Boolean);
  }
  return undefined;
};

const normalizeObjectField = (value: unknown): Record<string, string> | undefined => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, String(entry)]));
  }
  return undefined;
};

const mapProduct = (item: any): AdminProduct => ({
  id: item._id ?? item.id,
  sku: item.sku ?? item.slug?.toUpperCase().replace(/-/g, '') ?? (item._id ?? item.id)?.slice(-6) ?? 'GM-001',
  name: item.title ?? item.name,
  slug: item.slug ?? (item.title ?? item.name)?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ?? 'product',
  categoryId: item.category?._id ?? item.category?.id ?? item.category ?? '',
  categoryName: item.category?.name ?? 'Uncategorized',
  price: Number(item.price ?? 0),
  originalPrice: item.originalPrice != null ? Number(item.originalPrice) : undefined,
  discountPrice: item.discountPrice != null ? Number(item.discountPrice) : undefined,
  stock: Number(item.stock ?? 0),
  images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [],
  status: item.isActive === false ? 'draft' : Number(item.stock ?? 0) > 0 ? 'active' : 'out_of_stock',
  description: item.description ?? '',
  badge: item.badge ?? undefined,
  certificate: item.certificate ?? undefined,
  chakra: item.chakra ?? undefined,
  intention: item.intention ?? undefined,
  stone: item.stone ?? undefined,
  subCategory: item.subCategory ?? undefined,
  benefits: normalizeArrayField(item.benefits),
  tags: normalizeArrayField(item.tags),
  weights: normalizeArrayField(item.weights),
  isFeatured: Boolean(item.isFeatured),
  attributes: normalizeObjectField(item.attributes),
  specifications: normalizeObjectField(item.specifications),
  createdAt: item.createdAt ?? new Date().toISOString(),
  updatedAt: item.updatedAt ?? item.createdAt ?? new Date().toISOString()
});

export const productService = {
  async getProducts(params: ProductQueryParams = {}): Promise<PaginatedResponse<AdminProduct>> {
    const response = await apiClient.get('/products', {
      params: {
        page: 1,
        limit: 1000,
        search: params.search,
        category: params.categoryId && params.categoryId !== 'all' ? params.categoryId : undefined
      }
    });

    const payload = unwrapData<{ products: any[]; meta: { total: number; page: number; limit: number } }>(response);
    let items = (payload.products ?? []).map(mapProduct);

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
    const response = await apiClient.get(`/products/${id}`);
    return mapProduct(unwrapData<any>(response));
  },

  async createProduct(dto: CreateProductDTO): Promise<AdminProduct> {
    const response = await apiClient.post('/products', {
      title: dto.name,
      description: dto.description,
      price: Number(dto.price),
      originalPrice: dto.originalPrice != null ? Number(dto.originalPrice) : undefined,
      discountPrice: dto.discountPrice != null ? Number(dto.discountPrice) : undefined,
      stock: Number(dto.stock),
      category: dto.categoryId,
      badge: dto.badge,
      certificate: dto.certificate,
      chakra: dto.chakra,
      intention: dto.intention,
      stone: dto.stone,
      subCategory: dto.subCategory,
      benefits: dto.benefits,
      images: dto.images ?? [],
      tags: dto.tags,
      weights: dto.weights,
      isFeatured: dto.isFeatured,
      isActive: dto.status !== 'draft',
      attributes: dto.attributes,
      specifications: dto.specifications
    });

    return mapProduct(unwrapData<any>(response));
  },

  async updateProduct(id: string, dto: UpdateProductDTO): Promise<AdminProduct> {
    const response = await apiClient.patch(`/products/${id}`, {
      title: dto.name,
      description: dto.description,
      price: dto.price != null ? Number(dto.price) : undefined,
      originalPrice: dto.originalPrice != null ? Number(dto.originalPrice) : undefined,
      discountPrice: dto.discountPrice != null ? Number(dto.discountPrice) : undefined,
      stock: dto.stock != null ? Number(dto.stock) : undefined,
      category: dto.categoryId,
      badge: dto.badge,
      certificate: dto.certificate,
      chakra: dto.chakra,
      intention: dto.intention,
      stone: dto.stone,
      subCategory: dto.subCategory,
      benefits: dto.benefits,
      images: dto.images ?? undefined,
      tags: dto.tags,
      weights: dto.weights,
      isFeatured: dto.isFeatured,
      isActive: dto.status !== 'draft',
      attributes: dto.attributes,
      specifications: dto.specifications
    });

    return mapProduct(unwrapData<any>(response));
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }
};
