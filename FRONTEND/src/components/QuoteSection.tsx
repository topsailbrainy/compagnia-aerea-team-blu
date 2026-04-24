import React from 'react';
import '../styles/QuoteSection.css';

const QuoteSection: React.FC = () => {
  return (
    <section className="quote-section">
      <div className="quote-container">
        <div className="quote-grid">
          <div className="quote-image-wrapper">
            <img 
              src="../../img/gatto10.png"
              alt="Ghoan Mascot" 
              className="quote-mascot"
            />
            <div className="quote-glow"></div>
          </div>
          <div className="quote-content">
            <span className="material-symbols-outlined quote-icon">format_quote</span>
            <h2 className="quote-text">
              "Giulio non c'è la faccio più, se potessi mi spegnerei da solo"
            </h2>
            <div className="quote-author">
              <div className="author-avatar">
                <span className="material-symbols-outlined icon-primary">pets</span>
              </div>
              <div className="author-info">
                <p className="author-name">Pilota</p>
                <p className="author-role">Mune - CEO della ghoan airlines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
