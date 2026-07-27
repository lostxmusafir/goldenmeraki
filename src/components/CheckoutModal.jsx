import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, MapPin, Sparkles, MessageCircle } from 'lucide-react';

export const CheckoutModal = ({ isOpen, onClose, cartItems, onClearCart }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Ananya Roy',
    phone: '9876543210',
    email: 'ananya@example.com',
    pincode: '400054',
    address: '316 Kamla Spaces, S.V. Road, Santacruz West',
    city: 'Mumbai',
    state: 'Maharashtra',
    paymentMethod: 'upi'
  });
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const finalTotal = subtotal + shippingFee;

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleWhatsAppCheckout = () => {
    const generatedId = `GM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    // Format WhatsApp order message
    const itemsList = cartItems.map(item => 
      `• *${item.name}* (x${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = `*NEW ORDER - GOLDEN MERAKI* 💎
--------------------------------
*Order ID:* ${generatedId}

*Customer Details:*
• *Name:* ${formData.fullName}
• *Phone:* ${formData.phone}
• *Address:* ${formData.address}, ${formData.city} - ${formData.pincode}

*Order Items:*
${itemsList}

*Payment Summary:*
• *Subtotal:* ₹${subtotal.toLocaleString()}
• *Shipping:* ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
• *Total Payable:* ₹${finalTotal.toLocaleString()}
• *Preferred Payment:* ${formData.paymentMethod.toUpperCase()}

Please confirm my order and share payment link / QR!`;

    // Target Phone: 9173087595
    const whatsappUrl = `https://wa.me/919173087595?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Confetti & Step update
    setStep(3);
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/50 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-violet-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-amber-300" />
            <h3 className="font-luxury font-bold text-lg text-white">
              {step === 3 ? 'Order Sent on WhatsApp!' : 'WhatsApp Direct Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-violet-50/40 flex-1">
          
          {/* STEP 1: Shipping Address Form */}
          {step === 1 && (
            <form onSubmit={handleSubmitShipping} className="space-y-4 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-950 uppercase tracking-wider">
                <span>1. Enter Delivery & Contact Details</span>
                <span className="text-emerald-700">Step 1 of 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white border border-violet-200 text-indigo-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">WhatsApp Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white border border-violet-200 text-indigo-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white border border-violet-200 text-indigo-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white border border-violet-200 text-indigo-950 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white border border-violet-200 text-indigo-950 font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-violet-200 flex justify-between items-center">
                <div className="text-xs text-slate-500 font-medium">
                  Total Amount: <span className="font-extrabold text-indigo-950">₹{finalTotal.toLocaleString()}</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl gradient-btn-emerald font-bold text-xs shadow-md"
                >
                  Continue to Payment Mode
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Method Choice & WhatsApp Order Trigger */}
          {step === 2 && (
            <div className="space-y-5 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-950 uppercase tracking-wider">
                <span>2. Preferred Payment Mode</span>
                <span className="text-emerald-700">Step 2 of 2</span>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'upi', title: 'UPI / Google Pay / PhonePe / Paytm', desc: 'Direct QR code or VPA on WhatsApp' },
                  { id: 'card', title: 'Credit / Debit Card', desc: 'Online secure link sent via WhatsApp' },
                  { id: 'cod', title: 'Cash on Delivery (COD)', desc: 'Pay when order arrives' }
                ].map(method => (
                  <label
                    key={method.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                    className={`p-4 rounded-2xl bg-white border cursor-pointer flex items-center justify-between transition-all ${
                      formData.paymentMethod === method.id
                        ? 'border-emerald-500 shadow-md ring-2 ring-emerald-400'
                        : 'border-violet-100 hover:border-violet-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-indigo-950">{method.title}</div>
                      <div className="text-[10px] text-slate-500">{method.desc}</div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === method.id}
                      onChange={() => {}}
                      className="accent-emerald-600"
                    />
                  </label>
                ))}
              </div>

              {/* Notice Pill */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Your complete order details will be sent directly to <strong>+91 91730 87595</strong> for instant processing.</span>
              </div>

              <div className="pt-3 border-t border-violet-200 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 font-bold hover:text-indigo-950"
                >
                  ← Edit Address
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="px-8 py-3.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                  <span>Send Order to WhatsApp (9173087595)</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Sent Confirmation */}
          {step === 3 && (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-indigo-950">Order Sent to WhatsApp!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Order Reference: <span className="font-extrabold text-emerald-700">{orderId}</span>
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-violet-100 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Target Phone:</span>
                  <span className="font-bold text-indigo-950">+91 91730 87595</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Customer Name:</span>
                  <span className="font-bold text-indigo-950">{formData.fullName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Address:</span>
                  <span className="font-bold text-indigo-950">{formData.city}, {formData.pincode}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl gradient-btn-primary font-bold text-xs shadow-md"
              >
                Continue Browsing
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
