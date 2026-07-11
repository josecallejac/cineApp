import React, { useState } from 'react';
import RatingStars from './RatingStars';
import AppointmentsTab from './AppointmentsTab';
import SavedEnvelopesTab from './SavedEnvelopesTab';
import { resolveAssetUrl } from '../config';

export default function MyRatingsTab({ activeProfile, ratingsList, movies, onMovieClick, partnerUser = null }) {
  const [activeSubTab, setActiveSubTab] = useState('ratings'); // 'ratings' | 'calendar' | 'envelopes'
  const [prefilledAptData, setPrefilledAptData] = useState(null);

  // Filtrar reseñas hechas por este usuario actual
  const myRatings = ratingsList
    ? ratingsList.filter(r => r.userId === activeProfile.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    : [];

  const handleRatingClick = (movieKey) => {
    const matchingMovie = movies.find(m => m.key === movieKey);
    if (matchingMovie && onMovieClick) {
      onMovieClick(matchingMovie);
    }
  };

  const handleScheduleWithIdea = (ideaData) => {
    // 1. Guardar los datos para pre-completar el formulario
    setPrefilledAptData(ideaData);
    
    // 2. Cambiar inmediatamente a la pestaña de Calendario
    setActiveSubTab('calendar');
  };

  return (
    <div className="my-ratings-container animate-scale-in">
      {/* Selector superior premium de Sub-pestañas */}
      <div className="ratings-subtabs-nav glass-card">
        <button 
          className={`nav-tab-btn ${activeSubTab === 'ratings' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('ratings')}
        >
          <span className="tab-icon">⭐</span>
          <span className="tab-text">Ratings</span>
        </button>
        <button 
          className={`nav-tab-btn ${activeSubTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('calendar')}
        >
          <span className="tab-icon">📅</span>
          <span className="tab-text">Calendario</span>
        </button>
        {partnerUser && (
          <button 
            className={`nav-tab-btn ${activeSubTab === 'envelopes' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('envelopes')}
          >
            <span className="tab-icon">✉️</span>
            <span className="tab-text">Sobres</span>
          </button>
        )}
      </div>

      {/* Renderizado Condicional de las Sub-pestañas */}
      <div className="subtab-content-zone">
        
        {/* Sub-Tab 1: Historial de Calificaciones */}
        {activeSubTab === 'ratings' && (
          <div className="ratings-history-tab animate-fade-in">
            <div className="tab-header-card glass-card">
              <h3 className="tab-header-title">Historial de Valoraciones</h3>
              <p className="tab-header-desc">
                Aquí se muestran todas tus valoraciones y reseñas de cartelera registradas en tu cuenta.
              </p>
            </div>

            <div className="ratings-history-list">
              {myRatings.length > 0 ? (
                myRatings.map(rating => (
                  <div 
                    key={rating.id} 
                    className="history-item-card glass-card animate-scale-in"
                    onClick={() => handleRatingClick(rating.movieKey)}
                  >
                    <div className="history-item-top">
                      <div className="history-movie-details">
                        <h4 className="history-movie-title">{rating.movieTitle}</h4>
                        <span className="history-timestamp">
                          Calificado el {new Date(rating.timestamp).toLocaleDateString('es-CL', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="history-stars-wrap">
                        <RatingStars rating={rating.score} size={13} />
                      </div>
                    </div>

                    {(rating.watchedAt || rating.cinemaName || rating.menuOption || rating.moodOption) && (
                      <div className="history-visit-badge">
                        {rating.watchedAt && (
                          <span className="visit-pill">
                            📅 {new Date(rating.watchedAt + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        )}
                        {rating.cinemaName && (
                          <span className="visit-pill cinema">
                            🎭 {rating.cinemaName}
                          </span>
                        )}
                        {rating.menuOption && (
                          <span className="visit-pill food">
                            🍿 {rating.menuOption}
                          </span>
                        )}
                        {rating.moodOption && (
                          <span className="visit-pill mood">
                            {rating.moodOption === 'Increíble' ? '🥰 Increíble' :
                             rating.moodOption === 'Risas' ? '😂 Risas' :
                             rating.moodOption === 'Lloramos' ? '😢 Lloramos' :
                             rating.moodOption === 'Dormimos' ? '😴 Zzz' : '🍿 Concentrados'}
                          </span>
                        )}
                      </div>
                    )}

                    {rating.comment ? (
                      <p className="history-comment">{rating.comment}</p>
                    ) : (
                      <p className="history-comment empty">Calificado sin comentario escrito.</p>
                    )}

                    {rating.photos && rating.photos.length > 0 && (
                      <div className="history-photos-grid">
                        {rating.photos.map((photo, pIdx) => (
                          <div key={pIdx} className="history-photo-thumb">
                            <img src={resolveAssetUrl(photo)} alt={`Recuerdo ${pIdx + 1}`} loading="lazy" />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="history-click-hint">
                      <span>Toca para ver detalles de cartelera e info</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-history glass-card animate-scale-in">
                  <span className="history-emoji">⭐</span>
                  <h4>Sin valoraciones registradas</h4>
                  <p>
                    Aún no has calificado ninguna película con esta cuenta demo. 
                    ¡Visita la Cartelera, selecciona una película y añade tu puntuación!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sub-Tab 2: Calendario y Citas */}
        {activeSubTab === 'calendar' && (
          <AppointmentsTab 
            activeProfile={activeProfile}
            movies={movies}
            prefilledData={prefilledAptData}
            onClearPrefilledData={() => setPrefilledAptData(null)}
          />
        )}

        {/* Sub-Tab 3: Sobres Guardados */}
        {activeSubTab === 'envelopes' && partnerUser && (
          <SavedEnvelopesTab 
            activeProfile={activeProfile}
            onScheduleWithIdea={handleScheduleWithIdea}
          />
        )}

      </div>

      <style jsx="true">{`
        .my-ratings-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-bottom: 30px;
        }

        /* Barra de navegación superior */
        .ratings-subtabs-nav {
          display: flex;
          justify-content: space-around;
          padding: 6px;
          border-color: rgba(255, 255, 255, 0.04);
          background: rgba(18, 22, 38, 0.5);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nav-tab-btn {
          flex: 1;
          background: none;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px 4px;
          border-radius: 12px;
          transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .nav-tab-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.02);
        }

        .nav-tab-btn.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15));
          border: 1px solid rgba(139, 92, 246, 0.25);
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
        }

        .nav-tab-btn .tab-icon {
          font-size: 16px;
          transition: transform 0.2s ease;
        }

        .nav-tab-btn.active .tab-icon {
          transform: scale(1.2);
        }

        .nav-tab-btn .tab-text {
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .subtab-content-zone {
          margin-top: 2px;
        }

        /* Estilos de historial (Ratings) */
        .ratings-history-tab {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tab-header-card {
          border-color: rgba(139, 92, 246, 0.15);
          background: rgba(139, 92, 246, 0.02);
          padding: 14px;
        }

        .tab-header-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .tab-header-desc {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .ratings-history-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .history-item-card {
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(18, 22, 38, 0.35);
          padding: 12px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .history-item-card:active {
          transform: scale(0.98);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .history-item-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .history-movie-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .history-movie-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .history-timestamp {
          font-size: 8px;
          color: var(--text-muted);
        }

        .history-stars-wrap {
          flex-shrink: 0;
        }

        .history-comment {
          font-size: 11px;
          color: var(--text-primary);
          line-height: 1.4;
          background: rgba(0, 0, 0, 0.15);
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }

        .history-comment.empty {
          color: var(--text-muted);
          font-style: italic;
        }

        .history-click-hint {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 9px;
          color: var(--accent-cyan);
          font-weight: 600;
          margin-top: 2px;
        }

        .history-visit-badge {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .visit-pill {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          font-weight: 600;
          color: var(--accent-violet);
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 20px;
          padding: 3px 9px;
          letter-spacing: 0.01em;
        }

        .visit-pill.cinema {
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.08);
          border-color: rgba(6, 182, 212, 0.2);
        }

        .visit-pill.food {
          color: #a78bfa;
          background: rgba(167, 139, 250, 0.08);
          border-color: rgba(167, 139, 250, 0.18);
        }

        .visit-pill.mood {
          color: #f472b6;
          background: rgba(244, 114, 182, 0.08);
          border-color: rgba(244, 114, 182, 0.18);
        }

        .history-photos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-top: 4px;
        }

        .history-photo-thumb {
          position: relative;
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .history-photo-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .empty-history {
          text-align: center;
          padding: 36px 20px;
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(18, 22, 38, 0.25);
        }

        .history-emoji {
          font-size: 36px;
          display: inline-block;
          margin-bottom: 12px;
        }

        .empty-history h4 {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .empty-history p {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
