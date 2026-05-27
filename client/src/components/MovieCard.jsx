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

    </div>
  );
}
