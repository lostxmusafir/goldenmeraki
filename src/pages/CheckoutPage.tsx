import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer/Footer';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { formatCurrency } from '../utils/catalog';
import type { CartItem } from '../types/cart';
import type { CommonPageProps } from './HomePage';

export interface CheckoutPageProps extends CommonPageProps {
  cartItems: CartItem[];
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
  onSelectProduct
}: CheckoutPageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');

  const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleWhatsAppOrder = () => {
    const orderLines = cartItems.map((item) => `- ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`);
    const message = [
      'Hi Golden Meraki, I want to place an order.',
      '',
      `Name: ${name || 'Not provided'}`,
      `Phone: ${phone || 'Not provided'}`,
      `Email: ${email || 'Not provided'}`,
      `Pincode: ${pincode || 'Not provided'}`,
      `Address: ${address || 'Not provided'}`,
      '',
      'Items:',
      ...orderLines,
      '',
      `Subtotal: ₹${subtotal.toLocaleString('en-IN')}`,
      `Shipping: ${shipping === 0 ? 'Free' : formatCurrency(shipping)}`,
      `Total: ₹${total.toLocaleString('en-IN')}`
    ].join('\n');

    window.open(`https://wa.me/919667290056?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
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
              Share your details below, then send the full order directly to our WhatsApp team for a fast response.
            </p>
          </div>

          <form
            className="mt-8 grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              handleWhatsAppOrder();
            }}
          >
            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" aria-label="Full name" required />
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" aria-label="Email address" type="email" />
            <Input value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10 digit mobile number" aria-label="Mobile number" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} required />
            <Input value={pincode} onChange={(event) => setPincode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="Pincode" aria-label="Pincode" inputMode="numeric" maxLength={6} />
            <Input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Street address" aria-label="Street address" className="sm:col-span-2" required />

            <div className="sm:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row">
              <Button type="submit" className="bg-slate-950 px-5 text-white hover:bg-slate-800">
                Place order on WhatsApp
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

        <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">Summary</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
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
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base text-slate-950">
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
