require('dotenv').config();
const express = require('express');
const cors = require('cors');
const database = require('./database');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Servir archivos estáticos del cliente (Vite compilado)
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Servir las fotos de recuerdos guardadas como archivos
app.use('/photos', express.static(database.photosDir, { maxAge: '365d', immutable: true }));

// --- AUTENTICACIÓN CON TOKENS FIRMADOS (HMAC) ---
const authCrypto = require('crypto');
// Si no hay SESSION_SECRET configurado se genera uno por arranque
// (los tokens se invalidan al reiniciar y el cliente vuelve al login)
const SESSION_SECRET = process.env.SESSION_SECRET || authCrypto.randomBytes(32).toString('hex');
const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

function createToken(userId) {
  const payload = Buffer.from(JSON.stringify({ id: userId, exp: Date.now() + TOKEN_TTL_MS })).toString('base64url');
  const sig = authCrypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = authCrypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !authCrypto.timingSafeEqual(sigBuf, expBuf)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    if (!data.id || Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

// Endpoints públicos que no requieren token
const PUBLIC_API_PATHS = ['/api/auth/', '/api/billboard', '/api/upcoming', '/api/stats', '/api/proxy-image'];

app.use('/api', (req, res, next) => {
  const fullPath = '/api' + req.path;
  if (PUBLIC_API_PATHS.some(p => fullPath === p || fullPath.startsWith(p))) {
    return next();
  }
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const session = verifyToken(token);
  if (!session) {
    return res.status(401).json({ error: 'Sesión inválida o expirada. Inicia sesión nuevamente.' });
  }
  req.userId = session.id;
  next();
});

// Verifica que el userId declarado por el cliente coincida con el dueño del token
function assertSelf(req, res, claimedUserId) {
  if (!claimedUserId || claimedUserId === req.userId) return true;
  res.status(403).json({ error: 'No autorizado para actuar en nombre de otro usuario.' });
  return false;
}

// Rate limiting simple en memoria para los endpoints de autenticación
const authAttempts = new Map();
function authRateLimit(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  const entry = authAttempts.get(ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count++;
  authAttempts.set(ip, entry);
  if (authAttempts.size > 10000) authAttempts.clear();
  if (entry.count > 30) {
    return res.status(429).json({ error: 'Demasiados intentos. Espera unos minutos.' });
  }
  next();
}

// Endpoint de Registro de Usuario
app.post('/api/auth/register', authRateLimit, (req, res) => {
  try {
    const { username, password, name } = req.body;
    const user = database.registerUser(username, password, name);
    res.status(201).json({ ...user, token: createToken(user.id) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint de Inicio de Sesión
app.post('/api/auth/login', authRateLimit, (req, res) => {
  try {
    const { username, password } = req.body;
    const user = database.loginUser(username, password);
    res.json({ ...user, token: createToken(user.id) });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Caché en memoria para almacenar los posters en alta resolución de TMDB
const tmdbPosterCache = {};

// --- CARTELERA CINÉPOLIS (API GraphQL del sitio nuevo cinepolis.com/cl) ---
// En 2026 cinepolischile.cl migró a cinepolis.com/cl; el viejo endpoint
// Cartelera.aspx/GetNowPlayingByCity ya no existe. El sitio nuevo consume
// GraphQL en api-g.cinepolis.com con una API key pública embebida en su JS.
const http2 = require('http2');

const CINEPOLIS_GRAPHQL_HOST = 'api-g.cinepolis.com';
// Clave pública del sitio web de Cinépolis (no es un secreto; viaja en cada
// request del navegador). Se puede sobreescribir por env si la rotan.
const CINEPOLIS_API_KEY = process.env.CINEPOLIS_API_KEY || 'lQM6Mkvri1iHksKKCfpAiwGXq0YUZA7Nn6XAXRPr4i13LwXo';
const CINEPOLIS_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const CINEPOLIS_CITY_ID = 'santiago-oriente';
const CINEPOLIS_STATIC_BASE = 'https://tickets-static-content.cinepolis.com';
const CINEPOLIS_CACHE_TTL_MS = 10 * 60 * 1000;
let cinepolisCache = { movies: null, fetchedAt: 0, pending: null };

// IMPORTANTE: el WAF (Cloudflare) de api-g.cinepolis.com devuelve 403 en
// /v2/billboards a clientes HTTP/1.1 que no sean navegadores (bloquea el
// fetch nativo de Node, el módulo https clásico y curl), pero acepta HTTP/2.
// Por eso este cliente usa node:http2. No migrar a fetch()/https.
function cinepolisGraphql(pathName, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const fail = (msg) => reject(new Error(`Cinépolis GraphQL ${payload.operationName}: ${msg}`));

    const client = http2.connect(`https://${CINEPOLIS_GRAPHQL_HOST}`);
    let settled = false;
    const finish = (fn, arg) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      client.close();
      fn(arg);
    };
    const timer = setTimeout(() => {
      client.destroy();
      if (!settled) { settled = true; fail('timeout'); }
    }, 20000);

    client.on('error', (err) => finish(reject, err));

    const req = client.request({
      ':method': 'POST',
      ':path': pathName,
      'content-type': 'application/json',
      'x-apikey': CINEPOLIS_API_KEY,
      'country-id': 'CL',
      'language': 'ES',
      'accept': '*/*',
      'user-agent': CINEPOLIS_USER_AGENT
    });

    let statusCode = 0;
    let data = '';
    req.setEncoding('utf8');
    req.on('response', (headers) => { statusCode = headers[':status']; });
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      if (statusCode !== 200) {
        return finish(() => fail(`HTTP ${statusCode}`));
      }
      try {
        const json = JSON.parse(data);
        if (json.errors && json.errors.length) {
          return finish(() => fail(json.errors[0].message));
        }
        finish(resolve, json.data);
      } catch {
        finish(() => fail('respuesta no es JSON'));
      }
    });
    req.on('error', (err) => finish(reject, err));
    req.end(body);
  });
}

const CINEPOLIS_MOVIES_QUERY = `query Movies($countryId: String!, $category: String, $cinemas: String, $limit: Int) {
  movies(countryId: $countryId, category: $category, cinemas: $cinemas, limit: $limit) {
    edges {
      node {
        id
        name
        originalName
        distributor
        rating
        ratingDescription
        position
        genre
        synopsis
        length
        releaseDate
        media { resource type code sizes { large medium small __typename } __typename }
        __typename
      }
      __typename
    }
    __typename
  }
}`;

const CINEPOLIS_CITIES_QUERY = `query Cities($countryId: String!) {
  cities(country_id: $countryId) {
    edges { node { id name cinemas { id name cityId __typename } __typename } __typename }
    __typename
  }
}`;

const CINEPOLIS_BILLBOARD_QUERY = `query Billboard($countryId: String!, $cinemaId: String!, $timezone: String!, $isOffSelectorDays: Boolean!) {
  billboardByCinema(countryId: $countryId, cinemaId: $cinemaId, timezone: $timezone, isOffSelectorDays: $isOffSelectorDays) {
    dates
    schedules {
      cinemaId
      cityId
      movieId
      dates {
        date
        languages {
          language
          displayLanguage
          showtimes {
            format { name __typename }
            sessionId
            datetime
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}`;

// "2026-07-12" → "12 jul" (formato que el cliente matchea en su calendario de 7 días)
const CINEPOLIS_MONTHS_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
function isoToShowtimeDate(isoDate) {
  const [, month, day] = isoDate.split('-').map(Number);
  return `${day} ${CINEPOLIS_MONTHS_SHORT[month - 1]}`;
}

// Resuelve la URL absoluta de un asset del CDN de Cinépolis (poster, tráiler mp4)
function cinepolisMediaUrl(media, code) {
  const item = (media || []).find(m => m.code === code);
  if (!item || !item.sizes || !item.sizes.large) return null;
  return `${CINEPOLIS_STATIC_BASE}${item.sizes.large}${item.resource}`;
}

// "AVENTURA" → "Aventura"
function titleCaseGenre(genres) {
  const g = (genres || [])[0];
  if (!g) return null;
  return g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();
}

// Consolida metadata (Movies) + cines de Sector Oriente (Cities) + horarios por
// cine (Billboard) en el shape que el cliente ya consume. Cacheado con TTL.
async function fetchCinepolisMovies() {
  const now = Date.now();
  if (cinepolisCache.movies && (now - cinepolisCache.fetchedAt) < CINEPOLIS_CACHE_TTL_MS) {
    return cinepolisCache.movies;
  }
  // Deduplicar requests concurrentes mientras hay un scrape en vuelo
  if (cinepolisCache.pending) {
    return cinepolisCache.pending;
  }
  cinepolisCache.pending = (async () => {
    try {
      const [moviesData, citiesData] = await Promise.all([
        cinepolisGraphql('/v2/billboards/graphql', {
          operationName: 'Movies',
          variables: { countryId: 'CL', category: 'now-playing', cinemas: '', limit: 100 },
          query: CINEPOLIS_MOVIES_QUERY
        }),
        cinepolisGraphql('/shared-services/locations/graphql', {
          operationName: 'Cities',
          variables: { countryId: 'CL' },
          query: CINEPOLIS_CITIES_QUERY
        })
      ]);

      const city = (citiesData.cities.edges || []).map(e => e.node).find(n => n.id === CINEPOLIS_CITY_ID);
      if (!city || !city.cinemas || city.cinemas.length === 0) {
        throw new Error(`Ciudad "${CINEPOLIS_CITY_ID}" sin cines en la respuesta de Cinépolis`);
      }

      // Metadata indexada por slug de película
      const metaById = {};
      for (const edge of (moviesData.movies.edges || [])) {
        metaById[edge.node.id] = edge.node;
      }

      // Horarios de cada cine de la zona, en paralelo; un cine caído no bota la cartelera
      const billboards = await Promise.allSettled(city.cinemas.map(cinema =>
        cinepolisGraphql('/v2/billboards/graphql', {
          operationName: 'Billboard',
          variables: { countryId: 'CL', cinemaId: cinema.id, timezone: 'America/Santiago', isOffSelectorDays: true },
          query: CINEPOLIS_BILLBOARD_QUERY
        })
      ));

      const uniqueMovies = {};
      billboards.forEach((result, idx) => {
        const cinema = city.cinemas[idx];
        if (result.status !== 'fulfilled') {
          console.error(`[Cinépolis] Horarios de ${cinema.name} fallaron:`, result.reason.message);
          return;
        }
        const cinemaName = `Cinépolis ${cinema.name}`;

        for (const schedule of (result.value.billboardByCinema.schedules || [])) {
          const mKey = schedule.movieId;
          if (!uniqueMovies[mKey]) {
            const meta = metaById[mKey];
            uniqueMovies[mKey] = {
              id: mKey,
              key: mKey,
              title: meta ? meta.name : mKey.replace(/-/g, ' '),
              originalTitle: meta ? meta.originalName : null,
              rating: meta ? meta.rating : null,
              // El cliente muestra ratingDescription como sinopsis
              ratingDescription: meta ? (meta.synopsis || meta.ratingDescription) : null,
              runTime: meta ? meta.length : null,
              poster: meta ? cinepolisMediaUrl(meta.media, 'poster') : null,
              trailer: meta ? cinepolisMediaUrl(meta.media, 'trailer_mp4') : null,
              director: "Desconocido", // el API nuevo ya no expone director ni elenco
              gender: (meta && titleCaseGenre(meta.genre)) || "Cine",
              distributor: meta ? meta.distributor : null,
              actors: [],
              position: meta ? Number(meta.position) || 999 : 999,
              showtimes: []
            };
          }

          // Agrupar horarios por complejo y fecha (mismo shape que el API viejo)
          let cinemaEntry = uniqueMovies[mKey].showtimes.find(c => c.cinemaName === cinemaName);
          if (!cinemaEntry) {
            cinemaEntry = { cinemaName, dates: [] };
            uniqueMovies[mKey].showtimes.push(cinemaEntry);
          }

          for (const scheduleDate of (schedule.dates || [])) {
            const showtimeDate = isoToShowtimeDate(scheduleDate.date);
            let dateEntry = cinemaEntry.dates.find(d => d.showtimeDate === showtimeDate);
            if (!dateEntry) {
              dateEntry = { showtimeDate, formats: [] };
              cinemaEntry.dates.push(dateEntry);
            }

            for (const language of (scheduleDate.languages || [])) {
              for (const st of (language.showtimes || [])) {
                const formatName = `${language.language || ''} ${(st.format && st.format.name) || '2D'}`.trim();
                let formatEntry = dateEntry.formats.find(f => f.formatName === formatName);
                if (!formatEntry) {
                  formatEntry = { formatName, times: [] };
                  dateEntry.formats.push(formatEntry);
                }
                if (!formatEntry.times.some(t => t.id === st.sessionId)) {
                  formatEntry.times.push({
                    time: st.datetime.slice(11, 16),
                    id: st.sessionId
                  });
                }
              }
            }
          }
        }
      });

      // Si todos los cines fallaron no hay cartelera real: tratarlo como error
      if (Object.keys(uniqueMovies).length === 0 && billboards.every(b => b.status !== 'fulfilled')) {
        throw new Error('Ningún cine de Sector Oriente respondió horarios');
      }

      // Ordenar horas dentro de cada formato y las películas por su posición en el sitio
      for (const movie of Object.values(uniqueMovies)) {
        for (const cinemaEntry of movie.showtimes) {
          for (const dateEntry of cinemaEntry.dates) {
            for (const formatEntry of dateEntry.formats) {
              formatEntry.times.sort((a, b) => a.time.localeCompare(b.time));
            }
          }
        }
      }
      const movies = Object.values(uniqueMovies).sort((a, b) => a.position - b.position);

      cinepolisCache.movies = movies;
      cinepolisCache.fetchedAt = Date.now();
      return movies;
    } catch (err) {
      // Si el scrape falla pero tenemos datos viejos, servirlos como fallback
      if (cinepolisCache.movies) {
        console.error("[Cinépolis] Scrape falló, sirviendo caché expirado:", err.message);
        return cinepolisCache.movies;
      }
      throw err;
    } finally {
      cinepolisCache.pending = null;
    }
  })();
  return cinepolisCache.pending;
}

// Endpoint para obtener la cartelera consolidada y calificada de Sector Oriente
app.get('/api/billboard', async (req, res) => {
  try {
    // 1. Cartelera consolidada de Cinépolis (con caché TTL compartido)
    const movies = await fetchCinepolisMovies();

    // 2. Adjuntar el resumen de puntuaciones locales (siempre fresco, fuera del caché)
    movies.forEach(movie => {
      movie.ratingSummary = database.getMovieRatingSummary(movie.key);
    });

    // ⚡ RESOLVEDOR DE POSTERS HD (TMDB) — en paralelo; solo consulta películas sin caché
    const tmdbApiKey = process.env.TMDB_API_KEY;
    if (tmdbApiKey) {
      const uncached = movies.filter(movie => {
        if (tmdbPosterCache[movie.key]) {
          movie.poster = tmdbPosterCache[movie.key];
          return false;
        }
        return true;
      });

      if (uncached.length > 0) {
        console.log(`[TMDB] Resolviendo posters HD en paralelo para ${uncached.length} películas...`);
        await Promise.all(uncached.map(async (movie) => {
          try {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movie.title)}&language=es-CL`);
            const data = await res.json();
            const match = (data.results || []).find(r => r.poster_path);
            if (match) {
              const hdPoster = `https://image.tmdb.org/t/p/w500${match.poster_path}`;
              tmdbPosterCache[movie.key] = hdPoster;
              movie.poster = hdPoster;
            }
          } catch (err) {
            console.error(`[TMDB] Error al buscar poster de ${movie.title}:`, err.message);
          }
        }));
      }
    }

    res.json({ movies });

  } catch (error) {
    console.error("Error fetching billboard:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener valoraciones de una película
app.get('/api/ratings/:movieKey', (req, res) => {
  try {
    const ratings = database.getMovieRatings(req.params.movieKey);
    const summary = database.getMovieRatingSummary(req.params.movieKey);
    res.json({ ratings, summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para guardar una valoración
app.post('/api/ratings', (req, res) => {
  try {
    if (!assertSelf(req, res, req.body.userId)) return;
    const newRating = database.addRating(req.body);
    res.status(201).json(newRating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para añadir GlowPoints a un usuario
app.post('/api/users/add-points', (req, res) => {
  try {
    const { userId, amount } = req.body;
    if (!userId || typeof amount !== 'number') {
      return res.status(400).json({ error: "userId y amount son requeridos." });
    }
    if (!assertSelf(req, res, userId)) return;
    const updatedUser = database.addPoints(userId, amount);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para obtener todas las valoraciones históricas (global)
app.get('/api/ratings', (req, res) => {
  try {
    const ratings = database.getRatings();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para estadísticas analíticas de la cartelera y valoraciones
app.get('/api/stats', async (req, res) => {
  try {
    // Necesitamos la cartelera para cruzar datos (caché compartido con /api/billboard)
    let totalBillboardMovies = 0;
    try {
      const movies = await fetchCinepolisMovies();
      totalBillboardMovies = movies.length;
    } catch (err) {
      console.error("[Stats] No se pudo obtener la cartelera:", err.message);
    }

    const allRatings = database.getRatings();
    
    // Calcular promedios globales
    let averageRating = 0;
    if (allRatings.length > 0) {
      const sum = allRatings.reduce((acc, curr) => acc + curr.score, 0);
      averageRating = parseFloat((sum / allRatings.length).toFixed(1));
    }

    // Calcular distribución de estrellas
    const globalStars = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    allRatings.forEach(r => {
      globalStars[r.score]++;
    });

    // Encontrar película mejor calificada
    const movieScores = {};
    allRatings.forEach(r => {
      if (!movieScores[r.movieKey]) {
        movieScores[r.movieKey] = { sum: 0, count: 0, title: r.movieTitle };
      }
      movieScores[r.movieKey].sum += r.score;
      movieScores[r.movieKey].count += 1;
    });

    let bestMovie = null;
    let maxAvg = 0;
    Object.keys(movieScores).forEach(key => {
      const avg = movieScores[key].sum / movieScores[key].count;
      // Solo considerar películas que tengan calificaciones y si superan la máxima promedio
      if (avg > maxAvg) {
        maxAvg = avg;
        bestMovie = {
          key,
          title: movieScores[key].title,
          average: parseFloat(avg.toFixed(1)),
          count: movieScores[key].count
        };
      }
    });

    res.json({
      totalRatings: allRatings.length,
      averageRating,
      globalStars,
      bestMovie,
      totalMovies: totalBillboardMovies
    });

  } catch (error) {
    console.error("Error calculating stats:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- LISTADO DE ESTRENOS PRÓXIMOS (SIMULADO / OFFLINE) ---
const UPCOMING_MOVIES = [
  {
    key: "the-odyssey",
    title: "La Odisea",
    originalTitle: "The Odyssey",
    releaseDate: "2026-07-15",
    genres: ["Aventura", "Fantasía", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/bheY17L6wtB0SdJn6EYyh1X5iry.jpg",
    synopsis: "La epopeya mitológica de Christopher Nolan sigue a Odiseo (Matt Damon) en su viaje de diez años de regreso a Ítaca tras la guerra de Troya, filmada íntegramente con cámaras IMAX.",
    distributor: "Universal Pictures",
    director: "Christopher Nolan"
  },
  {
    key: "hunger-games-sunrise-reaping",
    title: "Los Juegos del Hambre: Amanecer en la Cosecha",
    originalTitle: "The Hunger Games: Sunrise on the Reaping",
    releaseDate: "2026-11-18",
    genres: ["Acción", "Aventura", "Ciencia Ficción"],
    poster: "https://image.tmdb.org/t/p/w500/ffJaYMtB6v1TrvkyhCOqwqCKm0o.jpg",
    synopsis: "Panem, 24 años antes de Katniss: la mañana de la cosecha de los 50º Juegos del Hambre marca el destino de un joven Haymitch Abernathy en la edición del Vasallaje de los Veinticinco.",
    distributor: "Lionsgate",
    director: "Francis Lawrence"
  },
  {
    key: "avengers-doomsday",
    title: "Vengadores: Doomsday",
    originalTitle: "Avengers: Doomsday",
    releaseDate: "2026-12-16",
    genres: ["Acción", "Ciencia Ficción", "Aventura"],
    poster: "https://image.tmdb.org/t/p/w500/rQKabpeIewLLNStFr3anEXI0xqu.jpg",
    synopsis: "Robert Downey Jr. regresa al Universo Cinematográfico de Marvel como el icónico Doctor Doom en el inicio del clímax de la saga del multiverso, con los Vengadores, los 4 Fantásticos y los X-Men.",
    distributor: "Marvel Studios",
    director: "Anthony y Joe Russo",
    trailer: "https://www.youtube.com/watch?v=NzsDtHCdhGc"
  },
  {
    key: "dune-part-three",
    title: "Dune: Parte Tres",
    originalTitle: "Dune: Part Three",
    releaseDate: "2026-12-16",
    genres: ["Ciencia Ficción", "Aventura", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/ceKywESF1WPVlfdYRTrvZbTkSXV.jpg",
    synopsis: "Paul Atreides, ahora Emperador Muad'Dib, enfrenta enemigos políticos y una conspiración en su propio círculo en la conclusión de la trilogía de Denis Villeneuve, basada en 'El Mesías de Dune'.",
    distributor: "Warner Bros. Pictures",
    director: "Denis Villeneuve"
  },
  {
    key: "spiderman-beyond-spiderverse",
    title: "Spider-Man: Beyond the Spider-Verse",
    originalTitle: "Spider-Man: Beyond the Spider-Verse",
    releaseDate: "2027-06-17",
    genres: ["Animación", "Acción", "Aventura"],
    poster: "https://image.tmdb.org/t/p/w500/9PIhQqqI6Q4a5YjwMjxvzZcPJhf.jpg",
    synopsis: "La épica conclusión del viaje de Miles Morales a través del multiverso, donde deberá enfrentar a Spot y rescatar a su padre junto a Gwen Stacy y su equipo.",
    distributor: "Sony Pictures",
    director: "Joaquim Dos Santos"
  },
  {
    key: "shrek-5",
    title: "Shrek 5",
    originalTitle: "Shrek 5",
    releaseDate: "2027-06-30",
    genres: ["Animación", "Comedia", "Fantasía"],
    poster: "/shrek_5_poster.webp",
    synopsis: "¡El ogro más famoso del cine regresa! Mike Myers, Eddie Murphy y Cameron Diaz vuelven en la esperada quinta entrega para recordarnos por qué el pantano es sagrado.",
    distributor: "Universal Pictures",
    director: "Walt Dohrn"
  },
  {
    key: "the-batman-2",
    title: "The Batman: Parte II",
    originalTitle: "The Batman Part II",
    releaseDate: "2027-09-30",
    genres: ["Acción", "Crimen", "Drama"],
    poster: "/batman_2_poster.webp",
    synopsis: "Robert Pattinson regresa como el Caballero de la Noche en esta secuela directa de la aclamada obra policial de Matt Reeves en una Gotham sumida en el caos.",
    distributor: "Warner Bros. Pictures",
    director: "Matt Reeves"
  }
];

// --- NUEVOS ENDPOINTS DE WATCHLIST & ESTRENOS ---

// Obtener listado de estrenos
app.get('/api/upcoming', (req, res) => {
  try {
    res.json(UPCOMING_MOVIES);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener likes de la watchlist (con soporte inteligente de Duo de pareja)
app.get('/api/watchlist', (req, res) => {
  try {
    const { userId } = req.query;
    if (!assertSelf(req, res, userId)) return;
    const list = database.getWatchlist();

    if (!userId) {
      return res.json(list);
    }

    // Filtrar la watchlist del usuario
    const myWatchlist = list.filter(w => w.userId === userId);
    
    // Obtener la pareja si existe
    const partner = database.getPartner(userId);
    let partnerWatchlist = [];
    let matches = [];

    if (partner) {
      partnerWatchlist = list.filter(w => w.userId === partner.id);
      
      // Encontrar las películas que a ambos les gustan
      const myKeys = new Set(myWatchlist.map(w => w.movieKey));
      matches = partnerWatchlist.filter(w => myKeys.has(w.movieKey));
    }

    res.json({
      watchlist: myWatchlist,
      partnerWatchlist,
      matches,
      partner
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Conmutar like de watchlist
app.post('/api/watchlist/toggle', (req, res) => {
  try {
    const { userId, movieKey } = req.body;
    if (!userId || !movieKey) {
      return res.status(400).json({ error: "userId y movieKey son requeridos." });
    }
    if (!assertSelf(req, res, userId)) return;
    const result = database.toggleWatchlist(userId, movieKey);
    res.json(result);
  } catch (error) {
    const message = error ? error.message : "Error desconocido";
    res.status(400).json({ error: message });
  }
});

// --- ENDPOINTS VINCULACIÓN PAREJA (GLOW DUO) ---

// Vincular dos usuarios (Pareja)
app.post('/api/users/link', (req, res) => {
  try {
    const { userId, partnerUsername } = req.body;
    if (!userId || !partnerUsername) {
      return res.status(400).json({ error: "userId y partnerUsername son requeridos." });
    }
    if (!assertSelf(req, res, userId)) return;
    const result = database.linkUsers(userId, partnerUsername);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener datos de la pareja de un usuario
app.get('/api/users/partner/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const partner = database.getPartner(userId);
    res.json({ partner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Desvincular pareja
app.post('/api/users/unlink', (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId es requerido." });
    }
    if (!assertSelf(req, res, userId)) return;
    const result = database.unlinkUsers(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy de imágenes para evitar CORS en el canvas de invitaciones con optimización de caché local en disco
const http = require('http');
const https = require('https');
const crypto = require('crypto');
const fsSync = require('fs');
const pathSync = require('path');

const cacheDir = pathSync.join(__dirname, 'cache');
if (!fsSync.existsSync(cacheDir)) {
  fsSync.mkdirSync(cacheDir);
}

// Solo se permite proxear imágenes de los orígenes que usa la app (posters y avatares)
const PROXY_ALLOWED_HOSTS = [
  'static.cinepolis.com',
  'tickets-static-content.cinepolis.com',
  'cinepolischile.cl',
  'www.cinepolischile.cl',
  'image.tmdb.org',
  'api.dicebear.com'
];

app.get('/api/proxy-image', (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).send('URL query parameter is required');
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return res.status(400).send('Invalid URL');
  }
  if (parsedUrl.protocol !== 'https:' || !PROXY_ALLOWED_HOSTS.includes(parsedUrl.hostname)) {
    return res.status(403).send('Host no permitido por el proxy de imágenes');
  }

  const getCacheFilename = (url) => {
    const hash = crypto.createHash('md5').update(url).digest('hex');
    return pathSync.join(cacheDir, hash);
  };

  try {
    const cacheFile = getCacheFilename(imageUrl);
    
    // Si la imagen ya está en caché local, la servimos al instante
    if (fsSync.existsSync(cacheFile)) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'image/jpeg');
      return fsSync.createReadStream(cacheFile).pipe(res);
    }

    // Descargar y cachear en paralelo
    const client = imageUrl.startsWith('https') ? https : http;
    client.get(imageUrl, (proxyRes) => {
      if (proxyRes.statusCode !== 200) {
        return res.status(proxyRes.statusCode).send('Error loading image from remote server');
      }
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', proxyRes.headers['content-type'] || 'image/jpeg');
      
      // Escribir a un archivo temporal y renombrar al terminar (evita servir cachés a medio escribir)
      const tmpFile = cacheFile + '.tmp';
      const fileStream = fsSync.createWriteStream(tmpFile);
      fileStream.on('finish', () => {
        fsSync.rename(tmpFile, cacheFile, () => {});
      });
      fileStream.on('error', () => {
        fsSync.unlink(tmpFile, () => {});
      });
      proxyRes.pipe(fileStream);
      proxyRes.pipe(res);
    }).on('error', (err) => {
      console.error('Error proxying image:', err);
      res.status(500).send('Error loading image');
    });
  } catch (err) {
    console.error('Proxy exception:', err);
    res.status(500).send('Proxy exception error');
  }
});

// --- ENDPOINTS SOBRES SORPRESA ---

// Guardar un sobre
app.post('/api/envelopes', (req, res) => {
  try {
    const { userId, ideaIndex, emoji, text, tip, movieTitle, movieKey } = req.body;
    if (!userId || !text) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos: userId y text son obligatorios.' });
    }
    if (!assertSelf(req, res, userId)) return;
    const envelope = database.saveEnvelope({ userId, ideaIndex, emoji, text, tip, movieTitle, movieKey });
    res.status(201).json(envelope);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener sobres de un usuario
app.get('/api/envelopes', (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'Falta el parámetro userId en la consulta.' });
    }
    if (!assertSelf(req, res, userId)) return;
    const envelopes = database.getUserEnvelopes(userId);
    res.json(envelopes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marcar un sobre como usado
app.put('/api/envelopes/:id/use', (req, res) => {
  try {
    const { id } = req.params;
    const envelope = database.markEnvelopeUsed(id);
    res.json(envelope);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ENDPOINTS CALENDARIO DE CITAS ---

// Crear una cita de cine
app.post('/api/appointments', (req, res) => {
  try {
    const { userId, title, movieTitle, movieKey, date, cinemaName, menuOption, notes } = req.body;
    if (!userId || !title || !date) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos: userId, title y date son obligatorios.' });
    }
    if (!assertSelf(req, res, userId)) return;
    const appointment = database.createAppointment({ userId, title, movieTitle, movieKey, date, cinemaName, menuOption, notes });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las citas
app.get('/api/appointments', (req, res) => {
  try {
    const { userId } = req.query;
    if (!assertSelf(req, res, userId)) return;
    const appointments = database.getUserAppointments(userId || req.userId);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una cita
app.delete('/api/appointments/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = database.deleteAppointment(id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ENDPOINTS NOTIFICACIONES ---

// Crear una notificación
app.post('/api/notifications', (req, res) => {
  try {
    const { userId, senderId, senderName, senderAvatar, type, title, message } = req.body;
    if (!userId || !senderId || !title || !message) {
      return res.status(400).json({ error: 'Faltan parámetros: userId, senderId, title y message son obligatorios.' });
    }
    // El remitente debe ser el dueño del token (el destinatario userId puede ser la pareja)
    if (!assertSelf(req, res, senderId)) return;
    const notification = database.createNotification({ userId, senderId, senderName, senderAvatar, type, title, message });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener notificaciones de un usuario
app.get('/api/notifications', (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'Falta el parámetro userId en la consulta.' });
    }
    if (!assertSelf(req, res, userId)) return;
    const notifications = database.getUserNotifications(userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marcar notificaciones de un usuario como leídas
app.put('/api/notifications/read', (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'Falta el parámetro userId en el cuerpo de la consulta.' });
    }
    if (!assertSelf(req, res, userId)) return;
    const result = database.markNotificationsAsRead(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint del Agente de Contextos — genera y retorna context.md
const { execSync } = require('child_process');

app.get('/api/context', (req, res) => {
  // Deshabilitado en producción: ejecuta un proceso síncrono que bloquea el event loop
  if (process.env.NODE_ENV === 'production' || process.env.RAILWAY_VOLUME_PATH) {
    return res.status(404).json({ error: 'No disponible en producción.' });
  }
  try {
    const contextScriptPath = pathSync.join(__dirname, '..', 'generate-context.js');
    const contextOutputPath = pathSync.join(__dirname, '..', 'context.md');

    // Ejecutar el agente de contextos
    execSync(`node "${contextScriptPath}" --output "${contextOutputPath}"`, {
      cwd: pathSync.join(__dirname, '..'),
      timeout: 15000
    });

    // Leer el resultado
    const markdown = fsSync.readFileSync(contextOutputPath, 'utf-8');
    const format = req.query.format;

    if (format === 'json') {
      // Retornar como JSON estructurado
      const db = require('./database');
      const allRatings = db.getRatings();
      const watchlist = db.getWatchlist();
      res.json({
        generatedAt: new Date().toISOString(),
        markdownLength: markdown.length,
        stats: {
          totalRatings: allRatings.length,
          watchlistItems: watchlist.length,
          photosTotal: allRatings.reduce((acc, r) => acc + (r.photos ? r.photos.length : 0), 0),
        }
      });
    } else {
      // Retornar Markdown plano
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.send(markdown);
    }
  } catch (error) {
    console.error('Error ejecutando el agente de contextos:', error);
    res.status(500).json({ error: 'No se pudo generar el contexto: ' + error.message });
  }
});

// Endpoint de Diagnóstico para comprobar la base de datos en la nube (Volumen Persistente)
app.get('/api/diagnostics', (req, res) => {
  try {
    const dbFilename = process.env.NODE_ENV === 'test' ? 'db.test.json' : 'db.json';
    const resolvedDbPath = process.env.RAILWAY_VOLUME_PATH 
      ? path.join(process.env.RAILWAY_VOLUME_PATH, dbFilename)
      : path.join(__dirname, dbFilename);

    const isCloudVolume = !!process.env.RAILWAY_VOLUME_PATH;
    
    // Leer métricas reales de la base de datos local o en volumen
    let stats = { users: 0, ratings: 0, watchlist: 0, envelopes: 0, appointments: 0, notifications: 0 };
    try {
      const fsSync = require('fs');
      if (fsSync.existsSync(resolvedDbPath)) {
        const fullDb = JSON.parse(fsSync.readFileSync(resolvedDbPath, 'utf-8'));
        stats = {
          users: (fullDb.users || []).length,
          ratings: (fullDb.ratings || []).length,
          watchlist: (fullDb.watchlist || []).length,
          envelopes: (fullDb.envelopes || []).length,
          appointments: (fullDb.appointments || []).length,
          notifications: (fullDb.notifications || []).length
        };
      }
    } catch (err) {
      console.error('Error calculando estadísticas en diagnóstico:', err.message);
    }

    res.json({
      status: "ONLINE",
      timestamp: new Date().toISOString(),
      database: {
        connectedToCloudVolume: isCloudVolume,
        environment: process.env.NODE_ENV || 'production',
        railwayVolumePath: process.env.RAILWAY_VOLUME_PATH || 'No detectado (Usando almacenamiento efímero local de desarrollo)',
        resolvedPath: resolvedDbPath,
        dbFilename: dbFilename,
        exists: require('fs').existsSync(resolvedDbPath)
      },
      apiKeys: {
        tmdbKeyConfigured: !!process.env.TMDB_API_KEY,
        port: PORT
      },
      metrics: stats,
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsage: process.memoryUsage()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta comodín para servir el frontend de React SPA
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(__dirname, '../client/dist/index.html');
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send('🎬✨ CineGlow API - El motor de tu app de cine está encendido en la nube, pero el frontend aún no se ha compilado. 🚀💖');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor CineGlow escuchando en http://localhost:${PORT}`);
});
