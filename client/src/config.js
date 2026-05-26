// 🌐 URL Base de la API del Servidor Backend
// En desarrollo local apunta a http://localhost:3001.
// En producción (Vercel) utilizará la variable de entorno VITE_API_URL de tu servidor Railway.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
