import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStoreUser } from '../stores/storeUser';
import '../styles/Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setLogged } = useStoreUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore durante il login');
      }

      // Login successo
      const authHeader = btoa(`${email}:${password}`);
      setLogged(true, authHeader, data.user.admin);
      
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-section">
          <img
            alt="Ghoan Airlines purple plane with cat mascot"
            className="login-image"
            src="/img/gatto.png"
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
          <form className="login-form" onSubmit={handleLogin}>
            {error && <div className="login-error" style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
            <div className="login-form-fields">
              <div className="login-field">
                <label className="login-label">Email / Username</label>
                <input
                  className="login-input"
                  placeholder="nome@esempio.it"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-field">
                <label className="login-label">Password</label>
                <input
                  className="login-input"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="login-forgot">
                <a className="login-forgot-link" href="#">
                  Password dimenticata?
                </a>
              </div>
            </div>
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'Accesso in corso...' : 'Accedi'}
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