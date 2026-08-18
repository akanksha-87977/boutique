import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const FeaturedCollection = ({ onProductClick }) => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <section className="featured-collection">
      <div className="section-container">
        <div className="section-header-centered">
          <span className="section-label">Curated Selection</span>
          <h2 className="section-title-large">Featured This Season</h2>
          <p className="section-description">
            Handpicked pieces that embody sophistication and timeless style
          </p>
        </div>
        
        <div className="featured-products-grid">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;