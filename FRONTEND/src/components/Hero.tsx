import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import { useStoreTariffa } from '../stores/storeTariffa';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/Hero.css';

const cities = ["Roma", "Milano", "Parigi", "Londra", "New York"];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const setSearchData = useStoreTariffa(state => state.setSearchCriteria);
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRoundTrip) {
      setReturnDate(null);
    }
  }, [isRoundTrip]);

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

  const filteredFromCities = cities.filter(city => 
    city.toLowerCase().startsWith(fromCity.toLowerCase())
  );

  const filteredToCities = cities.filter(city => 
    city.toLowerCase().startsWith(toCity.toLowerCase())
  );

  const handleSearch = () => {
    const isFromCityValid = cities.includes(fromCity);
    const isToCityValid = cities.includes(toCity);
    const areCitiesDifferent = fromCity !== toCity;
    const isDateValid = isRoundTrip ? (departureDate && returnDate) : departureDate;

    if (fromCity && toCity && isDateValid && isFromCityValid && isToCityValid && areCitiesDifferent) {
      setSearchData({ fromCity, toCity, departureDate, returnDate, isRoundTrip})
      navigate('/booking');
    }
  };

  return (
    <section className="hero-container">
      <div className="hero-background">
        <img 
          src="https://lh3.googleusercontent.com/aida/ADBb0ujL78TpcU7958C3fsOGp106hET3AQUgX7HlU_rc-8pwZm0x0ny0KBRETeGfuEk56_pPQyRlhERNycujBfBCfF8bSLgwCW_hYe-bUcrN4lFnrpCd_ijcb6H86hJJL1ERTE8xi85j8K5iQazmOaO2eZwszk3PJAqFfFryuO0qYhGzUf-JdEgytJ1fnIzbU-BNucN9mf02RphCTFTl7ViLoj4TxHMnlPXX_JOkmfJN8TKbtxO0yAyJI9U1nZnhPG9XbPhJ2hEX4vIYrJw" 
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
                onChange={() => setIsRoundTrip(false)}
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
                    filteredFromCities.map(city => (
                      <li key={city} onClick={() => {
                        setFromCity(city);
                        setShowFromDropdown(false);
                      }}>
                        {city}
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
                    filteredToCities.map(city => (
                      <li key={city} onClick={() => {
                        setToCity(city);
                        setShowToDropdown(false);
                      }}>
                        {city}
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
                  onChange={(date) => setDepartureDate(date)}
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
                  onChange={(date) => setReturnDate(date)}
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
