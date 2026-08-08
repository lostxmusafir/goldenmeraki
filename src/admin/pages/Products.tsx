import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, FolderInput, Plus, Search, Star, Trash2, CheckSquare, Square, Layers, RefreshCw } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';
import { productService } from '../services/product.service';
import type { AdminProduct, InventoryStatusType } from '../types/product.types';

export function Products() {
  const navigate = useNavigate();
  const { categories } = useCategories({ initialLimit: 1000 });

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('all');
  const [inventoryFilter, setInventoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Bulk action states
  const [targetCategory, setTargetCategory] = useState('');
  const [targetInventory, setTargetInventory] = useState<InventoryStatusType>('IN_STOCK');
  const [isBulkCategoryOpen, setIsBulkCategoryOpen] = useState(false);
  const [isBulkInventoryOpen, setIsBulkInventoryOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchProducts = () => {
    setIsLoading(true);
    productService
      .getProducts({
        search,
        categoryId: selectedCatId,
        inventoryStatus: inventoryFilter,
        page: 1,
        limit: 500,
        includeInactive: true,
      })
      .then((res) => {
        setProducts(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCatId, inventoryFilter]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(products.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productService.deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  // Bulk Actions Handlers (Requirement #4)
  const handleBulkMoveCategory = async () => {
    if (!targetCategory || selectedIds.length === 0) return;
    setIsProcessing(true);
    try {
      await productService.bulkUpdateCategory(selectedIds, targetCategory);
      setIsBulkCategoryOpen(false);
      setSelectedIds([]);
      fetchProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed bulk category update');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkStatusChange = async (isActive?: boolean, isFeatured?: boolean) => {
    if (selectedIds.length === 0) return;
    setIsProcessing(true);
    try {
      await productService.bulkUpdateStatus(selectedIds, isActive, isFeatured);
      fetchProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed bulk status update');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkInventoryChange = async () => {
    if (selectedIds.length === 0) return;
    setIsProcessing(true);
    try {
      await productService.bulkUpdateInventory(selectedIds, targetInventory);
      setIsBulkInventoryOpen(false);
      fetchProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed bulk inventory update');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Products Catalog</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your store inventory, pricing, and bulk product attributes.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/products/new')}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-amber-600 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCatId}
            onChange={(e) => setSelectedCatId(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={inventoryFilter}
            onChange={(e) => setInventoryFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="all">All Inventory Statuses</option>
            <option value="IN_STOCK">IN_STOCK</option>
            <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
            <option value="COMING_SOON">COMING_SOON</option>
            <option value="DISCONTINUED">DISCONTINUED</option>
          </select>
        </div>
      </div>

      {/* Bulk Operations Toolbar (Requirement #4) */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CheckSquare className="w-5 h-5 text-amber-600" />
            <span>{selectedIds.length} item(s) selected</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsBulkCategoryOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-amber-100 dark:bg-slate-900 dark:text-slate-200"
            >
              <FolderInput className="w-3.5 h-3.5" />
              Move Category
            </button>

            <button
              type="button"
              onClick={() => handleBulkStatusChange(true, undefined)}
              disabled={isProcessing}
              className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              Activate
            </button>

            <button
              type="button"
              onClick={() => handleBulkStatusChange(false, undefined)}
              disabled={isProcessing}
              className="rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
            >
              Deactivate
            </button>

            <button
              type="button"
              onClick={() => handleBulkStatusChange(undefined, true)}
              disabled={isProcessing}
              className="rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
            >
              Feature
            </button>

            <button
              type="button"
              onClick={() => handleBulkStatusChange(undefined, false)}
              disabled={isProcessing}
              className="rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-amber-100 dark:bg-slate-900 dark:text-slate-200"
            >
              Unfeature
            </button>

            <button
              type="button"
              onClick={() => setIsBulkInventoryOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-amber-100 dark:bg-slate-900 dark:text-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Inventory Status
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  checked={products.length > 0 && selectedIds.length === products.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
              </th>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Inventory Status</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">Loading products...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">No products found.</td>
              </tr>
            ) : (
              products.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(prod.id)}
                      onChange={(e) => handleSelectOne(prod.id, e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0] || 'https://via.placeholder.com/40'}
                        alt={prod.name}
                        className="h-10 w-10 rounded-xl object-cover border border-slate-200 dark:border-slate-800"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                          {prod.name}
                          {prod.isFeatured && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{prod.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{prod.categoryName}</td>
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">₹{prod.price.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{prod.stock}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        prod.inventoryStatus === 'IN_STOCK'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : prod.inventoryStatus === 'OUT_OF_STOCK'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : prod.inventoryStatus === 'COMING_SOON'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {prod.inventoryStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        prod.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {prod.status === 'active' ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/products/${prod.id}`)}
                      className="p-1.5 text-slate-500 hover:text-amber-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(prod.id)}
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
      </div>

      {/* Bulk Move Category Modal */}
      {isBulkCategoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Move Selected to Category</h3>
            <select
              value={targetCategory}
              onChange={(e) => setTargetCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="">Select target category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsBulkCategoryOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkMoveCategory}
                disabled={!targetCategory || isProcessing}
                className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
              >
                Confirm Move
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Inventory Status Modal */}
      {isBulkInventoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Update Inventory Status</h3>
            <select
              value={targetInventory}
              onChange={(e) => setTargetInventory(e.target.value as InventoryStatusType)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="IN_STOCK">IN_STOCK</option>
              <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
              <option value="COMING_SOON">COMING_SOON</option>
              <option value="DISCONTINUED">DISCONTINUED</option>
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsBulkInventoryOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkInventoryChange}
                disabled={isProcessing}
                className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
