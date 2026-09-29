import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Truck,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle,
  ShoppingBag
} from 'lucide-react';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { items, totalQuantity, totalAmount, discountPercent, promoCode } = useSelector(
    (state) => state.cart
  );

  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    shippingMethod: 'free', // 'free' | 'express'
    paymentMethod: 'card', // 'card' | 'paypal' | 'applepay' | 'cod'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const discountAmount = (totalAmount * discountPercent) / 100;
  const shippingCost = formData.shippingMethod === 'express' ? 15 : totalAmount >= 100 ? 0 : 15;
  const tax = (totalAmount - discountAmount) * 0.08;
  const grandTotal = Math.max(0, totalAmount - discountAmount + shippingCost + tax);

  if (items.length === 0) {
    return (
      <div className="app-container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>No items in checkout</h2>
        <p style={{ margin: '16px 0 24px' }}>Please add some items to your bag before checking out.</p>
        <Link to="/products" className="btn btn-primary">Return to Catalog</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }

      // Save order metadata for confirmation page
      const orderSummary = {
        orderId: 'NX-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...items],
        total: grandTotal,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
        recipient: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        paymentMethod: formData.paymentMethod.toUpperCase()
      };

      sessionStorage.setItem('nexus_last_order', JSON.stringify(orderSummary));
      dispatch(clearCart());
      setIsProcessing(false);
      navigate('/order-success');
    }, 1200);
  };

  return (
    <div className="app-container" style={{ padding: '30px 20px 80px' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Secure Checkout</h1>
      <p style={{ marginBottom: '32px' }}>Complete your transaction safely with encrypted checkout.</p>

      <form onSubmit={handlePlaceOrder}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Shipping & Payment forms */}
          <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. Contact & Shipping Address */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div className="brand-icon-box" style={{ width: 28, height: 28, fontSize: '0.8rem' }}>1</div>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Shipping & Contact Details</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>First Name</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Last Name</label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Phone Number</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Street Address</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>City</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>State</label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Postal Code</label>
                  <input
                    type="text"
                    required
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Speed */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div className="brand-icon-box" style={{ width: 28, height: 28, fontSize: '0.8rem' }}>2</div>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Shipping Option</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: formData.shippingMethod === 'free' ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                    background: formData.shippingMethod === 'free' ? 'var(--primary-light)' : 'var(--bg-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="free"
                      checked={formData.shippingMethod === 'free'}
                      onChange={handleInputChange}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.95rem' }}>Standard Ground (3-5 business days)</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Free delivery on orders $100+</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>FREE</span>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: formData.shippingMethod === 'express' ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                    background: formData.shippingMethod === 'express' ? 'var(--primary-light)' : 'var(--bg-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleInputChange}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.95rem' }}>Next-Day Air Priority (1-2 business days)</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time GPS tracking included</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700 }}>$15.00</span>
                </label>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div className="brand-icon-box" style={{ width: 28, height: 28, fontSize: '0.8rem' }}>3</div>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Payment Method</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                {['card', 'paypal', 'applepay', 'cod'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      border: formData.paymentMethod === method ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                      background: formData.paymentMethod === method ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                      color: formData.paymentMethod === method ? 'var(--primary)' : 'inherit',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                    }}
                  >
                    {method === 'card' && 'Credit Card'}
                    {method === 'paypal' && 'PayPal'}
                    {method === 'applepay' && 'Apple Pay'}
                    {method === 'cod' && 'Cash on Delivery'}
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      style={{ width: '100%', fontFamily: 'monospace' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Expires</label>
                      <input
                        type="text"
                        name="cardExp"
                        value={formData.cardExp}
                        onChange={handleInputChange}
                        style={{ width: '100%', fontFamily: 'monospace' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>CVC / CVV</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        style={{ width: '100%', fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Review & Submit */}
          <aside className="card" style={{ padding: '24px', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '18px' }}>Order Items ({totalQuantity})</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', marginBottom: '20px' }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Qty: {item.quantity} × ${item.price}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginBottom: '20px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)' }}>
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Taxes (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginBottom: '14px' }}
            >
              {isProcessing ? 'Authorizing Payment...' : `Pay $${grandTotal.toFixed(2)}`}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Lock size={14} color="var(--accent-emerald)" /> End-to-end encrypted payment
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
