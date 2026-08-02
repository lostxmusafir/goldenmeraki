import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Layers } from 'lucide-react';
import { Table, type Column } from '../components/common/Table';
import { Pagination } from '../components/common/Pagination';
import { SearchInput } from '../components/common/SearchInput';
import { FilterSelect } from '../components/common/FilterSelect';
import { StatusBadge } from '../components/common/StatusBadge';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useCategories } from '../hooks/useCategories';
import type { Category } from '../types/category.types';
import { formatDate } from '../utils/formatters';

export function Categories() {
  const {
    categories,
    total,
    page,
    limit,
    totalPages,
    search,
    loading,
    setSearch,
    setPage,
    deleteCategory
  } = useCategories();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Delete Dialog State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openCreatePage = () => {
    navigate('/admin/categories/new');
  };

  const openEditPage = (cat: Category) => {
    navigate(`/admin/categories/${cat.id}/edit`);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteCategory(deleteId);
      setDeleteId(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredCategories = categories.filter((c) => {
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  const columns: Column<Category>[] = [
    {
      header: 'Category',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image || 'https://images.unsplash.com/photo-1611591475240-4f20c16a0846?auto=format&fit=crop&w=600&q=80'}
            alt={row.name}
            className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-800"
          />
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">{row.name}</p>
            <p className="text-xs text-slate-400">/{row.slug}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Description',
      cell: (row) => (
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs truncate">{row.description || '-'}</p>
      )
    },
    {
      header: 'Products',
      cell: (row) => (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
          {row.productCount} items
        </span>
      )
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Created At',
      cell: (row) => <span className="text-xs text-slate-400">{formatDate(row.createdAt)}</span>
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => openEditPage(row)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition"
            title="Edit Category"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-500" />
            <span>Category Management</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organize product catalog into gemstone and jewelry categories.
          </p>
        </div>
        <button
          onClick={openCreatePage}
          className="px-4 py-2.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-md transition flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search category by name..." />
        <FilterSelect
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { label: 'All Statuses', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' }
          ]}
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredCategories}
        loading={loading}
        rowKey={(row) => row.id}
        emptyTitle="No categories found"
        emptyDescription="Create a category or try adjusting your search filters."
      />

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={total}
        limit={limit}
        onPageChange={(p) => setPage(p)}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message="Are you sure you want to delete this category? Products in this category will become uncategorized."
        loading={isDeleting}
      />
    </div>
  );
}
