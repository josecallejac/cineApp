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

  // Scroll automático al inicio de la pestaña al cambiar de tab
  useEffect(() => {
    const container = document.querySelector('.scroll-container');
    if (container) {
      container.scrollTop = 0;
    }
  }, [currentTab]);

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


    </div>
  );
}
