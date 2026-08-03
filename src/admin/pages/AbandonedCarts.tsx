import { useEffect, useState } from 'react';
import { Download, Eye, MessageSquare, RefreshCcw, Search, ShoppingBag, Trash2, X } from 'lucide-react';
import { abandonedCartService } from '../services/abandoned-cart.service';
import type { AdminAbandonedCart, RecoveryStatus } from '../types/abandoned-cart.types';

export function AbandonedCarts() {
  const [carts, setCarts] = useState<AdminAbandonedCart[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('lastActivity_desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cart Details Modal
  const [selectedCart, setSelectedCart] = useState<AdminAbandonedCart | null>(null);

  const fetchCarts = () => {
    setIsLoading(true);
    abandonedCartService
      .getAbandonedCarts({
        search,
        recoveryStatus: statusFilter,
        sort,
        page,
        limit: 10,
      })
      .then((res) => {
        setCarts(res.data);
        setTotalPages(res.totalPages || 1);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load abandoned carts');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchCarts();
  }, [search, statusFilter, sort, page]);

  const handleUpdateStatus = async (id: string, newStatus: RecoveryStatus) => {
    try {
      const updated = await abandonedCartService.updateAbandonedCart(id, { recoveryStatus: newStatus });
      setCarts((prev) => prev.map((c) => (c._id === id ? updated : c)));
      if (selectedCart?._id === id) setSelectedCart(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update recovery status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this abandoned cart record?')) return;
    try {
      await abandonedCartService.deleteAbandonedCart(id);
      if (selectedCart?._id === id) setSelectedCart(null);
      fetchCarts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete record');
    }
  };

  const handleExportCsv = async () => {
    try {
      const blob = await abandonedCartService.exportCsv({
        search,
        recoveryStatus: statusFilter,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `abandoned_carts_${new Date().toISOString().slice(0, 10)}.csv`;
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-amber-500" />
            <span>Abandoned Cart Recovery</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Monitor and recover uncompleted customer checkouts in real-time.
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

      {/* Filters & Sorting */}
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
            placeholder="Search by customer, phone, whatsapp, email, cart ID..."
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
            <option value="all">All Recovery Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Recovered">Recovered</option>
            <option value="Expired">Expired</option>
            <option value="Ignored">Ignored</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="lastActivity_desc">Most Recent Activity</option>
            <option value="cartTotal_desc">Highest Cart Value</option>
            <option value="cartTotal_asc">Lowest Cart Value</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
              <th className="p-4">Customer</th>
              <th className="p-4">WhatsApp / Phone</th>
              <th className="p-4">Products</th>
              <th className="p-4">Cart Value</th>
              <th className="p-4">Recovery Status</th>
              <th className="p-4">Last Activity</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">Loading abandoned carts...</td>
              </tr>
            ) : carts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">No abandoned carts found.</td>
              </tr>
            ) : (
              carts.map((cart) => (
                <tr key={cart._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-4">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{cart.customerName || 'Anonymous Guest'}</p>
                    <p className="text-xs font-mono text-slate-400">{cart.cartId}</p>
                  </td>
                  <td className="p-4">
                    {cart.whatsapp || cart.phone ? (
                      <a
                        href={`https://wa.me/${(cart.whatsapp || cart.phone || '').replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hi ${cart.customerName || 'there'}, we noticed you left items in your cart on Golden Meraki! Would you like help placing your order?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-emerald-600 hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{cart.whatsapp || cart.phone}</span>
                      </a>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">{cart.products?.length || 0} item(s)</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-slate-100">₹{cart.cartTotal.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        cart.recoveryStatus === 'Recovered'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : cart.recoveryStatus === 'Ignored'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : cart.recoveryStatus === 'Expired'
                          ? 'bg-slate-100 text-slate-600 border border-slate-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {cart.recoveryStatus}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-500">{new Date(cart.lastActivity).toLocaleString()}</td>
                  <td className="p-4 text-right space-x-1">
                    <button
                      type="button"
                      onClick={() => setSelectedCart(cart)}
                      title="View Cart Details"
                      className="p-1.5 text-slate-500 hover:text-amber-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {cart.recoveryStatus !== 'Recovered' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(cart._id, 'Recovered')}
                        title="Mark Recovered"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg dark:hover:bg-slate-800"
                      >
                        <RefreshCcw className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(cart._id)}
                      title="Delete"
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
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

      {/* Cart Details Modal */}
      {selectedCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
            <button
              type="button"
              onClick={() => setSelectedCart(null)}
              className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Abandoned Cart Details
              </h3>
              <p className="text-xs text-slate-500 font-mono">Cart ID: {selectedCart.cartId}</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 space-y-1.5 text-xs">
              <p><strong className="text-slate-900 dark:text-slate-100">Customer Name:</strong> {selectedCart.customerName || 'Anonymous'}</p>
              <p><strong className="text-slate-900 dark:text-slate-100">Phone / WhatsApp:</strong> {selectedCart.phone || selectedCart.whatsapp || 'Not provided'}</p>
              <p><strong className="text-slate-900 dark:text-slate-100">Email:</strong> {selectedCart.email || 'Not provided'}</p>
              {selectedCart.shippingAddress && (
                <p><strong className="text-slate-900 dark:text-slate-100">Address:</strong> {selectedCart.shippingAddress.street}, {selectedCart.shippingAddress.city} - {selectedCart.shippingAddress.pincode}</p>
              )}
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Cart Contents</h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                {(selectedCart.products || []).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-slate-950 text-xs">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                      <p className="text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-sm font-bold">
              <span>Total Cart Value:</span>
              <span className="text-lg text-amber-600 dark:text-amber-400">₹{selectedCart.cartTotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {selectedCart.recoveryStatus !== 'Recovered' && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedCart._id, 'Recovered')}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  Mark as Recovered
                </button>
              )}
              {selectedCart.recoveryStatus !== 'Ignored' && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedCart._id, 'Ignored')}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300"
                >
                  Mark as Ignored
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
