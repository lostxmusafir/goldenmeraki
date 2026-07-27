import React, { useState } from 'react';
import { Sparkles, Trash2, ShoppingBag, X } from 'lucide-react';
import { CUSTOM_BEADS } from '../data/products';

// Dedicated Vector SVG 3D Gemstone Bead Renderer
const GemstoneBeadSVG = ({ beadId, size = 40, className = "" }) => {
  switch (beadId) {
    case 'bead-pyrite':
      // Golden Metallic Pyrite Specular Sphere
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
          <defs>
            <radialGradient id="pyriteGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>
            <linearGradient id="pyriteFacet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="url(#pyriteGrad)" stroke="#fef08a" strokeWidth="1" />
          <polygon points="14,10 26,10 32,18 26,26 14,26 8,18" fill="url(#pyriteFacet)" opacity="0.35" />
          <ellipse cx="14" cy="12" rx="5" ry="3" fill="#ffffff" opacity="0.7" transform="rotate(-25 14 12)" />
          {/* String Hole */}
          <circle cx="20" cy="20" r="2" fill="#451a03" opacity="0.4" />
        </svg>
      );

    case 'bead-amethyst':
      // Deep Purple Amethyst Faceted Sphere
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
          <defs>
            <radialGradient id="amethystGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#e9d5ff" />
              <stop offset="40%" stopColor="#a855f7" />
              <stop offset="80%" stopColor="#6b21a8" />
              <stop offset="100%" stopColor="#3b0764" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="url(#amethystGrad)" stroke="#d8b4fe" strokeWidth="1" />
          <polygon points="20,6 28,12 28,24 20,32 12,24 12,12" fill="#ffffff" opacity="0.15" />
          <ellipse cx="13" cy="11" rx="4" ry="2.5" fill="#ffffff" opacity="0.75" transform="rotate(-30 13 11)" />
          <circle cx="20" cy="20" r="2" fill="#2e1065" opacity="0.4" />
        </svg>
      );

    case 'bead-rosequartz':
      // Translucent Pink Rose Quartz Soft Sphere
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
          <defs>
            <radialGradient id="roseGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fce7f3" />
              <stop offset="40%" stopColor="#f472b6" />
              <stop offset="80%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#831843" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="url(#roseGrad)" stroke="#fbcfe8" strokeWidth="1" />
          <path d="M12 14 Q20 8 28 14 Q20 22 12 14 Z" fill="#ffffff" opacity="0.25" />
          <ellipse cx="14" cy="11" rx="5" ry="3" fill="#ffffff" opacity="0.8" transform="rotate(-20 14 11)" />
          <circle cx="20" cy="20" r="2" fill="#500724" opacity="0.3" />
        </svg>
      );

    case 'bead-aventurine':
      // Jade Green Aventurine Gemstone Sphere
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
          <defs>
            <radialGradient id="aventurineGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="40%" stopColor="#10b981" />
              <stop offset="80%" stopColor="#047857" />
              <stop offset="100%" stopColor="#064e3b" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="url(#aventurineGrad)" stroke="#6ee7b7" strokeWidth="1" />
          <polygon points="18,8 26,14 22,28 12,24" fill="#ffffff" opacity="0.2" />
          <ellipse cx="14" cy="11" rx="4" ry="2.5" fill="#ffffff" opacity="0.7" transform="rotate(-30 14 11)" />
          <circle cx="20" cy="20" r="2" fill="#022c22" opacity="0.4" />
        </svg>
      );

    case 'bead-lapis':
      // Ultramarine Blue Lapis Lazuli with Gold Pyrite Flecks
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
          <defs>
            <radialGradient id="lapisGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="40%" stopColor="#2563eb" />
              <stop offset="80%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="url(#lapisGrad)" stroke="#bfdbfe" strokeWidth="1" />
          {/* Gold Specks */}
          <circle cx="15" cy="18" r="1" fill="#fef08a" />
          <circle cx="24" cy="14" r="1.2" fill="#fde047" />
          <circle cx="22" cy="24" r="0.8" fill="#fef08a" />
          <circle cx="12" cy="22" r="1.5" fill="#f59e0b" opacity="0.8" />
          <ellipse cx="13" cy="11" rx="4" ry="2.5" fill="#ffffff" opacity="0.65" transform="rotate(-30 13 11)" />
          <circle cx="20" cy="20" r="2" fill="#172554" opacity="0.5" />
        </svg>
      );

    case 'bead-citrine':
      // Solar Yellow Citrine Faceted Gemstone
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
          <defs>
            <radialGradient id="citrineGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#eab308" />
              <stop offset="80%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#713f12" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="url(#citrineGrad)" stroke="#fef08a" strokeWidth="1" />
          <polygon points="14,10 26,10 30,20 26,30 14,30 10,20" fill="#ffffff" opacity="0.25" />
          <ellipse cx="14" cy="11" rx="4.5" ry="2.5" fill="#ffffff" opacity="0.8" transform="rotate(-25 14 11)" />
          <circle cx="20" cy="20" r="2" fill="#451a03" opacity="0.4" />
        </svg>
      );

    case 'bead-tigereye':
      // Golden Brown Chatoyant Tiger Eye Sphere
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
          <defs>
            <linearGradient id="tigerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="25%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="75%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="url(#tigerGrad)" stroke="#fde047" strokeWidth="1" />
          <path d="M6 18 Q20 14 34 18 Q20 22 6 18 Z" fill="#fef08a" opacity="0.4" />
          <ellipse cx="14" cy="11" rx="4" ry="2" fill="#ffffff" opacity="0.7" transform="rotate(-20 14 11)" />
          <circle cx="20" cy="20" r="2" fill="#1c1917" opacity="0.5" />
        </svg>
      );

    case 'bead-clearquartz':
    default:
      // Iridescent Translucent Clear Quartz Faceted Sphere
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
          <defs>
            <radialGradient id="quartzGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#e0f2fe" />
              <stop offset="80%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="url(#quartzGrad)" stroke="#ffffff" strokeWidth="1.5" />
          <polygon points="20,6 30,14 26,28 14,28 10,14" fill="#ffffff" opacity="0.45" />
          <line x1="20" y1="6" x2="20" y2="34" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          <ellipse cx="14" cy="11" rx="5" ry="3" fill="#ffffff" opacity="0.9" transform="rotate(-20 14 11)" />
          <circle cx="20" cy="20" r="2" fill="#0c4a6e" opacity="0.3" />
        </svg>
      );
  }
};

export const BraceletBuilder = ({ isOpen, onClose, onAddCustomBracelet }) => {
  const [selectedBeads, setSelectedBeads] = useState([
    CUSTOM_BEADS[0], // Pyrite (Gold)
    CUSTOM_BEADS[1], // Amethyst (Purple)
    CUSTOM_BEADS[2], // Rose Quartz (Pink)
    CUSTOM_BEADS[3], // Green Aventurine (Green)
    CUSTOM_BEADS[4], // Lapis Lazuli (Blue)
    CUSTOM_BEADS[5]  // Citrine (Yellow)
  ]);
  const [wristSize, setWristSize] = useState('7.0');

  const addBead = (bead) => {
    if (selectedBeads.length >= 24) return;
    setSelectedBeads([...selectedBeads, bead]);
  };

  const removeBead = (index) => {
    setSelectedBeads(selectedBeads.filter((_, i) => i !== index));
  };

  const clearString = () => {
    setSelectedBeads([]);
  };

  const beadsSubtotal = selectedBeads.reduce((acc, b) => acc + b.pricePerBead, 0);
  const totalPrice = selectedBeads.length > 0 ? 499 + beadsSubtotal : 0;

  const uniqueIntents = new Set(selectedBeads.map(b => b.energy)).size;
  const energyScore = selectedBeads.length > 0 ? Math.min(100, 70 + uniqueIntents * 6) : 0;

  const handleAddToCart = () => {
    if (selectedBeads.length === 0) return;

    const customProduct = {
      id: `custom-bracelet-${Date.now()}`,
      name: `Bespoke Intention Bracelet (${selectedBeads.length} Gemstone Beads)`,
      category: 'bracelets',
      price: totalPrice,
      originalPrice: totalPrice + 500,
      rating: 5.0,
      reviewsCount: 1,
      image: '/images/seven_chakra_bracelet.png',
      certificate: 'Custom Hand-Strung ISO Certified Natural Vector Stones',
      description: `Bespoke custom intention bracelet hand-strung with ${selectedBeads.map(b => b.name).join(', ')}.`,
      isCustom: true
    };

    onAddCustomBracelet(customProduct);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/40 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-violet-100 flex flex-col max-h-[90vh]">
        
        {/* Studio Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-500 via-violet-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <div>
              <h3 className="font-luxury font-bold text-lg text-white leading-none">
                Interactive Custom Gemstone Studio
              </h3>
              <span className="text-[10px] text-amber-200 font-medium">Faceted 3D Vector Gemstone Beads</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Content Workspace */}
        <div className="p-6 overflow-y-auto space-y-6 bg-violet-50/50 flex-1">
          
          {/* Visual SVG Vector Gemstone String Canvas */}
          <div className="bg-white rounded-2xl p-6 border-2 border-violet-200 shadow-sm text-center space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Strung Gemstones ({selectedBeads.length}/24 Beads)</span>
              <span>Wrist Size: {wristSize} Inches</span>
            </div>

            {/* SVG Gemstone Beads String */}
            <div className="min-h-28 bg-gradient-to-b from-slate-50 to-violet-50 rounded-2xl p-4 border border-dashed border-violet-300 flex items-center justify-center gap-2 flex-wrap shadow-inner relative">
              
              {/* String Thread Line */}
              {selectedBeads.length > 0 && (
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-400 via-violet-400 to-cyan-400 z-0 opacity-40 rounded-full"></div>
              )}

              {selectedBeads.length > 0 ? (
                selectedBeads.map((bead, idx) => (
                  <div
                    key={idx}
                    onClick={() => removeBead(idx)}
                    className="group relative cursor-pointer z-10"
                    title={`Click to remove ${bead.name}`}
                  >
                    {/* SVG 3D Gemstone Bead */}
                    <div className="transition-transform group-hover:scale-130 group-hover:-translate-y-1 filter drop-shadow-md">
                      <GemstoneBeadSVG beadId={bead.id} size={42} />
                    </div>

                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-indigo-950 text-white text-[9px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                      Remove {bead.name.split(' ')[0]}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 font-semibold py-6 z-10">
                  Tap gemstone SVG beads below to string your custom aura bracelet!
                </div>
              )}
            </div>

            {/* Metrics & Clear Action */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-violet-100">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-600">Energy Alignment Score:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black">
                  {energyScore}%
                </span>
              </div>
              
              {selectedBeads.length > 0 && (
                <button
                  onClick={clearString}
                  className="text-slate-400 hover:text-red-500 transition-colors font-semibold flex items-center space-x-1 text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </div>

          {/* SVG Gemstone Selection Palette */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                Select Gemstone Vector Beads to Add:
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Pure Faceted Vector Graphics
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CUSTOM_BEADS.map((bead) => (
                <button
                  key={bead.id}
                  onClick={() => addBead(bead)}
                  className="p-2.5 rounded-2xl bg-white border border-violet-200 hover:border-violet-400 hover:shadow-md transition-all text-left flex items-center space-x-3 group"
                >
                  {/* SVG Gemstone Bead Icon */}
                  <div className="flex-shrink-0 group-hover:scale-110 transition-transform filter drop-shadow-sm">
                    <GemstoneBeadSVG beadId={bead.id} size={36} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs text-indigo-950 group-hover:text-violet-700 transition-colors truncate">
                      {bead.name}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-extrabold mt-0.5">
                      ₹{bead.pricePerBead}/bead
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Wrist Size Selector */}
          <div className="flex items-center space-x-4 bg-white p-3.5 rounded-2xl border border-violet-100 justify-between">
            <span className="text-xs font-bold text-indigo-950">Select Wrist Size:</span>
            <div className="flex space-x-2">
              {['6.5', '7.0', '7.5', '8.0'].map(size => (
                <button
                  key={size}
                  onClick={() => setWristSize(size)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    wristSize === size
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-violet-50 text-slate-600 hover:bg-violet-100'
                  }`}
                >
                  {size}"
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Studio Footer & Pricing Action */}
        <div className="px-6 py-4 bg-white border-t border-violet-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Price:</div>
            <div className="text-xl font-extrabold text-indigo-950">
              ₹{totalPrice.toLocaleString()}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={selectedBeads.length === 0}
            className={`px-6 py-3 rounded-2xl font-bold text-xs flex items-center space-x-2 transition-all shadow-md ${
              selectedBeads.length > 0
                ? 'gradient-btn-primary shadow-violet-200'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span>Add Custom Gemstone Bracelet to Cart</span>
          </button>
        </div>

      </div>
    </div>
  );
};
