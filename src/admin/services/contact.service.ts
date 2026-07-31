import type { ContactMessage } from '../types/contact.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';
import { mockStorage } from './mockData';

export const contactService = {
  async getMessages(params: PaginationParams = {}): Promise<PaginatedResponse<ContactMessage>> {
    await new Promise((res) => setTimeout(res, 300));
    let items = mockStorage.getContacts();

    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (m) =>
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
    await new Promise((res) => setTimeout(res, 200));
    const items = mockStorage.getContacts();
    const index = items.findIndex((m) => m.id === id);
    if (index === -1) throw new Error('Message not found');

    items[index] = { ...items[index], status: 'read' };
    mockStorage.setContacts(items);
    return items[index];
  },

  async deleteMessage(id: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getContacts();
    const next = items.filter((m) => m.id !== id);
    mockStorage.setContacts(next);
  }
};
