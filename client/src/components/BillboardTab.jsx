import React, { useState, useMemo } from 'react';
import MovieCard from './MovieCard';

function BillboardTab({ movies, onMovieClick, isLoading, billboardAlerts = [], ratingsList = [], currentUser = null }) {
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
                  ratingsList={ratingsList}
                  currentUser={currentUser}
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
    </div>
  );
}

export default React.memo(BillboardTab);
