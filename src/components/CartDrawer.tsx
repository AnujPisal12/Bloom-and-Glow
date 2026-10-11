import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CartDrawer() {
  const {
    state,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
    hasUnpricedItems,
    isCartOpen,
    setCartOpen,
  } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" id="cart-drawer">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-chocolate/30 backdrop-blur-sm animate-fade-in"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md glass-panel shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-taupe/20">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-chocolate" />
            <h2 className="font-serif text-lg font-bold text-chocolate">Your Cart</h2>
            {itemCount > 0 && (
              <span className="text-xs font-medium text-muted-brown bg-blush px-2 py-0.5 rounded-full">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 text-muted-brown hover:text-chocolate transition-colors rounded-full hover:bg-blush"
            aria-label="Close cart"
            id="cart-drawer-close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 rounded-full bg-blush flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-muted-brown/50" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-chocolate mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-muted-brown mb-6">
                Explore our collection and find something you love.
              </p>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="btn-primary bg-chocolate text-ivory px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-peach-dark transition-colors"
              >
                Browse Collection
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {state.items.map(item => {
                const unitPrice = item.product.price !== null
                  ? item.product.price + (item.variant?.priceModifier ?? 0)
                  : null;

                return (
                  <div
                    key={`${item.product.id}-${item.variant?.id ?? 'default'}`}
                    className="flex gap-3 p-3 bg-white rounded-xl border border-taupe/15 animate-fade-in"
                  >
                    {/* Image */}
                    <Link
                      to={`/product/${item.product.slug}`}
                      onClick={() => setCartOpen(false)}
                      className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-cream"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-chocolate truncate">
                        {item.product.name}
                      </h4>
                      {item.variant && (
                        <p className="text-[11px] text-muted-brown mt-0.5">{item.variant.name}</p>
                      )}

                      {unitPrice !== null ? (
                        <p className="text-sm font-semibold text-chocolate mt-1">{formatPrice(unitPrice)}</p>
                      ) : (
                        <p className="text-xs text-muted-brown italic mt-1">Price on request</p>
                      )}

                      {/* Quantity controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 bg-cream rounded-full">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant?.id ?? null, item.quantity - 1)}
                            className="p-1.5 text-muted-brown hover:text-chocolate transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium text-chocolate min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant?.id ?? null, item.quantity + 1)}
                            className="p-1.5 text-muted-brown hover:text-chocolate transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id, item.variant?.id ?? null)}
                          className="p-1.5 text-muted-brown/50 hover:text-red-500 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-taupe/20 px-6 py-4 bg-ivory/80">
            {/* Subtotal */}
            {subtotal > 0 && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-brown">Subtotal (priced items)</span>
                <span className="text-lg font-serif font-bold text-chocolate">{formatPrice(subtotal)}</span>
              </div>
            )}

            {hasUnpricedItems && (
              <p className="text-xs text-muted-brown italic mb-3">
                ⚠ Some items require price confirmation from the seller.
              </p>
            )}

            <div className="flex flex-col gap-2">
              <Link
                to="/cart"
                onClick={() => setCartOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-chocolate text-ivory rounded-full text-sm font-semibold hover:bg-peach-dark transition-colors btn-primary"
                id="view-cart-btn"
              >
                View Full Cart
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
