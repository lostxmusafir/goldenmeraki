import { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Table, type Column } from '../components/common/Table';
import { Pagination } from '../components/common/Pagination';
import { SearchInput } from '../components/common/SearchInput';
import { FilterSelect } from '../components/common/FilterSelect';
import { StatusBadge } from '../components/common/StatusBadge';
import { Drawer } from '../components/common/Drawer';
import { useOrders } from '../hooks/useOrders';
import type { AdminOrder, OrderStatus, PaymentStatus } from '../types/order.types';
import { formatCurrency, formatDateTime } from '../utils/formatters';

export function Orders() {
  const {
    orders,
    total,
    page,
    limit,
    totalPages,
    search,
    status,
    paymentStatus,
    loading,
    setSearch,
    setStatus,
    setPaymentStatus,
    setPage,
    updateOrderStatus
  } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdating(true);
    try {
      const updated = await updateOrderStatus(orderId, { status: newStatus });
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updated);
      }
    } finally {
      setUpdating(false);
    }
  };

  const handlePaymentStatusChange = async (orderId: string, newPaymentStatus: PaymentStatus) => {
    setUpdating(true);
    try {
      const updated = await updateOrderStatus(orderId, { paymentStatus: newPaymentStatus });
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updated);
      }
    } finally {
      setUpdating(false);
    }
  };

  const columns: Column<AdminOrder>[] = [
    {
      header: 'Order Number',
      cell: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100">{row.orderNumber}</span>
          <span className="block text-[11px] text-slate-400">{formatDateTime(row.createdAt)}</span>
        </div>
      )
    },
    {
      header: 'Customer',
      cell: (row) => (
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{row.customerName}</p>
          <p className="text-[11px] text-slate-400">{row.customerEmail}</p>
        </div>
      )
    },
    {
      header: 'Total Amount',
      cell: (row) => <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(row.totalAmount)}</span>
    },
    {
      header: 'Payment Status',
      cell: (row) => <StatusBadge status={row.paymentStatus} />
    },
    {
      header: 'Fulfillment Status',
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <button
          onClick={() => setSelectedOrder(row)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition flex items-center gap-1 text-xs font-semibold"
        >
          <Eye className="w-4 h-4" />
          <span>Details</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-amber-500" />
          <span>Order Management</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Track customer purchases, shipping updates, and payment fulfillment.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search order # or customer..." />
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <FilterSelect
            label="Order Status"
            value={status}
            onChange={(val) => setStatus(val as OrderStatus | 'all')}
            options={[
              { label: 'All Orders', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Processing', value: 'processing' },
              { label: 'Shipped', value: 'shipped' },
              { label: 'Delivered', value: 'delivered' },
              { label: 'Cancelled', value: 'cancelled' }
            ]}
          />
          <FilterSelect
            label="Payment Status"
            value={paymentStatus}
            onChange={(val) => setPaymentStatus(val as PaymentStatus | 'all')}
            options={[
              { label: 'All Payments', value: 'all' },
              { label: 'Paid', value: 'paid' },
              { label: 'Pending', value: 'pending' },
              { label: 'Failed', value: 'failed' }
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={orders}
        loading={loading}
        rowKey={(row) => row.id}
        emptyTitle="No orders found"
        emptyDescription="Orders placed by customers will appear here."
      />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} totalItems={total} limit={limit} onPageChange={setPage} />

      {/* Order Details Drawer */}
      <Drawer
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order Details: ${selectedOrder.orderNumber}` : ''}
      >
        {selectedOrder && (
          <div className="space-y-6 text-sm">
            {/* Status updates section */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Update Order Status</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Order Status</label>
                  <select
                    value={selectedOrder.status}
                    disabled={updating}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Payment Status</label>
                  <select
                    value={selectedOrder.paymentStatus}
                    disabled={updating}
                    onChange={(e) => handlePaymentStatusChange(selectedOrder.id, e.target.value as PaymentStatus)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg"
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Customer Information</h4>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{selectedOrder.customerName}</p>
                <p className="text-xs text-slate-500">{selectedOrder.customerEmail}</p>
                <p className="text-xs text-slate-500">{selectedOrder.customerPhone || 'N/A'}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Shipping Address</h4>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-700 dark:text-slate-300">{selectedOrder.shippingAddress}</p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Order Items</h4>
              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-xs text-slate-900 dark:text-slate-100">{item.productName}</p>
                        <p className="text-[11px] text-slate-400">
                          {item.quantity} x {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-xs">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex justify-between items-center">
              <div>
                <span className="text-xs font-semibold text-slate-500">Payment Method:</span>
                <p className="font-bold text-amber-600 dark:text-amber-400">{selectedOrder.paymentMethod}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-500">Total Amount:</span>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(selectedOrder.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
