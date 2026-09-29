import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartDrawer } from '../../features/cart/cartSlice';
import { setSearchQuery } from '../../features/filter/filterSlice';
import { useTheme } from '../../context/ThemeContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import TechExplainerModal from '../architecture/TechExplainerModal';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      dispatch(setSearchQuery(localSearch.trim()));
      navigate('/products');
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="app-container navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="brand-icon-box">
              <ShoppingBag size={20} />
            </div>
            <span>NEXUS</span>
          </Link>

          {/* Desktop Search Bar */}
          <form className="nav-search-bar" onSubmit={handleSearchSubmit}>
            <Search size={16} className="nav-search-icon" />
            <input
              type="text"
              placeholder="Search products, gear..."
              className="nav-search-input"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </form>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Products
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => setIsExplainerOpen(true)}
                  className="nav-link"
                  style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  <Cpu size={15} color="var(--primary)" />
                  <span>Architecture</span>
                </button>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  About
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Action Icons */}
          <div className="nav-actions">
            {/* Theme Toggle */}
            <button
              className="btn-icon"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="btn-icon"
              style={{ position: 'relative' }}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && <span className="badge-counter">{wishlistCount}</span>}
            </Link>

            {/* Cart Button (Opens slide-over cart drawer) */}
            <button
              className="btn-icon"
              style={{ position: 'relative' }}
              onClick={() => dispatch(toggleCartDrawer(true))}
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {totalQuantity > 0 && <span className="badge-counter">{totalQuantity}</span>}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              className="btn-icon mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg-secondary)',
            zIndex: 999,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search gear, wearables..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{ width: '100%', paddingLeft: 42 }}
            />
          </form>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: 10 }}>
            <Link
              to="/"
              style={{ fontSize: '1.2rem', fontWeight: 600, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              style={{ fontSize: '1.2rem', fontWeight: 600, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Products Catalog
            </Link>
            <Link
              to="/cart"
              style={{ fontSize: '1.2rem', fontWeight: 600, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shopping Cart ({totalQuantity})
            </Link>
            <Link
              to="/wishlist"
              style={{ fontSize: '1.2rem', fontWeight: 600, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Wishlist ({wishlistCount})
            </Link>
            <Link
              to="/about"
              style={{ fontSize: '1.2rem', fontWeight: 600, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              About Project
            </Link>
            <button
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: 10 }}
              onClick={() => {
                setMobileMenuOpen(false);
                setIsExplainerOpen(true);
              }}
            >
              <Cpu size={16} /> Architecture Guide
            </button>
          </nav>
        </div>
      )}

      {/* Architecture Explainer Modal */}
      <TechExplainerModal
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />
    </>
  );
};

export default Navbar;
