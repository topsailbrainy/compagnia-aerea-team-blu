import React from 'react';
import { useNavigate } from 'react-router';
import { useStoreTariffa } from '../stores/storeTariffa';
import { useStoreTimer } from '../stores/storeTimer';

const PaymentSummary: React.FC = () => {
  const days = ["Lunedi","Martedi","Mercoledi","Giovedi","Venerdi","Sabato","Domenica"]
  const navigate = useNavigate();
 const { 
  outboundFlight, 
  inboundFlight, 
  getTotalPrice, 
  getTaxPrice,
  passegero,
  pagamento,
  } = useStoreTariffa();
  const { setTimer } = useStoreTimer();

  const total = getTotalPrice();
  const taxes = getTaxPrice();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

 const handleUtente = () => {
  const isUtenteValido =
    !!passegero?.nome &&
    !!passegero?.cognome &&
    !!passegero?.dataNascita &&
    !!passegero?.codiceFiscale &&
    !!passegero?.documento;

  const isPagamentoValido =
    !!pagamento?.titolare &&
    (
      (!!pagamento?.numeroCarta && !!pagamento?.scadenza && !!pagamento?.cvv) ||
      !!pagamento?.email
    );

  const isFormValido = isUtenteValido && isPagamentoValido;

  if (!isFormValido) {
    alert("Devi completare tutti i campi prima di procedere");
    return; // ❌ blocca la navigazione
  }

  setTimer(0);
  navigate('/booking-confirmed'); // ✅ solo se tutto ok
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
                <p className="item-name">{outboundFlight.fromCity + "→" + outboundFlight.toCity}</p>
                <p className="item-details">{days[outboundFlight.data.getDay()]+", "+outboundFlight.data.getDate()+"/"+outboundFlight.data.getMonth()+"/"+outboundFlight.data.getFullYear() + " • " + outboundFlight.orario}</p>
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
                <p className="item-name">{inboundFlight.fromCity + "→" + inboundFlight.toCity}</p>
                <p className="item-details">{days[inboundFlight.data.getDay()]+", "+inboundFlight.data.getDate()+"/"+inboundFlight.data.getMonth()+"/"+inboundFlight.data.getFullYear() + " • " + inboundFlight.orario}</p>
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
          onClick={handleUtente}
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
          src="/img/gatto2.png"
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
