import { useCallback, useEffect, useState } from 'react';
import type { ContactMessage } from '../types/contact.types';
import { contactService } from '../services/contact.service';

export function useContact() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await contactService.getMessages({ page, limit, search });
      setMessages(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markAsRead = async (id: string) => {
    await contactService.markAsRead(id);
    await fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    await contactService.deleteMessage(id);
    await fetchMessages();
  };

  return {
    messages,
    total,
    page,
    limit,
    totalPages,
    search,
    loading,
    setSearch,
    setPage,
    markAsRead,
    deleteMessage,
    refetch: fetchMessages
  };
}
