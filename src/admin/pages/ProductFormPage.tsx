import { useEffect, useState, useRef, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, ShoppingBag, Plus, Trash2, Video, Upload, X, Play } from 'lucide-react';
import { ProductImagesManager, type ProductImageItem } from '../components/common/ProductImagesManager';
import { useCategories } from '../hooks/useCategories';
import { productService } from '../services/product.service';
import type { CreateProductDTO, InventoryStatusType, SizeVariant } from '../types/product.types';

const DEFAULT_SIZES = ['8mm', '10mm'];
const DEFAULT_TREE_SIZES = ['100 Beads', '160 Beads', '300 Beads', '500 Beads'];

export function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id && id !== 'new');
  const { categories, loading: categoriesLoading } = useCategories({ initialLimit: 1000 });

  const [name, setName] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(10);
  const [inventoryStatus, setInventoryStatus] = useState<InventoryStatusType>('IN_STOCK');
  const [prodStatus, setProdStatus] = useState<'active' | 'draft'>('active');
  const [intention, setIntention] = useState('');
  const [chakra, setChakra] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<ProductImageItem[]>([]);
  const [badge, setBadge] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  // Size Variants State
  const [sizes, setSizes] = useState<SizeVariant[]>([]);
  const [newSizeInput, setNewSizeInput] = useState('');

  // Video State
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | undefined>(undefined);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCategoryObj = categories.find(
    (c) => c.id === selectedCatId || c.slug === selectedCatId || (c as any)._id === selectedCatId,
  );

  const isBraceletProduct = Boolean(
    name.toLowerCase().includes('bracelet') ||
      (selectedCategoryObj &&
        (selectedCategoryObj.name.toLowerCase().includes('bracelet') ||
          selectedCategoryObj.slug.toLowerCase().includes('bracelet') ||
          selectedCategoryObj.id.toLowerCase().includes('bracelet'))),
  );

  const isTreeProduct = Boolean(
    name.toLowerCase().includes('tree') ||
      (selectedCategoryObj &&
        (selectedCategoryObj.name.toLowerCase().includes('tree') ||
          selectedCategoryObj.slug.toLowerCase().includes('tree') ||
          selectedCategoryObj.id.toLowerCase().includes('tree'))),
  );

  const loadTreePreset = () => {
    setSizes(
      DEFAULT_TREE_SIZES.map((size) => ({
        size,
        price: price || 0,
        originalPrice: originalPrice,
        stock: stock || 10,
        isActive: true,
      })),
    );
  };

  const loadBraceletPreset = () => {
    setSizes(
      DEFAULT_SIZES.map((size) => ({
        size,
        price: price || 0,
        originalPrice: originalPrice,
        stock: stock || 10,
        isActive: true,
      })),
    );
  };

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
        setIntention(product.intention || '');
        setChakra(product.chakra || '');
        setDescription(product.description || '');
        setImages((product.images || []).map((url) => ({ id: url, url })));
        setBadge(product.badge || '');
        setIsFeatured(Boolean(product.isFeatured));

        // Load sizes
        if (product.sizes && product.sizes.length > 0) {
          setSizes(product.sizes);
        }

        // Load video
        if (product.video) {
          setVideoUrl(product.video);
          setVideoPreviewUrl(product.video);
        }
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



  const handleAddSize = () => {
    const sizeLabel = newSizeInput.trim();
    if (!sizeLabel) return;
    if (sizes.some((s) => s.size.toLowerCase() === sizeLabel.toLowerCase())) return;

    setSizes((prev) => [
      ...prev,
      {
        size: sizeLabel,
        price: price || 0,
        originalPrice: originalPrice,
        stock: 0,
        isActive: true,
      },
    ]);
    setNewSizeInput('');
  };

  const handleRemoveSize = (index: number) => {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSizeFieldChange = (index: number, field: keyof SizeVariant, value: any) => {
    setSizes((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    );
  };

  // Video handling
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !['mp4', 'webm'].includes(ext)) {
      setVideoError('Only MP4 and WebM video formats are allowed.');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setVideoError(`Video file exceeds 50 MB limit. Size: ${Math.round(file.size / (1024 * 1024))} MB`);
      return;
    }

    setVideoFile(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
  };

  const handleUploadVideoNow = async () => {
    if (!videoFile || !id) return;
    setIsUploadingVideo(true);
    setVideoError(null);
    try {
      const updated = await productService.uploadVideo(id, videoFile);
      setVideoUrl(updated.video);
      setVideoPreviewUrl(updated.video);
      setVideoFile(null);
    } catch (err: any) {
      setVideoError(err.response?.data?.message || err.message || 'Failed to upload video');
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleDeleteVideo = async () => {
    setVideoError(null);
    if (isEdit && id && videoUrl) {
      try {
        await productService.deleteVideo(id);
      } catch (err: any) {
        setVideoError(err.response?.data?.message || err.message || 'Failed to delete video');
        return;
      }
    }
    setVideoUrl(undefined);
    setVideoPreviewUrl(undefined);
    setVideoFile(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const activeSizes = sizes.map((s) => ({
        size: s.size,
        price: Number(s.price),
        originalPrice: s.originalPrice != null ? Number(s.originalPrice) : undefined,
        discountPrice: s.discountPrice != null ? Number(s.discountPrice) : undefined,
        stock: Number(s.stock),
        isActive: s.isActive !== false,
      }));

      const firstActivePrice = activeSizes.find((s) => s.isActive && s.price > 0)?.price;
      const computedPrice = Number(price) > 0 ? Number(price) : (firstActivePrice || 0);

      const dto: CreateProductDTO = {
        name,
        categoryId: selectedCatId || categories[0]?.id || '',
        price: computedPrice,
        originalPrice: originalPrice != null ? Number(originalPrice) : undefined,
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock: Number(stock),
        inventoryStatus,
        status: prodStatus,
        description,
        images: images.map((img) => img.url),
        badge: badge || undefined,
        isFeatured,
        intention: intention || undefined,
        chakra: chakra || undefined,
        sizes: activeSizes.length > 0 ? activeSizes : [],
        video: videoUrl,
      };

      if (isEdit && id) {
        await productService.updateProduct(id, dto);

        // Upload video file if selected but not yet uploaded
        if (videoFile) {
          await productService.uploadVideo(id, videoFile);
        }
      } else {
        const createDto: CreateProductDTO = { ...dto, images: [] };
        const createdProduct = await productService.createProduct(createDto);
        const newProductId = createdProduct.id;

        // Upload all local images sequentially
        for (const item of images) {
          if (item.file) {
            await productService.uploadImage(newProductId, item.file);
          }
        }

        // Upload video if selected
        if (videoFile) {
          await productService.uploadVideo(newProductId, videoFile);
        }
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
              placeholder="e.g. Terahertz Bracelet"
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

        {/* ===== SIZE / BEAD VARIANTS SECTION ===== */}
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5 dark:border-amber-900/40 dark:bg-amber-950/20 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                {isTreeProduct
                  ? 'Tree Bead Count Variants & Pricing (100, 160, 300, 500 Beads)'
                  : isBraceletProduct
                  ? 'Bracelet Bead Size Variants & Pricing (8mm, 10mm)'
                  : 'Size / Variant Pricing & Inventory'}
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Configure per-variant pricing, original price, stock, and active status for each bead count / size option.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {!isBraceletProduct && (
                <button
                  type="button"
                  onClick={loadTreePreset}
                  className="rounded-lg border border-amber-300 bg-amber-100/80 px-2.5 py-1 text-[11px] font-semibold text-amber-900 hover:bg-amber-200 transition dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
                >
                  + Load Tree Beads (100, 160, 300, 500)
                </button>
              )}
              {!isTreeProduct && (
                <button
                  type="button"
                  onClick={loadBraceletPreset}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                >
                  + Load Bracelet Sizes (8mm, 10mm)
                </button>
              )}
            </div>
            </div>

            {sizes.map((sizeItem, index) => (
              <div
                key={`${sizeItem.size}-${index}`}
                className={`rounded-xl border p-4 transition space-y-3 ${
                  sizeItem.isActive
                    ? 'border-amber-400 bg-white dark:bg-slate-900 dark:border-amber-500/80 shadow-sm'
                    : 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sizeItem.isActive}
                        onChange={(e) => handleSizeFieldChange(index, 'isActive', e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{sizeItem.size}</span>
                    </label>
                    {!sizeItem.isActive && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        Inactive
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(index)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                    title="Remove size"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={sizeItem.price}
                      onChange={(e) => handleSizeFieldChange(index, 'price', Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={sizeItem.originalPrice ?? ''}
                      onChange={(e) => handleSizeFieldChange(index, 'originalPrice', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="MRP"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Discount Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={sizeItem.discountPrice ?? ''}
                      onChange={(e) => handleSizeFieldChange(index, 'discountPrice', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Optional"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Stock *
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={sizeItem.stock}
                      onChange={(e) => handleSizeFieldChange(index, 'stock', Number(e.target.value))}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add new size / bead count */}
            <div className="flex items-end gap-2 pt-1">
              <div className="flex-1">
                <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                  {isTreeProduct ? 'Add Custom Bead Count' : 'Add New Size'}
                </label>
                <input
                  type="text"
                  value={newSizeInput}
                  onChange={(e) => setNewSizeInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSize(); } }}
                  placeholder={isTreeProduct ? 'e.g. 200 Beads, 750 Beads, 1000 Beads' : 'e.g. 12mm'}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
              <button
                type="button"
                onClick={handleAddSize}
                className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 transition"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>
          </div>

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Intention</label>
            <select
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="">None / All</option>
              <option value="wealth">Wealth & Abundance</option>
              <option value="love">Love & Harmony</option>
              <option value="peace">Inner Peace & Stress Relief</option>
              <option value="protection">Protection & Anti-Negativity</option>
              <option value="health">Vitality & Healing</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Chakra</label>
            <select
              value={chakra}
              onChange={(e) => setChakra(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="">None</option>
              <option value="crown">Crown Chakra (Sahasrara)</option>
              <option value="third-eye">Third Eye (Ajna)</option>
              <option value="throat">Throat (Vishuddha)</option>
              <option value="heart">Heart (Anahata)</option>
              <option value="solar">Solar Plexus (Manipura)</option>
              <option value="sacral">Sacral (Svadhishthana)</option>
              <option value="root">Root Chakra (Muladhara)</option>
            </select>
          </div>

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
        </div>

        <div className="flex items-center gap-2">
          <input
            id="isFeatured"
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
          />
          <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Featured Product (Displays on home page/featured lists)
          </label>
        </div>

        <ProductImagesManager
          productId={id}
          images={images}
          onChange={setImages}
          onRefreshProduct={
            id
              ? () => {
                  productService.getProductById(id).then((p) => {
                    if (p) {
                      setImages((p.images || []).map((url) => ({ id: url, url })));
                    }
                  });
                }
              : undefined
          }
        />

        {/* ===== PRODUCT VIDEO SECTION ===== */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Video</label>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Upload an optional product video (MP4 or WebM). Max size: 50 MB.
            </p>
          </div>

          {videoError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/30 dark:bg-rose-950/20 dark:text-rose-400">
              {videoError}
            </div>
          )}

          {videoPreviewUrl ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950">
              <div className="relative aspect-video w-full max-w-md">
                <video
                  src={videoPreviewUrl}
                  controls
                  className="w-full h-full object-contain bg-black rounded-t-2xl"
                  preload="metadata"
                />
              </div>
              <div className="flex items-center gap-2 p-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Replace
                </button>
                {isEdit && id && videoFile && (
                  <button
                    type="button"
                    onClick={handleUploadVideoNow}
                    disabled={isUploadingVideo}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 transition disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {isUploadingVideo ? 'Uploading...' : 'Upload Now'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleDeleteVideo}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
                {videoFile && (
                  <span className="text-[10px] text-amber-600 font-medium">
                    New file selected — will upload on save
                  </span>
                )}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[100px] hover:bg-slate-50 dark:hover:bg-slate-800/30 w-full max-w-md"
            >
              <Video className="w-8 h-8 text-amber-500 mb-2" />
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Click to upload a product video
              </p>
              <p className="text-[10px] text-slate-400 mt-1">MP4, WebM • Max 50 MB</p>
            </button>
          )}

          <input
            type="file"
            ref={videoInputRef}
            accept="video/mp4,video/webm,.mp4,.webm"
            onChange={handleVideoSelect}
            className="hidden"
          />
        </div>

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
