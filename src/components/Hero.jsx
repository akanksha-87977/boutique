import React from 'react';

const Hero = ({ onNavigate }) => {
  return (
    <section className="hero-section">
      <div className="hero-content-wrapper">
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1920&h=1080&fit=crop&q=80" 
            alt="Aura Boutique Spring Collection" 
            className="hero-image"
          />
          <div className="hero-gradient"></div>
        </div>
        
        <div className="hero-text-content">
          <span className="hero-season">Spring Summer 2026</span>
          <h1 className="hero-title">Timeless<br />Elegance</h1>
          <p className="hero-description">
            Discover our curated collection of refined pieces<br />
            designed for the modern woman
          </p>
          <button 
            className="hero-cta-btn"
            onClick={() => onNavigate('shop', 'new-arrivals')}
          >
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;