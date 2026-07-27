import React from 'react';
import { Star, ShieldCheck, Quote, Truck, Banknote, Award } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection = () => {
  return (
    <section className="py-14 bg-white border-b border-violet-100 space-y-12">
      
      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 font-heading tracking-tight">
            Testimonials
          </h2>
          <div className="w-16 h-1 bg-violet-600 mx-auto mt-2 rounded-full"></div>
          <p className="text-xs text-slate-500 mt-2 font-medium">What our customers say about us</p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#fdfbf7] rounded-3xl p-6 border border-amber-100 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-violet-300" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-amber-100 mt-4 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-xs text-indigo-950 flex items-center space-x-1">
                    <span>{rev.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[10px] text-slate-400">{rev.city} • {rev.date}</div>
                </div>

                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Trust Columns (Matching Shubhanjali screenshot format) */}
      <div className="bg-[#fdfbf7] py-10 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          {/* Column 1: Express Delivery */}
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center mx-auto shadow-sm">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-sm text-indigo-950 uppercase tracking-wider">
              EXPRESS DELIVERY
            </h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              We prioritize speed and safety for all orders across India with free shipping above ₹999.
            </p>
          </div>

          {/* Column 2: Cash On Delivery */}
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <Banknote className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-sm text-indigo-950 uppercase tracking-wider">
              CASH ON DELIVERY
            </h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Contactless cash on delivery available for all pincodes in India.
            </p>
          </div>

          {/* Column 3: Over 5000+ Products */}
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-sm text-indigo-950 uppercase tracking-wider">
              OVER 5000+ PRODUCTS
            </h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              India's largest collection of lab-certified natural crystals & spiritual articles.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
};
