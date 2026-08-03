import { useEffect, useState } from 'react';
import { Download, Eye, MessageSquare, Search, Trash2, X } from 'lucide-react';
import { orderService } from '../services/order.service';
import type { AdminOrder, OrderStatus, PaymentStatus } from '../types/order.types';

export function Orders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Order Details Modal State
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrders = () => {
    setIsLoading(true);
    orderService
      .getOrders({
        search,
        orderStatus: statusFilter,
        paymentStatus: paymentFilter,
        page,
        limit: 10,
      })
      .then((res) => {
        setOrders(res.data);
        setTotalPages(res.totalPages || 1);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, [search, statusFilter, paymentFilter, page]);

  const handleUpdateStatus = async (id: string, newOrderStatus?: OrderStatus, newPaymentStatus?: PaymentStatus) => {
    setIsUpdating(true);
    try {
      const updated = await orderService.updateOrderStatus(id, {
        orderStatus: newOrderStatus,
        paymentStatus: newPaymentStatus,
      });
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder(updated);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update order status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await orderService.deleteOrder(id);
      if (selectedOrder?.id === id) setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete order');
    }
  };

  const handleExportCsv = async () => {
    try {
      const blob = await orderService.exportCsv({
        search,
        orderStatus: statusFilter,
        paymentStatus: paymentFilter,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to export CSV');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Order Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track all website and WhatsApp customer orders in real time.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <Download className="w-4 h-4 text-amber-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by order #, customer name, phone, whatsapp..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="all">All Order Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="all">All Payment Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
              <th className="p-4">Order #</th>
              <th className="p-4">Customer</th>
              <th className="p-4">WhatsApp / Phone</th>
              <th className="p-4">Items</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-slate-500">Loading orders...</td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-slate-500">No orders found.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono font-bold text-amber-600 dark:text-amber-400">{order.orderNumber}</td>
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">{order.customerName}</td>
                  <td className="p-4">
                    <a
                      href={`https://wa.me/${order.whatsapp.replace(/[^\d]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-600 hover:underline"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{order.whatsapp || order.phone}</span>
                    </a>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{order.cartItems.length} item(s)</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-slate-100">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        order.orderStatus === 'DELIVERED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : order.orderStatus === 'SHIPPED'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : order.orderStatus === 'PROCESSING'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : order.orderStatus === 'CANCELLED'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        order.paymentStatus === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.paymentStatus === 'FAILED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-500">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="p-4 text-right space-x-1">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 text-slate-500 hover:text-amber-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(order.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 p-4 dark:border-slate-800">
            <span className="text-xs text-slate-500">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-xl border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-xl border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>Order #{selectedOrder.orderNumber}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Placed on {new Date(selectedOrder.orderDate).toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 space-y-1.5 text-xs">
                <p className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Customer Details</p>
                <p><strong className="text-slate-900 dark:text-slate-100">Name:</strong> {selectedOrder.customerName}</p>
                <p><strong className="text-slate-900 dark:text-slate-100">Phone:</strong> {selectedOrder.phone}</p>
                <p>
                  <strong className="text-slate-900 dark:text-slate-100">WhatsApp:</strong>{' '}
                  <a href={`https://wa.me/${selectedOrder.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">
                    {selectedOrder.whatsapp}
                  </a>
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 space-y-1.5 text-xs">
                <p className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Shipping Address</p>
                <p>{selectedOrder.shippingAddress.street}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                <p>{selectedOrder.shippingAddress.country}</p>
              </div>
            </div>

            {/* Quick Status Update Controls */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">Order Status</label>
                <select
                  value={selectedOrder.orderStatus}
                  disabled={isUpdating}
                  onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value as OrderStatus, undefined)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">Payment Status</label>
                <select
                  value={selectedOrder.paymentStatus}
                  disabled={isUpdating}
                  onChange={(e) => handleUpdateStatus(selectedOrder.id, undefined, e.target.value as PaymentStatus)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PAID">PAID</option>
                  <option value="FAILED">FAILED</option>
                </select>
              </div>
            </div>

            {/* Itemized list */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Order Items</h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                {selectedOrder.cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-slate-950 text-xs">
                    <div className="flex items-center gap-3">
                      {item.image && <img src={item.image} alt={item.title} className="h-9 w-9 rounded-lg object-cover" />}
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                        <p className="text-slate-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800 text-sm font-bold">
              <span>Total Amount:</span>
              <span className="text-lg text-amber-600 dark:text-amber-400">₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
