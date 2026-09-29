import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  toggleCartDrawer,
  removeFromCart,
  updateQuantity,
  clearCart
} from '../../features/cart/cartSlice';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalQuantity, totalAmount, discountPercent, isDrawerOpen } = useSelector(
    (state) => state.cart
  );

  if (!isDrawerOpen) return null;

  const discountAmount = (totalAmount * discountPercent) / 100;
  const finalTotal = Math.max(0, totalAmount - discountAmount);

  const handleCheckout = () => {
    dispatch(toggleCartDrawer(false));
    navigate('/checkout');
  };

  const handleViewFullCart = () => {
    dispatch(toggleCartDrawer(false));
    navigate('/cart');
  };

  return (
    <>
      <div
        className="drawer-overlay"
        onClick={() => dispatch(toggleCartDrawer(false))}
      />
      <aside className="cart-drawer" aria-label="Shopping Cart">
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="brand-icon-box" style={{ width: 32, height: 32 }}>
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Shopping Bag</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            className="btn-icon"
            onClick={() => dispatch(toggleCartDrawer(false))}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 24px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                marginBottom: 20,
              }}
            >
              <ShoppingBag size={34} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Your bag is empty</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 24 }}>
              Explore our tech and lifestyle catalog and discover exceptional equipment.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(toggleCartDrawer(false));
                navigate('/products');
              }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((item) => (
                <div key={item.id} className="drawer-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="drawer-item-img"
                  />
                  <div className="drawer-item-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <h4
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          margin: 0,
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          dispatch(toggleCartDrawer(false));
                          navigate(`/product/${item.id}`);
                        }}
                      >
                        {item.name}
                      </h4>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        style={{ color: 'var(--text-muted)', padding: '2px' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                      <div className="qty-stepper">
                        <button
                          className="qty-btn"
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-display">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          disabled={item.quantity >= (item.stock || 99)}
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="drawer-footer">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span style={{ fontWeight: 700 }}>${totalAmount.toFixed(2)}</span>
              </div>

              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--accent-emerald)' }}>
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  paddingTop: 8,
                  borderTop: '1px solid var(--border-light)',
                }}
              >
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: 6 }}>
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={handleViewFullCart}
                >
                  View Cart
                </button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1.4 }}
                  onClick={handleCheckout}
                >
                  Checkout <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
