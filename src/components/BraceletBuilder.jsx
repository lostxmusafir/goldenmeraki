import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, ShoppingBag, X, Check } from 'lucide-react';
import { CUSTOM_BEADS } from '../data/products';

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
    if (selectedBeads.length >= 24) return; // max 24 beads for 8" wrist
    setSelectedBeads([...selectedBeads, bead]);
  };

  const removeBead = (index) => {
    setSelectedBeads(selectedBeads.filter((_, i) => i !== index));
  };

  const clearString = () => {
    setSelectedBeads([]);
  };

  // Base craftsmanship price + price of chosen gemstone beads
  const beadsSubtotal = selectedBeads.reduce((acc, b) => acc + b.pricePerBead, 0);
  const totalPrice = selectedBeads.length > 0 ? 499 + beadsSubtotal : 0;

  // Energy Harmony calculation
  const uniqueIntents = new Set(selectedBeads.map(b => b.energy)).size;
  const energyScore = selectedBeads.length > 0 ? Math.min(100, 70 + uniqueIntents * 6) : 0;

  const handleAddToCart = () => {
    if (selectedBeads.length === 0) return;

    const customProduct = {
      id: `custom-bracelet-${Date.now()}`,
      name: `Bespoke Intention Bracelet (${selectedBeads.length} Genuine Gemstone Beads)`,
      category: 'bracelets',
      price: totalPrice,
      originalPrice: totalPrice + 500,
      rating: 5.0,
      reviewsCount: 1,
      image: selectedBeads[0]?.image || '/images/seven_chakra_bracelet.png',
      certificate: 'Custom Hand-Strung ISO Certified Natural Stones',
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
                Interactive Custom Bracelet Studio
              </h3>
              <span className="text-[10px] text-amber-200 font-medium">100% Real Certified Gemstone Beads</span>
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
          
          {/* Visual Real Stone String Canvas Renderer */}
          <div className="bg-white rounded-2xl p-6 border-2 border-violet-200 shadow-sm text-center space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Strung Real Gemstones ({selectedBeads.length}/24 Beads)</span>
              <span>Wrist Size: {wristSize} Inches</span>
            </div>

            {/* 3D Real Stone Beads String */}
            <div className="min-h-28 bg-gradient-to-b from-slate-50 to-violet-50 rounded-2xl p-4 border border-dashed border-violet-300 flex items-center justify-center gap-2 flex-wrap shadow-inner relative">
              
              {/* String Thread Line */}
              {selectedBeads.length > 0 && (
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-amber-400 via-violet-400 to-cyan-400 z-0 opacity-40"></div>
              )}

              {selectedBeads.length > 0 ? (
                selectedBeads.map((bead, idx) => (
                  <div
                    key={idx}
                    onClick={() => removeBead(idx)}
                    className="group relative cursor-pointer z-10"
                    title={`Click to remove ${bead.name}`}
                  >
                    {/* Real 3D Spherical Gemstone Bead Graphics */}
                    <div className="relative w-10 h-10 rounded-full shadow-lg border-2 border-white ring-2 ring-violet-200/60 transition-transform group-hover:scale-130 group-hover:rotate-12 overflow-hidden bg-slate-100 flex items-center justify-center">
                      <img
                        src={bead.image}
                        alt={bead.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                      {/* Realistic Glossy Spherical Highlight Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/60 pointer-events-none rounded-full"></div>
                    </div>

                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-indigo-950 text-white text-[9px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                      Remove {bead.name.split(' ')[0]}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 font-semibold py-6 z-10">
                  Tap real gemstone beads below to string your custom aura bracelet!
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

          {/* Real Stone Bead Selection Palette */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                Select Real Gemstone Beads to Add:
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                100% Lab Certified Natural Origin
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CUSTOM_BEADS.map((bead) => (
                <button
                  key={bead.id}
                  onClick={() => addBead(bead)}
                  className="p-2.5 rounded-2xl bg-white border border-violet-200 hover:border-violet-400 hover:shadow-md transition-all text-left flex items-center space-x-3 group"
                >
                  {/* Real Gemstone Bead Thumbnail */}
                  <div className="relative w-10 h-10 rounded-full shadow-md border border-white ring-1 ring-violet-200 overflow-hidden flex-shrink-0 bg-slate-100">
                    <img
                      src={bead.image}
                      alt={bead.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/50 pointer-events-none rounded-full"></div>
                    <div className="absolute bottom-0 right-0 bg-violet-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                      +
                    </div>
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
            <span>Add Custom Real Stone Bracelet to Cart</span>
          </button>
        </div>

      </div>
    </div>
  );
};
