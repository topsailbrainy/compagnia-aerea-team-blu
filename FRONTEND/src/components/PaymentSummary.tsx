import React from 'react';
import { useNavigate } from 'react-router';
import { useStoreTariffa } from '../stores/storeTariffa';
import { useStoreTimer } from '../stores/storeTimer';

const PaymentSummary: React.FC = () => {
  const navigate = useNavigate();
  const { outboundFlight, inboundFlight, getTotalPrice, getTaxPrice } = useStoreTariffa();
  const { setTimer } = useStoreTimer();

  const total = getTotalPrice();
  const taxes = getTaxPrice();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  return (
    <aside className="payment-sidebar">
      <div className="summary-card">
        {/* Background texture element */}
        <div className="summary-bg-icon">
          <span className="material-symbols-outlined text-[200px]" style={{ fontSize: '200px', fontVariationSettings: "'FILL' 1" }}>flight_takeoff</span>
        </div>
        
        <h3 className="summary-title">Riepilogo Prenotazione</h3>
        
        <div className="summary-items">
          {outboundFlight && (
            <div className="summary-item">
              <div>
                <p className="item-label-small">Volo di Andata</p>
                <p className="item-name">Tokyo → Parigi</p>
                <p className="item-details">24 Maggio 2024 • 12:45</p>
              </div>
              <div className="text-right">
                <p className="item-price">{formatCurrency(outboundFlight.price)}</p>
              </div>
            </div>
          )}

          {inboundFlight && (
            <div className="summary-item">
              <div>
                <p className="item-label-small">Volo di Ritorno</p>
                <p className="item-name">Parigi → Tokyo</p>
                <p className="item-details">31 Maggio 2024 • 10:20</p>
              </div>
              <div className="text-right">
                <p className="item-price">{formatCurrency(inboundFlight.price)}</p>
              </div>
            </div>
          )}

          <div className="summary-row">
            <p className="row-label">Tasse e Commissioni</p>
            <p className="row-value">{formatCurrency(taxes)}</p>
          </div>

          <div className="final-total-card">
            <div>
              <p className="total-label-small">Totale da pagare</p>
              <p className="total-amount-large">{formatCurrency(total)}</p>
            </div>
            <span className="material-symbols-outlined verified-icon" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
        </div>

        <button
          className="btn-pay"
          onClick={() => {
            setTimer(0);
            navigate('/booking-confirmed');
          }}
        >
          Completa Pagamento
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        
        <div className="security-footer">
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>lock</span>
          <p className="security-label">Pagamento SSL Sicuro</p>
        </div>
      </div>

      {/* Mascot Integration */}
      <div className="help-card">
        <img 
          alt="Ghoan Mascot" 
          className="mascot-img-help" 
          src="https://lh3.googleusercontent.com/aida/ADBb0ui1Yk6P1w8uQC3HaxIE_dB8Aa2kC_o3X8dTlvedk7VrAQ59aFMecYe4renS4zwo8pra1HEdjUL1FCyGu3RmCKATJ7_oShk1gohWpuwv828wpNrWWYqoXWLfbWs-eFYwNWQ2PoyUPmzHWYiX3lD0j3E-MoDuIiFgMg_izAo2Sm-1RIm6D-qdAWIOHIkHfGOjIK5NVFWCBt_fBatO1m5yTt6MVXj2RLNarIIpsNvDJKE8khrYxoY7kVjuMr2u3e_LET21mHSGb28DPA" 
        />
        <div className="help-content">
          <p className="help-title">Serve aiuto con la tua prenotazione?</p>
          <button className="btn-chat">
            Chatta con Ghoan
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>chat</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default PaymentSummary;
