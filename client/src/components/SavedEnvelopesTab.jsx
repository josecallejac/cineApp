import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export default function SavedEnvelopesTab({ activeProfile, onScheduleWithIdea }) {
  const [envelopes, setEnvelopes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);
  const [openPhase, setOpenPhase] = useState('closed'); // 'closed' | 'opening' | 'open'
  const [activeSubTab, setActiveSubTab] = useState('active'); // 'active' | 'used'

  const fetchEnvelopes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/envelopes?userId=${activeProfile.id}`);
      if (response.ok) {
        const data = await response.json();
        setEnvelopes(data);
      }
    } catch (error) {
      console.error("Error cargando sobres:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnvelopes();
  }, [activeProfile.id]);

  const handleOpenEnvelope = (env) => {
    setSelectedEnvelope(env);
    setOpenPhase('closed');
    
    // Iniciar secuencia de animación
    setTimeout(() => setOpenPhase('opening'), 400);
    setTimeout(() => setOpenPhase('open'), 1200);
  };

  const handleCloseEnvelope = () => {
    setSelectedEnvelope(null);
    setOpenPhase('closed');
  };

  const sendPartnerNotification = async (type, title, message) => {
    try {
      const partnerId = activeProfile.id === 'user_palomero' ? 'user_cinefilo' : 'user_palomero';
      await fetch(`${API_BASE_URL}/api/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: partnerId,
          senderId: activeProfile.id,
          senderName: activeProfile.name,
          senderAvatar: activeProfile.avatar,
          type,
          title,
          message
        })
      });
    } catch (error) {
      console.error("Error enviando notificación a la pareja:", error);
    }
  };

  const handleMarkAsUsed = async (envId, silent = false) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/envelopes/${envId}/use`, {
        method: 'PUT'
      });
      if (response.ok) {
        if (!silent) {
          const env = envelopes.find(e => e.id === envId);
          if (env) {
            await sendPartnerNotification(
              'envelope_used',
              '✉️ Sobre Sorpresa Abierto',
              `ha consumido el sobre sorpresa: "${env.text}" 🎬`
            );
          }
        }

        // Refrescar lista de sobres
        await fetchEnvelopes();
        handleCloseEnvelope();
      }
    } catch (error) {
      console.error("Error al usar sobre:", error);
    }
  };

  const handleSchedule = async (env) => {
    // 1. Enviar notificación a la pareja primero
    await sendPartnerNotification(
      'envelope_scheduled',
      '📅 Cita Agendada con Idea',
      `ha agendado una cita usando la idea: "${env.text}" 🍿`
    );

    // 2. Notificar al padre con los datos del sobre
    if (onScheduleWithIdea) {
      onScheduleWithIdea({
        title: `Cita: ${env.text}`,
        movieTitle: env.movieTitle || '',
        movieKey: env.movieKey || '',
        notes: `Inspirado en la idea sorpresa: "${env.text}". ¡Consejo: ${env.tip}!`,
        envelopeId: env.id
      });
    }
    
    // 3. Marcar como usado en el backend de forma silenciosa
    await handleMarkAsUsed(env.id, true);
  };

  // Filtrar sobres activos (no usados) y consumidos (usados)
  const activeEnvelopes = envelopes.filter(e => !e.isUsed);
  const usedEnvelopes = envelopes.filter(e => e.isUsed);

  return (
    <div className="saved-envelopes-tab animate-fade-in">
      <div className="tab-header-card glass-card">
        <h3 className="tab-header-title">✉️ Mis Sobres Guardados</h3>
        <p className="tab-header-desc">
          Colecciona los sobres sorpresa que ganas al calificar tus películas. ¡Ábrelos y conviértelos en citas memorables!
        </p>
      </div>

      {/* Sub-filtro para sobres activos vs usados */}
      <div className="envelope-subtabs">
        <button 
          className={`subtab-btn ${activeSubTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('active')}
        >
          Activos ({activeEnvelopes.length})
        </button>
        <button 
          className={`subtab-btn ${activeSubTab === 'used' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('used')}
        >
          Historial Usados ({usedEnvelopes.length})
        </button>
      </div>

      {isLoading ? (
        <div className="envelope-loading">
          <span className="spinner-icon">✉️</span>
          <p>Cargando tu colección de sobres...</p>
        </div>
      ) : activeSubTab === 'active' ? (
        activeEnvelopes.length > 0 ? (
          <div className="envelopes-grid">
            {activeEnvelopes.map((env) => (
              <div 
                key={env.id} 
                className="envelope-card glass-card animate-scale-in"
                onClick={() => handleOpenEnvelope(env)}
              >
                <div className="env-card-glow"></div>
                <div className="env-card-icon">✉️</div>
                <div className="env-card-body">
                  <span className="env-card-badge">Cita Sorpresa</span>
                  <p className="env-card-movie">De: {env.movieTitle || 'CineGlow'}</p>
                  <span className="env-card-date">
                    Ganado: {new Date(env.receivedAt).toLocaleDateString('es-CL', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
                <div className="env-card-action">
                  <span>Abrir sobre</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-envelopes glass-card animate-scale-in">
            <span className="empty-icon">✉️</span>
            <h4>No tienes sobres activos</h4>
            <p>
              Ganas un sobre sorpresa cada vez que valoras una película nueva. ¡Ve a la cartelera y califica tu última cita!
            </p>
          </div>
        )
      ) : (
        usedEnvelopes.length > 0 ? (
          <div className="envelopes-grid used">
            {usedEnvelopes.map((env) => (
              <div key={env.id} className="envelope-card glass-card used animate-scale-in">
                <div className="env-card-icon">✉️</div>
                <div className="env-card-body">
                  <span className="env-card-badge used">Consumido ✓</span>
                  <p className="env-card-text">"{env.text}"</p>
                  <p className="env-card-movie">Película: {env.movieTitle}</p>
                  <span className="env-card-date">
                    Usado el {new Date(env.usedAt).toLocaleDateString('es-CL', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-envelopes glass-card animate-scale-in">
            <span className="empty-icon">📂</span>
            <h4>Historial vacío</h4>
            <p>
              Aquí aparecerán las ideas de sobres sorpresa que ya hayas agendado o marcado como consumidas.
            </p>
          </div>
        )
      )}

      {/* MODAL DE APERTURA ANIMADA DEL SOBRE */}
      {selectedEnvelope && (
        <div className="env-open-overlay" onClick={(e) => e.target === e.currentTarget && handleCloseEnvelope()}>
          <div className={`env-open-modal ${openPhase}`}>
            <button className="modal-close-x" onClick={handleCloseEnvelope}>✕</button>

            {/* Cabecera del modal */}
            <div className="modal-env-header">
              <span className="modal-env-tag">✨ Invitación Exclusiva</span>
              <p className="modal-env-movie">Inspirado en: {selectedEnvelope.movieTitle}</p>
            </div>

            {/* Zona interactiva del sobre */}
            <div className="modal-env-content-zone">
              {/* Sobre en 3D / Animado */}
              <div className={`envelope-body-anim ${openPhase === 'open' ? 'hidden' : ''}`}>
                <div className="envelope-flap-anim"></div>
                <div className="envelope-pocket-anim">
                  <div className="envelope-heart-anim">💌</div>
                </div>
              </div>

              {/* Tarjeta de la idea */}
              <div className={`idea-card-anim ${openPhase === 'open' ? 'visible' : ''}`}>
                <div className="idea-emoji-anim">{selectedEnvelope.emoji || '🍿'}</div>
                <p className="idea-text-anim">{selectedEnvelope.text}</p>
                {selectedEnvelope.tip && (
                  <p className="idea-tip-anim">💡 {selectedEnvelope.tip}</p>
                )}
              </div>
            </div>

            {/* Botones de acción (solo en fase 'open') */}
            {openPhase === 'open' && (
              <div className="modal-env-actions animate-scale-in">
                <button className="btn-action-schedule" onClick={() => handleSchedule(selectedEnvelope)}>
                  📅 Agendar Cita con esta idea
                </button>
                <button className="btn-action-use" onClick={() => handleMarkAsUsed(selectedEnvelope.id)}>
                  ✨ Marcar como Usado (Sin Agendar)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx="true">{`
        .saved-envelopes-tab {
          display: flex;
          flex-direction: column;
          gap: 16px;
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

        /* Sub-pestañas */
        .envelope-subtabs {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 3px;
        }

        .subtab-btn {
          flex: 1;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          padding: 8px;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .subtab-btn.active {
          color: #fff;
          background: rgba(139, 92, 246, 0.25);
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: 0 2px 10px rgba(139, 92, 246, 0.15);
        }

        /* Grid de sobres */
        .envelopes-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 480px) {
          .envelopes-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .envelope-card {
          border-color: rgba(255, 255, 255, 0.04);
          background: rgba(18, 22, 38, 0.4);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .envelope-card:active {
          transform: scale(0.98);
        }

        .envelope-card:hover {
          border-color: rgba(139, 92, 246, 0.35);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
        }

        .env-card-glow {
          position: absolute;
          top: -20%;
          left: -20%;
          width: 50%;
          height: 50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
          pointer-events: none;
          transition: transform 0.5s ease;
        }

        .envelope-card:hover .env-card-glow {
          transform: translate(60px, 40px);
        }

        .env-card-icon {
          font-size: 28px;
          filter: drop-shadow(0 2px 5px rgba(139, 92, 246, 0.3));
        }

        .env-card-body {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .env-card-badge {
          display: inline-block;
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 800;
          color: var(--accent-purple);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .env-card-badge.used {
          color: #10b981;
        }

        .env-card-movie {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.25;
        }

        .env-card-text {
          font-size: 11px;
          font-style: italic;
          color: var(--text-primary);
          margin: 2px 0;
        }

        .env-card-date {
          font-size: 8px;
          color: var(--text-muted);
        }

        .env-card-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-cyan);
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 8px;
          margin-top: auto;
        }

        /* Usados card styling */
        .envelope-card.used {
          background: rgba(18, 22, 38, 0.2);
          border-color: rgba(255, 255, 255, 0.02);
          cursor: default;
          opacity: 0.7;
        }

        .envelope-card.used:hover {
          box-shadow: none;
          transform: none;
        }

        /* Vacíos / Carga */
        .envelope-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: var(--text-secondary);
        }

        .spinner-icon {
          font-size: 32px;
          animation: float 2s ease-in-out infinite;
          margin-bottom: 12px;
        }

        .empty-envelopes {
          text-align: center;
          padding: 36px 20px;
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(18, 22, 38, 0.25);
        }

        .empty-icon {
          font-size: 40px;
          display: inline-block;
          margin-bottom: 12px;
        }

        .empty-envelopes h4 {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .empty-envelopes p {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.5;
          max-width: 250px;
          margin: 0 auto;
        }

        /* ── MODAL ANIMADO DE APERTURA ── */
        .env-open-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(16px);
          z-index: 2100;
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

        .env-open-modal {
          background: linear-gradient(145deg, rgba(18, 16, 40, 0.98) 0%, rgba(26, 24, 55, 0.98) 100%);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 28px;
          padding: 32px 24px 24px;
          width: 100%;
          max-width: 340px;
          text-align: center;
          box-shadow:
            0 0 60px rgba(139, 92, 246, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          position: relative;
          animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .modal-close-x {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-secondary);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 11px;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .modal-close-x:active {
          transform: scale(0.9);
          background: rgba(255, 255, 255, 0.15);
        }

        @keyframes modalPop {
          from { transform: scale(0.7) translateY(40px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }

        .modal-env-header {
          margin-bottom: 20px;
        }

        .modal-env-tag {
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
          margin-bottom: 6px;
        }

        .modal-env-movie {
          font-family: var(--font-display);
          font-size: 11px;
          color: var(--text-muted);
          margin: 0;
        }

        /* Zona interactiva del sobre animado */
        .modal-env-content-zone {
          position: relative;
          width: 200px;
          height: 160px;
          margin: 0 auto 24px;
        }

        /* Sobre */
        .envelope-body-anim {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          transition: opacity 0.4s ease, transform 0.4s ease;
          opacity: 1;
          transform: scale(1);
        }

        .env-open-modal.closed .envelope-body-anim {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }

        .envelope-body-anim.hidden {
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

        .envelope-pocket-anim {
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

        .envelope-heart-anim {
          font-size: 32px;
          animation: pulse 1s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .envelope-flap-anim {
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

        .env-open-modal.opening .envelope-flap-anim,
        .env-open-modal.open .envelope-flap-anim {
          transform: rotateX(180deg);
        }

        /* Tarjeta de Idea */
        .idea-card-anim {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 16px;
          opacity: 0;
          transform: scale(0.6) translateY(50px);
          transition: opacity 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .idea-card-anim.visible {
          opacity: 1;
          transform: scale(1.15) translateY(0);
          z-index: 10;
        }

        .idea-emoji-anim {
          font-size: 36px;
          margin-bottom: 8px;
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));
          animation: float 2.5s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .idea-text-anim {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          line-height: 1.4;
          margin: 0 0 8px;
        }

        .idea-tip-anim {
          font-size: 10px;
          color: #a78bfa;
          background: rgba(167, 139, 250, 0.08);
          border: 1px solid rgba(167, 139, 250, 0.15);
          border-radius: 8px;
          padding: 4px 8px;
          margin: 0;
        }

        /* Acciones del Modal */
        .modal-env-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 14px;
        }

        .btn-action-schedule {
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          color: #fff;
          border: none;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 12px;
          padding: 12px;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
          transition: all 0.2s ease;
        }

        .btn-action-schedule:active {
          transform: scale(0.97);
          box-shadow: 0 2px 6px rgba(139, 92, 246, 0.2);
        }

        .btn-action-use {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 11px;
          padding: 10px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-action-use:active {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
