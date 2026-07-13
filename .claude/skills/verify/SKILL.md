# Verify CineGlow (E2E con Playwright)

Receta probada para verificar cambios del cliente en la app real.

## Levantar

```powershell
$env:NODE_ENV='test'   # escribe en server/db.test.json, no en db.json real
npm run dev            # server :3001 + Vite :5173 (background)
```

## Manejar con Playwright

- `npm i playwright` en un dir temporal; los browsers ya están en `%LOCALAPPDATA%\ms-playwright`.
- Viewport móvil: `{ width: 390, height: 844 }` (app mobile-first).
- Auth: pestaña "Crear Cuenta", 3 inputs `.auth-input` (usuario, pass, confirmar), botón "Crear mi cuenta". Login: "Entrar a CineGlow".
- Alerts nativos (`alert()`) en validaciones → registrar `page.on('dialog')`.

## Gotchas

- **El scrape de Cinépolis puede fallar** (`/api/billboard` 500 si cinepolischile.cl devuelve HTML). Para cambios de cliente, interceptar con `page.route('**/api/billboard')` y un fixture `{ movies: [...] }`. Las fechas de `showtimes[].dates[].showtimeDate` deben matchear `getNext7Days()`: formato `"11 jul"` (día + mes corto en minúsculas).
- **Date Card**: posters `http…` pasan por `/api/proxy-image` (allowlist de hosts) → un poster de fixture externo da 403 y dibuja el placeholder 🎬. Usar ruta relativa (p. ej. `/shrek_5_poster.webp` de `client/public`) para ejercitar la rama del poster real.
- Selectores útiles: `.movie-card`, `.bottom-sheet-wrapper`, `.cinema-selector-btn`, `.calendar-date-btn.has-showtimes`, `.time-pill-btn`, `.invite-action-card`, `.review-form-card`, `.photo-file-input` (acepta `setInputFiles`), `.visit-locked-section`, `.sheet-lightbox-overlay`, `.modal-message-input`.

## Flujos que vale la pena cubrir

Registro → cartelera → abrir sheet → horarios (cambio de cine resetea a HOY; día sin funciones) → hora → Tarjeta de Cita (preview, edición de mensaje con tope 36, persistencia al reabrir) → tab Opiniones → rating con visita + 3 fotos (4ª da alert) → submit → cápsula bloqueada + lightbox (wrap prev/next) → feed → cerrar por overlay → reabrir (persistencia).
