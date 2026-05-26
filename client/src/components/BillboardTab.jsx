import React, { useState, useMemo } from 'react';
import MovieCard from './MovieCard';

function BillboardTab({ movies, onMovieClick, isLoading, billboardAlerts = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('score'); // 'score' | 'runtime' | 'alpha'
  const [selectedCinemaFilter, setSelectedCinemaFilter] = useState('all');
  const [alertBannerDismissed, setAlertBannerDismissed] = useState(false);

  const alertSet = new Set(billboardAlerts);

  // Obtener la lista de cines/complejos disponibles de forma dinámica
  const availableCinemas = useMemo(() => {
    if (!movies) return [];
    const list = new Set();
    movies.forEach(m => {
      (m.showtimes || []).forEach(s => {
        list.add(s.cinemaName);
      });
    });
    return Array.from(list);
  }, [movies]);

  // Filtrado y ordenamiento de películas
  const processedMovies = useMemo(() => {
    if (!movies) return [];

    let result = [...movies];

    // 1. Filtrar por búsqueda (Título, Director o Reparto)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.title.toLowerCase().includes(q) || 
        (m.originalTitle && m.originalTitle.toLowerCase().includes(q)) ||
        (m.director && m.director.toLowerCase().includes(q)) ||
        (m.actors && m.actors.some(actor => actor.toLowerCase().includes(q)))
      );
    }

    // 2. Filtrar por complejo seleccionado
    if (selectedCinemaFilter !== 'all') {
      result = result.filter(m => 
        (m.showtimes || []).some(s => s.cinemaName === selectedCinemaFilter)
      );
    }

    // 3. Ordenar
    result.sort((a, b) => {
      if (sortBy === 'score') {
        const scoreA = a.ratingSummary?.average || 0;
        const scoreB = b.ratingSummary?.average || 0;
        // Si empatan, ordenar por cantidad de votos
        if (scoreA === scoreB) {
          return (b.ratingSummary?.count || 0) - (a.ratingSummary?.count || 0);
        }
        return scoreB - scoreA;
      }
      
      if (sortBy === 'runtime') {
        const timeA = parseInt(a.runTime) || 0;
        const timeB = parseInt(b.runTime) || 0;
        return timeB - timeA;
      }
      
      if (sortBy === 'alpha') {
        return a.title.localeCompare(b.title);
      }
      
      return 0;
    });

    return result;
  }, [movies, searchQuery, sortBy, selectedCinemaFilter]);

  return (
    <div className="billboard-tab-container">
      {/* Search and Filters Drawer Panel */}
      <div className="search-filters-panel glass-card">
        <div className="search-input-wrap">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-field"
            placeholder="Buscar por película, director o reparto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        {/* Chips de selección de complejo (Recomendación A) */}
        {availableCinemas.length > 0 && (
          <div className="cinema-chips-row horizontal-scroll">
            <button
              type="button"
              className={`cinema-chip-btn ${selectedCinemaFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCinemaFilter('all')}
            >
              📍 Todos
            </button>
            {availableCinemas.map(cinemaName => (
              <button
                key={cinemaName}
                type="button"
                className={`cinema-chip-btn ${selectedCinemaFilter === cinemaName ? 'active' : ''}`}
                onClick={() => setSelectedCinemaFilter(cinemaName)}
              >
                {cinemaName.replace("Cinépolis ", "").replace(" Premium Class", "").replace(" Premium", "")}
              </button>
            ))}
          </div>
        )}

        <div className="filters-row">
          <div className="filter-select-wrap full-width">
            <span className="select-icon">⚡</span>
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="score">Mejor Calificadas</option>
              <option value="runtime">Mayor Duración</option>
              <option value="alpha">Nombre A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🔔 Banner de Alertas de Estreno */}
      {billboardAlerts.length > 0 && !alertBannerDismissed && (
        <div className="alert-banner glass-card">
          <div className="alert-banner-content">
            <span className="alert-icon">🔔</span>
            <div className="alert-text">
              <span className="alert-title">
                {billboardAlerts.length === 1
                  ? '¡Una película de tu Watchlist está en cartelera!'
                  : `¡${billboardAlerts.length} películas de tu Watchlist están en cartelera!`}
              </span>
              <span className="alert-sub">Desplázate para verla{billboardAlerts.length > 1 ? 's' : ''} destacada{billboardAlerts.length > 1 ? 's' : ''} ✨</span>
            </div>
          </div>
          <button className="alert-dismiss" onClick={() => setAlertBannerDismissed(true)}>✕</button>
        </div>
      )}

      {/* Movies Grid / List */}
      <div className="movies-grid-scroll-area">
        {isLoading ? (
          // Skeleton Loaders
          <div className="movies-grid">
            {[1, 2, 4, 5, 6].map(i => (
              <div key={i} className="skeleton-card glass-card">
                <div className="skeleton skeleton-poster" />
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-meta" />
              </div>
            ))}
          </div>
        ) : processedMovies.length > 0 ? (
          <div className="movies-grid">
            {processedMovies.map(movie => (
              <div key={movie.key} style={{ position: 'relative' }}>
                {alertSet.has(movie.key) && (
                  <div className="movie-alert-badge">
                    <span>❤️ En tu Watchlist</span>
                  </div>
                )}
                <MovieCard
                  movie={movie}
                  onClick={() => onMovieClick(movie)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-movies-container glass-card">
            <span className="empty-emoji">🎬</span>
            <h3>No se encontraron películas</h3>
            <p>Prueba ajustando los filtros o el término de búsqueda.</p>
            <button 
              className="btn-glow btn-glow-cyan reset-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setSortBy('score');
              }}
            >
              Limpiar Filtros
            </button>
          </div>
        )}
      </div>

      <style jsx="true">{`
        .billboard-tab-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
        }

        .search-filters-panel {
          padding: 14px;
          border-color: var(--border-glow);
          background: rgba(13, 17, 28, 0.5);
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-secondary);
          transition: color 0.3s;
        }

        .search-field {
          width: 100%;
          background: rgba(4, 5, 9, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 12.5px;
          padding: 11px 32px 11px 38px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .search-field:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.2);
          background: rgba(8, 10, 16, 0.85);
        }

        .search-field:focus + .search-icon {
          color: var(--accent-cyan);
        }

        .clear-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 18px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .clear-btn:hover {
          color: var(--text-primary);
        }

        .filters-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }

        .filter-select-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .select-icon {
          position: absolute;
          left: 12px;
          font-size: 12px;
          pointer-events: none;
        }

        .filter-select {
          width: 100%;
          background: rgba(4, 5, 9, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 11.5px;
          padding: 10px 12px 10px 30px;
          outline: none;
          cursor: pointer;
          appearance: none;
          transition: all 0.3s;
        }

        .filter-select:focus {
          border-color: var(--accent-rose);
          box-shadow: 0 0 12px rgba(255, 42, 95, 0.15);
          background: rgba(8, 10, 16, 0.85);
        }

        .movies-grid-scroll-area {
          flex: 1;
        }

        .movies-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding-bottom: 28px;
        }

        /* Skeleton styling */
        .skeleton-card {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          background: rgba(13, 17, 28, 0.25);
        }

        .skeleton-poster {
          width: 100%;
          aspect-ratio: 2 / 3;
          border-radius: 14px;
        }

        .skeleton-title {
          height: 16px;
          width: 85%;
        }

        .skeleton-meta {
          height: 12px;
          width: 45%;
        }

        .empty-movies-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 50px 20px;
          border-color: var(--border-glow);
        }

        .empty-emoji {
          font-size: 44px;
          margin-bottom: 14px;
          filter: drop-shadow(0 0 10px rgba(255, 42, 95, 0.3));
        }

        .empty-movies-container h3 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .empty-movies-container p {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 18px;
          line-height: 1.5;
        }

        .reset-filters-btn {
          font-size: 12px;
          padding: 10px 20px;
          border-radius: 12px;
        }

        /* Estilos de chips de complejo (Recomendación A) */
        .cinema-chips-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 6px;
          margin-top: 6px;
          margin-bottom: 2px;
          scrollbar-width: none;
        }

        .cinema-chips-row::-webkit-scrollbar {
          display: none;
        }

        .cinema-chip-btn {
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 7px 14px;
          border-radius: 12px;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .cinema-chip-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
        }

        .cinema-chip-btn.active {
          background: rgba(255, 42, 95, 0.08);
          border-color: rgba(255, 42, 95, 0.35);
          color: var(--accent-rose);
          box-shadow: 0 0 12px rgba(255, 42, 95, 0.2);
        }

        /* Banner de alertas de estreno */
        .alert-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px;
          background: linear-gradient(135deg, rgba(255, 42, 95, 0.12) 0%, rgba(251, 191, 36, 0.08) 100%);
          border: 1px solid rgba(255, 42, 95, 0.25);
          border-radius: 18px;
          animation: slideDown 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(255, 42, 95, 0.1);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .alert-banner-content {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .alert-icon {
          font-size: 22px;
          flex-shrink: 0;
          animation: bellShake 2s ease-in-out infinite;
        }

        @keyframes bellShake {
          0%, 80%, 100% { transform: rotate(0); }
          85% { transform: rotate(-10deg); }
          90% { transform: rotate(10deg); }
          95% { transform: rotate(-6deg); }
        }

        .alert-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .alert-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 800;
          color: #ff9fb4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .alert-sub {
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .alert-dismiss {
          background: rgba(255, 42, 95, 0.15);
          border: 1px solid rgba(255, 42, 95, 0.25);
          color: #ff9fb4;
          font-size: 12px;
          width: 26px;
          height: 26px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .alert-dismiss:hover {
          background: rgba(255, 42, 95, 0.25);
          color: #fff;
        }

        /* Badge sobre la MovieCard en watchlist */
        .movie-alert-badge {
          position: absolute;
          top: 8px;
          left: 0;
          right: 0;
          z-index: 5;
          display: flex;
          justify-content: center;
          pointer-events: none;
        }

        .movie-alert-badge span {
          background: linear-gradient(135deg, var(--accent-rose) 0%, var(--accent-gold) 100%);
          color: #fff;
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.3px;
          box-shadow: 0 4px 12px rgba(255, 42, 95, 0.4);
          backdrop-filter: blur(4px);
        }
      `}</style>
    </div>
  );
}

export default React.memo(BillboardTab);
