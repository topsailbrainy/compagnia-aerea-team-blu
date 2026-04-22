import React from 'react';
import { useNavigate } from 'react-router';
import '../styles/Register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1 className="register-title">
            Crea il tuo profilo <br />
            <span className="register-title-accent">Ghoan Airlines</span>
          </h1>
          <p className="register-subtitle">Inizia il tuo viaggio con l'eccellenza di Ghoan.</p>
        </div>

        <div className="register-card">
          <div className="register-bg-accent"></div>
          <form className="register-form">
            <div className="register-field">
              <label className="register-label">Full Name</label>
              <div className="register-input-wrapper">
                <span className="material-symbols-outlined register-input-icon">person</span>
                <input
                  className="register-input"
                  placeholder="Nome e Cognome"
                  type="text"
                />
              </div>
            </div>

            <div className="register-field">
              <label className="register-label">Email</label>
              <div className="register-input-wrapper">
                <span className="material-symbols-outlined register-input-icon">mail</span>
                <input
                  className="register-input"
                  placeholder="example@email.it"
                  type="email"
                />
              </div>
            </div>

            <div className="register-password-grid">
              <div className="register-field">
                <label className="register-label">Password</label>
                <div className="register-input-wrapper">
                  <span className="material-symbols-outlined register-input-icon">lock</span>
                  <input
                    className="register-input"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>
              <div className="register-field">
                <label className="register-label">Confirm</label>
                <div className="register-input-wrapper">
                  <span className="material-symbols-outlined register-input-icon">verified_user</span>
                  <input
                    className="register-input"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>
            </div>

            <div className="register-submit">
              <button className="register-btn" type="submit">
                Registrati
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            <div className="register-footer-link">
              <p className="register-footer-text">
                Hai già un account?{' '}
                <a
                  className="register-login-link"
                  onClick={() => navigate('/login')}
                >
                  Accedi
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;