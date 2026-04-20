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
              src="https://lh3.googleusercontent.com/aida/ADBb0ugm2X5w-HWFbTlx9AZo5eth6Dkmy7gaOX02_RTSftaMe1XKE1oTTUqpZxjiYsJl7MhO3F6_7-E-8jR9Me2GAmzPBwMB9ycMIg_N_1t78UpwfCknt4TjdIHFsVzId_tlUTSAtqmjhQp2qsBqsDtUf5qWcwP8eLlCO_J79gC4lQIaVTBzlr9OMgyr4dOELpD0q2vvp5_WKvxvkvQV2sZFEgg6DtGFsUG1CRptbfEKsDQP6BR0IgfDl_JOl-DAm6BPVqhrsEBWwgmIlQ" 
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
              src="https://lh3.googleusercontent.com/aida/ADBb0ugZDxZfpYOH9gbHzrrWm9Lfja8lHNjfMzaWo5GXzMtYMuQ6HCj_VbyPbKRtuZYTZMfGXvWFPv1sKl4lzTx6gWVNufUMYCmKq58pD2LahqxM7khvVVjeY4hhluLSn7lgh3vWWOTpElPeeoSoY3F3JfJTDihqIDdubXUmMJXBHVZpZrcKSIYwMArqbmfW8w9LiUbKUY6RaqGMFfRNa8IVV2SXdsCuLQ5qpruzhMCfQV08YbKCNyN8gJAok20vuBt_NwGw6wxoo6jVkN8" 
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
