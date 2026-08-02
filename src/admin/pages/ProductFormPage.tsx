import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, ShoppingBag } from 'lucide-react';
import { ImageUpload } from '../components/common/ImageUpload';
import { useCategories } from '../hooks/useCategories';
import { productService } from '../services/product.service';
import type { AdminProduct, CreateProductDTO } from '../types/product.types';

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
  const [prodStatus, setProdStatus] = useState<'active' | 'draft' | 'out_of_stock'>('active');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [badge, setBadge] = useState('');
  const [certificate, setCertificate] = useState('');
  const [chakra, setChakra] = useState('');
  const [intention, setIntention] = useState('');
  const [stone, setStone] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [benefits, setBenefits] = useState('');
  const [tags, setTags] = useState('');
  const [weights, setWeights] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [attributesJson, setAttributesJson] = useState('');
  const [specificationsJson, setSpecificationsJson] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setProdStatus(product.status);
        setDescription(product.description || '');
        setImage(product.images[0] || '');
        setBadge(product.badge || '');
        setCertificate(product.certificate || '');
        setChakra(product.chakra || '');
        setIntention(product.intention || '');
        setStone(product.stone || '');
        setSubCategory(product.subCategory || '');
        setBenefits((product.benefits ?? []).join(', '));
        setTags((product.tags ?? []).join(', '));
        setWeights((product.weights ?? []).join(', '));
        setIsFeatured(Boolean(product.isFeatured));
        setAttributesJson(product.attributes ? JSON.stringify(product.attributes, null, 2) : '');
        setSpecificationsJson(product.specifications ? JSON.stringify(product.specifications, null, 2) : '');
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
      const parseJsonField = (value: string) => {
        if (!value.trim()) return undefined;
        try {
          return JSON.parse(value) as Record<string, string>;
        } catch {
          return undefined;
        }
      };

      const dto: CreateProductDTO = {
        name,
        categoryId: selectedCatId || categories[0]?.id || 'cat-1',
        price: Number(price),
        originalPrice: originalPrice != null ? Number(originalPrice) : undefined,
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock: Number(stock),
        status: prodStatus,
        description,
        images: image ? [image] : [],
        badge: badge || undefined,
        certificate: certificate || undefined,
        chakra: chakra || undefined,
        intention: intention || undefined,
        stone: stone || undefined,
        subCategory: subCategory || undefined,
        benefits: benefits.split(',').map((entry) => entry.trim()).filter(Boolean),
        tags: tags.split(',').map((entry) => entry.trim()).filter(Boolean),
        weights: weights.split(',').map((entry) => entry.trim()).filter(Boolean),
        isFeatured,
        attributes: parseJsonField(attributesJson),
        specifications: parseJsonField(specificationsJson)
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
            {isEdit ? 'Update the product and sync it with the store.' : 'Add a new product to the catalog.'}
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
              placeholder="e.g. Amethyst Crystal Bracelet"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Category</label>
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Price (₹) *</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Original Price</label>
            <input
              type="number"
              value={originalPrice ?? ''}
              onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Discount Price</label>
            <input
              type="number"
              value={discountPrice ?? ''}
              onChange={(e) => setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Stock *</label>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Status</label>
            <select
              value={prodStatus}
              onChange={(e) => setProdStatus(e.target.value as 'active' | 'draft' | 'out_of_stock')}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            <span className="text-sm text-slate-700 dark:text-slate-300">Featured</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Badge</label>
            <input type="text" value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="Sale" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Sub Category</label>
            <input type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} placeholder="bracelets" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Certificate</label>
            <input type="text" value={certificate} onChange={(e) => setCertificate(e.target.value)} placeholder="ISO Certified" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Stone</label>
            <input type="text" value={stone} onChange={(e) => setStone(e.target.value)} placeholder="Amethyst" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Chakra</label>
            <input type="text" value={chakra} onChange={(e) => setChakra(e.target.value)} placeholder="root" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Intention</label>
            <input type="text" value={intention} onChange={(e) => setIntention(e.target.value)} placeholder="healing" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
          </div>
        </div>

        <ImageUpload label="Product Main Image" value={image} onChange={setImage} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Benefits</label>
            <input type="text" value={benefits} onChange={(e) => setBenefits(e.target.value)} placeholder="Comma-separated values" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Tags</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Comma-separated tags" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Weights</label>
            <input type="text" value={weights} onChange={(e) => setWeights(e.target.value)} placeholder="100g, 200g" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Attributes (JSON)</label>
          <textarea rows={3} value={attributesJson} onChange={(e) => setAttributesJson(e.target.value)} placeholder='{"color":"Gold"}' className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Specifications (JSON)</label>
          <textarea rows={3} value={specificationsJson} onChange={(e) => setSpecificationsJson(e.target.value)} placeholder='{"fabric":"Silk"}' className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Description</label>
          <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product features and crystal properties..." className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button type="button" onClick={() => navigate('/admin/products')} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
          <button type="submit" disabled={isSubmitting || isLoading || categoriesLoading} className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50">
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
