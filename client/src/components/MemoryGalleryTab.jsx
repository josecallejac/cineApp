import React, { useState, useMemo } from 'react';
import { resolveAssetUrl } from '../config';

const MOOD_EMOJIS = {
  'Increíble': '🥰',
  'Risas': '😂',
  'Lloramos': '😢',
  'Dormimos': '😴',
  'Concentrados': '🍿',
};

function formatDateLong(dateStr) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T12:00:00'));
    return d.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return null;
  }
}

function MemoryGalleryTab({ ratingsList, activeProfile, partnerUser }) {
  const [lightbox, setLightbox] = useState(null); // { ratingId, photoIndex }

  // Filter only ratings that have photos, sorted newest first
  const memories = useMemo(() => {
    if (!ratingsList || !activeProfile) return [];
    return ratingsList
      .filter(r => r.photos && Array.isArray(r.photos) && r.photos.length > 0)
      .filter(r => {
        if (partnerUser) {
          // Si está en pareja, mostrar fotos de ambos
          return r.userId === activeProfile.id || r.userId === partnerUser.id;
        }
        // Si está soltero, mostrar solo sus fotos propias
        return r.userId === activeProfile.id;
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [ratingsList, activeProfile, partnerUser]);

  // Lightbox helpers
  const openLightbox = (ratingId, photoIndex) => {
    setLightbox({ ratingId, photoIndex });
  };

  const closeLightbox = () => setLightbox(null);

  const navigateLightbox = (direction) => {
    if (!lightbox) return;
    const rating = memories.find(r => r.id === lightbox.ratingId);
    if (!rating) return;
    const total = rating.photos.length;
    const next = (lightbox.photoIndex + direction + total) % total;
    setLightbox({ ratingId: lightbox.ratingId, photoIndex: next });
  };

  // Get current lightbox data
  const lightboxRating = lightbox ? memories.find(r => r.id === lightbox.ratingId) : null;
  const lightboxPhoto = lightboxRating ? lightboxRating.photos[lightbox.photoIndex] : null;

  // Render stars
  const renderStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`mg-star ${i <= score ? 'filled' : ''}`}>★</span>
      );
    }
    return <div className="mg-stars-row">{stars}</div>;
  };

  return (
    <div className="memory-gallery-container animate-scale-in">

      {/* Header Card */}
      <div className="mg-header-card glass-card">
        <div className="mg-header-icon">📸</div>
        <div className="mg-header-text">
          <h3>Nuestros Recuerdos</h3>
          <p>Un álbum cronológico de sus citas al cine juntos. Cada foto cuenta una historia de amor en la gran pantalla.</p>
        </div>
      </div>

      {memories.length > 0 ? (
        /* Timeline */
        <div className="mg-timeline">
          <div className="mg-timeline-line" />

          {memories.map((rating, idx) => (
            <div key={rating.id} className="mg-timeline-entry" style={{ animationDelay: `${idx * 0.08}s` }}>
              {/* Timeline dot */}
              <div className="mg-timeline-dot" />

              {/* Memory Card */}
              <div className="mg-memory-card glass-card">
                {/* Movie Title */}
                <h4 className="mg-movie-title">{rating.movieTitle}</h4>

                {/* Author */}
                <span className="mg-author">{rating.author}</span>

                {/* Pills row */}
                <div className="mg-pills-row">
                  {rating.watchedAt && (
                    <span className="mg-pill date">
                      📅 {formatDateLong(rating.watchedAt)}
                    </span>
                  )}
                  {rating.cinemaName && (
                    <span className="mg-pill cinema">
                      🎭 {rating.cinemaName}
                    </span>
                  )}
                  {rating.menuOption && (
                    <span className="mg-pill food">
                      🍿 {rating.menuOption}
                    </span>
                  )}
                  {rating.moodOption && (
                    <span className="mg-pill mood">
                      {MOOD_EMOJIS[rating.moodOption] || '🍿'} {rating.moodOption}
                    </span>
                  )}
                </div>

                {/* Stars */}
                {renderStars(rating.score)}

                {/* Photo Grid */}
                <div className={`mg-photo-grid photos-${Math.min(rating.photos.length, 3)}`}>
                  {rating.photos.slice(0, 6).map((photo, pIdx) => (
                    <div
                      key={pIdx}
                      className="mg-photo-thumb"
                      onClick={() => openLightbox(rating.id, pIdx)}
                    >
                      <img src={resolveAssetUrl(photo)} alt={`Recuerdo ${pIdx + 1}`} loading="lazy" />
                      {pIdx === 5 && rating.photos.length > 6 && (
                        <div className="mg-photo-more">+{rating.photos.length - 6}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Comment */}
                {rating.comment && (
                  <p className="mg-comment">"{rating.comment}"</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mg-empty-state glass-card">
          <span className="mg-empty-emoji">📷</span>
          <h4>Aún no hay recuerdos</h4>
          <p>Cuando califiques una película y subas fotos de tu cita, aparecerán aquí como un álbum de recuerdos.</p>
        </div>
      )}

      {/* Lightbox Overlay */}
      {lightbox && lightboxRating && lightboxPhoto && (
        <div className="mg-lightbox-overlay" onClick={closeLightbox}>
          <div className="mg-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button className="mg-lightbox-close" onClick={closeLightbox}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Navigation arrows */}
            {lightboxRating.photos.length > 1 && (
              <>
                <button
                  className="mg-lightbox-nav mg-nav-prev"
                  onClick={() => navigateLightbox(-1)}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  className="mg-lightbox-nav mg-nav-next"
                  onClick={() => navigateLightbox(1)}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>
              </>
            )}

            {/* Photo */}
            <img
              className="mg-lightbox-photo"
              src={resolveAssetUrl(lightboxPhoto)}
              alt={lightboxRating.movieTitle}
            />

            {/* Photo counter */}
            {lightboxRating.photos.length > 1 && (
              <div className="mg-lightbox-counter">
                {lightbox.photoIndex + 1} / {lightboxRating.photos.length}
              </div>
            )}

            {/* Movie title below photo */}
            <div className="mg-lightbox-title">
              <span className="mg-lightbox-movie-icon">🎬</span>
              {lightboxRating.movieTitle}
            </div>
          </div>
        </div>
      )}

      <style jsx="true">{`
        .memory-gallery-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 35px;
        }

        /* ── Header Card ── */
        .mg-header-card {
          border-color: rgba(255, 42, 95, 0.2);
          background: rgba(255, 42, 95, 0.02);
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-radius: 22px;
        }

        .mg-header-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 42, 95, 0.06);
          border: 1.5px solid var(--accent-rose);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
          box-shadow: 0 0 15px rgba(255, 42, 95, 0.25);
        }

        .mg-header-text h3 {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 3px;
        }

        .mg-header-text p {
          font-family: var(--font-sans);
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        /* ── Timeline ── */
        .mg-timeline {
          position: relative;
          padding-left: 26px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .mg-timeline-line {
          position: absolute;
          left: 7px;
          top: 8px;
          bottom: 8px;
          width: 2.5px;
          background: linear-gradient(180deg, var(--accent-rose) 0%, var(--accent-cyan) 50%, var(--accent-rose) 100%);
          border-radius: 2.5px;
          opacity: 0.7;
          box-shadow: 0 0 8px rgba(255, 42, 95, 0.35);
        }

        .mg-timeline-entry {
          position: relative;
          animation: mgFadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes mgFadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mg-timeline-dot {
          position: absolute;
          left: -23px;
          top: 18px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--accent-rose);
          border: 2px solid var(--bg-deep);
          box-shadow: 0 0 10px rgba(255, 42, 95, 0.75);
          z-index: 2;
        }

        /* ── Memory Card ── */
        .mg-memory-card {
          border-color: var(--border-glow);
          background: rgba(13, 17, 28, 0.45);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 22px;
          transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .mg-memory-card:hover {
          border-color: rgba(255, 42, 95, 0.3);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45), 0 0 15px rgba(255, 42, 95, 0.08);
          background: rgba(22, 28, 45, 0.6);
        }

        .mg-movie-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .mg-author {
          font-size: 10.5px;
          color: var(--text-secondary);
          font-weight: 600;
        }

        /* ── Pills ── */
        .mg-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .mg-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 9.5px;
          font-weight: 700;
          border-radius: 20px;
          padding: 4px 10px;
          letter-spacing: 0.01em;
          font-family: var(--font-sans);
        }

        .mg-pill.date {
          color: var(--accent-rose);
          background: rgba(255, 42, 95, 0.07);
          border: 1px solid rgba(255, 42, 95, 0.2);
        }

        .mg-pill.cinema {
          color: var(--accent-cyan);
          background: rgba(34, 211, 238, 0.07);
          border: 1px solid rgba(34, 211, 238, 0.2);
        }

        .mg-pill.food {
          color: var(--accent-gold);
          background: rgba(251, 191, 36, 0.07);
          border: 1px solid rgba(251, 191, 36, 0.2);
        }

        .mg-pill.mood {
          color: #f472b6;
          background: rgba(236, 72, 153, 0.07);
          border: 1px solid rgba(236, 72, 153, 0.2);
        }

        /* ── Stars ── */
        .mg-stars-row {
          display: flex;
          gap: 2px;
        }

        .mg-star {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.08);
          transition: all 0.2s ease;
        }

        .mg-star.filled {
          color: var(--accent-gold);
          text-shadow: 0 0 6px var(--accent-gold-glow);
        }

        /* ── Photo Grid ── */
        .mg-photo-grid {
          display: grid;
          gap: 12px;
          border-radius: 12px;
          padding: 6px 0;
        }

        .mg-photo-grid.photos-1 {
          grid-template-columns: 1fr;
        }

        .mg-photo-grid.photos-2 {
          grid-template-columns: 1fr 1fr;
        }

        .mg-photo-grid.photos-3 {
          grid-template-columns: 1fr 1fr;
        }

        .mg-photo-grid.photos-3 .mg-photo-thumb:first-child {
          grid-row: span 2;
        }

        .mg-photo-thumb {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4/3;
          background: rgba(0, 0, 0, 0.3);
          border: 3.5px solid rgba(255, 255, 255, 0.9); /* Premium polaroid borders */
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
          transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* Polaroid physical tilt scattering effects */
        .mg-photo-grid .mg-photo-thumb:nth-child(odd) {
          transform: rotate(-1.5deg);
        }

        .mg-photo-grid .mg-photo-thumb:nth-child(even) {
          transform: rotate(1.5deg);
        }

        .mg-photo-thumb:hover {
          transform: scale(1.06) rotate(0deg) !important;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.55), 0 0 15px rgba(255, 42, 95, 0.25);
          border-color: #ffffff;
          z-index: 10;
        }

        .mg-photo-thumb:active {
          transform: scale(0.96) rotate(0deg);
        }

        .mg-photo-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .mg-photo-thumb:hover img {
          transform: scale(1.08);
        }

        .mg-photo-more {
          position: absolute;
          inset: 0;
          background: rgba(4, 5, 9, 0.65);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: #fff;
        }

        /* ── Comment ── */
        .mg-comment {
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.5;
          font-style: italic;
          background: rgba(4, 5, 9, 0.25);
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          font-family: var(--font-sans);
        }

        /* ── Empty State ── */
        .mg-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 24px;
          border-color: var(--border-glow);
          background: rgba(13, 17, 28, 0.25);
          border-radius: 24px;
        }

        .mg-empty-emoji {
          font-size: 46px;
          margin-bottom: 16px;
          display: block;
          filter: drop-shadow(0 0 10px rgba(255, 42, 95, 0.2));
          animation: mgEmptyFloat 3s ease-in-out infinite;
        }

        @keyframes mgEmptyFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .mg-empty-state h4 {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .mg-empty-state p {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
          max-width: 290px;
        }

        /* ── Lightbox ── */
        .mg-lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 1100;
          background: rgba(3, 4, 6, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: mgLightboxFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes mgLightboxFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .mg-lightbox-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 16px 40px;
          gap: 14px;
        }

        .mg-lightbox-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 1110;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }

        .mg-lightbox-close:hover {
          background: rgba(255, 42, 95, 0.15);
          border-color: rgba(255, 42, 95, 0.3);
          transform: scale(1.08);
        }

        .mg-lightbox-close:active {
          transform: scale(0.94);
        }

        .mg-lightbox-photo {
          max-width: 100%;
          max-height: 65vh;
          object-fit: contain;
          border-radius: 14px;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.7);
          animation: mgPhotoZoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          border: 4px solid #ffffff; /* Polaroid Lightbox frame */
        }

        @keyframes mgPhotoZoomIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Navigation arrows */
        .mg-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1110;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }

        .mg-nav-prev {
          left: 10px;
        }

        .mg-nav-next {
          right: 10px;
        }

        .mg-lightbox-nav:hover {
          background: rgba(255, 42, 95, 0.15);
          border-color: rgba(255, 42, 95, 0.3);
          box-shadow: 0 0 15px rgba(255, 42, 95, 0.25);
        }

        .mg-lightbox-nav:active {
          transform: translateY(-50%) scale(0.92);
        }

        .mg-lightbox-counter {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 1.2px;
        }

        .mg-lightbox-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(4, 5, 9, 0.4);
          padding: 8px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mg-lightbox-movie-icon {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}

export default React.memo(MemoryGalleryTab);
