import { useState, type FormEvent } from 'react';
import { Bell, CheckCircle2, X } from 'lucide-react';
import { productService } from '../admin/services/product.service';

interface NotifyMeModalProps {
  productId: string;
  productTitle: string;
  selectedWidthSize?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function NotifyMeModal({
  productId,
  productTitle,
  selectedWidthSize,
  isOpen,
  onClose,
}: NotifyMeModalProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Save notification in database & Admin Panel via Backend API
      await productService.notifyMe(productId, {
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim() || undefined,
        requestedSize: selectedWidthSize,
      });

      // 2. Generate WhatsApp message similar to Order flow
      const sizeText = selectedWidthSize ? `\n*Requested Width Size:* ${selectedWidthSize}` : '';
      const message =
        `🔔 *RESTOCK NOTIFICATION REQUEST*\n\n` +
        `*Product:* ${productTitle}${sizeText}\n` +
        `*Customer Name:* ${name.trim()}\n` +
        `*WhatsApp Number:* ${whatsapp.trim()}\n` +
        (email.trim() ? `*Email:* ${email.trim()}\n` : '') +
        `\nPlease notify me when this product is back in stock! Thank you.`;

      const businessPhone = '919667290056';
      const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`;

      // 3. Open WhatsApp chat for customer
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit notification request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">You're on the list!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              We have saved your request for <span className="font-semibold text-amber-600 dark:text-amber-400">{productTitle}</span>{selectedWidthSize ? ` (${selectedWidthSize})` : ''} and opened WhatsApp chat. We will notify you immediately when back in stock!
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Notify Me When Available</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {productTitle}{selectedWidthSize ? ` (${selectedWidthSize})` : ''}
                </p>
              </div>
            </div>

            {error ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">{error}</div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priya@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Restock Notification'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
