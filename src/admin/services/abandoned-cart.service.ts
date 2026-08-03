import { apiClient } from './apiClient';
import type { AdminAbandonedCart, RecoveryStatus } from '../types/abandoned-cart.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';

export interface AbandonedCartQueryParams extends PaginationParams {
  recoveryStatus?: string;
  sort?: string;
}

const unwrapData = <T>(response: any): T => {
  return response.data?.data !== undefined ? response.data.data : response.data;
};

export const abandonedCartService = {
  async saveAbandonedCart(payload: {
    cartId: string;
    customerName?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    shippingAddress?: { street?: string; city?: string; state?: string; country?: string; pincode?: string };
    products: Array<{ productId: string; title: string; quantity: number; price: number; image?: string }>;
    cartTotal: number;
    recoveryStatus?: RecoveryStatus;
    source?: string;
  }): Promise<AdminAbandonedCart> {
    const response = await apiClient.post('/abandoned-cart', payload);
    return unwrapData<AdminAbandonedCart>(response);
  },

  async getAbandonedCarts(params: AbandonedCartQueryParams = {}): Promise<PaginatedResponse<AdminAbandonedCart>> {
    const response = await apiClient.get('/abandoned-cart', {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        search: params.search,
        recoveryStatus: params.recoveryStatus && params.recoveryStatus !== 'all' ? params.recoveryStatus : undefined,
        sort: params.sort,
      },
    });

    const payload = unwrapData<{ abandonedCarts: AdminAbandonedCart[]; meta: { total: number; page: number; limit: number; totalPages: number } }>(response);
    const items = payload.abandonedCarts ?? [];

    return {
      data: items,
      total: payload.meta?.total ?? items.length,
      page: payload.meta?.page ?? (params.page || 1),
      limit: payload.meta?.limit ?? (params.limit || 10),
      totalPages: payload.meta?.totalPages ?? 1,
    };
  },

  async getAbandonedCartById(id: string): Promise<AdminAbandonedCart | null> {
    const response = await apiClient.get(`/abandoned-cart/${id}`);
    return unwrapData<AdminAbandonedCart>(response);
  },

  async updateAbandonedCart(id: string, updateDto: Partial<AdminAbandonedCart>): Promise<AdminAbandonedCart> {
    const response = await apiClient.patch(`/abandoned-cart/${id}`, updateDto);
    return unwrapData<AdminAbandonedCart>(response);
  },

  async deleteAbandonedCart(id: string): Promise<void> {
    await apiClient.delete(`/abandoned-cart/${id}`);
  },

  async exportCsv(params: AbandonedCartQueryParams = {}): Promise<Blob> {
    const response = await apiClient.get('/abandoned-cart/export', {
      params: {
        search: params.search,
        recoveryStatus: params.recoveryStatus && params.recoveryStatus !== 'all' ? params.recoveryStatus : undefined,
      },
      responseType: 'blob',
    });
    return response.data;
  },
};
