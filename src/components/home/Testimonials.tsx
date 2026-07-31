import { Quote, Star, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { getImageUrl } from '../../utils/image';

const TOP_REVIEWS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'Mumbai',
    rating: 5,
    date: 'Verified Buyer',
    comment: 'The Pyrite Cluster from Golden Meraki is stunning! The golden crystals sparkle immensely and came with a lab certificate. Placed it in my office cash box for wealth.',
    productName: 'Pyrite Wealth Cluster',
    productImage: '/images/pyrite_cluster.png',
    initials: 'AS',
    gradient: 'from-amber-500 to-amber-700'
  },
  {
    id: 2,
    name: 'Rajesh Verma',
    city: 'Delhi NCR',
    rating: 5,
    date: 'Verified Buyer',
    comment: '100% authentic 7 Chakra Bracelet! Fast delivery to Delhi within 48 hours. Packaging was pristine with sacred sound energy cleansing.',
    productName: '7 Chakra Lava Bracelet',
    productImage: '/images/seven_chakra_bracelet.png',
    initials: 'RV',
    gradient: 'from-purple-600 to-indigo-700'
  },
  {
    id: 3,
    name: 'Priyanka Patel',
    city: 'Ahmedabad',
    rating: 5,
    date: 'Verified Buyer',
    comment: 'Bought the Amethyst Geode slice for my meditation room. High vibrational energy, beautiful deep purple color tones, and immediate peaceful vibes.',
    productName: 'Amethyst Geode Slice',
    productImage: '/images/amethyst_jaap_mala.png',
    initials: 'PP',
    gradient: 'from-violet-600 to-purple-800'
  },
  {
    id: 4,
    name: 'Meera Iyer',
    city: 'Bengaluru',
    rating: 5,
    date: 'Verified Buyer',
    comment: 'The Rose Quartz Gua Sha roller completely upgraded my daily skin wellness routine! So soothing, cool, and 100% natural stone quality.',
    productName: 'Rose Quartz Gua Sha',
    productImage: '/images/rose_quartz_guasha.png',
    initials: 'MI',
    gradient: 'from-rose-500 to-pink-700'
  }
];

export function Testimonials() {
  // Duplicated for seamless continuous right-to-left infinite marquee
  const marqueeItems = [...TOP_REVIEWS, ...TOP_REVIEWS, ...TOP_REVIEWS];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28 text-white">
      {/* Ambient Radial Aura Lights */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-amber-500/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
              <span>Customer Stories</span>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl text-white">
              Trusted by people who value <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent italic font-normal">craftsmanship.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-md">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.9 / 5.0</span>
              <span className="text-slate-400">(2,400+ Reviews)</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Hover to pause</span>
            </div>
          </div>
        </div>
      </div>

      {/* Moving Right-To-Left Marquee Ticker */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Soft Dark Vignette Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-slate-950 to-transparent sm:w-44" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-slate-950 to-transparent sm:w-44" />

        <div className="animate-marquee-left flex gap-6 px-4">
          {marqueeItems.map((review, idx) => (
            <article
              key={`${review.id}-${idx}`}
              className="group relative w-[340px] sm:w-[420px] shrink-0 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-7 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/40 hover:bg-white/[0.12] hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)]"
            >
              {/* Product Thumbnail + Star Rating Header */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={getImageUrl(review.productImage)}
                    alt={review.productName}
                    className="h-12 w-12 rounded-2xl object-cover ring-2 ring-amber-400/30"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-xs font-semibold text-amber-300 uppercase tracking-wider">{review.productName}</div>
                    <div className="flex gap-1 text-amber-400 mt-1">
                      {Array.from({ length: review.rating }).map((_, starIdx) => (
                        <Star key={starIdx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300">
                  <Quote className="h-4 w-4 fill-amber-400 text-amber-400" />
                </div>
              </div>

              {/* Bold Clear Review Comment */}
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-200 font-normal line-clamp-4">
                "{review.comment}"
              </p>

              {/* Customer Info Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${review.gradient} text-xs font-bold text-white shadow-lg ring-2 ring-white/20`}>
                    {review.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                      <span>{review.name}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <div className="text-xs text-slate-400">{review.city} • Verified Buyer</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
