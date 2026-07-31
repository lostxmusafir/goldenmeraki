import { useState } from 'react';
import { Mail, Trash2, Download } from 'lucide-react';
import { Table, type Column } from '../components/common/Table';
import { Pagination } from '../components/common/Pagination';
import { SearchInput } from '../components/common/SearchInput';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useNewsletter } from '../hooks/useNewsletter';
import type { Subscriber } from '../types/newsletter.types';
import { formatDate } from '../utils/formatters';

export function Newsletter() {
  const { subscribers, total, page, limit, totalPages, search, loading, setSearch, setPage, deleteSubscriber } =
    useNewsletter();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteSubscriber(deleteId);
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Email,Status,SubscribedAt', ...subscribers.map((s) => `${s.email},${s.status},${s.subscribedAt}`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `golden_meraki_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns: Column<Subscriber>[] = [
    {
      header: 'Subscriber Email',
      cell: (row) => <span className="font-semibold text-slate-900 dark:text-slate-100">{row.email}</span>
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Subscribed Date',
      cell: (row) => <span className="text-xs text-slate-400">{formatDate(row.subscribedAt)}</span>
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <button
          onClick={() => setDeleteId(row.id)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Mail className="w-6 h-6 text-amber-500" />
            <span>Newsletter Subscribers</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            View email marketing list and manage audience subscriptions.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4 text-amber-500" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search subscribers by email..." />
      </div>

      <Table
        columns={columns}
        data={subscribers}
        loading={loading}
        rowKey={(row) => row.id}
        emptyTitle="No subscribers found"
        emptyDescription="Subscribers will appear here when users sign up on website footer."
      />

      <Pagination page={page} totalPages={totalPages} totalItems={total} limit={limit} onPageChange={setPage} />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove Subscriber"
        message="Are you sure you want to remove this subscriber from the mailing list?"
        loading={deleting}
      />
    </div>
  );
}
