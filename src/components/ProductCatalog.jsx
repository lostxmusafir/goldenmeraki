import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Heart, 
  Eye, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  SlidersHorizontal,
  ArrowUpDown,
  Zap,
  Check
} from 'lucide-react';
import { CATEGORIES, INTENTIONS, PRODUCTS } from '../data/products';

export const ProductCatalog = ({ 
  selectedCategory, 
  setSelectedCategory,
  searchTerm,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onBuyNow
}) => {
  const [selectedIntention, setSelectedIntention] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(4000);

  // Filtered & Sorted Product Pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      
      // Intention filter
      if (selectedIntention !== 'all' && product.intention !== selectedIntention) return false;
      
      // Search filter
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      // Max price filter
      if (product.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured order
    });
  }, [selectedCategory, selectedIntention, searchTerm, maxPrice, sortBy]);

  return (
    <section id="catalog-section" className="py-12 bg-violet-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-extrabold text-violet-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Certified Natural Gemstone Store</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-indigo-950 font-heading">
              Explore Healing Crystals & Jewelry
            </h2>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center space-x-2 self-start md:self-auto">
            <span className="text-xs font-bold text-slate-500 flex items-center space-x-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort By:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-violet-200 text-xs font-bold text-indigo-950 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
            >
              <option value="featured">Featured / Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-violet-100 shadow-sm mb-8 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-violet-700 text-white border-violet-700 shadow-sm'
                    : 'bg-violet-50/70 text-indigo-950 border-violet-100 hover:bg-violet-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Intention Pills & Price Range */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-violet-100 text-xs">
            
            {/* Intention Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
              <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">Intention:</span>
              <button
                onClick={() => setSelectedIntention('all')}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  selectedIntention === 'all'
                    ? 'bg-indigo-950 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {INTENTIONS.map(int => (
                <button
                  key={int.id}
                  onClick={() => setSelectedIntention(int.id)}
                  className={`px-3 py-1 rounded-full font-bold transition-all border ${
                    selectedIntention === int.id
                      ? `${int.color} ring-1 ring-violet-400`
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {int.label}
                </button>
              ))}
            </div>

            {/* Price Range Slider */}
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <span className="font-extrabold text-slate-400 text-[10px] uppercase">Max Price:</span>
              <input
                type="range"
                min="500"
                max="4000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-violet-600 cursor-pointer"
              />
              <span className="font-extrabold text-indigo-950 min-w-16">
                ₹{maxPrice.toLocaleString()}
              </span>
            </div>

          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const discountPercent = Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) * 100
              );

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-violet-100 shadow-sm hover:shadow-xl hover:border-violet-300 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-violet-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {product.badge && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-400 text-indigo-950 font-black text-[10px] shadow-sm uppercase">
                          {product.badge}
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[10px] shadow-sm">
                        {discountPercent}% OFF
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2.5 rounded-full transition-all shadow-md z-10 ${
                        isWishlisted
                          ? 'bg-pink-500 text-white'
                          : 'bg-white/90 backdrop-blur-md text-slate-600 hover:text-pink-500 hover:bg-white'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* Hover Quick Action Overlay */}
                    <div className="absolute inset-0 bg-indigo-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onQuickView(product)}
                        className="px-4 py-2 rounded-xl bg-white text-indigo-950 text-xs font-extrabold flex items-center space-x-1.5 shadow-lg hover:bg-violet-50 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-violet-600" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    
                    <div>
                      {/* Rating & Lab Authenticity */}
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center space-x-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{product.rating}</span>
                          <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Certified
                        </span>
                      </div>

                      {/* Product Title */}
                      <h3 
                        onClick={() => onQuickView(product)}
                        className="font-extrabold text-sm text-indigo-950 group-hover:text-violet-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
                      >
                        {product.name}
                      </h3>
                    </div>

                    {/* Stock Alert */}
                    <div className="text-[10px] text-amber-700 font-bold flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-amber-500 fill-current" />
                      <span>Limited Stock • Only 4 units left</span>
                    </div>

                    {/* Pricing & High Conversion E-Commerce Action Buttons */}
                    <div className="pt-2 border-t border-violet-100 space-y-2">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-lg font-black text-indigo-950">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="py-2 px-3 rounded-xl bg-violet-100 text-violet-900 font-bold text-xs hover:bg-violet-200 transition-colors flex items-center justify-center space-x-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add Bag</span>
                        </button>

                        <button
                          onClick={() => onBuyNow(product)}
                          className="py-2 px-3 rounded-xl gradient-btn-emerald text-white font-extrabold text-xs shadow-sm flex items-center justify-center space-x-1"
                        >
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-violet-100 max-w-lg mx-auto space-y-3">
            <Sparkles className="w-12 h-12 text-violet-400 mx-auto animate-pulse" />
            <h3 className="text-lg font-bold text-indigo-950">No Crystals Match Your Filter</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your price range, clearing search terms, or resetting category selections.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedIntention('all');
                setMaxPrice(4000);
              }}
              className="px-4 py-2 rounded-xl bg-violet-700 text-white font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
