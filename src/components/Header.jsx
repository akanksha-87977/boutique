import React, { useState, useEffect } from 'react';

const Header = ({ onNavigate, cartCount, onSearch, currentView, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      setShowSearch(false);
      setSearchInput('');
    }
  };

  const handleAccountClick = () => {
    if (user) {
      onNavigate('profile');
    } else {
      onNavigate('signin');
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <nav className="nav-main">
          <div className="nav-left">
            <button 
              onClick={() => onNavigate('shop', 'all')} 
              className={`nav-link ${currentView === 'shop' ? 'active' : ''}`}
            >
              Collection
            </button>
            <button 
              onClick={() => onNavigate('shop', 'new-arrivals')} 
              className="nav-link"
            >
              New In
            </button>
          </div>
          
          <div className="logo" onClick={() => onNavigate('home')}>
            <h1>FASHION</h1>
            <span className="logo-subtitle">BOUTIQUE</span>
          </div>
          
          <div className="nav-right">
            <button 
              className="nav-icon-btn" 
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <button 
              className="nav-icon-btn" 
              onClick={handleAccountClick}
              aria-label="Account"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {user && <span className="user-indicator"></span>}
            </button>
            <button 
              className="nav-icon-btn cart-btn" 
              onClick={() => onNavigate('cart')}
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
        
        {showSearch && (
          <div className="search-overlay">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoFocus
              />
              <button type="submit">Search</button>
              <button 
                type="button" 
                onClick={() => setShowSearch(false)}
                className="close-search"
              >
                ✕
              </button>
            </form>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <button onClick={() => { onNavigate('shop', 'all'); setIsMobileMenuOpen(false); }}>
              Collection
            </button>
            <button onClick={() => { onNavigate('shop', 'new-arrivals'); setIsMobileMenuOpen(false); }}>
              New In
            </button>
            <button onClick={() => { handleAccountClick(); setIsMobileMenuOpen(false); }}>
              {user ? 'My Account' : 'Sign In'}
            </button>
            <button onClick={() => { onNavigate('cart'); setIsMobileMenuOpen(false); }}>
              Cart ({cartCount})
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;