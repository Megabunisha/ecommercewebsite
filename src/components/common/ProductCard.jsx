import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import { useToast } from '../../context/ToastContext';
import StarRating from './StarRating';
import { ShoppingBag, Heart, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const wishlistItems = useSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
    addToast(`Added "${product.name}" to cart!`, 'success');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    addToast(
      isWishlisted ? `Removed "${product.name}" from wishlist` : `Added "${product.name}" to wishlist`,
      isWishlisted ? 'info' : 'success'
    );
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {product.badge && (
          <div className="product-badge-overlay">
            <span className={`badge badge-${product.badgeType || 'primary'}`}>
              {product.badge}
            </span>
          </div>
        )}

        <button
          className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-card-body">
        <div className="product-category-text">{product.category}</div>
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        <div style={{ marginBottom: '12px' }}>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} showNumber />
        </div>

        <div className="product-card-footer">
          <div className="product-pricing">
            <span className="product-current-price">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="product-old-price">${product.originalPrice}</span>
            )}
          </div>

          <button
            className="btn-add-cart"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
