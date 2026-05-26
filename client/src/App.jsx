import React, { useState, useEffect } from 'react';
import BottomTabBar from './components/BottomTabBar';
import BillboardTab from './components/BillboardTab';
import StatsTab from './components/StatsTab';
import MyRatingsTab from './components/MyRatingsTab';
import MovieBottomSheet from './components/MovieBottomSheet';
import AuthScreen from './components/AuthScreen';
import SocialTab from './components/SocialTab';
import UpcomingTab from './components/UpcomingTab';
import WatchlistTab from './components/WatchlistTab';
import MemoryGalleryTab from './components/MemoryGalleryTab';
import { API_BASE_URL } from './config';

export default function App() {
  const [currentTab, setCurrentTab] = useState('billboard');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [movies, setMovies] = useState([]);
  const [ratingsList, setRatingsList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [notifications, setNotifications] = useState([]);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  // Cargar notificaciones de este usuario
  const fetchNotifications = async () => {
    if (!currentUser) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications?userId=${currentUser.id}`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (e) {
      console.error("Error cargando notificaciones:", e);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 8000); // Polling cada 8s para simular en vivo
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  const handleMarkNotificationsAsRead = async () => {
    if (!currentUser) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: currentUser.id })
      });
      if (response.ok) {
        fetchNotifications();
      }
    } catch (e) {
      console.error("Error marcando notificaciones:", e);
    }
  };

  // 1. Cargar sesión de usuario desde localStorage al iniciar
  useEffect(() => {
    const cachedUser = localStorage.getItem('cineglow_user');
    if (cachedUser) {
      try {
        setCurrentUser(JSON.parse(cachedUser));
      } catch (e) {
        localStorage.removeItem('cineglow_user');
      }
    }
  }, []);

  // 2. Cargar Cartelera en vivo de Cinepolis Sector Oriente
  const fetchBillboard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/billboard`);
      if (response.ok) {
        const data = await response.json();
        setMovies(data.movies);
      }
    } catch (err) {
      console.error("Error cargando la cartelera:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Cargar listado global de valoraciones realizadas
  const fetchRatings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ratings`);
      if (response.ok) {
        const data = await response.json();
        setRatingsList(data);
      }
    } catch (err) {
      console.error("Error cargando valoraciones:", err);
    }
  };

  // 4. Cargar la watchlist compartida
  const fetchWatchlist = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/watchlist`);
      if (response.ok) {
        const data = await response.json();
        setWatchlist(data);
      }
    } catch (err) {
      console.error("Error cargando watchlist:", err);
    }
  };

  // Helper para verificar si hay por lo menos un "Cine-Match" en pareja
  const hasWatchlistMatches = () => {
    if (!watchlist || watchlist.length === 0) return false;
    const movieLikes = {};
    watchlist.forEach(item => {
      if (!movieLikes[item.movieKey]) {
        movieLikes[item.movieKey] = new Set();
      }
      movieLikes[item.movieKey].add(item.userId);
    });
    return Object.values(movieLikes).some(userIdSet => userIdSet.size >= 2);
  };

  // Carga inicial de datos cuando hay un usuario autenticado
  useEffect(() => {
    if (currentUser) {
      fetchBillboard();
      fetchRatings();
      fetchWatchlist();
    }
  }, [currentUser]);

  // Helper para verificar si hay por lo menos una foto registrada
  const hasMemories = () => {
    if (!ratingsList || ratingsList.length === 0) return false;
    return ratingsList.some(r => r.photos && Array.isArray(r.photos) && r.photos.length > 0);
  };

  // Redireccionar automáticamente si se elimina la última coincidencia (Cine-Match)
  useEffect(() => {
    if (currentTab === 'watchlist' && !hasWatchlistMatches()) {
      setCurrentTab('upcoming');
    }
    if (currentTab === 'memories' && !hasMemories()) {
      setCurrentTab('billboard');
    }
  }, [watchlist, ratingsList, currentTab]);

  // 🔔 Detectar películas de la Watchlist del usuario que ya están en cartelera
  const getBillboardAlerts = () => {
    if (!currentUser || !watchlist || !movies || movies.length === 0) return [];
    // Películas que el usuario actual marcó en su watchlist
    const myWatchlistKeys = new Set(
      watchlist
        .filter(w => w.userId === currentUser.id)
        .map(w => w.movieKey)
    );
    if (myWatchlistKeys.size === 0) return [];
    // Cruzar con la cartelera actual
    return movies
      .filter(m => myWatchlistKeys.has(m.key))
      .map(m => m.key);
  };

  const billboardAlerts = getBillboardAlerts();

  // Refrescar al interactuar
  const handleRefreshBillboard = () => {
    fetchBillboard();
    fetchRatings();
    fetchWatchlist();
  };

  // Manejar Login exitoso
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentTab('billboard');
  };

  // Cerrar Sesión
  const handleLogout = () => {
    localStorage.removeItem('cineglow_user');
    setCurrentUser(null);
    setCurrentTab('billboard');
    setSelectedMovie(null);
  };

  // Si no hay usuario activo, renderizar la pantalla de Login/Registro
  if (!currentUser) {
    return (
      <div className="mobile-app-wrapper">
        {/* Upper Notch Status Bar simulation for high-end look */}
        <div className="app-status-bar-sim">
          <span className="status-time">9:41</span>
          <div className="status-icons-sim">
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>
        
        <AuthScreen onLoginSuccess={handleLoginSuccess} />

        <style jsx="true">{`
          .app-status-bar-sim {
            height: 36px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 24px;
            color: var(--text-secondary);
            font-size: 11px;
            font-weight: 700;
            font-family: var(--font-display);
            background-color: var(--bg-darker);
            z-index: 100;
            flex-shrink: 0;
          }
          .status-icons-sim {
            display: flex;
            gap: 6px;
            font-size: 10px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="mobile-app-wrapper animate-fade-in">
      {/* Upper Notch Status Bar simulation for high-end look */}
      <div className="app-status-bar-sim">
        <span className="status-time">9:41</span>
        <div className="status-icons-sim">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Persistent App Header */}
      <header className="app-header">
        <div className="app-branding">
          <h1 className="app-logo">Cine<span>Glow</span></h1>
          <span className="app-sub-title">Santiago Oriente</span>
        </div>
        
        {/* Fila de Perfil de Usuario Logueado */}
        <div className="app-user-row animate-scale-in">
          <img src={currentUser.avatar} alt={currentUser.name} className="header-avatar" />
          
          <div className="username-header-details">
            <span className="header-username">{currentUser.name}</span>
            <span className="header-points-badge">✨ Nivel {currentUser.level || 1}</span>
          </div>
          
          {/* Botón Campana de Notificaciones de Pareja */}
          <div className="notification-bell-container">
            <button 
              className={`btn-notification-bell ${notifications.some(n => !n.read) ? 'has-unread' : ''}`}
              onClick={() => {
                setShowNotificationsPanel(!showNotificationsPanel);
                if (notifications.some(n => !n.read)) {
                  handleMarkNotificationsAsRead();
                }
              }}
              title="Notificaciones de Pareja"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {notifications.some(n => !n.read) && (
                <span className="bell-badge-pulse"></span>
              )}
            </button>
            
            {/* Panel Desplegable de Notificaciones */}
            {showNotificationsPanel && (
              <div className="notifications-dropdown glass-card animate-scale-in" style={{ top: '38px', right: '-48px' }}>
                <div className="notif-dropdown-header">
                  <h5>Notificaciones ❤️</h5>
                  <button onClick={() => setShowNotificationsPanel(false)}>✕</button>
                </div>
                <div className="notif-dropdown-list">
                  {notifications.length > 0 ? (
                    notifications.map(n => (
                      <div key={n.id} className={`notif-dropdown-item ${n.read ? 'read' : 'unread'}`}>
                        <img src={n.senderAvatar} alt={n.senderName} className="notif-item-avatar" />
                        <div className="notif-item-body">
                          <p className="notif-item-title">{n.title}</p>
                          <p className="notif-item-desc">
                            <strong>{n.senderName}</strong> {n.message}
                          </p>
                          <span className="notif-item-time">
                            {new Date(n.createdAt).toLocaleTimeString('es-CL', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="notif-dropdown-empty">
                      <span>🔔</span>
                      <p>Sin notificaciones recientes.</p>
                      <p className="empty-sub">¡Cuando tu pareja agende citas o abra sobres, las verás aquí!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <button className="btn-logout" onClick={handleLogout}>
            <span>Salir</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Tab Views scrollable zone */}
      <main className="scroll-container">
        {currentTab === 'billboard' && (
          <BillboardTab
            movies={movies}
            onMovieClick={setSelectedMovie}
            isLoading={isLoading}
            billboardAlerts={billboardAlerts}
          />
        )}

        {currentTab === 'social' && (
          <SocialTab
            ratingsList={ratingsList}
            movies={movies}
            onMovieClick={setSelectedMovie}
          />
        )}

        {currentTab === 'upcoming' && currentUser && (
          <UpcomingTab
            activeProfile={currentUser}
            onMovieClick={setSelectedMovie}
            watchlist={watchlist}
            onRefreshWatchlist={fetchWatchlist}
          />
        )}

        {currentTab === 'watchlist' && currentUser && (
          <WatchlistTab
            activeProfile={currentUser}
            onMovieClick={setSelectedMovie}
            watchlist={watchlist}
            onRefreshWatchlist={fetchWatchlist}
          />
        )}

        {currentTab === 'stats' && (
          <StatsTab 
            movies={movies}
          />
        )}

        {currentTab === 'my-ratings' && currentUser && (
          <MyRatingsTab
            activeProfile={currentUser}
            ratingsList={ratingsList}
            movies={movies}
            onMovieClick={setSelectedMovie}
          />
        )}

        {currentTab === 'memories' && currentUser && (
          <MemoryGalleryTab
            ratingsList={ratingsList}
            activeProfile={currentUser}
          />
        )}
      </main>

      {/* Bottom Sheets details panel */}
      {selectedMovie && currentUser && (
        <MovieBottomSheet
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          activeProfile={currentUser}
          ratingsList={ratingsList}
          onRefreshBillboard={handleRefreshBillboard}
        />
      )}

      {/* Persistent Bottom Tabs Navigation Bar */}
      <BottomTabBar 
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        showWatchlist={hasWatchlistMatches()}
        showMemories={hasMemories()}
        billboardAlertCount={billboardAlerts.length}
      />

      <style jsx="true">{`
        .app-status-bar-sim {
          height: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 700;
          font-family: var(--font-display);
          background-color: var(--bg-darker);
          z-index: 100;
          flex-shrink: 0;
        }

        .status-icons-sim {
          display: flex;
          gap: 6px;
          font-size: 10px;
        }

        .app-branding {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding: 0 2px;
        }

        .app-logo {
          font-family: var(--font-display);
          font-size: 27px;
          font-weight: 800;
          letter-spacing: -0.8px;
          background: linear-gradient(135deg, var(--text-primary) 30%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .app-logo span {
          background: linear-gradient(135deg, var(--accent-rose) 0%, var(--accent-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-left: 2px;
          text-shadow: 0 0 15px rgba(255, 42, 95, 0.2);
        }

        .app-sub-title {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 800;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 1.8px;
          background: rgba(34, 211, 238, 0.08);
          padding: 3px 8px;
          border-radius: 8px;
          border: 1px solid rgba(34, 211, 238, 0.15);
        }

        .app-user-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(13, 17, 28, 0.6);
          border: 1px solid var(--border-glow);
          border-radius: 18px;
          padding: 8px 14px;
          margin-bottom: 10px;
          position: relative;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05);
          /* Perforaciones de ticket simuladas en los lados */
          overflow: hidden;
        }

        .app-user-row::before,
        .app-user-row::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 16px;
          background-color: var(--bg-deep);
          border: 1px solid var(--border-glow);
          top: calc(50% - 8px);
        }

        .app-user-row::before {
          left: -4px;
          border-radius: 0 8px 8px 0;
          border-left: none;
        }

        .app-user-row::after {
          right: -4px;
          border-radius: 8px 0 0 8px;
          border-right: none;
        }

        .avatar-header-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .header-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #141332;
          border: 2px solid var(--accent-rose);
          box-shadow: 0 0 10px rgba(255, 42, 95, 0.35);
          transition: transform 0.3s ease;
        }

        .app-user-row:hover .header-avatar {
          transform: rotate(6deg) scale(1.05);
        }

        .header-level-badge {
          position: absolute;
          bottom: -4px;
          right: -4px;
          background: var(--accent-rose);
          color: #fff;
          font-size: 6px;
          font-weight: 800;
          padding: 1px 3px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-family: var(--font-display);
          line-height: 1;
          letter-spacing: -0.2px;
        }

        .username-header-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
          min-width: 0;
          padding-left: 4px;
        }

        .header-username {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .header-points-badge {
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-gold);
          text-shadow: 0 0 8px rgba(251, 191, 36, 0.2);
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .btn-logout {
          background: none;
          border: none;
          color: #f87171;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 11px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.15);
          transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .btn-logout:active {
          transform: scale(0.94);
          background: rgba(239, 68, 68, 0.14);
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.15);
        }

        /* Notificaciones de Pareja */
        .notification-bell-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .btn-notification-bell {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .btn-notification-bell:active {
          transform: scale(0.9);
        }

        .btn-notification-bell:hover,
        .btn-notification-bell.has-unread {
          color: var(--accent-rose);
          border-color: rgba(255, 42, 95, 0.35);
          background: rgba(255, 42, 95, 0.06);
          box-shadow: 0 0 10px rgba(255, 42, 95, 0.15);
        }

        .bell-badge-pulse {
          position: absolute;
          top: -1px;
          right: -1px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--accent-rose);
          box-shadow: 0 0 10px var(--accent-rose);
          animation: pulse-red 1.3s infinite;
        }

        @keyframes pulse-red {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.4; }
        }

        /* Dropdown de Notificaciones */
        .notifications-dropdown {
          position: absolute;
          width: 260px;
          max-height: 320px;
          background: rgba(13, 17, 28, 0.95);
          border: 1px solid var(--border-glow-active);
          border-radius: 22px;
          box-shadow: 
            0 15px 45px rgba(0, 0, 0, 0.6),
            0 0 25px rgba(34, 211, 238, 0.15);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .notif-dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
        }

        .notif-dropdown-header h5 {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 800;
          color: #fff;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .notif-dropdown-header button {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 12px;
          transition: color 0.2s;
        }

        .notif-dropdown-header button:hover {
          color: #fff;
        }

        .notif-dropdown-list {
          overflow-y: auto;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .notif-dropdown-item {
          display: flex;
          gap: 12px;
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
          transition: background-color 0.2s ease;
        }

        .notif-dropdown-item.unread {
          background: rgba(34, 211, 238, 0.04);
        }

        .notif-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .notif-item-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        .notif-item-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .notif-item-title {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 800;
          color: var(--accent-cyan);
          margin: 0;
        }

        .notif-item-desc {
          font-size: 10.5px;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .notif-item-desc strong {
          color: #fff;
        }

        .notif-item-time {
          font-size: 9px;
          color: var(--text-muted);
          margin-top: 3px;
        }

        /* Notificaciones Vacías */
        .notif-dropdown-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 35px 20px;
          text-align: center;
          color: var(--text-secondary);
        }

        .notif-dropdown-empty span {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .notif-dropdown-empty p {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .notif-dropdown-empty .empty-sub {
          font-size: 9px;
          color: var(--text-muted);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
