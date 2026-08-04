import { apiClient } from './apiClient';
import type { AdminProduct, CreateProductDTO, UpdateProductDTO, InventoryStatusType } from '../types/product.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';

export interface ProductQueryParams extends PaginationParams {
  categoryId?: string;
  status?: string;
  inventoryStatus?: string;
}

const unwrapData = <T>(response: any): T => {
  return response.data?.data !== undefined ? response.data.data : response.data;
};

const mapProduct = (item: any): AdminProduct => {
  const stock = Number(item.stock ?? 0);
  let inventoryStatus: InventoryStatusType = item.inventoryStatus;
  if (!inventoryStatus) {
    inventoryStatus = stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK';
  }

  return {
    id: item._id ?? item.id,
    name: item.title ?? item.name,
    slug: item.slug ?? (item.title ?? item.name)?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ?? 'product',
    categoryId: item.category?._id ?? item.category?.id ?? item.category ?? '',
    categoryName: item.category?.name ?? 'Uncategorized',
    price: Number(item.price ?? 0),
    originalPrice: item.originalPrice != null ? Number(item.originalPrice) : undefined,
    discountPrice: item.discountPrice != null ? Number(item.discountPrice) : undefined,
    stock,
    inventoryStatus,
    images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [],
    status: item.isActive === false ? 'draft' : 'active',
    description: item.description ?? '',
    badge: item.badge ?? undefined,
    isFeatured: Boolean(item.isFeatured),
    isActive: item.isActive !== false,
    widthSizes: item.widthSizes ?? [],
    ratings: item.ratings ? { average: Number(item.ratings.average || 0), count: Number(item.ratings.count || 0) } : undefined,
    createdAt: item.createdAt ?? new Date().toISOString(),
    updatedAt: item.updatedAt ?? item.createdAt ?? new Date().toISOString(),
  };
};

export const productService = {
  async getProducts(params: ProductQueryParams = {}): Promise<PaginatedResponse<AdminProduct>> {
    const response = await apiClient.get('/products', {
      params: {
        page: params.page || 1,
        limit: params.limit || 100,
        search: params.search,
        category: params.categoryId && params.categoryId !== 'all' ? params.categoryId : undefined,
        inventoryStatus: params.inventoryStatus && params.inventoryStatus !== 'all' ? params.inventoryStatus : undefined,
        isActive: params.status && params.status !== 'all' ? (params.status === 'active') : undefined,
      },
    });

    const payload = unwrapData<{ products: any[]; meta: { total: number; page: number; limit: number; totalPages: number } }>(response);
    const items = (payload.products ?? []).map(mapProduct);

    return {
      data: items,
      total: payload.meta?.total ?? items.length,
      page: payload.meta?.page ?? (params.page || 1),
      limit: payload.meta?.limit ?? (params.limit || 10),
      totalPages: payload.meta?.totalPages ?? 1,
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
      inventoryStatus: dto.inventoryStatus,
      category: dto.categoryId,
      badge: dto.badge,
      images: dto.images ?? [],
      isFeatured: dto.isFeatured,
      isActive: dto.status !== 'draft',
      widthSizes: dto.widthSizes,
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
      inventoryStatus: dto.inventoryStatus,
      category: dto.categoryId,
      badge: dto.badge,
      images: dto.images ?? undefined,
      isFeatured: dto.isFeatured,
      isActive: dto.status !== undefined ? (dto.status !== 'draft') : undefined,
      widthSizes: dto.widthSizes,
    });

    return mapProduct(unwrapData<any>(response));
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },

  // --- Bulk Operations (Requirement #4) ---
  async bulkUpdateCategory(productIds: string[], categoryId: string): Promise<void> {
    await apiClient.patch('/products/bulk/category', { productIds, categoryId });
  },

  async bulkUpdateStatus(productIds: string[], isActive?: boolean, isFeatured?: boolean): Promise<void> {
    await apiClient.patch('/products/bulk/status', { productIds, isActive, isFeatured });
  },

  async bulkUpdateInventory(productIds: string[], inventoryStatus?: InventoryStatusType, stockQuantity?: number): Promise<void> {
    await apiClient.patch('/products/bulk/inventory', { productIds, inventoryStatus, stockQuantity });
  },

  // --- Notify Me (Requirement #5 & #7) ---
  async notifyMe(
    productId: string,
    data: { name: string; phone?: string; whatsapp: string; email?: string; requestedSize?: string },
  ): Promise<any> {
    const response = await apiClient.post(`/products/${productId}/notify`, data);
    return response.data;
  },

  async uploadImage(id: string, file: File): Promise<AdminProduct> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post(`/products/${id}/images/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return mapProduct(unwrapData<any>(response));
  },

  async replaceImage(id: string, oldImageUrl: string, file: File): Promise<AdminProduct> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('oldImageUrl', oldImageUrl);
    const response = await apiClient.put(`/products/${id}/images/replace`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return mapProduct(unwrapData<any>(response));
  },

  async reorderImages(id: string, images: string[]): Promise<AdminProduct> {
    const response = await apiClient.put(`/products/${id}/images/reorder`, { images });
    return mapProduct(unwrapData<any>(response));
  },

  async deleteImage(id: string, imageUrl: string): Promise<AdminProduct> {
    const response = await apiClient.delete(`/products/${id}/images`, {
      params: { imageUrl },
    });
    return mapProduct(unwrapData<any>(response));
  },
};
