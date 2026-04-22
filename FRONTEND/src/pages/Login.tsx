import React from 'react';
import { useNavigate } from 'react-router';
import '../styles/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-section">
          <img
            alt="Ghoan Airlines purple plane with cat mascot"
            className="login-image"
            src="https://lh3.googleusercontent.com/aida/ADBb0uj338FI4SuUlwQs0kbGqsuCkTKlNjbRKMywQivl55_UdUtZtLF0nnPZj1YxlRaNJGkK5xtpD7GI3pZNUPcLvECkvdfSeLrdwyIYx9bYMtFwmveT1cB7RaBuir9cAVbZimn72wiPKwJ4SvkeD6D5twM_ja07z9iw4OHSkHQMQLe_YvR0zuRjAs1SP2yDqmH_wsE7Zi2WppRSsuAkkZguxa5zJI8SxmcflFX1p49m12EI9rRooPuMh7OH1DcFbkHNUXdf8zzrnqWFQcY"
          />
          <div className="login-image-overlay"></div>
          <div className="login-image-text">
            <p className="login-image-title">
              Il volo dello spirito inizia qui.
            </p>
            <p className="login-image-subtitle">
              Unisciti alla nostra community di viaggiatori d'élite e scopri il mondo con la precisione di un maestro.
            </p>
          </div>
        </div>
        <div className="login-form-section">
          <div className="login-header">
            <h1 className="login-title">Bentornato</h1>
            <p className="login-subtitle">Inserisci i tuoi dati per accedere al tuo account.</p>
          </div>
          <form className="login-form">
            <div className="login-form-fields">
              <div className="login-field">
                <label className="login-label">Email / Username</label>
                <input
                  className="login-input"
                  placeholder="nome@esempio.it"
                  type="text"
                />
              </div>
              <div className="login-field">
                <label className="login-label">Password</label>
                <input
                  className="login-input"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <div className="login-forgot">
                <a className="login-forgot-link" href="#">
                  Password dimenticata?
                </a>
              </div>
            </div>
            <button className="login-btn" type="submit">
              Accedi
            </button>
          </form>
          <div className="login-signup">
            <p className="login-signup-text">Non hai ancora un account?</p>
            <button
              className="login-signup-btn"
              type="button"
              onClick={() => navigate('/register')}
            >
              Registrati
            </button>
          </div>
          <div className="login-footer-links">
            <a className="login-footer-link" href="#">Privacy Policy</a>
            <a className="login-footer-link" href="#">Termini</a>
            <a className="login-footer-link" href="#">Supporto</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;