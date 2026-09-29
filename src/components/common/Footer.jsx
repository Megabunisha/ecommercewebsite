import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      addToast('Thank you for subscribing! Check your inbox for $20 off coupon.', 'success');
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        marginTop: 'auto',
        paddingTop: '60px',
        paddingBottom: '30px',
      }}
    >
      <div className="app-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          {/* Brand Info */}
          <div>
            <Link to="/" className="brand-logo" style={{ marginBottom: '16px' }}>
              <div className="brand-icon-box">
                <ShoppingBag size={20} />
              </div>
              <span>NEXUS</span>
            </Link>
            <p style={{ fontSize: '0.9rem', marginBottom: '20px', maxWidth: '300px' }}>
              Advanced E-Commerce platform engineered with React 19, Redux Toolkit, Context API, and modern component architecture.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">React 19</span>
              <span className="badge badge-emerald">Redux Toolkit</span>
              <span className="badge badge-amber">Context API</span>
              <span className="badge badge-rose">React Router v7</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Explore Store</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/products" style={{ color: 'var(--text-secondary)' }}>All Products</Link></li>
              <li><Link to="/products?category=audio" style={{ color: 'var(--text-secondary)' }}>Audio & Headphones</Link></li>
              <li><Link to="/products?category=wearables" style={{ color: 'var(--text-secondary)' }}>Smart Wearables</Link></li>
              <li><Link to="/products?category=computing" style={{ color: 'var(--text-secondary)' }}>Keyboards & Computing</Link></li>
              <li><Link to="/wishlist" style={{ color: 'var(--text-secondary)' }}>Saved Wishlist</Link></li>
            </ul>
          </div>

          {/* Architecture & Objectives */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Learning Objectives</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>✓ Advanced Functional Components & Hooks</li>
              <li>✓ Centralized Redux Cart & Wishlist</li>
              <li>✓ React Context Theme & Toast</li>
              <li>✓ Dynamic URL Parameters (`/product/:id`)</li>
              <li>✓ Responsive Glassmorphism Design</li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Stay Updated</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '14px' }}>
              Subscribe for exclusive member drops, new gear releases, and architecture tips.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, height: '42px', fontSize: '0.85rem' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 16px', height: '42px' }}>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} NEXUS Store. Designed for Advanced React & State Management Mastery.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={16} color="var(--accent-emerald)" /> 256-Bit SSL Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
