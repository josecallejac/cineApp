#!/usr/bin/env node
// Refresca la cartelera de producción con un snapshot enriquecido.
//
// POR QUÉ EXISTE: el WAF (Cloudflare) de Cinépolis bloquea con 403 la IP de
// datacenter de Railway, así que el servidor en prod no puede hacer el scrape.
// Este script corre desde una IP no bloqueada (la PC del usuario), arma la
// cartelera ya enriquecida con TMDB y la empuja a POST /api/billboard/snapshot.
//
// Uso:
//   node scripts/push-billboard.js            # scrape + enrich + push a prod
//   node scripts/push-billboard.js --seed     # además reescribe el seed del repo
//   node scripts/push-billboard.js --no-push  # solo genera (útil para el seed inicial)
//
// Config (server/.env, gitignored):
//   TMDB_API_KEY               clave TMDB para poster/director/elenco
//   BILLBOARD_SNAPSHOT_SECRET  secreto compartido con el servidor
//   PROD_URL                   base de prod (default: URL de Railway)

const path = require('path');
const fs = require('fs');

// dotenv vive en server/node_modules (el repo raíz no lo instala). Resolverlo desde ahí.
const dotenv = require(path.join(__dirname, '..', 'server', 'node_modules', 'dotenv'));
// Cargar variables desde server/.env (donde ya vive TMDB_API_KEY) y, si existe, .env raíz.
dotenv.config({ path: path.join(__dirname, '..', 'server', '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { scrapeCinepolisMovies, enrichWithTmdb } = require('../server/cinepolis');

const PROD_URL = (process.env.PROD_URL || 'https://cineapp-production-88ec.up.railway.app').replace(/\/$/, '');
const SECRET = process.env.BILLBOARD_SNAPSHOT_SECRET;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const SEED_PATH = path.join(__dirname, '..', 'server', 'data', 'billboard-seed.json');

const args = process.argv.slice(2);
const writeSeed = args.includes('--seed');
const noPush = args.includes('--no-push');

async function main() {
  console.log('[push-billboard] Haciendo scrape de la cartelera de Cinépolis...');
  const movies = await scrapeCinepolisMovies();
  console.log(`[push-billboard] ${movies.length} películas obtenidas.`);

  if (TMDB_API_KEY) {
    await enrichWithTmdb(movies, TMDB_API_KEY, {});
    console.log('[push-billboard] Enriquecido con TMDB (poster/director/elenco).');
  } else {
    console.warn('[push-billboard] ⚠ Sin TMDB_API_KEY: el snapshot irá sin director/elenco.');
  }

  if (writeSeed) {
    fs.mkdirSync(path.dirname(SEED_PATH), { recursive: true });
    fs.writeFileSync(SEED_PATH, JSON.stringify({ movies, savedAt: new Date().toISOString() }, null, 0));
    console.log(`[push-billboard] Seed escrito en ${path.relative(process.cwd(), SEED_PATH)}.`);
  }

  if (noPush) {
    console.log('[push-billboard] --no-push: se omite el envío a producción.');
    return;
  }

  if (!SECRET) {
    console.error('[push-billboard] ✖ Falta BILLBOARD_SNAPSHOT_SECRET; no se puede empujar a prod.');
    console.error('              Configúralo en server/.env (y en Railway) o usa --no-push.');
    process.exit(1);
  }

  console.log(`[push-billboard] Enviando snapshot a ${PROD_URL}/api/billboard/snapshot ...`);
  const res = await fetch(`${PROD_URL}/api/billboard/snapshot`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-snapshot-secret': SECRET },
    body: JSON.stringify({ movies })
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`[push-billboard] ✖ Prod respondió HTTP ${res.status}: ${text.slice(0, 300)}`);
    process.exit(1);
  }
  console.log(`[push-billboard] ✔ Producción actualizada: ${text}`);
}

main().catch(err => {
  console.error('[push-billboard] ✖ Error:', err.message);
  process.exit(1);
});
