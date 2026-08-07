import { apiClient } from './apiClient';
import type { Customer } from '../types/customer.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';

export const customerService = {
  async getCustomers(params: PaginationParams = {}): Promise<PaginatedResponse<Customer>> {
    const [usersResponse, ordersResponse] = await Promise.all([
      apiClient.get('/users'),
      apiClient.get('/orders', { params: { limit: 1000 } })
    ]);

    const rawUsers = usersResponse.data?.data ?? usersResponse.data ?? [];
    const rawOrders = ordersResponse.data?.data?.orders ?? ordersResponse.data?.orders ?? [];
    const normalUsers = rawUsers.filter((u: any) => u.role !== 'admin');

    let items: Customer[] = normalUsers.map((user: any) => {
      const userOrders = rawOrders.filter(
        (o: any) =>
          (user.phone && o.phone === user.phone) ||
          (user.email && o.email === user.email) ||
          (o.customerName && o.customerName.toLowerCase() === user.name.toLowerCase())
      );

      const totalOrders = userOrders.length;
      const totalSpent = userOrders.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);

      return {
        id: user._id ?? user.id,
        name: user.name,
        email: user.email,
        phone: user.phone ?? '',
        status: user.isActive !== false ? 'active' : 'blocked',
        totalOrders,
        totalSpent,
        createdAt: user.createdAt ?? new Date().toISOString()
      };
    });

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
    const response = await apiClient.get(`/users/${id}`);
    const user = response.data?.data ?? response.data;
    if (!user) return null;

    const ordersResponse = await apiClient.get('/orders', { params: { limit: 1000 } });
    const rawOrders = ordersResponse.data?.data?.orders ?? ordersResponse.data?.orders ?? [];

    const userOrders = rawOrders.filter(
      (o: any) =>
        (user.phone && o.phone === user.phone) ||
        (user.email && o.email === user.email) ||
        (o.customerName && o.customerName.toLowerCase() === user.name.toLowerCase())
    );

    const totalOrders = userOrders.length;
    const totalSpent = userOrders.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);

    return {
      id: user._id ?? user.id,
      name: user.name,
      email: user.email,
      phone: user.phone ?? '',
      status: user.isActive !== false ? 'active' : 'blocked',
      totalOrders,
      totalSpent,
      createdAt: user.createdAt ?? new Date().toISOString()
    };
  },

  async toggleCustomerStatus(id: string): Promise<Customer> {
    const response = await apiClient.patch(`/users/${id}/status`);
    const user = response.data?.data ?? response.data;
    
    const ordersResponse = await apiClient.get('/orders', { params: { limit: 1000 } });
    const rawOrders = ordersResponse.data?.data?.orders ?? ordersResponse.data?.orders ?? [];

    const userOrders = rawOrders.filter(
      (o: any) =>
        (user.phone && o.phone === user.phone) ||
        (user.email && o.email === user.email) ||
        (o.customerName && o.customerName.toLowerCase() === user.name.toLowerCase())
    );

    const totalOrders = userOrders.length;
    const totalSpent = userOrders.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0);

    return {
      id: user._id ?? user.id,
      name: user.name,
      email: user.email,
      phone: user.phone ?? '',
      status: user.isActive !== false ? 'active' : 'blocked',
      totalOrders,
      totalSpent,
      createdAt: user.createdAt ?? new Date().toISOString()
    };
  }
};
