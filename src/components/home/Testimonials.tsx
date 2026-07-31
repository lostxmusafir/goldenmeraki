import { Quote, Star, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../../data/blogs';

export function Testimonials() {
  // Duplicate reviews array to create an infinite seamless loop
  const marqueeItems = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              Testimonials
            </div>
            <h2 className="mt-3 text-2xl font-light tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Trusted by people who value craftsmanship.
            </h2>
          </div>
          <p className="text-xs font-medium text-slate-400 sm:text-right">
            Hover over cards to pause moving ticker
          </p>
        </div>
      </div>

      {/* Infinite Marquee Container (Right to Left) */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Gradient edge fades for seamless luxury look */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />

        <div className="animate-marquee-left flex gap-6 px-4">
          {marqueeItems.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="group relative w-[320px] sm:w-[380px] shrink-0 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, starIdx) => (
                    <Star key={starIdx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-amber-200 transition-colors group-hover:text-amber-400" />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-700 font-light line-clamp-3">
                "{review.comment}"
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-950">
                    <span>{review.name}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                  <div className="text-xs text-slate-500">{review.city} • Verified Buyer</div>
                </div>

                {review.productName && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600 truncate max-w-[120px]">
                    {review.productName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
