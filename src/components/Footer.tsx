import { Link } from 'react-router-dom';
import { Mail, Phone, Heart } from 'lucide-react';
import { Instagram } from './Icons';
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, EMAIL, BRAND_TAGLINE } from '../utils/checkout';
import { assetUrl } from '../utils/assets';

export default function Footer() {
  return (
    <footer className="bg-chocolate text-ivory/90" id="footer">
      {/* Top decorative border */}
      <div className="h-1 bg-gradient-to-r from-peach/0 via-peach to-peach/0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={assetUrl('/images/logo_emblem.png')}
                alt="Bloom & Glow"
                className="w-12 h-12 rounded-full object-cover border border-peach/30 shadow-md"
              />
              <div>
                <h3 className="font-serif text-2xl font-bold text-ivory leading-tight">Bloom & Glow</h3>
                <p className="font-script text-base text-peach-light">handcrafted with love</p>
              </div>
            </div>
            <p className="font-serif italic text-xs text-peach-light/90 mb-3">
              “{BRAND_TAGLINE}”
            </p>
            <p className="text-ivory/70 text-sm leading-relaxed mb-3">
              Artisan candles and decorative diyas crafted with care. Each piece is a celebration of warmth, light, and handmade beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-ivory mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { to: '/shop', label: 'Shop Collection' },
                { to: '/custom-orders', label: 'Custom Orders' },
                { to: '/about', label: 'About Us' },
                { to: '/cart', label: 'Shopping Cart' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-ivory/70 hover:text-peach-light transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-ivory mb-4">Collections</h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { to: '/shop?category=bloomy-glow-shots', label: 'Bloomy Glow Shots' },
                { to: '/shop?category=solid-candles', label: 'Solid Candles' },
                { to: '/shop?category=bloomlit-diyas', label: 'Bloomlit Diyas' },
                { to: '/shop?category=diwali-hampers', label: 'Diwali Hampers' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-ivory/70 hover:text-peach-light transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-ivory mb-4">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/917841834995`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-ivory/70 hover:text-peach-light transition-colors text-sm"
                id="footer-whatsapp"
              >
                <Phone size={16} />
                {WHATSAPP_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2.5 text-ivory/70 hover:text-peach-light transition-colors text-sm"
                id="footer-email"
              >
                <Mail size={16} />
                {EMAIL}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-ivory/70 hover:text-peach-light transition-colors text-sm"
                id="footer-instagram"
              >
                <Instagram size={16} />
                @Bloomandglow24_
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory/50 text-xs">
            © {new Date().getFullYear()} Bloom & Glow. All rights reserved.
          </p>
          <p className="text-ivory/50 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-peach" fill="currentColor" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
