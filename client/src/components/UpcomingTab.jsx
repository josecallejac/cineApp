import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export default function UpcomingTab({ activeProfile, onMovieClick, watchlist, onRefreshWatchlist }) {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para la Modal de Cine-Match
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedMovie, setMatchedMovie] = useState(null);

  // Cargar estrenos desde la API
  const fetchUpcomingData = async () => {
    setIsLoading(true);
    try {
      const upcomingRes = await fetch(`${API_BASE_URL}/api/upcoming`);
      if (upcomingRes.ok) {
        const upcomingData = await upcomingRes.json();
        setUpcomingMovies(upcomingData);
      }
    } catch (err) {
      console.error("Error al cargar estrenos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingData();
  }, []);

  // Manejar click en tu corazón
  const handleToggleLike = async (movieKey, movieTitle) => {
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
        const result = await response.json();
        
        // Notificar a App.jsx para refrescar el estado global (y la bottom tab bar)
        if (onRefreshWatchlist) {
          onRefreshWatchlist();
        }

        // Si fue like y además completó el MATCH, disparamos la modal
        if (result.isLiked && result.hasMatch) {
          const matched = upcomingMovies.find(m => m.key === movieKey);
          setMatchedMovie(matched);
          setShowMatchModal(true);
        }
      }
    } catch (err) {
      console.error("Error con watchlist:", err);
    }
  };

  // Obtener los meses representados en las películas para filtrar
  const getMonthsFilter = () => {
    const monthsMap = {
      '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
      '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
      '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
    };

    const uniqueMonths = new Set();
    upcomingMovies.forEach(m => {
      const monthPart = m.releaseDate.split('-')[1];
      if (monthPart && monthsMap[monthPart]) {
        uniqueMonths.add(monthPart);
      }
    });

    return Array.from(uniqueMonths).sort().map(m => ({
      code: m,
      name: monthsMap[m]
    }));
  };

  // Filtrar películas
  const filteredMovies = upcomingMovies.filter(m => {
    if (selectedMonth === 'all') return true;
    return m.releaseDate.split('-')[1] === selectedMonth;
  });

  // Helper para formatear fechas
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${parseInt(day)} de ${months[parseInt(month) - 1]}, ${year}`;
  };

  return (
    <div className="upcoming-tab-container">
      {/* Encabezado descriptivo */}
      <div className="upcoming-header glass-card">
        <div className="header-icon-wrap">🍿</div>
        <div className="header-info">
          <h3>Próximos Estrenos</h3>
          <p>Explora lo que viene a Chile en los siguientes meses. ¡Si a ambos les gusta la misma película, ocurrirá un <strong>Cine-Match! 💘</strong></p>
        </div>
      </div>

      {/* Selector de meses para filtrar */}
      {!isLoading && upcomingMovies.length > 0 && (
        <div className="month-filters horizontal-scroll">
          <button 
            type="button" 
            className={`month-chip ${selectedMonth === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedMonth('all')}
          >
            🗓️ Todos
          </button>
          {getMonthsFilter().map(m => (
            <button
              key={m.code}
              type="button"
              className={`month-chip ${selectedMonth === m.code ? 'active' : ''}`}
              onClick={() => setSelectedMonth(m.code)}
            >
              {m.name}
            </button>
          ))}
        </div>
      )}

      {/* Grid de Películas */}
      <div className="upcoming-movies-area">
        {isLoading ? (
          <div className="skeleton-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton-card glass-card">
                <div className="skeleton-poster" />
                <div className="skeleton-info" />
              </div>
            ))}
          </div>
        ) : filteredMovies.length > 0 ? (
          <div className="upcoming-grid">
            {filteredMovies.map(movie => {
              // Comprobar likes
              const myLike = watchlist.find(w => w.userId === activeProfile.id && w.movieKey === movie.key);
              const partnerLike = watchlist.find(w => w.userId !== activeProfile.id && w.movieKey === movie.key);
              const isMatch = myLike && partnerLike;

              return (
                <div key={movie.key} className={`upcoming-card glass-card ${isMatch ? 'match-card-glow' : ''}`}>
                  <div className="card-poster-wrap">
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      className="card-poster"
                      onError={(e) => {
                        // Fallback si falla la carga de imagen
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="poster-fallback-card">
                      <span>🎬</span>
                      <p>{movie.title}</p>
                    </div>
                    {isMatch && (
                      <div className="match-ribbon">
                        <span>💘 CITA MATCH</span>
                      </div>
                    )}
                  </div>

                  <div className="card-content">
                    <div className="card-top-tags">
                      <span className="release-date-tag">
                        📅 {formatDate(movie.releaseDate)}
                      </span>
                      {movie.genres && movie.genres.slice(0, 2).map(g => (
                        <span key={g} className="genre-tag">{g}</span>
                      ))}
                    </div>

                    <h4 className="movie-title">{movie.title}</h4>
                    <p className="movie-synopsis">{movie.synopsis}</p>

                    {/* Fila de Corazones de Pareja */}
                    <div className="watchlist-actions-row">
                      <div className="watchlist-action-col">
                        <span className="action-label">¿Te tinca verla?</span>
                        <button
                          type="button"
                          className={`heart-btn my-heart ${myLike ? 'active' : ''}`}
                          onClick={() => handleToggleLike(movie.key, movie.title)}
                        >
                          <svg className="heart-svg" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          <span>{myLike ? '¡Me tinca! ❤️' : 'Quiero ver'}</span>
                        </button>
                      </div>

                      <div className="watchlist-action-col">
                        <span className="action-label">A tu pareja...</span>
                        <div className={`partner-heart-pill ${partnerLike ? 'active' : ''}`}>
                          <svg className="heart-svg small-heart" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          <span>{partnerLike ? '¡Le tinca! 💖' : 'Aún no opina'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-upcoming-container glass-card">
            <span className="empty-emoji">🗓️</span>
            <h3>No hay estrenos para este mes</h3>
            <p>Intenta seleccionando otra fecha en los filtros superiores.</p>
          </div>
        )}
      </div>

      {/* CELEBRACIÓN DE CINE-MATCH MODAL OVERLAY */}
      {showMatchModal && matchedMovie && (
        <div className="match-modal-backdrop">
          <div className="match-modal-card glass-card animate-scale-in">
            {/* Cabritas y Corazones Animados Flotantes */}
            <div className="match-particles">
              <span className="particle p1">💖</span>
              <span className="particle p2">🍿</span>
              <span className="particle p3">🥰</span>
              <span className="particle p4">💖</span>
              <span className="particle p5">🍿</span>
              <span className="particle p6">🔥</span>
            </div>

            <div className="match-modal-header">
              <span className="match-sparkle">✨</span>
              <h2>¡CINE-MATCH!</h2>
              <span className="match-sparkle">✨</span>
            </div>

            <p className="match-subtitle">¡Tenemos una cita pendiente! 💘</p>

            <div className="match-movie-preview">
              <img src={matchedMovie.poster} alt={matchedMovie.title} className="match-preview-poster" />
              <div className="match-movie-info">
                <h3>{matchedMovie.title}</h3>
                <span className="match-date-badge">📅 Estreno: {formatDate(matchedMovie.releaseDate)}</span>
                <p>Ambos marcaron esta película como favorita. Se guardó automáticamente en la lista de citas pendientes compartidas.</p>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-glow btn-glow-purple match-celebrate-btn"
              onClick={() => {
                setShowMatchModal(false);
                setMatchedMovie(null);
              }}
            >
              🍿 ¡Genial! A planear la salida
            </button>
          </div>
        </div>
      )}

      <style jsx="true">{`
        .upcoming-tab-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          /* Sin height:100% — el scroll-container padre maneja el scroll */
        }

        .upcoming-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 18px;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow: hidden;
        }

        .header-icon-wrap {
          font-size: 32px;
          animation: pulse 2s infinite ease-in-out;
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

        .month-filters {
          display: flex;
          flex-wrap: nowrap;
          gap: 8px;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          padding-bottom: 4px;
          width: 100%;
          max-width: 100%; /* iOS: no expandir el viewport */
          -webkit-overflow-scrolling: touch;
        }

        .month-filters::-webkit-scrollbar {
          display: none;
        }

        .month-chip {
          flex-shrink: 0;
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .month-chip:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .month-chip.active {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.15);
        }

        .upcoming-movies-area {
          flex: 1;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        .upcoming-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .upcoming-card {
          display: flex;
          gap: 16px;
          padding: 14px;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .upcoming-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.02);
        }

        .match-card-glow {
          border-color: rgba(139, 92, 246, 0.3) !important;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.08);
        }

        .card-poster-wrap {
          width: 90px;
          height: 135px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .card-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .poster-fallback-card {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8px;
          box-sizing: border-box;
          gap: 6px;
        }

        .poster-fallback-card span {
          font-size: 20px;
        }

        .poster-fallback-card p {
          font-size: 8px;
          font-weight: 800;
          color: var(--text-secondary);
          margin: 0;
          text-transform: uppercase;
        }

        .match-ribbon {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, var(--accent-violet) 0%, #ec4899 100%);
          color: #fff;
          font-size: 7px;
          font-weight: 900;
          text-align: center;
          padding: 3px 0;
          letter-spacing: 0.05em;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .card-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-top-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 6px;
          align-items: center;
        }

        .release-date-tag {
          font-size: 9px;
          font-weight: 700;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.06);
          border: 1px solid rgba(6, 182, 212, 0.15);
          padding: 3px 8px;
          border-radius: 20px;
        }

        .genre-tag {
          font-size: 8.5px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          padding: 3px 8px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .movie-title {
          font-size: 13.5px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px 0;
          font-family: var(--font-display);
        }

        .movie-synopsis {
          font-size: 10.5px;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0 0 12px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* --- Fila de Corazones de Pareja --- */
        .watchlist-actions-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding-top: 10px;
          margin-top: auto;
        }

        .watchlist-action-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .action-label {
          font-size: 8px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .heart-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: 12px;
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .heart-btn:hover {
          background: rgba(239, 68, 68, 0.04);
          border-color: rgba(239, 68, 68, 0.2);
          color: var(--text-primary);
        }

        .heart-btn.active {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.15);
        }

        .partner-heart-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          color: var(--text-muted);
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
        }

        .partner-heart-pill.active {
          background: rgba(236, 72, 153, 0.08);
          border-color: rgba(236, 72, 153, 0.2);
          color: #ec4899;
          font-weight: 700;
        }

        .heart-svg {
          width: 12px;
          height: 12px;
          fill: currentColor;
          transition: transform 0.2s ease;
        }

        .heart-btn:active .heart-svg {
          transform: scale(1.3);
        }

        .empty-upcoming-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 20px;
          border-radius: 20px;
        }

        .empty-upcoming-container h3 {
          font-size: 14px;
          color: var(--text-primary);
          margin: 12px 0 6px 0;
        }

        .empty-upcoming-container p {
          font-size: 11px;
          color: var(--text-muted);
          margin: 0;
        }

        /* --- SKELETON LOADERS --- */
        .skeleton-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skeleton-card {
          display: flex;
          gap: 16px;
          padding: 14px;
          border-radius: 20px;
          height: 120px;
        }

        .skeleton-poster {
          width: 80px;
          height: 100%;
          border-radius: 12px;
          background: linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        .skeleton-info {
          flex: 1;
          background: linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 12px;
        }

        /* --- MODAL DE CINE-MATCH --- */
        .match-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        .match-modal-card {
          width: 100%;
          max-width: 360px;
          background: linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 28px;
          padding: 24px;
          box-sizing: border-box;
          text-align: center;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(139, 92, 246, 0.2);
        }

        .match-modal-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 2px;
        }

        .match-modal-header h2 {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 900;
          background: linear-gradient(135deg, var(--accent-cyan) 0%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          letter-spacing: 0.05em;
        }

        .match-sparkle {
          font-size: 20px;
          animation: spin 3s infinite linear;
        }

        .match-subtitle {
          font-size: 13px;
          font-weight: 700;
          color: #f472b6;
          margin: 0 0 20px 0;
        }

        .match-movie-preview {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 16px;
          display: flex;
          gap: 16px;
          text-align: left;
          margin-bottom: 24px;
        }

        .match-preview-poster {
          width: 75px;
          height: 110px;
          border-radius: 10px;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          flex-shrink: 0;
        }

        .match-movie-info h3 {
          font-size: 13px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 4px 0;
        }

        .match-date-badge {
          display: inline-block;
          font-size: 8px;
          font-weight: 700;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.08);
          padding: 3px 8px;
          border-radius: 20px;
          margin-bottom: 8px;
        }

        .match-movie-info p {
          font-size: 9.5px;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0;
        }

        .match-celebrate-btn {
          width: 100%;
          padding: 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 800;
        }

        /* --- PARTÍCULAS CSS DE CELEBRACIÓN --- */
        .match-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 10;
        }

        .particle {
          position: absolute;
          font-size: 16px;
          opacity: 0;
          animation: floatParticle 3s infinite ease-in-out;
        }

        .p1 { left: 10%; bottom: 10%; animation-delay: 0s; font-size: 20px; }
        .p2 { left: 80%; bottom: 20%; animation-delay: 0.5s; font-size: 18px; }
        .p3 { left: 20%; top: 20%; animation-delay: 1.2s; }
        .p4 { left: 75%; top: 15%; animation-delay: 0.8s; font-size: 22px; }
        .p5 { left: 45%; bottom: 15%; animation-delay: 1.8s; }
        .p6 { left: 5%; top: 40%; animation-delay: 2.2s; }

        @keyframes floatParticle {
          0% {
            transform: translateY(30px) rotate(0deg) scale(0.6);
            opacity: 0;
          }
          30% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) rotate(360deg) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* --- RESPONSIVE MÓVIL (activa sólo en viewport real < 600px) --- */
        @media (max-width: 599px) {
          .upcoming-card {
            flex-direction: column;
            gap: 12px;
            padding: 12px;
            background: rgba(13, 17, 28, 0.55);
            border-color: rgba(255, 255, 255, 0.05);
          }
          .card-poster-wrap {
            width: 100%;
            height: 180px;
            border-radius: 14px;
          }
          .card-poster { object-position: center 20%; }
          .movie-title { font-size: 15px; margin-top: 4px; }
          .movie-synopsis {
            font-size: 10.5px;
            margin-bottom: 10px;
            -webkit-line-clamp: 3;
          }
          .watchlist-actions-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding-top: 8px;
          }
          .heart-btn, .partner-heart-pill {
            padding: 8px 12px;
            font-size: 10.5px;
            justify-content: center;
          }
          .upcoming-header { padding: 12px; gap: 10px; border-radius: 16px; }
          .month-chip { padding: 6px 12px; font-size: 10px; }
        }
      `}</style>
    </div>
  );
}
