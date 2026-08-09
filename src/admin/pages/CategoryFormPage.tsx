import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Layers } from 'lucide-react';
import { ImageUpload } from '../components/common/ImageUpload';
import { useCategories } from '../hooks/useCategories';
import { categoryService } from '../services/category.service';
import type { Category, CreateCategoryDTO } from '../types/category.types';

export function CategoryFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id && id !== 'new');
  const { categories, loading: categoriesLoading } = useCategories();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDeleted, setImageDeleted] = useState(false);
  const [categoryLabel, setCategoryLabel] = useState('');
  const [parentId, setParentId] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (url: string, file?: File) => {
    setImage(url);
    if (file) {
      setImageFile(file);
      setImageDeleted(false);
    } else {
      setImageFile(null);
      if (url === '') {
        setImageDeleted(true);
      }
    }
  };

  useEffect(() => {
    if (!isEdit || !id) return;

    setIsLoading(true);
    categoryService
      .getCategoryById(id)
      .then((category) => {
        if (!category) {
          setError('Category not found');
          return;
        }
        setName(category.name);
        setDescription(category.description || '');
        setImage(category.image || '');
        setCategoryLabel(category.category || '');
        setParentId(category.parent || '');
        setStatus(category.status);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load category');
      })
      .finally(() => setIsLoading(false));
  }, [id, isEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const dto: CreateCategoryDTO = {
        name,
        description,
        image: imageFile || imageDeleted ? '' : (isEdit ? image : undefined),
        category: categoryLabel || undefined,
        parent: parentId || undefined,
        status
      };

      let categoryId = id;
      if (isEdit && id) {
        await categoryService.updateCategory(id, dto);
      } else {
        const created = await categoryService.createCategory(dto);
        categoryId = created.id;
      }

      if (categoryId) {
        if (imageFile) {
          await categoryService.uploadImage(categoryId, imageFile);
        } else if (imageDeleted) {
          await categoryService.deleteImage(categoryId);
        }
      }

      navigate('/admin/categories');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/admin/categories')}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-500" />
            <span>{isEdit ? 'Edit Category' : 'Create Category'}</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isEdit ? 'Update category details and publish changes.' : 'Add a new category to the catalog.'}
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>
      ) : null}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">Category Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Healing Bracelets"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short category summary..."
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">Short Label</label>
            <input
              type="text"
              value={categoryLabel}
              onChange={(e) => setCategoryLabel(e.target.value)}
              placeholder="e.g. BRACELETS"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">Parent Category</label>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="">None</option>
              {categories
                .filter((category) => category.id !== id)
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <ImageUpload label="Category Banner / Thumbnail" value={image} onChange={handleImageChange} />

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => navigate('/admin/categories')}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isLoading || categoriesLoading}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Category' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  );
}
