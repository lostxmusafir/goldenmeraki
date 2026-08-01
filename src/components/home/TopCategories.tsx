import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils/catalog';
import { getImageUrl } from '../../utils/image';
import { getCategories, type CatalogCategory } from '../../services/catalogApi';

const CATEGORY_IMAGES: Record<string, string> = {
  bracelets: '/images/seven_chakra_bracelet.png',
  'raw-stones': '/images/pyrite_cluster.png',
  'trees-decor': '/images/fengshui_crystal_tree.png',
  'malas-jewelry': '/images/amethyst_jaap_mala.png',
  'face-wellness': '/images/rose_quartz_guasha.png'
};

export function TopCategories() {
  const [categories, setCategories] = useState<CatalogCategory[]>([]);

  useEffect(() => {
    let isActive = true;

    const loadCategories = async () => {
      try {
        const response = await getCategories();
        if (isActive) {
          setCategories(response);
        }
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    };

    loadCategories();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Top categories</p>
            <h2 className="mt-2 text-2xl font-light tracking-tight text-slate-950 sm:text-3xl">A clean way to browse the collection.</h2>
          </div>
          <Link to="/category/all" className="self-end text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 sm:self-auto">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.filter((category) => category.id !== 'all').map((category) => (
            <Link
              key={category.id}
              to={`/category/${slugify(category.slug ?? category.id)}`}
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
            >
              <div className="aspect-square overflow-hidden bg-white">
                <img
                  src={getImageUrl(CATEGORY_IMAGES[category.id] ?? '/images/pyrite_cluster.png')}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{(category.slug ?? category.id).replace('-', ' ')}</div>
                <div className="mt-1 text-sm font-medium text-slate-950">{category.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

