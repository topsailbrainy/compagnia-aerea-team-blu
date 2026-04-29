import React, { useEffect, useState, useRef } from 'react';
import { useStoreUser } from '../stores/storeUser';
import '../styles/Profile.css';

const Profile: React.FC = () => {
  const { logged, userAuth } = useStoreUser();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const bookingsRef = useRef<HTMLElement>(null);
  const dataRef = useRef<HTMLElement>(null);
  const paymentRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/profile', {
          headers: {
            'Authorization': `Basic ${userAuth}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setProfileData(data);
        } else {
          setError(data.error || "Errore nel caricamento dei dati");
        }
      } catch (error) {
        console.error("Errore fetch profilo:", error);
        setError("Impossibile connettersi al server");
      } finally {
        setLoading(false);
      }
    };

    if (logged && userAuth) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [logged, userAuth]);

  if (!logged) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h2>Accesso richiesto</h2>
        <p>Effettua il login per visualizzare il tuo profilo e le tue prenotazioni.</p>
      </div>
    );
  }

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Caricamento in corso...</div>;

  if (error || !profileData) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h2>Ops! Qualcosa è andato storto</h2>
        <p>{error || "Dati non disponibili."}</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
          Suggerimento: Prova a fare <strong>Logout</strong> e di nuovo <strong>Login</strong>.
        </p>
      </div>
    );
  }

  const { user, bookings } = profileData;
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-grid">
          {/* Left Sidebar */}
          <aside className="profile-sidebar" style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div className="profile-dashboard-card">
              <h2 className="profile-dashboard-title">Account Dashboard</h2>
              
              <button 
                className="profile-dashboard-btn"
                onClick={() => scrollToSection(bookingsRef)}
                style={{ color: '#7c3aed' }}
              >
                <span className="material-symbols-outlined" style={{ color: '#7c3aed' }}>confirmation_number</span>
                <span style={{ fontWeight: 600 }}>Prenotazioni</span>
              </button>
              
              <button 
                className="profile-dashboard-btn"
                onClick={() => scrollToSection(dataRef)}
                style={{ color: '#7c3aed' }}
              >
                <span className="material-symbols-outlined" style={{ color: '#7c3aed' }}>person</span>
                <span style={{ fontWeight: 600 }}>Dati Personali</span>
              </button>
              
              <button 
                className="profile-dashboard-btn"
                onClick={() => scrollToSection(paymentRef)}
                style={{ color: '#7c3aed' }}
              >
                <span className="material-symbols-outlined" style={{ color: '#7c3aed' }}>payments</span>
                <span style={{ fontWeight: 600 }}>Pagamento</span>
              </button>
            </div>
            
            <div className="profile-status-card">
              <p className="profile-status-title">Status Viaggiatore</p>
              <p className="profile-status-desc">Sei a pochi passi dal prossimo livello di fedeltà!</p>
              <span className="material-symbols-outlined profile-status-icon">workspace_premium</span>
            </div>
          </aside>

          {/* Right Content */}
          <div className="profile-content">
            {/* My Tickets Section */}
            <section className="profile-section" ref={bookingsRef}>
              <div className="profile-section-header">
                <div>
                  <h1 className="profile-section-title">Le Tue Prenotazioni</h1>
                  <p className="profile-section-subtitle">Gestisci i tuoi voli attivi e controlla lo stato del check-in.</p>
                </div>
              </div>
              
              <div className="profile-tickets-grid">
                {bookings.length > 0 ? (
                  bookings.map((booking: any) => (
                    <div className="profile-ticket-card" key={booking.ticket_id}>
                      <div className="profile-ticket-indicator"></div>
                      <div className="profile-ticket-main">
                        <div className="profile-ticket-header">
                          <div className="profile-ticket-badge">
                            <div className="profile-ticket-badge-icon">
                              <span className="material-symbols-outlined">flight_takeoff</span>
                            </div>
                            <span className="profile-ticket-badge-text">Biglietto #{booking.ticket_id ? booking.ticket_id.slice(0,8) : 'Pending'}</span>
                          </div>
                          <span className="profile-ticket-status">
                            {booking.data_partenza ? new Date(booking.data_partenza).toLocaleDateString('it-IT') : 'N/D'}
                          </span>
                        </div>
                        
                        <div className="profile-ticket-route">
                          <div className="profile-ticket-airport">
                            <p className="profile-ticket-airport-code">{booking.origin_iata}</p>
                            <p className="profile-ticket-airport-city">{booking.origin_city}</p>
                            <p className="profile-ticket-time">{booking.orario_partenza?.slice(0,5) || '--:--'}</p>
                          </div>
                          
                          <div className="profile-ticket-line">
                            <div className="profile-ticket-line-divider">
                              <span className="material-symbols-outlined">flight</span>
                            </div>
                            <p className="profile-ticket-line-duration">Diretto</p>
                          </div>
                          
                          <div className="profile-ticket-airport">
                            <p className="profile-ticket-airport-code">{booking.dest_iata}</p>
                            <p className="profile-ticket-airport-city">{booking.dest_city}</p>
                            <p className="profile-ticket-time">{booking.orario_arrivo?.slice(0,5) || '--:--'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="profile-ticket-details">
                        <img alt="QR Code" className="profile-ticket-qr" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB01MS4E7rRxRIgHdazCuCxtGnjxQpnFormGWUe251VpTIN_kWx9o-MbcPWR8rWWfiIPXkuBHAC_ANKxTvMirTDgp7tEXJIRMPt5GDsMpWLv4EajosJuPG90v7maRwtVSFc_J12lDKh_6A7zP-aYd-hEczNTZGFrwA7gdXW3DIlp5V17Fp4bt_j36GihffaDwGRbmhTN5e-lAwtyKTvG4qqmDjyl5tq56-rgF8u-ZPQun9Y29PeMSK0YXMVZ4LNHFImdFjYga5S4-85" />
                        <button className="profile-ticket-qr-btn">Vedi Dettagli</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="profile-no-bookings">Non hai ancora effettuato prenotazioni.</p>
                )}
              </div>
            </section>

            {/* My Profile Section */}
            <section className="profile-section" ref={dataRef}>
              <div className="profile-section-header">
                <div>
                  <h2 className="profile-section-title">Identità e Documenti</h2>
                  <p className="profile-section-subtitle">Dati memorizzati in modo sicuro per il riempimento automatico.</p>
                </div>
              </div>
              
              <div className="profile-documents-card">
                <div className="profile-security-badge">
                  <span className="material-symbols-outlined profile-security-icon" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <span className="profile-security-text">Archiviazione Cifrata</span>
                </div>
                
                <div className="profile-documents-grid">
                  <div className="profile-field">
                    <label className="profile-label">Nome</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value">{user.name}</span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)', cursor: 'pointer' }}>edit</span>
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <label className="profile-label">Cognome</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value">{user.surname}</span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)', cursor: 'pointer' }}>edit</span>
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <label className="profile-label">Email Account</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value">{user.email}</span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)', cursor: 'pointer' }}>lock</span>
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <label className="profile-label">Codice Fiscale</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value" style={{ letterSpacing: '0.1em' }}>
                        •••• •••• {user.name ? user.name.slice(0,1) : '?'}{user.surname ? user.surname.slice(0,1) : '?'}
                      </span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)', cursor: 'pointer' }}>visibility</span>
                    </div>
                  </div>
                  
                  <div className="profile-field full-width">
                    <label className="profile-label">Passaporto / Carta Identità</label>
                    <div className="profile-passport-card">
                      <div className="profile-passport-info">
                        <div className="profile-passport-icon">
                          <span className="material-symbols-outlined">credit_card</span>
                        </div>
                        {user.document ? (
                          <div>
                            <p className="profile-passport-details-title">{user.document.tipo}</p>
                            <p className="profile-passport-details-number">Numero: {user.document.numero} • Scad: {new Date(user.document.scadenza).toLocaleDateString('it-IT')}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="profile-passport-details-title">Nessun documento registrato</p>
                            <p className="profile-passport-details-number">Aggiungi un documento per velocizzare il check-in.</p>
                          </div>
                        )}
                      </div>
                      <button className="profile-replace-btn">{user.document ? 'Sostituisci' : 'Aggiungi'}</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="profile-section" ref={paymentRef}>
              <div className="profile-section-header">
                <div>
                  <h2 className="profile-section-title">Metodi di Pagamento</h2>
                  <p className="profile-section-subtitle">Gestisci le tue carte per acquisti rapidi e sicuri.</p>
                </div>
              </div>
              
              <div className="profile-documents-card">
                <div className="profile-security-badge">
                  <span className="material-symbols-outlined profile-security-icon" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                  <span className="profile-security-text">Pagamenti Protetti (PCI-DSS)</span>
                </div>
                
                <div className="profile-documents-grid">
                  <div className="profile-field">
                    <label className="profile-label">Tipo Carta</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value">{user.card?.tipo || 'Nessuna carta'}</span>
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <label className="profile-label">Intestatario</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value">{user.card ? `${user.card.nome} ${user.card.cognome}` : '-'}</span>
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <label className="profile-label">Numero Carta</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value" style={{ letterSpacing: '0.1em' }}>
                        {user.card?.numero ? `•••• •••• •••• ${user.card.numero.slice(-4)}` : '**** **** **** ****'}
                      </span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)', cursor: 'pointer' }}>visibility</span>
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <label className="profile-label">Scadenza</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value">{user.card ? new Date(user.card.scadenza).toLocaleDateString('it-IT', { month: '2-digit', year: '2-digit' }) : '-/-'}</span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)', cursor: 'pointer' }}>calendar_today</span>
                    </div>
                  </div>
                </div>
                
                <div className="profile-save-footer">
                  <p className="profile-save-footer-text">Le tue informazioni di pagamento sono cifrate e non vengono mai salvate interamente sui nostri server.</p>
                  <button className="profile-save-btn">Aggiorna Metodo</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;