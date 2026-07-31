import { Quote, Star, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { getImageUrl } from '../../utils/image';

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'Mumbai',
    rating: 5,
    date: 'Verified Buyer',
    comment: 'The Pyrite Cluster from Golden Meraki is stunning! The golden crystals sparkle immensely and came with an authentic lab certificate. Placed it in my office cash box for wealth.',
    productName: 'Pyrite Wealth Cluster',
    productImage: '/images/pyrite_cluster.png',
    initials: 'AS',
    gradient: 'from-amber-400 to-amber-600'
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
    gradient: 'from-purple-500 to-indigo-600'
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
    gradient: 'from-violet-500 to-purple-600'
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
    gradient: 'from-rose-400 to-pink-600'
  }
];

export function Testimonials() {
  // Duplicated for seamless infinite right-to-left marquee scroll
  const marqueeItems = [...REVIEWS_DATA, ...REVIEWS_DATA, ...REVIEWS_DATA];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/30 via-white to-slate-50/80 py-16 sm:py-24">
      {/* Background Soft Glow Orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/3 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />

      {/* Header Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-900">
              <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>Testimonials</span>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Trusted by people who value <span className="font-semibold text-amber-900 underline decoration-amber-300 decoration-wavy decoration-2">craftsmanship.</span>
            </h2>
            <p className="text-sm text-slate-600 font-normal max-w-xl">
              Real stories & reviews from verified crystal lovers across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900 text-sm">4.9 / 5.0</span>
              <span className="text-xs text-slate-500 font-medium">(2,400+ Reviews)</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100/80 px-3.5 py-2 rounded-xl border border-slate-200/60">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Hover cards to pause scroll</span>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Moving Marquee Ticker (Right to Left, Pauses on Hover) */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Soft edge fades for seamless luxury look */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-amber-50/80 via-white/80 to-transparent sm:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-slate-50/80 via-white/80 to-transparent sm:w-36" />

        <div className="animate-marquee-left flex gap-6 px-4">
          {marqueeItems.map((review, idx) => (
            <article
              key={`${review.id}-${idx}`}
              className="group relative w-[320px] sm:w-[400px] shrink-0 rounded-[2.25rem] border border-slate-200/90 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-[0_20px_40px_rgba(245,158,11,0.12)]"
            >
              {/* Header: Gradient Initial Badge + Name + Quote Icon */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${review.gradient} text-sm font-bold text-white shadow-md ring-2 ring-white`}>
                    {review.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-base font-bold text-slate-950 font-sans">
                      <span>{review.name}</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 fill-emerald-50 text-emerald-500" />
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{review.city} • Verified Buyer</div>
                  </div>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
                  <Quote className="h-4 w-4 fill-amber-500 text-amber-500" />
                </div>
              </div>

              {/* 5-Star Rating Pill */}
              <div className="mt-4 flex items-center gap-1 text-amber-400">
                {Array.from({ length: review.rating }).map((_, starIdx) => (
                  <Star key={starIdx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-xs font-bold text-slate-800">5.0</span>
              </div>

              {/* Review Text - High Contrast Bold Slate-900 Text */}
              <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-900 font-normal line-clamp-4">
                "{review.comment}"
              </p>

              {/* Footer: Purchased Product Pill with Thumbnail */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50 px-3 py-1.5 shadow-2xs transition-colors group-hover:border-amber-200 group-hover:bg-amber-50/50">
                  <img
                    src={getImageUrl(review.productImage)}
                    alt={review.productName}
                    className="h-7 w-7 rounded-xl object-cover ring-1 ring-slate-200"
                  />
                  <span className="text-xs font-semibold text-slate-900 truncate max-w-[170px]">
                    {review.productName}
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Verified Order
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
