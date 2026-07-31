import { Quote, Star, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

const TOP_REVIEWS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'Mumbai',
    rating: 5,
    date: 'Verified Buyer',
    comment: 'The Pyrite Cluster from Golden Meraki is stunning! The golden crystals sparkle immensely and came with a lab certificate. Placed it in my office cash box for wealth.',
    productName: 'Pyrite Wealth Cluster',
    initials: 'AS',
    avatarBg: 'from-amber-400 to-amber-600'
  },
  {
    id: 2,
    name: 'Rajesh Verma',
    city: 'Delhi NCR',
    rating: 5,
    date: 'Verified Buyer',
    comment: '100% authentic 7 Chakra Bracelet! Fast delivery to Delhi within 48 hours. Packaging was pristine with sacred sound energy cleansing.',
    productName: '7 Chakra Lava Bracelet',
    initials: 'RV',
    avatarBg: 'from-purple-500 to-indigo-600'
  },
  {
    id: 3,
    name: 'Priyanka Patel',
    city: 'Ahmedabad',
    rating: 5,
    date: 'Verified Buyer',
    comment: 'Bought the Amethyst Geode slice for my meditation room. High vibrational energy and beautiful deep purple color tones.',
    productName: 'Amethyst Geode Slice',
    initials: 'PP',
    avatarBg: 'from-violet-500 to-purple-600'
  },
  {
    id: 4,
    name: 'Meera Iyer',
    city: 'Bengaluru',
    rating: 5,
    date: 'Verified Buyer',
    comment: 'The Rose Quartz Gua Sha roller completely upgraded my daily skin wellness routine! So soothing, cool, and 100% natural stone.',
    productName: 'Rose Quartz Gua Sha',
    initials: 'MI',
    avatarBg: 'from-pink-400 to-rose-600'
  }
];

export function Testimonials() {
  // 4 curated reviews duplicated for infinite seamless right-to-left scroll
  const marqueeItems = [...TOP_REVIEWS, ...TOP_REVIEWS, ...TOP_REVIEWS];

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/60 to-white py-16 sm:py-24 overflow-hidden">
      {/* Background Subtle Glowing Elements */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-900 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
              <span>Testimonials</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl font-light tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Trusted by people who value craftsmanship.
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>100% Verified Customer Reviews</span>
            </div>
            <span className="hidden sm:inline-block text-slate-400">• Hover to pause moving cards</span>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Container (Moving Right to Left, Pauses on Hover) */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Soft edge gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-white to-transparent sm:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-white to-transparent sm:w-36" />

        <div className="animate-marquee-left flex gap-6 px-4">
          {marqueeItems.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="group relative w-[320px] sm:w-[400px] shrink-0 rounded-[2.25rem] border border-slate-200/90 bg-white/90 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Top Row: Stars + Quote Icon */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, starIdx) => (
                    <Star key={starIdx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-semibold text-slate-900">5.0</span>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
                  <Quote className="h-4 w-4 fill-current" />
                </div>
              </div>

              {/* Comment with Elegant Serif Accent Font */}
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-700 font-light font-sans line-clamp-4 italic">
                "{review.comment}"
              </p>

              {/* Footer Row: Avatar + Name + Product Badge */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${review.avatarBg} text-xs font-bold text-white shadow-md`}>
                    {review.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-950 font-serif">
                      <span>{review.name}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                    <div className="text-xs text-slate-500">{review.city} • {review.date}</div>
                  </div>
                </div>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-2xs truncate max-w-[130px]">
                  {review.productName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
