import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, addItem, updateQuantity, removeItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Check how many of this product are in the cart
  const cartItems = state.items.filter(item => item.product.id === product.id);
  const totalCartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const primaryItem = cartItems[0] || null;

  const defaultVariant = product.variants.length > 0 ? product.variants[0] : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.available) return;

    addItem(product, defaultVariant, 1);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.available) return;

    if (primaryItem) {
      updateQuantity(product.id, primaryItem.variant?.id ?? null, primaryItem.quantity + 1);
    } else {
      addItem(product, defaultVariant, 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!primaryItem) return;

    if (primaryItem.quantity > 1) {
      updateQuantity(product.id, primaryItem.variant?.id ?? null, primaryItem.quantity - 1);
    } else {
      removeItem(product.id, primaryItem.variant?.id ?? null);
    }
  };

  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden border border-taupe/20" id={`product-${product.id}`}>
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-cream">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.id === 'rg-001' && (
            <span className="px-2.5 py-1 bg-amber-600 text-ivory text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1 border border-amber-300/40">
              Festive Offer
            </span>
          )}
          {product.comingSoon ? (
            <span className="px-2.5 py-1 bg-amber-600 text-ivory text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              Coming Soon
            </span>
          ) : (
            <>
              {product.newArrival && (
                <span className="px-2.5 py-1 bg-chocolate text-ivory text-[10px] font-semibold uppercase tracking-wider rounded-full">
                  New
                </span>
              )}
              {product.featured && product.id !== 'rg-001' && (
                <span className="px-2.5 py-1 bg-peach text-chocolate text-[10px] font-semibold uppercase tracking-wider rounded-full">
                  Featured
                </span>
              )}
              {!product.available && (
                <span className="px-2.5 py-1 bg-muted-brown text-ivory text-[10px] font-semibold uppercase tracking-wider rounded-full">
                  Sold Out
                </span>
              )}
            </>
          )}
        </div>

        {/* In Cart Badge on Image */}
        {totalCartQuantity > 0 && (
          <div className="absolute bottom-2.5 right-2.5 z-10 animate-fade-in">
            <span className="bg-chocolate/90 backdrop-blur-sm text-ivory text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-white/20">
              <ShoppingBag size={11} />
              {totalCartQuantity} in cart
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-chocolate/0 group-hover:bg-chocolate/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="flex items-center gap-2 bg-ivory/95 backdrop-blur-sm text-chocolate px-4 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye size={16} />
            View Details
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-brown/70 mb-1">
          {product.category.replace(/-/g, ' ')}
        </p>

        {/* Name */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-base font-semibold text-chocolate leading-snug mb-1 group-hover:text-peach-dark transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description preview */}
        <p className="text-xs text-muted-brown/80 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Special Offer Highlight for Raas Glow */}
        {product.id === 'rg-001' && (
          <div className="mb-3 p-2.5 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950">
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="font-bold text-amber-900 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                BUY 9 PAIRS
              </span>
              <div className="flex items-baseline gap-1">
                <span className="line-through text-muted-brown/60 text-[10px]">₹1999</span>
                <span className="font-extrabold text-amber-900 text-xs">₹1699</span>
              </div>
            </div>
            <p className="text-[10px] text-amber-700 font-medium text-right">
              just ₹189 / pair • Save ₹300!
            </p>
          </div>
        )}

        {/* Variants preview */}
        {product.variants.length > 0 && product.id !== 'rg-001' && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-[10px] text-muted-brown/60">{product.variants.length} variants</span>
            <div className="flex gap-0.5">
              {product.variants.slice(0, 4).map(v => (
                <span key={v.id} className="w-2 h-2 rounded-full bg-peach/40 border border-peach/60" />
              ))}
              {product.variants.length > 4 && (
                <span className="text-[10px] text-muted-brown/60">+{product.variants.length - 4}</span>
              )}
            </div>
          </div>
        )}

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-taupe/20">
          <div>
            {product.priceOnRequest ? (
              <span className="text-sm font-medium text-muted-brown italic">Price on request</span>
            ) : (
              <div className="flex flex-col">
                <span className="text-lg font-serif font-bold text-chocolate">
                  {formatPrice(product.price!)}
                  {product.id === 'rg-001' && (
                    <span className="text-xs font-normal text-muted-brown ml-1">/ pair</span>
                  )}
                </span>
                {product.id === 'rg-001' && (
                  <span className="text-[10px] text-amber-800 font-semibold">
                    Festive Offer Available
                  </span>
                )}
              </div>
            )}
          </div>

          {product.comingSoon ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
              Coming Soon
            </span>
          ) : product.available ? (
            totalCartQuantity > 0 ? (
              <div 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                className="inline-flex items-center bg-chocolate text-ivory rounded-full shadow-md overflow-hidden p-0.5 border border-chocolate transition-all animate-fade-in"
              >
                <button
                  onClick={handleDecrement}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-peach-dark active:scale-90 transition-all text-ivory"
                  aria-label={`Decrease ${product.name} quantity`}
                >
                  <Minus size={13} strokeWidth={2.5} />
                </button>

                <span className="min-w-6 px-1.5 text-center text-xs font-bold text-ivory select-none">
                  {totalCartQuantity}
                </span>

                <button
                  onClick={handleIncrement}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-peach-dark active:scale-90 transition-all text-ivory"
                  aria-label={`Increase ${product.name} quantity`}
                >
                  <Plus size={13} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleQuickAdd}
                className={`btn-primary flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isAdding
                    ? 'bg-green-700 text-ivory scale-105'
                    : 'bg-chocolate text-ivory hover:bg-peach-dark'
                }`}
                aria-label={`Add ${product.name} to cart`}
              >
                <Plus size={14} />
                {isAdding ? 'Added!' : 'Add'}
              </button>
            )
          ) : (
            <span className="text-xs text-muted-brown italic">Sold Out</span>
          )}
        </div>
      </div>
    </div>
  );
}
