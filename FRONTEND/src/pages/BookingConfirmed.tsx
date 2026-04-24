import React from 'react';
import { useNavigate } from 'react-router';
import '../styles/BookingConfirmed.css';

const BookingConfirmed: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="booking-confirmed-page">
      <main className="booking-confirmed-main">
        <div className="booking-confirmed-container">
          <div className="booking-confirmed-hero">
            <div className="booking-confirmed-hero-bg">
              <span className="material-symbols-outlined">flight_takeoff</span>
            </div>
            <img
              alt="Spirit of Ghoan mascot cat in purple martial arts uniform giving a thumbs up"
              className="booking-confirmed-hero-img"
              src="https://lh3.googleusercontent.com/aida/ADBb0uhWgTiw0BxFL7Pqx7yOZvut7XHZsbCkVMdMZOJpWXopnYJu9A3i8OFa6eMIJWsLeeRjbc_BG0gHXASt-vPRm2Y7gGaNJGOE-BZw5g_9tk-5BSE1xNd8yoJ22pQzIOK8SLmQLThgkCIGfhq82IymFgfzZdlFGtnY82ilYhKoZlrHpP7bXiuZQo4YHlajD08tB2b4juNF0t8MYJfgSB7_cvJdNaXuKFkPKTnWncXKxBfCDjfPLAuKbk9SsSc3MegRc5ZewLCQwOOr8w"
            />
            <h1 className="booking-confirmed-title">
              Grazie per l'acquisto!
            </h1>
            <p className="booking-confirmed-subtitle">
              Il tuo viaggio con Ghoan Airlines sta per iniziare. Abbiamo preparato tutto per la tua prossima avventura.
            </p>
          </div>

          <div className="booking-confirmed-ticket">
            <div className="booking-confirmed-ticket-header">
              <div className="booking-confirmed-ticket-header-left">
                <span className="material-symbols-outlined booking-confirmed-ticket-icon">confirmation_number</span>
                <span className="booking-confirmed-ticket-header-title">Boarding Pass</span>
              </div>
              <div className="booking-confirmed-ticket-header-right">
                <p className="booking-confirmed-ticket-priority-label">Priority</p>
                <p className="booking-confirmed-ticket-class">Black Belt Class</p>
              </div>
            </div>

            <div className="booking-confirmed-ticket-body">
              <div className="booking-confirmed-details">
                <div>
                  <p className="booking-confirmed-detail-label">Name</p>
                  <p className="booking-confirmed-detail-value">Alessandro</p>
                </div>
                <div>
                  <p className="booking-confirmed-detail-label">Surname</p>
                  <p className="booking-confirmed-detail-value">Rossi</p>
                </div>
                <div className="booking-confirmed-detail-value full-width">
                  <p className="booking-confirmed-detail-label">Tax Code</p>
                  <p className="booking-confirmed-detail-value tracking-widest">RSSLSN85M01H501Z</p>
                </div>
                <div>
                  <p className="booking-confirmed-detail-label">GATE</p>
                  <div>
                    <span className="booking-confirmed-gate-badge">B24</span>
                  </div>
                </div>
                <div>
                  <p className="booking-confirmed-detail-label">FLIGHT</p>
                  <p className="booking-confirmed-flight-number">GH-2024</p>
                </div>
              </div>

              <div className="booking-confirmed-qr-section">
                <div className="booking-confirmed-qr-wrapper">
                  <img
                    alt="A realistic black and white QR code for flight boarding"
                    className="booking-confirmed-qr-img"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOhqriSsSdjoXt-bPDymVvCTpjgPAy2TKhKZlzg-aocU7A6CWsfH5vj44_Cm2rzM9Um_FjpnPpmYBXvJjmtkDZNzeVFDTpQYb_cQ_uc7YM-EKOJRlcQFNeoWj2xVi51m5LIHw8mmfEy5acFVXr25423ImwsMDpF4yXhXQbGIBIckqrt_KG6KuChYMh4jUdXtvh61LmCBv12oLirdQnghdPAKnkNCwbPyEtnadJquweTuTQwAjXZ_Uo7lmKJElTJCZq9z2SG1mhAoyA"
                  />
                </div>
                <p className="booking-confirmed-qr-label">SCAN TO BOARD</p>
              </div>
            </div>

            <div className="booking-confirmed-divider">
              <div className="booking-confirmed-divider-line"></div>
              <div className="booking-confirmed-divider-dot-left"></div>
              <div className="booking-confirmed-divider-dot-right"></div>
            </div>

            <div className="booking-confirmed-ticket-footer">
              <div className="booking-confirmed-route">
                <div className="booking-confirmed-airport">
                  <span className="booking-confirmed-airport-code">MXP</span>
                  <span className="booking-confirmed-airport-city">Milan</span>
                </div>
                <span className="material-symbols-outlined booking-confirmed-route-arrow">east</span>
                <div className="booking-confirmed-airport">
                  <span className="booking-confirmed-airport-code">NRT</span>
                  <span className="booking-confirmed-airport-city">Tokyo</span>
                </div>
              </div>
              <div className="booking-confirmed-boarding-time">
                <p className="booking-confirmed-boarding-time-label">BOARDING TIME</p>
                <p className="booking-confirmed-boarding-time-value">10:45 AM</p>
              </div>
            </div>
          </div>

          <div className="booking-confirmed-actions">
            <button className="booking-confirmed-btn booking-confirmed-btn-primary">
              <span className="material-symbols-outlined">download</span>
              Scarica Biglietto PDF
            </button>
            <button
              className="booking-confirmed-btn booking-confirmed-btn-secondary"
              onClick={() => navigate('/')}
            >
              <span className="material-symbols-outlined">home</span>
              Torna alla Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmed;