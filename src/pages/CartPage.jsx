import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  applyPromo,
  removePromo
} from '../features/cart/cartSlice';
import { useToast } from '../context/ToastContext';
import { PROMO_CODES } from '../data/products';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  Check,
  RotateCcw
} from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [promoInput, setPromoInput] = useState('');

  const { items, totalQuantity, totalAmount, promoCode, discountPercent } = useSelector(
    (state) => state.cart
  );

  const discountAmount = (totalAmount * discountPercent) / 100;
  const isFreeShipping = totalAmount >= 100 || (promoCode && PROMO_CODES[promoCode]?.freeShipping);
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 15;
  const estimatedTax = (totalAmount - discountAmount) * 0.08;
  const grandTotal = Math.max(0, totalAmount - discountAmount + shippingCost + estimatedTax);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      dispatch(applyPromo(code));
      addToast(`Promo code "${code}" applied! ${PROMO_CODES[code].description}`, 'success');
      setPromoInput('');
    } else {
      addToast(`Invalid promo code "${code}". Try "WELCOME20" or "REACTPRO"`, 'error');
    }
  };

  const handleRemovePromo = () => {
    dispatch(removePromo());
    addToast('Promo code removed', 'info');
  };

  if (items.length === 0) {
    return (
      <div className="app-container" style={{ padding: '80px 20px', textAlign: 'center' }}>
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
          <ShoppingBag size={40} />
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '12px' }}>Your Shopping Cart is Empty</h1>
        <p style={{ maxWidth: '440px', margin: '0 auto 28px', color: 'var(--text-secondary)' }}>
          Looks like you haven't added any gear to your cart yet. Explore our curated catalog of audiophile audio, mechanical gear, and wearables.
        </p>
        <Link to="/products" className="btn btn-primary" style={{ padding: '12px 28px' }}>
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ padding: '30px 20px 80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>Shopping Cart</h1>
          <p>Review your selected gear before moving to checkout.</p>
        </div>
        <button
          onClick={() => {
            dispatch(clearCart());
            addToast('Cart cleared', 'info');
          }}
          className="btn btn-outline"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Cart Items List */}
        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                padding: '20px',
                alignItems: 'center',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover',
                  background: 'var(--bg-tertiary)',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/product/${item.id}`)}
              />

              <div style={{ flex: 1, minWidth: '180px' }}>
                <span className="product-category-text" style={{ fontSize: '0.75rem' }}>
                  {item.category}
                </span>
                <h3
                  style={{ fontSize: '1.05rem', margin: '4px 0 6px', cursor: 'pointer' }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  {item.name}
                </h3>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Unit Price: <strong style={{ color: 'var(--text-primary)' }}>${item.price}</strong>
                </div>
              </div>

              {/* Quantity Stepper */}
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

              {/* Item Total Price */}
              <div style={{ minWidth: '80px', textAlign: 'right', fontWeight: 800, fontSize: '1.15rem' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              {/* Delete button */}
              <button
                className="btn-icon"
                onClick={() => {
                  dispatch(removeFromCart(item.id));
                  addToast(`Removed "${item.name}" from cart`, 'info');
                }}
                title="Remove item"
                aria-label="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {/* Quick promotion hint */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.9rem',
              color: 'var(--primary)',
            }}
          >
            <Tag size={18} />
            <span>
              Tip: Use promo code <strong>WELCOME20</strong> for 20% off or <strong>REACTPRO</strong> for 15% off!
            </span>
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout Action */}
        <aside className="card" style={{ padding: '28px', position: 'sticky', top: '90px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Order Summary</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Items Subtotal ({totalQuantity})</span>
              <span style={{ fontWeight: 700 }}>${totalAmount.toFixed(2)}</span>
            </div>

            {discountPercent > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)' }}>
                <span>Discount ({discountPercent}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
              <span style={{ fontWeight: 700, color: isFreeShipping ? 'var(--accent-emerald)' : 'inherit' }}>
                {isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Estimated Tax (8%)</span>
              <span style={{ fontWeight: 700 }}>${estimatedTax.toFixed(2)}</span>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-light)',
                paddingTop: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.3rem',
                fontWeight: 800,
              }}
            >
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code Form */}
          <div style={{ marginBottom: '24px' }}>
            {promoCode ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'var(--accent-emerald-light)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--accent-emerald)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} /> Code <strong>{promoCode}</strong> Active ({discountPercent}% Off)
                </div>
                <button
                  onClick={handleRemovePromo}
                  style={{ color: 'var(--accent-rose)', fontSize: '0.8rem', fontWeight: 700 }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Promo code (e.g. WELCOME20)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  style={{ flex: 1, height: '42px', fontSize: '0.85rem' }}
                />
                <button type="submit" className="btn btn-secondary" style={{ padding: '0 16px' }}>
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate('/checkout')}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', marginBottom: '16px' }}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>

          <Link
            to="/products"
            className="btn btn-outline"
            style={{ width: '100%', padding: '10px', fontSize: '0.9rem', textAlign: 'center' }}
          >
            Continue Shopping
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '20px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}
          >
            <ShieldCheck size={16} color="var(--accent-emerald)" /> 256-Bit SSL Encrypted Checkout
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
