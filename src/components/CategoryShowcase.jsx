import React from 'react';

const CategoryShowcase = ({ onNavigate }) => {
  return (
    <section className="category-showcase">
      <div className="showcase-grid">
        <div className="showcase-large" onClick={() => onNavigate('shop', 'dresses')}>
          <div className="showcase-image">
            <img 
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&h=1200&fit=crop&q=80" 
              alt="Dresses Collection" 
            />
          </div>
          <div className="showcase-content">
            <h3>Dresses</h3>
            <p>Effortless sophistication</p>
            <span className="showcase-link">Discover →</span>
          </div>
        </div>

        <div className="showcase-vertical">
          <div className="showcase-small" onClick={() => onNavigate('shop', 'knitwear')}>
            <div className="showcase-image">
              <img 
                src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=700&fit=crop&q=80" 
                alt="Knitwear Collection" 
              />
            </div>
            <div className="showcase-content">
              <h3>Knitwear</h3>
              <p>Luxurious comfort</p>
              <span className="showcase-link">Shop Now →</span>
            </div>
          </div>

          <div className="showcase-small" onClick={() => onNavigate('shop', 'accessories')}>
            <div className="showcase-image">
              <img 
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=700&fit=crop&q=80" 
                alt="Accessories Collection" 
              />
            </div>
            <div className="showcase-content">
              <h3>Accessories</h3>
              <p>Perfect finishing touches</p>
              <span className="showcase-link">View All →</span>
            </div>
          </div>
        </div>

        <div className="showcase-medium" onClick={() => onNavigate('shop', 'outerwear')}>
          <div className="showcase-image">
            <img 
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&q=80" 
              alt="Outerwear Collection" 
            />
          </div>
          <div className="showcase-content">
            <h3>Outerwear</h3>
            <p>Timeless investment pieces</p>
            <span className="showcase-link">Explore →</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;