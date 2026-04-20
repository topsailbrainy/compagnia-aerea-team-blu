import React from 'react';
import FlightCard from '../components/FlightCard';
import BookingSidebar from '../components/BookingSidebar';
import { useStoreTariffa } from '../stores/storeTariffa';
import '../styles/Booking.css';

const Booking: React.FC = () => {
  const { isRoundTrip, outboundFlight, inboundFlight, toggleFlight, fromCity, toCity, departureDate, returnDate } = useStoreTariffa();

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        {/* Header di Contesto */}
        <section className="booking-header">
          <div className="header-info">
            <h1 className="booking-title">Seleziona il tuo volo</h1>
            <div className="search-summary">
              <span className="summary-badge">{isRoundTrip ? 'Andata e Ritorno' : 'Sola Andata'}</span>
              <span className="material-symbols-outlined summary-icon">flight_takeoff</span>
              <span className="summary-city">{fromCity}</span>
              <span className="material-symbols-outlined summary-icon">arrow_forward</span>
              <span className="summary-city">{toCity}</span>
              <span className="summary-divider">|</span>
              <span className="summary-passengers">2 Viaggiatori</span>
            </div>
          </div>
        </section>

        <div className="booking-layout">
          {/* Lista Voli */}
          <div className="flight-listings">
            {/* Sezione Andata */}
            <div className="flight-section">
              <div className="section-title-wrapper">
                <div className="section-icon-circle outbound">
                  <span className="material-symbols-outlined">flight_takeoff</span>
                </div>
                <h2 className="section-title">
                  Volo di Andata <span className="section-date">{formatDate(departureDate)}</span>
                </h2>
              </div>
              
              <div className="cards-stack">
                <FlightCard 
                  id="out-1"
                  departureTime="09:15"
                  departureCity={fromCity}
                  arrivalTime="08:35"
                  arrivalCity={toCity}
                  duration="13h 20m"
                  price={729}
                  stops="Diretto"
                  isDirect={true}
                  type="outbound"
                  isSelected={outboundFlight?.id === 'out-1'}
                  onSelect={() => toggleFlight({ id: 'out-1', type: 'outbound', price: 729 })}
                />
                <FlightCard 
                  id="out-2"
                  departureTime="14:40"
                  departureCity={fromCity}
                  arrivalTime="16:25"
                  arrivalCity={toCity}
                  duration="16h 45m"
                  price={580}
                  stops="1 Scalo (ICN)"
                  isDirect={false}
                  type="outbound"
                  isSelected={outboundFlight?.id === 'out-2'}
                  onSelect={() => toggleFlight({ id: 'out-2', type: 'outbound', price: 580 })}
                />
              </div>
            </div>

            {/* Sezione Ritorno */}
            {isRoundTrip && (
              <div className="flight-section">
                <div className="section-title-wrapper">
                  <div className="section-icon-circle inbound">
                    <span className="material-symbols-outlined">flight_land</span>
                  </div>
                  <h2 className="section-title">
                    Volo di Ritorno <span className="section-date">{formatDate(returnDate)}</span>
                  </h2>
                </div>
                
                <div className="cards-stack">
                  <FlightCard 
                    id="in-1"
                    departureTime="11:20"
                    departureCity={toCity}
                    arrivalTime="15:25"
                    arrivalCity={fromCity}
                    duration="14h 05m"
                    price={729}
                    stops="Diretto"
                    isDirect={true}
                    type="inbound"
                    isSelected={inboundFlight?.id === 'in-1'}
                    onSelect={() => toggleFlight({ id: 'in-1', type: 'inbound', price: 729 })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <BookingSidebar />
        </div>
      </div>
    </div>
  );
};

export default Booking;
