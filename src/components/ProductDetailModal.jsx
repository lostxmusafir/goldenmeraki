import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ShoppingBag, 
  Heart,
  Truck,
  RotateCcw,
  Minus,
  Plus
} from 'lucide-react';

export const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart,
  wishlist,
  onToggleWishlist
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/40 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-violet-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-3.5 bg-violet-50 border-b border-violet-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
              {product.certificate}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-violet-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-violet-50 border border-violet-100 shadow-inner">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md transition-all ${
                  isWishlisted ? 'bg-pink-500 text-white' : 'bg-white text-slate-600 hover:text-pink-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex space-x-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-violet-600 scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantee Badge */}
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center space-x-3 text-xs text-emerald-900">
              <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <div className="font-bold">Sacred Sound Cleansed</div>
                <div className="text-[10px] text-emerald-700">Cleansed with Tibetan Singing Bowls before packing</div>
              </div>
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="space-y-5">
            
            <div>
              <div className="flex items-center space-x-2 text-xs mb-1">
                <div className="flex items-center text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-medium">{product.reviewsCount} Customer Reviews</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-indigo-950 leading-tight">
                {product.name}
              </h2>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-extrabold text-indigo-950">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">
                Save ₹{(product.originalPrice - product.price).toLocaleString()}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Benefits Checklist */}
            {product.benefits && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                  Key Healing Benefits:
                </div>
                <div className="space-y-1.5">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Table */}
            {product.specifications && (
              <div className="bg-violet-50/70 rounded-2xl p-3 border border-violet-100 text-xs space-y-1">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-violet-100/60 last:border-0">
                    <span className="capitalize text-slate-500">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-bold text-indigo-950">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector & Action Button */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold text-indigo-950">Quantity:</span>
                <div className="flex items-center space-x-2 bg-violet-100 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 rounded-lg bg-white text-indigo-950 shadow-sm hover:bg-violet-50"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-indigo-950">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 rounded-lg bg-white text-indigo-950 shadow-sm hover:bg-violet-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    onAddToCart(product);
                  }
                  onClose();
                }}
                className="w-full py-3.5 rounded-2xl gradient-btn-primary font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-violet-200"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>Add {quantity} to Cart • ₹{(product.price * quantity).toLocaleString()}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
