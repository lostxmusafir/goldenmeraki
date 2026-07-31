import type { ProductCategoryId } from '../../types/product';
import { getCategoryTitle } from '../../utils/catalog';
import { getImageUrl } from '../../utils/image';

export interface CategoryBannerProps {
  slug: ProductCategoryId;
}

const CATEGORY_COPY: Record<string, { eyebrow: string; description: string; image: string }> = {
  all: {
    eyebrow: 'All collections',
    description: 'A refined overview of every crystal, bracelet, and ritual piece in the store.',
    image: '/images/pyrite_cluster.png'
  },
  bracelets: {
    eyebrow: 'Bracelets',
    description: 'Minimal gemstone bracelets designed to look polished and feel effortless.',
    image: '/images/seven_chakra_bracelet.png'
  },
  'raw-stones': {
    eyebrow: 'Raw stones',
    description: 'Curated raw crystals, clusters, and grounding stones with an elevated presentation.',
    image: '/images/pyrite_cluster.png'
  },
  'trees-decor': {
    eyebrow: 'Home decor',
    description: 'Sculptural objects that bring structure, ritual, and calm to the space around you.',
    image: '/images/fengshui_crystal_tree.png'
  },
  'malas-jewelry': {
    eyebrow: 'Jewelry',
    description: 'A concise edit of malas and spiritual jewelry in a premium visual language.',
    image: '/images/amethyst_jaap_mala.png'
  },
  'face-wellness': {
    eyebrow: 'Wellness tools',
    description: 'Facial and wellness objects selected for everyday self-care and gifting.',
    image: '/images/rose_quartz_guasha.png'
  }
};

export function CategoryBanner({ slug }: CategoryBannerProps) {
  const copy = CATEGORY_COPY[slug] ?? CATEGORY_COPY.all;

  return (
    <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8 lg:py-10">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{copy.eyebrow}</p>
          <h1 className="max-w-2xl text-3xl font-light tracking-tight text-slate-950 sm:text-4xl">{getCategoryTitle(slug)}</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">{copy.description}</p>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <img src={getImageUrl(copy.image)} alt={getCategoryTitle(slug)} className="h-full min-h-64 w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

