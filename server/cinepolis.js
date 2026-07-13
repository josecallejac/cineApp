// --- CARTELERA CINÉPOLIS (API GraphQL del sitio nuevo cinepolis.com/cl) ---
// En 2026 cinepolischile.cl migró a cinepolis.com/cl; el viejo endpoint
// Cartelera.aspx/GetNowPlayingByCity ya no existe. El sitio nuevo consume
// GraphQL en api-g.cinepolis.com con una API key pública embebida en su JS.
//
// Este módulo aísla el scrape y el enriquecido TMDB para que lo reutilicen
// tanto el servidor (server.js) como el script de refresco (scripts/push-billboard.js).
//
// IMPORTANTE (producción): el WAF (Cloudflare) de api-g.cinepolis.com bloquea con
// 403 las IPs de datacenter (Railway). Por eso el scrape SOLO funciona desde una
// IP no bloqueada (la PC del usuario) y el resultado se empuja a prod como snapshot.
const http2 = require('http2');

const CINEPOLIS_GRAPHQL_HOST = 'api-g.cinepolis.com';
// Clave pública del sitio web de Cinépolis (no es un secreto; viaja en cada
// request del navegador). Se puede sobreescribir por env si la rotan.
const CINEPOLIS_API_KEY = process.env.CINEPOLIS_API_KEY || 'lQM6Mkvri1iHksKKCfpAiwGXq0YUZA7Nn6XAXRPr4i13LwXo';
const CINEPOLIS_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const CINEPOLIS_CITY_ID = 'santiago-oriente';
const CINEPOLIS_STATIC_BASE = 'https://tickets-static-content.cinepolis.com';

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
// cine (Billboard) en el shape que el cliente ya consume. Lanza si todo falla.
// SIN caché: el caller (server.js) orquesta el caché y los fallbacks.
async function scrapeCinepolisMovies() {
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
  return Object.values(uniqueMovies).sort((a, b) => a.position - b.position);
}

// ⚡ ENRIQUECIMIENTO TMDB (poster HD + director + elenco) — en paralelo; solo
// consulta películas sin caché. Cinépolis ya no expone director/actores.
// Muta cada movie in-place y guarda la metadata en `cache` (indexada por movie.key).
async function enrichWithTmdb(movies, apiKey, cache = {}) {
  if (!apiKey) return movies;

  const applyMeta = (movie, meta) => {
    if (meta.poster) movie.poster = meta.poster;
    if (meta.director) movie.director = meta.director;
    if (meta.actors && meta.actors.length) movie.actors = meta.actors;
  };

  const uncached = movies.filter(movie => {
    if (cache[movie.key]) {
      applyMeta(movie, cache[movie.key]);
      return false;
    }
    return true;
  });

  if (uncached.length === 0) return movies;

  console.log(`[TMDB] Enriqueciendo ${uncached.length} películas (poster/director/elenco)...`);
  await Promise.all(uncached.map(async (movie) => {
    try {
      // Buscar la película por título original (más estable) o título local
      const query = movie.originalTitle || movie.title;
      const searchRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=es-CL`);
      const searchData = await searchRes.json();
      const match = (searchData.results || []).find(r => r.poster_path) || (searchData.results || [])[0];
      if (!match) return;

      const meta = {};
      if (match.poster_path) {
        meta.poster = `https://image.tmdb.org/t/p/w500${match.poster_path}`;
      }

      // Traer créditos (director + elenco principal) en una segunda llamada
      try {
        const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${match.id}/credits?api_key=${apiKey}&language=es-CL`);
        const credits = await creditsRes.json();
        const director = (credits.crew || []).find(c => c.job === 'Director');
        if (director) meta.director = director.name;
        meta.actors = (credits.cast || []).slice(0, 5).map(c => c.name);
      } catch (creditErr) {
        console.error(`[TMDB] Error al buscar créditos de ${query}:`, creditErr.message);
      }

      cache[movie.key] = meta;
      applyMeta(movie, meta);
    } catch (err) {
      console.error(`[TMDB] Error al enriquecer ${movie.title}:`, err.message);
    }
  }));

  return movies;
}

module.exports = {
  scrapeCinepolisMovies,
  enrichWithTmdb,
  CINEPOLIS_CITY_ID,
};
