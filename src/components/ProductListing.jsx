import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductListing = ({ category, onProductClick, searchQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    let filtered = products;

    if (category && category !== 'all' && category !== 'new-arrivals') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (category === 'new-arrivals') {
      filtered = filtered.filter(p => p.isNew);
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [category, sortBy, searchQuery]);

  const getCategoryTitle = () => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (category === 'new-arrivals') return 'New Arrivals';
    if (category === 'all') return 'All Products';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <section className="product-listing-modern">
      <div className="listing-container">
        <div className="listing-header-modern">
          <div>
            <h1 className="listing-title-modern">{getCategoryTitle()}</h1>
            <p className="listing-count">{filteredProducts.length} items</p>
          </div>
          <div className="listing-controls-modern">
            <select 
              className="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
        
        <div className="products-grid-modern">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onClick={onProductClick}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <p>No products found</p>
            <p className="no-results-sub">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListing;