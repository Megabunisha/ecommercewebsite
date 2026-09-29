import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home, ShoppingBag } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="app-container" style={{ padding: '100px 20px', textAlign: 'center' }}>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}
      >
        <HelpCircle size={44} />
      </div>
      <h1 style={{ fontSize: '3rem', marginBottom: '12px' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Page Not Found</h2>
      <p style={{ maxWidth: '440px', margin: '0 auto 32px', color: 'var(--text-secondary)' }}>
        The page you are trying to visit doesn't exist or may have been moved.
      </p>
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} /> Return to Home
        </Link>
        <Link to="/products" className="btn btn-secondary">
          <ShoppingBag size={16} /> Browse Products
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
