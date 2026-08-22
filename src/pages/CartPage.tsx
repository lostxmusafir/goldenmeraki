import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer/Footer';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/catalog';
import type { CartItem } from '../types/cart';
import type { CommonPageProps } from './HomePage';
import { getImageUrl } from '../utils/image';
import { SEOHead } from '../components/seo/SEOHead';

export interface CartPageProps extends CommonPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, selectedWidthSize?: string) => void;
  onRemoveItem: (productId: string, selectedWidthSize?: string) => void;
}

export function CartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
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
  onSelectProduct
}: CartPageProps) {
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;

  const handleWhatsAppOrder = () => {
    const orderLines = cartItems.map(
      (item) =>
        `- ${item.name}${item.selectedWidthSize ? ` (Width Size: ${item.selectedWidthSize})` : ''} x${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`,
    );
    const message = [
      'Hi Golden Meraki, I want to place an order.',
      '',
      ...orderLines,
      '',
      `Subtotal: ₹${subtotal.toLocaleString('en-IN')}`,
      `Shipping: ${shipping === 0 ? 'Free' : formatCurrency(shipping)}`,
      `Total: ₹${(subtotal + shipping).toLocaleString('en-IN')}`
    ].join('\n');

    window.open(`https://wa.me/919667290056?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <SEOHead title="Shopping Cart" description="View and manage items in your shopping cart at Golden Meraki Gems." noIndex={true} />
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

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-slate-500">
          <Link to="/" className="transition-colors hover:text-slate-950">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-950">Cart</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.75fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-light tracking-tight text-slate-950">Cart</h1>
            <p className="mt-2 text-sm text-slate-500">Review your items or send the order to WhatsApp from here.</p>

            <div className="mt-6 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-sm text-slate-500">Your cart is currently empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedWidthSize || 'default'}`} className="flex gap-4 rounded-[1.5rem] border border-slate-200 p-4">
                    <img src={getImageUrl(item.image)} alt={item.name} className="h-24 w-24 rounded-2xl object-cover" />
                    <div className="flex-1 space-y-3">
                      <div>
                        <h2 className="text-base font-medium text-slate-950">{item.name}</h2>
                        {item.selectedWidthSize ? (
                          <p className="text-xs font-semibold text-amber-600 dark:text-amber-500">
                            {item.selectedWidthSize.toLowerCase().includes('bead') ? 'Bead Count' : 'Size'}: {item.selectedWidthSize}
                          </p>
                        ) : null}
                        <p className="text-sm text-slate-500">{formatCurrency(item.price)}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedWidthSize)}
                            disabled={item.quantity <= 1}
                            className={`h-9 w-9 rounded-full border border-slate-200 transition ${
                              item.quantity <= 1 ? 'opacity-40 cursor-not-allowed text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            -
                          </button>
                          <span className="min-w-10 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.selectedWidthSize)}
                            disabled={item.stock != null && item.quantity >= item.stock}
                            className={`h-9 w-9 rounded-full border border-slate-200 transition ${
                              item.stock != null && item.quantity >= item.stock
                                ? 'opacity-40 cursor-not-allowed text-slate-300'
                                : 'hover:bg-slate-100 text-slate-700'
                            }`}
                            title={item.stock != null && item.quantity >= item.stock ? `Max stock limit (${item.stock}) reached` : 'Increase quantity'}
                          >
                            +
                          </button>
                        </div>
                        {item.stock != null && item.quantity >= item.stock && (
                          <span className="text-xs font-medium text-amber-600">
                            Max stock ({item.stock})
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id, item.selectedWidthSize)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-sm font-medium text-rose-500 transition-colors hover:bg-rose-50 hover:text-rose-700"
                          aria-label={`Remove ${item.name}`}
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4 text-rose-500" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{subtotal === 0 ? formatCurrency(0) : shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base text-slate-950">
                <span>Total</span>
                <span>{formatCurrency(subtotal + shipping)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50"
              >
                Proceed to checkout
              </Button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
