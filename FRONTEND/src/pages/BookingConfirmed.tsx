import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useStoreTariffa } from '../stores/storeTariffa';
import { useStoreUser } from '../stores/storeUser';
import '../styles/BookingConfirmed.css';

const BookingConfirmed: React.FC = () => {
  const navigate = useNavigate();
  const { outboundFlight, inboundFlight, fromCityLabel, toCityLabel } = useStoreTariffa();
  const { userAuth } = useStoreUser();

  useEffect(() => {
    const saveBooking = async () => {
      if (!outboundFlight) {
        console.warn("[FRONTEND] Mancano i dati del volo nello store. Impossibile salvare.");
        return;
      }
      if (!userAuth) {
        console.warn("[FRONTEND] Utente non autenticato nello store. Impossibile salvare.");
        return;
      }

      const flightIds = [parseInt(outboundFlight.id)];

      if (inboundFlight) {
        flightIds.push(parseInt(inboundFlight.id));
      }

      console.log("[FRONTEND] Tentativo di salvataggio prenotazione per voli:", flightIds);

      try {
        const response = await fetch('/api/prenotazione', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${userAuth}`
          },
          body: JSON.stringify({ flightIds })
        });
        
        const resData = await response.json();
        if (response.ok) {
            console.log("[FRONTEND] Prenotazione salvata con successo!", resData);
        } else {
            console.error("[FRONTEND] Errore salvataggio:", resData.error);
        }
      } catch (error) {
        console.error("[FRONTEND] Errore connessione API prenotazione:", error);
      }

    };

    saveBooking();
  }, [outboundFlight, inboundFlight, userAuth]);


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
              src="/img/gatto3.png"
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
                  <p className="booking-confirmed-detail-label">DESTINAZIONE</p>
                  <p className="booking-confirmed-detail-value">{toCityLabel}</p>
                </div>
                <div>
                  <p className="booking-confirmed-detail-label">PARTENZA</p>
                  <p className="booking-confirmed-detail-value">{fromCityLabel}</p>
                </div>
                <div className="booking-confirmed-detail-value full-width">
                  <p className="booking-confirmed-detail-label">STATO PRENOTAZIONE</p>
                  <p className="booking-confirmed-detail-value tracking-widest">CONFERMATA - PAGATA</p>
                </div>
                <div>
                  <p className="booking-confirmed-detail-label">GATE</p>
                  <div>
                    <span className="booking-confirmed-gate-badge">B{Math.floor(Math.random() * 30) + 1}</span>
                  </div>
                </div>
                <div>
                  <p className="booking-confirmed-detail-label">VOLO</p>
                  <p className="booking-confirmed-flight-number">GH-{outboundFlight?.id || '2024'}</p>
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
                  <span className="booking-confirmed-airport-code">{outboundFlight?.fromCity || 'MXP'}</span>
                  <span className="booking-confirmed-airport-city">{fromCityLabel}</span>
                </div>
                <span className="material-symbols-outlined booking-confirmed-route-arrow">east</span>
                <div className="booking-confirmed-airport">
                  <span className="booking-confirmed-airport-code">{outboundFlight?.toCity || 'NRT'}</span>
                  <span className="booking-confirmed-airport-city">{toCityLabel}</span>
                </div>
              </div>
              <div className="booking-confirmed-boarding-time">
                <p className="booking-confirmed-boarding-time-label">ORARIO PARTENZA</p>
                <p className="booking-confirmed-boarding-time-value">{outboundFlight?.orario || '10:45 AM'}</p>
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