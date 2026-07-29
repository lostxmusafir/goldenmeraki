import { ArrowUpRight, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'YouTube', href: 'https://www.youtube.com/' }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Golden Meraki</div>
            <h2 className="max-w-xl text-3xl font-light tracking-tight text-white sm:text-4xl">
              A minimal home for premium crystal rituals and thoughtful gifting.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Designed to feel calmer, more trustworthy, and easier to shop across every device.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Shop</div>
              <div className="space-y-2 text-sm text-slate-300">
                <Link to="/category/raw-stones" className="block transition-colors hover:text-white">
                  Raw stones
                </Link>
                <Link to="/category/bracelets" className="block transition-colors hover:text-white">
                  Bracelets
                </Link>
                <Link to="/category/trees-decor" className="block transition-colors hover:text-white">
                  Home decor
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Support</div>
              <div className="space-y-2 text-sm text-slate-300">
                <a href="tel:+919930000944" className="flex items-center gap-2 transition-colors hover:text-white">
                  <Phone className="h-4 w-4" />
                  +91 99300 00944
                </a>
                <a href="mailto:info@goldenmeraki.com" className="flex items-center gap-2 transition-colors hover:text-white">
                  <Mail className="h-4 w-4" />
                  info@goldenmeraki.com
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Visit</div>
              <p className="text-sm leading-7 text-slate-300">
                <MapPin className="mr-2 inline h-4 w-4" />
                Mumbai, India
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-400">Stay connected</span>
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                {label}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-400 sm:items-end">
            <p>Copyright 2026 Golden Meraki. All rights reserved.</p>            
          </div>
        </div>
      </div>
    </footer>
  );
}
