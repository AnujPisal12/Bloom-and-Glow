import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Gift, Phone, Eye, X } from 'lucide-react';
import { Instagram } from '../components/Icons';
import { categories, getFeaturedProducts, getNewArrivals, formatPrice, catalogLookbook } from '../data/products';
import ProductCard from '../components/ProductCard';
import { INSTAGRAM_URL, BRAND_TAGLINE } from '../utils/checkout';
import { assetUrl } from '../utils/assets';

export default function HomePage() {
  const [selectedCatalogImage, setSelectedCatalogImage] = useState<string | null>(null);
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <main>
      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center watercolor-bg overflow-hidden" id="hero">
        {/* Decorative background shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-peach/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blush/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-peach/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="text-center lg:text-left animate-fade-in-up">
              <p className="font-script text-2xl sm:text-3xl text-peach-dark mb-2">Welcome to</p>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-chocolate leading-[1.1] mb-6">
                Bloom
                <span className="text-peach-dark">&</span>
                <br />
                Glow
              </h1>
              <p className="text-base sm:text-lg text-muted-brown leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
                Handcrafted candles and decorative diyas, made with love.
                Each piece is a celebration of warmth, artistry, and the gentle glow of handmade beauty.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="btn-primary inline-flex items-center justify-center gap-2 bg-chocolate text-ivory px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-peach-dark transition-all shadow-lg shadow-chocolate/20"
                  id="hero-shop-cta"
                >
                  Shop Collection
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/custom-orders"
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-chocolate border-2 border-chocolate px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-chocolate hover:text-ivory transition-all"
                  id="hero-custom-cta"
                >
                  <Sparkles size={18} />
                  Explore Custom Orders
                </Link>
              </div>
            </div>

            {/* Right: Hero visual — authentic product collage */}
            <div className="relative flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full max-w-md h-[400px] sm:h-[450px]">
                {/* Main showcase photo (Diwali Hamper Box) */}
                <div className="absolute top-2 left-4 right-8 bottom-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={assetUrl('/images/products/diwali_hamper_boxes.jpg')}
                    alt="Bloom & Glow Signature Diwali Hamper"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-transparent to-transparent flex items-end p-5">
                    <div>
                      <p className="text-ivory font-serif text-lg font-bold">Signature Festive Hampers</p>
                      <p className="text-peach-light font-script text-base">Handmade Diyas & Scented Candles</p>
                    </div>
                  </div>
                </div>

                {/* Overlapping top-right polaroid: Bloomlit Festive Diyas */}
                <div className="absolute -top-3 -right-2 sm:-right-4 w-36 sm:w-44 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-6 hover:rotate-2 transition-transform duration-300">
                  <img
                    src={assetUrl('/images/products/bloomlit_diyas_festive.jpg')}
                    alt="Bloomlit Festive Diyas"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1.5 right-2 bg-chocolate/85 text-ivory text-[10px] font-medium px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    Festive Diyas
                  </div>
                </div>

                {/* Overlapping bottom-left polaroid: Bloomy Glow layered shots */}
                <div className="absolute -bottom-3 -left-2 sm:-left-4 w-36 sm:w-44 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                  <img
                    src={assetUrl('/images/products/bloomy_glow_layered.jpg')}
                    alt="Bloomy Glow Shots"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1.5 right-2 bg-chocolate/85 text-ivory text-[10px] font-medium px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    Glow Shots
                  </div>
                </div>

                {/* Floating brand badge */}
                <div className="absolute top-1/2 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-peach/30 animate-float z-20">
                  <p className="text-[11px] font-semibold text-chocolate flex items-center gap-1.5">
                    <span className="text-peach">✦</span> “Bloom into calm,
                  </p>
                  <p className="text-[11px] font-semibold text-peach-dark pl-3">glow into joy”</p>
                  <p className="text-[9px] text-muted-brown pl-3 mt-0.5 font-medium">Handcrafted with Love</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Collections ───────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-ivory" id="collections">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-script text-xl text-peach-dark mb-2">Discover</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate mb-4">Our Collections</h2>
            <div className="botanical-divider max-w-xs mx-auto">
              <span className="text-peach">✦</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 stagger-children">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                to={`/shop?category=${cat.slug}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-cream border border-taupe/10 hover:border-peach/30 transition-all duration-300"
                id={`collection-${cat.slug}`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/60 via-chocolate/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-ivory leading-tight mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-ivory/80 leading-snug line-clamp-2 hidden sm:block">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Official Brand Catalog Lookbook ────────────────────── */}
      <section className="py-16 sm:py-24 bg-blush/40 watercolor-bg" id="catalog-lookbook">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <p className="font-script text-2xl text-peach-dark mb-2">Original Catalog</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate mb-4">Artisan Lookbook</h2>
            <p className="text-muted-brown max-w-lg mx-auto text-sm leading-relaxed mb-4">
              Browse original handcrafted catalog editions. Click any page to view full size or jump straight to the collection.
            </p>
            <div className="botanical-divider max-w-xs mx-auto">
              <span className="text-peach">✦</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {catalogLookbook.map(slide => (
              <div
                key={slide.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-taupe/20 flex flex-col"
              >
                <div
                  className="relative aspect-square overflow-hidden bg-cream cursor-pointer"
                  onClick={() => setSelectedCatalogImage(slide.image)}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-chocolate/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-chocolate px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                      <Eye size={14} /> View Full Page
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-chocolate mb-1">{slide.title}</h3>
                    <p className="text-xs text-muted-brown leading-relaxed">{slide.subtitle}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-taupe/15 flex items-center justify-between">
                    <Link
                      to={`/shop?category=${slide.categorySlug}`}
                      className="text-xs font-semibold text-chocolate hover:text-peach-dark inline-flex items-center gap-1"
                    >
                      Shop Collection <ArrowRight size={14} />
                    </Link>
                    <button
                      onClick={() => setSelectedCatalogImage(slide.image)}
                      className="text-xs text-muted-brown hover:text-chocolate font-medium inline-flex items-center gap-1"
                    >
                      <Eye size={12} /> Expand
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-warm-white" id="featured">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-script text-xl text-peach-dark mb-2">Curated for you</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate mb-4">Featured Products</h2>
            <div className="botanical-divider max-w-xs mx-auto">
              <span className="text-peach">✦</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {featured.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-chocolate text-ivory px-8 py-3 rounded-full text-sm font-semibold hover:bg-peach-dark transition-all btn-primary"
              id="view-all-products"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── New Arrivals ───────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-ivory" id="new-arrivals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-script text-xl text-peach-dark mb-2">Fresh additions</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate mb-4">New Arrivals</h2>
            <div className="botanical-divider max-w-xs mx-auto">
              <span className="text-peach">✦</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {newArrivals.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Story ────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-blush watercolor-bg" id="brand-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-script text-2xl text-peach-dark mb-4">Our Story</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate mb-6">
              Crafted with Care, Lit with Love
            </h2>
            <p className="text-muted-brown leading-relaxed mb-6">
              At Bloom & Glow, every candle and diya is a labour of love. We believe in the beauty of handmade
              craftsmanship — each piece is carefully poured, painted, and finished by hand, ensuring no two
              creations are ever the same.
            </p>
            <p className="text-muted-brown leading-relaxed mb-8">
              From classic solid candles to bespoke layered designs, from traditional diyas to curated festive
              hampers, our collections are designed to bring warmth, light, and joy into every space and celebration.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { value: '100%', label: 'Handmade' },
                { value: 'Premium', label: 'Soy Wax' },
                { value: '7+', label: 'Collections' },
                { value: 'Custom', label: 'Designs' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-2xl font-bold text-chocolate">{stat.value}</p>
                  <p className="text-xs text-muted-brown uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bulk Orders CTA ────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-ivory" id="bulk-orders">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-chocolate to-[#4A2000] rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-peach/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-peach/5 blur-3xl" />

            <div className="relative z-10">
              <Gift size={40} className="mx-auto text-peach mb-4" />
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory mb-4">
                Bulk & Corporate Orders
              </h2>
              <p className="text-ivory/80 max-w-xl mx-auto mb-8 leading-relaxed">
                Planning a festive celebration, corporate event, or large gathering?
                We create custom hampers and bulk orders tailored to your needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/custom-orders"
                  className="btn-primary inline-flex items-center justify-center gap-2 bg-peach text-chocolate px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-peach-light transition-all"
                  id="bulk-enquiry-cta"
                >
                  <Sparkles size={18} />
                  Place Bulk Enquiry
                </Link>
                <a
                  href="https://wa.me/917841834995"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-ivory border-2 border-ivory/30 px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-ivory/10 transition-all"
                  id="bulk-whatsapp-cta"
                >
                  <Phone size={18} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social / Contact Strip ─────────────────────────────── */}
      <section className="py-12 bg-blush" id="social-strip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <p className="font-serif text-lg font-semibold text-chocolate">Follow our journey</p>
            <div className="flex gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-chocolate text-ivory px-5 py-2.5 rounded-full text-sm font-medium hover:bg-peach-dark transition-all"
                id="social-instagram"
              >
                <Instagram size={18} />
                @Bloomandglow24_
              </a>
              <a
                href="https://wa.me/917841834995"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-green-800 transition-all"
                id="social-whatsapp"
              >
                <Phone size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lookbook Lightbox Modal ─────────────────────────────── */}
      {selectedCatalogImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedCatalogImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-2 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCatalogImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
            <div className="rounded-2xl overflow-hidden max-h-[80vh] flex items-center justify-center bg-ivory">
              <img
                src={selectedCatalogImage}
                alt="Bloom & Glow Catalog Page"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
