import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, Heart, X } from 'lucide-react';

export const ToastNotification = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in">
      <div className="bg-indigo-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-violet-700 flex items-center space-x-3 max-w-sm">
        {toast.type === 'cart' ? (
          <Sparkles className="w-5 h-5 text-amber-300 animate-bounce" />
        ) : toast.type === 'wishlist' ? (
          <Heart className="w-5 h-5 text-pink-400 fill-current" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        )}
        <div className="text-xs font-semibold flex-1">
          {toast.message}
        </div>
        <button onClick={onClose} className="text-violet-300 hover:text-white p-1">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
