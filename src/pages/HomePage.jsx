import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import HeroBanner from '../components/home/HeroBanner';
import CategoryPills from '../components/home/CategoryPills';
import ValueProps from '../components/home/ValueProps';
import ProductCard from '../components/common/ProductCard';
import TechExplainerModal from '../components/architecture/TechExplainerModal';
import { ArrowRight, Sparkles, Star, Award, Layers } from 'lucide-react';

const HomePage = () => {
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  return (
    <div className="app-container" style={{ paddingBottom: '60px' }}>
      {/* Hero Banner */}
      <HeroBanner onOpenArchitecture={() => setIsArchitectureModalOpen(true)} />

      {/* Category Pills Navigation */}
      <CategoryPills />

      {/* Featured Products Section */}
      <section style={{ marginBottom: '60px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '6px',
              }}
            >
              <Sparkles size={16} /> Hand-Picked Flagships
            </div>
            <h2>Featured Equipment</h2>
            <p>Our most awarded audio, mechanical, and smart wearable hardware.</p>
          </div>

          <Link
            to="/products"
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Special Promotional Banner */}
      <section
        style={{
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          color: '#ffffff',
          padding: 'clamp(30px, 4vw, 50px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          alignItems: 'center',
          gap: '30px',
          marginBottom: '60px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ zIndex: 2 }}>
          <span className="badge badge-rose" style={{ marginBottom: '16px' }}>LIMITED TIME OFFER</span>
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '14px' }}>
            Get 20% Off Your First Gear Order
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '24px', maxWidth: '480px' }}>
            Use promo code <strong style={{ color: '#38bdf8', letterSpacing: '0.05em' }}>WELCOME20</strong> at checkout to unlock instant discounts. Valid on all flagship ANC headphones and mechanical peripherals.
          </p>
          <Link to="/products" className="btn btn-primary" style={{ padding: '12px 24px' }}>
            Claim 20% Discount <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', zIndex: 2 }}>
          <img
            src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80"
            alt="Mechanical Keyboard Promo"
            style={{
              maxHeight: '260px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              objectFit: 'cover',
            }}
          />
        </div>
      </section>

      {/* Customer Testimonials / Social Proof */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>Verified Reviews</span>
          <h2>Loved by Developers & Sound Engineers</h2>
          <p style={{ maxWidth: '600px', margin: '8px auto 0' }}>
            See why over 12,000 audiophiles and engineers choose NEXUS gear daily.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          <div className="card">
            <div style={{ display: 'flex', gap: '4px', color: 'var(--accent-amber)', marginBottom: '12px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>
              "The AeroPulse Pro ANC headphones completely transformed my deep focus coding sessions. The titanium acoustics and 45h battery life are unrivaled."
            </p>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>David K.</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Staff Frontend Engineer, San Francisco</span>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', gap: '4px', color: 'var(--accent-amber)', marginBottom: '12px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>
              "The Lumix Ergonomic Mechanical keyboard has the most satisfying tactile response and deep creamy clack I've ever felt on a stock board."
            </p>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>Elena R.</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>UX Designer & Streamer, Berlin</span>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', gap: '4px', color: 'var(--accent-amber)', marginBottom: '12px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>
              "Exceptional checkout experience and same-day dispatch. Plus, exploring how Redux Toolkit manages the cart state under the hood is brilliant!"
            </p>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>Marcus T.</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Stack Developer, London</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <ValueProps />

      {/* Architecture Modal */}
      <TechExplainerModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
