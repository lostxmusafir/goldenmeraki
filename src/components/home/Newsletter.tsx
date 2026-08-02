import { MessageCircle, Send } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function Newsletter() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-8">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Stay connected on WhatsApp</p>
            <h2 className="text-2xl font-light tracking-tight text-slate-950 sm:text-3xl">
              For customized product, contact on WhatsApp.
            </h2>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Share your name and 10 digit mobile number to receive curated drops, offers, and order updates in one place.
            </p>
          </div>

          <form
            className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-start"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const name = String(formData.get('name') ?? '');
              const phone = String(formData.get('phone') ?? '');
              const message = `Hi Golden Meraki, I am ${name}. My WhatsApp number is ${phone}. Please add me to your updates list.`;
              window.open(`https://wa.me/919667290056?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
            }}
          >
            <Input name="name" type="text" placeholder="Your name" aria-label="Your name" required />
            <Input
              name="phone"
              type="tel"
              placeholder="10 digit mobile number"
              aria-label="10 digit mobile number"
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />
            <Button type="submit" className="h-[46px] bg-slate-950 px-6 text-white hover:bg-slate-800 md:h-full">
              <MessageCircle className="mr-2 h-4 w-4" />
              Send
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

