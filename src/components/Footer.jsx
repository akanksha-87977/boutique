import React from 'react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer-modern">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-logo">FASHION BOUTIQUE</h3>
            <p className="footer-tagline">Timeless elegance for the modern woman</p>
            <div className="footer-social">
              <a href="#instagram" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="#FEEAC9" strokeWidth="2"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#FEEAC9" strokeWidth="2"></line>
                </svg>
              </a>
              <a href="#facebook" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#pinterest" aria-label="Pinterest">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12c0-2.21 1.79-4 4-4 2.76 0 5 1.79 5 4 0 1.39-.63 2.63-1.63 3.44-.37-.59-.74-1.46-.88-2.13-.14-.68-.25-1.35.47-2.09.72-.74 1.63-.84 2.13-.56.5.28.5.84.5 1.41 0 1.66-1.34 3-3 3-.83 0-1.58-.34-2.13-.88" fill="none" stroke="#FEEAC9" strokeWidth="2"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Shop</h4>
              <ul>
                <li><button onClick={() => onNavigate('shop', 'new-arrivals')}>New Arrivals</button></li>
                <li><button onClick={() => onNavigate('shop', 'dresses')}>Dresses</button></li>
                <li><button onClick={() => onNavigate('shop', 'knitwear')}>Knitwear</button></li>
                <li><button onClick={() => onNavigate('shop', 'accessories')}>Accessories</button></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Customer Care</h4>
              <ul>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#shipping">Shipping Info</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>About</h4>
              <ul>
                <li><a href="#story">Our Story</a></li>
                <li><a href="#sustainability">Sustainability</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#press">Press</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Fashion Boutique. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;