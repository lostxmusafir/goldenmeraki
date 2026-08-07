import { ShieldCheck, Truck, Gift, Leaf } from 'lucide-react';

const POINTS = [
  {
    icon: ShieldCheck,
    title: 'Certified natural stones',
    description: 'Each piece is curated with authenticity and clarity in mind.'
  },
  {
    icon: Truck,
    title: 'Fast, reliable dispatch',
    description: 'A premium delivery experience with thoughtful packaging.'
  },
  {
    icon: Gift,
    title: 'Refined gifting ready',
    description: 'Minimal presentation designed to feel elevated from the start.'
  },
  {
    icon: Leaf,
    title: 'Mindful curation',
    description: 'A smaller, clearer assortment with less visual noise.'
  }
] as const;

export function WhyChooseUs() {
  return (
    <section className="bg-slate-950 py-10 sm:py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Why choose us</p>
          <h2 className="mt-2 text-2xl font-light tracking-tight sm:text-3xl">A quieter, more trustworthy shopping experience.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <article key={point.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <Icon className="h-5 w-5 text-amber-300" />
                <h3 className="mt-4 text-base font-medium">{point.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{point.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

