import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer/Footer';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { formatCurrency } from '../utils/catalog';
import { orderService } from '../admin/services/order.service';
import { abandonedCartService } from '../admin/services/abandoned-cart.service';
import type { CartItem } from '../types/cart';
import type { CommonPageProps } from './HomePage';
import { SEOHead } from '../components/seo/SEOHead';

export interface CheckoutPageProps extends CommonPageProps {
  cartItems: CartItem[];
  onClearCart?: () => void;
}

export function CheckoutPage({
  cartItems,
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
  onClearCart,
}: CheckoutPageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  // Retrieve or generate persistent cartId for abandoned cart recovery (Requirement #12)
  const cartId = useMemo(() => {
    let existingId = localStorage.getItem('gm_abandoned_cart_id');
    if (!existingId) {
      existingId = `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      localStorage.setItem('gm_abandoned_cart_id', existingId);
    }
    return existingId;
  }, []);

  // Automatic Abandoned Cart Auto-Save (Requirement #12)
  useEffect(() => {
    if (cartItems.length === 0) return;

    const timeoutId = setTimeout(() => {
      abandonedCartService.saveAbandonedCart({
        cartId,
        customerName: name.trim() || undefined,
        phone: phone.trim() || undefined,
        whatsapp: phone.trim() || undefined,
        email: email.trim() || undefined,
        shippingAddress: address || pincode ? { street: address, pincode } : undefined,
        products: cartItems.map((item) => ({
          productId: item.id,
          title: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        cartTotal: total,
        recoveryStatus: 'Pending',
        source: 'WEB_CHECKOUT',
      }).catch((err) => console.error('Failed to auto-save abandoned cart', err));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [cartId, cartItems, name, phone, email, address, pincode, total]);

  const handleWhatsAppOrder = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Step 1: Save order to database (Requirement #8 & #10)
      const result = await orderService.createOrder({
        customerName: name || 'Guest Customer',
        phone: phone || '9998583126',
        whatsapp: phone || '9998583126',
        shippingAddress: {
          street: address || 'Main Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          pincode: pincode || '400001',
        },
        cartItems: cartItems.map((item) => ({
          productId: item.id,
          title: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          selectedWidthSize: item.selectedWidthSize,
        })),
        totalAmount: total,
        source: 'WHATSAPP_WEB',
      });

      // Mark abandoned cart as Recovered
      await abandonedCartService.saveAbandonedCart({
        cartId,
        customerName: name,
        phone,
        products: cartItems.map((item) => ({ productId: item.id, title: item.name, quantity: item.quantity, price: item.price })),
        cartTotal: total,
        recoveryStatus: 'Recovered',
      }).catch(() => null);

      // Step 2: Checkout Completion & Reset
      if (onClearCart) {
        onClearCart();
      }
      localStorage.removeItem('gm_cart');
      localStorage.removeItem('gm_abandoned_cart_id');

      // Step 3: Redirect to Thank You Page where customer can continue to WhatsApp
      navigate('/thank-you', {
        state: {
          orderId: result.order.id,
          orderNumber: result.order.orderNumber,
          whatsappUrl: result.whatsappUrl,
          totalAmount: total,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <SEOHead title="Checkout" description="Complete your crystal order at Golden Meraki Gems." noIndex={true} />
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

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_0.72fr] lg:px-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <nav className="text-sm text-slate-500">
            <Link to="/" className="transition-colors hover:text-slate-950">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/cart" className="transition-colors hover:text-slate-950">
              Cart
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-950">Checkout</span>
          </nav>

          <div className="mt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Checkout</p>
            <h1 className="mt-2 text-3xl font-light tracking-tight text-slate-950">Place your order on WhatsApp</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Share your details below. Your order will be saved in our database and sent directly to our WhatsApp team for processing.
            </p>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>
          ) : null}

          <form
            className="mt-8 grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              handleWhatsAppOrder();
            }}
          >
            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name *" aria-label="Full name" required />
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" aria-label="Email address" type="email" />
            <Input value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10 digit mobile number *" aria-label="Mobile number" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} required />
            <Input value={pincode} onChange={(event) => setPincode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="Pincode *" aria-label="Pincode" inputMode="numeric" maxLength={6} required />
            <Input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Street address *" aria-label="Street address" className="sm:col-span-2" required />

            <div className="sm:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row">
              <Button type="submit" disabled={isSubmitting} className="bg-slate-950 px-5 text-white hover:bg-slate-800 disabled:opacity-50">
                {isSubmitting ? 'Saving Order...' : 'Place Order on WhatsApp'}
              </Button>
              <Button
                type="button"
                className="border border-slate-200 bg-white px-5 text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                onClick={() => navigate('/cart')}
              >
                Back to cart
              </Button>
            </div>
          </form>
        </section>

        <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">Summary</h2>
          
          <div className="divide-y divide-slate-100 space-y-2">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedWidthSize || 'default'}`} className="pt-2 flex justify-between gap-2 text-xs text-slate-700">
                <div>
                  <span className="font-semibold text-slate-900">{item.name}</span> (x{item.quantity})
                  {item.selectedWidthSize ? (
                    <p className="text-[11px] font-semibold text-amber-600">
                      {item.selectedWidthSize.toLowerCase().includes('bead') ? 'Bead Count' : 'Option'}: {item.selectedWidthSize}
                    </p>
                  ) : null}
                </div>
                <span className="font-medium text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-3 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{subtotal === 0 ? formatCurrency(0) : shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base text-slate-950 font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
