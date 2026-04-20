import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [lang, setLang] = useState<'IT' | 'EN'>('IT');

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-logo">
          Ghoan Airlines
        </div>
        
        <div className="navbar-links">
          <a href="#" className="navbar-link active">Voli</a>
          <a href="#" className="navbar-link">Destinazioni</a>
          <a href="#" className="navbar-link">Offerte</a>
        </div>

        <div className="navbar-actions">
          <div className="lang-toggle">
            <span 
              className={`lang-option ${lang === 'IT' ? 'active' : ''}`}
              onClick={() => setLang('IT')}
            >
              IT
            </span>
            <span className="lang-separator">|</span>
            <span 
              className={`lang-option ${lang === 'EN' ? 'active' : ''}`}
              onClick={() => setLang('EN')}
            >
              EN
            </span>
          </div>

          <div className="cart-timer">
            <div className="cart-icon-wrapper">
              <span className="material-symbols-outlined text-primary">shopping_cart</span>
            </div>
            <div className="timer-info">
              <span className="timer-label">Tempo rimasto</span>
              <span className="timer-value">20:00</span>
            </div>
          </div>
          
          <button className="btn-signin">
            <span className="material-symbols-outlined">person</span>
            <span>Accedi</span>
          </button>
          
          <button className="btn-signup">Registrati</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
