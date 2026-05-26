import React from 'react';
import RatingStars from './RatingStars';

export default function MovieCard({ movie, onClick }) {
  const { title, poster, rating, runTime, ratingSummary } = movie;
  const { average, count } = ratingSummary || { average: 0, count: 0 };

  return (
    <div className="movie-card glass-card" onClick={onClick}>
      <div className="poster-wrapper">
        <img 
          src={poster || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=3540&auto=format&fit=crop"} 
          alt={title} 
          className="movie-poster" 
          loading="lazy"
        />
        
        {/* Rating Score Badge */}
        {count > 0 ? (
          <div className="score-badge">
            <span className="star-symbol">★</span>
            <span className="score-text">{average}</span>
          </div>
        ) : (
          <div className="score-badge unrated">
            <span className="score-text">NUEVO</span>
          </div>
        )}

        {/* Runtime and rating classification overlay */}
        <div className="movie-overlay-tags">
          <span className="overlay-tag classification">{rating}</span>
          <span className="overlay-tag runtime">{runTime}</span>
        </div>
      </div>

      <div className="card-info">
        <h3 className="movie-title">{title}</h3>
        
        <div className="card-bottom">
          {count > 0 ? (
            <span className="ratings-count">
              {count} {count === 1 ? 'valoración' : 'valoraciones'}
            </span>
          ) : (
            <span className="ratings-count unrated-text">Sin valoraciones</span>
          )}
        </div>
      </div>

      <style jsx="true">{`
        .movie-card {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          cursor: pointer;
          border-radius: 20px;
          border: 1px solid var(--border-glow);
          overflow: hidden;
          background: rgba(13, 17, 28, 0.45);
          box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.5);
          transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .movie-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 42, 95, 0.3);
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.65), 0 0 20px rgba(255, 42, 95, 0.1);
          background: rgba(22, 28, 45, 0.6);
        }

        .movie-card:active {
          transform: translateY(-1px) scale(0.97);
          box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.4);
        }

        .poster-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
          border-radius: 14px;
          overflow: hidden;
          background: #090b10;
        }

        .movie-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .movie-card:hover .movie-poster {
          transform: scale(1.06);
        }

        .score-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(8, 10, 16, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1.5px solid var(--accent-gold);
          border-radius: 10px;
          padding: 4px 8px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 13px;
          box-shadow: 0 4px 12px var(--accent-gold-glow);
          z-index: 10;
          transition: all 0.3s ease;
        }

        .score-badge.unrated {
          border-color: var(--accent-cyan);
          box-shadow: 0 4px 12px var(--accent-cyan-glow);
        }

        .star-symbol {
          color: var(--accent-gold);
        }

        .score-badge.unrated .score-text {
          color: var(--accent-cyan);
          letter-spacing: 0.5px;
          font-size: 10px;
          font-weight: 800;
        }

        .score-text {
          color: var(--text-primary);
        }

        .movie-overlay-tags {
          position: absolute;
          bottom: 8px;
          left: 8px;
          right: 8px;
          display: flex;
          gap: 6px;
          z-index: 10;
        }

        .overlay-tag {
          font-family: var(--font-sans);
          font-size: 9px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 8px;
          background: rgba(8, 10, 16, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
        }

        .overlay-tag.classification {
          color: var(--accent-cyan);
          border-color: rgba(34, 211, 238, 0.25);
          font-family: var(--font-display);
          font-weight: 800;
        }

        .card-info {
          padding: 4px 2px 2px 2px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
        }

        .movie-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 42px;
          transition: color 0.25s;
        }

        .movie-card:hover .movie-title {
          color: #fff;
        }

        .card-bottom {
          display: flex;
          align-items: center;
          margin-top: auto;
        }

        .ratings-count {
          font-size: 11.5px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .ratings-count.unrated-text {
          color: var(--text-muted);
        }

        /* --- RESPONSIVE MÓVIL OPTIMIZADO (Cyber-Cinematic Glow) --- */
        @media (max-width: 480px) {
          .movie-card {
            border-radius: 18px;
            padding: 6px;
          }
          .movie-title {
            font-size: 15px;
            height: auto;
            max-height: 40px;
            -webkit-line-clamp: 2;
            margin-bottom: 4px;
          }
          .ratings-count {
            font-size: 10.5px;
          }
          .score-badge {
            top: 6px;
            right: 6px;
            padding: 3px 6px;
            font-size: 11px;
            border-radius: 8px;
          }
          .overlay-tag {
            font-size: 8px;
            padding: 3px 6px;
            border-radius: 6px;
          }
          .poster-wrapper {
            border-radius: 12px;
          }
        }
      `}</style>
    </div>
  );
}
