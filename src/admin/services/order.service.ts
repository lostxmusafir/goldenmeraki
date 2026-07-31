import type { AdminOrder, OrderStatus, PaymentStatus, UpdateOrderStatusDTO } from '../types/order.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';
import { mockStorage } from './mockData';

export interface OrderQueryParams extends PaginationParams {
  status?: OrderStatus | 'all';
  paymentStatus?: PaymentStatus | 'all';
}

export const orderService = {
  async getOrders(params: OrderQueryParams = {}): Promise<PaginatedResponse<AdminOrder>> {
    await new Promise((res) => setTimeout(res, 300));
    let items = mockStorage.getOrders();

    if (params.status && params.status !== 'all') {
      items = items.filter((o) => o.status === params.status);
    }

    if (params.paymentStatus && params.paymentStatus !== 'all') {
      items = items.filter((o) => o.paymentStatus === params.paymentStatus);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q)
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

  async getOrderById(id: string): Promise<AdminOrder | null> {
    await new Promise((res) => setTimeout(res, 200));
    const items = mockStorage.getOrders();
    return items.find((o) => o.id === id) || null;
  },

  async updateOrderStatus(id: string, dto: UpdateOrderStatusDTO): Promise<AdminOrder> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getOrders();
    const index = items.findIndex((o) => o.id === id);
    if (index === -1) throw new Error('Order not found');

    const updated: AdminOrder = {
      ...items[index],
      ...(dto.status ? { status: dto.status } : {}),
      ...(dto.paymentStatus ? { paymentStatus: dto.paymentStatus } : {}),
      updatedAt: new Date().toISOString()
    };

    items[index] = updated;
    mockStorage.setOrders(items);
    return updated;
  }
};
