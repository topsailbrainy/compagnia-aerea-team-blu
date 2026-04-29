import React, { useEffect, useState } from 'react';
import FlightCard from '../components/FlightCard';
import BookingSidebar from '../components/BookingSidebar';
import { useStoreTariffa } from '../stores/storeTariffa';
import '../styles/Booking.css';

interface searchData {
  origin: string;
  destination: string;
  date: string;
}

interface Voli {
    tratte_id: string;
    aerei_id: string;
    gates_id: string;
    aereoporto_codice_IATA: string;
    data_partenza: string;
    data_arrivo: string;
    orario_partenza: string;
    orario_arrivo: string;
};
const Booking: React.FC = () => {
  const { isRoundTrip, outboundFlight, inboundFlight, toggleFlight, fromCity, toCity, fromCityLabel, toCityLabel, departureDate, returnDate } = useStoreTariffa();
  const [dataV, setDataV] = useState<Voli[]>([]);
  const [dataVReturn, setDataVReturn] = useState<Voli[]>([]);

  const getVoli = async (searchData: searchData) => {
    try {
      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchData)
      });
      const data = await response.json();
      setDataV(Array.isArray(data) ? data : data.rows ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  const getVoliRitorno = async (origin: string, destination: string, date: string) => {
    try {
      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination, date })
      });
      const data = await response.json();
      setDataVReturn(Array.isArray(data) ? data : data.rows ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  // Formato per visualizzazione (es. 20/05/2026)
  const formatDateDisplay = (date: Date | null) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Formato ISO per il backend (es. 2026-05-20)
  const formatDateISO = (date: Date | null) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Rimuove i secondi: "10:00:00" → "10:00"
  const formatTime = (time: string) => time?.slice(0, 5) ?? time;

  // Calcola durata reale tra due orari "HH:MM:SS"
  const calcDuration = (dep: string, arr: string): string => {
    const [dh, dm] = dep.split(':').map(Number);
    const [ah, am] = arr.split(':').map(Number);
    let diff = (ah * 60 + am) - (dh * 60 + dm);
    if (diff < 0) diff += 24 * 60;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m`;
  };

  useEffect(() => {
    if (fromCity && toCity && departureDate) {
      getVoli({ origin: fromCity, destination: toCity, date: formatDateISO(departureDate) });
    }
  }, [fromCity, toCity, departureDate]);

  useEffect(() => {
    if (isRoundTrip && toCity && fromCity && returnDate) {
      getVoliRitorno(toCity, fromCity, formatDateISO(returnDate));
    } else {
      setDataVReturn([]);
    }
  }, [isRoundTrip, toCity, fromCity, returnDate]);

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
              <span className="summary-city">{fromCityLabel || fromCity}</span>
              <span className="material-symbols-outlined summary-icon">arrow_forward</span>
              <span className="summary-city">{toCityLabel || toCity}</span>
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
                  Volo di Andata <span className="section-date">{formatDateDisplay(departureDate)}</span>
                </h2>
              </div>
              <div className="cards-stack">
                {dataV.map((flight, id) => (
                  <FlightCard 
                    id={id.toString()}
                    departureTime={formatTime(flight.orario_partenza)}
                    departureCity={fromCityLabel || fromCity}
                    arrivalTime={formatTime(flight.orario_arrivo)}
                    arrivalCity={toCityLabel || toCity}
                    duration={calcDuration(flight.orario_partenza, flight.orario_arrivo)}
                    price={100}
                    stops="Diretto"
                    isDirect={true}
                    type="outbound"
                    isSelected={outboundFlight?.id === id.toString()}
                    onSelect={() =>
                      toggleFlight({
                        id: id.toString(),
                        fromCity,
                        toCity,
                        type: 'outbound',
                        price: 100,
                        orario: flight.orario_partenza,
                        data: departureDate!,
                      })
                    }
                  />
                ))}
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
                    Volo di Ritorno <span className="section-date">{formatDateDisplay(returnDate)}</span>
                  </h2>
                </div>
                
                <div className="cards-stack">
                  {dataVReturn.length > 0 ? (
                    dataVReturn.map((flight, id) => (
                      <FlightCard
                        key={`in-${id}`}
                        id={`in-${id}`}
                        departureTime={formatTime(flight.orario_partenza)}
                        departureCity={toCityLabel || toCity}
                        arrivalTime={formatTime(flight.orario_arrivo)}
                        arrivalCity={fromCityLabel || fromCity}
                        duration={calcDuration(flight.orario_partenza, flight.orario_arrivo)}
                        price={100}
                        stops="Diretto"
                        isDirect={true}
                        type="inbound"
                        isSelected={inboundFlight?.id === `in-${id}`}
                        onSelect={() => toggleFlight({
                          id: `in-${id}`,
                          fromCity: toCity,
                          toCity: fromCity,
                          type: 'inbound',
                          price: 100,
                          orario: flight.orario_partenza,
                          data: returnDate!,
                        })}
                      />
                    ))
                  ) : (
                    <p className="no-flights-msg">Nessun volo di ritorno trovato per questa data.</p>
                  )}
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
