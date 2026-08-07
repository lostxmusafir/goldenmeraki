import { apiClient } from './apiClient';
import type { ContactMessage } from '../types/contact.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';

export const contactService = {
  async getMessages(params: PaginationParams = {}): Promise<PaginatedResponse<ContactMessage>> {
    const response = await apiClient.get('/contact');
    const payload = response.data?.data ?? response.data;
    let items = (payload ?? []).map((item: any) => ({
      id: item._id ?? item.id,
      name: item.name,
      email: item.email,
      phone: item.phone ?? '',
      subject: item.subject ?? 'Contact Message',
      message: item.message,
      status: item.isRead ? 'read' : 'unread',
      createdAt: item.createdAt ?? new Date().toISOString()
    }));

    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (m: ContactMessage) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q) ||
          m.message.toLowerCase().includes(q)
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

  async markAsRead(id: string): Promise<ContactMessage> {
    const response = await apiClient.patch(`/contact/${id}/read`);
    const item = response.data?.data ?? response.data;
    return {
      id: item._id ?? item.id,
      name: item.name,
      email: item.email,
      phone: item.phone ?? '',
      subject: item.subject ?? 'Contact Message',
      message: item.message,
      status: item.isRead ? 'read' : 'unread',
      createdAt: item.createdAt ?? new Date().toISOString()
    };
  },

  async deleteMessage(id: string): Promise<void> {
    await apiClient.delete(`/contact/${id}`);
  }
};
