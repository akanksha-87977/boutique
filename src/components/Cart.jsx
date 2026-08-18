import React from 'react';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart, onContinueShopping, onProductClick }) => {
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <section className="cart-page empty-cart">
        <div className="cart-container">
          <div className="empty-cart-content">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button className="continue-shopping-btn" onClick={onContinueShopping}>
              Start Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button className="clear-cart-btn" onClick={onClearCart}>
            Clear Cart
          </button>
        </div>

        <div className="cart-content-grid">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="cart-item">
                <div className="cart-item-image" onClick={() => onProductClick(item)}>
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <div className="cart-item-info">
                    <h3 onClick={() => onProductClick(item)}>{item.name}</h3>
                    <p className="cart-item-category">{item.categoryName}</p>
                    <p className="cart-item-size">Size: {item.selectedSize}</p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-quantity-control">
                      <button 
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}>
                        +
                      </button>
                    </div>

                    <div className="cart-item-price">
                      <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="price-per-unit">${item.price} each</p>
                    </div>

                    <button 
                      className="remove-item-btn"
                      onClick={() => onRemoveItem(item.cartItemId)}
                      aria-label="Remove item"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-line">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-line">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>

            {shipping === 0 && (
              <p className="free-shipping-notice">🎉 You qualify for free shipping!</p>
            )}

            {shipping > 0 && subtotal < 100 && (
              <p className="free-shipping-notice">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}

            <div className="summary-line">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-line summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

            <button className="continue-shopping-link" onClick={onContinueShopping}>
              Continue Shopping
            </button>

            <div className="payment-methods">
              <p>We accept</p>
              <div className="payment-icons">
                <span>💳</span>
                <span>🔒</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;