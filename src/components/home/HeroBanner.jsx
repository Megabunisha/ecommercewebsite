import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Zap, Star } from 'lucide-react';

const HeroBanner = ({ onOpenArchitecture }) => {
  return (
    <section
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--grad-hero)',
        color: '#ffffff',
        overflow: 'hidden',
        padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 60px)',
        margin: '24px 0 60px',
        boxShadow: 'var(--shadow-xl)',
      }}
    >
      {/* Decorative background glow circles */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '10%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {/* Left Column: Headline and CTAs */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '20px',
              color: '#38bdf8',
            }}
          >
            <Sparkles size={16} /> NEXT-GEN AUDIO & COMPUTING
          </div>

          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.1,
              marginBottom: '20px',
              fontWeight: 800,
            }}
          >
            Engineered For <span className="text-gradient">Precision</span> & Peak Sound.
          </h1>

          <p
            style={{
              color: '#94a3b8',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '32px',
              maxWidth: '520px',
            }}
          >
            Experience audiophile acoustics, titanium wearables, and tactile mechanical workstations. Powered by state-of-the-art React and Redux state management.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              to="/products"
              className="btn btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '1rem',
                borderRadius: 'var(--radius-md)',
              }}
            >
              Explore Collection <ArrowRight size={18} />
            </Link>

            <button
              onClick={onOpenArchitecture}
              className="btn btn-secondary"
              style={{
                padding: '14px 24px',
                fontSize: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Zap size={18} color="#f59e0b" /> Tech Architecture
            </button>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>4.9/5</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Over 12,000 Reviews</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.15)' }} />
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Free</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Global Shipping $100+</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.15)' }} />
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>2 Years</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Hardware Warranty</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Showcase Image with Floating Glass Badges */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
              alt="AeroPulse Pro Headphones"
              style={{
                width: '100%',
                height: '380px',
                objectFit: 'cover',
              }}
            />

            {/* Floating Glass Badge 1 */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star size={16} fill="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Flagship Choice</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>AeroPulse Pro ANC</div>
              </div>
            </div>

            {/* Floating Glass Badge 2 */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span className="badge badge-rose">20% OFF</span>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>$299</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
