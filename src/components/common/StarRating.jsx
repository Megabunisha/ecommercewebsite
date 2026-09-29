import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 5, size = 16, showNumber = false, reviewCount = null }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--accent-amber)' }}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            fill={i < fullStars || (i === fullStars && hasHalfStar) ? 'currentColor' : 'none'}
            strokeWidth={1.5}
            style={{ opacity: i < fullStars || (i === fullStars && hasHalfStar) ? 1 : 0.3 }}
          />
        ))}
      </div>
      {showNumber && (
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginLeft: '4px' }}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== null && (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default StarRating;
