import { Link } from 'react-router-dom';

export function OfferBanner() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/category/raw-stones" className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm transition-transform hover:-translate-y-1">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="space-y-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">Featured offer</div>
                <h2 className="text-2xl font-light tracking-tight">A refined first look at our most loved stones.</h2>
                <p className="text-sm leading-6 text-slate-300">A clean edit of best sellers and ritual essentials selected for gifting and daily use.</p>
              </div>
              <img src="/images/fengshui_crystal_tree.png" alt="Featured collection" className="w-full rounded-3xl object-cover lg:w-[260px]" />
            </div>
          </Link>

          <Link to="/category/bracelets" className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8f7f2] p-6 shadow-sm transition-transform hover:-translate-y-1">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="space-y-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Just in</div>
                <h2 className="text-2xl font-light tracking-tight text-slate-950">Minimal bracelets. Modern energy. Elevated everyday wear.</h2>
                <p className="text-sm leading-6 text-slate-600">Designed to feel polished, understated, and effortlessly premium.</p>
              </div>
              <img src="/images/seven_chakra_bracelet.png" alt="Bracelets collection" className="w-full rounded-3xl object-cover lg:w-[260px]" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

