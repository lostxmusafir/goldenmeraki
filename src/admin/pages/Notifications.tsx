import { useEffect, useState } from 'react';
import { Bell, CheckCircle, Download, MessageSquare, PhoneCall, Search, Trash2 } from 'lucide-react';
import { notificationService } from '../services/notification.service';
import type { AdminNotification, NotificationStatus } from '../types/notification.types';

export function Notifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = () => {
    setIsLoading(true);
    notificationService
      .getNotifications({
        search,
        status: statusFilter,
        page,
        limit: 10,
      })
      .then((res) => {
        setNotifications(res.data);
        setTotalPages(res.totalPages || 1);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load notifications');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchNotifications();
  }, [search, statusFilter, page]);

  const handleUpdateStatus = async (id: string, newStatus: NotificationStatus) => {
    try {
      const updated = await notificationService.updateStatus(id, newStatus);
      setNotifications((prev) => prev.map((n) => (n._id === id ? updated : n)));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update notification status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this notification request?')) return;
    try {
      await notificationService.deleteNotification(id);
      fetchNotifications();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete notification');
    }
  };

  const handleExportCsv = async () => {
    try {
      const blob = await notificationService.exportCsv({
        search,
        status: statusFilter,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `restock_notifications_${new Date().toISOString().slice(0, 10)}.csv`;
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
            <Bell className="w-6 h-6 text-amber-500" />
            <span>Restock Notification Requests</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Customers who requested WhatsApp notifications for out-of-stock items.
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

      {/* Search & Filters */}
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
            placeholder="Search by product, customer name, phone, whatsapp..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        >
          <option value="all">All Statuses</option>
          <option value="PENDING">PENDING</option>
          <option value="CONTACTED">CONTACTED</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
      </div>

      {/* Notifications Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
              <th className="p-4">Product</th>
              <th className="p-4">Requested Size</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">WhatsApp</th>
              <th className="p-4">Email</th>
              <th className="p-4">Requested Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">Loading notifications...</td>
              </tr>
            ) : notifications.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">No notification requests found.</td>
              </tr>
            ) : (
              notifications.map((notif) => (
                <tr key={notif._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">{notif.productTitle}</td>
                  <td className="p-4">
                    {notif.requestedSize ? (
                      <span className="inline-block rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/40">
                        {notif.requestedSize}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-800 dark:text-slate-200">{notif.customerName}</td>
                  <td className="p-4">
                    <a
                      href={`https://wa.me/${notif.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hi ${notif.customerName}, "${notif.productTitle}"${notif.requestedSize ? ` (${notif.requestedSize})` : ''} is back in stock!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-emerald-600 hover:underline"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{notif.whatsapp}</span>
                    </a>
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{notif.email || '—'}</td>
                  <td className="p-4 text-xs text-slate-500">{new Date(notif.requestedDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        notif.status === 'COMPLETED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : notif.status === 'CONTACTED'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {notif.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-1">
                    {notif.status === 'PENDING' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(notif._id, 'CONTACTED')}
                        title="Mark Contacted"
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:hover:bg-slate-800"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </button>
                    )}
                    {notif.status !== 'COMPLETED' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(notif._id, 'COMPLETED')}
                        title="Mark Completed"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg dark:hover:bg-slate-800"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(notif._id)}
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
    </div>
  );
}
