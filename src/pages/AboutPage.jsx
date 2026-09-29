import React from 'react';
import { Layers, Database, Code, CheckCircle2, Cpu, Globe, GitBranch } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="app-container" style={{ padding: '40px 20px 80px', maxWidth: '1000px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
          Educational Project Architecture
        </span>
        <h1 style={{ fontSize: '2.6rem', marginBottom: '16px' }}>
          E-Commerce Frontend with Redux & Context API
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          A production-grade React application developed to demonstrate advanced architectural patterns, dynamic routing, and centralized multi-slice state management.
        </p>
      </div>

      {/* Core Objectives Grid */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '20px' }}>Project Learning Objectives</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', marginBottom: '12px' }}>
              <Code size={20} />
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Advanced React Concepts</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>✓ Modern functional components with strict separation of concerns</li>
              <li>✓ Custom Hooks & core hooks (`useMemo`, `useEffect`, `useState`, `useCallback`)</li>
              <li>✓ Component reusability with flexible prop patterns</li>
              <li>✓ Conditional rendering for loading, empty, and active cart states</li>
            </ul>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', marginBottom: '12px' }}>
              <Globe size={20} />
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>React Router Navigation</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>✓ Dynamic routing parameters with `/product/:id` and `useParams`</li>
              <li>✓ Programmatic navigation with `useNavigate` for checkout flows</li>
              <li>✓ Nested UI components with scroll restoration</li>
              <li>✓ 404 catch-all routes and seamless client-side page transitions</li>
            </ul>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-cyan)', marginBottom: '12px' }}>
              <Database size={20} />
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Centralized State Management</h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>✓ <strong>Redux Toolkit (`@reduxjs/toolkit`):</strong> Dedicated slices for Cart, Wishlist, and Filter state</li>
              <li>✓ <strong>React Context API:</strong> Global Theme switching (`ThemeContext`) and alert notifications (`ToastContext`)</li>
              <li>✓ Persistent local storage synchronization across browser sessions</li>
              <li>✓ Unidirectional data flow and predictable reducer state transformations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* State Architecture Table */}
      <section className="card" style={{ padding: '32px', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>State Architecture Distribution</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-medium)' }}>
                <th style={{ padding: '12px 16px' }}>Feature Domain</th>
                <th style={{ padding: '12px 16px' }}>Technology Used</th>
                <th style={{ padding: '12px 16px' }}>Managed Actions / Values</th>
                <th style={{ padding: '12px 16px' }}>Architectural Rationale</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700 }}>Cart Management</td>
                <td style={{ padding: '12px 16px' }}><span className="badge badge-primary">Redux Toolkit</span></td>
                <td style={{ padding: '12px 16px' }}>`addToCart`, `updateQuantity`, `removeFromCart`, `applyPromo`, `clearCart`</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Complex calculations, frequent updates, immutable state updates.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700 }}>Wishlist</td>
                <td style={{ padding: '12px 16px' }}><span className="badge badge-primary">Redux Toolkit</span></td>
                <td style={{ padding: '12px 16px' }}>`toggleWishlist`, `clearWishlist`</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Cross-component state shared between badges, cards, and wishlist view.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700 }}>Product Filter & Search</td>
                <td style={{ padding: '12px 16px' }}><span className="badge badge-primary">Redux Toolkit</span></td>
                <td style={{ padding: '12px 16px' }}>`setSearchQuery`, `setSelectedCategory`, `setMaxPrice`, `setSortBy`</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Centralized search accessible from navbar and category filter drawer.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700 }}>Dark/Light Theme</td>
                <td style={{ padding: '12px 16px' }}><span className="badge badge-emerald">Context API</span></td>
                <td style={{ padding: '12px 16px' }}>`theme`, `toggleTheme`</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Infrequent updates applied at DOM root level. Ideal for Context.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 700 }}>Toast Notifications</td>
                <td style={{ padding: '12px 16px' }}><span className="badge badge-emerald">Context API</span></td>
                <td style={{ padding: '12px 16px' }}>`addToast(message, type)`, `removeToast(id)`</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>Lightweight global alert trigger without Redux boilerplate.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Technologies Used Banner */}
      <section style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '16px' }}>Built with Cutting-Edge Modern Web Technologies</h3>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span className="badge badge-primary">React 19</span>
          <span className="badge badge-emerald">Vite 8</span>
          <span className="badge badge-rose">Redux Toolkit 2</span>
          <span className="badge badge-amber">React-Redux 9</span>
          <span className="badge badge-primary">React Router v7</span>
          <span className="badge badge-emerald">Lucide Icons</span>
          <span className="badge badge-rose">HTML5 / Modern CSS3</span>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
