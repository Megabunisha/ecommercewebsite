import React from 'react';
import { Truck, ShieldCheck, RefreshCw, HeadphonesIcon } from 'lucide-react';

const ValueProps = () => {
  const props = [
    {
      icon: <Truck size={24} color="var(--primary)" />,
      title: 'Global Express Delivery',
      desc: 'Free worldwide express shipping on all orders over $100.'
    },
    {
      icon: <ShieldCheck size={24} color="var(--accent-emerald)" />,
      title: '2-Year Direct Warranty',
      desc: 'Guaranteed hardware replacement with zero hassle.'
    },
    {
      icon: <RefreshCw size={24} color="var(--accent-cyan)" />,
      title: '30-Day Risk-Free Trial',
      desc: 'Love your equipment or receive a 100% full refund.'
    },
    {
      icon: <HeadphonesIcon size={24} color="var(--accent-amber)" />,
      title: '24/7 Audio & Tech Support',
      desc: 'Our acoustic and hardware engineers are always ready.'
    }
  ];

  return (
    <section style={{ margin: '50px 0' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}
      >
        {props.map((p, idx) => (
          <div
            key={idx}
            className="card"
            style={{
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}
          >
            <div
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                flexShrink: 0,
              }}
            >
              {p.icon}
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>{p.title}</h4>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProps;
