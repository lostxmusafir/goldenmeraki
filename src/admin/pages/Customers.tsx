import { useState } from 'react';
import { Users, Eye, Ban, CheckCircle2 } from 'lucide-react';
import { Table, type Column } from '../components/common/Table';
import { Pagination } from '../components/common/Pagination';
import { SearchInput } from '../components/common/SearchInput';
import { StatusBadge } from '../components/common/StatusBadge';
import { Drawer } from '../components/common/Drawer';
import { useCustomers } from '../hooks/useCustomers';
import type { Customer } from '../types/customer.types';
import { formatCurrency, formatDate } from '../utils/formatters';

export function Customers() {
  const { customers, total, page, limit, totalPages, search, loading, setSearch, setPage, toggleStatus } =
    useCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const columns: Column<Customer>[] = [
    {
      header: 'Customer',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">{row.name}</p>
            <p className="text-[11px] text-slate-400">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Phone',
      cell: (row) => <span className="text-xs text-slate-600 dark:text-slate-300">{row.phone}</span>
    },
    {
      header: 'Total Orders',
      cell: (row) => (
        <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">{row.totalOrders} orders</span>
      )
    },
    {
      header: 'Total Spent',
      cell: (row) => <span className="font-bold text-xs text-amber-600">{formatCurrency(row.totalSpent)}</span>
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Joined',
      cell: (row) => <span className="text-xs text-slate-400">{formatDate(row.createdAt)}</span>
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setSelectedCustomer(row)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition"
            title="View Profile"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleStatus(row.id)}
            className={`p-1.5 rounded-lg transition ${
              row.status === 'active'
                ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                : 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            }`}
            title={row.status === 'active' ? 'Block Customer' : 'Activate Customer'}
          >
            {row.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-500" />
          <span>Customer Directory</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage buyer accounts, order history, and account status.
        </p>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email, or phone..." />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={customers}
        loading={loading}
        rowKey={(row) => row.id}
        emptyTitle="No customers found"
        emptyDescription="Registered store customers will appear here."
      />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} totalItems={total} limit={limit} onPageChange={setPage} />

      {/* Profile Drawer */}
      <Drawer
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title="Customer Profile Details"
      >
        {selectedCustomer && (
          <div className="space-y-6 text-sm">
            <div className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-16 h-16 rounded-full bg-amber-500 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
                {selectedCustomer.name.charAt(0)}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{selectedCustomer.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedCustomer.email}</p>
              <div className="mt-3 inline-block">
                <StatusBadge status={selectedCustomer.status} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500">Phone Number</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{selectedCustomer.phone}</span>
              </div>

              <div className="flex justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500">Total Purchases</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{selectedCustomer.totalOrders} Orders</span>
              </div>

              <div className="flex justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500">Lifetime Spent</span>
                <span className="text-xs font-bold text-amber-600">{formatCurrency(selectedCustomer.totalSpent)}</span>
              </div>

              <div className="flex justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500">Member Since</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{formatDate(selectedCustomer.createdAt)}</span>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
