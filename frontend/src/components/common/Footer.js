// frontend/src/components/common/Footer.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <span className="logo-text">TodoApp</span>
            </div>
            <p className="footer-description">
              Organize your life, boost your productivity, and achieve your goals with our intuitive todo management platform.
            </p>
            <div className="social-links">
              <a href="#" className="social-link facebook" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link twitter" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link linkedin" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-link github" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="social-link instagram" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className={`footer-link ${location.pathname === '/login' ? 'active' : ''}`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className={`footer-link ${location.pathname === '/register' ? 'active' : ''}`}
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/todos" 
                      className={`footer-link ${location.pathname === '/todos' ? 'active' : ''}`}
                    >
                      My Todos
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/profile" 
                      className={`footer-link ${location.pathname === '/profile' ? 'active' : ''}`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="footer-link logout-btn">
                      Logout
                    </button>
                  </li>
                </>
              )}
              <li><a href="#features" className="footer-link">Features</a></li>
              <li><a href="#pricing" className="footer-link">Pricing</a></li>
              <li><a href="#about" className="footer-link">About Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><a href="#help" className="footer-link">Help Center</a></li>
              <li><a href="#contact" className="footer-link">Contact Us</a></li>
              <li><a href="#faq" className="footer-link">FAQ</a></li>
              <li><a href="#tutorials" className="footer-link">Tutorials</a></li>
              <li><a href="#community" className="footer-link">Community</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
              <li><a href="#terms" className="footer-link">Terms of Service</a></li>
              <li><a href="#cookies" className="footer-link">Cookie Policy</a></li>
              <li><a href="#security" className="footer-link">Security</a></li>
              <li><a href="#compliance" className="footer-link">Compliance</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section footer-newsletter">
            <h3 className="footer-title">Stay Updated</h3>
            <p className="newsletter-description">
              Subscribe to our newsletter for the latest updates and productivity tips.
            </p>
            <form className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
            <div className="newsletter-features">
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Weekly productivity tips</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Feature updates</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>No spam, unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>© {currentYear} TodoApp. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="#sitemap" className="footer-bottom-link">Sitemap</a>
              <a href="#accessibility" className="footer-bottom-link">Accessibility</a>
              <a href="#status" className="footer-bottom-link">System Status</a>
            </div>
            <div className="footer-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1M+</span>
                <span className="stat-label">Tasks Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
