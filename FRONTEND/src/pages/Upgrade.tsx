import React from 'react';
import '../styles/Upgrade.css';

const Upgrade: React.FC = () => {
  return (
    <>
      <div className="upgrade-page">
        <main className="upgrade-main">
          <section className="upgrade-hero">
            <div className="upgrade-hero-grid">
              <div className="upgrade-hero-content">
                <img src="/img/gatto113.png" alt="Ghoan Airlines" className="upgrade-hero-logo" />
                <span className="upgrade-badge">Esclusivo</span>
                <h1 className="upgrade-title">
                  Diventa un <br />
                  <span className="upgrade-title-accent">Black Belt</span>
                  <br />
                  Risveglia il Potere del Tuo Viaggio
                </h1>
                <p className="upgrade-subtitle">
                  L'eccellenza nel volo non è un traguardo, ma un'abitudine. Unisciti all'élite e trasforma ogni viaggio in un'esperienza di pura disciplina e comfort.
                </p>
                <div className="upgrade-hero-actions">
                  <button className="upgrade-primary-btn">Inizia Ora</button>
                  <button className="upgrade-secondary-btn">Scopri i Vantaggi</button>
                </div>
              </div>
              
              <div className="upgrade-hero-image">
                <img
                  src="/img/gatto7.png"
                  alt="Ghoan Mascot"
                  className="upgrade-hero-img"
                />
              </div>
            </div>
          </section>

          <section className="upgrade-benefits-section">
            <div className="upgrade-benefits-container">
              <div className="upgrade-benefits-header">
                <h2 className="upgrade-benefits-title">Privilegi su Misura</h2>
                <div className="upgrade-benefits-line"></div>
              </div>
              
              <div className="upgrade-benefits-grid">
                <div className="upgrade-benefit-card">
                  <div className="upgrade-benefit-icon primary">
                    <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>sell</span>
                  </div>
                  <h3 className="upgrade-benefit-title">Sconti Esclusivi</h3>
                  <p className="upgrade-benefit-desc">
                    Risparmia il 15% su ogni volo prenotato, per qualsiasi destinazione nel mondo, senza restrizioni di data.
                  </p>
                  <div className="upgrade-benefit-divider"></div>
                </div>
                
                <div className="upgrade-benefit-card">
                  <div className="upgrade-benefit-icon secondary">
                    <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>luggage</span>
                  </div>
                  <h3 className="upgrade-benefit-title">Bagaglio Extra</h3>
                  <p className="upgrade-benefit-desc">
                    Porta con te tutto ciò che serve senza costi aggiuntivi. La tua attrezzatura e i tuoi ricordi viaggiano gratis.
                  </p>
                  <div className="upgrade-benefit-divider"></div>
                </div>
                
                <div className="upgrade-benefit-card">
                  <div className="upgrade-benefit-icon primary">
                    <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>bolt</span>
                  </div>
                  <h3 className="upgrade-benefit-title">Priorità Imbarco</h3>
                  <p className="upgrade-benefit-desc">
                    Salta la fila e rilassati prima di decollare. Goditi l'accesso prioritario ai varchi di sicurezza e al gate.
                  </p>
                  <div className="upgrade-benefit-divider"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="pricing-section">
            <div className="pricing-bg-text">
              <span>BLACK BELT</span>
            </div>
            
            <div className="pricing-container">
              <div className="pricing-card">
                <h2 className="pricing-title">Abbonamento Annuale</h2>
                <p className="pricing-subtitle">Tutto il mondo di Ghoan Airlines ai tuoi piedi.</p>
                
                <div className="pricing-amount-wrapper">
                  <span className="pricing-amount">€299</span>
                  <span className="pricing-period">/anno</span>
                </div>
                
                <div className="pricing-features">
                  <div className="pricing-feature">
                    <span className="material-symbols-outlined pricing-feature-icon" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span>Accesso a Lounge Globali</span>
                  </div>
                  <div className="pricing-feature">
                    <span className="material-symbols-outlined pricing-feature-icon" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span>Concierge Dedicato 24/7</span>
                  </div>
                  <div className="pricing-feature">
                    <span className="material-symbols-outlined pricing-feature-icon" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span>Accumulo Miglia Raddoppiato</span>
                  </div>
                </div>
                
                <button className="pricing-submit-btn">
                  Sottoscrivi Ora
                </button>
                
                <p className="pricing-footer">Soddisfatti o Rimborsati entro 30 giorni</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Upgrade;