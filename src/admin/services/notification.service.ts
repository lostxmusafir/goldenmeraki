import { apiClient } from './apiClient';
import type { AdminNotification, NotificationStatus } from '../types/notification.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';

export interface NotificationQueryParams extends PaginationParams {
  status?: string;
  productId?: string;
}

const unwrapData = <T>(response: any): T => {
  return response.data?.data !== undefined ? response.data.data : response.data;
};

export const notificationService = {
  async getNotifications(params: NotificationQueryParams = {}): Promise<PaginatedResponse<AdminNotification>> {
    const response = await apiClient.get('/notifications', {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        search: params.search,
        status: params.status && params.status !== 'all' ? params.status : undefined,
        productId: params.productId,
      },
    });

    const payload = unwrapData<{ notifications: AdminNotification[]; meta: { total: number; page: number; limit: number; totalPages: number } }>(response);
    const notifications = payload.notifications ?? [];

    return {
      data: notifications,
      total: payload.meta?.total ?? notifications.length,
      page: payload.meta?.page ?? (params.page || 1),
      limit: payload.meta?.limit ?? (params.limit || 10),
      totalPages: payload.meta?.totalPages ?? 1,
    };
  },

  async updateStatus(id: string, status: NotificationStatus): Promise<AdminNotification> {
    const response = await apiClient.patch(`/notifications/${id}/status`, { status });
    return unwrapData<AdminNotification>(response);
  },

  async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`/notifications/${id}`);
  },

  async exportCsv(params: NotificationQueryParams = {}): Promise<Blob> {
    const response = await apiClient.get('/notifications/export', {
      params: {
        search: params.search,
        status: params.status && params.status !== 'all' ? params.status : undefined,
      },
      responseType: 'blob',
    });
    return response.data;
  },
};
