import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),linear-gradient(180deg,#fafafa_0%,#ffffff_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-slate-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-slate-950" />
              Minimal luxury crystal ritual
            </span>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-light tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Intentional pieces for calm, clarity, and quiet brilliance.
              </h1>
              <p className="max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                Discover refined gemstone jewellery, sacred decor, and curated crystal collections designed for modern ritual spaces.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-slate-950 px-5 text-white hover:bg-slate-800">
                <Link to="/category/raw-stones" className="inline-flex items-center gap-2">
                  Shop collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button className="border border-slate-200 bg-white px-5 text-slate-900 hover:border-slate-300 hover:bg-slate-50">
                <Link to="/category/bracelets">Explore bracelets</Link>
              </Button>
            </div>
            <div className="grid max-w-xl grid-cols-3 gap-4 pt-3 text-sm">
              <div>
                <div className="text-2xl font-light text-slate-950">5000+</div>
                <p className="text-slate-500">Curated pieces</p>
              </div>
              <div>
                <div className="text-2xl font-light text-slate-950">1-2 days</div>
                <p className="text-slate-500">Fast dispatch</p>
              </div>
              <div>
                <div className="text-2xl font-light text-slate-950">Lab certified</div>
                <p className="text-slate-500">Natural stones only</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-slate-200/50 via-transparent to-amber-100/60 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <img
                src="/images/pyrite_cluster.png"
                alt="Golden Meraki hero crystal"
                className="h-[24rem] w-full object-cover sm:h-[30rem]"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-3xl border border-white/70 bg-white/85 p-4 backdrop-blur-md">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Featured Collection</div>
                <div className="mt-1 text-lg font-medium text-slate-950">Pyrite, Amethyst, and effortless everyday ritual.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

