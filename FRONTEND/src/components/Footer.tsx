import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column">
          <div className="footer-logo">Ghoan Airlines</div>
          <p className="copyright">© 2026 Ghoan Airlines</p>
        </div>
        
        <div className="footer-column">
          <h5 className="footer-title">Explore</h5>
          <ul className="footer-links">
            <li><a href="#">Support</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Sostenibilità</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h5 className="footer-title">Legal</h5>
          <ul className="footer-links">
            <li><a href="#">Termini di Servizio</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h5 className="footer-title">Contact</h5>
          <ul className="footer-links">
            <li><a href="#">Contatti</a></li>
            <li className="social-links">
              <span className="material-symbols-outlined social-icon">public</span>
              <span className="material-symbols-outlined social-icon">mail</span>
              <span className="material-symbols-outlined social-icon">phone_in_talk</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
