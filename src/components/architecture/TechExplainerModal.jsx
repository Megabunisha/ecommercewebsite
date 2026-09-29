import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import {
  Code,
  Layers,
  Database,
  Cpu,
  CheckCircle,
  X,
  ExternalLink,
  BookOpen,
  Zap
} from 'lucide-react';

const TechExplainerModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('redux-vs-context');
  const cartState = useSelector(state => state.cart);
  const wishlistState = useSelector(state => state.wishlist);
  const filterState = useSelector(state => state.filter);
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div
        className="card"
        style={{
          width: '900px',
          maxWidth: '100%',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-tertiary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="brand-icon-box" style={{ width: 34, height: 34 }}>
              <Cpu size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Architecture & Concepts Guide</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                React.js • Redux Toolkit • Context API • React Router v7
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '12px 24px',
            borderBottom: '1px solid var(--border-light)',
            background: 'var(--bg-secondary)',
            overflowX: 'auto',
          }}
        >
          <button
            className={`btn ${activeTab === 'redux-vs-context' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('redux-vs-context')}
          >
            <Layers size={16} /> Redux vs Context
          </button>
          <button
            className={`btn ${activeTab === 'hooks' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('hooks')}
          >
            <Code size={16} /> Advanced Hooks
          </button>
          <button
            className={`btn ${activeTab === 'routing' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('routing')}
          >
            <BookOpen size={16} /> Dynamic Routing
          </button>
          <button
            className={`btn ${activeTab === 'live-inspector' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('live-inspector')}
          >
            <Zap size={16} /> Live State Inspector
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {activeTab === 'redux-vs-context' && (
            <div>
              <h4 style={{ marginBottom: 12 }}>Centralized State Management: When to use what?</h4>
              <p style={{ marginBottom: 20 }}>
                This application deliberately blends <strong>Redux Toolkit</strong> and <strong>React Context API</strong> to showcase their ideal architectural roles.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: 24 }}>
                <div style={{ border: '1px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: 18, background: 'var(--primary-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)', fontWeight: 700, marginBottom: 8 }}>
                    <Database size={18} /> Redux Toolkit (High-Frequency Complex State)
                  </div>
                  <ul style={{ fontSize: '0.9rem', paddingLeft: 18, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <li><strong>Cart Management:</strong> Items array, quantities, promo code calculations, local persistence.</li>
                    <li><strong>Wishlist & Filters:</strong> Search terms, categories, multi-range filtering.</li>
                    <li><strong>Predictable flow:</strong> Strict unidirectional data flow (UI → Dispatch Action → Reducer → New Immutable State → Selector update).</li>
                    <li><strong>Optimized Renders:</strong> Components only re-render if their selected slice value changes (`useSelector`).</li>
                  </ul>
                </div>

                <div style={{ border: '1px solid var(--accent-emerald)', borderRadius: 'var(--radius-md)', padding: 18, background: 'var(--accent-emerald-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-emerald)', fontWeight: 700, marginBottom: 8 }}>
                    <Layers size={18} /> React Context API (Low-Frequency Global State)
                  </div>
                  <ul style={{ fontSize: '0.9rem', paddingLeft: 18, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <li><strong>Theme Mode (`ThemeContext`):</strong> Dark / Light toggle used across root elements.</li>
                    <li><strong>Toast System (`ToastContext`):</strong> Ephemeral alerts triggered by user actions.</li>
                    <li><strong>Lightweight:</strong> Built directly into React without extra libraries. Ideal for app preferences, authentication token sessions, and theme tokens.</li>
                  </ul>
                </div>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: 16, borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>💡 Key takeaway for interviews & exams:</div>
                <div>Use <strong>Redux Toolkit</strong> when state transitions have complex business logic, frequent updates with many dependent components, or need undo/devtools. Use <strong>Context API</strong> for ambient state that rarely changes (like theme, current authenticated user, localization).</div>
              </div>
            </div>
          )}

          {activeTab === 'hooks' && (
            <div>
              <h4 style={{ marginBottom: 12 }}>Essential React Hooks in this Project</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                <div className="card" style={{ padding: 16 }}>
                  <code style={{ color: 'var(--primary)', fontWeight: 700 }}>useSelector()</code>
                  <p style={{ fontSize: '0.85rem', marginTop: 8 }}>Extracts data from the Redux store state using a selector function. Automatically subscribes to store updates.</p>
                </div>
                <div className="card" style={{ padding: 16 }}>
                  <code style={{ color: 'var(--primary)', fontWeight: 700 }}>useDispatch()</code>
                  <p style={{ fontSize: '0.85rem', marginTop: 8 }}>Returns a reference to the Redux dispatch function to trigger actions like `addToCart` or `toggleWishlist`.</p>
                </div>
                <div className="card" style={{ padding: 16 }}>
                  <code style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>useContext()</code>
                  <p style={{ fontSize: '0.85rem', marginTop: 8 }}>Consumes values provided by `ThemeContext.Provider` and `ToastContext.Provider` anywhere in the tree.</p>
                </div>
                <div className="card" style={{ padding: 16 }}>
                  <code style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>useParams()</code>
                  <p style={{ fontSize: '0.85rem', marginTop: 8 }}>Extracts dynamic route parameters (e.g., `:id` in `/product/:id`) to display the selected product details.</p>
                </div>
                <div className="card" style={{ padding: 16 }}>
                  <code style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>useNavigate()</code>
                  <p style={{ fontSize: '0.85rem', marginTop: 8 }}>Enables programmatic client-side routing (e.g., navigating to `/checkout` after adding an item or placing an order).</p>
                </div>
                <div className="card" style={{ padding: 16 }}>
                  <code style={{ color: 'var(--accent-rose)', fontWeight: 700 }}>useMemo() & useEffect()</code>
                  <p style={{ fontSize: '0.85rem', marginTop: 8 }}>`useMemo` caches filtered/sorted product arrays; `useEffect` synchronizes local storage and sets document titles.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'routing' && (
            <div>
              <h4 style={{ marginBottom: 12 }}>React Router v7 Architecture</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: 16 }}>
                The routing system provides instantaneous client-side navigation without full page reloads:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <code style={{ fontWeight: 700, minWidth: 150 }}>/</code>
                  <span style={{ fontSize: '0.9rem' }}>Landing Home Page with Hero Banner, Featured Showcase, Value Props</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <code style={{ fontWeight: 700, minWidth: 150 }}>/products</code>
                  <span style={{ fontSize: '0.9rem' }}>Product catalog with category filters, dynamic pricing filter, search query & sorting</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <code style={{ fontWeight: 700, minWidth: 150 }}>/product/:id</code>
                  <span style={{ fontSize: '0.9rem' }}>Dynamic route fetching the product by ID from catalog with gallery, specs & reviews</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <code style={{ fontWeight: 700, minWidth: 150 }}>/cart</code>
                  <span style={{ fontSize: '0.9rem' }}>Centralized Cart page with promo code validator, quantity adjustments & subtotal</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <code style={{ fontWeight: 700, minWidth: 150 }}>/checkout</code>
                  <span style={{ fontSize: '0.9rem' }}>Multi-step checkout simulation with shipping & payment handling</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <code style={{ fontWeight: 700, minWidth: 150 }}>/order-success</code>
                  <span style={{ fontSize: '0.9rem' }}>Celebration screen with confetti, order reference code & summary</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                  <code style={{ fontWeight: 700, minWidth: 150 }}>/wishlist</code>
                  <span style={{ fontSize: '0.9rem' }}>Personal wishlist with instant 1-click cart transfer</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'live-inspector' && (
            <div>
              <h4 style={{ marginBottom: 12 }}>Live Application State Inspector</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: 16 }}>
                Inspect current real-time Redux and Context state as you interact with the UI:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div className="card" style={{ padding: 16 }}>
                  <h5 style={{ color: 'var(--primary)', marginBottom: 8 }}>Redux: Cart State</h5>
                  <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div><strong>Items Count:</strong> {cartState.items.length}</div>
                    <div><strong>Total Quantity:</strong> {cartState.totalQuantity}</div>
                    <div><strong>Subtotal:</strong> ${cartState.totalAmount.toFixed(2)}</div>
                    <div><strong>Promo Code:</strong> {cartState.promoCode || 'None'}</div>
                    <div><strong>Discount:</strong> {cartState.discountPercent}%</div>
                  </div>
                </div>

                <div className="card" style={{ padding: 16 }}>
                  <h5 style={{ color: 'var(--accent-rose)', marginBottom: 8 }}>Redux: Wishlist State</h5>
                  <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div><strong>Saved Products:</strong> {wishlistState.items.length}</div>
                    <ul style={{ paddingLeft: 18, margin: '4px 0' }}>
                      {wishlistState.items.length === 0 ? (
                        <li style={{ color: 'var(--text-muted)' }}>No items yet</li>
                      ) : (
                        wishlistState.items.map(item => (
                          <li key={item.id}>{item.name.substring(0, 24)}...</li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>

                <div className="card" style={{ padding: 16 }}>
                  <h5 style={{ color: 'var(--accent-cyan)', marginBottom: 8 }}>Context API: Theme</h5>
                  <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div><strong>Current Theme:</strong> <span className="badge badge-primary">{theme}</span></div>
                    <div><strong>Managed By:</strong> React Context API</div>
                    <div><strong>Stored In:</strong> LocalStorage (`nexus_theme`)</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end', background: 'var(--bg-secondary)' }}>
          <button className="btn btn-primary" onClick={onClose}>
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechExplainerModal;
