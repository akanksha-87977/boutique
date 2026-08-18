import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FeaturedCollection from './components/FeaturedCollection';
import CategoryShowcase from './components/CategoryShowcase';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Profile from './components/Auth/Profile';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Load cart and user from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('auraCart');
    const savedUser = localStorage.getItem('auraUser');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('auraCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleNavigation = (view, category = 'all') => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentView(view);
      setSelectedCategory(category);
      setSelectedProduct(null);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const handleProductClick = (product) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedProduct(product);
      setCurrentView('product-detail');
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const handleAddToCart = (product, size, quantity) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && item.selectedSize === size
    );

    if (existingItemIndex > -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      const newItem = {
        ...product,
        selectedSize: size,
        quantity: quantity,
        cartItemId: Date.now()
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleUpdateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    const updatedCart = cartItems.map(item =>
      item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveFromCart = (cartItemId) => {
    setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    handleNavigation('shop', 'all');
  };

  const handleSignIn = (userData) => {
    setUser(userData);
    localStorage.setItem('auraUser', JSON.stringify(userData));
    handleNavigation('profile');
  };

  const handleSignUp = (userData) => {
    setUser(userData);
    localStorage.setItem('auraUser', JSON.stringify(userData));
    handleNavigation('profile');
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('auraUser');
    handleNavigation('home');
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app">
      <Header 
        onNavigate={handleNavigation}
        cartCount={cartCount}
        onSearch={handleSearch}
        currentView={currentView}
        user={user}
      />
      
      {isLoading && <div className="page-loader"></div>}
      
      <main className={`main-content ${isLoading ? 'loading' : ''}`}>
        {currentView === 'home' && (
          <>
            <Hero onNavigate={handleNavigation} />
            <FeaturedCollection onProductClick={handleProductClick} />
            <CategoryShowcase onNavigate={handleNavigation} />
          </>
        )}
        
        {currentView === 'shop' && (
          <ProductListing 
            category={selectedCategory}
            onProductClick={handleProductClick}
            searchQuery={searchQuery}
          />
        )}
        
        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBackToShop={() => handleNavigation('shop', selectedCategory)}
          />
        )}

        {currentView === 'cart' && (
          <Cart 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onContinueShopping={() => handleNavigation('shop', 'all')}
            onProductClick={handleProductClick}
          />
        )}

        {currentView === 'signin' && (
          <SignIn 
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => handleNavigation('signup')}
          />
        )}

        {currentView === 'signup' && (
          <SignUp 
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => handleNavigation('signin')}
          />
        )}

        {currentView === 'profile' && (
          <Profile 
            user={user}
            onSignOut={handleSignOut}
            cartItems={cartItems}
          />
        )}
      </main>
      
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}

export default App;