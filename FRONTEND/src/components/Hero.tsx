import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import { useStoreTariffa } from '../stores/storeTariffa';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/Hero.css';
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const setSearchData = useStoreTariffa(state => state.setSearchCriteria);
  const reset = useStoreTariffa(state => state.reset);
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [aeroportiLista, setAeroportiLista] = useState<{ label: string; iata: string }[]>([]);
  const [fromIata, setFromIata] = useState('');
  const [toIata, setToIata] = useState('');

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFromCities = aeroportiLista.filter(a =>
    a.label.toLowerCase().includes(fromCity.toLowerCase()) ||
    a.iata.toLowerCase().includes(fromCity.toLowerCase())
  );

  const filteredToCities = aeroportiLista.filter(a =>
    a.label.toLowerCase().includes(toCity.toLowerCase()) ||
    a.iata.toLowerCase().includes(toCity.toLowerCase())
  );

  const handleSearch = () => {
    const isFromCityValid = !!fromIata;
    const isToCityValid = !!toIata;
    const areCitiesDifferent = fromIata !== toIata;
    const isDateValid = isRoundTrip ? (departureDate && returnDate) : departureDate;

    if (fromIata && toIata && isDateValid && isFromCityValid && isToCityValid && areCitiesDifferent) {
      setSearchData({
        fromCity: fromIata,
        toCity: toIata,
        fromCityLabel: fromCity,  // es. "Leonardo da Vinci (FCO)"
        toCityLabel: toCity,      // es. "Malpensa (MXP)"
        departureDate,
        returnDate,
        isRoundTrip,
      });
    if (fromCity && toCity && isDateValid && isFromCityValid && isToCityValid && areCitiesDifferent) {
      reset();
      
      setSearchData({ fromCity, toCity, departureDate, returnDate, isRoundTrip})
      navigate('/booking');
    }
  };

  async function getAeroporti() {
    try {
      const response = await fetch('/api/search');
      const data = await response.json();
      const lista = data.map((a: { name: string; codice_iata: string }) => ({
        label: `${a.name} (${a.codice_iata})`,
        iata: a.codice_iata,
      }));
      setAeroportiLista(lista);
    } catch (error) {
      console.error('Error fetching aeroporti:', error);
    }
  }

  useEffect(() => {
    getAeroporti();
  }, []);

  return (
    <section className="hero-container">
      <div className="hero-background">
        <img 
          src="../../img/gatto.png" 
          alt="Ghoan Airlines Hero" 
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">Ghoan Airlines</h1>
      </div>

      <div className="search-bar-container">
        <div className="search-bar">
          <div className="trip-types">
            <label className="trip-type-label">
              <input 
                type="radio" 
                name="trip-type" 
                checked={isRoundTrip} 
                onChange={() => setIsRoundTrip(true)}
                className="radio-input" 
              />
              <span className="radio-text">Andata e Ritorno</span>
            </label>
            <label className="trip-type-label">
              <input 
                type="radio" 
                name="trip-type" 
                checked={!isRoundTrip}
                onChange={() =>{
                  setIsRoundTrip(false);
                  setReturnDate(null);
                }}
                className="radio-input" 
              />
              <span className="radio-text">Sola Andata</span>
            </label>
          </div>

          <div className="search-fields">
            <div className="search-field" ref={fromRef}>
              <span className="field-label">Da</span>
              <div className="field-input-wrapper">
                <span className="material-symbols-outlined icon-primary">flight_takeoff</span>
                <input 
                  type="text" 
                  placeholder="Londra (LHR)" 
                  className="field-input" 
                  value={fromCity}
                  onChange={(e) => {
                    setFromCity(e.target.value);
                    setShowFromDropdown(true);
                  }}
                  onFocus={() => setShowFromDropdown(true)}
                />
              </div>
              {showFromDropdown && (
                <ul className="city-dropdown">
                  {filteredFromCities.length > 0 ? (
                    filteredFromCities.map(a => (
                      <li key={a.iata} onClick={() => {
                        setFromCity(a.label);
                        setFromIata(a.iata);
                        setShowFromDropdown(false);
                      }}>
                        {a.label}
                      </li>
                    ))
                  ) : (
                    <li className="no-results">Nessun risultato</li>
                  )}
                </ul>
              )}
            </div>

            <div className="search-field" ref={toRef}>
              <span className="field-label">A</span>
              <div className="field-input-wrapper">
                <span className="material-symbols-outlined icon-primary">flight_land</span>
                <input 
                  type="text" 
                  placeholder="Tokyo (HND)" 
                  className="field-input" 
                  value={toCity}
                  onChange={(e) => {
                    setToCity(e.target.value);
                    setShowToDropdown(true);
                  }}
                  onFocus={() => setShowToDropdown(true)}
                />
              </div>
              {showToDropdown && (
                <ul className="city-dropdown">
                  {filteredToCities.length > 0 ? (
                    filteredToCities.map(a => (
                      <li key={a.iata} onClick={() => {
                        setToCity(a.label);
                        setToIata(a.iata);
                        setShowToDropdown(false);
                      }}>
                        {a.label}
                      </li>
                    ))
                  ) : (
                    <li className="no-results">Nessun risultato</li>
                  )}
                </ul>
              )}
            </div>

            <div className="search-field date-field">
              <span className="field-label">Partenza</span>
              <div className="field-input-wrapper">
                <span className="material-symbols-outlined icon-primary">calendar_month</span>
                <DatePicker
                  selected={departureDate}
                  onChange={(date: Date | null) => setDepartureDate(date)}
                  placeholderText="Aggiungi data"
                  className="field-input"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                />
              </div>
            </div>

            <div className={`search-field no-border date-field ${!isRoundTrip ? 'opacity-50 pointer-events-none' : ''}`}>
              <span className="field-label">Ritorno</span>
              <div className="field-input-wrapper">
                <span className="material-symbols-outlined icon-primary">calendar_month</span>
                <DatePicker
                  selected={returnDate}
                  onChange={(date: Date | null) => setReturnDate(date)}
                  placeholderText={isRoundTrip ? "Aggiungi data" : "Sola andata"}
                  className="field-input"
                  dateFormat="dd/MM/yyyy"
                  minDate={departureDate || new Date()}
                  readOnly={!isRoundTrip}
                />
              </div>
            </div>
          </div>

          <div className="search-cta">
            <button 
              className="btn-search" 
              onClick={handleSearch}
            >
              <span>Cerca Voli</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
