import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

export default function SeatMap({ showtime, activeProfile, onClose, onRefreshUser }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isBooked, setIsBooked] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 8;

  // Simular asientos ya ocupados al azar usando una semilla para consistencia
  const isSeatOcupied = (row, num) => {
    // Determinista según el ID de showtime y la butaca
    const hash = (showtime.id || '123').charCodeAt(0) + row.charCodeAt(0) + num;
    return hash % 3 === 0; // Aproximadamente 33% ocupados
  };

  const handleSeatClick = (row, num) => {
    const seatId = `${row}${num}`;
    if (isSeatOcupied(row, num)) return; // Ocupado

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= 6) {
        alert("Máximo 6 entradas VIP por reserva.");
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleConfirmReservation = async () => {
    if (selectedSeats.length === 0) {
      alert("Por favor selecciona al menos una butaca.");
      return;
    }

    setIsBooking(true);
    // Simular retraso de red
    setTimeout(async () => {
      try {
        // Otorgar 150 puntos fijos por reservar
        const response = await fetch(`${API_BASE_URL}/api/users/add-points`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: activeProfile.id,
            amount: 150
          })
        });

        if (response.ok) {
          const updatedUser = await response.json();
          // Guardar en localStorage
          localStorage.setItem('cineglow_user', JSON.stringify(updatedUser));
          // Notificar a la app principal para refrescar el header
          if (onRefreshUser) {
            onRefreshUser(updatedUser);
          }
          setIsBooked(true);
        } else {
          alert("Error al acreditar puntos");
        }
      } catch (err) {
        console.error("Error al procesar reserva:", err);
      } finally {
        setIsBooking(false);
      }
    }, 1200);
  };

  return (
    <div className="seat-map-backdrop animate-fade-in">
      <div className="seat-map-modal glass-card">
        
        {/* Header */}
        <div className="seat-map-header">
          <div className="header-info">
            <h3>Reserva de Butacas VIP</h3>
            <span className="showtime-details">
              {showtime.cinemaName} • {showtime.date} • {showtime.time} ({showtime.format})
            </span>
          </div>
          <button className="close-map-btn" onClick={onClose}>×</button>
        </div>

        {!isBooked ? (
          <>
            {/* Screen Arc */}
            <div className="cinema-screen-area">
              <div className="screen-glow-line" />
              <span className="screen-text">PANTALLA VIP</span>
            </div>

            {/* Grid de Asientos */}
            <div className="seats-container">
              {rows.map(row => (
                <div key={row} className="seat-row">
                  <span className="row-letter">{row}</span>
                  <div className="row-seats">
                    {Array.from({ length: seatsPerRow }).map((_, idx) => {
                      const num = idx + 1;
                      const seatId = `${row}${num}`;
                      const ocupied = isSeatOcupied(row, num);
                      const selected = selectedSeats.includes(seatId);

                      let seatClass = 'seat-available';
                      if (ocupied) seatClass = 'seat-ocupied';
                      else if (selected) seatClass = 'seat-selected animate-pulse-fast';

                      return (
                        <button
                          key={num}
                          className={`seat-btn ${seatClass}`}
                          disabled={ocupied || isBooking}
                          onClick={() => handleSeatClick(row, num)}
                          title={`Butaca ${seatId}`}
                        >
                          <span className="seat-icon">🛋️</span>
                          <span className="seat-num-tag">{num}</span>
                        </button>
                      );
                    })}
                  </div>
                  <span className="row-letter">{row}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="seats-legend">
              <div className="legend-item">
                <span className="legend-box available">🛋️</span>
                <span>Disponible</span>
              </div>
              <div className="legend-item">
                <span className="legend-box ocupied">🛋️</span>
                <span>Ocupado</span>
              </div>
              <div className="legend-item">
                <span className="legend-box selected">🛋️</span>
                <span>Seleccionado</span>
              </div>
            </div>

            {/* Footer Summary & Book Button */}
            <div className="booking-summary-row glass-card">
              <div className="summary-text-wrap">
                <span className="seats-count-label">
                  {selectedSeats.length === 0 
                    ? 'Selecciona tus butacas' 
                    : `${selectedSeats.length} ${selectedSeats.length === 1 ? 'Butaca seleccionada' : 'Butacas seleccionadas'}`
                  }
                </span>
                <h4 className="seats-list-preview">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Ninguna'}
                </h4>
              </div>

              <div className="rewards-pill-preview">
                <span className="points-label">+150 GlowPoints</span>
                <span className="gift-emoji">🎁</span>
              </div>

              <button
                className={`btn-glow btn-glow-purple book-now-btn ${selectedSeats.length === 0 ? 'disabled' : ''}`}
                onClick={handleConfirmReservation}
                disabled={selectedSeats.length === 0 || isBooking}
              >
                {isBooking ? (
                  <div className="loading-spinner-small" />
                ) : (
                  <>
                    Confirmar Reserva
                    <span className="arrow-icon">→</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          /* SUCCESS SCREEN */
          <div className="success-booking-pane animate-scale-in">
            <div className="success-glowing-circle animate-pulse-fast">
              <span className="check-emoji">🎟️</span>
            </div>
            
            <h2>¡Reserva Confirmada!</h2>
            <p className="success-subtext">
              Tu reserva simulada en <strong>{showtime.cinemaName}</strong> se ha completado.
            </p>

            <div className="success-ticket-card glass-card">
              <div className="ticket-detail-row">
                <span>Película:</span>
                <strong>{showtime.movieTitle || 'Cartelera'}</strong>
              </div>
              <div className="ticket-detail-row">
                <span>Butacas:</span>
                <strong className="neon-cyan-text">{selectedSeats.join(', ')}</strong>
              </div>
              <div className="ticket-detail-row">
                <span>Horario:</span>
                <strong>{showtime.date} • {showtime.time} ({showtime.format})</strong>
              </div>
            </div>

            <div className="reward-congrats-card animate-pulse-fast">
              <div className="congrats-glowing-header">
                <span className="sparkles-emoji">✨</span>
                <h4>¡Has ganado GlowPoints!</h4>
              </div>
              <p>Sumaste +150 puntos a tu cuenta de Cinéfilo.</p>
              <div className="big-points-glow">+150 GP</div>
            </div>

            <button 
              className="btn-glow btn-glow-cyan close-success-btn"
              onClick={onClose}
            >
              Regresar a la Cartelera
            </button>
          </div>
        )}

        <style jsx="true">{`
          .seat-map-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(3, 4, 6, 0.94);
            backdrop-filter: blur(14px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
          }

          .seat-map-modal {
            width: 100%;
            max-width: 440px;
            height: 90vh;
            display: flex;
            flex-direction: column;
            border: 1.5px solid rgba(255, 42, 95, 0.2);
            background: rgba(13, 17, 28, 0.95);
            padding: 22px;
            overflow: hidden;
            border-radius: 32px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 42, 95, 0.08);
          }

          .seat-map-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 22px;
            flex-shrink: 0;
          }

          .seat-map-header h3 {
            font-family: var(--font-display);
            font-size: 19px;
            font-weight: 800;
            color: var(--text-primary);
            margin-bottom: 3px;
          }

          .showtime-details {
            font-family: var(--font-sans);
            font-size: 11px;
            color: var(--accent-cyan);
            font-weight: 700;
          }

          .close-map-btn {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: var(--text-secondary);
            font-size: 20px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.25s;
          }

          .close-map-btn:hover {
            color: var(--accent-rose);
            border-color: rgba(255, 42, 95, 0.3);
            background: rgba(255, 42, 95, 0.08);
          }

          /* Screen area */
          .cinema-screen-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 26px;
            flex-shrink: 0;
            position: relative;
          }

          .screen-glow-line {
            width: 85%;
            height: 5px;
            background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4);
            margin-bottom: 10px;
          }

          .screen-text {
            font-family: var(--font-display);
            font-size: 10px;
            font-weight: 800;
            color: var(--text-muted);
            letter-spacing: 5px;
            text-shadow: 0 0 8px rgba(34, 211, 238, 0.3);
          }

          /* Seats grid */
          .seats-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 14px;
            overflow-y: auto;
            padding: 10px 0;
          }

          .seat-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
          }

          .row-letter {
            font-family: var(--font-display);
            font-size: 12px;
            font-weight: 800;
            color: var(--text-muted);
            width: 16px;
            text-align: center;
          }

          .row-seats {
            display: flex;
            gap: 9px;
            justify-content: center;
            flex: 1;
          }

          .seat-btn {
            position: relative;
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            outline: none;
          }

          .seat-icon {
            font-size: 21px;
            line-height: 1;
            filter: grayscale(1) brightness(0.3);
            transition: all 0.25s ease;
          }

          .seat-num-tag {
            position: absolute;
            top: 4px;
            font-size: 8px;
            font-weight: 800;
            color: rgba(255, 255, 255, 0.45);
            pointer-events: none;
            font-family: var(--font-sans);
          }

          /* States */
          .seat-available .seat-icon {
            /* VIP Gold Neon available styling */
            filter: grayscale(0) sepia(1) saturate(6) hue-rotate(5deg) brightness(1.1) drop-shadow(0 0 2px rgba(251, 191, 36, 0.45));
          }

          .seat-ocupied {
            cursor: not-allowed;
          }
          
          .seat-ocupied .seat-icon {
            filter: grayscale(1) brightness(0.12);
            opacity: 0.25;
          }
          
          .seat-ocupied .seat-num-tag {
            opacity: 0.15;
          }

          .seat-selected {
            transform: scale(1.22);
          }
          
          .seat-selected .seat-icon {
            filter: grayscale(0) hue-rotate(140deg) brightness(1.3) drop-shadow(0 0 10px var(--accent-cyan));
          }
          
          .seat-selected .seat-num-tag {
            color: #040815;
            font-weight: 900;
          }

          .seat-btn:active:not(:disabled) {
            transform: scale(0.85);
          }

          /* Legend */
          .seats-legend {
            display: flex;
            justify-content: center;
            gap: 18px;
            margin: 18px 0;
            flex-shrink: 0;
          }

          .legend-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            color: var(--text-secondary);
            font-weight: 600;
          }

          .legend-box {
            font-size: 16px;
          }
          
          .legend-box.available {
            filter: grayscale(0) sepia(1) saturate(6) hue-rotate(5deg) brightness(1.1);
          }
          .legend-box.ocupied {
            filter: grayscale(1) brightness(0.12);
            opacity: 0.35;
          }
          .legend-box.selected {
            filter: grayscale(0) hue-rotate(140deg) brightness(1.3);
          }

          /* Summary row */
          .booking-summary-row {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 14px 18px;
            background: rgba(8, 10, 16, 0.7);
            border: 1px solid var(--border-glow);
            border-radius: 20px;
            flex-shrink: 0;
            margin-top: 10px;
            position: relative;
            overflow: hidden;
          }

          /* Perforaciones de ticket simuladas en los lados de la summary row */
          .booking-summary-row::before,
          .booking-summary-row::after {
            content: '';
            position: absolute;
            width: 8px;
            height: 16px;
            background-color: #0d111c;
            border: 1px solid var(--border-glow);
            top: calc(50% - 8px);
          }

          .booking-summary-row::before {
            left: -4px;
            border-radius: 0 8px 8px 0;
            border-left: none;
          }

          .booking-summary-row::after {
            right: -4px;
            border-radius: 8px 0 0 8px;
            border-right: none;
          }

          .summary-text-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .seats-count-label {
            font-size: 10px;
            color: var(--text-secondary);
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            font-family: var(--font-display);
          }

          .seats-list-preview {
            font-family: var(--font-display);
            font-size: 15px;
            font-weight: 800;
            color: var(--accent-cyan);
            text-shadow: 0 0 8px rgba(34, 211, 238, 0.25);
          }

          .rewards-pill-preview {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            background: rgba(251, 191, 36, 0.08);
            border: 1px solid rgba(251, 191, 36, 0.2);
            border-radius: 10px;
            padding: 7px;
            font-size: 12px;
            font-weight: 700;
            color: var(--accent-gold);
            font-family: var(--font-display);
          }

          .book-now-btn {
            width: 100%;
            padding: 13px;
            font-size: 13px;
            border-radius: 14px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .book-now-btn.disabled {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            color: var(--text-muted);
            cursor: not-allowed;
            pointer-events: none;
            box-shadow: none;
          }

          /* Success Screen */
          .success-booking-pane {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 0 10px;
          }

          .success-glowing-circle {
            width: 76px;
            height: 76px;
            border-radius: 50%;
            background: rgba(34, 211, 238, 0.08);
            border: 2px solid var(--accent-cyan);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 25px rgba(34, 211, 238, 0.3);
            margin-bottom: 22px;
          }

          .check-emoji {
            font-size: 38px;
            filter: drop-shadow(0 0 6px var(--accent-cyan));
          }

          .success-booking-pane h2 {
            font-family: var(--font-display);
            font-size: 22px;
            font-weight: 800;
            color: var(--text-primary);
            margin-bottom: 8px;
          }

          .success-subtext {
            font-size: 12px;
            color: var(--text-secondary);
            margin-bottom: 24px;
            max-width: 290px;
            line-height: 1.45;
          }

          .success-ticket-card {
            width: 100%;
            background: rgba(4, 5, 9, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 18px;
            border-radius: 18px;
            display: flex;
            flex-direction: column;
            gap: 11px;
            margin-bottom: 22px;
            text-align: left;
            position: relative;
            overflow: hidden;
          }

          .success-ticket-card::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            border-top: 1.5px dashed rgba(255, 255, 255, 0.1);
            bottom: 42px;
            left: 0;
          }

          .ticket-detail-row {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
          }

          .ticket-detail-row span {
            color: var(--text-secondary);
            font-weight: 600;
          }

          .ticket-detail-row strong {
            color: var(--text-primary);
          }

          .reward-congrats-card {
            width: 100%;
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(245, 158, 11, 0.03) 100%);
            border: 1px solid rgba(251, 191, 36, 0.2);
            border-radius: 18px;
            padding: 18px;
            margin-bottom: 26px;
          }

          .congrats-glowing-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            color: var(--accent-gold);
            font-family: var(--font-display);
            font-size: 14px;
            font-weight: 800;
            margin-bottom: 4px;
          }

          .reward-congrats-card p {
            font-size: 11px;
            color: var(--text-secondary);
            margin-bottom: 12px;
          }

          .big-points-glow {
            font-family: var(--font-display);
            font-size: 30px;
            font-weight: 800;
            color: var(--accent-gold);
            text-shadow: 0 0 15px rgba(251, 191, 36, 0.45);
            letter-spacing: 1px;
          }

          .close-success-btn {
            width: 100%;
            padding: 13px;
            font-size: 13px;
            border-radius: 14px;
          }

          .loading-spinner-small {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
