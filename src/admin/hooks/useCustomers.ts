import { useCallback, useEffect, useState } from 'react';
import type { Customer } from '../types/customer.types';
import { customerService } from '../services/customer.service';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await customerService.getCustomers({ page, limit, search });
      setCustomers(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const toggleStatus = async (id: string) => {
    await customerService.toggleCustomerStatus(id);
    await fetchCustomers();
  };

  return {
    customers,
    total,
    page,
    limit,
    totalPages,
    search,
    loading,
    error,
    setSearch,
    setPage,
    toggleStatus,
    refetch: fetchCustomers
  };
}
