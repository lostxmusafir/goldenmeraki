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
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ChevronDown,
  ChevronUp
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
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'reviews'
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  
  // Custom Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newCity, setNewCity] = useState('');
  const [userReviews, setUserReviews] = useState([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [
    product.image,
    '/images/pyrite_cluster.png',
    '/images/rose_quartz_chunk.png',
    '/images/amethyst_geode_slice.png'
  ];

  // Weight & Specification Options (Matching reference image)
  const weights = product.weights || ['5.25gm', '5.6gm', '6.80gm', '7.25gm'];
  const sku = product.sku || `GM-${(product.name || 'CR').replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase()}-${product.price}`;
  const stoneType = product.stone || product.name.split(' ')[0] || 'Gemstone';
  const categoryName = product.subCategory || product.category || 'Clusters';
  const tags = product.tags || ['Emotional Balance', 'Mental Clarity', 'Positivity', 'Spiritual Awareness', 'Spiritual Growth'];

  // Bulleted Healing Benefits (Matching reference image)
  const benefits = product.benefits || [
    `Promotes mental clarity, wisdom, and intuitive insight associated with ${stoneType}.`,
    'Encourages emotional balance, aura harmony, and inner peace.',
    'Supports meditation, mindfulness, and deep spiritual growth.',
    'Believed to enhance focus, creative thinking, and self-awareness.',
    'Ideal for Feng Shui, home décor, office desks, and crystal collections.',
    'Brings calming, uplifting energy while adding a striking natural beauty to any space.'
  ];

  // Care Tips (Matching reference image)
  const careTips = [
    'Clean gently with a soft, dry cloth to remove dust.',
    'Avoid prolonged exposure to water, perfumes, and harsh chemicals.',
    'Place in a safe location to protect the delicate crystal formations.'
  ];

  // Meaningful Pre-filled Trusted Buyer Reviews per product type
  const defaultReviews = [
    {
      id: 1,
      rating: 5,
      date: '3 days ago',
      location: 'Mumbai',
      comment: `100% authentic ${product.name}! The energy and natural druzy formation are unbelievable. Received it with lab certification in velvet pouch.`
    },
    {
      id: 2,
      rating: 5,
      date: '1 week ago',
      location: 'Bengaluru',
      comment: 'Felt immediate positive energy after placing it on my desk. Tibetan singing bowl sound cleansed before dispatch.'
    },
    {
      id: 3,
      rating: 4,
      date: '2 weeks ago',
      location: 'Delhi NCR',
      comment: 'Top-notch packaging and fast 2-day delivery. Very happy with the genuine crystal quality.'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[94vh]">
        
        {/* Modal Top Navigation Bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
              {product.certificate || 'ISO Certified Natural Gemstone'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal View Tabs (Overview & Reviews) */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/50 text-xs font-bold">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-2.5 px-4 border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-violet-700 text-violet-800 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Product Details & Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-2.5 px-4 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'reviews'
                ? 'border-violet-700 text-violet-800 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Verified Reviews ({allReviews.length})</span>
            <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-black">
              ★ {product.rating}
            </span>
          </button>
        </div>

        {/* Modal Scrollable Content Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {activeTab === 'details' ? (
            <div className="space-y-8">
              
              {/* TOP SECTION: Gallery & Primary Buy Controls (Exact Match to Reference Screenshot) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                
                {/* Product Image Gallery */}
                <div className="space-y-3">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-inner group">
                    <img
                      src={images[activeImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm text-slate-600">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md transition-all ${
                        isWishlisted ? 'bg-pink-500 text-white' : 'bg-white text-slate-600 hover:text-pink-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Horizontal Thumbnail Gallery with Nav Arrows */}
                  <div className="flex items-center space-x-2 justify-center">
                    <button 
                      onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                      className="p-1 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex space-x-2 overflow-x-auto py-1">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                            activeImageIndex === idx 
                              ? 'border-rose-500 ring-2 ring-rose-200 scale-105' 
                              : 'border-slate-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>

                    <button 
                      onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                      className="p-1 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Product Form & Overview (Exact Reference Layout) */}
                <div className="space-y-4">
                  
                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading leading-tight tracking-tight">
                    {product.name}
                  </h1>

                  {/* E-Commerce Price Block: Actual Discounted Price + MRP Strikethrough + OFF Badge */}
                  <div className="flex items-center flex-wrap gap-3 py-1">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      ₹{product.price.toLocaleString()}
                    </span>

                    <div className="flex flex-col text-xs">
                      <span className="text-slate-400 font-medium line-through">
                        MRP: ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        Save ₹{(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </div>

                    {product.originalPrice > product.price && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-black border border-emerald-300">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Weight / Variant Chips Selection */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold text-slate-800">
                      Weight:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {weights.map((wt, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedWeight(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-extrabold border transition-all ${
                            selectedWeight === idx
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                          }`}
                        >
                          {wt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Stepper & ADD TO CART Button */}
                  <div className="flex items-center space-x-3 pt-2">
                    <div className="flex items-center border border-slate-300 rounded-lg p-1 bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 rounded text-slate-600 hover:bg-slate-100"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="px-3 text-xs font-extrabold text-slate-900">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1 rounded text-slate-600 hover:bg-slate-100"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        for (let i = 0; i < quantity; i++) {
                          onAddToCart(product);
                        }
                        onClose();
                      }}
                      className="flex-1 py-3 px-6 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center space-x-2 uppercase tracking-wider transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO CART</span>
                    </button>
                  </div>

                  {/* Short Overview Paragraph */}
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    The <strong className="text-slate-900">{product.name}</strong> is a captivating natural crystal admired for its vibrant color and sparkling druzy surface. Known as the stone of wisdom and intuition, {stoneType} is believed to enhance mental clarity, spiritual awareness, and emotional balance while encouraging inner growth and creative thinking.
                  </p>

                  <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex space-x-2">
                      <span className="font-bold text-slate-900 min-w-[70px]">SKU:</span>
                      <span className="text-slate-500">{sku}</span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="font-bold text-slate-900 min-w-[70px]">Category:</span>
                      <span className="text-slate-700 font-semibold">{categoryName}</span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="font-bold text-slate-900 min-w-[70px]">Tags:</span>
                      <span className="text-slate-600">{tags.join(', ')}</span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="font-bold text-slate-900 min-w-[70px]">Stone:</span>
                      <span className="text-slate-800 font-bold">{stoneType}</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* BOTTOM SECTION: Expandable Description, Benefits, Care & Notes (Matching Reference Screenshot) */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                
                {/* Accordion Header */}
                <button
                  onClick={() => setDescriptionOpen(!descriptionOpen)}
                  className="w-full px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
                >
                  <span className="font-extrabold text-xs text-rose-600 uppercase tracking-widest">
                    DESCRIPTION
                  </span>
                  {descriptionOpen ? <ChevronUp className="w-4 h-4 text-rose-600" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {descriptionOpen && (
                  <div className="p-6 space-y-6 text-xs text-slate-700 leading-relaxed animate-in fade-in">
                    
                    {/* Paragraph Intro */}
                    <p>
                      The <strong className="text-slate-900">{product.name}</strong> is a stunning natural crystal admired for its rich deep hues and sparkling druzy formations. Known as a stone of wisdom, intuition, and spiritual insight, {stoneType} is believed to enhance mental clarity, inner awareness, and emotional balance.
                    </p>

                    {/* Benefits Section */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900">Benefits:</h4>
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                        {benefits.map((benefit, bIdx) => (
                          <li key={bIdx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Please Note Section */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <h4 className="font-bold text-slate-900">Please Note:</h4>
                      <p className="text-slate-600">
                        You will receive one <strong className="text-slate-800">{product.name}</strong> similar to the ones photographed. Photos show typical quality. Every crystal is unique. Color, size, shape, and natural druzy formations may vary slightly due to the natural characteristics of the stone.
                      </p>
                    </div>

                    {/* Crystal Care Tips */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <h4 className="font-bold text-slate-900">Crystal Care Tips:</h4>
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                        {careTips.map((tip, cIdx) => (
                          <li key={cIdx}>{tip}</li>
                        ))}
                      </ul>
                    </div>

                  </div>
                )}

              </div>

            </div>
          ) : (
            /* REVIEWS TAB */
            <div className="space-y-6">
              
              {/* Write a Review Form */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquarePlus className="w-5 h-5 text-violet-700" />
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Write a Review for {product.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Trusted Buyer</span>
                  </div>
                </div>

                {reviewSubmitted && (
                  <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Thank you! Your review has been published as a Verified Trusted Buyer.</span>
                  </div>
                )}

                <form onSubmit={handleAddReview} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star className={`w-5 h-5 ${star <= newRating ? 'text-amber-400 fill-current' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Your City (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai, Bengaluru"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Experience / Review</label>
                    <textarea
                      rows={3}
                      placeholder="Share details about energy quality, packaging, and experience..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {allReviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="font-extrabold text-xs text-slate-900">Verified Buyer</span>
                        <span className="text-[10px] text-slate-400">• {rev.location}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
