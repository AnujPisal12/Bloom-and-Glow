import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, MessageCircle, ArrowRight, Copy, Check, ExternalLink } from 'lucide-react';
import { Instagram } from '../components/Icons';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { generateOrderSummary, generateWhatsAppUrl, copyToClipboard, INSTAGRAM_URL } from '../utils/checkout';

type CheckoutStep = 'cart' | 'details' | 'review';
type CheckoutChannel = 'whatsapp' | 'instagram' | null;

export default function CartPage() {
  const {
    state,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    hasUnpricedItems,
  } = useCart();

  const [step, setStep] = useState<CheckoutStep>('cart');
  const [channel, setChannel] = useState<CheckoutChannel>(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [isCopied, setIsCopied] = useState(false);

  if (state.items.length === 0 && step === 'cart') {
    return (
      <main className="min-h-screen bg-ivory pt-24">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-blush mx-auto flex items-center justify-center mb-6">
            <ShoppingBag size={40} className="text-muted-brown/40" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-chocolate mb-4">Your Cart is Empty</h1>
          <p className="text-muted-brown mb-8">
            Discover our handcrafted candles and decorative diyas to add something beautiful to your collection.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-chocolate text-ivory px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-peach-dark transition-colors btn-primary"
          >
            <ArrowLeft size={16} />
            Browse Collection
          </Link>
        </div>
      </main>
    );
  }

  const orderSummary = generateOrderSummary(
    state.items,
    subtotal,
    hasUnpricedItems,
    customerDetails.name ? customerDetails : undefined
  );

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppUrl(orderSummary);
    window.open(url, '_blank');
  };

  const handleCopySummary = async () => {
    const success = await copyToClipboard(orderSummary);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleInstagramCheckout = () => {
    window.open(INSTAGRAM_URL, '_blank');
  };

  return (
    <main className="min-h-screen bg-ivory pt-20 sm:pt-24">
      {/* Header */}
      <div className="bg-blush watercolor-bg py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate text-center">
            {step === 'cart' ? 'Shopping Cart' : step === 'details' ? 'Your Details' : 'Review Order'}
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[
              { key: 'cart', label: 'Cart' },
              { key: 'details', label: 'Details' },
              { key: 'review', label: 'Review' },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step === s.key
                      ? 'bg-chocolate text-ivory'
                      : ['cart'].indexOf(step) < ['cart'].indexOf(s.key as CheckoutStep)
                      ? 'bg-taupe/50 text-muted-brown'
                      : 'bg-peach text-chocolate'
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-xs font-medium text-muted-brown hidden sm:inline">{s.label}</span>
                {i < 2 && <div className="w-8 sm:w-16 h-px bg-taupe/30" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Step 1: Cart ──────────────────────────────── */}
        {step === 'cart' && (
          <div className="animate-fade-in" id="cart-step">
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {state.items.map(item => {
                const unitPrice = item.product.price !== null
                  ? item.product.price + (item.variant?.priceModifier ?? 0)
                  : null;

                return (
                  <div
                    key={`${item.product.id}-${item.variant?.id ?? 'default'}`}
                    className="flex gap-4 p-4 bg-white rounded-xl border border-taupe/15"
                  >
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-cream"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-base font-semibold text-chocolate">{item.product.name}</h3>
                          {item.variant && (
                            <p className="text-xs text-muted-brown mt-0.5">{item.variant.name}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.variant?.id ?? null)}
                          className="p-2 text-muted-brown/40 hover:text-red-500 transition-colors flex-shrink-0"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Customizations display */}
                      {Object.entries(item.customizations).length > 0 && (
                        <div className="mt-2 space-y-0.5">
                          {Object.entries(item.customizations).map(([key, val]) =>
                            val ? (
                              <p key={key} className="text-xs text-muted-brown">
                                {key}: <span className="text-chocolate">{val}</span>
                              </p>
                            ) : null
                          )}
                        </div>
                      )}

                      <div className="flex items-end justify-between mt-3">
                        <div className="flex items-center gap-1.5 bg-cream rounded-full">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant?.id ?? null, item.quantity - 1)}
                            className="p-2 text-muted-brown hover:text-chocolate transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium text-chocolate min-w-[24px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant?.id ?? null, item.quantity + 1)}
                            className="p-2 text-muted-brown hover:text-chocolate transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="text-right">
                          {unitPrice !== null ? (
                            <>
                              <p className="text-lg font-serif font-bold text-chocolate">{formatPrice(unitPrice * item.quantity)}</p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-muted-brown">{formatPrice(unitPrice)} each</p>
                              )}
                            </>
                          ) : (
                            <p className="text-sm text-muted-brown italic">Price on request</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-xl border border-taupe/15 p-6" id="cart-summary">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-brown">Items</span>
                  <span className="text-chocolate font-medium">{itemCount}</span>
                </div>
                {subtotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-brown">Subtotal (priced items)</span>
                    <span className="text-xl font-serif font-bold text-chocolate">{formatPrice(subtotal)}</span>
                  </div>
                )}
              </div>

              {hasUnpricedItems && (
                <div className="p-3 bg-cream rounded-lg mb-4">
                  <p className="text-xs text-muted-brown">
                    ⚠ Some items in your cart require price confirmation. The seller will provide the final total.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setStep('details')}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 bg-chocolate text-ivory rounded-full text-sm font-semibold hover:bg-peach-dark transition-all"
                  id="proceed-to-details"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </button>
                <div className="flex gap-2">
                  <Link
                    to="/shop"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-muted-brown hover:text-chocolate transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-red-400 hover:text-red-600 transition-colors"
                    id="clear-cart-btn"
                  >
                    <Trash2 size={14} />
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Customer Details ─────────────────── */}
        {step === 'details' && (
          <div className="animate-fade-in" id="details-step">
            <div className="bg-white rounded-xl border border-taupe/15 p-6 sm:p-8 mb-6">
              <h2 className="font-serif text-xl font-bold text-chocolate mb-6">Your Details <span className="text-sm font-sans font-normal text-muted-brown">(optional)</span></h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">Name</label>
                  <input
                    type="text"
                    value={customerDetails.name}
                    onChange={e => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-ivory border border-taupe/20 rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={customerDetails.phone}
                    onChange={e => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 bg-ivory border border-taupe/20 rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">Delivery Address</label>
                  <textarea
                    value={customerDetails.address}
                    onChange={e => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                    placeholder="Your delivery address"
                    rows={2}
                    className="w-full px-4 py-3 bg-ivory border border-taupe/20 rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">Additional Notes</label>
                  <textarea
                    value={customerDetails.notes}
                    onChange={e => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                    placeholder="Any special instructions..."
                    rows={2}
                    className="w-full px-4 py-3 bg-ivory border border-taupe/20 rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Channel Selection */}
            <div className="bg-white rounded-xl border border-taupe/15 p-6 sm:p-8 mb-6">
              <h2 className="font-serif text-xl font-bold text-chocolate mb-2">Choose Order Channel</h2>
              <p className="text-sm text-muted-brown mb-6">Select how you'd like to send your order:</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setChannel('whatsapp')}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    channel === 'whatsapp'
                      ? 'border-green-600 bg-green-50'
                      : 'border-taupe/20 hover:border-green-400'
                  }`}
                  id="channel-whatsapp"
                >
                  <MessageCircle size={24} className="text-green-600 mb-2" />
                  <h3 className="font-semibold text-chocolate text-sm mb-1">WhatsApp</h3>
                  <p className="text-xs text-muted-brown">Send your order directly via WhatsApp message.</p>
                </button>

                <button
                  onClick={() => setChannel('instagram')}
                  className={`p-5 rounded-xl border-2 text-left transition-all ${
                    channel === 'instagram'
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-taupe/20 hover:border-pink-400'
                  }`}
                  id="channel-instagram"
                >
                  <Instagram size={24} className="text-pink-500 mb-2" />
                  <h3 className="font-semibold text-chocolate text-sm mb-1">Instagram DM</h3>
                  <p className="text-xs text-muted-brown">Copy your order summary and send via Instagram DM.</p>
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('cart')}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-brown hover:text-chocolate transition-colors"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                onClick={() => channel && setStep('review')}
                disabled={!channel}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all btn-primary ${
                  channel
                    ? 'bg-chocolate text-ivory hover:bg-peach-dark'
                    : 'bg-taupe text-muted-brown cursor-not-allowed'
                }`}
                id="proceed-to-review"
              >
                Review Order
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Order Review ─────────────────────── */}
        {step === 'review' && (
          <div className="animate-fade-in" id="review-step">
            <div className="bg-white rounded-xl border border-taupe/15 p-6 sm:p-8 mb-6">
              <h2 className="font-serif text-xl font-bold text-chocolate mb-4">Order Summary</h2>

              {/* Order preview */}
              <div className="bg-ivory rounded-lg p-4 font-mono text-xs text-chocolate whitespace-pre-wrap leading-relaxed border border-taupe/10 max-h-80 overflow-y-auto mb-4">
                {orderSummary}
              </div>

              <div className="p-3 bg-cream rounded-lg mb-6">
                <p className="text-xs text-muted-brown">
                  ⓘ This is a preview of the message that will be sent to Bloom & Glow.
                  Your order will be <strong>confirmed only after the seller responds</strong>.
                  No payment has been processed.
                </p>
              </div>

              {channel === 'whatsapp' && (
                <button
                  onClick={handleWhatsAppCheckout}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 bg-green-600 text-white rounded-full text-sm font-semibold hover:bg-green-700 transition-all shadow-lg"
                  id="send-whatsapp-btn"
                >
                  <MessageCircle size={18} />
                  Send Order via WhatsApp
                  <ExternalLink size={14} />
                </button>
              )}

              {channel === 'instagram' && (
                <div className="space-y-3">
                  <button
                    onClick={handleCopySummary}
                    className={`btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all ${
                      isCopied
                        ? 'bg-green-600 text-white'
                        : 'bg-chocolate text-ivory hover:bg-peach-dark'
                    }`}
                    id="copy-summary-btn"
                  >
                    {isCopied ? <Check size={18} /> : <Copy size={18} />}
                    {isCopied ? 'Copied to Clipboard!' : 'Copy Order Summary'}
                  </button>

                  <button
                    onClick={handleInstagramCheckout}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all"
                    id="open-instagram-btn"
                  >
                    <Instagram size={18} />
                    Open Instagram Profile
                    <ExternalLink size={14} />
                  </button>

                  <div className="p-3 bg-cream rounded-lg">
                    <p className="text-xs text-muted-brown">
                      📋 Copy the order summary above, then paste it into a <strong>Direct Message</strong> to{' '}
                      <strong>@Bloomandglow24_</strong> on Instagram.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setStep('details')}
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-brown hover:text-chocolate transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Details
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
