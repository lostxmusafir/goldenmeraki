import { CheckCircle2 } from 'lucide-react';
import { getImageUrl } from '../../utils/image';

const DRIBBLLE_REVIEWS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    city: 'Mumbai',
    role: 'Verified Buyer • Pyrite Wealth Cluster',
    comment: 'The Pyrite Cluster from Golden Meraki is stunning! The golden crystals sparkle immensely and came with an authentic lab certificate. Placed it in my office cash box for wealth.',
    initials: 'AS',
    gradient: 'from-amber-400 to-amber-600',
    productImage: '/images/pyrite_cluster.png'
  },
  {
    id: 2,
    name: 'Rajesh Verma',
    city: 'Delhi NCR',
    role: 'Verified Buyer • 7 Chakra Bracelet',
    comment: '100% authentic 7 Chakra Bracelet! Fast delivery to Delhi within 48 hours. Packaging was pristine with sacred sound energy cleansing.',
    initials: 'RV',
    gradient: 'from-purple-600 to-indigo-700',
    productImage: '/images/seven_chakra_bracelet.png'
  },
  {
    id: 3,
    name: 'Priyanka Patel',
    city: 'Ahmedabad',
    role: 'Verified Buyer • Amethyst Geode',
    comment: 'Bought the Amethyst Geode slice for my meditation room. High vibrational energy, beautiful deep purple color tones, and immediate peaceful vibes.',
    initials: 'PP',
    gradient: 'from-violet-600 to-purple-800',
    productImage: '/images/amethyst_jaap_mala.png'
  },
  {
    id: 4,
    name: 'Meera Iyer',
    city: 'Bengaluru',
    role: 'Verified Buyer • Rose Quartz Gua Sha',
    comment: 'The Rose Quartz Gua Sha roller completely upgraded my daily skin wellness routine! So soothing, cool, and 100% natural stone quality.',
    initials: 'MI',
    gradient: 'from-rose-500 to-pink-700',
    productImage: '/images/rose_quartz_guasha.png'
  }
];

export function Testimonials() {
  // Duplicated for 100% seamless infinite right-to-left marquee scroll across all screen sizes
  const marqueeItems = [...DRIBBLLE_REVIEWS, ...DRIBBLLE_REVIEWS, ...DRIBBLLE_REVIEWS, ...DRIBBLLE_REVIEWS];

  return (
    <section className="relative overflow-hidden bg-slate-100/70 py-20 sm:py-28">
      {/* Subtle Grid Background Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header Container (Centered matching Dribbble design) */}
      <div className="relative mx-auto max-w-4xl px-4 text-center mb-16">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-700">
          T E S T I M O N I A L S
        </p>
        <h2 className="mt-3 font-sans text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          TRUSTED BY PEOPLE WHO VALUE CRAFTSMANSHIP
        </h2>
        <p className="mt-3 text-sm text-slate-500 font-medium">
          Real stories that speak through customer voices.
        </p>
      </div>

      {/* Non-Stop Moving Marquee Row (Right to Left, Pauses ONLY on Hover/Hold) */}
      <div className="relative w-full overflow-hidden py-6">
        {/* Soft edge gradient fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-slate-100 via-slate-100/80 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-slate-100 via-slate-100/80 to-transparent sm:w-40" />

        <div className="animate-marquee-left flex gap-8 px-4">
          {marqueeItems.map((review, idx) => (
            <div key={`${review.id}-${idx}`} className="relative group shrink-0">
              {/* Stacked background cards for Dribbble ID Badge pass effect */}
              <div className="absolute inset-0 translate-y-2 translate-x-1.5 rounded-[2rem] bg-slate-200/80 shadow-sm" />
              <div className="absolute inset-0 translate-y-1 -translate-x-1 rounded-[2rem] bg-slate-300/50" />

              {/* Main Badge Pass Card with Fixed Equal Size */}
              <article className="relative flex h-[310px] sm:h-[330px] w-[320px] sm:w-[400px] flex-col justify-between rounded-[2rem] border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-slate-300">
                {/* Lanyard Clip Ribbon Holder at top center */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="h-4 w-12 rounded-t-lg bg-gradient-to-b from-slate-200 to-slate-300 border border-slate-300/90 shadow-xs" />
                  <div className="h-2 w-8 rounded-b-md bg-slate-800 shadow-sm" />
                </div>

                {/* Brand Logo Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 pt-1">
                  <span className="font-sans text-xs font-black uppercase tracking-[0.25em] text-slate-900">
                    GOLDEN MERAKI
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Verified Buyer</span>
                  </div>
                </div>

                {/* Review Text Body Container */}
                <div className="my-auto py-2">
                  <div className="text-xl font-serif text-slate-900 leading-none mb-1">
                    “
                  </div>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-slate-900 font-medium line-clamp-3">
                    {review.comment}
                  </p>
                </div>

                {/* Card Footer Row: Avatar + Name + Product Image Badge */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${review.gradient} text-xs font-bold text-white shadow-md`}>
                      {review.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-950">
                        <span>{review.name}</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <div className="text-xs text-slate-500 font-medium truncate max-w-[160px]">
                        {review.role}
                      </div>
                    </div>
                  </div>

                  {/* Product Badge */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-slate-50 p-0.5 shadow-2xs">
                    <img
                      src={getImageUrl(review.productImage)}
                      alt={review.name}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
