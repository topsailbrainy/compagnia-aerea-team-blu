import React from 'react';
import '../styles/Profile.css';

const Profile: React.FC = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-grid">
          {/* Left Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-dashboard-card">
              <h2 className="profile-dashboard-title">Account Dashboard</h2>
              
              <button className="profile-dashboard-btn active">
                <span className="material-symbols-outlined">confirmation_number</span>
                <span>My Tickets</span>
              </button>
              
              <button className="profile-dashboard-btn inactive">
                <span className="material-symbols-outlined">person</span>
                <span>My Profile</span>
              </button>
              
              <button className="profile-dashboard-btn inactive">
                <span className="material-symbols-outlined">payments</span>
                <span>Billing</span>
              </button>
              
              <button className="profile-dashboard-btn inactive">
                <span className="material-symbols-outlined">notifications</span>
                <span>Alerts</span>
              </button>
            </div>
            
            <div className="profile-status-card">
              <p className="profile-status-title">Black Belt Status</p>
              <p className="profile-status-desc">You are 1,200 miles away from your next tier reward.</p>
              <span className="material-symbols-outlined profile-status-icon">workspace_premium</span>
            </div>
          </aside>

          {/* Right Content */}
          <div className="profile-content">
            {/* My Tickets Section */}
            <section className="profile-section">
              <div className="profile-section-header">
                <div>
                  <h1 className="profile-section-title">Upcoming Journeys</h1>
                  <p className="profile-section-subtitle">Manage your active flight bookings and check-in status.</p>
                </div>
                <button className="btn-primary">
                  <span className="material-symbols-outlined add-icon">add</span>
                  <span>Book New Flight</span>
                </button>
              </div>
              
              <div className="profile-tickets-grid">
                {/* Ticket Card 1 */}
                <div className="profile-ticket-card">
                  <div className="profile-ticket-indicator"></div>
                  <div className="profile-ticket-main">
                    <div className="profile-ticket-header">
                      <div className="profile-ticket-badge">
                        <div className="profile-ticket-badge-icon">
                          <span className="material-symbols-outlined">flight_takeoff</span>
                        </div>
                        <span className="profile-ticket-badge-text">Flight GA-442 • Business Class</span>
                      </div>
                      <span className="profile-ticket-status">In 3 Days</span>
                    </div>
                    
                    <div className="profile-ticket-route">
                      <div className="profile-ticket-airport">
                        <p className="profile-ticket-airport-code">LHR</p>
                        <p className="profile-ticket-airport-city">London, UK</p>
                        <p className="profile-ticket-time">10:45 AM</p>
                      </div>
                      
                      <div className="profile-ticket-line">
                        <div className="profile-ticket-line-divider">
                          <span className="material-symbols-outlined">flight</span>
                        </div>
                        <p className="profile-ticket-line-duration">7h 20m Non-stop</p>
                      </div>
                      
                      <div className="profile-ticket-airport">
                        <p className="profile-ticket-airport-code">JFK</p>
                        <p className="profile-ticket-airport-city">New York, USA</p>
                        <p className="profile-ticket-time">02:05 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="profile-ticket-details">
                    <img alt="QR Code" className="profile-ticket-qr" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB01MS4E7rRxRIgHdazCuCxtGnjxQpnFormGWUe251VpTIN_kWx9o-MbcPWR8rWWfiIPXkuBHAC_ANKxTvMirTDgp7tEXJIRMPt5GDsMpWLv4EajosJuPG90v7maRwtVSFc_J12lDKh_6A7zP-aYd-hEczNTZGFrwA7gdXW3DIlp5V17Fp4bt_j36GihffaDwGRbmhTN5e-lAwtyKTvG4qqmDjyl5tq56-rgF8u-ZPQun9Y29PeMSK0YXMVZ4LNHFImdFjYga5S4-85" />
                    <button className="profile-ticket-qr-btn">View Details</button>
                  </div>
                </div>
                
                {/* Ticket Card 2 */}
                <div className="profile-ticket-card profile-ticket-secondary">
                  <div className="profile-ticket-main">
                    <div className="profile-secondary-left">
                      <div className="profile-ticket-airport">
                        <p className="profile-ticket-airport-code">CDG</p>
                        <p className="profile-ticket-airport-city">Paris</p>
                      </div>
                      <span className="material-symbols-outlined">arrow_forward</span>
                      <div className="profile-ticket-airport">
                        <p className="profile-ticket-airport-code">NRT</p>
                        <p className="profile-ticket-airport-city">Tokyo</p>
                      </div>
                      <div className="profile-ticket-divider"></div>
                      <div className="profile-ticket-date">
                        <p>Oct 24, 2024</p>
                        <p>Economy Plus</p>
                      </div>
                    </div>
                    <div className="profile-ticket-actions">
                      <button>Modify</button>
                      <button>Check-in Open</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* My Profile Section */}
            <section className="profile-section">
              <div className="profile-section-header">
                <div>
                  <h2 className="profile-section-title">Identity &amp; Documents</h2>
                  <p className="profile-section-subtitle">Securely stored data for seamless booking auto-fill.</p>
                </div>
              </div>
              
              <div className="profile-documents-card">
                <div className="profile-security-badge">
                  <span className="material-symbols-outlined profile-security-icon" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <span className="profile-security-text">Encrypted Storage</span>
                </div>
                
                <div className="profile-documents-grid">
                  <div className="profile-field">
                    <label className="profile-label">First Name</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value">Alexander</span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)', cursor: 'pointer' }}>edit</span>
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <label className="profile-label">Surname</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value">Ghoan-Smith</span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)', cursor: 'pointer' }}>edit</span>
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <label className="profile-label">Date of Birth</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value">14 May 1988</span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)', cursor: 'pointer' }}>calendar_today</span>
                    </div>
                  </div>
                  
                  <div className="profile-field">
                    <label className="profile-label">Tax Code / SSN</label>
                    <div className="profile-input-wrapper">
                      <span className="profile-value" style={{ letterSpacing: '0.1em' }}>•••• •••• 9921</span>
                      <span className="material-symbols-outlined" style={{ color: 'var(--outline)', cursor: 'pointer' }}>visibility</span>
                    </div>
                  </div>
                  
                  <div className="profile-field full-width">
                    <label className="profile-label">Passport / National ID</label>
                    <div className="profile-passport-card">
                      <div className="profile-passport-info">
                        <div className="profile-passport-icon">
                          <span className="material-symbols-outlined">credit_card</span>
                        </div>
                        <div>
                          <p className="profile-passport-details-title">Passport (UK)</p>
                          <p className="profile-passport-details-number">Number: P44912209 • Exp: 12/2028</p>
                        </div>
                      </div>
                      <button className="profile-replace-btn">Replace</button>
                    </div>
                  </div>
                </div>
                
                <div className="profile-save-footer">
                  <p className="profile-save-footer-text">Your data is processed in accordance with international aviation security standards and GDPR guidelines.</p>
                  <button className="profile-save-btn">Save All Changes</button>
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