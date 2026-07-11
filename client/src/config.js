// 🌐 URL Base de la API del Servidor Backend
// En desarrollo local apunta a http://localhost:3001.
// En producción (Vercel) utilizará la variable de entorno VITE_API_URL de tu servidor Railway.
export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '');

// 📷 Resuelve URLs de fotos servidas por el backend (/photos/...) contra la API.
// Deja intactas las URLs absolutas y los data URIs (previews locales antes de subir).
export const resolveAssetUrl = (u) =>
  (typeof u === 'string' && u.startsWith('/photos/')) ? `${API_BASE_URL}${u}` : u;

// 🔐 Interceptor global: adjunta el token de sesión a toda petición a la API
// y cierra sesión automáticamente si el servidor responde 401 (token expirado).
const originalFetch = window.fetch.bind(window);
window.fetch = async (input, init = {}) => {
  const url = typeof input === 'string' ? input : (input && input.url) || '';
  const isApiCall = url.includes('/api/');

  if (isApiCall && !url.includes('/api/auth/')) {
    try {
      const cachedUser = JSON.parse(localStorage.getItem('cineglow_user') || 'null');
      if (cachedUser && cachedUser.token) {
        init.headers = { ...(init.headers || {}), Authorization: `Bearer ${cachedUser.token}` };
      }
    } catch { /* usuario corrupto en localStorage: se ignora */ }
  }

  const response = await originalFetch(input, init);

  if (isApiCall && response.status === 401 && localStorage.getItem('cineglow_user')) {
    localStorage.removeItem('cineglow_user');
    window.location.reload();
  }

  return response;
};
