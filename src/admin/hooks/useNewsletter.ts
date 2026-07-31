import { useCallback, useEffect, useState } from 'react';
import type { Subscriber } from '../types/newsletter.types';
import { newsletterService } from '../services/newsletter.service';

export function useNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await newsletterService.getSubscribers({ page, limit, search });
      setSubscribers(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const deleteSubscriber = async (id: string) => {
    await newsletterService.deleteSubscriber(id);
    await fetchSubscribers();
  };

  return {
    subscribers,
    total,
    page,
    limit,
    totalPages,
    search,
    loading,
    setSearch,
    setPage,
    deleteSubscriber,
    refetch: fetchSubscribers
  };
}
