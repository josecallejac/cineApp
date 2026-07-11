import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

// SVG Icons — tamaño fijo
const IconUser = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconLock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconEye = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEyeOff = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const IconFilm = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
    <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/>
    <line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/>
    <line x1="17" y1="7" x2="22" y2="7"/>
  </svg>
);

// Partícula flotante de fondo
const FloatingDot = ({ style }) => (
  <div className="auth-particle" style={style} />
);

export default function AuthScreen({ onLoginSuccess }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Pequeño delay para que las animaciones de entrada se vean
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Avatar dinámico
  const cleanUsername = username.trim().toLowerCase();
  const avatarPreviewUrl = cleanUsername
    ? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${cleanUsername}`
    : `https://api.dicebear.com/7.x/pixel-art/svg?seed=cineglowdefault`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    if (!isLoginTab && !confirmPassword.trim()) {
      setErrorMessage('Por favor, confirma tu contraseña.');
      return;
    }

    if (!isLoginTab && password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);
    const endpoint = isLoginTab ? '/api/auth/login' : '/api/auth/register';
    const payload = isLoginTab
      ? { username: username.trim(), password: password.trim() }
      : { username: username.trim(), password: password.trim(), name: username.trim() };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('cineglow_user', JSON.stringify(data));
        onLoginSuccess(data);
      } else {
        setErrorMessage(data.error || 'Algo salió mal. Inténtalo de nuevo.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Error de conexión. Verifica tu internet.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchTab = (toLogin) => {
    setIsLoginTab(toLogin);
    setErrorMessage('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Partículas decorativas de fondo
  const particles = [
    { top: '8%',  left: '12%',  width: '3px', height: '3px', animationDelay: '0s',   animationDuration: '6s'  },
    { top: '15%', left: '85%',  width: '2px', height: '2px', animationDelay: '1.2s', animationDuration: '8s'  },
    { top: '72%', left: '7%',   width: '4px', height: '4px', animationDelay: '0.5s', animationDuration: '7s'  },
    { top: '55%', left: '91%',  width: '2px', height: '2px', animationDelay: '2s',   animationDuration: '9s'  },
    { top: '88%', left: '78%',  width: '3px', height: '3px', animationDelay: '0.8s', animationDuration: '6.5s'},
    { top: '33%', left: '4%',   width: '2px', height: '2px', animationDelay: '1.8s', animationDuration: '10s' },
    { top: '90%', left: '40%',  width: '5px', height: '5px', animationDelay: '0.3s', animationDuration: '7.5s'},
    { top: '25%', left: '60%',  width: '2px', height: '2px', animationDelay: '3s',   animationDuration: '11s' },
  ];

  return (
    <div className={`auth-root ${mounted ? 'auth-root--mounted' : ''}`}>

      {/* Fondo con gradiente cinematográfico */}
      <div className="auth-bg">
        <div className="auth-bg-orb auth-bg-orb--1" />
        <div className="auth-bg-orb auth-bg-orb--2" />
        <div className="auth-bg-orb auth-bg-orb--3" />
        <div className="auth-bg-scanlines" />
        {particles.map((p, i) => (
          <FloatingDot key={i} style={p} />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="auth-content">

        {/* Branding superior */}
        <div className="auth-branding">
          <div className="auth-brand-icon">
            <IconFilm />
          </div>
          <h1 className="auth-title">
            Cine<span>Glow</span>
          </h1>
          <p className="auth-subtitle">Cartelera Cinépolis · Sector Oriente</p>
        </div>

        {/* Card principal */}
        <div className="auth-card">

          {/* Avatar preview */}
          <div className="auth-avatar-wrap">
            <div className="auth-avatar-glow" />
            <div className="auth-avatar-ring">
              <img
                src={avatarPreviewUrl}
                alt="Avatar"
                className="auth-avatar-img"
              />
            </div>
            {!isLoginTab && (
              <p className="auth-avatar-hint">
                ✦ Tu avatar se genera con tu usuario
              </p>
            )}
          </div>

          {/* Tabs */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLoginTab ? 'auth-tab--active' : ''}`}
              onClick={() => switchTab(true)}
            >
              Iniciar Sesión
            </button>
            <button
              className={`auth-tab ${!isLoginTab ? 'auth-tab--active' : ''}`}
              onClick={() => switchTab(false)}
            >
              Crear Cuenta
            </button>
            {/* Indicador deslizante */}
            <div className={`auth-tab-indicator ${!isLoginTab ? 'auth-tab-indicator--right' : ''}`} />
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="auth-error">
              <span className="auth-error-icon">!</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="auth-form" noValidate>

            <div className="auth-field">
              <label className="auth-label">Usuario</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><IconUser /></span>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="ej: joseUribe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={15}
                  autoComplete="username"
                  style={{ paddingLeft: '42px', paddingRight: '16px' }}
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label">Contraseña</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><IconLock /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  style={{ paddingLeft: '42px', paddingRight: '46px' }}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar' : 'Mostrar'}
                >
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>

            {!isLoginTab && (
              <div className="auth-field auth-field--animated">
                <label className="auth-label">Confirmar Contraseña</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><IconLock /></span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    style={{ paddingLeft: '42px', paddingRight: '46px' }}
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowConfirmPassword(v => !v)}
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                  >
                    {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`auth-submit ${isLoading ? 'auth-submit--loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="auth-spinner" />
              ) : (
                isLoginTab ? 'Entrar a CineGlow' : 'Crear mi cuenta'
              )}
            </button>

          </form>
        </div>

        <p className="auth-footer">
          Santiago Oriente · {new Date().getFullYear()}
        </p>
      </div>

      <style>{`
        /* ============================================
           AUTH SCREEN — Diseño Premium Cinematográfico
           ============================================ */

        .auth-root {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #03040a;
        }

        /* --- Fondo --- */
        .auth-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .auth-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0;
          transition: opacity 1.5s ease;
        }

        .auth-root--mounted .auth-bg-orb { opacity: 1; }

        .auth-bg-orb--1 {
          width: 420px; height: 420px;
          top: -120px; left: -100px;
          background: radial-gradient(circle, rgba(109, 40, 217, 0.25) 0%, transparent 70%);
          animation: orbDrift1 18s ease-in-out infinite alternate;
        }

        .auth-bg-orb--2 {
          width: 350px; height: 350px;
          bottom: -80px; right: -80px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, transparent 70%);
          animation: orbDrift2 22s ease-in-out infinite alternate;
        }

        .auth-bg-orb--3 {
          width: 250px; height: 250px;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%);
          animation: orbDrift3 15s ease-in-out infinite alternate;
        }

        .auth-bg-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.008) 3px,
            rgba(255,255,255,0.008) 4px
          );
          pointer-events: none;
        }

        .auth-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(139, 92, 246, 0.5);
          box-shadow: 0 0 6px rgba(139, 92, 246, 0.4);
          animation: particleFloat linear infinite;
        }

        /* --- Contenido --- */
        .auth-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 400px;
          padding: 24px 20px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;

          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .auth-root--mounted .auth-content {
          opacity: 1;
          transform: translateY(0);
        }

        /* --- Branding --- */
        .auth-branding {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          margin-bottom: 28px;
          animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        .auth-brand-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(109,40,217,0.3), rgba(6,182,212,0.2));
          border: 1px solid rgba(139, 92, 246, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(139, 92, 246, 0.9);
          margin-bottom: 4px;
          box-shadow: 0 0 20px rgba(109, 40, 217, 0.2);
        }

        .auth-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1;
          background: linear-gradient(135deg, #e2e8f0 20%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .auth-title span {
          background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .auth-subtitle {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(148, 163, 184, 0.6);
          margin: 0;
        }

        /* --- Card --- */
        .auth-card {
          width: 100%;
          background: rgba(8, 10, 20, 0.8);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 20px;
          padding: 24px 20px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 24px 48px rgba(0,0,0,0.6),
            0 0 60px rgba(109, 40, 217, 0.06);
          animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }

        /* --- Avatar --- */
        .auth-avatar-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          position: relative;
        }

        .auth-avatar-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%);
          filter: blur(12px);
          pointer-events: none;
        }

        .auth-avatar-ring {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          padding: 2.5px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.35);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      box-shadow 0.4s ease;
          position: relative;
          z-index: 1;
        }

        .auth-avatar-ring:hover {
          transform: scale(1.1) rotate(6deg);
          box-shadow: 0 0 30px rgba(124, 58, 237, 0.5);
        }

        .auth-avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #0d0f1e;
          border: 2px solid #0a0c1a;
          display: block;
        }

        .auth-avatar-hint {
          font-size: 9px;
          color: rgba(6, 182, 212, 0.7);
          font-weight: 600;
          letter-spacing: 0.3px;
          margin: 0;
          animation: fadeIn 0.4s ease both;
        }

        /* --- Tabs --- */
        .auth-tabs {
          position: relative;
          display: flex;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 18px;
          overflow: hidden;
        }

        .auth-tab {
          position: relative;
          flex: 1;
          z-index: 1;
          background: none;
          border: none;
          color: rgba(148, 163, 184, 0.6);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 12px;
          padding: 9px 0;
          border-radius: 9px;
          cursor: pointer;
          transition: color 0.25s ease;
          letter-spacing: 0.2px;
        }

        .auth-tab--active {
          color: #f1f5f9;
        }

        .auth-tab-indicator {
          position: absolute;
          top: 4px;
          left: 4px;
          width: calc(50% - 4px);
          bottom: 4px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(109,40,217,0.25), rgba(6,182,212,0.15));
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: 0 2px 8px rgba(109, 40, 217, 0.15);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .auth-tab-indicator--right {
          transform: translateX(calc(100% + 0px));
        }

        /* --- Error --- */
        .auth-error {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 68, 68, 0.07);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 10px;
          padding: 9px 12px;
          margin-bottom: 14px;
          font-size: 11.5px;
          color: #f87171;
          font-weight: 500;
          line-height: 1.4;
          animation: shakeIn 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }

        .auth-error-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 800;
          color: #ef4444;
          flex-shrink: 0;
        }

        /* --- Formulario --- */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .auth-field--animated {
          animation: slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .auth-label {
          font-family: var(--font-display);
          font-size: 10.5px;
          font-weight: 700;
          color: rgba(148, 163, 184, 0.7);
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .auth-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .auth-input-icon {
          position: absolute;
          left: 13px;
          width: 15px;
          height: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(148, 163, 184, 0.4);
          pointer-events: none;
          z-index: 1;
          transition: color 0.2s ease;
        }

        .auth-input-wrap:focus-within .auth-input-icon {
          color: rgba(139, 92, 246, 0.8);
        }

        .auth-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          color: #f1f5f9;
          font-family: var(--font-sans);
          font-size: 13.5px;
          padding: 11px 16px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          box-sizing: border-box;
          -webkit-appearance: none;
        }

        .auth-input::placeholder {
          color: rgba(148, 163, 184, 0.25);
        }

        .auth-input:focus {
          border-color: rgba(139, 92, 246, 0.45);
          background: rgba(109, 40, 217, 0.05);
          box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.08),
                      0 0 12px rgba(109, 40, 217, 0.1);
        }

        .auth-eye-btn {
          position: absolute;
          right: 12px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: rgba(148, 163, 184, 0.35);
          cursor: pointer;
          padding: 0;
          border-radius: 7px;
          transition: color 0.2s ease, background 0.2s ease;
          z-index: 1;
        }

        .auth-eye-btn:hover {
          color: rgba(148, 163, 184, 0.8);
          background: rgba(255,255,255,0.05);
        }

        /* --- Botón Submit --- */
        .auth-submit {
          position: relative;
          width: 100%;
          padding: 13px 20px;
          margin-top: 6px;
          border: none;
          border-radius: 12px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.3px;
          cursor: pointer;
          overflow: hidden;
          background: linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #0891b2 100%);
          background-size: 200% 200%;
          color: #fff;
          box-shadow:
            0 4px 20px rgba(124, 58, 237, 0.35),
            0 0 0 1px rgba(255,255,255,0.1) inset;
          transition: transform 0.2s ease,
                      box-shadow 0.2s ease,
                      background-position 0.4s ease;
          animation: slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }

        .auth-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 8px 28px rgba(124, 58, 237, 0.45),
            0 0 0 1px rgba(255,255,255,0.12) inset;
          background-position: right center;
        }

        .auth-submit:active:not(:disabled) {
          transform: translateY(0px);
        }

        .auth-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .auth-submit--loading {
          pointer-events: none;
        }

        .auth-submit::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }

        .auth-submit:hover::before {
          left: 100%;
        }

        /* Spinner de carga */
        .auth-spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
        }

        /* --- Footer --- */
        .auth-footer {
          margin-top: 20px;
          font-size: 9.5px;
          color: rgba(148, 163, 184, 0.25);
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 500;
          animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }

        /* --- Animaciones --- */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0);     }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes shakeIn {
          0%   { transform: translateX(0);   opacity: 0; }
          20%  { transform: translateX(-6px); opacity: 1; }
          40%  { transform: translateX(6px);  }
          60%  { transform: translateX(-4px); }
          80%  { transform: translateX(4px);  }
          100% { transform: translateX(0);   }
        }

        @keyframes orbDrift1 {
          from { transform: translate(0, 0) scale(1);      }
          to   { transform: translate(40px, 30px) scale(1.1); }
        }

        @keyframes orbDrift2 {
          from { transform: translate(0, 0) scale(1);       }
          to   { transform: translate(-30px, -40px) scale(1.15); }
        }

        @keyframes orbDrift3 {
          from { transform: translate(-50%, -50%) scale(1);    }
          to   { transform: translate(-50%, -50%) scale(1.3);  }
        }

        @keyframes particleFloat {
          0%   { transform: translateY(0)    opacity: 0;   }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-120px); opacity: 0; }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
