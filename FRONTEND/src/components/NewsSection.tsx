import React from 'react';
import '../styles/NewsSection.css';

const NewsSection: React.FC = () => {
  return (
    <section className="news-section">
      <div className="news-container">
        <div className="news-header">
          <div className="header-content">
            <h2 className="news-title">Ultime notizie</h2>
            <p className="news-subtitle">Sappiamo che il mondo è grande, ma il tuo budget non deve necessariamente esserlo. </p>
          </div>
          <div className="news-nav">
            <button className="nav-btn">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="nav-btn">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="news-grid">
          <div className="news-card">
            <div className="card-overlay"></div>
            <img 
              src="../../img/gatto8.png"
              alt="Mafia News" 
              className="card-img"
            />
            <div className="card-content">
              <span className="badge badge-error">Notizie dell'Ultima Ora</span>
              <h3 className="card-title">BOSS DELLA MAFIA UCCIDE PRIGIONIERO</h3>
              <p className="card-description">Arrestato da poche ore Mune ''boss della mafia'' pilota e ceo della ghoan airline</p>
              <button className="card-link">Leggi l'Articolo</button>
            </div>
          </div>

          <div className="news-card">
            <div className="card-overlay"></div>
            <img 
              src="/img/gatto112.png" 
              alt="Sconti Esclusivi" 
              className="card-img"
            />
            <div className="card-content">
              <span className="badge badge-primary">Offerta Limitata</span>
              <h3 className="card-title">SCONTI ESCLUSIVI SOLO SUL SITO</h3>
              <p className="card-description">Prenota il tuo prossimo volo direttamente da noi per accedere alle tariffe più vantaggiose e premi fedeltà unici.</p>
              <button className="card-link">Scopri le Offerte</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
