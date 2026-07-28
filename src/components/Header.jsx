import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  ChevronDown,
  ShieldCheck,
  Compass,
  ChevronRight
} from 'lucide-react';
import { MASTER_TAXONOMY, PRODUCTS } from '../data/products';
import { GoldenMerakiLogo } from './GoldenMerakiLogo';

export const Header = ({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  searchTerm, 
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenQuiz,
  onOpenBuilder,
  onOpenCanvas,
  onSelectProduct
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState(MASTER_TAXONOMY[0]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [pincode, setPincode] = useState('400054');
  const [editingPincode, setEditingPincode] = useState(false);

  // Live Search Suggestions
  const searchResults = searchTerm.trim()
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-violet-100 shadow-sm">
      
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-[11px] font-semibold py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Certified Natural Healing Gemstones</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Deliver to: </span>
              {editingPincode ? (
                <input
                  type="text"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value)}
                  onBlur={() => setEditingPincode(false)}
                  className="w-16 px-1 py-0 bg-white text-indigo-950 rounded text-center font-bold text-xs"
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => setEditingPincode(true)}
                  className="font-bold underline text-amber-300 hover:text-white"
                >
                  {pincode} (Mumbai)
                </button>
              )}
            </div>

            <a href="tel:+919930000944" className="flex items-center space-x-1 hover:text-amber-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Support: <strong className="text-white">+91 99300 00944</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-indigo-950 hover:bg-violet-50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div 
              onClick={() => {
                setSelectedCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="cursor-pointer"
            >
              <GoldenMerakiLogo className="h-12 sm:h-16 md:h-20 lg:h-24 max-h-24" />
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden sm:block flex-1 max-w-lg mx-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Pyrite, 7 Chakra Bracelet, Amethyst..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-violet-50/70 border border-violet-200 text-xs text-indigo-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-violet-500 absolute left-3.5 top-3" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-indigo-950 bg-violet-100 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Search Suggestions */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-violet-100 overflow-hidden z-50 p-2 space-y-1 animate-in fade-in">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Matching Products ({searchResults.length})
                </div>
                {searchResults.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      setSearchTerm('');
                    }}
                    className="p-2 rounded-xl hover:bg-violet-50 cursor-pointer flex items-center space-x-3 transition-colors"
                  >
                    <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded-lg object-cover border border-violet-100" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-indigo-950 truncate">{prod.name}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">{prod.certificate}</div>
                    </div>
                    <div className="font-extrabold text-xs text-indigo-950">₹{prod.price.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            <button
              onClick={onOpenBuilder}
              className="hidden xl:flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-sm hover:shadow-md transition-all border border-amber-600/30 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Design Bracelet</span>
            </button>

            <button
              onClick={onOpenQuiz}
              className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all border border-slate-800 active:scale-95"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Crystal Finder</span>
            </button>

            <button
              onClick={onOpenWishlist}
              className="p-2.5 rounded-xl bg-violet-50 text-indigo-950 hover:bg-violet-100 hover:text-pink-600 transition-all relative border border-violet-100"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-pink-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-700 via-indigo-700 to-purple-800 hover:from-violet-600 hover:to-indigo-600 text-white font-extrabold text-xs shadow-md shadow-violet-200 transition-all border border-violet-600 group active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black hidden sm:inline">Bag</span>
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-lg shadow-sm">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 sm:hidden relative">
          <input
            type="text"
            placeholder="Search Pyrite, 7 Chakra Bracelet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-violet-50 border border-violet-200 text-xs text-indigo-950 placeholder-slate-400 focus:outline-none focus:bg-white"
          />
          <Search className="w-4 h-4 text-violet-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Main E-Commerce Mega-Navigation Bar */}
      <nav className="hidden lg:block bg-violet-50/80 border-t border-violet-100 text-xs font-bold text-indigo-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-1 py-1.5">
            
            {/* Mega Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-violet-700 text-white font-bold hover:bg-violet-800 transition-colors shadow-sm"
              >
                <span>ALL CATEGORIES & SUBCATEGORIES</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* Shubhanjali Mega Menu Panel */}
              {megaMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-[700px] bg-white rounded-2xl shadow-2xl border border-violet-100 overflow-hidden z-50 flex grid grid-cols-12 animate-in fade-in">
                  
                  {/* Left Column: Master Categories */}
                  <div className="col-span-5 bg-violet-50/70 p-3 space-y-1 border-r border-violet-100">
                    {MASTER_TAXONOMY.map(cat => (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveCategoryTab(cat)}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setMegaMenuOpen(false);
                          const elem = document.getElementById('catalog-section');
                          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                          activeCategoryTab.id === cat.id
                            ? 'bg-violet-700 text-white shadow-sm'
                            : 'text-indigo-950 hover:bg-violet-100'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    ))}
                  </div>

                  {/* Right Column: Subcategories */}
                  <div className="col-span-7 p-4 space-y-3 bg-white">
                    <div className="font-extrabold text-xs text-violet-700 uppercase tracking-wider pb-1 border-b border-violet-100">
                      {activeCategoryTab.name} Subcategories
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {activeCategoryTab.subcategories.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setSelectedCategory(activeCategoryTab.id);
                            setMegaMenuOpen(false);
                            const elem = document.getElementById('catalog-section');
                            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="p-2 rounded-xl text-left text-xs font-semibold text-indigo-950 hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center space-x-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                          <span className="truncate">{sub.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>

            <button
              onClick={() => {
                setSelectedCategory('bracelets');
                const elem = document.getElementById('catalog-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg hover:bg-violet-100 transition-colors"
            >
              Energy Bracelets
            </button>

            <button
              onClick={() => {
                setSelectedCategory('raw-stones');
                const elem = document.getElementById('catalog-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg hover:bg-violet-100 transition-colors"
            >
              Raw Crystals
            </button>

            <button
              onClick={() => {
                setSelectedCategory('trees-decor');
                const elem = document.getElementById('catalog-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg hover:bg-violet-100 transition-colors"
            >
              Feng Shui Trees
            </button>

            <button
              onClick={onOpenBuilder}
              className="px-3 py-1.5 rounded-lg text-amber-800 font-extrabold hover:bg-amber-100 transition-colors"
            >
              ✨ Custom Studio
            </button>
          </div>

          <div className="flex items-center space-x-2 text-emerald-800 text-xs font-extrabold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Certified Natural Gemstones</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-violet-100 p-4 space-y-4 animate-in slide-in-from-top-4">
          <div className="font-bold text-xs text-slate-400 uppercase tracking-wider">Golden Meraki Categories</div>
          
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {MASTER_TAXONOMY.map(cat => (
              <div key={cat.id} className="bg-violet-50/50 rounded-xl p-2.5 border border-violet-100 space-y-2">
                <button
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setMobileMenuOpen(false);
                    const elem = document.getElementById('catalog-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-extrabold text-xs text-indigo-950 w-full text-left"
                >
                  {cat.name}
                </button>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
                  {cat.subcategories.map(sub => (
                    <span key={sub.id} className="truncate">• {sub.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-violet-100 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuiz(); }}
              className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200"
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Crystal Finder Quiz</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBuilder(); }}
              className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Custom Bracelet Studio</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
