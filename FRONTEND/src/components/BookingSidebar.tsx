import React from 'react';
import { useNavigate } from 'react-router';
import { useStoreTariffa } from '../stores/storeTariffa';
import '../styles/BookingSidebar.css';
import { useStoreTimer } from '../stores/storeTimer';

const BookingSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { isRoundTrip, outboundFlight, inboundFlight, getTotalPrice, getTaxPrice } = useStoreTariffa();
  const { getTimer, setTimer } = useStoreTimer();
  
  const total = getTotalPrice();
  const taxes = getTaxPrice();
  const flightsCost = (outboundFlight?.price || 0) + (inboundFlight?.price || 0);
  
  const selectedCount = (outboundFlight ? 1 : 0) + (inboundFlight ? 1 : 0);
  const totalRequired = isRoundTrip ? 2 : 1;
  const isSelectionComplete = isRoundTrip 
    ? (outboundFlight !== null && inboundFlight !== null)
    : (outboundFlight !== null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const goToPayment = () => {
    if(getTimer()<1000){
      setTimer();
    }
    navigate('/payment')
  }

  return (
    <aside className="booking-sidebar">

      <div className="summary-total-card">
            <div className="total-header">
              <p className="total-label">Tariffa Totale</p>
              <span className="material-symbols-outlined wallet-icon">account_balance_wallet</span>
            </div>
            <div className="total-amount">{formatCurrency(total)}</div>
            <p className="total-note">Include tasse e commissioni</p>
          </div>

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
            <span className="selection-status">{selectedCount}/{totalRequired} SELEZIONATI</span>
          </div>
          
          <div className="cost-breakdown">
            <div className="cost-row">
              <span>Voli</span>
              <span className="cost-value">{formatCurrency(flightsCost)}</span>
            </div>
            <div className="cost-row">
              <span>Tasse e Commissioni</span>
              <span className="cost-value">{formatCurrency(taxes)}</span>
            </div>
          </div>

          <button 
            className="btn-confirm" 
            disabled={!isSelectionComplete}
            onClick={goToPayment}
          >
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
