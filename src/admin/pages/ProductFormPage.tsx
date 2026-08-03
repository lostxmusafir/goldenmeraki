import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, ShoppingBag } from 'lucide-react';
import { ImageUpload } from '../components/common/ImageUpload';
import { useCategories } from '../hooks/useCategories';
import { productService } from '../services/product.service';
import type { CreateProductDTO, InventoryStatusType } from '../types/product.types';

export function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id && id !== 'new');
  const { categories, loading: categoriesLoading } = useCategories();

  const [name, setName] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(10);
  const [inventoryStatus, setInventoryStatus] = useState<InventoryStatusType>('IN_STOCK');
  const [prodStatus, setProdStatus] = useState<'active' | 'draft'>('active');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [badge, setBadge] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedWidthSizes, setSelectedWidthSizes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCategoryObj = categories.find((c) => c.id === selectedCatId);
  const isBraceletProduct = Boolean(
    selectedCategoryObj &&
      (selectedCategoryObj.name.toLowerCase().includes('bracelet') ||
        selectedCategoryObj.slug.toLowerCase().includes('bracelet') ||
        selectedCategoryObj.id.toLowerCase().includes('bracelet')),
  );

  useEffect(() => {
    if (!isEdit || !id) return;

    setIsLoading(true);
    productService
      .getProductById(id)
      .then((product) => {
        if (!product) {
          setError('Product not found');
          return;
        }
        setName(product.name);
        setSelectedCatId(product.categoryId);
        setPrice(product.price);
        setOriginalPrice(product.originalPrice);
        setDiscountPrice(product.discountPrice);
        setStock(product.stock);
        setInventoryStatus(product.inventoryStatus || (product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK'));
        setProdStatus(product.status);
        setDescription(product.description || '');
        setImage(product.images[0] || '');
        setBadge(product.badge || '');
        setIsFeatured(Boolean(product.isFeatured));
        const rawSizes = product.widthSizes || [];
        const sizes = rawSizes.map((s) => (typeof s === 'string' ? s : s.size));
        setSelectedWidthSizes(sizes);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      })
      .finally(() => setIsLoading(false));
  }, [id, isEdit]);

  useEffect(() => {
    if (!selectedCatId && categories.length) {
      setSelectedCatId(categories[0].id);
    }
  }, [categories, selectedCatId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const dto: CreateProductDTO = {
        name,
        categoryId: selectedCatId || categories[0]?.id || '',
        price: Number(price),
        originalPrice: originalPrice != null ? Number(originalPrice) : undefined,
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock: Number(stock),
        inventoryStatus,
        status: prodStatus,
        description,
        images: image ? [image] : [],
        badge: badge || undefined,
        isFeatured,
        widthSizes: isBraceletProduct ? selectedWidthSizes : [],
      };

      if (isEdit && id) {
        await productService.updateProduct(id, dto);
      } else {
        await productService.createProduct(dto);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/admin/products')}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-amber-500" />
            <span>{isEdit ? 'Edit Product' : 'Create Product'}</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isEdit ? 'Update product parameters & inventory.' : 'Add a new product to the catalog.'}
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>
      ) : null}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Product Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Golden Meraki Silk Sari"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Category *</label>
            <select
              value={selectedCatId}
              onChange={(e) => setSelectedCatId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isBraceletProduct && (
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
              Width Sizes (Bracelet Product)
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select one or multiple width sizes available for this bracelet product:
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              {['8 mm', '10 mm'].map((size) => {
                const isSelected = selectedWidthSizes.includes(size);
                return (
                  <label
                    key={size}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedWidthSizes((prev) => [...prev, size]);
                        } else {
                          setSelectedWidthSizes((prev) => prev.filter((s) => s !== size));
                        }
                      }}
                      className="sr-only"
                    />
                    <span>{isSelected ? '✓' : '○'} {size}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Selling Price (₹) *</label>
            <input
              type="number"
              required
              min="0"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Original Price (₹)</label>
            <input
              type="number"
              min="0"
              value={originalPrice ?? ''}
              onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Discount Price (₹)</label>
            <input
              type="number"
              min="0"
              value={discountPrice ?? ''}
              onChange={(e) => setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Stock Quantity *</label>
            <input
              type="number"
              required
              min="0"
              value={stock}
              onChange={(e) => {
                const newStock = Number(e.target.value);
                setStock(newStock);
                if (newStock === 0 && inventoryStatus === 'IN_STOCK') {
                  setInventoryStatus('OUT_OF_STOCK');
                } else if (newStock > 0 && inventoryStatus === 'OUT_OF_STOCK') {
                  setInventoryStatus('IN_STOCK');
                }
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Inventory Status *</label>
            <select
              value={inventoryStatus}
              onChange={(e) => setInventoryStatus(e.target.value as InventoryStatusType)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="IN_STOCK">IN_STOCK</option>
              <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
              <option value="COMING_SOON">COMING_SOON</option>
              <option value="DISCONTINUED">DISCONTINUED</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Publishing Status</label>
            <select
              value={prodStatus}
              onChange={(e) => setProdStatus(e.target.value as 'active' | 'draft')}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Badge</label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="e.g. Sale, Festive Special"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              id="isFeatured"
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Featured Product
            </label>
          </div>
        </div>

        <ImageUpload label="Product Main Image" value={image} onChange={setImage} />

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Product Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description of features, fabric, care instructions..."
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isLoading || categoriesLoading}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
