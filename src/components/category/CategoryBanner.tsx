import type { ProductCategoryId } from '../../types/product';
import { getCategoryTitle } from '../../utils/catalog';
import { getImageUrl } from '../../utils/image';

export interface CategoryBannerProps {
  slug: ProductCategoryId;
  title?: string;
  description?: string;
  image?: string;
}

const CATEGORY_COPY: Record<string, { eyebrow: string; description: string; image: string }> = {
  all: {
    eyebrow: '',
    description: 'A refined overview of every crystal, bracelet, and ritual piece in the store.',
    image: '/images/pyrite_cluster.png'
  }
};

export function CategoryBanner({ slug, title, description, image }: CategoryBannerProps) {
  const copy = CATEGORY_COPY[slug] ?? CATEGORY_COPY.all;
  const resolvedTitle = title ?? getCategoryTitle(slug);
  const resolvedDescription = description || copy.description;
  const resolvedImage = image || copy.image;

  return (
    <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8 lg:py-10">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{copy.eyebrow}</p>
          <h1 className="max-w-2xl text-3xl font-light tracking-tight text-slate-950 sm:text-4xl">{resolvedTitle}</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">{resolvedDescription}</p>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <img src={getImageUrl(resolvedImage)} alt={resolvedTitle} className="h-full min-h-64 w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

