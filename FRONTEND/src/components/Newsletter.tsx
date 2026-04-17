import React from 'react';
import '../styles/Newsletter.css';

const Newsletter: React.FC = () => {
  return (
    <section className="newsletter-section">
      <div className="dragonball db-1">
        <span className="db-star">★</span>
      </div>
      <div className="dragonball db-2">
        <div className="db-stars-grid">
          <span className="db-star">★</span>
          <span className="db-star">★</span>
          <span className="db-star">★</span>
          <span className="db-star">★</span>
        </div>
      </div>
      <div className="dragonball db-3">
        <div className="db-stars-col">
          <div className="db-stars-row"><span className="db-star">★</span><span className="db-star">★</span></div>
          <div className="db-stars-row"><span className="db-star">★</span><span className="db-star">★</span><span className="db-star">★</span></div>
          <div className="db-stars-row"><span className="db-star">★</span><span className="db-star">★</span></div>
        </div>
      </div>

      <div className="newsletter-container">
        <div className="newsletter-header">
          <div className="dragonball db-small">
            <span className="db-star small">★</span>
          </div>
          <h2 className="newsletter-title">Pronto per la tua prossima avventura?</h2>
          <div className="dragonball db-small">
            <span className="db-star small">★</span>
          </div>
        </div>
        
        <p className="newsletter-subtitle">
          Iscriviti alla nostra newsletter per ricevere offerte esclusive e novità direttamente nella tua casella di posta.
        </p>

        <form className="newsletter-form">
          <input 
            type="email" 
            placeholder="Il tuo indirizzo email" 
            className="newsletter-input" 
          />
          <button type="submit" className="newsletter-btn">
            Iscriviti
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
