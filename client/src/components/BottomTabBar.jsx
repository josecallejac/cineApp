import React from 'react';

export default function BottomTabBar({ currentTab, onTabChange, showWatchlist, showMemories, showDuo, billboardAlertCount = 0 }) {
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

      {showDuo && (
        <div 
          className={`tab-item ${currentTab === 'duo' ? 'active' : ''}`}
          onClick={() => onTabChange('duo')}
        >
          <div className="tab-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill={currentTab === 'duo' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
          </div>
          <span className="tab-label">Duo</span>
        </div>
      )}

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
    </div>
  );
}
