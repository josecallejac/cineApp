import React, { useState, useEffect } from 'react';

// 🎁 Lista curada de ideas para la próxima cita al cine
export const DATE_IDEAS = [
  { emoji: '🎭', idea: '¡Elijan una película de un género que nunca han visto juntos!', tip: 'Terror, documental, animación… ¡sorpréndanse!' },
  { emoji: '🍜', idea: 'Antes del cine, cenar en ese restorán que siempre dicen "algún día vamos".', tip: 'Hagan de la cita algo más que solo la película.' },
  { emoji: '🌙', idea: 'Elijan la función más tarde de la noche y salgan a caminar después.', tip: 'Las noches post-cine tienen magia propia.' },
  { emoji: '📸', idea: '¡Sácanse una selfie antes de entrar a la sala! Es para el álbum de recuerdos.', tip: 'Ya tienen la pestaña "Recuerdos" esperándolos.' },
  { emoji: '🏆', idea: 'Túrnense: esta vez elige tú, la próxima vez elige tu pareja.', tip: 'El sistema de rotación más justo del universo.' },
  { emoji: '💌', idea: 'Envíenle la tarjeta de invitación antes de ir, aunque ya estén juntos.', tip: 'Los detalles pequeños son los más grandes.' },
  { emoji: '🎵', idea: 'Escuchen el soundtrack de la película en el camino a casa.', tip: 'La música prolonga la magia de lo que vieron.' },
  { emoji: '🗺️', idea: 'Exploren un mall o barrio nuevo donde está el cine.', tip: 'La cita empieza mucho antes de la sala.' },
  { emoji: '☕', idea: 'Café o té después del cine y conversen sobre la película por 30 minutos.', tip: 'El análisis post-pelicula es su ritual más bonito.' },
  { emoji: '🍰', idea: '¡Celebren que llevan otra película juntos con un dulce/snack de la dulcería!', tip: 'Cada cita compartida es un logro en pareja.' }
];

function getRandomIdea(ratingCount) {
  const index = ratingCount % DATE_IDEAS.length;
  return DATE_IDEAS[index];
}

export default function SurpriseEnvelope({ ratingCount = 1, movieTitle = '', onClose }) {
  // 'closed' → 'opening' → 'open'
  // En 'open' el sobre desaparece y la tarjeta ocupa su lugar
  const [phase, setPhase] = useState('closed');
  const idea = getRandomIdea(ratingCount);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 600);
    const t2 = setTimeout(() => setPhase('open'), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const milestoneMsg =
    ratingCount === 1 ? '¡Primera película juntos! 🎉' :
    ratingCount === 5 ? '¡5 películas en pareja! 🌟' :
    ratingCount === 10 ? '¡10 citas en el cine! 🏆' :
    ratingCount === 20 ? '¡20 películas! ¡Son cinéfilos de élite! 🎬' :
    `Película #${ratingCount} en pareja`;

  return (
    <div className="envelope-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`envelope-modal ${phase}`}>

        {/* Encabezado siempre visible */}
        <div className="env-header">
          <span className="env-badge">✨ Sobre Sorpresa</span>
          <p className="env-milestone">{milestoneMsg}</p>
          {movieTitle && <p className="env-movie">🎬 {movieTitle}</p>}
        </div>

        {/* Zona de contenido: sobre O tarjeta, nunca los dos superpuestos */}
        <div className="env-content-zone">

          {/* Sobre — visible en 'closed' y 'opening', se desvanece en 'open' */}
          <div className={`envelope-body ${phase === 'open' ? 'hidden' : ''}`}>
            <div className="envelope-flap"></div>
            <div className="envelope-pocket">
              <div className="envelope-heart">💌</div>
            </div>
          </div>

          {/* Tarjeta de idea — oculta hasta 'open', aparece en su lugar */}
          <div className={`idea-card ${phase === 'open' ? 'visible' : ''}`}>
            <div className="idea-emoji">{idea.emoji}</div>
            <p className="idea-text">{idea.idea}</p>
            <p className="idea-tip">💡 {idea.tip}</p>
          </div>

        </div>

        {/* Botón — solo cuando la tarjeta está visible */}
        {phase === 'open' && (
          <button className="env-close-btn" onClick={onClose}>
            ¡Anotado! 💌
          </button>
        )}
      </div>

      <style jsx="true">{`
        .envelope-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(16px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeInOverlay 0.3s ease;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .envelope-modal {
          background: linear-gradient(145deg, rgba(18, 16, 40, 0.97) 0%, rgba(26, 24, 55, 0.97) 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 28px;
          padding: 28px 24px 24px;
          width: 100%;
          max-width: 340px;
          text-align: center;
          box-shadow:
            0 0 60px rgba(139, 92, 246, 0.25),
            0 0 120px rgba(139, 92, 246, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes modalPop {
          from { transform: scale(0.7) translateY(40px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }

        /* Encabezado */
        .env-header {
          margin-bottom: 20px;
        }

        .env-badge {
          display: inline-block;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          color: #fff;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 10px;
        }

        .env-milestone {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .env-movie {
          font-family: var(--font-display);
          font-size: 11px;
          color: var(--text-muted);
          margin: 0;
        }

        /* ── Zona de contenido: altura fija para que no salte el layout ── */
        .env-content-zone {
          position: relative;
          width: 200px;
          height: 160px;
          margin: 0 auto 20px;
        }

        /* ── Sobre ── */
        .envelope-body {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          transition: opacity 0.4s ease, transform 0.4s ease;
          opacity: 1;
          transform: scale(1);
        }

        /* Shake en fase 'closed' */
        .envelope-modal.closed .envelope-body {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }

        /* El sobre se encoge y desaparece cuando llega 'open' */
        .envelope-body.hidden {
          opacity: 0;
          transform: scale(0.7);
          pointer-events: none;
        }

        @keyframes shake {
          10%, 90% { transform: translateX(-2px) rotate(-1deg); }
          20%, 80% { transform: translateX(4px) rotate(1deg); }
          30%, 50%, 70% { transform: translateX(-4px) rotate(-1deg); }
          40%, 60% { transform: translateX(4px) rotate(1deg); }
        }

        .envelope-pocket {
          flex: 1;
          background: linear-gradient(160deg, #1e1a4a 0%, #2d2465 100%);
          border-radius: 0 0 16px 16px;
          border: 2px solid rgba(139, 92, 246, 0.5);
          border-top: none;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .envelope-heart {
          font-size: 32px;
          animation: pulse 1s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .envelope-flap {
          width: 100%;
          height: 50px;
          background: linear-gradient(160deg, #2d2465 0%, #1e1a4a 100%);
          border-radius: 50% 50% 0 0 / 30px 30px 0 0;
          border: 2px solid rgba(139, 92, 246, 0.5);
          border-bottom: none;
          transform-origin: bottom center;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
        }

        /* Flap se abre en 'opening' y 'open' */
        .envelope-modal.opening .envelope-flap,
        .envelope-modal.open .envelope-flap {
          transform: rotateX(180deg);
        }

        /* ── Tarjeta de idea ── */
        /* Ocupa el mismo espacio que el sobre, empieza invisible */
        .idea-card {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 18px;
          padding: 16px;
          opacity: 0;
          transform: scale(0.8) translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.2);
        }

        /* Aparece en el mismo lugar cuando está 'visible' */
        .idea-card.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: auto;
          box-shadow:
            0 8px 32px rgba(139, 92, 246, 0.35),
            0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .idea-emoji {
          font-size: 30px;
          margin-bottom: 10px;
        }

        .idea-text {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 8px;
          line-height: 1.45;
        }

        .idea-tip {
          font-family: var(--font-sans);
          font-size: 10px;
          color: var(--text-muted);
          margin: 0;
          font-style: italic;
          line-height: 1.4;
        }

        /* ── Botón de cierre ── */
        .env-close-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-violet) 100%);
          border: none;
          border-radius: 16px;
          color: #fff;
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
          transition: all 0.2s ease;
          animation: fadeInUp 0.4s ease;
        }

        .env-close-btn:active {
          transform: scale(0.97);
          box-shadow: 0 2px 10px rgba(139, 92, 246, 0.3);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
