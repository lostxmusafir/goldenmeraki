import React from 'react';
import { CATEGORIES } from '../data/products';

export const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const topCategories = [
    { id: 'bracelets', name: 'BRACELET', count: '50+ Items', image: '/images/seven_chakra_bracelet.png' },
    { id: 'raw-stones', name: 'ROUGH/RAW STONE', count: '40+ Items', image: '/images/pyrite_cluster.png' },
    { id: 'raw-stones', name: 'ROSE QUARTZ', count: '30+ Items', image: '/images/rose_quartz_chunk.png' },
    { id: 'trees-decor', name: 'FENG SHUI TREE', count: '25+ Items', image: '/images/fengshui_crystal_tree.png' },
    { id: 'raw-stones', name: 'AMETHYST GEODE', count: '20+ Items', image: '/images/amethyst_geode_slice.png' },
    { id: 'face-wellness', name: 'GUA SHA & ROLLER', count: '15+ Items', image: '/images/rose_quartz_guasha.png' },
    { id: 'malas-jewelry', name: 'JAAP MALA', count: '35+ Items', image: '/images/amethyst_jaap_mala.png' },
    { id: 'malas-jewelry', name: 'SHREE YANTRA', count: '18+ Items', image: '/images/shree_yantra_pendant.png' }
  ];

  return (
    <section className="py-12 bg-white border-b border-violet-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Title (Matching Shubhanjali screenshot format) */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 font-heading tracking-tight">
            Top Categories
          </h2>
          <div className="w-16 h-1 bg-violet-600 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Categories Grid (4 Columns x 2 Rows) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {topCategories.map((cat, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const elem = document.getElementById('catalog-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-slate-50/60 rounded-2xl p-4 border border-slate-100 text-center transition-all duration-300 hover:border-violet-300 hover:shadow-md hover:bg-white flex flex-col items-center justify-between"
              >
                {/* Square Product Image */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-white mb-3 shadow-inner">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                {/* Category Title & Count */}
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-indigo-950 group-hover:text-violet-700 tracking-wider">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                    {cat.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
