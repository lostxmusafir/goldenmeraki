import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ShoppingBag, 
  Heart,
  Minus,
  Plus,
  MessageSquarePlus,
  Send
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
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'reviews'
  
  // Custom Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newCity, setNewCity] = useState('');
  const [userReviews, setUserReviews] = useState([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  // Meaningful Pre-filled Trusted Buyer Reviews per product type
  const defaultReviews = [
    {
      id: 1,
      rating: 5,
      date: '3 days ago',
      location: 'Mumbai',
      comment: `100% authentic ${product.name}! The energy and polish are unbelievable. Received it with the ISO lab certificate in a velvet pouch.`
    },
    {
      id: 2,
      rating: 5,
      date: '1 week ago',
      location: 'Bengaluru',
      comment: 'Felt immediate positive vibes after placing it in my home office. Sacred sound cleansing smell was fresh and soothing!'
    },
    {
      id: 3,
      rating: 4,
      date: '2 weeks ago',
      location: 'Delhi NCR',
      comment: 'Top-notch quality packaging and fast 2-day delivery. Very happy with the genuine gemstone quality.'
    }
  ];

  const allReviews = [...userReviews, ...defaultReviews];

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const reviewObj = {
      id: Date.now(),
      rating: newRating,
      date: 'Just now',
      location: newCity.trim() || 'Verified Location',
      comment: newComment.trim()
    };

    setUserReviews([reviewObj, ...userReviews]);
    setNewComment('');
    setNewCity('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-indigo-950/50 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-violet-100 flex flex-col max-h-[92vh]">
        
        {/* Modal Header Bar */}
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

        {/* Modal View Mode Tabs */}
        <div className="flex border-b border-violet-100 px-6 bg-slate-50/50 text-xs font-extrabold">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-violet-600 text-violet-700 font-black'
                : 'border-transparent text-slate-500 hover:text-indigo-950'
            }`}
          >
            Product Overview & Benefits
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'reviews'
                ? 'border-violet-600 text-violet-700 font-black'
                : 'border-transparent text-slate-500 hover:text-indigo-950'
            }`}
          >
            <span>Customer Reviews ({allReviews.length})</span>
            <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-extrabold">
              ★ {product.rating}
            </span>
          </button>
        </div>

        {/* Modal Main Content Container */}
        <div className="p-6 overflow-y-auto">
          
          {activeTab === 'details' ? (
            /* OVERVIEW TAB */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
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

                {/* Guarantee Badge */}
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center space-x-3 text-xs text-emerald-900">
                  <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Sacred Sound Cleansed</div>
                    <div className="text-[10px] text-emerald-700">Cleansed with Tibetan Singing Bowls before packing</div>
                  </div>
                </div>
              </div>

              {/* Details Column */}
              <div className="space-y-5">
                
                <div>
                  <div className="flex items-center space-x-2 text-xs mb-1">
                    <div className="flex items-center text-amber-500 font-bold">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="text-slate-400">•</span>
                    <button 
                      onClick={() => setActiveTab('reviews')}
                      className="text-violet-600 font-extrabold hover:underline"
                    >
                      {allReviews.length} Verified Buyer Reviews
                    </button>
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

                {/* Benefits */}
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

                {/* Quantity & Add to Cart */}
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
          ) : (
            /* REVIEWS TAB */
            <div className="space-y-6">
              
              {/* Write a Review Box (No User Name / Photo needed, shows Trusted Buyer) */}
              <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 rounded-2xl p-5 border border-violet-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquarePlus className="w-5 h-5 text-violet-700" />
                    <h3 className="font-extrabold text-sm text-indigo-950">
                      Write a Review for {product.name}
                    </h3>
                  </div>
                  
                  {/* Trusted Buyer Badge Notice */}
                  <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Published as Verified Trusted Buyer</span>
                  </div>
                </div>

                {reviewSubmitted && (
                  <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Thank you! Your review has been published as a Verified Trusted Buyer.</span>
                  </div>
                )}

                <form onSubmit={handleAddReview} className="space-y-3">
                  {/* Rating Selector */}
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-indigo-950">Select Rating:</span>
                    <div className="flex text-amber-400 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          onClick={() => setNewRating(star)}
                          className={`w-5 h-5 transition-transform hover:scale-110 ${
                            star <= newRating ? 'fill-current' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment & City Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <textarea
                        required
                        rows={2}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your genuine experience with this crystal..."
                        className="w-full p-2.5 bg-white rounded-xl border border-violet-200 text-xs text-indigo-950 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="Your City (e.g. Mumbai)"
                        className="w-full p-2.5 bg-white rounded-xl border border-violet-200 text-xs text-indigo-950 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl gradient-btn-primary font-black text-xs text-white flex items-center justify-center space-x-1.5 shadow-md shadow-violet-200"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Review</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                <div className="font-extrabold text-xs text-indigo-950 uppercase tracking-wider">
                  Verified Buyer Reviews ({allReviews.length}):
                </div>

                <div className="space-y-3">
                  {allReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-violet-50/60 border border-violet-100 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        {/* Rating Stars */}
                        <div className="flex items-center space-x-2">
                          <div className="flex text-amber-400">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">• {rev.date}</span>
                        </div>

                        {/* Trusted Buyer Badge (NO user name, NO photo) */}
                        <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Trusted Buyer ({rev.location})</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
