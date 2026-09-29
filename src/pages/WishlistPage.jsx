import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearWishlist, toggleWishlist } from '../features/wishlist/wishlistSlice';
import { addToCart } from '../features/cart/cartSlice';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/common/ProductCard';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((product) => {
      dispatch(addToCart({ ...product, quantity: 1 }));
    });
    addToast(`Added all ${wishlistItems.length} items to your shopping bag!`, 'success');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="app-container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'var(--accent-rose-light)',
            color: 'var(--accent-rose)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <Heart size={40} />
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '12px' }}>Your Wishlist is Empty</h1>
        <p style={{ maxWidth: '440px', margin: '0 auto 24px', color: 'var(--text-secondary)' }}>
          Click the heart icon on any product card to save your favorite hardware and peripherals for later.
        </p>
        <Link to="/products" className="btn btn-primary" style={{ padding: '12px 28px' }}>
          Explore Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ padding: '30px 20px 80px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>Saved Wishlist</h1>
          <p>You have {wishlistItems.length} saved {wishlistItems.length === 1 ? 'item' : 'items'}.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleMoveAllToCart}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShoppingBag size={16} /> Move All to Cart
          </button>
          <button
            onClick={() => {
              dispatch(clearWishlist());
              addToast('Wishlist cleared', 'info');
            }}
            className="btn btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Trash2 size={16} /> Clear Wishlist
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
