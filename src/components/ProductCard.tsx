import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.available) return;

    const defaultVariant = product.variants.length > 0 ? product.variants[0] : null;
    addItem(product, defaultVariant, 1);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1200);
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
              {product.featured && (
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

        {/* Variants preview */}
        {product.variants.length > 0 && (
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
              <span className="text-lg font-serif font-bold text-chocolate">
                {formatPrice(product.price!)}
              </span>
            )}
          </div>

          {product.comingSoon ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
              Coming Soon
            </span>
          ) : product.available ? (
            <button
              onClick={handleQuickAdd}
              className={`btn-primary flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                isAdding
                  ? 'bg-green-700 text-ivory'
                  : 'bg-chocolate text-ivory hover:bg-peach-dark'
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag size={14} />
              {isAdding ? 'Added!' : 'Add'}
            </button>
          ) : (
            <span className="text-xs text-muted-brown italic">Sold Out</span>
          )}
        </div>
      </div>
    </div>
  );
}
