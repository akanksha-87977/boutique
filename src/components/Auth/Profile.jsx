import React, { useState } from 'react';

const Profile = ({ user, onSignOut, cartItems }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const orderHistory = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 425.00,
      items: 2
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'In Transit',
      total: 289.00,
      items: 1
    }
  ];

  const savedItems = cartItems.slice(0, 3);

  return (
    <section className="profile-page">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-user-info">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2>{user?.name || 'Guest User'}</h2>
            <p>{user?.email || 'guest@example.com'}</p>
          </div>

          <nav className="profile-nav">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Overview
            </button>
            <button 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Orders
            </button>
            <button 
              className={activeTab === 'saved' ? 'active' : ''}
              onClick={() => setActiveTab('saved')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              Saved Items
            </button>
            <button 
              className={activeTab === 'settings' ? 'active' : ''}
              onClick={() => setActiveTab('settings')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m8.66-10l-5.2 3m-5.92 0l-5.2-3m0 12l5.2-3m5.92 0l5.2 3"></path>
              </svg>
              Settings
            </button>
          </nav>

          <button className="sign-out-btn" onClick={onSignOut}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign Out
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'overview' && (
            <div className="profile-overview">
              <h1>Welcome back, {user?.name?.split(' ')[0] || 'Guest'}!</h1>
              
              <div className="overview-stats">
                <div className="stat-card">
                  <div className="stat-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>{orderHistory.length}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>{savedItems.length}</h3>
                    <p>Saved Items</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>{cartItems.length}</h3>
                    <p>Items in Cart</p>
                  </div>
                </div>
              </div>

              <div className="recent-orders">
                <h2>Recent Orders</h2>
                {orderHistory.slice(0, 2).map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-info">
                      <h3>Order {order.id}</h3>
                      <p>{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-total">
                      <p>${order.total.toFixed(2)}</p>
                      <span>{order.items} items</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="profile-orders">
              <h1>Order History</h1>
              <div className="orders-list">
                {orderHistory.map(order => (
                  <div key={order.id} className="order-item-detailed">
                    <div className="order-header-row">
                      <div>
                        <h3>Order {order.id}</h3>
                        <p>{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                      <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details-row">
                      <p>{order.items} items • ${order.total.toFixed(2)}</p>
                      <button className="view-order-btn">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="profile-saved">
              <h1>Saved Items</h1>
              <div className="saved-items-grid">
                {savedItems.map(item => (
                  <div key={item.id} className="saved-item-card">
                    <img src={item.image} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                    <button className="add-to-cart-small">Add to Cart</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="profile-settings">
              <h1>Account Settings</h1>
              
              <div className="settings-section">
                <h2>Personal Information</h2>
                <form className="settings-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={user?.name} />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue={user?.email} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <button type="submit" className="save-settings-btn">Save Changes</button>
                </form>
              </div>

              <div className="settings-section">
                <h2>Password</h2>
                <button className="change-password-btn">Change Password</button>
              </div>

              <div className="settings-section">
                <h2>Notifications</h2>
                <label className="toggle-label">
                  <input type="checkbox" defaultChecked />
                  <span>Email notifications</span>
                </label>
                <label className="toggle-label">
                  <input type="checkbox" defaultChecked />
                  <span>Order updates</span>
                </label>
                <label className="toggle-label">
                  <input type="checkbox" />
                  <span>Promotional emails</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;