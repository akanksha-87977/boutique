import React, { useState } from 'react';

const ProductDetail = ({ product, onAddToCart, onBackToShop }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const images = [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onAddToCart(product, selectedSize, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <section className="product-detail-modern">
      <div className="detail-container">
        <button className="back-btn-modern" onClick={onBackToShop}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>

        <div className="detail-grid">
          <div className="detail-images">
            <div className="main-image-container">
              <img src={images[activeImage]} alt={product.name} />
            </div>
            <div className="thumbnail-grid">
              {images.map((img, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="detail-info">
            <div className="detail-header">
              <div>
                <p className="detail-category">{product.categoryName}</p>
                <h1 className="detail-title">{product.name}</h1>
              </div>
              <p className="detail-price">${product.price}</p>
            </div>

            {product.isNew && <span className="new-badge">New Arrival</span>}

            <div className="detail-description">
              <p>{product.description}</p>
            </div>

            <div className="detail-options">
              <div className="size-selection">
                <label className="option-label">Select Size</label>
                <div className="size-grid">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quantity-selection">
                <label className="option-label">Quantity</label>
                <div className="quantity-wrapper">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="qty-display">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button className="add-cart-btn-modern" onClick={handleAddToCart}>
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </button>

            {showSuccess && (
              <div className="success-notification">
                ✓ Added to cart successfully
              </div>
            )}

            <div className="product-features">
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>30-day returns & exchanges</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>Secure payment guaranteed</span>
              </div>
            </div>

            <details className="detail-accordion">
              <summary>Product Details</summary>
              <div className="accordion-content">
                <ul>
                  <li>Premium quality materials</li>
                  <li>Expertly crafted construction</li>
                  <li>Designed for longevity</li>
                  <li>Sustainably sourced</li>
                </ul>
              </div>
            </details>

            <details className="detail-accordion">
              <summary>Care Instructions</summary>
              <div className="accordion-content">
                <p>Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron on low heat if needed.</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;