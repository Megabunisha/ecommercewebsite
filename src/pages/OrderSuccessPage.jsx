import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, Home, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('nexus_last_order');
      if (stored) {
        setOrder(JSON.parse(stored));
      }
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 }
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="app-container" style={{ padding: '50px 20px 80px', maxWidth: '800px' }}>
      <div
        className="card"
        style={{
          textAlign: 'center',
          padding: '48px 32px',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--accent-emerald-light)',
            color: 'var(--accent-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <CheckCircle2 size={46} />
        </div>

        <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
          Payment Confirmed
        </span>

        <h1 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>
          Thank You for Your Order!
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 28px' }}>
          Your order has been authorized and queued for warehouse assembly. We sent a confirmation receipt to your email.
        </p>

        {/* Order Details Receipt Box */}
        <div
          style={{
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            textAlign: 'left',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-medium)',
              marginBottom: '20px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order Reference</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary)' }}>
                {order?.orderId || 'NX-784912'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Delivery</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{formattedDelivery}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Payment Method</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{order?.paymentMethod || 'CREDIT CARD'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Billed</div>
              <div style={{ fontWeight: 800, fontSize: '1rem' }}>
                ${order?.total ? order.total.toFixed(2) : '322.92'}
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Shipping Address</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {order?.recipient || 'Alex Morgan'} <br />
              {order?.shippingAddress || '742 Evergreen Terrace, San Francisco, CA 94107'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn btn-primary" style={{ padding: '12px 24px' }}>
            Continue Shopping <ArrowRight size={16} />
          </Link>

          <button
            onClick={() => window.print()}
            className="btn btn-secondary"
            style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Printer size={16} /> Print Receipt
          </button>

          <Link to="/" className="btn btn-outline" style={{ padding: '12px 24px' }}>
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
