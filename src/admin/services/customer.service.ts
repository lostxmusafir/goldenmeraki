import type { Customer } from '../types/customer.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';
import { mockStorage } from './mockData';

export const customerService = {
  async getCustomers(params: PaginationParams = {}): Promise<PaginatedResponse<Customer>> {
    await new Promise((res) => setTimeout(res, 300));
    let items = mockStorage.getCustomers();

    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q)
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

  async getCustomerById(id: string): Promise<Customer | null> {
    await new Promise((res) => setTimeout(res, 200));
    const items = mockStorage.getCustomers();
    return items.find((c) => c.id === id) || null;
  },

  async toggleCustomerStatus(id: string): Promise<Customer> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getCustomers();
    const index = items.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Customer not found');

    const nextStatus = items[index].status === 'active' ? 'blocked' : 'active';
    items[index] = { ...items[index], status: nextStatus };
    mockStorage.setCustomers(items);
    return items[index];
  }
};
