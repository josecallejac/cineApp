# 🎬 CineGlow — Contexto del Proyecto
> Generado automáticamente el **25-05-2026, 21:36:08** por `generate-context.js`

---

## 📋 Descripción General

**CineGlow** es una app web móvil (PWA-like) para parejas cinéfilas, pensada especialmente para llevar el registro de citas al cine juntos. Consume la cartelera en vivo de **Cinépolis Sector Oriente** (Santiago, Chile) y permite: valorar películas, crear una cápsula del tiempo de la cita, subir fotos de recuerdos, crear invitaciones PNG para compartir por WhatsApp, y ver estadísticas de pareja.

- **Frontend:** React + Vite (puerto 5173 en dev, build en `dist/`)
- **Backend:** Node.js + Express (puerto 3001)
- **Base de datos:** JSON plano en `server/db.json` (sin SQL)
- **CSS:** Vanilla CSS con variables CSS (glassmorphism, dark mode)
- **Fuentes:** Outfit (display), Inter (body) desde Google Fonts

---

## 🗂️ Pestañas de la App

| Tab ID | Ícono | Nombre | ¿Siempre visible? | Condición para aparecer |
|--------|-------|--------|------------------|-------------------------|
| `billboard` | 🎬 | Cartelera | ✅ Sí | — |
| `social` | 🌐 | Social | ✅ Sí | — |
| `upcoming` | 🔔 | Estrenos | ✅ Sí | — |
| `stats` | 📊 | Stats | ✅ Sí | — |
| `my-ratings` | ⭐ | Mis Ratings | ✅ Sí | — |
| `watchlist` | ❤️ | Cine-Match | ❌ No | Al menos 2 usuarios han dado like a la misma película |
| `memories` | 📸 | Recuerdos | ❌ No | Al menos un rating tiene fotos adjuntas |

---

## 🔄 Estado Global (`App.jsx`)

Todos los estados viven en `App.jsx` y se pasan como props a los componentes hijos:

- `currentTab`: Pestaña activa actualmente (string)
- `currentUser`: Usuario autenticado (objeto o null)
- `movies`: Array de películas de la cartelera
- `ratingsList`: Array de todas las valoraciones guardadas
- `watchlist`: Array de items de watchlist (likes)
- `selectedMovie`: Película seleccionada para abrir el BottomSheet
- `isLoading`: Indicador de carga de la cartelera

---

## 🧩 Componentes React

### `App.jsx` (751 líneas, 22.6KB)
- **useState:** `currentTab`, `currentUser`, `movies`, `ratingsList`, `watchlist`, `selectedMovie`, `isLoading`, `notifications`, `showNotificationsPanel`
- **useEffect:** 4 hook(s)
- **API calls:** `http://localhost:3001/api/notifications?userId=${currentUser.id}`, `http://localhost:3001/api/notifications/read`, `http://localhost:3001/api/billboard`, `http://localhost:3001/api/ratings`, `http://localhost:3001/api/watchlist`

### `AppointmentsTab.jsx` (814 líneas, 24.3KB)
- **Props:** `activeProfile`, `movies`, `prefilledData`, `onClearPrefilledData`
- **useState:** `appointments`, `isLoading`, `showForm`, `title`, `selectedMovieKey`, `customMovieTitle`, `date`, `cinemaName`, `menuOption`, `notes`, `isSubmitting`
- **useEffect:** 2 hook(s)
- **API calls:** `http://localhost:3001/api/appointments`, `http://localhost:3001/api/appointments`, `http://localhost:3001/api/notifications`, `http://localhost:3001/api/appointments/${id}`

### `AuthScreen.jsx` (378 líneas, 11.0KB)
- **Props:** `onLoginSuccess`
- **useState:** `isLoginTab`, `username`, `password`, `name`, `errorMessage`, `isLoading`
- **API calls:** `http://localhost:3001${endpoint}`

### `BillboardTab.jsx` (515 líneas, 15.1KB)
- **Props:** `movies`, `onMovieClick`, `isLoading`, `billboardAlerts`
- **useState:** `searchQuery`, `sortBy`, `selectedCinemaFilter`, `alertBannerDismissed`

### `BottomTabBar.jsx` (217 líneas, 8.3KB)
- **Props:** `currentTab`, `onTabChange`, `showWatchlist`, `showMemories`, `billboardAlertCount`

### `DemoProfileSelector.jsx` (219 líneas, 6.1KB)
- **Props:** `profiles`, `activeProfile`, `onProfileChange`
- **useState:** `isOpen`

### `MemoryGalleryTab.jsx` (672 líneas, 19.3KB)
- **Props:** `ratingsList`, `activeProfile`
- **useState:** `lightbox`

### `MovieBottomSheet.jsx` (2443 líneas, 82.1KB)
- **Props:** `movie`, `onClose`, `activeProfile`, `onAddRating`, `ratingsList`, `onRefreshBillboard`
- **useState:** `activeTab`, `score`, `comment`, `isSubmitting`, `movieReviews`, `movieSummary`, `selectedCinema`, `selectedDate`, `selectedDayIndex`, `watchedAt`, `visitCinema`, `menuOption`, `moodOption`, `photos`, `selectedTime`, `selectedFormat`, `showDateCardModal`, `inviteMessage`, `cardPreviewUrl`, `sheetLightbox`, `showEnvelope`, `envelopeRatingCount`
- **useEffect:** 4 hook(s)
- **API calls:** `http://localhost:3001/api/ratings`, `http://localhost:3001/api/ratings`, `http://localhost:3001/api/envelopes`

### `MovieCard.jsx` (193 líneas, 5.1KB)
- **Props:** `movie`, `onClick`

### `MyRatingsTab.jsx` (442 líneas, 13.9KB)
- **Props:** `activeProfile`, `ratingsList`, `movies`, `onMovieClick`
- **useState:** `activeSubTab`, `prefilledAptData`

### `RatingStars.jsx` (78 líneas, 1.9KB)
- **Props:** `rating`, `onChange`, `interactive`, `size`
- **useState:** `hoverRating`

### `SavedEnvelopesTab.jsx` (756 líneas, 22.9KB)
- **Props:** `activeProfile`, `onScheduleWithIdea`
- **useState:** `envelopes`, `isLoading`, `selectedEnvelope`, `openPhase`, `activeSubTab`
- **useEffect:** 1 hook(s)
- **API calls:** `http://localhost:3001/api/envelopes?userId=${activeProfile.id}`, `http://localhost:3001/api/notifications`, `http://localhost:3001/api/envelopes/${envId}/use`

### `SeatMap.jsx` (645 líneas, 19.4KB)
- **Props:** `showtime`, `activeProfile`, `onClose`, `onRefreshUser`
- **useState:** `selectedSeats`, `isBooked`, `isBooking`
- **API calls:** `http://localhost:3001/api/users/add-points`

### `SocialTab.jsx` (502 líneas, 15.6KB)
- **Props:** `ratingsList`, `movies`, `onMovieClick`
- **useState:** `likesState`
- **useEffect:** 1 hook(s)

### `StatsTab.jsx` (343 líneas, 9.6KB)
- **Props:** `movies`
- **useState:** `stats`, `isLoading`
- **useEffect:** 1 hook(s)
- **API calls:** `http://localhost:3001/api/stats`

### `SurpriseEnvelope.jsx` (314 líneas, 11.0KB)
- **Props:** `ratingCount`, `movieTitle`, `onClose`
- **useState:** `phase`
- **useEffect:** 1 hook(s)

### `UpcomingTab.jsx` (815 líneas, 24.7KB)
- **Props:** `activeProfile`, `onMovieClick`, `watchlist`, `onRefreshWatchlist`
- **useState:** `upcomingMovies`, `selectedMonth`, `isLoading`, `showMatchModal`, `matchedMovie`, `year`
- **useEffect:** 1 hook(s)
- **API calls:** `http://localhost:3001/api/upcoming`, `http://localhost:3001/api/watchlist/toggle`

### `WatchlistTab.jsx` (463 líneas, 13.6KB)
- **Props:** `activeProfile`, `onMovieClick`, `watchlist`, `onRefreshWatchlist`
- **useState:** `upcomingMovies`, `isLoading`, `year`
- **useEffect:** 1 hook(s)
- **API calls:** `http://localhost:3001/api/upcoming`, `http://localhost:3001/api/watchlist/toggle`

---

## 🌐 Endpoints del Servidor (`server.js`)

Base URL: `http://localhost:3001`

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Registro de nuevo usuario |
| `POST` | `/api/auth/login` | Inicio de sesión |
| `GET` | `/api/billboard` | Cartelera en vivo de Cinépolis Sector Oriente |
| `GET` | `/api/ratings/:movieKey` | Valoraciones y resumen de una película |
| `POST` | `/api/ratings` | Guardar valoración (POST) / Listar todas (GET) |
| `POST` | `/api/users/add-points` | Añadir GlowPoints a un usuario |
| `GET` | `/api/ratings` | Guardar valoración (POST) / Listar todas (GET) |
| `GET` | `/api/stats` | Estadísticas analíticas de la cartelera |
| `GET` | `/api/upcoming` | — |
| `GET` | `/api/watchlist` | Listar watchlist (GET) |
| `POST` | `/api/watchlist/toggle` | Añadir/quitar película de la watchlist |
| `GET` | `/api/proxy-image` | Proxy de imágenes para evitar CORS en Canvas |
| `POST` | `/api/envelopes` | — |
| `GET` | `/api/envelopes` | — |
| `PUT` | `/api/envelopes/:id/use` | — |
| `POST` | `/api/appointments` | — |
| `GET` | `/api/appointments` | — |
| `DELETE` | `/api/appointments/:id` | — |
| `POST` | `/api/notifications` | — |
| `GET` | `/api/notifications` | — |
| `PUT` | `/api/notifications/read` | — |
| `GET` | `/api/context` | Contexto completo de la app (este agente) |

---

## 🗄️ Estado de la Base de Datos (`db.json` — 4.6KB)

### Usuarios (3)
- **Palomero VIP** (id: `user_palomero`) — 500 GlowPoints, Nivel 2
- **Cinéfilo Pro** (id: `user_cinefilo`) — undefined GlowPoints, Nivel undefined
- **Crítico Experto** (id: `user_critico`) — undefined GlowPoints, Nivel undefined

### Valoraciones
- Total: **8** valoraciones
- Fotos subidas en total: **0**

**Top películas valoradas:**

| Película | Valoraciones | Promedio | ¿Con fotos? |
|----------|-------------|----------|-------------|
| MICHAEL | 1 | ⭐ 3.0 | — |
| EL DIABLO VISTE A LA MODA 2 | 1 | ⭐ 3.0 | — |
| THE MANDALORIAN AND GROGU | 1 | ⭐ 3.0 | — |
| BACKROOMS | 1 | ⭐ 5.0 | — |
| SCARY MOVIE 6 | 1 | ⭐ 4.0 | — |
| EL PASAJERO DEL DIABLO | 1 | ⭐ 4.0 | — |
| MORTAL KOMBAT II | 1 | ⭐ 4.0 | — |
| OBSESION | 1 | ⭐ 5.0 | — |

### Watchlist
- Items en watchlist: **1**
- Cine-Matches activos (≥2 usuarios): **0**

---

## ✅ Características Implementadas

- 🎬 Cartelera en vivo de Cinépolis Sector Oriente (Santiago)
- ⭐ Sistema de valoraciones por usuario (1-5 estrellas)
- 💌 Planificador de Cita: tarjeta PNG descargable con Canvas API
- 🔄 Proxy de imágenes en backend para evitar CORS en Canvas
- 📸 Galería de Recuerdos: subida de fotos, lightbox, timeline
- 🍿 Cápsula del Tiempo: fecha, cine, comida (Cabritas Mixtas incluidas), mood
- 🔒 Campos de Cápsula del Tiempo inmutables tras el primer guardado
- ❤️ Watchlist compartida + sistema de Cine-Match entre perfiles
- 📊 StatsTab: estadísticas de la cartelera
- 🎭 SocialTab: muro de valoraciones de la comunidad con fotos
- 🗺️ SeatMap: selección interactiva de asientos
- 🔔 UpcomingTab: próximos estrenos
- 👤 AuthScreen: Login/Registro con avatares DiceBear
- 📸 Pestaña Recuerdos: aparece solo cuando hay fotos guardadas
- 💫 Pestaña Watchlist: aparece solo cuando hay un Cine-Match
- 🎨 Glassmorphism premium + animaciones CSS suaves

---

## 🚀 Ideas Pendientes / Próximas Features

- 🎰 Ruleta "¿Qué vemos hoy?" — selección aleatoria de película con filtros
- 🏆 Estadísticas de pareja compartidas (géneros favoritos, cine más visitado, racha)
- 🎁 Sobres Sorpresa — recompensas desbloqueables por asistir al cine
- 🔔 Alertas de Estreno — notificar cuando una película de Watchlist esté en cartelera
- 📊 Cine-Wrapped anual — resumen animado estilo Spotify Wrapped

---

## 📦 Dependencias Principales

### Frontend (`client/`)
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `vite`: ^5.4.10
- `@vitejs/plugin-react`: ^4.3.3

### Backend (`server/`)
- `express`: ^4.19.2
- `cors`: ^2.8.5

---

## 🛠️ Cómo Ejecutar el Proyecto

```bash
# Terminal 1: Servidor backend
cd server
node server.js
# → Escucha en http://localhost:3001

# Terminal 2: Cliente React
cd client
npm run dev
# → Abre http://localhost:5173

# Compilar para producción:
cd client && npm run build
# → Sirve el build con el servidor (static files)
```

---

> 📝 *Regenera este archivo con `node generate-context.js` desde la raíz del proyecto.*
