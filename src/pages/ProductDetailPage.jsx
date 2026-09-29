import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import { useToast } from '../context/ToastContext';
import { PRODUCTS } from '../data/products';
import StarRating from '../components/common/StarRating';
import ProductCard from '../components/common/ProductCard';
import {
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Plus,
  Minus,
  ArrowRight,
  Share2
} from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews'
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Alex Morgan',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Absolutely spectacular acoustics. The build quality in hand feels twice as expensive.'
    },
    {
      id: 2,
      author: 'Sarah Chen',
      rating: 5,
      date: '1 month ago',
      comment: 'Fast delivery and flawless packaging. The battery life exceeds the advertised specifications.'
    }
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = product ? wishlistItems.some((item) => item.id === product.id) : false;

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="app-container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ margin: '16px 0 24px' }}>The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    addToast(`Added ${quantity} × "${product.name}" to cart!`, 'success');
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate('/checkout');
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    addToast(
      isWishlisted ? `Removed "${product.name}" from wishlist` : `Added "${product.name}" to wishlist`,
      isWishlisted ? 'info' : 'success'
    );
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: Date.now(),
      author: newReviewAuthor.trim(),
      rating: Number(newReviewRating),
      date: 'Just now',
      comment: newReviewComment.trim(),
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    addToast('Thank you! Your verified review has been published.', 'success');
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="app-container" style={{ padding: '24px 20px 80px' }}>
      {/* Breadcrumb Navigation */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          marginBottom: '28px',
        }}
      >
        <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" style={{ color: 'var(--text-secondary)' }}>Products</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{product.category}</span>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          marginBottom: '60px',
        }}
      >
        {/* Left Column: Image Gallery */}
        <div>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              height: '420px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <img
              src={selectedImage || product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'all 0.3s ease',
              }}
            />
            {product.badge && (
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <span className={`badge badge-${product.badgeType || 'primary'}`}>{product.badge}</span>
              </div>
            )}
          </div>

          {/* Thumbnails row */}
          {product.gallery && product.gallery.length > 1 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: selectedImage === imgUrl ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                    padding: 0,
                    opacity: selectedImage === imgUrl ? 1 : 0.7,
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Purchasing Info */}
        <div>
          <div className="product-category-text" style={{ fontSize: '0.85rem' }}>
            {product.category}
          </div>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} showNumber />
            <div style={{ width: 1, height: 16, background: 'var(--border-medium)' }} />
            <span style={{ fontSize: '0.85rem', color: product.stock > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 700 }}>
              {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
            </span>
          </div>

          {/* Price Box */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ${product.originalPrice}
                </span>
                <span className="badge badge-rose">
                  Save ${(product.originalPrice - product.price).toFixed(0)}
                </span>
              </>
            )}
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px', color: 'var(--text-secondary)' }}>
            {product.description}
          </p>

          {/* Feature Highlights */}
          <div style={{ marginBottom: '32px', background: 'var(--bg-tertiary)', padding: '16px 20px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>Key Highlights:</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              {product.features.slice(0, 3).map((feat, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="var(--accent-emerald)" flexShrink={0} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity and Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '28px' }}>
            <div className="qty-stepper" style={{ height: '44px' }}>
              <button
                className="qty-btn"
                style={{ width: '40px', height: '44px' }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="qty-display" style={{ width: '44px', fontSize: '1rem' }}>{quantity}</span>
              <button
                className="qty-btn"
                style={{ width: '40px', height: '44px' }}
                disabled={quantity >= product.stock}
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              className="btn btn-primary"
              style={{ flex: 1, height: '44px', minWidth: '160px' }}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>

            <button
              className="btn btn-secondary"
              style={{ height: '44px', padding: '0 20px' }}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

            <button
              className={`btn-icon ${isWishlisted ? 'active' : ''}`}
              style={{ width: '44px', height: '44px', color: isWishlisted ? 'var(--accent-rose)' : 'inherit' }}
              onClick={handleToggleWishlist}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Benefits summary */}
          <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid var(--border-light)', paddingTop: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={16} color="var(--primary)" /> Free Global Shipping
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="var(--accent-emerald)" /> 2-Yr Warranty
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RotateCcw size={16} color="var(--accent-cyan)" /> 30-Day Returns
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Overview, Specifications, Reviews */}
      <section className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '60px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-tertiary)' }}>
          <button
            style={{
              padding: '16px 28px',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: activeTab === 'overview' ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'overview' ? '2px solid var(--primary)' : 'none',
              background: activeTab === 'overview' ? 'var(--bg-secondary)' : 'transparent',
            }}
            onClick={() => setActiveTab('overview')}
          >
            Detailed Overview
          </button>
          <button
            style={{
              padding: '16px 28px',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: activeTab === 'specs' ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'specs' ? '2px solid var(--primary)' : 'none',
              background: activeTab === 'specs' ? 'var(--bg-secondary)' : 'transparent',
            }}
            onClick={() => setActiveTab('specs')}
          >
            Technical Specifications
          </button>
          <button
            style={{
              padding: '16px 28px',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: activeTab === 'reviews' ? 'var(--primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'reviews' ? '2px solid var(--primary)' : 'none',
              background: activeTab === 'reviews' ? 'var(--bg-secondary)' : 'transparent',
            }}
            onClick={() => setActiveTab('reviews')}
          >
            Customer Reviews ({reviews.length})
          </button>
        </div>

        <div style={{ padding: '32px' }}>
          {activeTab === 'overview' && (
            <div>
              <h3 style={{ marginBottom: '16px' }}>Engineered for Audiophiles & Creators</h3>
              <p style={{ marginBottom: '24px', lineHeight: 1.8 }}>
                {product.description}
              </p>
              <h4 style={{ marginBottom: '14px' }}>All Included Features:</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.6 }}>
                {product.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>Hardware Specifications</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} style={{ padding: '14px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {key}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                {/* Existing Reviews */}
                <div>
                  <h3 style={{ marginBottom: '20px' }}>Community Feedback</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {reviews.map((rev) => (
                      <div key={rev.id} style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '0.95rem' }}>{rev.author}</strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                        </div>
                        <StarRating rating={rev.rating} size={14} />
                        <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit New Review Form */}
                <div style={{ background: 'var(--bg-tertiary)', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
                  <h4 style={{ marginBottom: '16px' }}>Write a Review</h4>
                  <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jordan Smith"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Rating
                      </label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        style={{ width: '100%' }}
                      >
                        <option value="5">5 Stars - Outstanding</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Average</option>
                        <option value="2">2 Stars - Below Expectations</option>
                        <option value="1">1 Star - Poor</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Your Review
                      </label>
                      <textarea
                        rows="3"
                        required
                        placeholder="Describe your listening or unboxing experience..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '6px' }}>
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '24px' }}>Related Gear in this Category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
