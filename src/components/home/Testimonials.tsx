import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { REVIEWS } from '../../data/blogs';

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % REVIEWS.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const activeReview = REVIEWS[activeIndex];

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Testimonials</p>
            <h2 className="mt-2 text-2xl font-light tracking-tight text-slate-950 sm:text-3xl">
              Trusted by people who value craftsmanship.
            </h2>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => setActiveIndex((current) => (current === 0 ? REVIEWS.length - 1 : current - 1))}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((current) => (current + 1) % REVIEWS.length)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[20rem] bg-slate-950 p-8 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_38%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <Quote className="h-10 w-10 text-amber-300/90" />
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-300">
                    {Array.from({ length: activeReview.rating }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="max-w-lg text-lg font-light leading-8 text-slate-100">"{activeReview.comment}"</p>
                  <div>
                    <div className="text-sm font-medium text-white">{activeReview.name}</div>
                    <div className="text-xs text-slate-400">{activeReview.city}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid place-items-center bg-white p-8 sm:p-10">
              <div className="w-full max-w-xl space-y-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {activeIndex + 1} of {REVIEWS.length}
                </div>
                <div className="space-y-3">
                  {REVIEWS.map((review, index) => (
                    <button
                      key={review.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition-all ${
                        index === activeIndex
                          ? 'border-slate-950 bg-slate-950 text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{review.name}</div>
                        <div className="flex gap-0.5 text-amber-400">
                          {Array.from({ length: review.rating }).map((_, starIndex) => (
                            <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="mt-1 text-xs opacity-70">{review.city}</div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  {REVIEWS.map((review, index) => (
                    <button
                      key={review.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeIndex ? 'w-8 bg-slate-950' : 'w-2.5 bg-slate-300'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

