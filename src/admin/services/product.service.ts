import { apiClient } from './apiClient';
import type { AdminProduct, CreateProductDTO, UpdateProductDTO, InventoryStatusType, SizeVariant } from '../types/product.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';

export interface ProductQueryParams extends PaginationParams {
  categoryId?: string;
  status?: string;
  inventoryStatus?: string;
  includeInactive?: boolean;
}

const unwrapData = <T>(response: any): T => {
  return response.data?.data !== undefined ? response.data.data : response.data;
};

/**
 * Normalize raw sizes from API — handles both new `sizes` and legacy `widthSizes`.
 */
const normalizeSizes = (item: any): SizeVariant[] => {
  // Prefer the new `sizes` field
  if (Array.isArray(item.sizes) && item.sizes.length > 0) {
    return item.sizes.map((s: any) => ({
      size: s.size || '',
      price: Number(s.price ?? 0),
      originalPrice: s.originalPrice != null ? Number(s.originalPrice) : undefined,
      discountPrice: s.discountPrice != null ? Number(s.discountPrice) : undefined,
      stock: Number(s.stock ?? 0),
      isActive: s.isActive !== false,
    }));
  }

  // Fall back to legacy widthSizes
  if (Array.isArray(item.widthSizes) && item.widthSizes.length > 0) {
    return item.widthSizes.map((ws: any) => {
      if (typeof ws === 'string') {
        return {
          size: ws,
          price: Number(item.price ?? 0),
          originalPrice: item.originalPrice != null ? Number(item.originalPrice) : undefined,
          stock: Number(item.stock ?? 0),
          isActive: true,
        };
      }
      return {
        size: ws.size || '',
        price: Number(ws.price ?? item.price ?? 0),
        originalPrice: ws.originalPrice != null ? Number(ws.originalPrice) : undefined,
        discountPrice: ws.discountPrice != null ? Number(ws.discountPrice) : undefined,
        stock: Number(ws.stock ?? item.stock ?? 0),
        isActive: ws.isActive !== false,
      };
    });
  }

  return [];
};

const mapProduct = (item: any): AdminProduct => {
  const sizes = normalizeSizes(item);
  let stock = Number(item.stock ?? 0);
  if (sizes.length > 0) {
    stock = sizes.reduce((sum, s) => sum + (s.isActive !== false ? Number(s.stock || 0) : 0), 0);
  }

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
    intention: item.intention ?? '',
    chakra: item.chakra ?? '',
    sizes: normalizeSizes(item),
    video: item.video || undefined,
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
        includeInactive: params.includeInactive,
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
      intention: dto.intention,
      chakra: dto.chakra,
      sizes: dto.sizes,
      video: dto.video,
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
      intention: dto.intention,
      chakra: dto.chakra,
      sizes: dto.sizes,
      video: dto.video,
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

  // --- Image APIs ---
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

  // --- Video APIs ---
  async uploadVideo(id: string, file: File): Promise<AdminProduct> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post(`/products/${id}/video/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000, // 2 min timeout for large videos
    });
    return mapProduct(unwrapData<any>(response));
  },

  async deleteVideo(id: string): Promise<AdminProduct> {
    const response = await apiClient.delete(`/products/${id}/video`);
    return mapProduct(unwrapData<any>(response));
  },
};
