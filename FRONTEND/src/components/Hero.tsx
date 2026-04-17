import React from 'react';
import '../styles/Hero.css';

const Hero: React.FC = () => {
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
              <input type="radio" name="trip-type" defaultChecked className="radio-input" />
              <span className="radio-text">Round Trip</span>
            </label>
            <label className="trip-type-label">
              <input type="radio" name="trip-type" className="radio-input" />
              <span className="radio-text">One Way</span>
            </label>
          </div>

          <div className="search-fields">
            <div className="search-field">
              <span className="field-label">From</span>
              <div className="field-input-wrapper">
                <span className="material-symbols-outlined icon-primary">flight_takeoff</span>
                <input type="text" placeholder="London (LHR)" className="field-input" />
              </div>
            </div>
            <div className="search-field">
              <span className="field-label">To</span>
              <div className="field-input-wrapper">
                <span className="material-symbols-outlined icon-primary">flight_land</span>
                <input type="text" placeholder="Tokyo (HND)" className="field-input" />
              </div>
            </div>
            <div className="search-field">
              <span className="field-label">Depart</span>
              <div className="field-input-wrapper">
                <span className="material-symbols-outlined icon-primary">calendar_month</span>
                <input type="text" placeholder="Add date" className="field-input" />
              </div>
            </div>
            <div className="search-field no-border">
              <span className="field-label">Return</span>
              <div className="field-input-wrapper">
                <span className="material-symbols-outlined icon-primary">calendar_month</span>
                <input type="text" placeholder="Add date" className="field-input" />
              </div>
            </div>
          </div>

          <div className="search-cta">
            <button className="btn-search">
              <span>Search Flights</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
