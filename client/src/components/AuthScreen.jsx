import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

export default function AuthScreen({ onLoginSuccess }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  
  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic Avatar preview generation
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        // Save to localStorage and notify parent component
        localStorage.setItem('cineglow_user', JSON.stringify(data));
        onLoginSuccess(data);
      } else {
        setErrorMessage(data.error || 'Algo salió mal. Inténtalo de nuevo.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Error de conexión. Asegúrate de que el servidor esté encendido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-screen-container animate-fade-in">
      <div className="auth-branding-wrap">
        <h1 className="auth-logo">Cine<span>Glow</span></h1>
        <p className="auth-tagline">Puntúa la cartelera de Santiago Oriente</p>
      </div>

      {/* Auth Card Glassmorphic */}
      <div className="auth-card glass-card animate-scale-in">
        {/* Dynamic Avatar Preview Section */}
        <div className="avatar-preview-section">
          <div className="avatar-ring">
            <img src={avatarPreviewUrl} alt="Avatar Preview" className="dynamic-avatar" />
          </div>
          {!isLoginTab && (
            <span className="avatar-helper-text">¡Tu avatar dinámico se genera con tu usuario!</span>
          )}
        </div>

        {/* Tab Toggle Buttons Slider */}
        <div className="auth-tabs">
          <button 
            className={`auth-tab-btn ${isLoginTab ? 'active' : ''}`}
            onClick={() => {
              setIsLoginTab(true);
              setErrorMessage('');
              setConfirmPassword('');
            }}
          >
            Iniciar Sesión
          </button>
          <button 
            className={`auth-tab-btn ${!isLoginTab ? 'active' : ''}`}
            onClick={() => {
              setIsLoginTab(false);
              setErrorMessage('');
              setConfirmPassword('');
            }}
          >
            Crear Cuenta
          </button>
        </div>

        {/* Error message widget */}
        {errorMessage && (
          <div className="auth-error-card">
            <span>⚠️</span>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-input-group">
            <label className="input-label">Nombre de Usuario</label>
            <div className="input-field-wrap">
              <span className="input-icon">@</span>
              <input
                type="text"
                className="auth-input-field"
                placeholder="ej: joseUribe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={15}
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-input-group">
            <label className="input-label">Contraseña</label>
            <div className="input-field-wrap">
              <span className="input-icon">🔑</span>
              <input
                type="password"
                className="auth-input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          {!isLoginTab && (
            <div className="form-input-group">
              <label className="input-label">Confirmar Contraseña</label>
              <div className="input-field-wrap">
                <span className="input-icon">🔑</span>
                <input
                  type="password"
                  className="auth-input-field"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className={`btn-glow btn-glow-cyan auth-submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : (isLoginTab ? 'Ingresar a CineGlow' : 'Registrarse ahora')}
          </button>
        </form>
      </div>

      <style jsx="true">{`
        .auth-screen-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 24px 16px;
          background: radial-gradient(circle at center, #0e111c 0%, #050608 100%);
          overflow-y: auto;
        }

        .auth-branding-wrap {
          text-align: center;
          margin-bottom: 24px;
        }

        .auth-logo {
          font-family: var(--font-display);
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -1.5px;
          background: linear-gradient(135deg, var(--text-primary) 30%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .auth-logo span {
          background: linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .auth-tagline {
          font-size: 11px;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
          margin-top: 4px;
        }

        .auth-card {
          width: 100%;
          max-width: 380px;
          border-color: rgba(139, 92, 246, 0.25);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
          padding: 24px 20px;
          background: rgba(12, 14, 23, 0.85);
        }

        /* Dynamic Avatar Section */
        .avatar-preview-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .avatar-ring {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          padding: 3px;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .avatar-ring:hover {
          transform: scale(1.08) rotate(5deg);
        }

        .dynamic-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #141332;
          border: 2px solid #0c0e17;
        }

        .avatar-helper-text {
          font-size: 9px;
          color: var(--accent-cyan);
          font-weight: 600;
          text-align: center;
        }

        /* Tab Switcher */
        .auth-tabs {
          display: flex;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 20px;
        }

        .auth-tab-btn {
          flex: 1;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 12px;
          padding: 8px 0;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .auth-tab-btn.active {
          background: rgba(139, 92, 246, 0.15);
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.15);
        }

        /* Error widget */
        .auth-error-card {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 10px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          animation: fadeInUp 0.3s ease;
        }

        .error-text {
          font-size: 11px;
          color: #ef4444;
          line-height: 1.3;
          font-weight: 500;
        }

        /* Input Forms CSS */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-label {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.2px;
        }

        .input-field-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          font-size: 12px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .auth-input-field {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 12px;
          padding: 10px 12px 10px 34px;
          outline: none;
          transition: all 0.2s ease;
        }

        .auth-input-field:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.15);
        }

        .auth-submit-btn {
          width: 100%;
          padding: 12px;
          font-size: 14px;
          border-radius: 12px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}
