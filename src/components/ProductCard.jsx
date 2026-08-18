import React, { useState } from 'react';

const ProductCard = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="product-card-modern"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(product)}
    >
      <div className="product-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-main-img"
        />
        {product.isNew && <span className="product-tag">New</span>}
        {isHovered && (
          <div className="product-overlay">
            <button className="quick-view-btn">Quick View</button>
          </div>
        )}
      </div>
      
      <div className="product-details">
        <p className="product-category-label">{product.categoryName}</p>
        <h3 className="product-name-modern">{product.name}</h3>
        <p className="product-price-modern">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;