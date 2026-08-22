import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, MessageSquare, ShoppingBag } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer/Footer';
import { Button } from '../components/common/Button';
import { orderService } from '../admin/services/order.service';
import type { CommonPageProps } from './HomePage';

export function ThankYouPage({
  cartCount,
  wishlistCount,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenQuiz,
  onOpenBuilder,
  onOpenCanvas,
  onSelectProduct,
}: CommonPageProps) {
  const location = useLocation();
  const state = location.state as { orderId?: string; orderNumber?: string; whatsappUrl?: string; totalAmount?: number } | null;

  const orderId = state?.orderId;
  const orderNumber = state?.orderNumber || 'GM-ORD-REC';
  const whatsappUrl = state?.whatsappUrl;

  const handleContinueToWhatsApp = async () => {
    if (orderId) {
      try {
        await orderService.recordWhatsappHandoff(orderId);
      } catch (err) {
        console.error('Failed to record WhatsApp handoff timestamp', err);
      }
    }

    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 flex flex-col justify-between">
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenCart={onOpenCart}
        onOpenWishlist={onOpenWishlist}
        onOpenAccount={onOpenAccount}
        onOpenQuiz={onOpenQuiz}
        onOpenBuilder={onOpenBuilder}
        onOpenCanvas={onOpenCanvas}
        onSelectProduct={onSelectProduct}
      />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
        <div className="w-full rounded-[2.5rem] border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Order Saved — Awaiting WhatsApp Confirmation
            </span>
            <h1 className="text-3xl font-light tracking-tight text-slate-950 dark:text-slate-100 sm:text-4xl">
              Thank You For Your Order!
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Your order <span className="font-semibold text-slate-900 dark:text-slate-200">#{orderNumber}</span> has been saved. Please continue to WhatsApp to send your order details to our team.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5 dark:border-slate-800 dark:bg-slate-950 text-left space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">Next Step: Send WhatsApp Message</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Click the button below to open WhatsApp with your pre-filled order message. Our team will review your order details and confirm your order.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row justify-center pt-2">
            {whatsappUrl && (
              <button
                type="button"
                onClick={handleContinueToWhatsApp}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Continue to WhatsApp
              </button>
            )}
            <Link to="/">
              <Button className="w-full sm:w-auto border border-slate-200 bg-white px-6 py-3 text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
