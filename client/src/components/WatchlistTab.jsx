import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export default function WatchlistTab({ activeProfile, onMovieClick, watchlist, partnerWatchlist, onRefreshWatchlist, partnerUser }) {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWatchlistData = async () => {
    setIsLoading(true);
    try {
      const upcomingRes = await fetch(`${API_BASE_URL}/api/upcoming`);
      if (upcomingRes.ok) {
        const upcomingData = await upcomingRes.json();
        setUpcomingMovies(upcomingData);
      }
    } catch (err) {
      console.error("Error al cargar la watchlist:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlistData();
  }, []);

  const handleToggleLike = async (movieKey) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/watchlist/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: activeProfile.id,
          movieKey
        })
      });

      if (response.ok) {
        // Notificar a App.jsx para refrescar el estado global (y la bottom tab bar)
        if (onRefreshWatchlist) {
          onRefreshWatchlist();
        }
      }
    } catch (err) {
      console.error("Error al quitar de la watchlist:", err);
    }
  };

  // Clasificar películas de la watchlist
  const matches = [];      // Cine-Matches (Ambos)
  const myWants = [];      // Solo yo
  const partnerWants = []; // Solo mi pareja

  if (!isLoading) {
    upcomingMovies.forEach(movie => {
      const myLike = watchlist.find(w => w.movieKey === movie.key);
      const partnerLike = partnerWatchlist && partnerWatchlist.length > 0
        ? partnerWatchlist.find(w => w.movieKey === movie.key)
        : watchlist.find(w => w.userId !== activeProfile.id && w.movieKey === movie.key);

      if (myLike && partnerLike) {
        matches.push(movie);
      } else if (myLike) {
        myWants.push(movie);
      } else if (partnerLike) {
        partnerWants.push(movie);
      }
    });
  }

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const months = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun',
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
    ];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  };

  const hasAnyItem = matches.length > 0 || myWants.length > 0 || partnerWants.length > 0;

  return (
    <div className="watchlist-tab-container">
      {/* Encabezado */}
      <div className="watchlist-header glass-card">
        <div className="header-icon-wrap">❤️</div>
        <div className="header-info">
          <h3>Watchlist Pendiente</h3>
          <p>Organiza tus próximas visitas al cine. Las películas marcadas por ambos se transforman en citas oficiales.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="watchlist-skeleton-area">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      ) : hasAnyItem ? (
        <div className="watchlist-content">
          
          {/* SECCIÓN 1: CITAS MATCH (AMBOS LIKES) */}
          {matches.length > 0 && (
            <div className="watchlist-section">
              <h4 className="section-title match-title">
                🍿 Nuestras Citas Pendientes <span className="badge-count">{matches.length}</span>
              </h4>
              <div className="watchlist-list matches-list">
                {matches.map(movie => (
                  <div key={movie.key} className="watchlist-card glass-card match-card">
                    <img src={movie.poster} alt={movie.title} className="w-card-poster" loading="lazy" />
                    <div className="w-card-info">
                      <span className="w-date-tag">Estreno: {formatDate(movie.releaseDate)}</span>
                      <h4 className="w-title">{movie.title}</h4>
                      <div className="match-partner-row">
                        <span className="match-tag-pill active">Tú ❤️</span>
                        <span className="match-tag-pill partner">{partnerUser ? partnerUser.username : 'Pareja'} 💖</span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="w-remove-btn"
                      onClick={() => handleToggleLike(movie.key)}
                      title="Quitar"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN 2: MIS ANTOJOS */}
          {myWants.length > 0 && (
            <div className="watchlist-section">
              <h4 className="section-title">
                💖 Mis Antojos <span className="badge-count">{myWants.length}</span>
              </h4>
              <div className="watchlist-list">
                {myWants.map(movie => (
                  <div key={movie.key} className="watchlist-card glass-card">
                    <img src={movie.poster} alt={movie.title} className="w-card-poster" loading="lazy" />
                    <div className="w-card-info">
                      <span className="w-date-tag sub">Estreno: {formatDate(movie.releaseDate)}</span>
                      <h4 className="w-title">{movie.title}</h4>
                      <p className="w-hint-text">Esperando que le dé corazón para hacer match 🤞</p>
                    </div>
                    <button 
                      type="button" 
                      className="w-remove-btn"
                      onClick={() => handleToggleLike(movie.key)}
                      title="Quitar"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN 3: SUS ANTOJOS (A VER SI ME GUSTA TAMBIÉN) */}
          {partnerWants.length > 0 && (
            <div className="watchlist-section">
              <h4 className="section-title partner-title">
                💕 {partnerUser ? `Antojos de ${partnerUser.username}` : 'Sus Antojos'} <span className="badge-count">{partnerWants.length}</span>
              </h4>
              <p className="partner-section-hint">{partnerUser ? `A ${partnerUser.username} le gustaría ver estas películas.` : 'A tu pareja le gustaría ver estas películas.'} ¡Dale ❤️ en la pestaña Estrenos para programar la cita!</p>
              <div className="watchlist-list">
                {partnerWants.map(movie => (
                  <div key={movie.key} className="watchlist-card glass-card partner-card">
                    <img src={movie.poster} alt={movie.title} className="w-card-poster" loading="lazy" />
                    <div className="w-card-info">
                      <span className="w-date-tag sub">Estreno: {formatDate(movie.releaseDate)}</span>
                      <h4 className="w-title">{movie.title}</h4>
                      <div className="action-hint-pill">
                        <span>💡 Haz Match dando ❤️</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="empty-watchlist glass-card">
          <span className="empty-heart-emoji">💔</span>
          <h4>¡Aún no hay películas pendientes!</h4>
          <p>Ve a la pestaña de <strong>Estrenos</strong> y marca con un corazón las películas que te gustaría ver para empezar a acumular citas.</p>
        </div>
      )}

      <style jsx="true">{`
        .watchlist-tab-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          height: 100%;
        }

        .watchlist-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%);
          border: 1px solid rgba(236, 72, 153, 0.15);
          border-radius: 18px;
        }

        .header-icon-wrap {
          font-size: 32px;
          animation: beat 1.2s infinite ease-in-out;
        }

        .header-info h3 {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px 0;
          font-family: var(--font-display);
        }

        .header-info p {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0;
        }

        .watchlist-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .watchlist-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .section-title.match-title {
          color: var(--accent-cyan);
        }

        .section-title.partner-title {
          color: #f472b6;
        }

        .partner-section-hint {
          font-size: 9.5px;
          color: var(--text-muted);
          margin: -4px 0 4px 0;
          line-height: 1.35;
        }

        .badge-count {
          font-size: 9px;
          font-weight: 800;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 2px 7px;
          border-radius: 10px;
        }

        .match-title .badge-count {
          background: rgba(6, 182, 212, 0.1);
          border-color: rgba(6, 182, 212, 0.2);
          color: var(--accent-cyan);
        }

        .watchlist-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .watchlist-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-radius: 16px;
          position: relative;
          transition: all 0.2s ease;
        }

        .watchlist-card:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .match-card {
          border-color: rgba(6, 182, 212, 0.2) !important;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%);
        }

        .partner-card {
          border-color: rgba(236, 72, 153, 0.15) !important;
          opacity: 0.85;
        }

        .w-card-poster {
          width: 44px;
          height: 66px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.04);
          flex-shrink: 0;
        }

        .w-card-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 2px;
        }

        .w-date-tag {
          font-size: 8.5px;
          font-weight: 700;
          color: var(--accent-cyan);
        }

        .w-date-tag.sub {
          color: var(--text-muted);
        }

        .w-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.25;
        }

        .w-hint-text {
          font-size: 9px;
          color: var(--text-muted);
          margin: 0;
          font-style: italic;
        }

        .match-partner-row {
          display: flex;
          gap: 6px;
          margin-top: 2px;
        }

        .match-tag-pill {
          font-size: 8px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 8px;
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }

        .match-tag-pill.partner {
          background: rgba(236, 72, 153, 0.06);
          border-color: rgba(236, 72, 153, 0.15);
          color: #ec4899;
        }

        .action-hint-pill {
          font-size: 8px;
          font-weight: 700;
          color: #ec4899;
          background: rgba(236, 72, 153, 0.06);
          border: 1px solid rgba(236, 72, 153, 0.15);
          padding: 2px 6px;
          border-radius: 8px;
          align-self: flex-start;
          margin-top: 2px;
        }

        .w-remove-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 10px;
          opacity: 0.4;
          padding: 8px;
          transition: opacity 0.2s;
        }

        .w-remove-btn:hover {
          opacity: 1;
        }

        .empty-watchlist {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 20px;
          border-radius: 20px;
        }

        .empty-heart-emoji {
          font-size: 32px;
          animation: pulse 2s infinite ease-in-out;
        }

        .empty-watchlist h4 {
          font-size: 14px;
          color: var(--text-primary);
          margin: 12px 0 6px 0;
        }

        .empty-watchlist p {
          font-size: 11px;
          color: var(--text-muted);
          margin: 0;
          max-width: 250px;
          line-height: 1.4;
        }

        .watchlist-skeleton-area {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
        }

        .skeleton-line {
          height: 50px;
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
        }

        @keyframes beat {
          0% { transform: scale(1); }
          25% { transform: scale(1.1); }
          40% { transform: scale(1); }
          55% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
