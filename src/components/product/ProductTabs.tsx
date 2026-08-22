import type { Product } from '../../types/product';
import { useState } from 'react';
import { ShieldCheck, Sparkles, HelpCircle, FileText } from 'lucide-react';

export interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'care' | 'faq'>('description');

  const categoryName = typeof product.category === 'string' ? product.category : (product.category as any)?.name || 'Crystal';

  return (
    <div className="space-y-4">
      {/* Tab Navigation Buttons */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('description')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
            activeTab === 'description'
              ? 'bg-slate-900 text-white shadow-sm dark:bg-amber-500 dark:text-slate-950'
              : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Product Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
            activeTab === 'details'
              ? 'bg-slate-900 text-white shadow-sm dark:bg-amber-500 dark:text-slate-950'
              : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>Crystal Intentions & Chakra</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('care')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
            activeTab === 'care'
              ? 'bg-slate-900 text-white shadow-sm dark:bg-amber-500 dark:text-slate-950'
              : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Authenticity & Care</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('faq')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
            activeTab === 'faq'
              ? 'bg-slate-900 text-white shadow-sm dark:bg-amber-500 dark:text-slate-950'
              : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="h-4 w-4 text-blue-500" />
          <span>FAQs</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        {activeTab === 'description' && (
          <article className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900 dark:text-slate-100">
              About {product.name}
            </h2>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{product.description}</p>
          </article>
        )}

        {activeTab === 'details' && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900 dark:text-slate-100">
              Crystal Properties & Energetic Intentions
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Primary Category</span>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{categoryName}</p>
              </div>

              {product.intention ? (
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Primary Intention</span>
                  <p className="mt-1 text-sm font-semibold text-amber-700 capitalize dark:text-amber-400">{product.intention}</p>
                </div>
              ) : null}

              {product.chakra ? (
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Chakra Alignment</span>
                  <p className="mt-1 text-sm font-semibold text-indigo-700 capitalize dark:text-indigo-400">{product.chakra} Chakra</p>
                </div>
              ) : null}

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Quality Guarantee</span>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">100% Certified Natural Gemstone</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900 dark:text-slate-100">
              Cleansing & Care Instructions
            </h2>
            <ul className="space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✦</span>
                <span><strong>Moonlight Cleansing:</strong> Place your {product.name} under full moonlight to cleanse and re-energize its natural vibrations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✦</span>
                <span><strong>Smudging:</strong> Pass the crystal through sage, palo santo, or incense smoke to remove stagnant energy.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✦</span>
                <span><strong>Handling:</strong> Handle natural raw clusters and gemstone beads with care. Keep away from harsh chemical cleaners.</span>
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">Is {product.name} 100% natural and authentic?</h3>
                <p className="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-400">
                  Yes, at Golden Meraki Gems all our crystals, raw clusters, gemstone bracelets, and malas are ethically sourced 100% natural stones.
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">How do I activate the intention for {product.name}?</h3>
                <p className="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-400">
                  Hold your {product.name} in both hands, close your eyes, take deep breaths, and mentally visualize your intention being infused into the crystal.
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">What are the available weight / size options?</h3>
                <p className="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-400">
                  {product.sizes && product.sizes.length > 0
                    ? `Available options: ${product.sizes.map((s) => s.size).join(', ')}.`
                    : 'Standard size available as listed above.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
