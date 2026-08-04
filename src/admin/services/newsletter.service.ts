import { apiClient } from './apiClient';
import type { Subscriber } from '../types/newsletter.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';

export const newsletterService = {
  async getSubscribers(params: PaginationParams = {}): Promise<PaginatedResponse<Subscriber>> {
    const response = await apiClient.get('/newsletter');
    const payload = response.data?.data ?? response.data;
    let items = (payload ?? []).map((item: any) => ({
      id: item._id ?? item.id,
      email: item.email,
      status: item.isSubscribed ? 'active' : 'inactive',
      createdAt: item.createdAt ?? new Date().toISOString()
    }));

    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter((s: Subscriber) => s.email.toLowerCase().includes(q));
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

  async deleteSubscriber(id: string): Promise<void> {
    await apiClient.delete(`/newsletter/${id}`);
  }
};
