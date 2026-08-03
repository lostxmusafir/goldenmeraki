import { useCallback, useEffect, useState } from 'react';
import type { AdminOrder, OrderStatus, PaymentStatus, UpdateOrderStatusDTO } from '../types/order.types';
import { orderService } from '../services/order.service';

export function useOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<OrderStatus | 'all'>('all');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await orderService.getOrders({ page, limit, search, orderStatus: status, paymentStatus });
      setOrders(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, status, paymentStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (id: string, dto: UpdateOrderStatusDTO) => {
    const updated = await orderService.updateOrderStatus(id, dto);
    await fetchOrders();
    return updated;
  };

  return {
    orders,
    total,
    page,
    limit,
    totalPages,
    search,
    status,
    paymentStatus,
    loading,
    error,
    setSearch,
    setStatus,
    setPaymentStatus,
    setPage,
    updateOrderStatus,
    refetch: fetchOrders
  };
}
