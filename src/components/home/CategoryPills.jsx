import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../../features/filter/filterSlice';
import { CATEGORIES } from '../../data/products';
import { Headphones, Watch, Laptop, Home, Zap, Sparkles } from 'lucide-react';

const iconMap = {
  Sparkles: <Sparkles size={20} />,
  Headphones: <Headphones size={20} />,
  Watch: <Watch size={20} />,
  Laptop: <Laptop size={20} />,
  Home: <Home size={20} />,
  Zap: <Zap size={20} />
};

const CategoryPills = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectCategory = (catId) => {
    dispatch(setSelectedCategory(catId));
    navigate('/products');
  };

  return (
    <section style={{ marginBottom: '50px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2>Featured Categories</h2>
          <p>Curated collections of cutting-edge hardware and accessories.</p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
        }}
      >
        {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleSelectCategory(cat.id)}
            className="card"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}
            >
              {iconMap[cat.icon] || <Zap size={20} />}
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>{cat.name}</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Explore line-up →</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryPills;
