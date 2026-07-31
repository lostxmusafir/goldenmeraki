import type { Subscriber } from '../types/newsletter.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';
import { mockStorage } from './mockData';

export const newsletterService = {
  async getSubscribers(params: PaginationParams = {}): Promise<PaginatedResponse<Subscriber>> {
    await new Promise((res) => setTimeout(res, 300));
    let items = mockStorage.getSubscribers();

    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter((s) => s.email.toLowerCase().includes(q));
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
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getSubscribers();
    const next = items.filter((s) => s.id !== id);
    mockStorage.setSubscribers(next);
  }
};
