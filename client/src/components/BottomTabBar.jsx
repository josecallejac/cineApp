import React from 'react';

export default function BottomTabBar({ currentTab, onTabChange, showWatchlist, showMemories, billboardAlertCount = 0 }) {
  return (
    <div className="bottom-tab-bar">
      <div 
        className={`tab-item ${currentTab === 'billboard' ? 'active' : ''}`}
        onClick={() => onTabChange('billboard')}
      >
        <div className="tab-icon" style={{ position: 'relative' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={currentTab === 'billboard' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
            <line x1="7" y1="2" x2="7" y2="22"></line>
            <line x1="17" y1="2" x2="17" y2="22"></line>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="2" y1="7" x2="7" y2="7"></line>
            <line x1="2" y1="17" x2="7" y2="17"></line>
            <line x1="17" y1="17" x2="22" y2="17"></line>
            <line x1="17" y1="7" x2="22" y2="7"></line>
          </svg>
          {billboardAlertCount > 0 && (
            <span className="tab-alert-badge" title={`${billboardAlertCount} película(s) de tu Watchlist en cartelera`}>
              {billboardAlertCount}
            </span>
          )}
        </div>
        <span className="tab-label">Cartelera</span>
      </div>

      <div 
        className={`tab-item ${currentTab === 'upcoming' ? 'active' : ''}`}
        onClick={() => onTabChange('upcoming')}
      >
        <div className="tab-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={currentTab === 'upcoming' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
            <path d="M12 18h.01"></path>
          </svg>
        </div>
        <span className="tab-label">Estrenos</span>
      </div>

      {showWatchlist && (
        <div 
          className={`tab-item ${currentTab === 'watchlist' ? 'active' : ''}`}
          onClick={() => onTabChange('watchlist')}
        >
          <div className="tab-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill={currentTab === 'watchlist' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <span className="tab-label">Watchlist</span>
        </div>
      )}

      <div 
        className={`tab-item ${currentTab === 'social' ? 'active' : ''}`}
        onClick={() => onTabChange('social')}
      >
        <div className="tab-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={currentTab === 'social' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <span className="tab-label">Comunidad</span>
      </div>

      <div 
        className={`tab-item ${currentTab === 'stats' ? 'active' : ''}`}
        onClick={() => onTabChange('stats')}
      >
        <div className="tab-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={currentTab === 'stats' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
        <span className="tab-label">Stats</span>
      </div>

      <div 
        className={`tab-item ${currentTab === 'my-ratings' ? 'active' : ''}`}
        onClick={() => onTabChange('my-ratings')}
      >
        <div className="tab-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={currentTab === 'my-ratings' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        <span className="tab-label">Mi Club</span>
      </div>

      {showMemories && (
        <div 
          className={`tab-item ${currentTab === 'memories' ? 'active' : ''}`}
          onClick={() => onTabChange('memories')}
        >
          <div className="tab-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill={currentTab === 'memories' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </div>
          <span className="tab-label">Recuerdos</span>
        </div>
      )}

      <style jsx="true">{`
        .bottom-tab-bar {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          height: 66px;
          background: rgba(13, 17, 28, 0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 42, 95, 0.15);
          border-radius: 24px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 42, 95, 0.05);
          z-index: 100;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 100%;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          padding-top: 4px;
        }

        .tab-icon {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tab-label {
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.3px;
          opacity: 0.8;
          transition: all 0.2s ease;
        }

        .tab-item.active {
          color: var(--accent-rose);
        }

        .tab-item.active .tab-icon {
          transform: translateY(-4px) scale(1.15);
          color: var(--accent-rose);
          filter: drop-shadow(0 0 8px rgba(255, 42, 95, 0.6));
        }

        .tab-item.active .tab-label {
          font-weight: 800;
          color: var(--text-primary);
          opacity: 1;
          transform: scale(1.05);
        }

        /* Glowing indicator dot under active tab */
        .tab-item.active::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          background: var(--accent-rose);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-rose), 0 0 20px var(--accent-rose);
        }

        /* Badge de alerta de estreno */
        .tab-alert-badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: linear-gradient(135deg, var(--accent-rose) 0%, var(--accent-gold) 100%);
          color: #fff;
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 900;
          min-width: 15px;
          height: 15px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 2px;
          border: 1.5px solid var(--bg-darker);
          box-shadow: 0 0 8px var(--accent-rose);
          animation: badgePulse 2s ease-in-out infinite;
          z-index: 10;
        }

        @keyframes badgePulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 8px rgba(255, 42, 95, 0.7); }
          50% { transform: scale(1.15); box-shadow: 0 0 16px rgba(255, 42, 95, 0.9), 0 0 4px rgba(251, 191, 36, 0.6); }
        }
      `}</style>
    </div>
  );
}
