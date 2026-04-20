import React from 'react';

const PaymentForm: React.FC = () => {
  return (
    <div className="payment-form-sections">
      {/* Passenger Details Section */}
      <section>
        <div className="payment-section-title-group">
          <span className="section-number">01</span>
          <h2 className="section-name">Dati Passeggeri</h2>
        </div>
        <div className="form-card">
          <div className="input-grid cols-2">
            <div className="input-group">
              <label className="input-label">Nome</label>
              <input className="input-field" placeholder="es. Kenji" type="text" />
            </div>
            <div className="input-group">
              <label className="input-label">Cognome</label>
              <input className="input-field" placeholder="es. Sato" type="text" />
            </div>
          </div>
          <div className="input-grid cols-3" style={{ marginTop: '2rem' }}>
            <div className="input-group">
              <label className="input-label">Data di Nascita</label>
              <input className="input-field" type="date" />
            </div>
            <div className="input-group">
              <label className="input-label">Codice Fiscale</label>
              <input className="input-field" placeholder="ABC123XYZ" type="text" />
            </div>
            <div className="input-group">
              <label className="input-label">Passaporto / Carta d'Identità</label>
              <input className="input-field" placeholder="E00000000" type="text" />
            </div>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section>
        <div className="payment-section-title-group">
          <span className="section-number">02</span>
          <h2 className="section-name">Metodo di Pagamento</h2>
        </div>
        
        <div className="payment-methods-grid">
          {/* Credit Card Option */}
          <label className="method-option">
            <input defaultChecked className="method-radio" name="payment" type="radio" />
            <div className="method-content">
              <div className="method-header">
                <span className="material-symbols-outlined method-icon primary">credit_card</span>
                <div className="radio-dot"></div>
              </div>
              <h3 className="method-name">Carta di Credito o Debito</h3>
              <p className="method-desc">Visa, Mastercard, AMEX</p>
            </div>
          </label>
          
          {/* PayPal Option */}
          <label className="method-option">
            <input className="method-radio" name="payment" type="radio" />
            <div className="method-content">
              <div className="method-header">
                <span className="material-symbols-outlined method-icon secondary">payments</span>
                <div className="radio-dot"></div>
              </div>
              <h3 className="method-name">PayPal</h3>
              <p className="method-desc">Pagamento rapido con PayPal</p>
            </div>
          </label>
        </div>

        {/* Card Details Entry */}
        <div className="form-card">
          <div className="input-group">
            <label className="input-label">Titolare della Carta</label>
            <input className="input-field" placeholder="Nome completo sulla carta" type="text" />
          </div>
          <div className="input-grid" style={{ marginTop: '1.5rem', gridTemplateColumns: '2.5fr 1fr 0.5fr' }}>
            <div className="input-group">
              <label className="input-label">Numero Carta</label>
              <input className="input-field" placeholder="0000 0000 0000 0000" type="text" />
            </div>
            <div className="input-group">
              <label className="input-label">Scadenza</label>
              <input className="input-field" placeholder="MM/AA" type="text" />
            </div>
            <div className="input-group">
              <label className="input-label">CVV</label>
              <input className="input-field" placeholder="123" type="password" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentForm;
