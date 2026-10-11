import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { assetUrl } from '../utils/assets';

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const { itemCount, setCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/custom-orders', label: 'Custom Orders' },
    { to: '/about', label: 'About' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-[0_1px_20px_rgba(104,48,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile menu button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-chocolate hover:text-peach-dark transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Wordmark with Logo Emblem */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group" id="brand-logo">
            <img
              src={assetUrl('/images/logo_emblem.png')}
              alt="Bloom & Glow Emblem"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold text-chocolate tracking-wide group-hover:text-peach-dark transition-colors duration-300 leading-tight">
                Bloom & Glow
              </span>
              <span className="font-script text-xs sm:text-sm text-muted-brown -mt-0.5 opacity-80">
                handcrafted with love
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                  location.pathname === link.to
                    ? 'text-chocolate'
                    : 'text-muted-brown hover:text-chocolate'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-peach transition-all duration-300 ${
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="hidden sm:flex p-2 text-muted-brown hover:text-chocolate transition-colors"
              aria-label="Search products"
              id="search-btn"
            >
              <Search size={20} />
            </Link>

            <button
              id="cart-toggle"
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-muted-brown hover:text-chocolate transition-colors"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-chocolate text-ivory text-[10px] font-bold px-1 animate-scale-in">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-ivory/98 backdrop-blur-md border-t border-taupe/30 animate-fade-in" id="mobile-menu">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'bg-blush text-chocolate'
                    : 'text-muted-brown hover:bg-blush/50 hover:text-chocolate'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
