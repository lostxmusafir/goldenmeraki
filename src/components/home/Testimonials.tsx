import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto right-to-left slide transition every 2 seconds (2000ms)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % DRIBBLLE_REVIEWS.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section 
      className="relative overflow-hidden bg-slate-100/70 py-20 sm:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Grid Background Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header Container (Centered matching Dribbble screenshot) */}
      <div className="relative mx-auto max-w-4xl px-4 text-center mb-14">
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

      {/* 4 Reviews Auto Slider Container */}
      <div className="relative mx-auto max-w-2xl px-4">
        {/* Navigation Arrow Controls */}
        <button
          type="button"
          onClick={() => setActiveIndex((curr) => (curr === 0 ? DRIBBLLE_REVIEWS.length - 1 : curr - 1))}
          className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-md backdrop-blur-sm transition-all hover:bg-slate-950 hover:text-white hover:scale-110"
          aria-label="Previous review"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => setActiveIndex((curr) => (curr + 1) % DRIBBLLE_REVIEWS.length)}
          className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-md backdrop-blur-sm transition-all hover:bg-slate-950 hover:text-white hover:scale-110"
          aria-label="Next review"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Sliding Card Wrapper */}
        <div className="overflow-hidden py-6">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {DRIBBLLE_REVIEWS.map((review) => (
              <div key={review.id} className="w-full shrink-0 px-2">
                <div className="relative group">
                  {/* Stacked background cards for Dribbble ID Badge pass effect */}
                  <div className="absolute inset-0 translate-y-2 translate-x-1.5 rounded-[2rem] bg-slate-200/80 shadow-sm" />
                  <div className="absolute inset-0 translate-y-1 -translate-x-1 rounded-[2rem] bg-slate-300/50" />

                  {/* Main Badge Pass Card */}
                  <article className="relative w-full rounded-[2rem] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-xl transition-all duration-300">
                    {/* Lanyard Clip Ribbon Holder at top center */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className="h-4 w-12 rounded-t-lg bg-gradient-to-b from-slate-200 to-slate-300 border border-slate-300/90 shadow-xs" />
                      <div className="h-2 w-8 rounded-b-md bg-slate-800 shadow-sm" />
                    </div>

                    {/* Brand Logo Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-5 pt-2">
                      <span className="font-sans text-xs font-black uppercase tracking-[0.25em] text-slate-900">
                        GOLDEN MERAKI
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Verified Buyer</span>
                      </div>
                    </div>

                    {/* Left Quote Mark */}
                    <div className="mt-6 text-3xl font-serif text-slate-900 leading-none">
                      “
                    </div>

                    {/* Review Text Body */}
                    <p className="mt-2 text-base sm:text-lg leading-relaxed text-slate-700 font-normal">
                      {review.comment}
                    </p>

                    {/* Card Footer Row: Avatar + Name + Product Image Badge */}
                    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                      <div className="flex items-center gap-3.5">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${review.gradient} text-sm font-bold text-white shadow-md ring-2 ring-white`}>
                          {review.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-base font-bold text-slate-900">
                            <span>{review.name}</span>
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
                            {review.role}
                          </div>
                        </div>
                      </div>

                      {/* Product Badge */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-slate-50 p-0.5 shadow-2xs">
                        <img
                          src={getImageUrl(review.productImage)}
                          alt={review.name}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Pagination Indicator */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {DRIBBLLE_REVIEWS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                index === activeIndex ? 'w-8 bg-slate-950' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
