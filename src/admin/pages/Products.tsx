import { useState, type FormEvent } from 'react';
import { Plus, Edit2, Trash2, ShoppingBag } from 'lucide-react';
import { Table, type Column } from '../components/common/Table';
import { Pagination } from '../components/common/Pagination';
import { SearchInput } from '../components/common/SearchInput';
import { FilterSelect } from '../components/common/FilterSelect';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { ImageUpload } from '../components/common/ImageUpload';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import type { AdminProduct, CreateProductDTO } from '../types/product.types';
import { formatCurrency } from '../utils/formatters';

export function Products() {
  const {
    products,
    total,
    page,
    limit,
    totalPages,
    search,
    categoryId,
    status,
    loading,
    setSearch,
    setCategoryId,
    setStatus,
    setPage,
    createProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  const { categories } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Form state
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(10);
  const [prodStatus, setProdStatus] = useState<'active' | 'draft' | 'out_of_stock'>('active');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openCreateModal = () => {
    setEditingProduct(null);
    setSku('');
    setName('');
    setSelectedCatId(categories[0]?.id || 'cat-1');
    setPrice(1499);
    setDiscountPrice(undefined);
    setStock(15);
    setProdStatus('active');
    setDescription('');
    setImage('');
    setIsModalOpen(true);
  };

  const openEditModal = (prod: AdminProduct) => {
    setEditingProduct(prod);
    setSku(prod.sku);
    setName(prod.name);
    setSelectedCatId(prod.categoryId);
    setPrice(prod.price);
    setDiscountPrice(prod.discountPrice);
    setStock(prod.stock);
    setProdStatus(prod.status);
    setDescription(prod.description);
    setImage(prod.images[0] || '');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const dto: CreateProductDTO = {
        sku,
        name,
        categoryId: selectedCatId || categories[0]?.id || 'cat-1',
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock: Number(stock),
        status: prodStatus,
        description,
        images: image ? [image] : []
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, dto);
      } else {
        await createProduct(dto);
      }
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteProduct(deleteId);
      setDeleteId(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const categoryOptions = [
    { label: 'All Categories', value: 'all' },
    ...categories.map((c) => ({ label: c.name, value: c.id }))
  ];

  const columns: Column<AdminProduct>[] = [
    {
      header: 'Product',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.images[0] || 'https://images.unsplash.com/photo-1611591475240-4f20c16a0846?auto=format&fit=crop&w=600&q=80'}
            alt={row.name}
            className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-800"
          />
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100 max-w-xs truncate">{row.name}</p>
            <p className="text-[11px] font-mono text-slate-400">SKU: {row.sku}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      cell: (row) => <span className="text-xs text-slate-600 dark:text-slate-300">{row.categoryName}</span>
    },
    {
      header: 'Price',
      cell: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(row.price)}</span>
          {row.discountPrice && (
            <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 line-through">
              {formatCurrency(row.discountPrice)}
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Stock',
      cell: (row) => (
        <span
          className={`text-xs font-semibold ${
            row.stock === 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          {row.stock > 0 ? `${row.stock} in stock` : 'Out of Stock'}
        </span>
      )
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      className: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => openEditModal(row)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition"
            title="Edit Product"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
            title="Delete Product"
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
            <ShoppingBag className="w-6 h-6 text-amber-500" />
            <span>Product Catalog</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage gemstone products, inventory stock levels, and prices.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-md transition flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <SearchInput value={search} onChange={setSearch} placeholder="Search product name or SKU..." />
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <FilterSelect label="Category" value={categoryId} onChange={setCategoryId} options={categoryOptions} />
          <FilterSelect
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'Draft', value: 'draft' },
              { label: 'Out of Stock', value: 'out_of_stock' }
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={products}
        loading={loading}
        rowKey={(row) => row.id}
        emptyTitle="No products found"
        emptyDescription="Create a product or try adjusting your filter options."
      />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} totalItems={total} limit={limit} onPageChange={setPage} />

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">SKU *</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="GM-BR-001"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Amethyst Crystal Bracelet"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Stock *</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select
              value={prodStatus}
              onChange={(e) => setProdStatus(e.target.value as 'active' | 'draft' | 'out_of_stock')}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          <ImageUpload label="Product Main Image" value={image} onChange={setImage} />

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product features and crystal properties..."
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition"
            >
              {isSubmitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message="Are you sure you want to remove this product from store catalog?"
        loading={isDeleting}
      />
    </div>
  );
}
