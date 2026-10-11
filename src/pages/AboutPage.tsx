import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';
import { Instagram } from '../components/Icons';
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, EMAIL, BRAND_TAGLINE } from '../utils/checkout';
import { assetUrl } from '../utils/assets';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ivory pt-20 sm:pt-24">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bg-blush watercolor-bg py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-white/90">
              <img
                src={assetUrl('/images/logo.png')}
                alt="Bloom & Glow Official Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-script text-2xl text-peach-dark mb-2">Our Story</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-chocolate mb-4">
              Bloom & Glow
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-peach-dark mb-6">
              “{BRAND_TAGLINE}”
            </p>
            <p className="text-base sm:text-lg text-muted-brown leading-relaxed mb-6">
              Bloom & Glow is a boutique artisan brand specializing in handmade candles,
              decorative diyas, customized layered designs, and celebratory festive hampers.
              Each creation is thoughtfully poured and detailed by hand, carrying the warmth and magic of artisanal craft.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-peach/30 shadow-sm text-xs font-semibold text-chocolate">
              <span>🪔 100% Handcrafted in India</span>
              <span>•</span>
              <span>Artisan Candles & Diyas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Craft ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-ivory" id="our-craft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-script text-xl text-peach-dark mb-2">What we do</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate">The Art of Handmade Light</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  title: 'Handcrafted Quality',
                  desc: 'Every candle and diya is hand-poured, hand-painted, and finished with attention to detail. No two pieces are ever exactly the same.',
                  emoji: '✋',
                },
                {
                  title: 'Premium Materials',
                  desc: 'We use high-quality soy wax, cotton wicks, and carefully selected fragrances to ensure a clean, long-lasting burn.',
                  emoji: '🌿',
                },
                {
                  title: 'Customization',
                  desc: 'From bespoke designs to personalized gifting, we work closely with our customers to bring their vision to life.',
                  emoji: '✨',
                },
                {
                  title: 'Festive Spirit',
                  desc: 'Our collections celebrate Indian festivals and traditions, with special ranges for Diwali, Navratri, and other occasions.',
                  emoji: '🪔',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-warm-white rounded-2xl border border-taupe/10 hover:border-peach/20 transition-all duration-300"
                >
                  <span className="text-3xl mb-3 block">{item.emoji}</span>
                  <h3 className="font-serif text-lg font-bold text-chocolate mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-brown leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Collections Overview ────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-warm-white" id="our-range">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-script text-xl text-peach-dark mb-2">What we offer</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate mb-4">Our Range</h2>
            <div className="botanical-divider max-w-xs mx-auto">
              <span className="text-peach">✦</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {[
              'Bloomy Glow Shots — Miniature candles for gifting and décor',
              'Solid Candles — Classic pillar, cube, and sphere candles',
              'Customised & Layered Designs — Bespoke gradient and marble candles',
              'Bloom Light Candles — Botanical and mosaic statement pieces',
              'Bloomlit Diyas — Handcrafted traditional and floating diyas',
              'Diwali Hampers — Curated festive gift collections',
              'Raas Glow — Vibrant celebration-inspired designs',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-taupe/10 hover:border-peach/20 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-peach flex-shrink-0" />
                <p className="text-sm text-chocolate">{item}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-chocolate text-ivory px-6 py-3 rounded-full text-sm font-semibold hover:bg-peach-dark transition-colors btn-primary"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-blush" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-script text-xl text-peach-dark mb-2">Reach out</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate mb-4">Get in Touch</h2>
            <p className="text-muted-brown max-w-lg mx-auto">
              We'd love to hear from you. Whether you have a question, need a custom quote,
              or want to discuss a bulk order — reach out to us through any of these channels.
            </p>
          </div>

          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/917841834995"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-taupe/15 hover:border-green-300 hover:shadow-lg transition-all group"
              id="contact-whatsapp"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                <Phone size={22} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-chocolate text-sm">WhatsApp</h3>
                <p className="text-xs text-muted-brown">{WHATSAPP_DISPLAY}</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-taupe/15 hover:border-pink-300 hover:shadow-lg transition-all group"
              id="contact-instagram"
            >
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-200 transition-colors">
                <Instagram size={22} className="text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold text-chocolate text-sm">Instagram</h3>
                <p className="text-xs text-muted-brown">@Bloomandglow24_</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-taupe/15 hover:border-peach hover:shadow-lg transition-all group"
              id="contact-email"
            >
              <div className="w-12 h-12 rounded-full bg-peach/20 flex items-center justify-center flex-shrink-0 group-hover:bg-peach/30 transition-colors">
                <Mail size={22} className="text-peach-dark" />
              </div>
              <div>
                <h3 className="font-semibold text-chocolate text-sm">Email</h3>
                <p className="text-xs text-muted-brown">{EMAIL}</p>
              </div>
            </a>

            {/* Custom Orders */}
            <Link
              to="/custom-orders"
              className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-taupe/15 hover:border-peach hover:shadow-lg transition-all group"
              id="contact-custom"
            >
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center flex-shrink-0 group-hover:bg-blush transition-colors">
                <Heart size={22} className="text-chocolate" />
              </div>
              <div>
                <h3 className="font-semibold text-chocolate text-sm">Custom Orders</h3>
                <p className="text-xs text-muted-brown">Place a custom enquiry</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
