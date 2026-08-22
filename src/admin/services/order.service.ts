import { apiClient } from './apiClient';
import type { AdminOrder, CreateOrderDTO, UpdateOrderStatusDTO } from '../types/order.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';

export interface OrderQueryParams extends PaginationParams {
  orderStatus?: string;
  paymentStatus?: string;
}

const unwrapData = <T>(response: any): T => {
  return response.data?.data !== undefined ? response.data.data : response.data;
};

const mapOrder = (item: any): AdminOrder => ({
  id: item._id ?? item.id,
  orderNumber: item.orderNumber ?? 'GM-ORD-000',
  customerName: item.customerName ?? 'Guest Customer',
  phone: item.phone ?? '',
  whatsapp: item.whatsapp ?? item.phone ?? '',
  shippingAddress: item.shippingAddress || { street: '', city: '', state: '', country: 'India', pincode: '' },
  cartItems: item.cartItems || [],
  totalAmount: Number(item.totalAmount || 0),
  orderDate: item.orderDate ?? item.createdAt ?? new Date().toISOString(),
  orderStatus: item.orderStatus ?? 'AWAITING_WHATSAPP',
  paymentStatus: item.paymentStatus ?? 'PENDING',
  source: item.source ?? 'WHATSAPP_WEB',
  orderNotes: item.orderNotes,
  generatedWhatsappMessage: item.generatedWhatsappMessage,
  whatsappHandoffAt: item.whatsappHandoffAt,
  awaitingWhatsappExpiresAt: item.awaitingWhatsappExpiresAt,
  confirmedAt: item.confirmedAt,
  cancelledAt: item.cancelledAt,
  expiredAt: item.expiredAt,
  createdAt: item.createdAt ?? new Date().toISOString(),
  updatedAt: item.updatedAt ?? item.createdAt ?? new Date().toISOString(),
});

export const orderService = {
  async createOrder(dto: CreateOrderDTO): Promise<{ order: AdminOrder; whatsappUrl: string }> {
    const response = await apiClient.post('/orders', dto);
    const data = unwrapData<{ order: any; whatsappUrl: string }>(response);
    return {
      order: mapOrder(data.order),
      whatsappUrl: data.whatsappUrl,
    };
  },

  async recordWhatsappHandoff(id: string): Promise<AdminOrder> {
    const response = await apiClient.post(`/orders/${id}/whatsapp-handoff`);
    return mapOrder(unwrapData<any>(response));
  },

  async confirmOrder(id: string): Promise<AdminOrder> {
    const response = await apiClient.post(`/orders/${id}/confirm`);
    return mapOrder(unwrapData<any>(response));
  },

  async cancelOrder(id: string): Promise<AdminOrder> {
    const response = await apiClient.post(`/orders/${id}/cancel`);
    return mapOrder(unwrapData<any>(response));
  },

  async getOrders(params: OrderQueryParams = {}): Promise<PaginatedResponse<AdminOrder>> {
    const response = await apiClient.get('/orders', {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        search: params.search,
        orderStatus: params.orderStatus && params.orderStatus !== 'all' ? params.orderStatus : undefined,
        paymentStatus: params.paymentStatus && params.paymentStatus !== 'all' ? params.paymentStatus : undefined,
      },
    });

    const payload = unwrapData<{ orders: any[]; meta: { total: number; page: number; limit: number; totalPages: number } }>(response);
    const orders = (payload.orders ?? []).map(mapOrder);

    return {
      data: orders,
      total: payload.meta?.total ?? orders.length,
      page: payload.meta?.page ?? (params.page || 1),
      limit: payload.meta?.limit ?? (params.limit || 10),
      totalPages: payload.meta?.totalPages ?? 1,
    };
  },

  async getOrderById(id: string): Promise<AdminOrder | null> {
    const response = await apiClient.get(`/orders/${id}`);
    return mapOrder(unwrapData<any>(response));
  },

  async updateOrderStatus(id: string, dto: UpdateOrderStatusDTO): Promise<AdminOrder> {
    const response = await apiClient.patch(`/orders/${id}/status`, dto);
    return mapOrder(unwrapData<any>(response));
  },

  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete(`/orders/${id}`);
  },

  async exportCsv(params: OrderQueryParams = {}): Promise<Blob> {
    const response = await apiClient.get('/orders/export', {
      params: {
        search: params.search,
        orderStatus: params.orderStatus && params.orderStatus !== 'all' ? params.orderStatus : undefined,
        paymentStatus: params.paymentStatus && params.paymentStatus !== 'all' ? params.paymentStatus : undefined,
      },
      responseType: 'blob',
    });
    return response.data;
  },
};
