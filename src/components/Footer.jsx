import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  Truck
} from 'lucide-react';

export const Footer = ({ onOpenQuiz, onOpenBuilder, onOpenCanvas }) => {
  return (
    <footer className="bg-indigo-950 text-white pt-14 pb-12 border-t border-violet-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 5 Columns Layout (Matching Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Column 1: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-violet-800 pb-2">
              CONTACT
            </h4>
            <div className="space-y-2 text-violet-200 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>316, Above Kohinoor Electronics, Kamla Spaces, S.V. Road, Santacruz West, Mumbai - 400054</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+91 99300 00944</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>info@goldenmeraki.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Connect & Newsletter */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-violet-800 pb-2">
              STAY IN TOUCH
            </h4>
            <p className="text-violet-200 text-[11px]">
              Subscribe for weekly Vastu tips & ₹100 instant discount coupon!
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed! Use code GOLDEN100'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter email address..."
                className="w-full px-3 py-2 rounded-xl bg-white/10 border border-violet-700 text-white text-xs placeholder-violet-400 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl gradient-btn-emerald font-extrabold text-xs shadow-sm"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-violet-800 pb-2">
              QUICK LINKS
            </h4>
            <ul className="space-y-1.5 text-violet-200">
              <li className="hover:text-amber-300 transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Blog Articles</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Our Store Mumbai</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Custom Bracelet Studio</li>
              <li onClick={onOpenQuiz} className="hover:text-amber-300 transition-colors cursor-pointer">Crystal Finder Quiz</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Refund & Return Policy</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Shipping Policy</li>
            </ul>
          </div>

          {/* Column 4: Top Categories */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-violet-800 pb-2">
              TOP CATEGORIES
            </h4>
            <ul className="space-y-1.5 text-violet-200">
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Energy Gemstone Bracelets</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Raw Crystals & Clusters</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Feng Shui Crystal Trees</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">108 Jaap Malas</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Rose Quartz Gua Sha</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Zodiac Birthday Kits</li>
            </ul>
          </div>

          {/* Column 5: Top Products */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-b border-violet-800 pb-2">
              TOP PRODUCTS
            </h4>
            <ul className="space-y-1.5 text-violet-200">
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Pyrite Wealth Cluster</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">7 Chakra Bracelet</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Rose Quartz Rock</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Amethyst Geode Slice</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Shree Yantra Pendant</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Tiger Eye Kada</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-violet-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-violet-300/70 gap-4">
          <div>
            © 2026 Golden Meraki Gemstones Store. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms & Conditions</span>
            <span className="hover:underline cursor-pointer">ISO 9001 Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
