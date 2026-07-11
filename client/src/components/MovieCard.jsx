import React from 'react';

export default function MovieCard({ movie, onClick, ratingsList = [], currentUser = null }) {
  const { title, poster, rating, runTime, ratingSummary } = movie;

  // Buscar la valoración personal del usuario actual para esta película
  const myRating = currentUser
    ? ratingsList.find(r => r.movieKey === movie.key && r.userId === currentUser.id)
    : null;

  // En Cartelera mostramos SOLO la valoración personal del usuario
  // El promedio global (ratingSummary) va en la pestaña Comunidad
  const hasMyRating = !!myRating;

  return (
    <div className="movie-card glass-card" onClick={onClick}>
      <div className="poster-wrapper">
        <img
          src={poster || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=3540&auto=format&fit=crop"}
          alt={title}
          className="movie-poster"
          loading="lazy"
        />

        {/* Badge: valoración personal del usuario o "NUEVO" */}
        {hasMyRating ? (
          <div className="score-badge score-badge--personal">
            <span className="star-symbol">★</span>
            <span className="score-text">{myRating.score}.0</span>
          </div>
        ) : (
          <div className="score-badge unrated">
            <span className="score-text">NUEVO</span>
          </div>
        )}

        {/* Clasificación y duración */}
        <div className="movie-overlay-tags">
          <span className="overlay-tag classification">{rating}</span>
          <span className="overlay-tag runtime">{runTime}</span>
        </div>
      </div>

      <div className="card-info">
        <h3 className="movie-title">{title}</h3>

        <div className="card-bottom">
          {hasMyRating ? (
            <span className="ratings-count ratings-count--mine">
              ✓ Ya la valoraste
            </span>
          ) : (
            <span className="ratings-count unrated-text">
              Sin valorar aún
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
