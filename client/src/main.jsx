import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Inyección dinámica de herramientas de depuración para tu iPhone 13 Mini vía CDN
if (typeof window !== 'undefined' && window.location.search.includes('debug=true')) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/eruda';
  script.onload = () => {
    if (window.eruda) {
      window.eruda.init({
        defaults: {
          displaySize: 50,
          theme: 'Dark'
        }
      });
    }
  };
  document.body.appendChild(script);
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

