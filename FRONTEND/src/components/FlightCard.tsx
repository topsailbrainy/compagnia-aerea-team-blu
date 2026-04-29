import React from 'react';
import '../styles/FlightCard.css';

interface FlightCardProps {
  id: string;
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  duration: string;
  price: number;
  stops: string;
  isDirect?: boolean;
  type?: 'outbound' | 'inbound';
  isSelected?: boolean;
  onSelect?: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({
  departureTime,
  departureCity,
  arrivalTime,
  arrivalCity,
  duration,
  price,
  stops,
  isDirect,
  type = 'outbound',
  isSelected = false,
  onSelect
}) => {
  return (
    <div className={`flight-card group ${type} ${isSelected ? 'selected' : ''}`}>
      <div className="flight-card-main">
        <div className="flight-info-grid">
          <div className="time-block">
            <span className="time">{departureTime}</span>
            <span className="city">{departureCity}</span>
          </div>
          
          <div className="connection-block">
            <span className={`connection-type ${isDirect ? 'direct' : ''}`}>
              {stops}
            </span>
            <div className="connection-line">
              {isDirect ? (
                <span className="material-symbols-outlined plane-icon">flight</span>
              ) : (
                <div className="stop-dot"></div>
              )}
            </div>
            <span className="duration">{duration}</span>
          </div>

          <div className="time-block arrival">
            <span className="time">{arrivalTime}</span>
            <span className="city">{arrivalCity}</span>
          </div>
        </div>

        <div className="divider-vertical"></div>

        <div className="price-selection">
          <p className="price-label">Da</p>
          <p className="price-value">${price}</p>
          <button 
            className={`btn-select ${isSelected ? 'btn-selected' : ''}`}
            onClick={onSelect}
          >
            {isSelected ? 'SELEZIONATO' : 'SELEZIONA'}
          </button>
        </div>
      </div>
      
      {/* Mascotte che sbircia (solo per le card principali) */}
      <div className="mascot-peek">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj4J7Xnx0r6HbeECzPE1pcEhOnyqmzszJ2UQ9i4OgLfPH-pN7kDhhwMVXOiTVFaziP0FBKs00yqt6kBOXH9MkxNFKnsENdwfizT3eHRQZvexLFU1vDgCEKUWSo2S2yRgmnJEipkJKft3pN-ylaKwLc7xNCl4KKR4fuQLMdp9n3TaXdIJgj6DR9nblh2Zwlzm45hTJS9Udo6QTDtEO31qDqjOKcw22UGMZ3vM_r_5D4QYh4qmK7cOGVNXnOs-6WcoWyBha2EGBsVsXp" 
          alt="Mascotte" 
        />
      </div>
    </div>
  );
};

export default FlightCard;
