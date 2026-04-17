import React from 'react';
import '../styles/BookingSidebar.css';

const BookingSidebar: React.FC = () => {
  return (
    <aside className="booking-sidebar">
      <div className="fare-details-card">
        <h3 className="details-title">Dettagli Tariffa</h3>
        
        <div className="benefits-list">
          <div className="benefit-item">
            <span className="material-symbols-outlined benefit-icon">check_circle</span>
            <div>
              <p className="benefit-label">Cambio Flessibile Incluso</p>
              <p className="benefit-desc">Cambia le date fino a 24 ore prima della partenza.</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="material-symbols-outlined benefit-icon">check_circle</span>
            <div>
              <p className="benefit-label">2x Bagagli da Stiva</p>
              <p className="benefit-desc">23kg ciascuno inclusi per la Black Belt Class.</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="material-symbols-outlined benefit-icon">check_circle</span>
            <div>
              <p className="benefit-label">Menu Dojo in Volo</p>
              <p className="benefit-desc">Cucina giapponese premium e snack.</p>
            </div>
          </div>
        </div>

        <div className="summary-footer">
          <div className="summary-header">
            <span className="summary-label">Voli Selezionati</span>
            <span className="selection-status">2/2 SELEZIONATI</span>
          </div>
          
          <div className="cost-breakdown">
            <div className="cost-row">
              <span>Adulti (x2)</span>
              <span className="cost-value">$1,250.00</span>
            </div>
            <div className="cost-row">
              <span>Tasse e Commissioni</span>
              <span className="cost-value">$208.00</span>
            </div>
          </div>

          <button className="btn-confirm">
            CONFERMA SELEZIONE
          </button>
        </div>
      </div>

      <div className="promo-card">
        <div className="promo-overlay"></div>
        <div className="promo-content">
          <h4 className="promo-title">Serve più spazio?</h4>
          <p className="promo-desc">
            Passa alla <span className="sayan-class">Sayan Class</span> per sedili completamente reclinabili e accesso alla lounge privata.
          </p>
          <button className="btn-upgrade">MIGLIORA ORA</button>
        </div>
      </div>
    </aside>
  );
};

export default BookingSidebar;
