import React, { useState } from 'react';
import MemoryGalleryTab from './MemoryGalleryTab';

const CHALLENGES = [
  "🍿 Desafío de Dulces: En su próxima cita de este tipo, quien haya calificado más bajo tiene que pagar las cabritas gigantes.",
  "📱 Desafío de Concentración: Ver la secuela sin mirar el celular ni una sola vez. ¡Quien lo mire primero paga los chocolates!",
  "🤫 Desafío de Silencio: Mantener absoluto silencio durante los tráilers. Quien hable primero le debe un masaje al otro.",
  "🎬 Desafío del Director: Investigar 3 datos curiosos de la producción de la película antes de ir y compartirlos durante las promos.",
  "🍫 Desafío de Sorpresa: Esconder un dulce sorpresa en la chaqueta de tu pareja para que lo descubra en plena función.",
  "🎟️ Desafío Retro: Guardar la colilla física de su próxima entrada y pegarla en su diario de recuerdos.",
  "🥤 Desafío del Sabor: Comprar un sabor de bebida o snack que nunca hayan probado en el cine y valorarlo a ciegas."
];

export default function DuoTab({ currentUser, partnerUser, ratingsList, onUnlink }) {
  const [activeSubTab, setActiveSubTab] = useState('affinity'); // 'affinity' | 'comparison'
  const [filterLevel, setFilterLevel] = useState('all'); // 'all' | 'perfect' | 'debate'
  const [expandedMovies, setExpandedMovies] = useState({}); // { [movieKey]: boolean }
  const [movieChallenges, setMovieChallenges] = useState({}); // { [movieKey]: string }
  const [showRatingDetails, setShowRatingDetails] = useState(true); // default true for convenience

  if (!currentUser || !partnerUser) return null;

  // Filtrar reseñas de ambos en caliente
  const myRatings = ratingsList ? ratingsList.filter(r => r.userId === currentUser.id) : [];
  const partnerRatings = ratingsList ? ratingsList.filter(r => r.userId === partnerUser.id) : [];

  // Calcular promedios individuales de calificaciones
  const getAverage = (ratings) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, curr) => acc + curr.score, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const myAverage = getAverage(myRatings);
  const partnerAverage = getAverage(partnerRatings);

  // Películas en común valoradas por ambos (Citas)
  const myMovieKeys = new Set(myRatings.map(r => r.movieKey));
  const mutualMovies = partnerRatings.filter(r => myMovieKeys.has(r.movieKey));

  // --- STATS AGGREGATES FOR DUO ---
  const duoCinemas = [];
  const duoCombos = [];
  const duoMoods = [];

  mutualMovies.forEach(partnerRating => {
    const myRating = myRatings.find(r => r.movieKey === partnerRating.movieKey);
    if (myRating) {
      if (myRating.cinemaName) duoCinemas.push(myRating.cinemaName);
      if (partnerRating.cinemaName) duoCinemas.push(partnerRating.cinemaName);
      
      if (myRating.menuOption) duoCombos.push(myRating.menuOption);
      if (partnerRating.menuOption) duoCombos.push(partnerRating.menuOption);

      if (myRating.moodOption) duoMoods.push(myRating.moodOption);
      if (partnerRating.moodOption) duoMoods.push(partnerRating.moodOption);
    }
  });

  const getMostFrequent = (arr) => {
    if (arr.length === 0) return "—";
    const counts = {};
    arr.forEach(x => counts[x] = (counts[x] || 0) + 1);
    let best = "—";
    let max = 0;
    Object.keys(counts).forEach(key => {
      if (counts[key] > max) {
        max = counts[key];
        best = key;
      }
    });
    return best;
  };

  const favoriteCinema = getMostFrequent(duoCinemas);
  const favoriteCombo = getMostFrequent(duoCombos);
  const favoriteMood = getMostFrequent(duoMoods);

  // Calcular compatibilidad de gustos
  let compatibilityPct = null;
  let compatibilityLabel = "¡Escriban su primera reseña juntos!";
  let compatibilityRatingText = "Califica las mismas películas que tu pareja en cartelera para revelar su afinidad cinemática.";

  if (mutualMovies.length > 0) {
    let totalDiff = 0;
    let matchedCount = 0;

    mutualMovies.forEach(partnerRating => {
      const myRating = myRatings.find(r => r.movieKey === partnerRating.movieKey);
      if (myRating) {
        totalDiff += Math.abs(myRating.score - partnerRating.score);
        matchedCount++;
      }
    });

    if (matchedCount > 0) {
      const avgDiff = totalDiff / matchedCount;
      const score = Math.max(0, 100 - Math.round(avgDiff * 20));
      compatibilityPct = score;

      if (score >= 90) {
        compatibilityLabel = "🌟 ¡Almas Gemelas del Cine!";
        compatibilityRatingText = "Comparten la misma visión cinemática. ¡Tienen gustos idénticos y aman las mismas historias!";
      } else if (score >= 75) {
        compatibilityLabel = "🍿 ¡Excelente Sintonía!";
        compatibilityRatingText = "Gran química palomera. Disfrutan los mismos géneros y suelen coincidir en sus veredictos.";
      } else if (score >= 50) {
        compatibilityLabel = "🎬 ¡Debate Divertido!";
        compatibilityRatingText = "Les encanta conversar y diferir en algunas tramas. ¡Sus debates post-cine son lo mejor!";
      } else {
        compatibilityLabel = "⚡ ¡Polos Opuestos!";
        compatibilityRatingText = "Ella prefiere el drama romántico y tú la acción explosiva. ¡La variedad hace sus salidas más interesantes!";
      }
    }
  }

  const handleUnlinkClick = () => {
    if (window.confirm(`¿Seguro que deseas desvincular tu cuenta de ${partnerUser.username}? Se desactivará el modo CineGlow Duo.`)) {
      if (onUnlink) onUnlink();
    }
  };

  const toggleMovieExpand = (movieKey) => {
    setExpandedMovies(prev => ({
      ...prev,
      [movieKey]: !prev[movieKey]
    }));
  };

  const rollChallenge = (movieKey, e) => {
    e.stopPropagation();
    const randomIdx = Math.floor(Math.random() * CHALLENGES.length);
    setMovieChallenges(prev => ({
      ...prev,
      [movieKey]: CHALLENGES[randomIdx]
    }));
  };

  // Filtrado interactivo de las citas mutuas
  const filteredMutualMovies = mutualMovies.filter(partnerRating => {
    const myRating = myRatings.find(r => r.movieKey === partnerRating.movieKey);
    if (!myRating) return false;
    const diff = Math.abs(myRating.score - partnerRating.score);

    if (filterLevel === 'perfect') return diff === 0;
    if (filterLevel === 'debate') return diff >= 2;
    return true; // 'all'
  });

  const countPerfect = mutualMovies.filter(partnerRating => {
    const myRating = myRatings.find(r => r.movieKey === partnerRating.movieKey);
    return myRating && Math.abs(myRating.score - partnerRating.score) === 0;
  }).length;

  const countDebate = mutualMovies.filter(partnerRating => {
    const myRating = myRatings.find(r => r.movieKey === partnerRating.movieKey);
    return myRating && Math.abs(myRating.score - partnerRating.score) >= 2;
  }).length;

  return (
    <div className="duo-tab-container animate-scale-in">
      
      {/* 1. TARJETA CABECERA: AVATARES ENCADENADOS */}
      <div className="duo-portal-card glass-card">
        <div className="duo-ambient-glow" />
        <div className="duo-portal-inner">
          <span className="duo-status-tag">CINEGLOW DUO ACTIVO 💑</span>
          <h3>Nuestro Club de Cine</h3>
          
          <div className="duo-avatars-connector-row">
            <div className="duo-portal-avatar me">
              <img src={currentUser.avatar || "https://api.dicebear.com/7.x/pixel-art/svg?seed=cineglowdefault"} alt="Tú" />
              <span className="avatar-label">Tú</span>
            </div>

            <div className="duo-portal-wire">
              <div className="wire-line" />
              <span className="wire-heart pulse">💖</span>
              <div className="wire-line" />
            </div>

            <div className="duo-portal-avatar partner">
              <img src={partnerUser.avatar || "https://api.dicebear.com/7.x/pixel-art/svg?seed=cineglowdefault"} alt={partnerUser.username} />
              <span className="avatar-label">{partnerUser.username}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COMPATIBILIDAD HEART GAUGE */}
      <div className="duo-compatibility-card glass-card">
        <div className="gauge-outer-wrap">
          <div className="circular-heart-gauge">
            <div className="circle-bezel">
              <span className="gauge-heart-icon">💖</span>
              <span className="gauge-score-pct">{compatibilityPct !== null ? `${compatibilityPct}%` : '?'}</span>
            </div>
          </div>
          <div className="gauge-explanation">
            <h4>{compatibilityLabel}</h4>
            <p>{compatibilityRatingText}</p>
          </div>
        </div>
      </div>

      {/* 3. SUB-TAB BAR: INTERACTIVE CONTROLLER FOR CRITERION ANALYSIS */}
      <div className="duo-stats-comparison-card glass-card">
        <div className="card-header-with-tabs">
          <h4 className="card-section-title">Análisis de Criterio</h4>
          <div className="duo-segmented-control">
            <button 
              type="button" 
              className={`segmented-btn ${activeSubTab === 'affinity' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('affinity')}
            >
              📊 Resumen
            </button>
            <button 
              type="button" 
              className={`segmented-btn ${activeSubTab === 'comparison' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('comparison')}
            >
              🎬 Citas ({mutualMovies.length})
            </button>
          </div>
        </div>

        {activeSubTab === 'affinity' ? (
          /* TAB 1: AFINIDAD GENERAL RESUMEN */
          <div className="affinity-dashboard-tab animate-fade-in">
            <div className="comparison-table">
              <div className="comparison-row header">
                <span className="col-label">Métrica</span>
                <span className="col-val text-cyan">Tú</span>
                <span className="col-val text-rose">{partnerUser.username}</span>
              </div>

              <div className="comparison-row">
                <span className="col-label">Películas Reseñadas</span>
                <span className="col-val">{myRatings.length}</span>
                <span className="col-val">{partnerRatings.length}</span>
              </div>

              <div className="comparison-row">
                <span className="col-label">Calificación Promedio</span>
                <span className="col-val">{myAverage > 0 ? `${myAverage} ★` : '—'}</span>
                <span className="col-val">{partnerAverage > 0 ? `${partnerAverage} ★` : '—'}</span>
              </div>

              <div className="comparison-row">
                <span className="col-label">Citas Calificadas Juntos</span>
                <span className="col-val span-two">{mutualMovies.length} películas</span>
              </div>
            </div>

            {/* Tarjetas de Diagnóstico de Pareja */}
            <div className="duo-infographics-grid">
              <div className="info-item-card glass-item">
                <div className="info-icon-circle bg-cyan">📍</div>
                <div className="info-text-block">
                  <span className="info-meta">CINE FAVORITO</span>
                  <span className="info-value">{favoriteCinema}</span>
                </div>
              </div>

              <div className="info-item-card glass-item">
                <div className="info-icon-circle bg-rose">🍿</div>
                <div className="info-text-block">
                  <span className="info-meta">SNACK DE CITA</span>
                  <span className="info-value">{favoriteCombo}</span>
                </div>
              </div>

              <div className="info-item-card glass-item">
                <div className="info-icon-circle bg-gold">🥰</div>
                <div className="info-text-block">
                  <span className="info-meta">CLIMA EMOCIONAL</span>
                  <span className="info-value">{favoriteMood}</span>
                </div>
              </div>

              <div className="info-item-card glass-item">
                <div className="info-icon-circle bg-purple">🏆</div>
                <div className="info-text-block">
                  <span className="info-meta">NIVEL COINCIDENCIA</span>
                  <span className="info-value">
                    {compatibilityPct !== null 
                      ? (compatibilityPct >= 85 ? "Pareja Platino 💎" : compatibilityPct >= 65 ? "Oro Palomero 🌟" : "Debatientes 🍿")
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: DETALLE Y FILTRO DE CITAS COMPARTIDAS */
          <div className="comparison-details-tab animate-fade-in">
            {mutualMovies.length > 0 ? (
              <>
                {/* Filtros de Afinidades */}
                <div className="duo-filter-pills-row">
                  <button 
                    type="button" 
                    className={`filter-pill ${filterLevel === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterLevel('all')}
                  >
                    🎬 Todas ({mutualMovies.length})
                  </button>
                  <button 
                    type="button" 
                    className={`filter-pill ${filterLevel === 'perfect' ? 'active' : ''}`}
                    onClick={() => setFilterLevel('perfect')}
                  >
                    🌟 Coincidencias ({countPerfect})
                  </button>
                  <button 
                    type="button" 
                    className={`filter-pill ${filterLevel === 'debate' ? 'active' : ''}`}
                    onClick={() => setFilterLevel('debate')}
                  >
                    ⚡ Debates ({countDebate})
                  </button>
                </div>

                <div className="stats-details-list">
                  {filteredMutualMovies.map(partnerRating => {
                    const myRating = myRatings.find(r => r.movieKey === partnerRating.movieKey);
                    if (!myRating) return null;

                    const isExpanded = !!expandedMovies[partnerRating.movieKey];
                    const diff = Math.abs(myRating.score - partnerRating.score);
                    
                    let verdict = "🍿 ¡Muy Cerca! Prácticamente de acuerdo.";
                    let verdictClass = "close-verdict";
                    let verbalVerdict = "¡Excelente Sintonía! Coinciden en el espíritu general de la película. ¡Casi se leen la mente en la fila de la dulcería!";
                    
                    if (diff === 0) {
                      verdict = "🌟 ¡Alineación Total! Gustos idénticos.";
                      verdictClass = "perfect-verdict";
                      verbalVerdict = "¡Alineación Astral! Ambos le dieron exactamente la misma puntuación. Sus cerebros cinemáticos vibran en la misma frecuencia. ¡Recomendamos repetir la función en IMAX!";
                    } else if (diff === 2) {
                      verdict = "🎬 ¡Hay Debate! Pequeñas diferencias.";
                      verdictClass = "debate-verdict";
                      verbalVerdict = "¡Debate Palomero Activo! Tienen perspectivas distintas sobre la trama. A preparar los argumentos para la cena.";
                    } else if (diff >= 3) {
                      verdict = "⚡ ¡Polos Opuestos! Discusión asegurada.";
                      verdictClass = "clash-verdict";
                      verbalVerdict = `¡Choque de Titanes! Hay una discrepancia de ${diff} estrellas. Uno amó el film y el otro probablemente usó el celular. ¡El que tuvo la menor puntuación debe pagar la próxima salida!`;
                    }

                    const activeChallenge = movieChallenges[partnerRating.movieKey];

                    return (
                      <div 
                        key={partnerRating.id} 
                        className={`detail-movie-row-card interactive-card ${isExpanded ? 'active-glow' : ''}`}
                        onClick={() => toggleMovieExpand(partnerRating.movieKey)}
                      >
                        <div className="detail-movie-header-row">
                          <div className="detail-movie-header-left">
                            <span className="movie-icon">🎬</span>
                            <h5>{partnerRating.movieTitle}</h5>
                          </div>
                          <span className={`expand-indicator ${isExpanded ? 'open' : ''}`}>▼</span>
                        </div>

                        {/* Fila compacta de puntuaciones */}
                        <div className="detail-movie-scores-strip">
                          <span className="mini-score"><span className="dot-cyan">●</span> Tú: {myRating.score} ★</span>
                          <span className="mini-score"><span className="dot-rose">●</span> {partnerUser.username}: {partnerRating.score} ★</span>
                          <span className={`mini-verdict-lbl ${verdictClass}`}>{diff === 0 ? "Perfecto" : diff === 1 ? "Sintonía" : "Debate"}</span>
                        </div>

                        {/* Cajón desplegable con información detallada y lúdica */}
                        {isExpanded && (
                          <div className="detail-drawer-expanded animate-slide-down" onClick={e => e.stopPropagation()}>
                            <div className="drawer-divider" />
                            
                            {/* Información detallada de la cita */}
                            <div className="date-metadata-grid">
                              <div className="meta-subitem">
                                <span className="meta-sub-lbl">📅 FECHA</span>
                                <span className="meta-sub-val">{myRating.watchedAt || partnerRating.watchedAt || "No indicada"}</span>
                              </div>
                              <div className="meta-subitem">
                                <span className="meta-sub-lbl">🎭 CINE</span>
                                <span className="meta-sub-val">{myRating.cinemaName || partnerRating.cinemaName || "Cinepolis Oriente"}</span>
                              </div>
                              <div className="meta-subitem">
                                <span className="meta-sub-lbl">🍿 SNACKS</span>
                                <span className="meta-sub-val">{myRating.menuOption || partnerRating.menuOption || "Cabritas mixtas"}</span>
                              </div>
                              <div className="meta-subitem">
                                <span className="meta-sub-lbl">🥰 MOOD</span>
                                <span className="meta-sub-val">{myRating.moodOption || partnerRating.moodOption || "Increíble"}</span>
                              </div>
                            </div>

                            {/* Comentarios de Chat Side-by-Side */}
                            <div className="side-by-side-comments">
                              <span className="comment-section-title">Comentarios de la Cita</span>
                              <div className="comments-bubble-column">
                                <div className="chat-bubble user-me">
                                  <div className="bubble-author">Tú</div>
                                  <p className="bubble-text">
                                    {myRating.comment ? `"${myRating.comment}"` : "Calificaste sin dejar comentarios."}
                                  </p>
                                </div>
                                <div className="chat-bubble user-partner">
                                  <div className="bubble-author">{partnerUser.username}</div>
                                  <p className="bubble-text">
                                    {partnerRating.comment ? `"${partnerRating.comment}"` : "Tu pareja no dejó comentarios escritos."}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Veredicto Lúdico del Mediador */}
                            <div className={`expanded-mediator-verdict ${verdictClass}`}>
                              <h5>Mediador de CineGlow Duo</h5>
                              <p>{verbalVerdict}</p>
                            </div>

                            {/* Desafío de Cita Siguiente */}
                            <div className="date-challenge-box">
                              {activeChallenge ? (
                                <div className="challenge-ticket animate-pulse">
                                  <span className="ticket-badge">🍿 DESAFÍO CINEGLOW</span>
                                  <p className="ticket-text">{activeChallenge}</p>
                                  <button 
                                    className="btn-reroll-challenge"
                                    onClick={(e) => rollChallenge(partnerRating.movieKey, e)}
                                  >
                                    🔄 Cambiar reto
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  type="button" 
                                  className="btn-glow-card btn-glow-purple reveal-challenge-btn"
                                  onClick={(e) => rollChallenge(partnerRating.movieKey, e)}
                                >
                                  🚀 Revelar Desafío para Próxima Cita
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="no-mutual-movies-empty">
                <span>🍿</span>
                <h5>¡Sin citas registradas aún!</h5>
                <p>Ambos deben valorar la misma película para desbloquear el análisis comparativo completo.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. ÁLBUM DE RECUERDOS COMPARTIDOS (Polaroids timeline) */}
      <div className="duo-memories-section">
        <div className="social-section-divider">
          <div className="divider-line" />
          <span className="divider-title-text">Álbum de Recuerdos</span>
          <div className="divider-line" />
        </div>
        <MemoryGalleryTab 
          ratingsList={ratingsList} 
          activeProfile={currentUser} 
          partnerUser={partnerUser}
        />
      </div>

      {/* 5. BOTÓN DESVINCULAR PORTAL */}
      <div className="duo-unlink-section-card glass-card">
        <p>¿Quieres cambiar de pareja o desactivar el modo Duo en este dispositivo?</p>
        <button 
          type="button" 
          className="btn-glow btn-glow-purple unlink-portal-btn"
          onClick={handleUnlinkClick}
        >
          💔 Desvincular Pareja
        </button>
      </div>

      <style jsx="true">{`
        .duo-tab-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 40px;
        }

        /* 1. Tarjeta Cabecera */
        .duo-portal-card {
          position: relative;
          overflow: hidden;
          padding: 24px 16px;
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%);
          border-color: rgba(236, 72, 153, 0.25);
          border-radius: 24px;
        }

        .duo-ambient-glow {
          position: absolute;
          top: -20%;
          left: -10%;
          width: 120%;
          height: 140%;
          background: radial-gradient(circle at 50% 30%, rgba(236, 72, 153, 0.15) 0%, rgba(6, 182, 212, 0.05) 60%, transparent 100%);
          pointer-events: none;
        }

        .duo-portal-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .duo-status-tag {
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 800;
          color: var(--accent-rose);
          border: 1px solid rgba(236, 72, 153, 0.35);
          background: rgba(236, 72, 153, 0.08);
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.5px;
          box-shadow: 0 0 12px rgba(236, 72, 153, 0.15);
        }

        .duo-portal-inner h3 {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .duo-avatars-connector-row {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 8px;
          gap: 6px;
        }

        .duo-portal-avatar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          width: 70px;
        }

        .duo-portal-avatar img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
          border: 2.5px solid #0c0e17;
          background: #141332;
        }

        .duo-portal-avatar.me img {
          border-color: var(--accent-cyan);
        }

        .duo-portal-avatar.partner img {
          border-color: var(--accent-rose);
        }

        .avatar-label {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 800;
          color: var(--text-primary);
          text-align: center;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .duo-portal-wire {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 120px;
        }

        .wire-line {
          flex: 1;
          height: 2px;
          background: repeating-linear-gradient(90deg, rgba(236, 72, 153, 0.3), rgba(236, 72, 153, 0.3) 5px, transparent 5px, transparent 10px);
        }

        .wire-heart {
          font-size: 16px;
        }

        /* 2. Compatibilidad Gauge */
        .duo-compatibility-card {
          padding: 16px;
          border-radius: 20px;
        }

        .gauge-outer-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .circular-heart-gauge {
          position: relative;
          flex-shrink: 0;
        }

        .circle-bezel {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-rose), var(--accent-cyan));
          padding: 2.5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(236, 72, 153, 0.25);
          position: relative;
        }

        .circle-bezel::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1.5px dashed rgba(255,255,255,0.25);
          animation: spin 16s linear infinite;
        }

        .gauge-heart-icon {
          font-size: 12px;
          position: absolute;
          top: 8px;
          animation: beat 1.4s infinite ease-in-out;
        }

        .gauge-score-pct {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 10px;
        }

        .gauge-explanation {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }

        .gauge-explanation h4 {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .gauge-explanation p {
          font-size: 10px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0;
        }

        /* 3. Comparación de stats */
        .duo-stats-comparison-card {
          padding: 16px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card-header-with-tabs {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 10px;
        }

        .card-section-title {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 800;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Segmented Controller */
        .duo-segmented-control {
          display: flex;
          background: rgba(4, 5, 9, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 2.5px;
          gap: 2px;
        }

        .segmented-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .segmented-btn.active {
          color: #fff;
          background: rgba(6, 182, 212, 0.2);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.1);
        }

        .comparison-table {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .comparison-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          padding: 8px 8px;
          border-radius: 8px;
          align-items: center;
        }

        .comparison-row:nth-child(even) {
          background: rgba(255, 255, 255, 0.015);
        }

        .comparison-row.header {
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
          padding-bottom: 6px;
        }

        .col-label {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .col-val {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
          text-align: center;
        }

        .col-val.span-two {
          grid-column: span 2;
          text-align: center;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.15);
          padding: 2px 8px;
          border-radius: 8px;
          font-size: 10px;
        }

        .text-cyan { color: var(--accent-cyan) !important; }
        .text-rose { color: var(--accent-rose) !important; }

        /* Infografía Grid */
        .duo-infographics-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-top: 12px;
        }

        @media (max-width: 480px) {
          .duo-infographics-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }

        .info-item-card {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 14px;
          padding: 10px 12px;
          transition: transform 0.2s;
        }

        .info-item-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.03);
        }

        .info-icon-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .bg-cyan { background: rgba(6, 182, 212, 0.1); border: 1.5px solid rgba(6, 182, 212, 0.3); }
        .bg-rose { background: rgba(236, 72, 153, 0.1); border: 1.5px solid rgba(236, 72, 153, 0.3); }
        .bg-gold { background: rgba(245, 158, 11, 0.1); border: 1.5px solid rgba(245, 158, 11, 0.3); }
        .bg-purple { background: rgba(168, 85, 247, 0.1); border: 1.5px solid rgba(168, 85, 247, 0.3); }

        .info-text-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow: hidden;
          flex: 1;
        }

        .info-meta {
          font-family: var(--font-display);
          font-size: 7.5px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          word-break: break-word;
        }

        /* Filter Pills */
        .duo-filter-pills-row {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 6px;
          margin-bottom: 10px;
        }

        .duo-filter-pills-row::-webkit-scrollbar {
          height: 0px;
        }

        .filter-pill {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 9.5px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 16px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .filter-pill:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(6, 182, 212, 0.2);
        }

        .filter-pill.active {
          background: rgba(6, 182, 212, 0.15);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.1);
        }

        /* Detail Cards list */
        .stats-details-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 480px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .stats-details-list::-webkit-scrollbar {
          width: 4px;
        }
        .stats-details-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .stats-details-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .detail-movie-row-card {
          display: flex;
          flex-direction: column;
          background: rgba(0, 0, 0, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 14px;
          padding: 12px;
          gap: 6px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .detail-movie-row-card:hover {
          background: rgba(255, 255, 255, 0.015);
          border-color: rgba(255, 255, 255, 0.06);
        }

        .detail-movie-row-card.active-glow {
          border-color: rgba(236, 72, 153, 0.25);
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.05);
          background: rgba(0, 0, 0, 0.35);
        }

        .detail-movie-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .detail-movie-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .detail-movie-header-left h5 {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .expand-indicator {
          font-size: 8px;
          color: var(--text-muted);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .expand-indicator.open {
          transform: rotate(180deg);
          color: var(--accent-rose);
        }

        .detail-movie-scores-strip {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 4px;
        }

        .mini-score {
          font-size: 9.5px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dot-cyan { color: var(--accent-cyan); font-size: 8px; }
        .dot-rose { color: var(--accent-rose); font-size: 8px; }

        .mini-verdict-lbl {
          font-size: 8px;
          font-weight: 800;
          text-transform: uppercase;
          padding: 1px 6px;
          border-radius: 4px;
          margin-left: auto;
        }

        /* Drawer desplegado */
        .detail-drawer-expanded {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 6px;
        }

        .drawer-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          width: 100%;
        }

        .date-metadata-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          background: rgba(255, 255, 255, 0.01);
          padding: 8px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }

        .meta-subitem {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .meta-sub-lbl {
          font-family: var(--font-display);
          font-size: 7px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        .meta-sub-val {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Comentarios del Chat */
        .side-by-side-comments {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .comment-section-title {
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .comments-bubble-column {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .chat-bubble {
          padding: 8px 10px;
          border-radius: 12px;
          max-width: 90%;
          position: relative;
        }

        .chat-bubble.user-me {
          background: rgba(6, 182, 212, 0.06);
          border: 1px solid rgba(6, 182, 212, 0.15);
          align-self: flex-start;
          border-top-left-radius: 0;
        }

        .chat-bubble.user-partner {
          background: rgba(236, 72, 153, 0.06);
          border: 1px solid rgba(236, 72, 153, 0.15);
          align-self: flex-end;
          border-top-right-radius: 0;
        }

        .bubble-author {
          font-family: var(--font-display);
          font-size: 7px;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .user-me .bubble-author { color: var(--accent-cyan); }
        .user-partner .bubble-author { color: var(--accent-rose); }

        .bubble-text {
          font-size: 10px;
          color: var(--text-secondary);
          line-height: 1.3;
          margin: 0;
          font-style: italic;
        }

        /* Mediador */
        .expanded-mediator-verdict {
          padding: 8px 12px;
          border-radius: 10px;
          border: 1.5px solid transparent;
        }

        .expanded-mediator-verdict h5 {
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          margin: 0 0 3px 0;
        }

        .expanded-mediator-verdict p {
          font-size: 9.5px;
          line-height: 1.35;
          margin: 0;
        }

        .perfect-verdict {
          color: #10b981;
          background: rgba(16, 185, 129, 0.06);
          border-color: rgba(16, 185, 129, 0.2);
        }

        .close-verdict {
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.06);
          border-color: rgba(6, 182, 212, 0.2);
        }

        .debate-verdict {
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.06);
          border-color: rgba(245, 158, 11, 0.2);
        }

        .clash-verdict {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.06);
          border-color: rgba(239, 68, 68, 0.2);
        }

        /* Desafíos */
        .date-challenge-box {
          margin-top: 6px;
        }

        .reveal-challenge-btn {
          width: 100%;
          font-family: var(--font-display);
          font-size: 9.5px;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(168, 85, 247, 0.08);
          border: 1px dashed rgba(168, 85, 247, 0.35);
          color: #c084fc;
          cursor: pointer;
          transition: all 0.2s;
        }

        .reveal-challenge-btn:hover {
          background: rgba(168, 85, 247, 0.15);
          border-style: solid;
          color: #fff;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.15);
        }

        .challenge-ticket {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 10px 12px;
          background: repeating-linear-gradient(45deg, rgba(168, 85, 247, 0.02) 0px, rgba(168, 85, 247, 0.02) 10px, transparent 10px, transparent 20px), rgba(168, 85, 247, 0.04);
          border: 1.5px dashed rgba(168, 85, 247, 0.4);
          border-radius: 12px;
          box-shadow: inset 0 0 20px rgba(168, 85, 247, 0.05);
          gap: 6px;
        }

        .ticket-badge {
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 800;
          color: #c084fc;
          background: rgba(168, 85, 247, 0.15);
          padding: 2px 8px;
          border-radius: 10px;
          letter-spacing: 0.5px;
        }

        .ticket-text {
          font-size: 10px;
          color: var(--text-primary);
          line-height: 1.4;
          margin: 0;
          font-weight: 600;
        }

        .btn-reroll-challenge {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 8.5px;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.2s;
        }

        .btn-reroll-challenge:hover {
          color: var(--accent-rose);
        }

        .no-mutual-movies-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 30px 16px;
        }

        .no-mutual-movies-empty span {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .no-mutual-movies-empty h5 {
          font-family: var(--font-display);
          font-size: 12px;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .no-mutual-movies-empty p {
          font-size: 10px;
          color: var(--text-secondary);
          line-height: 1.35;
          margin: 0;
        }

        /* Divider */
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

        /* Memories Section spacing inside DuoTab */
        .duo-memories-section {
          margin-top: 14px;
        }

        /* 4. Desvincular */
        .duo-unlink-section-card {
          padding: 16px;
          border-radius: 20px;
          text-align: center;
          background: rgba(239, 68, 68, 0.01);
          border-color: rgba(239, 68, 68, 0.1);
        }

        .duo-unlink-section-card p {
          font-size: 10px;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0 0 12px 0;
        }

        .unlink-portal-btn {
          width: 100%;
          max-width: 220px;
          font-size: 12px;
          padding: 8px 16px;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.06);
          border-color: rgba(239, 68, 68, 0.25);
          color: #ef4444;
          transition: all 0.2s;
        }

        .unlink-portal-btn:hover {
          background: rgba(239, 68, 68, 0.12) !important;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.15) !important;
        }

        @keyframes beat {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-down {
          animation: slideDown 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

    </div>
  );
}
