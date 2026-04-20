import React from 'react';
import PaymentForm from '../components/PaymentForm';
import PaymentSummary from '../components/PaymentSummary';
import '../styles/Payment.css';

const Payment: React.FC = () => {
  return (
    <div className="payment-page">
      <main className="payment-container">
        {/* Editorial Header Section */}
        <header className="payment-header">
          <div className="payment-title-group">
            <h1 className="payment-title">
              Dettagli Passeggeri e <span>Pagamento.</span>
            </h1>
            <p className="payment-subtitle">
              Inserisci i dettagli del viaggiatore e completa il pagamento sicuro per confermare il tuo posto con lo Spirito di Ghoan.
            </p>
          </div>

          {/* Timer Card */}
          <div className="timer-card">
            <div className="timer-icon-wrapper">
              <span className="material-symbols-outlined timer-icon" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
            </div>
            <div>
              <p className="timer-label">La sessione scade tra</p>
              <p className="timer-value">19:45</p>
            </div>
          </div>
        </header>

        <div className="payment-layout">
          {/* Main Form Section */}
          <div className="payment-main-content">
            <PaymentForm />
          </div>

          {/* Summary Sidebar */}
          <PaymentSummary />
        </div>
      </main>
    </div>
  );
};

export default Payment;
