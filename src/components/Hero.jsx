import React from 'react';
import { Sparkles, ArrowRight, Tag, Zap, Compass, ShieldCheck } from 'lucide-react';

export const Hero = ({ onExploreClick, onOpenQuiz, onOpenBuilder, onOpenCanvas }) => {
  return (
    <section className="bg-[#fdfbf7] pb-8 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main Full-Width Banner (Matching Shubhanjali Layout) */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-violet-100 bg-gradient-to-r from-amber-100/60 via-purple-100/40 to-violet-100/60 min-h-[340px] sm:min-h-[420px] flex items-center">
          
          {/* Background Decorative Art */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20"></div>

          {/* Banner Text Overlay */}
          <div className="relative z-10 p-6 sm:p-12 max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/90 border border-amber-300 text-amber-900 text-xs font-black tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
              <span>ISO 9001 Certified Natural Origin</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-indigo-950 font-heading leading-tight tracking-tight">
              Natural Healing Crystals <br />
              <span className="gradient-text-amethyst">Brilliance that Complements Every Style</span>
            </h1>

            <p className="text-xs sm:text-base text-slate-700 leading-relaxed font-medium">
              Explore 100% authentic gemstone bracelets, raw quartz clusters, Feng Shui trees, and bespoke energy jewelry crafted for prosperity, peace, and balance.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-full gradient-btn-primary text-xs font-extrabold shadow-lg shadow-violet-200 flex items-center space-x-2"
              >
                <span>Shop Collections</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBuilder}
                className="px-6 py-3.5 rounded-full bg-white text-indigo-950 border-2 border-amber-300 hover:bg-amber-50 text-xs font-extrabold shadow-sm flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Custom Bracelet Studio</span>
              </button>

              <button
                onClick={onOpenQuiz}
                className="px-5 py-3.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 text-xs font-extrabold flex items-center space-x-1.5"
              >
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Crystal Quiz</span>
              </button>
            </div>
          </div>

          {/* Right Banner Floating Crystal Image */}
          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-80 h-80 rounded-2xl overflow-hidden border-4 border-white shadow-2xl rotate-2">
            <img 
              src="/images/pyrite_cluster.png" 
              alt="Pyrite Crystal Cluster" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md rounded-xl p-2.5 text-center text-xs font-extrabold text-indigo-950 border border-violet-100">
              Natural Pyrite Wealth Cluster • Lab Certified
            </div>
          </div>

        </div>

        {/* Dual Promotional Offer Banners (Exact match to Shubhanjali layout screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Offer Banner 1 */}
          <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 rounded-2xl p-5 border border-amber-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider bg-amber-200 px-2 py-0.5 rounded">
                RETIREMENT SPECIAL
              </span>
              <h3 className="text-xl font-extrabold text-indigo-950">₹50 OFF Instant Coupon</h3>
              <p className="text-xs text-slate-600">Use Code: <strong className="text-amber-800">GOLDEN50</strong> on orders above ₹499</p>
            </div>
            <button 
              onClick={onExploreClick}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-indigo-950 font-black text-xs rounded-xl shadow-sm whitespace-nowrap"
            >
              SHOP NOW
            </button>
          </div>

          {/* Offer Banner 2 */}
          <div className="bg-gradient-to-r from-violet-100 via-purple-50 to-indigo-100 rounded-2xl p-5 border border-violet-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-violet-900 uppercase tracking-wider bg-violet-200 px-2 py-0.5 rounded">
                FESTIVE SALE
              </span>
              <h3 className="text-xl font-extrabold text-indigo-950">10% - 20% OFF Site-Wide</h3>
              <p className="text-xs text-slate-600">Applied automatically at checkout</p>
            </div>
            <button 
              onClick={onExploreClick}
              className="px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white font-black text-xs rounded-xl shadow-sm whitespace-nowrap"
            >
              EXPLORE ALL
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
