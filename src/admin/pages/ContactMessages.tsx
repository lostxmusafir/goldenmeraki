import { useState } from 'react';
import { MessageSquare, Eye, Trash2, CheckCircle } from 'lucide-react';
import { Table, type Column } from '../components/common/Table';
import { Pagination } from '../components/common/Pagination';
import { SearchInput } from '../components/common/SearchInput';
import { StatusBadge } from '../components/common/StatusBadge';
import { Drawer } from '../components/common/Drawer';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useContact } from '../hooks/useContact';
import type { ContactMessage } from '../types/contact.types';
import { formatDateTime } from '../utils/formatters';

export function ContactMessages() {
  const { messages, total, page, limit, totalPages, search, loading, setSearch, setPage, markAsRead, deleteMessage } =
    useContact();

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleOpenDetails = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      markAsRead(msg.id);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteMessage(deleteId);
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<ContactMessage>[] = [
    {
      header: 'Sender',
      cell: (row) => (
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">{row.name}</p>
          <p className="text-[11px] text-slate-400">{row.email}</p>
        </div>
      )
    },
    {
      header: 'Subject',
      cell: (row) => <span className="font-medium text-xs text-slate-800 dark:text-slate-200">{row.subject}</span>
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Date',
      cell: (row) => <span className="text-xs text-slate-400">{formatDateTime(row.createdAt)}</span>
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleOpenDetails(row)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-500" />
          <span>Contact Messages</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review customer inquiries, custom order requests, and feedback.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by sender, email, or subject..." />
      </div>

      <Table
        columns={columns}
        data={messages}
        loading={loading}
        rowKey={(row) => row.id}
        emptyTitle="No contact messages"
        emptyDescription="Inquiries submitted via contact form will be displayed here."
      />

      <Pagination page={page} totalPages={totalPages} totalItems={total} limit={limit} onPageChange={setPage} />

      <Drawer
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title="Contact Message Details"
      >
        {selectedMessage && (
          <div className="space-y-6 text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{selectedMessage.name}</h4>
                <StatusBadge status={selectedMessage.status} />
              </div>
              <p className="text-xs text-slate-500">{selectedMessage.email}</p>
              <p className="text-[11px] text-slate-400">{formatDateTime(selectedMessage.createdAt)}</p>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Subject</h5>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{selectedMessage.subject}</p>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Message Body</h5>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="px-4 py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Message"
        message="Are you sure you want to delete this contact message?"
        loading={deleting}
      />
    </div>
  );
}
