import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const freeShippingThreshold = 999;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'GOLDEN20' || couponCode.trim().toUpperCase() === 'AURA20') {
      setDiscountPercent(20);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try GOLDEN20 for 20% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-indigo-950/40 backdrop-blur-sm transition-opacity"
      />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-violet-100">
          
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <h3 className="font-luxury font-bold text-lg text-white">Your Shopping Cart</h3>
              <span className="bg-amber-400 text-indigo-950 font-extrabold text-xs px-2 py-0.5 rounded-full">
                {cartItems.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-violet-50 p-3.5 border-b border-violet-100 text-xs">
            {subtotal >= 999 ? (
              <div className="flex items-center space-x-1.5 text-emerald-700 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>🎉 Congratulations! You unlocked Free Expedited Shipping</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-indigo-950 font-semibold">
                  <span>Add ₹{(999 - subtotal).toLocaleString()} more for Free Shipping</span>
                  <span>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-violet-200 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-600 transition-all" style={{ width: `${freeShippingProgress}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Item List Workspace */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center space-x-3 bg-violet-50/50 p-3 rounded-2xl border border-violet-100"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-xl object-cover border border-violet-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-indigo-950 truncate">
                      {item.name}
                    </h4>
                    <div className="text-xs font-extrabold text-violet-700 mt-0.5">
                      ₹{item.price.toLocaleString()}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center space-x-1 bg-white rounded-lg p-0.5 border border-violet-200">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 text-slate-500 hover:text-indigo-950"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-indigo-950">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-slate-500 hover:text-indigo-950"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-violet-300 mx-auto animate-bounce" />
                <h4 className="font-bold text-indigo-950 text-sm">Your Cart is Empty</h4>
                <p className="text-xs text-slate-500">Explore natural crystals and add items to your cart.</p>
              </div>
            )}
          </div>

          {/* Cart Summary & Checkout Actions */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-violet-100 space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Promo Code (GOLDEN20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-violet-50 text-xs text-indigo-950 font-bold border border-violet-200 focus:outline-none focus:bg-white uppercase"
                  />
                  <Tag className="w-3.5 h-3.5 text-violet-500 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-violet-900 text-white font-bold text-xs hover:bg-violet-950"
                >
                  Apply
                </button>
              </form>

              {couponError && <div className="text-[11px] text-amber-600 font-semibold">{couponError}</div>}
              {couponApplied && <div className="text-[11px] text-emerald-600 font-semibold">✓ 20% Discount Applied!</div>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-violet-100">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-indigo-950">₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount (20% OFF):</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-bold text-indigo-950">
                    {shippingFee === 0 ? <span className="text-emerald-600">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-indigo-950 pt-2 border-t border-violet-100">
                  <span>Total Amount:</span>
                  <span className="text-violet-700">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 rounded-2xl gradient-btn-primary font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-violet-200"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
