import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, ArrowLeft, Clock, Check, ChevronRight, MessageCircle, Sparkles } from 'lucide-react';
import { getProductBySlug, getProductsByCategory, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ProductVariant } from '../types';
import { WHATSAPP_DISPLAY } from '../utils/checkout';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, setCartOpen } = useCart();

  const product = getProductBySlug(slug || '');

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState<Record<string, string>>({});
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <main className="min-h-screen bg-ivory pt-24 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="font-serif text-3xl font-bold text-chocolate mb-4">Product Not Found</h1>
          <p className="text-muted-brown mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-chocolate text-ivory px-6 py-3 rounded-full text-sm font-semibold hover:bg-peach-dark transition-colors btn-primary"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const unitPrice = product.price !== null
    ? product.price + (selectedVariant?.priceModifier ?? 0)
    : null;

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product.available) return;
    addItem(product, selectedVariant, quantity, customizations);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setCartOpen(true);
  };

  return (
    <main className="min-h-screen bg-ivory pt-20 sm:pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-brown" id="breadcrumb">
          <Link to="/" className="hover:text-chocolate transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-chocolate transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-chocolate transition-colors capitalize">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <ChevronRight size={14} />
          <span className="text-chocolate font-medium truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* ── Image Gallery ──────────────────────────────── */}
          <div className="animate-fade-in" id="product-gallery">
            <div className="aspect-square rounded-2xl overflow-hidden bg-cream border border-taupe/10">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeImageIndex ? 'border-chocolate' : 'border-taupe/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ───────────────────────────────── */}
          <div className="animate-fade-in-up" id="product-info">
            {/* Category */}
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-brown/70">
                {product.category.replace(/-/g, ' ')}
              </p>
              {product.comingSoon && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-ivory">
                  Coming Soon • Not Launched Yet
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-3">
              {product.priceOnRequest ? (
                <span className="text-lg font-medium text-muted-brown italic">Price on request</span>
              ) : unitPrice !== null ? (
                <span className="text-3xl font-serif font-bold text-chocolate">{formatPrice(unitPrice)}</span>
              ) : null}
              {product.comingSoon && (
                <span className="text-xs font-medium text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200">
                  Estimated Launch Price
                </span>
              )}
            </div>

            {/* Coming Soon Notice Card */}
            {product.comingSoon && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950">
                <div className="flex items-center gap-2 font-serif font-bold text-amber-900 text-base mb-1">
                  <Sparkles size={18} className="text-amber-600" />
                  <span>Coming Soon — Not Launched Yet</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed mb-3">
                  Our authentic Indian Sweet Candles box is currently in final artisanal preparation and has not officially launched yet. Want early access or to pre-book for festive gifting? Chat directly with us on WhatsApp ({WHATSAPP_DISPLAY})!
                </p>
                <a
                  href={`https://wa.me/917841834995?text=${encodeURIComponent(`Hi Bloom & Glow! I saw the ${product.name} on your website. Since it is Coming Soon and not launched yet, I would love to register my interest and get notified when it is available!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-700 text-ivory rounded-full text-xs font-semibold hover:bg-amber-800 shadow-sm transition-all"
                >
                  <MessageCircle size={15} />
                  Notify Me / Pre-Inquire on WhatsApp
                </a>
              </div>
            )}

            {/* Description */}
            <p className="text-muted-brown leading-relaxed mb-6">{product.description}</p>

            {/* Preparation time */}
            {product.preparationTime && (
              <div className="flex items-center gap-2 mb-6 p-3 bg-cream rounded-lg border border-taupe/15">
                <Clock size={16} className="text-peach-dark flex-shrink-0" />
                <span className="text-sm text-muted-brown">
                  Preparation time: <strong className="text-chocolate">{product.preparationTime}</strong>
                </span>
              </div>
            )}

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-chocolate mb-2">
                  Select Variant
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all border ${
                        selectedVariant?.id === v.id
                          ? 'bg-chocolate text-ivory border-chocolate'
                          : 'bg-white text-chocolate border-taupe/30 hover:border-chocolate'
                      }`}
                    >
                      {v.name}
                      {v.priceModifier ? ` (+${formatPrice(v.priceModifier)})` : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization options */}
            {product.customizationOptions.length > 0 && (
              <div className="mb-6 space-y-4">
                <h3 className="text-sm font-semibold text-chocolate">Customization</h3>
                {product.customizationOptions.map(opt => (
                  <div key={opt.id}>
                    <label className="block text-sm text-muted-brown mb-1">
                      {opt.label}
                      {opt.required && <span className="text-red-400 ml-0.5">*</span>}
                    </label>
                    {opt.type === 'select' ? (
                      <select
                        value={customizations[opt.label] || ''}
                        onChange={e => setCustomizations({ ...customizations, [opt.label]: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-taupe/20 rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50"
                      >
                        <option value="">Select...</option>
                        {opt.options?.map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : opt.type === 'textarea' ? (
                      <textarea
                        value={customizations[opt.label] || ''}
                        onChange={e => setCustomizations({ ...customizations, [opt.label]: e.target.value })}
                        placeholder={opt.placeholder}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-white border border-taupe/20 rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50 resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={customizations[opt.label] || ''}
                        onChange={e => setCustomizations({ ...customizations, [opt.label]: e.target.value })}
                        placeholder={opt.placeholder}
                        className="w-full px-4 py-2.5 bg-white border border-taupe/20 rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quantity (Hidden if Coming Soon) */}
            {!product.comingSoon && (
              <div className="mb-8">
                <label className="block text-sm font-semibold text-chocolate mb-2">Quantity</label>
                <div className="inline-flex items-center bg-white border border-taupe/20 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-muted-brown hover:text-chocolate transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold text-chocolate">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-muted-brown hover:text-chocolate transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3" id="product-actions">
              {product.comingSoon ? (
                <a
                  href={`https://wa.me/917841834995?text=${encodeURIComponent(`Hi Bloom & Glow! I saw the ${product.name} on your website. Since it is Coming Soon and not launched yet, please notify me when it is launched!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold bg-amber-700 text-ivory hover:bg-amber-800 shadow-lg shadow-amber-900/15 transition-all"
                >
                  <MessageCircle size={18} />
                  Pre-Book / Notify Me on WhatsApp (Coming Soon)
                </a>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.available}
                    className={`btn-primary flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all ${
                      isAdded
                        ? 'bg-green-700 text-ivory'
                        : product.available
                        ? 'bg-chocolate text-ivory hover:bg-peach-dark shadow-lg shadow-chocolate/15'
                        : 'bg-taupe text-muted-brown cursor-not-allowed'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={18} />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        Add to Cart
                      </>
                    )}
                  </button>
                  {product.available && (
                    <button
                      onClick={handleBuyNow}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold border-2 border-chocolate text-chocolate hover:bg-chocolate hover:text-ivory transition-all"
                    >
                      Buy Now
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cream text-muted-brown text-xs font-medium rounded-full capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Related Products ─────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-warm-white" id="related-products">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="font-script text-xl text-peach-dark mb-2">You may also like</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-chocolate">Related Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
