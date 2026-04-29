import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStoreUser } from '../stores/storeUser';
import '../styles/Register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setLogged } = useStoreUser();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Le password non coincidono');
      return;
    }

    setLoading(true);

    try {
      // Semplice split per nome e cognome
      const parts = fullName.trim().split(' ');
      const name = parts[0] || '';
      const surname = parts.slice(1).join(' ') || '';

      if (!name || !surname) {
        throw new Error('Inserisci sia nome che cognome (separati da spazio)');
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore durante la registrazione');
      }

      // Registrazione successo -> Login automatico
      setLogged(true);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          <form className="register-form" onSubmit={handleRegister}>
            {error && <div className="register-error" style={{ color: '#ff4444', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
            <div className="register-field">
              <label className="register-label">Full Name</label>
              <div className="register-input-wrapper">
                <span className="material-symbols-outlined register-input-icon">person</span>
                <input
                  className="register-input"
                  placeholder="Nome e Cognome"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="register-submit">
              <button className="register-btn" type="submit" disabled={loading}>
                {loading ? 'Elaborazione...' : 'Registrati'}
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