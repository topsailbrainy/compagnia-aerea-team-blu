import React from 'react';
import '../styles/QuoteSection.css';

const QuoteSection: React.FC = () => {
  return (
    <section className="quote-section">
      <div className="quote-container">
        <div className="quote-grid">
          <div className="quote-image-wrapper">
            <img 
              src="https://lh3.googleusercontent.com/aida/ADBb0uhjsFtFJpF8m3C8YqPS8rMIINooll0B2K5grM2YTeYChg7-JyPgx81_QMk00k2MdsvPnbXw99yPJ4v5SkPTxTF-z8XYBcPQ78mhtQDH0x-sAjwKS4xKamOzPicR8Ph08-I-FHXv9HEYwHo--mABXNmziE4weWLZc0joSG5_G8hKVUFwuAY8zw00onb7zakBWjkpScAhJKVTel2DZ8AhJDmqO_UqgIWeKZSRqEdv8lcvn5gtlL374gH-sgzyP-Xov6zFncI_T3Cr1A" 
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
