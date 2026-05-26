import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export default function AppointmentsTab({ activeProfile, movies = [], prefilledData = null, onClearPrefilledData }) {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Campos del Formulario
  const [title, setTitle] = useState('');
  const [selectedMovieKey, setSelectedMovieKey] = useState('');
  const [customMovieTitle, setCustomMovieTitle] = useState('');
  const [date, setDate] = useState('');
  const [cinemaName, setCinemaName] = useState('');
  const [menuOption, setMenuOption] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ESTADOS DEL CALENDARIO MENSUAL ---
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null); // YYYY-MM-DD
  const [expandedAptIds, setExpandedAptIds] = useState([]);

  const toggleExpandApt = (id) => {
    if (expandedAptIds.includes(id)) {
      setExpandedAptIds(expandedAptIds.filter(aptId => aptId !== id));
    } else {
      setExpandedAptIds([...expandedAptIds, id]);
    }
  };

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error cargando citas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Pre-completar formulario si se pasa información de un sobre
  useEffect(() => {
    if (prefilledData) {
      setTitle(prefilledData.title || '');
      if (prefilledData.movieKey) {
        setSelectedMovieKey(prefilledData.movieKey);
      } else {
        setSelectedMovieKey('custom');
        setCustomMovieTitle(prefilledData.movieTitle || '');
      }
      setNotes(prefilledData.notes || '');
      setShowForm(true);
      
      // Limpiar en el padre para no re-escribir
      if (onClearPrefilledData) {
        onClearPrefilledData();
      }
    }
  }, [prefilledData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) {
      alert("Por favor completa los campos obligatorios: Plan y Fecha.");
      return;
    }

    setIsSubmitting(true);

    // Resolver el título de la película
    let movieTitle = '';
    if (selectedMovieKey === 'custom') {
      movieTitle = customMovieTitle;
    } else if (selectedMovieKey) {
      const matched = movies.find(m => m.key === selectedMovieKey);
      movieTitle = matched ? matched.title : '';
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: activeProfile.id,
          title,
          movieTitle,
          movieKey: selectedMovieKey !== 'custom' ? selectedMovieKey : '',
          date,
          cinemaName: null,
          menuOption,
          notes
        })
      });

      if (response.ok) {
        // Enviar notificación a la pareja
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
              type: 'appointment_created',
              title: '📅 Nueva Cita Agendada',
              message: `ha agendado una cita: "${title}" para el ${new Date(date + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })} (Fecha Tentativa) 🍿`
            })
          });
        } catch (notifError) {
          console.error("Error enviando notificación de cita:", notifError);
        }

        // Limpiar formulario y cerrar
        setTitle('');
        setSelectedMovieKey('');
        setCustomMovieTitle('');
        setDate('');
        setCinemaName('');
        setMenuOption('');
        setNotes('');
        setShowForm(false);
        
        // Recargar citas
        await fetchAppointments();
      } else {
        alert("Error al agendar la cita.");
      }
    } catch (error) {
      console.error("Error guardando cita:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas cancelar esta cita de cine programada?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await fetchAppointments();
      }
    } catch (error) {
      console.error("Error eliminando cita:", error);
    }
  };

  // Separar citas en Futuras y Pasadas
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const upcomingApts = appointments.filter(a => new Date(a.date + 'T12:00:00') >= now);
  const pastApts = appointments.filter(a => new Date(a.date + 'T12:00:00') < now).reverse();

  // Filtrar citas según el día seleccionado en el calendario
  const displayUpcomingApts = selectedCalendarDay
    ? upcomingApts.filter(a => a.date === selectedCalendarDay)
    : upcomingApts;

  const displayPastApts = selectedCalendarDay
    ? pastApts.filter(a => a.date === selectedCalendarDay)
    : pastApts;

  // --- LOGICA E INTERFAZ DEL CALENDARIO MENSUAL ---
  const handlePrevMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderCalendarDays = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const dayCells = [];
    
    // Celdas vacías para el inicio del mes
    for (let i = 0; i < firstDay; i++) {
      dayCells.push(<div key={`empty-${i}`} className="calendar-day-cell empty"></div>);
    }
    
    // Celdas de días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Buscar citas en este día
      const dayApts = appointments.filter(a => a.date === dateStr);
      const hasApt = dayApts.length > 0;
      
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      const isSelected = selectedCalendarDay === dateStr;
      
      dayCells.push(
        <div 
          key={`day-${day}`} 
          className={`calendar-day-cell ${hasApt ? 'has-appointment' : ''} ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}`}
          onClick={() => setSelectedCalendarDay(isSelected ? null : dateStr)}
        >
          <span className="day-number">{day}</span>
          {hasApt && (
            <div className="apt-indicators">
              {dayApts.map((apt, idx) => (
                <span key={idx} className="apt-dot" title={apt.title}></span>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return dayCells;
  };

  const monthsNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="appointments-tab animate-fade-in">
      <div className="tab-header-card glass-card">
        <h3 className="tab-header-title">📅 Agenda de Citas Vip</h3>
        <p className="tab-header-desc">
          Planifiquen sus próximas citas al cine, elijan qué comer, dónde verse, y mantengan viva la chispa cinéfila.
        </p>
      </div>

      {/* Botón para abrir el formulario */}
      {!showForm && (
        <button className="btn-add-apt animate-scale-in" onClick={() => setShowForm(true)}>
          <span>➕ Programar Cita de Pareja</span>
        </button>
      )}

      {/* FORMULARIO PARA REGISTRAR CITA */}
      {showForm && (
        <form onSubmit={handleSubmit} className="appointment-form glass-card animate-scale-in">
          <div className="form-header">
            <h4>✨ Nueva Cita Cinéfila</h4>
            <button type="button" className="btn-close-form" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>

          <div className="form-group">
            <label>Nombre del Plan *</label>
            <input 
              type="text" 
              placeholder="Ej: Noche de Terror Extremo 🍿, Cita Especial Aniversario" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Película</label>
            <select value={selectedMovieKey} onChange={(e) => setSelectedMovieKey(e.target.value)}>
              <option value="">-- Selecciona una película (opcional) --</option>
              {movies.map(m => (
                <option key={m.key} value={m.key}>{m.title}</option>
              ))}
              <option value="custom">-- Escribir película personalizada --</option>
            </select>
          </div>

          {selectedMovieKey === 'custom' && (
            <div className="form-group animate-slide-up">
              <label>Título de la Película Personalizada</label>
              <input 
                type="text" 
                placeholder="Ej: Star Wars, El Padrino..." 
                value={customMovieTitle} 
                onChange={(e) => setCustomMovieTitle(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Fecha Tentativa *</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              onClick={(e) => e.target.showPicker && e.target.showPicker()}
              required
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div className="form-group">
            <label>Sugerencia para comer / Snacks</label>
            <input 
              type="text" 
              placeholder="Ej: Cabritas mixtas grandes + bebidas o sushi antes 🍣" 
              value={menuOption} 
              onChange={(e) => setMenuOption(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Notas especiales o Sorpresas</label>
            <textarea 
              placeholder="Escribe detalles adicionales de la cita aquí..." 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
            />
          </div>

          <button type="submit" className="btn-submit-apt" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando plan...' : '✨ Confirmar Cita en Pareja'}
          </button>
        </form>
      )}

      {/* LISTADO DE CITAS */}
      {isLoading ? (
        <div className="apts-loading">
          <span className="spinner-icon">📅</span>
          <p>Cargando agenda de citas...</p>
        </div>
      ) : (
        <div className="appointments-list-zone">
          
          {/* CALENDARIO MENSUAL INTERACTIVO */}
          <div className="calendar-container glass-card animate-scale-in">
            <div className="calendar-header">
              <button type="button" className="calendar-nav-btn" onClick={handlePrevMonth}>◀</button>
              <span className="calendar-month-title">
                {monthsNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
              </span>
              <button type="button" className="calendar-nav-btn" onClick={handleNextMonth}>▶</button>
            </div>
            
            <div className="calendar-grid-header">
              <div>Do</div>
              <div>Lu</div>
              <div>Ma</div>
              <div>Mi</div>
              <div>Ju</div>
              <div>Vi</div>
              <div>Sá</div>
            </div>
            
            <div className="calendar-grid-body">
              {renderCalendarDays()}
            </div>
          </div>

          {/* FILTRO ACTIVO */}
          {selectedCalendarDay && (
            <div className="calendar-filter-badge glass-card animate-scale-in">
              <span className="filter-text">
                📅 Citas para el <strong>
                  {new Date(selectedCalendarDay + 'T12:00:00').toLocaleDateString('es-CL', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </strong>
              </span>
              <button type="button" className="btn-clear-filter" onClick={() => setSelectedCalendarDay(null)}>
                Ver todas ✕
              </button>
            </div>
          )}

          {/* Próximas citas */}
          <div className="apts-section">
            <h4 className="section-title">✨ Próximas Citas ({displayUpcomingApts.length})</h4>
            {displayUpcomingApts.length > 0 ? (
              <div className="tickets-container">
                {displayUpcomingApts.map(apt => {
                  const isExpanded = expandedAptIds.includes(apt.id);
                  return (
                    <div key={apt.id} className="ticket-vip glass-card animate-scale-in">
                      <div className="ticket-notch left"></div>
                      <div className="ticket-notch right"></div>
                      
                      {/* Contenido principal del ticket */}
                      <div className="ticket-main">
                        <div className="ticket-header">
                          <span className="ticket-tag">TICKET VIP CITA</span>
                          <button 
                            type="button" 
                            className="btn-toggle-expand" 
                            onClick={() => toggleExpandApt(apt.id)} 
                            title={isExpanded ? "Contraer info" : "Ampliar info"}
                          >
                            {isExpanded ? '▲ Contraer' : '▼ Ampliar'}
                          </button>
                        </div>

                        <h3 className="ticket-title">{apt.title}</h3>
                        
                        {apt.movieTitle && (
                          <p className="ticket-movie">🎬 Película: <span>{apt.movieTitle}</span></p>
                        )}

                        {isExpanded && (
                          <div className="ticket-expanded-content animate-slide-down">
                            <div className="ticket-details-grid">
                              <div className="ticket-detail">
                                <span className="label">📅 Fecha tentativa</span>
                                <span className="value">
                                  {new Date(apt.date + 'T12:00:00').toLocaleDateString('es-CL', {
                                    weekday: 'short',
                                    day: 'numeric',
                                    month: 'short'
                                  })}
                                </span>
                              </div>

                              {apt.menuOption && (
                                <div className="ticket-detail full-width">
                                  <span className="label">🍿 Sugerencia para comer</span>
                                  <span className="value">{apt.menuOption}</span>
                                </div>
                              )}

                              {apt.notes && (
                                <div className="ticket-detail full-width notes">
                                  <span className="label">💡 Notas</span>
                                  <span className="value italic">"{apt.notes}"</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Código de barras simulado en CSS para alta fidelidad de boleto */}
                            <div className="ticket-barcode-sim"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-apts glass-card animate-scale-in">
                <span className="empty-icon">🍿</span>
                <h4>Sin citas en esta vista</h4>
                <p>
                  No hay planes programados. ¡Agreguen uno nuevo presionando el botón superior!
                </p>
              </div>
            )}
          </div>

          {/* Historial de citas pasadas */}
          {displayPastApts.length > 0 && (
            <div className="apts-section past">
              <h4 className="section-title">📂 Citas Vividas ({displayPastApts.length})</h4>
              <div className="past-list">
                {displayPastApts.map(apt => (
                  <div key={apt.id} className="past-item-card glass-card animate-scale-in">
                    <div className="past-item-left">
                      <span className="past-emoji">🎬</span>
                      <div>
                        <h5 className="past-title">{apt.title}</h5>
                        {apt.movieTitle && <p className="past-movie">{apt.movieTitle}</p>}
                      </div>
                    </div>
                    <div className="past-item-right">
                      <span className="past-date">
                        {new Date(apt.date + 'T12:00:00').toLocaleDateString('es-CL', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx="true">{`
        .appointments-tab {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .tab-header-card {
          border-color: rgba(34, 211, 238, 0.2);
          background: rgba(34, 211, 238, 0.02);
          padding: 16px;
          border-radius: 20px;
        }

        .tab-header-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .tab-header-desc {
          font-family: var(--font-sans);
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .btn-add-apt {
          background: linear-gradient(135deg, var(--accent-rose) 0%, var(--accent-cyan) 100%);
          border: none;
          color: #fff;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 13px;
          padding: 13px;
          border-radius: 16px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 42, 95, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .btn-add-apt:active {
          transform: scale(0.96);
          box-shadow: 0 2px 8px rgba(255, 42, 95, 0.2);
        }

        /* Formulario */
        .appointment-form {
          border-color: var(--border-glow);
          background: rgba(13, 17, 28, 0.65);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border-radius: 22px;
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 10px;
          margin-bottom: 6px;
        }

        .form-header h4 {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .btn-close-form {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.2s;
        }

        .btn-close-form:hover {
          color: #ef4444;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .form-group label {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 800;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          background: rgba(4, 5, 9, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 11px;
          color: #fff;
          font-size: 13px;
          font-family: var(--font-sans);
          outline: none;
          transition: all 0.3s;
        }

        .form-group input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1) sepia(100%) saturate(500%) hue-rotate(150deg);
          opacity: 0.8;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .form-group input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--accent-cyan);
          background: rgba(8, 10, 16, 0.85);
          box-shadow: 0 0 12px rgba(34, 211, 238, 0.2);
        }

        .btn-submit-apt {
          background: linear-gradient(135deg, var(--accent-rose) 0%, var(--accent-cyan) 100%);
          color: #fff;
          border: none;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 13px;
          padding: 13px;
          border-radius: 14px;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 15px rgba(255, 42, 95, 0.2);
        }

        .btn-submit-apt:active {
          transform: scale(0.97);
        }

        /* Lista de Citas */
        .apts-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px;
          color: var(--text-secondary);
        }

        .spinner-icon {
          font-size: 34px;
          animation: float 2s ease-in-out infinite;
          margin-bottom: 10px;
        }

        .appointments-list-zone {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .apts-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          color: var(--text-secondary);
          letter-spacing: 0.6px;
          border-left: 3px solid var(--accent-rose);
          padding-left: 8px;
          margin: 0;
        }

        /* Ticket de Cine VIP */
        .tickets-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ticket-vip {
          border: 1px dashed rgba(255, 42, 95, 0.25);
          background: rgba(13, 17, 28, 0.55);
          padding: 13px 14px;
          position: relative;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .ticket-vip::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 42, 95, 0.03) 0%, rgba(34, 211, 238, 0.03) 100%);
          pointer-events: none;
        }

        /* Muescas troqueladas de ticket */
        .ticket-notch {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 18px;
          background: var(--bg-deep);
          border: 1px dashed rgba(255, 42, 95, 0.2);
          z-index: 10;
          border-radius: 8px;
        }

        .ticket-notch.left {
          left: -6px;
          border-left: none;
          border-radius: 0 8px 8px 0;
        }

        .ticket-notch.right {
          right: -6px;
          border-right: none;
          border-radius: 8px 0 0 8px;
        }

        .ticket-main {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ticket-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ticket-tag {
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 800;
          color: var(--accent-rose);
          letter-spacing: 0.6px;
          border: 1px solid rgba(255, 42, 95, 0.2);
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255, 42, 95, 0.03);
        }

        .btn-toggle-expand {
          background: rgba(34, 211, 238, 0.05);
          border: 1px solid rgba(34, 211, 238, 0.2);
          color: var(--accent-cyan);
          padding: 3px 8px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 8px;
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
          z-index: 5;
        }

        .btn-toggle-expand:hover {
          background: rgba(34, 211, 238, 0.15);
          border-color: var(--accent-cyan);
          color: #fff;
          box-shadow: 0 0 8px rgba(34, 211, 238, 0.4);
        }

        .btn-toggle-expand:active {
          transform: scale(0.95);
        }

        .ticket-title {
          font-family: var(--font-display);
          font-size: 14.5px;
          font-weight: 800;
          color: #fff;
          margin: 2px 0 0;
          line-height: 1.25;
        }

        .ticket-movie {
          font-size: 10.5px;
          color: var(--text-secondary);
          margin: 0;
          font-family: var(--font-sans);
        }

        .ticket-movie span {
          color: #fff;
          font-weight: 700;
        }

        .ticket-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 8px;
          border-top: 1.5px dashed rgba(255, 42, 95, 0.15);
          padding-top: 8px;
        }

        .ticket-detail {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ticket-detail.full-width {
          grid-column: span 2;
        }

        .ticket-detail.notes {
          background: rgba(0, 0, 0, 0.25);
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.02);
          margin-top: 2px;
        }

        .ticket-detail .label {
          font-family: var(--font-display);
          font-size: 7.5px;
          font-weight: 800;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ticket-detail .value {
          font-size: 11px;
          color: var(--text-primary);
          font-weight: 700;
        }

        .ticket-detail .value.italic {
          font-style: italic;
          font-weight: normal;
          color: var(--text-secondary);
        }

        /* simulated barcode in ticket */
        .ticket-barcode-sim {
          height: 12px;
          background: repeating-linear-gradient(90deg, 
            rgba(255, 255, 255, 0.12), 
            rgba(255, 255, 255, 0.12) 1.5px, 
            transparent 1.5px, 
            transparent 4px, 
            rgba(255, 255, 255, 0.12) 4px, 
            rgba(255, 255, 255, 0.12) 5px, 
            transparent 5px, 
            transparent 7px,
            rgba(255, 255, 255, 0.12) 7px,
            rgba(255, 255, 255, 0.12) 9px,
            transparent 9px,
            transparent 11px
          );
          opacity: 0.4;
          margin-top: 8px;
          border-radius: 2px;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
        }

        .empty-apts {
          text-align: center;
          padding: 30px 15px;
          border-color: var(--border-glow);
          background: rgba(13, 17, 28, 0.25);
          border-radius: 16px;
        }

        .empty-icon {
          font-size: 28px;
          display: inline-block;
          margin-bottom: 8px;
          filter: drop-shadow(0 0 6px rgba(255, 42, 95, 0.2));
        }

        .empty-apts h4 {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .empty-apts p {
          font-size: 10.5px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0;
        }

        /* Pasadas */
        .apts-section.past {
          margin-top: 8px;
        }

        .past-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .past-item-card {
          background: rgba(13, 17, 28, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.02);
          padding: 10px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          opacity: 0.55;
          border-radius: 12px;
        }

        .past-item-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .past-emoji {
          font-size: 16px;
        }

        .past-title {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .past-movie {
          font-size: 9.5px;
          color: var(--text-muted);
          margin: 0;
        }

        .past-date {
          font-size: 9.5px;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* ESTILOS DEL CALENDARIO PREMIUM */
        .calendar-container {
          background: rgba(13, 17, 28, 0.65);
          border: 1px solid rgba(34, 211, 238, 0.25);
          border-radius: 20px;
          padding: 14px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 6px;
        }

        .calendar-month-title {
          font-family: var(--font-display);
          font-size: 13.5px;
          font-weight: 800;
          color: var(--text-primary);
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
        }

        .calendar-nav-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          cursor: pointer;
          font-size: 9px;
          transition: all 0.2s;
        }

        .calendar-nav-btn:hover {
          background: rgba(34, 211, 238, 0.1);
          border-color: var(--accent-cyan);
        }

        .calendar-grid-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-family: var(--font-display);
          font-size: 8.5px;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .calendar-grid-body {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .calendar-day-cell {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .calendar-day-cell:hover:not(.empty) {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .calendar-day-cell.empty {
          background: transparent;
          border: none;
          cursor: default;
        }

        .calendar-day-cell.is-today {
          border-color: var(--accent-rose);
          background: rgba(255, 42, 95, 0.06);
        }

        .calendar-day-cell.is-today .day-number {
          color: var(--accent-rose);
          font-weight: bold;
        }

        .calendar-day-cell.has-appointment {
          background: linear-gradient(145deg, rgba(34, 211, 238, 0.1) 0%, rgba(13, 17, 28, 0.3) 100%);
          border-color: rgba(34, 211, 238, 0.4);
          box-shadow: 0 0 6px rgba(34, 211, 238, 0.1);
        }

        .calendar-day-cell.has-appointment .day-number {
          color: var(--accent-cyan);
          font-weight: 800;
        }

        .calendar-day-cell.is-selected {
          border-color: var(--accent-cyan) !important;
          background: rgba(34, 211, 238, 0.18) !important;
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.3) !important;
        }

        .day-number {
          font-size: 10px;
          font-family: var(--font-sans);
          color: var(--text-secondary);
        }

        .apt-indicators {
          display: flex;
          gap: 1.5px;
          position: absolute;
          bottom: 2px;
        }

        .apt-dot {
          width: 3px;
          height: 3px;
          background: var(--accent-rose);
          border-radius: 50%;
          box-shadow: 0 0 3px var(--accent-rose);
        }

        /* FILTRO ACTIVO */
        .calendar-filter-badge {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          border-radius: 12px;
          border-color: rgba(34, 211, 238, 0.2);
          background: rgba(34, 211, 238, 0.03);
        }

        .calendar-filter-badge .filter-text {
          font-size: 10.5px;
          color: var(--text-secondary);
        }

        .calendar-filter-badge .filter-text strong {
          color: var(--accent-cyan);
        }

        .btn-clear-filter {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          font-size: 9px;
          padding: 3px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-clear-filter:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.2);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
