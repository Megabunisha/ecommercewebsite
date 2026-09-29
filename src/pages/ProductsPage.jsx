import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  setSearchQuery,
  setSelectedCategory,
  setMaxPrice,
  setSortBy,
  setInStockOnly,
  setMinRating,
  resetFilters,
} from '../features/filter/filterSlice';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/common/ProductCard';
import StarRating from '../components/common/StarRating';
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  Grid3X3,
  List,
  PackageOpen,
  Check
} from 'lucide-react';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = React.useState('grid'); // 'grid' | 'list'

  const {
    searchQuery,
    selectedCategory,
    maxPrice,
    sortBy,
    inStockOnly,
    minRating,
  } = useSelector((state) => state.filter);

  // Filter & Sort Logic with useMemo
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // Stock filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, maxPrice, sortBy, inStockOnly, minRating]);

  return (
    <div className="app-container" style={{ padding: '30px 20px 80px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>Products Catalog</h1>
        <p>Explore precision audio hardware, high-end keyboards, and smart wearables.</p>
      </div>

      {/* Main Grid: Sidebar Filters + Products Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '32px',
          alignItems: 'start',
        }}
      >
        {/* Filters Sidebar */}
        <aside
          className="card"
          style={{
            position: 'sticky',
            top: '90px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
              <SlidersHorizontal size={18} color="var(--primary)" />
              <span>Filters</span>
            </div>
            <button
              onClick={() => dispatch(resetFilters())}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                fontWeight: 600,
              }}
              title="Reset all filters"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          {/* Search Box */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
              Search Catalog
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Product name, specs..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                style={{ width: '100%', paddingLeft: '36px', height: '40px' }}
              />
            </div>
          </div>

          {/* Category Select */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px' }}>
              Category
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => dispatch(setSelectedCategory(cat.id))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: selectedCategory === cat.id ? 'var(--primary-light)' : 'transparent',
                    color: selectedCategory === cat.id ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: selectedCategory === cat.id ? 700 : 500,
                    fontSize: '0.9rem',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <span>{cat.name}</span>
                  {selectedCategory === cat.id && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>Max Price</span>
              <span style={{ color: 'var(--primary)', fontWeight: 800 }}>${maxPrice}</span>
            </div>
            <input
              type="range"
              min="50"
              max="800"
              step="25"
              value={maxPrice}
              onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
              style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>$50</span>
              <span>$800</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
              Minimum Rating
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[0, 4.5, 4.8].map((stars) => (
                <button
                  key={stars}
                  onClick={() => dispatch(setMinRating(stars))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: minRating === stars ? 'var(--primary-light)' : 'transparent',
                    color: minRating === stars ? 'var(--primary)' : 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    fontWeight: minRating === stars ? 700 : 500,
                  }}
                >
                  <span>{stars === 0 ? 'All Ratings' : `${stars}+ Stars`}</span>
                  {stars > 0 && <StarRating rating={stars} size={13} />}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Only Checkbox */}
          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => dispatch(setInStockOnly(e.target.checked))}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <span>In-stock items only</span>
            </label>
          </div>
        </aside>

        {/* Products Listing Main Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Controls Bar: Count, Sort Dropdown, View Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              padding: '16px 20px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '24px',
            }}
          >
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredProducts.length}</strong> products
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Sort By Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                  style={{ height: '36px', padding: '0 12px', fontSize: '0.85rem' }}
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>

              {/* View Toggle (Grid / List) */}
              <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '2px' }}>
                <button
                  className="btn-icon"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--radius-sm)',
                    background: viewMode === 'grid' ? 'var(--bg-secondary)' : 'transparent',
                    color: viewMode === 'grid' ? 'var(--primary)' : 'var(--text-muted)',
                  }}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                  aria-label="Grid View"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  className="btn-icon"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--radius-sm)',
                    background: viewMode === 'list' ? 'var(--bg-secondary)' : 'transparent',
                    color: viewMode === 'list' ? 'var(--primary)' : 'var(--text-muted)',
                  }}
                  onClick={() => setViewMode('list')}
                  title="List View"
                  aria-label="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Products Results */}
          {filteredProducts.length === 0 ? (
            <div
              className="card"
              style={{
                padding: '60px 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: 'var(--text-muted)',
                }}
              >
                <PackageOpen size={32} />
              </div>
              <h3 style={{ marginBottom: '8px' }}>No products match your criteria</h3>
              <p style={{ maxWidth: '400px', marginBottom: '24px' }}>
                Try relaxing your price filters, clearing search queries, or checking other categories.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => dispatch(resetFilters())}
              >
                <RotateCcw size={16} /> Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                gap: '24px',
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* List View */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="card"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '24px',
                    padding: '20px',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: 'var(--radius-md)',
                      objectFit: 'cover',
                      background: 'var(--bg-tertiary)',
                    }}
                  />
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div className="product-category-text">{product.category}</div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{product.name}</h3>
                    <p style={{ fontSize: '0.85rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      {product.tagline}
                    </p>
                    <StarRating rating={product.rating} reviewCount={product.reviewCount} showNumber />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>${product.price}</div>
                    <button
                      className="btn btn-primary"
                      onClick={() => dispatch({ type: 'cart/addToCart', payload: { ...product, quantity: 1 } })}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
