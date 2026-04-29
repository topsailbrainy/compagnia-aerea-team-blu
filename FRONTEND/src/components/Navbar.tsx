import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Timer from './Timer';
import '../styles/Navbar.css';
import { useStoreTimer } from '../stores/storeTimer';
import { useStoreUser } from '../stores/storeUser';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'IT' | 'EN'>('IT');
  const { getTimer } = useStoreTimer();
  const { logged, setLogged, isAdmin } = useStoreUser();

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div
          className="navbar-logo"
          onClick={() => navigate('/')}
        >
          <img src="../../img/gatto113.png" alt="Logo" />
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

          {getTimer() > 0 && <>
            <div className="cart-timer">
              <div className="cart-icon-wrapper">
                <span className="material-symbols-outlined text-primary">shopping_cart</span>
              </div>
              <div className="timer-info">
                <span className="timer-label">Tempo rimasto</span>
                <span className="timer-value">
                  <Timer />
                </span>
              </div>
            </div>
          </>
          }

          {logged ? (
            <>
              {isAdmin && (
                <button
                  className="btn-signin"
                  style={{ backgroundColor: '#fdeeff', color: '#8137b1', fontWeight: 'bold' }}
                  onClick={() => navigate('/admin')}
                >
                  <span className="material-symbols-outlined">admin_panel_settings</span>
                  <span>Admin</span>
                </button>
              )}
              <button
                className="btn-signin"
                onClick={() => navigate('/profile')}
              >
                <span className="material-symbols-outlined">person</span>
                <span>Profilo</span>
              </button>

              
              <button
                className="btn-signup"
                onClick={() => navigate('/upgrade')}
              >
                Upgrade
              </button>

              <button
                className="btn-signin"
                onClick={() => {
                  setLogged(false);
                  navigate('/');
                }}
              >
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-signin"
                onClick={() => navigate('/login')}
              >
                <span className="material-symbols-outlined">person</span>
                <span>Accedi</span>
              </button>
              
              <button
                className="btn-signup"
                onClick={() => navigate('/register')}
              >
                Registrati
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;