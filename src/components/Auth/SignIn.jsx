import React, { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const SignIn = ({ onSignIn, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setErrors({});
      setSuccessMessage('');

      try {
        const signinData = {
          email: formData.email,
          password: formData.password
        };

        console.log('🔐 Attempting signin:', signinData.email);
        console.log('🔗 Calling:', `${API_BASE_URL}/api/auth/signin`);

        const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signinData)
        });

        console.log('📊 Response status:', response.status);
        console.log('📊 Response statusText:', response.statusText);

        const data = await response.json();
        console.log('📊 Response data:', data);

        if (!response.ok) {
          console.error('❌ Signin failed:', data.message);
          setErrors({ submit: data.message || 'Signin failed. Please check your credentials.' });
          setLoading(false);
          return;
        }

        console.log('✅ Signin successful!');
        setSuccessMessage('✅ Signed in successfully! Redirecting...');

        // Call parent component handler with user data from backend
        onSignIn(data.user);

        // Auto-redirect after 2 seconds
        setTimeout(() => {
          // Navigation is handled by parent component
        }, 2000);
      } catch (error) {
        console.error('❌ Fetch error:', error);
        console.error('❌ Error message:', error.message);
        console.error('❌ Stack:', error.stack);
        setErrors({ submit: 'Connection error: ' + error.message + '. Please try again.' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to access your account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {errors.submit && <div className="error-alert">{errors.submit}</div>}
            {successMessage && <div className="success-alert">{successMessage}</div>}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="you@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="social-auth">
            <button className="social-btn google">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="auth-switch">
            <p>Don't have an account? <button onClick={onSwitchToSignUp}>Sign Up</button></p>
          </div>
        </div>

        <div className="auth-image">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1200&fit=crop&q=80" alt="Fashion" />
          <div className="auth-image-overlay">
            <h2>Discover Your Style</h2>
            <p>Join our community of fashion enthusiasts</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;