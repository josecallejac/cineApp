import React, { useState, useEffect } from 'react';
import RatingStars from './RatingStars';
import { API_BASE_URL, resolveAssetUrl } from '../config';

export default function SocialTab({ ratingsList, movies, onMovieClick }) {
  const [likesState, setLikesState] = useState({}); // { reviewId: { count: number, liked: boolean } }
  const [stats, setStats] = useState(null);
  const [showGlobalStats, setShowGlobalStats] = useState(false);

  const fetchGlobalStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Error al cargar estadísticas:", err);
    }
  };

  useEffect(() => {
    fetchGlobalStats();
  }, [ratingsList]);

  // Inicializar likes ficticios deterministas
  useEffect(() => {
    if (ratingsList) {
      const initialLikes = {};
      ratingsList.forEach(r => {
        // Generar un número determinista de likes basados en el ID del rating
        const hash = r.id.charCodeAt(r.id.length - 1) || 0;
        const count = (hash % 12) + 3; // entre 3 y 14 likes iniciales
        initialLikes[r.id] = {
          count,
          liked: false
        };
      });
      setLikesState(initialLikes);
    }
  }, [ratingsList]);

  const handleLikeClick = (e, reviewId) => {
    e.stopPropagation(); // Evitar abrir la película al hacer like
    
    setLikesState(prev => {
      const current = prev[reviewId] || { count: 5, liked: false };
      return {
        ...prev,
        [reviewId]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked
        }
      };
    });
  };

  const handleReviewClick = (movieKey) => {
    const matchingMovie = movies.find(m => m.key === movieKey);
    if (matchingMovie && onMovieClick) {
      onMovieClick(matchingMovie);
    }
  };

  return (
    <div className="social-tab-container animate-scale-in">
      
      {/* 📊 ACCORDION DE ESTADÍSTICAS GLOBALES */}
      <div className="global-stats-accordion glass-card">
        <div 
          className="accordion-header" 
          onClick={() => setShowGlobalStats(!showGlobalStats)}
        >
          <div className="accordion-title-wrap">
            <span className="accordion-icon">📊</span>
            <div>
              <h4>Análisis y Estadísticas</h4>
              <p>Métricas generales y películas más populares del club</p>
            </div>
          </div>
          <span className={`accordion-chevron ${showGlobalStats ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>

        {showGlobalStats && stats && (
          <div className="accordion-body animate-fade-in">
            {/* Grid of quick stats cards */}
            <div className="stats-quick-grid">
              <div className="stat-quick-item">
                <span className="item-emoji">🍿</span>
                <span className="item-val">{stats.totalMovies}</span>
                <span className="item-lbl">Películas</span>
              </div>
              <div className="stat-quick-item">
                <span className="item-emoji">⭐</span>
                <span className="item-val">{stats.totalRatings > 0 ? stats.averageRating : '—'}</span>
                <span className="item-lbl">Puntaje Medio</span>
              </div>
              <div className="stat-quick-item">
                <span className="item-emoji">✍️</span>
                <span className="item-val">{stats.totalRatings}</span>
                <span className="item-lbl">Reseñas</span>
              </div>
            </div>

            {/* Best Rated Movie Highlight */}
            {stats.bestMovie ? (
              <div className="best-movie-highlight gold-border" onClick={() => handleReviewClick(stats.bestMovie.key)}>
                <span className="highlight-tag">🏆 MEJOR VALORADA</span>
                <h5>{stats.bestMovie.title}</h5>
                <div className="highlight-score-wrap">
                  <span className="star-char">★</span>
                  <strong>{stats.bestMovie.average}</strong>
                  <span className="votes-lbl">({stats.bestMovie.count} {stats.bestMovie.count === 1 ? 'opinión' : 'opiniones'})</span>
                </div>
              </div>
            ) : (
              <div className="best-movie-highlight">
                <p className="no-votes-lbl">Aún no hay suficientes calificaciones para calcular la película líder.</p>
              </div>
            )}

            {/* Stars Distribution Chart */}
            {stats.totalRatings > 0 && (
              <div className="stars-distribution-box">
                <h6>Distribución de Calificaciones</h6>
                <div className="dist-list">
                  {[5, 4, 3, 2, 1].map(stars => {
                    const count = stats.globalStars[stars] || 0;
                    const percentage = stats.totalRatings > 0 ? (count / stats.totalRatings) * 100 : 0;
                    return (
                      <div key={stars} className="dist-row">
                        <span className="dist-stars-lbl">{stars} ★</span>
                        <div className="dist-bar-bg">
                          <div className="dist-bar-fill" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="dist-count-lbl">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Título divisor de feed */}
      <div className="social-section-divider">
        <div className="divider-line" />
        <span className="divider-title-text">Opiniones de Santiago Oriente</span>
        <div className="divider-line" />
      </div>

      {/* Feed list */}
      <div className="social-feed-list">
        {ratingsList && ratingsList.length > 0 ? (
          ratingsList.map(review => {
            const likeData = likesState[review.id] || { count: 5, liked: false };
            
            return (
              <div 
                key={review.id} 
                className="social-feed-card glass-card animate-scale-in"
                onClick={() => handleReviewClick(review.movieKey)}
              >
                {/* Header: User details */}
                <div className="feed-card-header">
                  <img src={review.avatar} alt={review.author} className="feed-card-avatar" loading="lazy" />
                  <div className="feed-user-info">
                    <div className="name-row">
                      <span className="feed-author-name">{review.author}</span>
                      <span className="social-user-level">NV. {Math.floor(review.id.charCodeAt(review.id.length - 1) % 4) + 1}</span>
                    </div>
                    <span className="feed-timestamp">
                      {new Date(review.timestamp).toLocaleDateString('es-CL', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="feed-stars-wrap">
                    <RatingStars rating={review.score} size={11} />
                  </div>
                </div>

                {/* Body: Movie Title & Review Text */}
                <div className="feed-card-body">
                  <div className="reviewed-movie-tag">
                    <span>🎬</span> {review.movieTitle}
                  </div>

                  {/* Pills de visita si existen */}
                  {(review.watchedAt || review.cinemaName || review.menuOption || review.moodOption) && (
                    <div className="social-visit-pills">
                      {review.watchedAt && (
                        <span className="social-visit-pill">
                          📅 {new Date(review.watchedAt + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                      {review.cinemaName && (
                        <span className="social-visit-pill cinema">
                          🎭 {review.cinemaName}
                        </span>
                      )}
                      {review.menuOption && (
                        <span className="social-visit-pill food">
                          🍿 {review.menuOption}
                        </span>
                      )}
                      {review.moodOption && (
                        <span className="social-visit-pill mood">
                          {review.moodOption === 'Increíble' ? '🥰 Increíble' :
                           review.moodOption === 'Risas' ? '😂 Risas' :
                           review.moodOption === 'Lloramos' ? '😢 Lloramos' :
                           review.moodOption === 'Dormimos' ? '😴 Zzz' : '🍿 Concentrados'}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {review.comment ? (
                    <p className="feed-comment-text">"{review.comment}"</p>
                  ) : (
                    <p className="feed-comment-text empty">Le dio una puntuación de {review.score} estrellas sin comentario escrito.</p>
                  )}

                  {/* Photo thumbnails */}
                  {review.photos && review.photos.length > 0 && (
                    <div className="feed-photos-grid">
                      {review.photos.map((photo, pIdx) => (
                        <div key={pIdx} className="feed-photo-thumb">
                          <img src={resolveAssetUrl(photo)} alt={`Recuerdo ${pIdx + 1}`} loading="lazy" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: Interaction row */}
                <div className="feed-card-footer">
                  <button 
                    className={`like-social-btn ${likeData.liked ? 'liked' : ''}`}
                    onClick={(e) => handleLikeClick(e, review.id)}
                  >
                    <svg className="heart-icon animate-pulse-fast" width="14" height="14" viewBox="0 0 24 24" fill={likeData.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>{likeData.liked ? 'Te gusta' : 'Me gusta'} • {likeData.count}</span>
                  </button>

                  <div className="click-to-view-movie-hint">
                    <span>Ver horarios</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-social-feed glass-card">
            <span className="empty-social-emoji">💬</span>
            <h4>Aún no hay opiniones de la comunidad</h4>
            <p>Sé el primero en calificar una película para ver tu reseña aquí en tiempo real.</p>
          </div>
        )}
      </div>

      <style jsx="true">{`
        .social-tab-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 30px;
        }

        .social-intro-card {
          border-color: rgba(6, 182, 212, 0.15);
          background: rgba(6, 182, 212, 0.02);
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .intro-glow-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 0 8px rgba(6, 182, 212, 0.15);
          flex-shrink: 0;
        }

        .intro-text-wrap h3 {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .intro-text-wrap p {
          font-size: 10px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Feed list */
        .social-feed-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .social-feed-card {
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(18, 22, 38, 0.35);
          padding: 14px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.25s ease;
        }

        .social-feed-card:active {
          transform: scale(0.98);
          border-color: rgba(139, 92, 246, 0.25);
        }

        .feed-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .feed-card-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #1e1b4b;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .feed-user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .name-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .feed-author-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .social-user-level {
          font-family: var(--font-display);
          font-size: 7px;
          font-weight: 800;
          color: var(--accent-purple);
          border: 1px solid rgba(139, 92, 246, 0.25);
          background: rgba(139, 92, 246, 0.05);
          padding: 1px 4px;
          border-radius: 4px;
          letter-spacing: 0.2px;
        }

        .feed-timestamp {
          font-size: 8px;
          color: var(--text-muted);
        }

        .feed-stars-wrap {
          flex-shrink: 0;
        }

        /* Body details */
        .feed-card-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .reviewed-movie-tag {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 800;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.12);
          width: fit-content;
          padding: 3px 10px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .feed-comment-text {
          font-size: 12px;
          color: var(--text-primary);
          line-height: 1.45;
          font-style: italic;
          background: rgba(0, 0, 0, 0.18);
          padding: 10px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.01);
        }

        .feed-comment-text.empty {
          color: var(--text-muted);
          font-style: normal;
        }

        /* Footer details */
        .feed-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 10px;
          margin-top: 4px;
        }

        .like-social-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .like-social-btn:hover {
          color: #f43f5e;
          background: rgba(244, 63, 94, 0.05);
          border-color: rgba(244, 63, 94, 0.15);
        }

        .like-social-btn.liked {
          color: #f43f5e;
          background: rgba(244, 63, 94, 0.1);
          border-color: rgba(244, 63, 94, 0.3);
          box-shadow: 0 0 10px rgba(244, 63, 94, 0.15);
        }

        .like-social-btn.liked .heart-icon {
          animation: heartBounce 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes heartBounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }

        .click-to-view-movie-hint {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 9px;
          color: var(--text-muted);
          font-weight: 700;
          transition: color 0.2s;
        }

        .social-feed-card:hover .click-to-view-movie-hint {
          color: var(--accent-cyan);
        }

        /* Empty state */
        .empty-social-feed {
          text-align: center;
          padding: 60px 20px;
          border-color: rgba(255, 255, 255, 0.04);
        }

        .empty-social-emoji {
          font-size: 40px;
          margin-bottom: 12px;
          display: block;
        }

        .empty-social-feed h4 {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .empty-social-feed p {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Pills de visita en el feed social */
        .social-visit-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 4px;
          margin-bottom: 2px;
        }

        .social-visit-pill {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 9.5px;
          font-weight: 600;
          color: rgba(139, 92, 246, 0.9);
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.18);
          border-radius: 20px;
          padding: 2px 8px;
        }

        .social-visit-pill.cinema {
          color: rgba(6, 182, 212, 0.9);
          background: rgba(6, 182, 212, 0.07);
          border-color: rgba(6, 182, 212, 0.18);
        }

        .social-visit-pill.food {
          color: #a78bfa;
          background: rgba(139, 92, 246, 0.07);
          border-color: rgba(139, 92, 246, 0.18);
        }

        .social-visit-pill.mood {
          color: #f472b6;
          background: rgba(236, 72, 153, 0.07);
          border-color: rgba(236, 72, 153, 0.18);
        }

        .feed-photos-grid {
          display: flex;
          gap: 6px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .feed-photo-thumb {
          width: 54px;
          height: 54px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.2s ease;
        }

        .feed-photo-thumb:hover {
          transform: scale(1.05);
        }

        .feed-photo-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Collapsible Stats Accordion */
        .global-stats-accordion {
          border-color: rgba(6, 182, 212, 0.18);
          background: rgba(6, 182, 212, 0.02);
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.25s ease;
        }

        .accordion-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          cursor: pointer;
          user-select: none;
        }

        .accordion-header:hover {
          background: rgba(255, 255, 255, 0.01);
        }

        .accordion-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .accordion-icon {
          font-size: 24px;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.25);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .accordion-title-wrap h4 {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .accordion-title-wrap p {
          font-size: 9.5px;
          color: var(--text-secondary);
          margin: 1px 0 0 0;
        }

        .accordion-chevron {
          font-size: 10px;
          color: var(--text-muted);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .accordion-chevron.expanded {
          transform: rotate(180deg);
        }

        .accordion-body {
          padding: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: rgba(0, 0, 0, 0.15);
        }

        /* Stats Grid */
        .stats-quick-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .stat-quick-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px 6px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          text-align: center;
        }

        .item-emoji {
          font-size: 16px;
          margin-bottom: 2px;
        }

        .item-val {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .item-lbl {
          font-size: 8px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.2px;
          margin-top: 2px;
        }

        /* Best Rated Movie */
        .best-movie-highlight {
          display: flex;
          flex-direction: column;
          padding: 12px;
          border-radius: 14px;
          background: rgba(251, 191, 36, 0.04);
          border: 1px solid rgba(251, 191, 36, 0.15);
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .best-movie-highlight:hover {
          background: rgba(251, 191, 36, 0.07);
          border-color: rgba(251, 191, 36, 0.25);
        }

        .best-movie-highlight.gold-border {
          border-color: rgba(251, 191, 36, 0.35);
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.05);
        }

        .highlight-tag {
          font-family: var(--font-display);
          font-size: 7.5px;
          font-weight: 800;
          color: var(--accent-gold);
          letter-spacing: 0.5px;
          margin-bottom: 3px;
        }

        .best-movie-highlight h5 {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 850;
          color: var(--text-primary);
          margin: 0 0 3px 0;
          line-height: 1.2;
        }

        .highlight-score-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 11px;
        }

        .star-char {
          color: var(--accent-gold);
        }

        .votes-lbl {
          font-size: 9px;
          color: var(--text-muted);
        }

        .no-votes-lbl {
          font-size: 10px;
          color: var(--text-muted);
          margin: 0;
        }

        /* Distribution Box */
        .stars-distribution-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stars-distribution-box h6 {
          font-family: var(--font-display);
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-secondary);
          margin: 0 0 2px 0;
        }

        .dist-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dist-stars-lbl {
          font-family: var(--font-display);
          font-size: 9.5px;
          font-weight: 700;
          color: var(--text-secondary);
          width: 24px;
          text-align: right;
        }

        .dist-bar-bg {
          flex: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .dist-bar-fill {
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
        }

        .dist-count-lbl {
          font-size: 9px;
          font-weight: 600;
          color: var(--text-muted);
          width: 14px;
        }

        /* Secciones y dividers */
        .social-section-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 14px 0 4px 0;
          animation: fadeInUp 0.4s ease;
        }

        .social-section-divider .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
        }

        .divider-title-text {
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
}
