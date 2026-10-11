import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Grid3X3, LayoutList, Search, X } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeCategory = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.replace(/-/g, ' ').toLowerCase().includes(q) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const activeCategoryInfo = categories.find(c => c.slug === activeCategory);

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
    setMobileFilterOpen(false);
  };

  return (
    <main className="min-h-screen bg-ivory pt-20 sm:pt-24">
      {/* Page Header */}
      <section className="bg-blush watercolor-bg py-12 sm:py-16" id="shop-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="font-script text-xl text-peach-dark mb-2">Our Collection</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-chocolate mb-4">
              {activeCategoryInfo ? activeCategoryInfo.name : 'Shop All'}
            </h1>
            {activeCategoryInfo && (
              <p className="text-muted-brown max-w-lg mx-auto">{activeCategoryInfo.description}</p>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar Filters ──────────────────────────────── */}
          <aside className={`lg:w-64 flex-shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`} id="shop-filters">
            <div className="bg-white rounded-2xl p-5 border border-taupe/15 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-chocolate">Collections</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="lg:hidden p-1 text-muted-brown hover:text-chocolate"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === 'all'
                      ? 'bg-chocolate text-ivory'
                      : 'text-muted-brown hover:bg-blush hover:text-chocolate'
                  }`}
                  id="filter-all"
                >
                  All Products
                  <span className="ml-2 text-xs opacity-70">({products.length})</span>
                </button>

                {categories.map(cat => {
                  const count = products.filter(p => p.category === cat.slug).length;
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        activeCategory === cat.slug
                          ? 'bg-chocolate text-ivory'
                          : 'text-muted-brown hover:bg-blush hover:text-chocolate'
                      }`}
                      id={`filter-${cat.slug}`}
                    >
                      {cat.name}
                      <span className="ml-2 text-xs opacity-70">({count})</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ── Products Area ────────────────────────────────── */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-taupe/20 text-sm font-medium text-chocolate hover:bg-blush transition-colors"
                  id="mobile-filter-toggle"
                >
                  <Filter size={16} />
                  Filters
                </button>

                <p className="text-sm text-muted-brown">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-brown/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="pl-9 pr-4 py-2 bg-white rounded-full border border-taupe/20 text-sm text-chocolate placeholder-muted-brown/40 focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50 w-40 sm:w-56 transition-all"
                    id="product-search"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-brown/40 hover:text-chocolate"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* View mode */}
                <div className="hidden sm:flex items-center bg-white rounded-full border border-taupe/20 p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-full transition-colors ${
                      viewMode === 'grid' ? 'bg-chocolate text-ivory' : 'text-muted-brown hover:text-chocolate'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-full transition-colors ${
                      viewMode === 'list' ? 'bg-chocolate text-ivory' : 'text-muted-brown hover:text-chocolate'
                    }`}
                    aria-label="List view"
                  >
                    <LayoutList size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid / List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-blush mx-auto flex items-center justify-center mb-4">
                  <Search size={32} className="text-muted-brown/40" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-chocolate mb-2">No products found</h3>
                <p className="text-muted-brown text-sm mb-4">Try adjusting your search or browse a different collection.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    handleCategoryChange('all');
                  }}
                  className="text-sm font-medium text-peach-dark hover:text-chocolate underline underline-offset-4 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                className={`${
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                } stagger-children`}
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
