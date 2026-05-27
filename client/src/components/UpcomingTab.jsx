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


    </div>
  );
}
