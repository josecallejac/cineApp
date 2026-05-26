import React, { useState } from 'react';

export default function DemoProfileSelector({ profiles, activeProfile, onProfileChange }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!profiles || profiles.length === 0 || !activeProfile) return null;

  return (
    <div className="profile-selector-container">
      {/* Active profile card */}
      <div 
        className="active-profile-card"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img 
          src={activeProfile.avatar} 
          alt={activeProfile.name} 
          className="profile-avatar"
        />
        <div className="profile-info">
          <div className="profile-badge">PERFIL DEMO</div>
          <h4 className="profile-name">{activeProfile.name}</h4>
        </div>
        <div className={`chevron ${isOpen ? 'open' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <>
          <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
          <div className="profiles-dropdown glass-card animate-scale-in">
            <h5 className="dropdown-title">Selecciona una cuenta demo:</h5>
            <div className="profiles-list">
              {profiles.map(profile => (
                <div 
                  key={profile.id}
                  className={`profile-item ${profile.id === activeProfile.id ? 'active' : ''}`}
                  onClick={() => {
                    onProfileChange(profile);
                    setIsOpen(false);
                  }}
                >
                  <img src={profile.avatar} alt={profile.name} className="item-avatar" />
                  <div className="item-details">
                    <span className="item-name">{profile.name}</span>
                    <span className="item-tagline">{profile.tagline}</span>
                  </div>
                  {profile.id === activeProfile.id && (
                    <div className="check-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <style jsx="true">{`
        .profile-selector-container {
          position: relative;
          z-index: 200;
          margin-bottom: 12px;
        }

        .active-profile-card {
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 16px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .active-profile-card:active {
          background: rgba(139, 92, 246, 0.15);
          transform: scale(0.98);
        }

        .profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid var(--accent-purple);
          background: #1e1b4b;
          padding: 2px;
        }

        .profile-info {
          flex: 1;
        }

        .profile-badge {
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 800;
          color: var(--accent-purple);
          letter-spacing: 1px;
          margin-bottom: 2px;
        }

        .profile-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .chevron {
          color: var(--text-secondary);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .chevron.open {
          transform: rotate(180deg);
          color: var(--accent-purple);
        }

        .dropdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 180;
        }

        .profiles-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          z-index: 190;
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
          padding: 14px;
        }

        .dropdown-title {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 10px;
        }

        .profiles-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .profile-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .profile-item:active {
          background: rgba(255, 255, 255, 0.05);
        }

        .profile-item.active {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .item-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1e1b4b;
        }

        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .item-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .item-tagline {
          font-size: 10px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 250px;
        }

        .check-icon {
          color: var(--accent-cyan);
        }
      `}</style>
    </div>
  );
}
