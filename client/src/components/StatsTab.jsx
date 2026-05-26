import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export default function StatsTab({ movies }) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [movies]);

  if (isLoading) {
    return (
      <div className="stats-loading-pane animate-scale-in">
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton skeleton-stats-card" />
        ))}
        <style jsx="true">{`
          .stats-loading-pane {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .skeleton-stats-card {
            height: 100px;
            border-radius: 16px;
          }
        `}</style>
      </div>
    );
  }

  if (!stats) return <div className="empty-stats">No se pudieron cargar estadísticas.</div>;

  const { totalRatings, averageRating, globalStars, bestMovie, totalMovies } = stats;

  return (
    <div className="stats-tab-container animate-scale-in">
      <h3 className="stats-section-title">Análisis de Cartelera</h3>

      {/* Grid of quick stats cards */}
      <div className="stats-grid">
        <div className="stat-card glass-card">
          <span className="stat-icon-emoji">🍿</span>
          <div className="stat-value">{totalMovies}</div>
          <div className="stat-label">Películas</div>
        </div>

        <div className="stat-card glass-card">
          <span className="stat-icon-emoji">⭐</span>
          <div className="stat-value">{totalRatings > 0 ? averageRating : '—'}</div>
          <div className="stat-label">Puntaje Medio</div>
        </div>

        <div className="stat-card glass-card">
          <span className="stat-icon-emoji">✍️</span>
          <div className="stat-value">{totalRatings}</div>
          <div className="stat-label">Reseñas</div>
        </div>
      </div>

      {/* Highlights Sections */}
      <div className="stats-highlights-list">

        {/* Best Rated Movie */}
        {bestMovie ? (
          <div className="highlight-row-card glass-card gold-border">
            <div className="highlight-visual gold">🏆</div>
            <div className="highlight-content">
              <span className="highlight-category gold">Mejor Valorada por Usuarios</span>
              <h4 className="highlight-title">{bestMovie.title}</h4>
              <div className="highlight-movie-score">
                <span className="gold-star">★</span>
                <strong>{bestMovie.average}</strong>
                <span className="votes-count">({bestMovie.count} {bestMovie.count === 1 ? 'opinión' : 'opiniones'})</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="highlight-row-card glass-card">
            <div className="highlight-visual">🏆</div>
            <div className="highlight-content">
              <span className="highlight-category">Mejor Valorada</span>
              <h4 className="highlight-title">Aún sin calificaciones</h4>
              <p className="highlight-desc">¡Sé el primero en calificar una película para verla coronada aquí!</p>
            </div>
          </div>
        )}
      </div>

      {/* Global Distribution stars */}
      {totalRatings > 0 && (
        <div className="stars-distribution-card glass-card">
          <h4 className="card-inner-title">Distribución de Calificaciones</h4>
          <div className="dist-list">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = globalStars[stars] || 0;
              const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
              return (
                <div key={stars} className="dist-row">
                  <span className="dist-stars-label">{stars} ★</span>
                  <div className="dist-bar-bg">
                    <div 
                      className="dist-bar-fill" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="dist-count-label">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style jsx="true">{`
        .stats-tab-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 30px;
        }

        .stats-section-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px;
          text-align: center;
          border-color: rgba(255, 255, 255, 0.02);
          background: rgba(18, 22, 38, 0.35);
        }

        .stat-icon-emoji {
          font-size: 20px;
          margin-bottom: 4px;
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 9px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 2px;
        }

        .stats-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .highlight-row-card {
          display: flex;
          gap: 16px;
          align-items: center;
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(14, 16, 28, 0.45);
          padding: 14px;
        }

        .highlight-row-card.gold-border {
          border-color: rgba(251, 191, 36, 0.35);
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.08);
          background: linear-gradient(135deg, rgba(25, 20, 10, 0.5) 0%, rgba(14, 16, 28, 0.5) 100%);
        }

        .highlight-visual {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        .highlight-visual.gold {
          background: rgba(251, 191, 36, 0.08);
          border-color: rgba(251, 191, 36, 0.3);
        }

        .highlight-content {
          flex: 1;
        }

        .highlight-category {
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 800;
          color: var(--accent-purple);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 2px;
        }

        .highlight-category.gold {
          color: var(--accent-gold);
        }

        .highlight-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 2px;
        }

        .highlight-desc {
          font-size: 10px;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .highlight-movie-score {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
        }

        .gold-star {
          color: var(--accent-gold);
          font-size: 14px;
        }

        .votes-count {
          font-size: 10px;
          color: var(--text-secondary);
        }

        /* Stars Distribution section */
        .stars-distribution-card {
          border-color: rgba(255, 255, 255, 0.03);
          padding: 14px;
        }

        .card-inner-title {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .dist-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .dist-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dist-stars-label {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-secondary);
          width: 24px;
          text-align: right;
        }

        .dist-bar-bg {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .dist-bar-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
          transition: width 0.8s ease-in-out;
        }

        .dist-count-label {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          width: 14px;
        }

        .empty-stats {
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
          padding: 40px 0;
        }
      `}</style>
    </div>
  );
}
