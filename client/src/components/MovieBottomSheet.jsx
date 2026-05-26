import React, { useState, useEffect } from 'react';
import RatingStars from './RatingStars';
import SurpriseEnvelope, { DATE_IDEAS } from './SurpriseEnvelope';
import { API_BASE_URL } from '../config';

// Helper para extraer el ID de un video de YouTube
const getYoutubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function MovieBottomSheet({ movie, onClose, activeProfile, onAddRating, ratingsList, onRefreshBillboard }) {
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'reviews'
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [movieReviews, setMovieReviews] = useState([]);
  const [movieSummary, setMovieSummary] = useState({ average: 0, count: 0, starsDistribution: {} });

  // Estados para horarios interactivos (Idea A)
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // 0 = Hoy, 1 = Mañana, etc.

  // Estados para registro de visita (Idea 6)
  const today = new Date().toISOString().split('T')[0];
  const [watchedAt, setWatchedAt] = useState(today);
  const [visitCinema, setVisitCinema] = useState('');
  const [menuOption, setMenuOption] = useState('');
  const [moodOption, setMoodOption] = useState('');

  // Nuevos estados para recuerdos e invitaciones
  const [photos, setPhotos] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [showDateCardModal, setShowDateCardModal] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('¿Me acompañas? 💌');
  const [cardPreviewUrl, setCardPreviewUrl] = useState('');
  const [sheetLightbox, setSheetLightbox] = useState(null); // { photos: Array, index: Number }
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [envelopeRatingCount, setEnvelopeRatingCount] = useState(1);

  const canvasRef = React.useRef(null);

  const CINEMAS_ORIENTE = [
    'Cinépolis La Reina',
    'Cinépolis Parque Arauco',
    'Cinépolis Mallplaza Egaña',
    'Cinépolis Mallplaza Los Dominicos',
    'Cinépolis Paseo Los Dominicos',
    'Cinépolis Portal La Dehesa',
    'Cinépolis Paseo Los Trapenses',
    'Cinépolis Casa Costanera',
    'Otro'
  ];

  // Generar los próximos 7 días a partir de hoy para dar una visual semanal
  const getNext7Days = () => {
    const days = [];
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const monthsShort = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    
    // Obtener la fecha base actual
    const baseDate = new Date();
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      
      const dayOfWeek = daysOfWeek[d.getDay()];
      const dayNum = d.getDate();
      const monthName = months[d.getMonth()];
      const monthShort = monthsShort[d.getMonth()];
      
      // Mapeo de formatos para coincidir con la base de datos de Cinépolis
      const format1 = `${dayNum} ${monthName.substring(0, 3)}`; // "25 may"
      const format2 = `${dayNum} ${monthName}`; // "25 mayo"
      const format3 = `${String(dayNum).padStart(2, '0')} ${monthName}`; // "25 mayo"
      const format4 = `${String(dayNum).padStart(2, '0')} ${monthName.substring(0, 3)}`; // "25 may"
      const format5 = `${dayNum} ${monthShort}`; // "25 may"
      
      days.push({
        index: i,
        dayName: dayOfWeek,
        dayNum: dayNum,
        monthName: monthShort,
        formats: [format1, format2, format3, format4, format5].map(s => s.toLowerCase().trim()),
        dateStr: `${dayNum} ${monthShort}`
      });
    }
    return days;
  };

  // Inicializar cines y fechas por defecto al cambiar de película
  useEffect(() => {
    if (movie && movie.showtimes && movie.showtimes.length > 0) {
      setSelectedCinema(movie.showtimes[0].cinemaName);
      if (movie.showtimes[0].dates && movie.showtimes[0].dates.length > 0) {
        setSelectedDate(movie.showtimes[0].dates[0].showtimeDate);
      }
      setSelectedDayIndex(0); // Reiniciar al primer día (Hoy)
      setSelectedTime('');
      setSelectedFormat('');
    } else {
      setSelectedCinema('');
      setSelectedDate('');
      setSelectedDayIndex(0);
      setSelectedTime('');
      setSelectedFormat('');
    }
  }, [movie]);

  const { title, originalTitle, rating, ratingDescription, runTime, poster, director, gender, actors, distributor, trailer } = movie;

  // Cargar reseñas locales para esta película
  useEffect(() => {
    if (ratingsList) {
      const filtered = ratingsList.filter(r => r.movieKey === movie.key);
      setMovieReviews(filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      
      // Calcular promedio
      if (filtered.length > 0) {
        const sum = filtered.reduce((acc, curr) => acc + curr.score, 0);
        setMovieSummary({
          average: parseFloat((sum / filtered.length).toFixed(1)),
          count: filtered.length
        });
      } else {
        setMovieSummary({ average: 0, count: 0 });
      }
    }
  }, [ratingsList, movie.key]);

  // Verificar si la cuenta de usuario actual ya calificó esta película
  const myExistingRating = movieReviews.find(r => r.userId === activeProfile.id);

  // Cargar valores si ya calificó
  useEffect(() => {
    if (myExistingRating) {
      setScore(myExistingRating.score);
      setComment(myExistingRating.comment);
      setWatchedAt(myExistingRating.watchedAt || today);
      setVisitCinema(myExistingRating.cinemaName || '');
      setMenuOption(myExistingRating.menuOption || '');
      setMoodOption(myExistingRating.moodOption || '');
      setPhotos(myExistingRating.photos || []);
    } else {
      setScore(0);
      setComment('');
      setWatchedAt(today);
      setVisitCinema('');
      setMenuOption('');
      setMoodOption('');
      setPhotos([]);
    }
  }, [myExistingRating, movie.key]);

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    if (score === 0) {
      alert("Por favor selecciona una puntuación de estrellas.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: activeProfile.id,
          movieKey: movie.key,
          movieTitle: movie.title,
          score,
          comment,
          watchedAt: watchedAt || null,
          cinemaName: visitCinema || null,
          menuOption: menuOption || null,
          moodOption: moodOption || null,
          photos: photos
        })
      });

      if (response.ok) {
        // Contar cuántas películas ha calificado este usuario en total
        const allRatingsRes = await fetch(`${API_BASE_URL}/api/ratings`);
        let userRatingCount = 1;
        if (allRatingsRes.ok) {
          const allRatings = await allRatingsRes.json();
          userRatingCount = allRatings.filter(r => r.userId === activeProfile.id).length;
          setEnvelopeRatingCount(userRatingCount);
        }
        // Mostrar sobre sorpresa solo si es una nueva valoración (no edición)
        if (!myExistingRating) {
          try {
            const ideaIdx = (userRatingCount - 1) % DATE_IDEAS.length;
            const idea = DATE_IDEAS[ideaIdx] || DATE_IDEAS[0];
            const envelopeResponse = await fetch(`${API_BASE_URL}/api/envelopes`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userId: activeProfile.id,
                ideaIndex: ideaIdx,
                emoji: idea.emoji,
                text: idea.idea,
                tip: idea.tip,
                movieTitle: movie.title,
                movieKey: movie.key
              })
            });
            if (!envelopeResponse.ok) {
              const errBody = await envelopeResponse.json().catch(() => ({}));
              throw new Error(errBody.error || `Error HTTP ${envelopeResponse.status}`);
            }
          } catch (envelopeErr) {
            console.error("Error al persistir sobre en la DB:", envelopeErr);
          }
          setShowEnvelope(true);
        } else {
          onRefreshBillboard();
        }
      } else {
        alert("Error al enviar calificación");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- FUNCIÓN DE DIBUJO PARA LA TARJETA DE CITA (CANVAS) ---
  const drawTextsAndDetails = (ctx, canvas) => {
    // 4. Movie Title
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = 'bold 28px Bricolage Grotesque, Outfit, sans-serif';
    
    // Multi-line title wrap if too long
    const titleText = title.toUpperCase();
    const words = titleText.split(' ');
    let line = '';
    let lines = [];
    const maxWidth = 480;
    
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    
    let currentY = 515;
    lines.forEach(l => {
      ctx.fillText(l.trim(), canvas.width/2, currentY);
      currentY += 34;
    });
    
    currentY += 15;
    
    // Draw ticket perforation dashed line and physical cutouts
    ctx.strokeStyle = 'rgba(255, 42, 95, 0.25)';
    ctx.setLineDash([5, 8]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, currentY);
    ctx.lineTo(570, currentY);
    ctx.stroke();
    ctx.setLineDash([]); // Reset
    
    // Cutout circles on the sides
    ctx.fillStyle = '#040509'; // Matches the outside background
    ctx.beginPath();
    ctx.arc(0, currentY, 14, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(600, currentY, 14, 0, Math.PI*2);
    ctx.fill();

    // Draw thin ticket border outlines
    ctx.strokeStyle = 'rgba(255, 42, 95, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
    
    currentY += 28;
    
    // 6. Draw Details Card (Cinema, Date, Time)
    const cinemaClean = selectedCinema.replace("Cinépolis ", "").replace(" Premium Class", "").replace(" Premium", "");
    const dateFormatted = getNext7Days()[selectedDayIndex].dateStr.toUpperCase();
    
    // Cinema
    ctx.fillStyle = '#fbbf24'; // Golden Accent
    ctx.font = 'bold 15px Bricolage Grotesque, Outfit, sans-serif';
    ctx.fillText(`🍿  CLUB PREMIUM  •  ${cinemaClean.toUpperCase()}`, canvas.width/2, currentY);
    currentY += 26;
    
    // Date & Time
    ctx.fillStyle = '#22d3ee'; // cyan-400
    ctx.font = 'bold 18px Bricolage Grotesque, Outfit, sans-serif';
    ctx.fillText(`📅  ${dateFormatted}  •  🕒  ${selectedTime} HRS`, canvas.width/2, currentY);
    
    currentY += 36;
    
    // 7. Draw Custom Invitation Message bubble
    const cardMsg = inviteMessage || 'Te invito al cine 💌';
    ctx.fillStyle = 'rgba(255, 42, 95, 0.05)';
    ctx.strokeStyle = 'rgba(255, 42, 95, 0.2)';
    
    // Draw rounded container for message
    const mx = 80;
    const my = currentY;
    const mw = 440;
    const mh = 66;
    const mr = 14;
    ctx.beginPath();
    ctx.moveTo(mx + mr, my);
    ctx.lineTo(mx + mw - mr, my);
    ctx.quadraticCurveTo(mx + mw, my, mx + mw, my + mr);
    ctx.lineTo(mx + mw, my + mh - mr);
    ctx.quadraticCurveTo(mx + mw, my + mh, mx + mw - mr, my + mh);
    ctx.lineTo(mx + mr, my + mh);
    ctx.quadraticCurveTo(mx, my + mh, mx, my + mh - mr);
    ctx.lineTo(mx, my + mr);
    ctx.quadraticCurveTo(mx, my, mx + mr, my);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#ff527b'; // Neon rose soft
    ctx.font = 'italic bold 16px Plus Jakarta Sans, Inter, sans-serif';
    ctx.fillText(`"${cardMsg}"`, canvas.width/2, currentY + mh/2 - 9);
    
    currentY += mh + 22;
    
    // Simulated Barcode at the bottom for high ticket fidelity
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '7px Courier New, monospace';
    ctx.fillText('C I N E G L O W - P A S S - 2 0 2 6', canvas.width/2, currentY + 16);
    
    // Draw vertical barcode bars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    let barX = 180;
    const barWidths = [2, 4, 1, 6, 2, 5, 1, 2, 4, 2, 1, 6, 3, 2, 5, 1, 2, 4, 1, 6, 2, 5, 1, 2, 4, 2, 1, 6, 3, 2, 5, 1, 2];
    barWidths.forEach(w => {
      ctx.fillRect(barX, currentY - 10, w, 20);
      barX += w + 2;
    });

    // Export base64 image URL to preview
    setCardPreviewUrl(canvas.toDataURL('image/png'));
  };

  const drawDateCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw beautiful gradient background
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#040509'); // Midnight
    grad.addColorStop(0.5, '#0b0c16'); // Dark Navy
    grad.addColorStop(1, '#020305'); // Absolute black
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 2. Draw soft glowing background circles for high design look (cyber rose glow)
    const glowGrad = ctx.createRadialGradient(canvas.width/2, 280, 50, canvas.width/2, 280, 260);
    glowGrad.addColorStop(0, 'rgba(255, 42, 95, 0.22)'); // rose neon glow
    glowGrad.addColorStop(1, 'rgba(255, 42, 95, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(canvas.width/2, 280, 260, 0, Math.PI * 2);
    ctx.fill();

    const glowGradCyan = ctx.createRadialGradient(canvas.width/2, 680, 30, canvas.width/2, 680, 200);
    glowGradCyan.addColorStop(0, 'rgba(34, 211, 238, 0.16)'); // cyan neon glow
    glowGradCyan.addColorStop(1, 'rgba(34, 211, 238, 0)');
    ctx.fillStyle = glowGradCyan;
    ctx.beginPath();
    ctx.arc(canvas.width/2, 680, 200, 0, Math.PI * 2);
    ctx.fill();
    
    // 3. Draw movie poster
    const posterImg = new Image();
    posterImg.crossOrigin = "anonymous";
    posterImg.onload = () => {
      ctx.save();
      const px = 150;
      const py = 70;
      const pw = 300;
      const ph = 410;
      const r = 18;
      ctx.beginPath();
      ctx.moveTo(px + r, py);
      ctx.lineTo(px + pw - r, py);
      ctx.quadraticCurveTo(px + pw, py, px + pw, py + r);
      ctx.lineTo(px + pw, py + ph - r);
      ctx.quadraticCurveTo(px + pw, py + ph, px + pw - r, py + ph);
      ctx.lineTo(px + r, py + ph);
      ctx.quadraticCurveTo(px, py + ph, px, py + ph - r);
      ctx.lineTo(px, py + r);
      ctx.quadraticCurveTo(px, py, px + r, py);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(posterImg, px, py, pw, ph);
      ctx.restore();
      
      // Neon shadow borders
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 42, 95, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      drawTextsAndDetails(ctx, canvas);
    };
    posterImg.onerror = () => {
      // Stylized vector placeholder for offline/CORS
      const px = 150;
      const py = 70;
      const pw = 300;
      const ph = 410;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(px, py, pw, ph);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeRect(px, py, pw, ph);
      
      ctx.font = '72px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎬', canvas.width/2, py + ph/2 - 20);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.font = 'bold 15px Bricolage Grotesque, Outfit, sans-serif';
      ctx.fillText('CineGlow Premium Ticket', canvas.width/2, py + ph/2 + 50);
      
      drawTextsAndDetails(ctx, canvas);
    };
    // Fetch through CORS bypass proxy if URL is remote
    posterImg.src = poster.startsWith('http') ? `${API_BASE_URL}/api/proxy-image?url=${encodeURIComponent(poster)}` : poster;
  };

  useEffect(() => {
    if (showDateCardModal && selectedTime) {
      drawDateCard();
    }
  }, [showDateCardModal, inviteMessage, selectedTime, selectedCinema, selectedDayIndex]);

  return (
    <div className="bottom-sheet-backdrop">
      {/* Sobre Sorpresa — aparece tras calificar una nueva película */}
      {showEnvelope && (
        <SurpriseEnvelope
          ratingCount={envelopeRatingCount}
          movieTitle={movie.title}
          onClose={() => {
            setShowEnvelope(false);
            onRefreshBillboard();
          }}
        />
      )}
      <div className="bottom-sheet-overlay" onClick={onClose} />
      <div className="bottom-sheet-wrapper animate-slide-up">
        {/* Drag Handle */}
        <div className="drag-handle" onClick={onClose} />

        {/* Short Header Info */}
        <div className="sheet-quick-header">
          <img src={poster} alt={title} className="sheet-poster" />
          <div className="sheet-header-details">
            <h2 className="sheet-title">{title}</h2>
            {originalTitle && originalTitle !== title && (
              <span className="sheet-original-title">{originalTitle}</span>
            )}
            <div className="sheet-badges">
              <span className="sheet-badge-tag class">{rating}</span>
              <span className="sheet-badge-tag time">{runTime}</span>
              <span className="sheet-badge-tag genre">{gender || 'Cine'}</span>
            </div>
            {movieSummary.count > 0 ? (
              <div className="sheet-rating-summary">
                <span className="star-gold">★</span>
                <span className="summary-score">{movieSummary.average}</span>
                <span className="summary-count">({movieSummary.count} {movieSummary.count === 1 ? 'voto' : 'votos'})</span>
              </div>
            ) : (
              <div className="sheet-rating-summary unrated">
                <span>Sin valoraciones</span>
              </div>
            )}
          </div>
        </div>

        {/* Tab Selector */}
        <div className="sheet-tabs">
          <button 
            className={`sheet-tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Ficha Técnica
          </button>
          <button 
            className={`sheet-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Opiniones ({movieReviews.length})
          </button>
        </div>

        {/* Sheet Content Scrollable Area */}
        <div className="bottom-sheet-content">
          {/* TAB 1: FICHA TECNICA */}
          {activeTab === 'info' && (
            <div className="tab-pane info-pane animate-scale-in">
              {/* Sinopsis */}
              <div className="info-section">
                <h4 className="info-title">Sinopsis</h4>
                <p className="info-text">{ratingDescription || 'No hay descripción disponible para esta película.'}</p>
              </div>

              {/* Ficha Técnica Detallada */}
              <div className="info-section">
                <h4 className="info-title">Detalles de la Película</h4>
                <div className="meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Director</span>
                    <span className="meta-val">{director || 'No disponible'}</span>
                  </div>
                  
                  <div className="meta-item">
                    <span className="meta-label">Género</span>
                    <span className="meta-val">{gender || 'Cine'}</span>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Clasificación</span>
                    <span className="meta-val">{rating || 'Todo Espectador (TE)'}</span>
                  </div>

                  <div className="meta-item">
                    <span className="meta-label">Duración</span>
                    <span className="meta-val">{runTime || 'No disponible'}</span>
                  </div>

                  {distributor && (
                    <div className="meta-item">
                      <span className="meta-label">Distribuidora</span>
                      <span className="meta-val">{distributor}</span>
                    </div>
                  )}

                  {originalTitle && originalTitle !== title && (
                    <div className="meta-item">
                      <span className="meta-label">Título Original</span>
                      <span className="meta-val">{originalTitle}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Elenco Principal */}
              {actors && actors.length > 0 && (
                <div className="info-section">
                  <h4 className="info-title">Elenco Principal</h4>
                  <div className="actors-list-wrap">
                    {actors.map((actor, idx) => (
                      <span key={idx} className="actor-tag">{actor}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Horarios en Vivo de Sector Oriente (Idea A) */}
              {movie.showtimes && movie.showtimes.length > 0 ? (
                <div className="info-section showtimes-section">
                  <h4 className="info-title">📍 Funciones en Sector Oriente</h4>
                  
                  {/* Selector de Cine/Complejo */}
                  <div className="cinema-selector-row horizontal-scroll">
                    {movie.showtimes.map(c => (
                      <button
                        key={c.cinemaName}
                        type="button"
                        className={`cinema-selector-btn ${selectedCinema === c.cinemaName ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedCinema(c.cinemaName);
                          if (c.dates && c.dates.length > 0) {
                            setSelectedDate(c.dates[0].showtimeDate);
                          }
                          setSelectedDayIndex(0); // Reiniciar al primer día (Hoy) al cambiar de cine
                        }}
                      >
                        {c.cinemaName.replace("Cinépolis ", "").replace(" Premium Class", "").replace(" Premium", "")}
                      </button>
                    ))}
                  </div>

                  {/* Selector de Fecha (Visual de 7 Días) */}
                  {(() => {
                    const cinema = movie.showtimes.find(c => c.cinemaName === selectedCinema);
                    if (!cinema) return null;

                    const next7Days = getNext7Days();

                    return (
                      <>
                        <div className="date-selector-row horizontal-scroll">
                          {next7Days.map(day => {
                            const matchingDbDate = cinema.dates ? cinema.dates.find(dbDate => {
                              const dbDateLower = dbDate.showtimeDate.toLowerCase().trim();
                              return day.formats.some(f => dbDateLower.includes(f) || f.includes(dbDateLower));
                            }) : null;

                            const isSelected = selectedDayIndex === day.index;

                            return (
                              <button
                                key={day.index}
                                type="button"
                                className={`calendar-date-btn ${isSelected ? 'active' : ''} ${matchingDbDate ? 'has-showtimes' : 'empty-showtimes'}`}
                                onClick={() => setSelectedDayIndex(day.index)}
                              >
                                <span className="calendar-day-name">{day.index === 0 ? 'HOY' : day.dayName.toUpperCase()}</span>
                                <span className="calendar-day-num">{day.dayNum}</span>
                                <span className="calendar-month-name">{day.monthName}</span>
                                {matchingDbDate && <span className="showtimes-dot-indicator" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Lista de Formatos y Horarios */}
                        {(() => {
                          const currentDay = next7Days[selectedDayIndex];
                          const matchingDbDate = cinema.dates ? cinema.dates.find(dbDate => {
                            const dbDateLower = dbDate.showtimeDate.toLowerCase().trim();
                            return currentDay.formats.some(f => dbDateLower.includes(f) || f.includes(dbDateLower));
                          }) : null;

                          if (!matchingDbDate) {
                            return (
                              <div className="no-showtimes-scheduled-card glass-card">
                                <span className="schedule-icon">🕒</span>
                                <h5 className="schedule-title">Funciones no publicadas aún</h5>
                                <p className="schedule-text">
                                  Cinépolis aún no programa funciones oficiales para este día. Las carteleras semanales suelen actualizarse los días miércoles por la tarde.
                                </p>
                              </div>
                            );
                          }

                          if (!matchingDbDate.formats || matchingDbDate.formats.length === 0) return null;

                          return (
                            <div className="formats-container animate-fade-in">
                              <div className="schedule-status-banner">
                                <span className="banner-dot green" />
                                <span className="banner-text">Cartelera Oficial Confirmada</span>
                              </div>
                              {matchingDbDate.formats.map(format => (
                                <div key={format.formatName} className="format-group">
                                  <span className="format-title-tag">{format.formatName}</span>
                                  <div className="times-grid-pills">
                                    {format.times.map(st => (
                                      <button
                                        key={st.id}
                                        type="button"
                                        className={`time-pill-btn animate-scale-in ${selectedTime === st.time && selectedFormat === format.formatName ? 'active' : ''}`}
                                        onClick={() => {
                                          setSelectedTime(st.time);
                                          setSelectedFormat(format.formatName);
                                        }}
                                      >
                                        {st.time}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}

                              {/* Action card for creating Date Card */}
                              {selectedTime && (
                                <div className="invite-action-card glass-card animate-slide-up">
                                  <div className="invite-info">
                                    <span className="invite-label">Cita Seleccionada:</span>
                                    <span className="invite-details">📅 {currentDay.dateStr} • 🕒 {selectedTime} hrs ({selectedFormat})</span>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn-glow btn-glow-purple invite-btn"
                                    onClick={() => setShowDateCardModal(true)}
                                  >
                                    💌 Crear Invitación
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="info-section showtimes-section empty-showtimes">
                  <h4 className="info-title">📍 Funciones en Sector Oriente</h4>
                  <p className="no-showtimes-text">No hay funciones programadas para hoy en este sector.</p>
                </div>
              )}

              {/* Tráiler Oficial Integrado (Idea C) */}
              {trailer && (
                <div className="info-section trailer-section">
                  <h4 className="info-title">Tráiler Oficial</h4>
                  {getYoutubeId(trailer) ? (
                    <div className="trailer-embed-container glass-card">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYoutubeId(trailer)}`}
                        title={`${title} Trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="trailer-iframe"
                      ></iframe>
                    </div>
                  ) : (
                    <a 
                      href={trailer} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-glow btn-glow-youtube"
                    >
                      <span>🎬</span>
                      Ver Tráiler Oficial en YouTube
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: OPINIONES & RATING SELECTOR */}
          {activeTab === 'reviews' && (
            <div className="tab-pane reviews-pane animate-scale-in">
              {/* Formulario de valoración */}
              <div className="review-form-card glass-card">
                <h4 className="form-title">
                  {myExistingRating ? 'Actualiza tu valoración' : 'Califica esta película'}
                </h4>
                <span className="form-subtitle">Evaluando como <strong>{activeProfile.name}</strong></span>

                <form onSubmit={handleSubmitRating} className="stars-form">
                  <div className="stars-selector-wrap">
                    <RatingStars 
                      rating={score} 
                      onChange={setScore} 
                      interactive={true} 
                      size={32} 
                    />
                    {score > 0 && (
                      <span className="score-desc-text">
                        {['Insufrible', 'Mala', 'Regular', '¡Muy buena!', '¡Obra Maestra!'][score - 1]}
                      </span>
                    )}
                  </div>

                  <textarea
                    className="review-textarea"
                    placeholder="Escribe un comentario u opinión sobre la película (opcional)..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={300}
                  />

                  {/* Registro de visita */}
                  {myExistingRating && (myExistingRating.watchedAt || myExistingRating.cinemaName || myExistingRating.menuOption || myExistingRating.moodOption) ? (
                    /* Modo solo lectura: ya tienen visita registrada */
                    <div className="visit-locked-section">
                      <span className="visit-locked-label">🔒 CÁPSULA DEL TIEMPO (Cita Registrada)</span>
                      <div className="visit-locked-pills">
                        {myExistingRating.watchedAt && (
                          <span className="visit-locked-pill">
                            📅 {new Date(myExistingRating.watchedAt + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        )}
                        {myExistingRating.cinemaName && (
                          <span className="visit-locked-pill cinema">
                            🎭 {myExistingRating.cinemaName}
                          </span>
                        )}
                        {myExistingRating.menuOption && (
                          <span className="visit-locked-pill food">
                            🍿 {myExistingRating.menuOption}
                          </span>
                        )}
                        {myExistingRating.moodOption && (
                          <span className="visit-locked-pill mood">
                            {myExistingRating.moodOption === 'Increíble' ? '🥰 Increíble' :
                             myExistingRating.moodOption === 'Risas' ? '😂 Risas y risas' :
                             myExistingRating.moodOption === 'Lloramos' ? '😢 Lloramos' :
                             myExistingRating.moodOption === 'Dormimos' ? '😴 Nos dormimos' : '🍿 Concentrados'}
                          </span>
                        )}
                      </div>

                      {myExistingRating.photos && myExistingRating.photos.length > 0 && (
                        <div className="visit-locked-photos-container" style={{ marginTop: '12px' }}>
                          <span className="visit-locked-label" style={{ fontSize: '10px', display: 'block', marginBottom: '6px' }}>📸 RECUERDOS EN PAREJA</span>
                          <div className="locked-photos-grid">
                            {myExistingRating.photos.map((photo, pIdx) => (
                              <div 
                                key={pIdx} 
                                className="locked-photo-thumb"
                                onClick={() => setSheetLightbox({ photos: myExistingRating.photos, index: pIdx })}
                              >
                                <img src={photo} alt={`Recuerdo ${pIdx + 1}`} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <span className="visit-locked-hint">Los datos de esta cita están guardados para siempre en su memoria de pareja. Solo puedes actualizar la nota y el comentario.</span>
                    </div>
                  ) : (
                    /* Modo edición: nueva calificación */
                    <div className="visit-register-section">
                      <span className="visit-register-label">📍 ¿Cuándo y dónde la vieron? <span className="optional-tag">(opcional)</span></span>
                      <div className="visit-field">
                        <label className="visit-field-label">📅 Fecha de la visita</label>
                        <input
                          type="date"
                          className="visit-input"
                          value={watchedAt}
                          onChange={(e) => setWatchedAt(e.target.value)}
                          max={today}
                        />
                      </div>
                      <div className="visit-field">
                        <label className="visit-field-label">🎭 Cine</label>
                        <div className="cinema-pills-grid">
                          {CINEMAS_ORIENTE.map(c => (
                            <button
                              key={c}
                              type="button"
                              className={`cinema-pill-btn ${visitCinema === c ? 'selected' : ''}`}
                              onClick={() => setVisitCinema(prev => prev === c ? '' : c)}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Cápsula del Tiempo: Menú y Mood */}
                      <div className="visit-field" style={{ marginTop: '6px' }}>
                        <label className="visit-field-label">🍿 ¿Qué comieron en la cita?</label>
                        <div className="cinema-pills-grid">
                          {[
                            { val: 'Cabritas Dulces', lbl: 'Cabritas Dulces 🍿' },
                            { val: 'Cabritas Saladas', lbl: 'Cabritas Saladas 🍿' },
                            { val: 'Cabritas Mixtas', lbl: 'Cabritas Mixtas 🍿' },
                            { val: 'Nachos con Queso', lbl: 'Nachos con Queso 🧀' },
                            { val: 'Hot Dog', lbl: 'Hot Dog 🌭' },
                            { val: 'Solo Bebida', lbl: 'Solo Bebida 🥤' },
                            { val: 'Ninguno', lbl: 'Nada ❌' }
                          ].map(opt => (
                            <button
                              key={opt.val}
                              type="button"
                              className={`cinema-pill-btn ${menuOption === opt.val ? 'selected' : ''}`}
                              onClick={() => setMenuOption(prev => prev === opt.val ? '' : opt.val)}
                            >
                              {opt.lbl}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="visit-field" style={{ marginTop: '6px' }}>
                        <label className="visit-field-label">🥰 ¿Cómo lo pasaron?</label>
                        <div className="cinema-pills-grid">
                          {[
                            { val: 'Increíble', lbl: 'Increíble 🥰' },
                            { val: 'Risas', lbl: 'Nos reímos mucho 😂' },
                            { val: 'Lloramos', lbl: 'Lloramos 😢' },
                            { val: 'Dormimos', lbl: 'Nos dormimos 😴' },
                            { val: 'Concentrados', lbl: 'Súper concentrados 🍿' }
                          ].map(opt => (
                            <button
                              key={opt.val}
                              type="button"
                              className={`cinema-pill-btn ${moodOption === opt.val ? 'selected' : ''}`}
                              onClick={() => setMoodOption(prev => prev === opt.val ? '' : opt.val)}
                            >
                              {opt.lbl}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Subida de Recuerdos (Fotos) */}
                      <div className="visit-field" style={{ marginTop: '12px' }}>
                        <label className="visit-field-label">📸 Recuerdos de la Cita <span className="optional-tag">(Máx. 3 fotos)</span></label>
                        <div className="photos-uploader-container">
                          <label className="photo-upload-btn-label">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="photo-file-input"
                              onChange={(e) => {
                                const files = Array.from(e.target.files);
                                if (photos.length + files.length > 3) {
                                  alert("Solo puedes subir un máximo de 3 fotos para esta cita.");
                                  return;
                                }

                                files.forEach(file => {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const img = new Image();
                                    img.onload = () => {
                                      const maxDim = 800;
                                      let width = img.width;
                                      let height = img.height;

                                      if (width > maxDim || height > maxDim) {
                                        if (width > height) {
                                          height = Math.round((height * maxDim) / width);
                                          width = maxDim;
                                        } else {
                                          width = Math.round((width * maxDim) / height);
                                          height = maxDim;
                                        }
                                      }

                                      const canvas = document.createElement('canvas');
                                      canvas.width = width;
                                      canvas.height = height;
                                      const ctx = canvas.getContext('2d');
                                      ctx.drawImage(img, 0, 0, width, height);
                                      
                                      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.65);
                                      setPhotos(prev => [...prev, compressedBase64].slice(0, 3));
                                    };
                                    img.src = event.target.result;
                                  };
                                  reader.readAsDataURL(file);
                                });
                              }}
                            />
                            <span>📸 Añadir Fotos</span>
                          </label>
                          
                          {photos.length > 0 && (
                            <div className="uploaded-previews-grid" style={{ marginTop: '8px' }}>
                              {photos.map((photo, pIdx) => (
                                <div key={pIdx} className="uploaded-photo-preview">
                                  <img src={photo} alt={`Subida ${pIdx + 1}`} />
                                  <button
                                    type="button"
                                    className="remove-photo-btn"
                                    onClick={() => setPhotos(prev => prev.filter((_, i) => i !== pIdx))}
                                  >
                                    ❌
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className={`btn-glow btn-glow-cyan submit-btn ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Guardando...' : (myExistingRating ? 'Actualizar Rating' : 'Enviar Rating')}
                  </button>
                </form>
              </div>

              {/* Feed de opiniones */}
              <div className="reviews-feed">
                <h4 className="feed-title">Opiniones de la comunidad</h4>
                {movieReviews.length > 0 ? (
                  <div className="feed-list">
                    {movieReviews.map(review => (
                      <div key={review.id} className="feed-item glass-card">
                        <div className="feed-user-row">
                          <img src={review.avatar} alt={review.author} className="feed-avatar" />
                          <div className="feed-user-meta">
                            <span className="feed-username">{review.author}</span>
                            <span className="feed-date">
                              {new Date(review.timestamp).toLocaleDateString('es-CL', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <div className="feed-item-stars">
                            <RatingStars rating={review.score} size={12} />
                          </div>
                        </div>
                        {review.comment && (
                          <p className="feed-comment">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-reviews-state">
                    ¡Sé el primero en calificar esta película! Selecciona tus estrellas arriba.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Canvas for Date Card PNG generation */}
      <canvas ref={canvasRef} width={600} height={900} style={{ display: 'none' }} />

      {/* --- DATE CARD PREVIEW MODAL --- */}
      {showDateCardModal && (
        <div className="sheet-modal-overlay animate-fade-in" onClick={() => setShowDateCardModal(false)}>
          <div className="sheet-modal-content glass-card animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">💌 Tu Tarjeta de Cita</h3>
              <button className="btn-close-modal" onClick={() => setShowDateCardModal(false)}>❌</button>
            </div>
            
            <p className="modal-desc">Personaliza el mensaje y descarga la tarjeta para enviarla por WhatsApp.</p>
            
            {/* Real-time card image preview */}
            <div className="card-preview-container">
              {cardPreviewUrl ? (
                <img src={cardPreviewUrl} alt="Tarjeta de Cita" className="date-card-preview-img" />
              ) : (
                <div className="card-preview-loading">
                  <span>🎨 Generando tu tarjeta...</span>
                </div>
              )}
            </div>

            {/* Custom invitation text input */}
            <div className="input-group" style={{ marginTop: '12px', width: '100%' }}>
              <label className="input-label" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Escribe una frase romántica o personalizada:</label>
              <input
                type="text"
                className="modal-message-input"
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value.substring(0, 36))}
                placeholder="Te invito al cine 💌"
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '13px',
                  marginTop: '4px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Action buttons */}
            <div className="modal-actions" style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '16px' }}>
              <button
                type="button"
                className="btn-glow btn-glow-purple"
                style={{ flex: 1, padding: '10px 0', fontSize: '13px' }}
                onClick={() => {
                  const link = document.createElement('a');
                  link.download = `Cita_${movie.title.replace(/\s+/g, '_')}.png`;
                  link.href = cardPreviewUrl;
                  link.click();
                }}
                disabled={!cardPreviewUrl}
              >
                📥 Descargar PNG
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  padding: '10px 16px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowDateCardModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- RATING PHOTO LIGHTBOX --- */}
      {sheetLightbox && (
        <div className="sheet-lightbox-overlay" onClick={() => setSheetLightbox(null)}>
          <button className="sheet-lightbox-close" onClick={() => setSheetLightbox(null)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          {sheetLightbox.photos.length > 1 && (
            <>
              <button 
                className="sheet-lightbox-nav prev"
                onClick={(e) => {
                  e.stopPropagation();
                  const total = sheetLightbox.photos.length;
                  const next = (sheetLightbox.index - 1 + total) % total;
                  setSheetLightbox({ photos: sheetLightbox.photos, index: next });
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button 
                className="sheet-lightbox-nav next"
                onClick={(e) => {
                  e.stopPropagation();
                  const total = sheetLightbox.photos.length;
                  const next = (sheetLightbox.index + 1) % total;
                  setSheetLightbox({ photos: sheetLightbox.photos, index: next });
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </>
          )}

          <img 
            src={sheetLightbox.photos[sheetLightbox.index]} 
            alt="Recuerdo en detalle" 
            className="sheet-lightbox-photo" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style jsx="true">{`
        .bottom-sheet-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 500;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .bottom-sheet-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .bottom-sheet-wrapper {
          position: relative;
          background: rgba(10, 12, 22, 0.95);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-top: 1.5px solid rgba(255, 42, 95, 0.25);
          border-top-left-radius: 32px;
          border-top-right-radius: 32px;
          max-height: 85%;
          min-height: 50%;
          display: flex;
          flex-direction: column;
          z-index: 510;
          box-shadow: 0 -15px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(255, 42, 95, 0.06);
          overflow: hidden;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .drag-handle {
          width: 48px;
          height: 5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          margin: 12px auto 6px auto;
          cursor: pointer;
          flex-shrink: 0;
        }

        .sheet-quick-header {
          display: flex;
          gap: 16px;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          flex-shrink: 0;
        }

        .sheet-poster {
          width: 80px;
          aspect-ratio: 2 / 3;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: #000;
        }

        .sheet-header-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .sheet-title {
          font-family: var(--font-display);
          font-size: 21px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 2px;
        }

        .sheet-original-title {
          font-size: 11px;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .sheet-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 6px;
        }

        .sheet-badge-tag {
          font-family: var(--font-display);
          font-size: 8px;
          font-weight: 700;
          padding: 2.5px 6px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sheet-badge-tag.class {
          color: var(--accent-cyan);
          border-color: rgba(6, 182, 212, 0.2);
          background: rgba(6, 182, 212, 0.04);
        }

        .sheet-rating-summary {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
        }

        .star-gold {
          color: var(--accent-gold);
          font-size: 16px;
        }

        .summary-score {
          font-weight: 800;
          font-size: 14px;
          color: var(--text-primary);
        }

        .summary-count {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .sheet-rating-summary.unrated {
          font-size: 11px;
          color: var(--text-muted);
        }

        /* Tabs inside sheet */
        .sheet-tabs {
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.01);
          flex-shrink: 0;
        }

        .sheet-tab-btn {
          flex: 1;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 15px;
          padding: 15px 0;
          cursor: pointer;
          position: relative;
          transition: all 0.25s ease;
        }

        .sheet-tab-btn.active {
          color: var(--text-primary);
          font-weight: 800;
        }

        .sheet-tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 20%;
          right: 20%;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-rose), var(--accent-cyan));
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          box-shadow: 0 -2px 12px rgba(255, 42, 95, 0.7);
        }

        /* Scrollable Content */
        .bottom-sheet-content {
          flex: 1;
          overflow-y: auto;
          padding: 18px;
          -webkit-overflow-scrolling: touch;
        }

        .tab-pane {
          width: 100%;
        }

        /* Dates Horizontal Slider */
        .dates-horizontal-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 14px;
          flex-shrink: 0;
          scrollbar-width: none;
        }

        .dates-horizontal-scroll::-webkit-scrollbar {
          display: none;
        }

        .date-pill-btn {
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 8px 16px;
          border-radius: 12px;
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .date-pill-btn:active {
          transform: scale(0.95);
        }

        .date-pill-btn.active {
          background: rgba(255, 42, 95, 0.08);
          border-color: rgba(255, 42, 95, 0.35);
          color: var(--accent-rose);
          box-shadow: 0 0 12px rgba(255, 42, 95, 0.2);
        }

        /* Cinemas & Showtimes cards */
        .cinemas-showtimes-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-bottom: 20px;
        }

        .cinema-group-card {
          border-color: rgba(255, 255, 255, 0.03);
          background: rgba(16, 20, 35, 0.35);
          padding: 12px;
        }

        .cinema-group-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
          border-left: 3px solid var(--accent-purple);
          padding-left: 8px;
        }

        .formats-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .format-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .format-name-badge {
          font-size: 9px;
          font-weight: 700;
          color: var(--accent-cyan);
          letter-spacing: 0.5px;
          background: rgba(6, 182, 212, 0.08);
          width: fit-content;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .showtimes-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .showtime-pill {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          min-width: 60px;
          text-align: center;
        }

        /* Ficha Info CSS */
        .info-pane {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .info-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .info-text {
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.5;
        }

        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 14px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .meta-item.full-width {
          grid-column: span 2;
        }

        .actors-list-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .actor-tag {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          color: var(--text-primary);
        }

        .trailer-section {
          margin-top: 10px;
        }

        .btn-glow-youtube {
          background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);
          text-decoration: none;
          width: 100%;
        }

        .meta-label {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .meta-val {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Opinions panel CSS */
        .reviews-pane {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 24px;
        }

        .review-form-card {
          border-color: rgba(6, 182, 212, 0.15);
          background: rgba(6, 182, 212, 0.02);
        }

        .form-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .form-subtitle {
          font-size: 10px;
          color: var(--text-secondary);
          margin-bottom: 12px;
          display: block;
        }

        .stars-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .stars-selector-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .score-desc-text {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--accent-gold);
        }

        .review-textarea {
          width: 100%;
          height: 70px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 12px;
          padding: 8px 12px;
          resize: none;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .review-textarea:focus {
          border-color: var(--accent-cyan);
        }

        .submit-btn {
          width: 100%;
          padding: 10px;
          font-size: 13px;
          border-radius: 10px;
        }

        .reviews-feed {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .feed-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .feed-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .feed-item {
          padding: 10px;
          border-color: rgba(255, 255, 255, 0.02);
          background: rgba(255, 255, 255, 0.01);
        }

        .feed-user-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .feed-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1e1b4b;
        }

        .feed-user-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .feed-username {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .feed-date {
          font-size: 8px;
          color: var(--text-muted);
        }

        .feed-comment {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.4;
          background: rgba(0, 0, 0, 0.15);
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }

        .empty-reviews-state {
          text-align: center;
          font-size: 11px;
          color: var(--text-muted);
          padding: 20px 0;
          border: 1px dashed rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .empty-state {
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
          padding: 30px 0;
        }

        /* --- Estilos de Cartelera Interactiva (Idea A) --- */
        .showtimes-section {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 16px;
          margin-top: 8px;
        }

        .empty-showtimes {
          padding: 24px;
          text-align: center;
        }

        .no-showtimes-text {
          font-size: 11px;
          color: var(--text-muted);
        }

        .cinema-selector-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
        }

        .cinema-selector-row::-webkit-scrollbar {
          display: none;
        }

        .cinema-selector-btn {
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 8px 14px;
          border-radius: 10px;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cinema-selector-btn.active {
          background: rgba(6, 182, 212, 0.08);
          border-color: rgba(6, 182, 212, 0.3);
          color: var(--accent-cyan);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.15);
        }

        .date-selector-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          margin-top: 10px;
          margin-bottom: 12px;
          scrollbar-width: none;
          padding-bottom: 4px;
        }

        .date-selector-row::-webkit-scrollbar {
          display: none;
        }

        /* --- Calendario Semanal (Visual de 7 Días) --- */
        .calendar-date-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          min-width: 58px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .calendar-date-btn.empty-showtimes {
          opacity: 0.55;
        }

        .calendar-date-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
          opacity: 1;
        }

        .calendar-date-btn.active {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.2);
          opacity: 1;
        }

        .calendar-day-name {
          font-size: 8px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }

        .calendar-date-btn.active .calendar-day-name {
          color: var(--accent-cyan);
        }

        .calendar-day-num {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .calendar-date-btn.active .calendar-day-num {
          color: #fff;
        }

        .calendar-month-name {
          font-size: 9px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: lowercase;
          margin-top: 2px;
        }

        .showtimes-dot-indicator {
          width: 4px;
          height: 4px;
          background-color: var(--accent-cyan);
          border-radius: 50%;
          position: absolute;
          bottom: 4px;
          box-shadow: 0 0 6px var(--accent-cyan);
        }

        /* --- Banner y Tarjetas de Horarios --- */
        .schedule-status-banner {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.15);
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 12px;
          align-self: flex-start;
        }

        .banner-dot.green {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 8px #10b981;
        }

        .banner-text {
          font-size: 10px;
          font-weight: 700;
          color: #10b981;
          letter-spacing: 0.02em;
        }

        .no-showtimes-scheduled-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 22px 16px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 14px;
          gap: 6px;
          margin-top: 4px;
        }

        .schedule-icon {
          font-size: 24px;
          margin-bottom: 2px;
        }

        .schedule-title {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .schedule-text {
          font-size: 10.5px;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0;
          max-width: 290px;
        }

        .formats-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .format-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.02);
        }

        .format-title-tag {
          font-family: var(--font-display);
          font-size: 9px;
          font-weight: 800;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .times-grid-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .time-pill-btn {
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.15);
          color: var(--accent-cyan);
          padding: 6px 14px;
          border-radius: 8px;
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .time-pill-btn:hover {
          background: rgba(6, 182, 212, 0.12);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.25);
          transform: translateY(-1px);
        }

        .time-pill-btn:active {
          transform: scale(0.95);
        }

        /* --- Estilo de Tráiler Embebido (Idea C) --- */
        .trailer-embed-container {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
          border-radius: 14px;
          overflow: hidden;
          background: #000;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 15px rgba(239, 68, 68, 0.05);
        }

        .trailer-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* --- Registro de Visita (Idea 6) --- */
        .visit-register-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: rgba(139, 92, 246, 0.04);
          border: 1px solid rgba(139, 92, 246, 0.12);
          border-radius: 12px;
          padding: 12px;
        }

        .visit-register-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-violet);
          letter-spacing: 0.03em;
        }

        .visit-fields-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .visit-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .visit-field-label {
          font-size: 9px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .visit-input {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 7px 10px;
          font-size: 11px;
          color: var(--text-primary);
          font-family: var(--font-body);
          width: 100%;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.2s ease;
          color-scheme: dark;
        }

        .visit-input:focus {
          border-color: rgba(139, 92, 246, 0.4);
          background: rgba(139, 92, 246, 0.06);
        }

        /* --- Nuevo Diseño de Botones de Cine (Pills) --- */
        .cinema-pills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .cinema-pill-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 8px 14px;
          border-radius: 20px;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .cinema-pill-btn:hover {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.3);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .cinema-pill-btn.selected {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
          border-color: var(--accent-violet);
          color: #fff;
          font-weight: 700;
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.25);
        }

        .cinema-pill-btn:active {
          transform: scale(0.96);
        }

        /* --- Modo Lectura (Visita Bloqueada en Actualización) --- */
        .visit-locked-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .visit-locked-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-violet);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .visit-locked-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .visit-locked-pill {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          color: var(--accent-violet);
          font-size: 11px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .visit-locked-pill.cinema {
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.2);
          color: var(--accent-cyan);
        }

        .visit-locked-pill.food {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          color: #a78bfa;
        }

        .visit-locked-pill.mood {
          background: rgba(236, 72, 153, 0.1);
          border: 1px solid rgba(236, 72, 153, 0.2);
          color: #f472b6;
        }

        .visit-locked-hint {
          font-size: 9px;
          color: var(--text-muted);
          margin-top: 2px;
          display: block;
          font-style: italic;
        }

        /* --- Planificador de Cita e Invitaciones --- */
        .invite-action-card {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 14px;
          padding: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
        }

        .invite-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .invite-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-violet);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .invite-details {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .invite-btn {
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 10px;
          flex-shrink: 0;
        }

        /* --- Modales de Previsualización de Tarjeta --- */
        .sheet-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          z-index: 1000;
        }

        .sheet-modal-content {
          width: 100%;
          max-width: 420px;
          background: rgba(30, 27, 75, 0.6);
          border: 1px solid rgba(139, 92, 246, 0.25);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.15);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 8px;
        }

        .modal-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          margin: 0;
        }

        .btn-close-modal {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 14px;
        }

        .modal-desc {
          font-size: 11px;
          color: var(--text-secondary);
          text-align: center;
          margin: 0 0 16px 0;
        }

        .card-preview-container {
          width: 100%;
          aspect-ratio: 2/3;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .date-card-preview-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .card-preview-loading {
          color: var(--text-muted);
          font-size: 12px;
        }

        /* --- Recuerdos / Subida de Fotos --- */
        .photos-uploader-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }

        .photo-upload-btn-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(139, 92, 246, 0.06);
          border: 1.5px dashed rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          padding: 12px;
          color: #a78bfa;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
        }

        .photo-upload-btn-label:hover {
          background: rgba(139, 92, 246, 0.12);
          border-color: var(--accent-violet);
          color: #fff;
        }

        .photo-file-input {
          display: none;
        }

        .uploaded-previews-grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .uploaded-photo-preview {
          width: 64px;
          height: 64px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .uploaded-photo-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-photo-btn {
          position: absolute;
          top: 2px;
          right: 2px;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          color: #fff;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          font-size: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.1s ease;
        }

        .remove-photo-btn:hover {
          transform: scale(1.1);
        }

        /* --- Fotos Guardadas en Cita (Cápsula) --- */
        .locked-photos-grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .locked-photo-thumb {
          width: 72px;
          height: 72px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .locked-photo-thumb:hover {
          transform: scale(1.05);
          border-color: var(--accent-violet);
        }

        .locked-photo-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* --- Lightbox de Fotos de la Cita --- */
        .sheet-lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.93);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          z-index: 1200;
          animation: fadeIn 0.25s ease-out;
        }

        .sheet-lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .sheet-lightbox-close:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.05);
        }

        .sheet-lightbox-photo {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sheet-lightbox-nav {
          position: absolute;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .sheet-lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.05);
        }

        .sheet-lightbox-nav.prev {
          left: 20px;
        }

        .sheet-lightbox-nav.next {
          right: 20px;
        }
      `}</style>
    </div>
  );
}
