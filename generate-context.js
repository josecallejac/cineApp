#!/usr/bin/env node
/**
 * 🤖 CineGlow — Agente de Contextos
 * ─────────────────────────────────
 * Genera automáticamente un documento context.md con el estado actual
 * completo de la app: arquitectura, componentes, endpoints, base de datos
 * y últimas valoraciones. Ideal para retomar sesiones de IA rápidamente.
 * También genera agents.md documentando todos los agentes IA del ecosistema.
 *
 * Uso:
 *   node generate-context.js                  → genera context.md + agents.md
 *   node generate-context.js --output ./docs/context.md
 *   node generate-context.js --json           → también genera context.json
 *   node generate-context.js --agents-only    → solo genera agents.md
 *
 * El archivo generado se puede pegar directamente al inicio de una
 * conversación con la IA para que entienda el proyecto al instante.
 */

const fs   = require('fs');
const path = require('path');

// ──────────────────────────────────────────────
// Configuración
// ──────────────────────────────────────────────
const ROOT         = __dirname;
const CLIENT_SRC   = path.join(ROOT, 'client', 'src');
const SERVER_DIR   = path.join(ROOT, 'server');
const DB_PATH      = path.join(SERVER_DIR, 'db.json');
const SERVER_FILE  = path.join(SERVER_DIR, 'server.js');

const args         = process.argv.slice(2);
const outputFlag   = args.indexOf('--output');
const outputPath   = outputFlag !== -1 ? args[outputFlag + 1] : path.join(ROOT, 'context.md');
const generateJson = args.includes('--json');
const agentsOnly   = args.includes('--agents-only');

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
function readFileSafe(filePath) {
  try { return fs.readFileSync(filePath, 'utf-8'); }
  catch { return null; }
}

function readJsonSafe(filePath) {
  const raw = readFileSafe(filePath);
  if (!raw) return null;
  try { return JSON.parse(raw); }
  catch { return null; }
}

function listFiles(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => !ext || f.endsWith(ext))
    .map(f => path.join(dir, f));
}

function sizeKb(filePath) {
  try { return (fs.statSync(filePath).size / 1024).toFixed(1); }
  catch { return '?'; }
}

// ──────────────────────────────────────────────
// Extraer información del servidor
// ──────────────────────────────────────────────
function extractEndpoints(serverCode) {
  const endpointRe = /app\.(get|post|put|patch|delete)\(['"`]([^'"`]+)['"`]/g;
  const endpoints  = [];
  let match;
  while ((match = endpointRe.exec(serverCode)) !== null) {
    endpoints.push({ method: match[1].toUpperCase(), path: match[2] });
  }
  return endpoints;
}

// ──────────────────────────────────────────────
// Extraer información de componentes React
// ──────────────────────────────────────────────
function extractComponentInfo(filePath) {
  const code = readFileSafe(filePath) || '';
  const name = path.basename(filePath, '.jsx');

  // Props del componente principal (function Foo({ ... }))
  const propsMatch = code.match(/(?:function|export default function)\s+\w+\s*\(\s*\{([^}]*)\}/);
  const props = propsMatch
    ? propsMatch[1].split(',').map(p => p.trim().split(/[=\n]/)[0].trim()).filter(Boolean)
    : [];

  // Estados (useState)
  const states = [...code.matchAll(/const\s+\[(\w+)/g)].map(m => m[1]);

  // useEffect count
  const effectCount = (code.match(/useEffect\s*\(/g) || []).length;

  // API calls
  const apiFetches = [...code.matchAll(/fetch\(['"`]([^'"`]+)['"`]/g)].map(m => m[1]);

  // Líneas de código
  const lines = code.split('\n').length;

  return { name, props, states: [...new Set(states)], effectCount, apiFetches, lines, sizeKb: sizeKb(filePath) };
}

// ──────────────────────────────────────────────
// Analizar la base de datos actual
// ──────────────────────────────────────────────
function analyzeDb() {
  const db = readJsonSafe(DB_PATH);
  if (!db) return null;

  const ratings  = db.ratings  || [];
  const watchlist = db.watchlist || [];
  const users    = (db.users || []).map(u => ({ id: u.id, name: u.name, points: u.points, level: u.level }));

  // Estadísticas de valoraciones
  const movieMap = {};
  ratings.forEach(r => {
    if (!movieMap[r.movieKey]) movieMap[r.movieKey] = { title: r.movieTitle, scores: [], hasPhotos: false };
    movieMap[r.movieKey].scores.push(r.score);
    if (r.photos && r.photos.length > 0) movieMap[r.movieKey].hasPhotos = true;
  });

  const movieStats = Object.entries(movieMap).map(([key, v]) => ({
    key,
    title: v.title,
    avgScore: (v.scores.reduce((a, b) => a + b, 0) / v.scores.length).toFixed(1),
    ratings: v.scores.length,
    hasPhotos: v.hasPhotos
  })).sort((a, b) => b.ratings - a.ratings);

  // Watchlist matches
  const wlByMovie = {};
  watchlist.forEach(w => {
    if (!wlByMovie[w.movieKey]) wlByMovie[w.movieKey] = [];
    wlByMovie[w.movieKey].push(w.userId);
  });
  const matches = Object.entries(wlByMovie)
    .filter(([, users]) => users.length >= 2)
    .map(([key]) => key);

  const photosTotal = ratings.reduce((acc, r) => acc + (r.photos ? r.photos.length : 0), 0);

  return {
    users,
    totalRatings: ratings.length,
    movieStats,
    watchlistItems: watchlist.length,
    cineMatches: matches.length,
    photosTotal,
    dbSizeKb: sizeKb(DB_PATH)
  };
}

// ──────────────────────────────────────────────
// Leer package.json para versiones
// ──────────────────────────────────────────────
function readDependencies(pkgPath) {
  const pkg = readJsonSafe(pkgPath);
  if (!pkg) return {};
  return { ...pkg.dependencies, ...pkg.devDependencies };
}

// ──────────────────────────────────────────────
// Generar Markdown
// ──────────────────────────────────────────────
function generateMarkdown(data) {
  const now = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
  const {
    components, endpoints, db, clientDeps, serverDeps,
    tabs, appStateVars
  } = data;

  let md = '';

  // ── Encabezado ─────────────────────────────
  md += `# 🎬 CineGlow — Contexto del Proyecto\n`;
  md += `> Generado automáticamente el **${now}** por \`generate-context.js\`\n\n`;
  md += `---\n\n`;

  // ── Descripción General ─────────────────────
  md += `## 📋 Descripción General\n\n`;
  md += `**CineGlow** es una app web móvil (PWA-like) para parejas cinéfilas, `;
  md += `pensada especialmente para llevar el registro de citas al cine juntos. `;
  md += `Consume la cartelera en vivo de **Cinépolis Sector Oriente** (Santiago, Chile) `;
  md += `y permite: valorar películas, crear una cápsula del tiempo de la cita, `;
  md += `subir fotos de recuerdos, crear invitaciones PNG para compartir por WhatsApp, `;
  md += `y ver estadísticas de pareja.\n\n`;
  md += `- **Frontend:** React + Vite (puerto 5173 en dev, build en \`dist/\`)\n`;
  md += `- **Backend:** Node.js + Express (puerto 3001)\n`;
  md += `- **Base de datos:** JSON plano en \`server/db.json\` (sin SQL)\n`;
  md += `- **CSS:** Vanilla CSS con variables CSS (glassmorphism, dark mode)\n`;
  md += `- **Fuentes:** Outfit (display), Inter (body) desde Google Fonts\n\n`;
  md += `---\n\n`;

  // ── Arquitectura de Pestañas ─────────────────
  md += `## 🗂️ Pestañas de la App\n\n`;
  md += `| Tab ID | Ícono | Nombre | ¿Siempre visible? | Condición para aparecer |\n`;
  md += `|--------|-------|--------|------------------|-------------------------|\n`;
  tabs.forEach(t => {
    md += `| \`${t.id}\` | ${t.icon} | ${t.name} | ${t.always ? '✅ Sí' : '❌ No'} | ${t.condition || '—'} |\n`;
  });
  md += `\n---\n\n`;

  // ── Estado Global (App.jsx) ──────────────────
  md += `## 🔄 Estado Global (\`App.jsx\`)\n\n`;
  md += `Todos los estados viven en \`App.jsx\` y se pasan como props a los componentes hijos:\n\n`;
  appStateVars.forEach(s => md += `- \`${s.name}\`: ${s.desc}\n`);
  md += `\n---\n\n`;

  // ── Componentes ──────────────────────────────
  md += `## 🧩 Componentes React\n\n`;
  components.forEach(c => {
    md += `### \`${c.name}.jsx\` (${c.lines} líneas, ${c.sizeKb}KB)\n`;
    if (c.props.length > 0)    md += `- **Props:** \`${c.props.join('`, `')}\`\n`;
    if (c.states.length > 0)   md += `- **useState:** \`${c.states.join('`, `')}\`\n`;
    if (c.effectCount > 0)     md += `- **useEffect:** ${c.effectCount} hook(s)\n`;
    if (c.apiFetches.length > 0) md += `- **API calls:** \`${c.apiFetches.join('`, `')}\`\n`;
    md += `\n`;
  });
  md += `---\n\n`;

  // ── API Endpoints ────────────────────────────
  md += `## 🌐 Endpoints del Servidor (\`server.js\`)\n\n`;
  md += `Base URL: \`http://localhost:3001\`\n\n`;
  md += `| Método | Ruta | Descripción |\n`;
  md += `|--------|------|-------------|\n`;
  endpoints.forEach(e => {
    const desc = endpointDescriptions[e.path] || '—';
    md += `| \`${e.method}\` | \`${e.path}\` | ${desc} |\n`;
  });
  md += `\n---\n\n`;

  // ── Base de Datos ────────────────────────────
  if (db) {
    md += `## 🗄️ Estado de la Base de Datos (\`db.json\` — ${db.dbSizeKb}KB)\n\n`;
    md += `### Usuarios (${db.users.length})\n`;
    db.users.forEach(u => {
      md += `- **${u.name}** (id: \`${u.id}\`) — ${u.points} GlowPoints, Nivel ${u.level}\n`;
    });
    md += `\n### Valoraciones\n`;
    md += `- Total: **${db.totalRatings}** valoraciones\n`;
    md += `- Fotos subidas en total: **${db.photosTotal}**\n\n`;
    if (db.movieStats.length > 0) {
      md += `**Top películas valoradas:**\n\n`;
      md += `| Película | Valoraciones | Promedio | ¿Con fotos? |\n`;
      md += `|----------|-------------|----------|-------------|\n`;
      db.movieStats.slice(0, 10).forEach(m => {
        md += `| ${m.title} | ${m.ratings} | ⭐ ${m.avgScore} | ${m.hasPhotos ? '📸 Sí' : '—'} |\n`;
      });
      md += `\n`;
    }
    md += `### Watchlist\n`;
    md += `- Items en watchlist: **${db.watchlistItems}**\n`;
    md += `- Cine-Matches activos (≥2 usuarios): **${db.cineMatches}**\n\n`;
    md += `---\n\n`;
  }

  // ── Características Implementadas ───────────
  md += `## ✅ Características Implementadas\n\n`;
  [
    '🎬 Cartelera en vivo de Cinépolis Sector Oriente (Santiago)',
    '⭐ Sistema de valoraciones por usuario (1-5 estrellas)',
    '💌 Planificador de Cita: tarjeta PNG descargable con Canvas API',
    '🔄 Proxy de imágenes en backend para evitar CORS en Canvas',
    '📸 Galería de Recuerdos: subida de fotos, lightbox, timeline',
    '🍿 Cápsula del Tiempo: fecha, cine, comida (Cabritas Mixtas incluidas), mood',
    '🔒 Campos de Cápsula del Tiempo inmutables tras el primer guardado',
    '❤️ Watchlist compartida + sistema de Cine-Match entre perfiles',
    '📊 StatsTab: estadísticas de la cartelera',
    '🎭 SocialTab: muro de valoraciones de la comunidad con fotos',
    '🗺️ SeatMap: selección interactiva de asientos',
    '🔔 UpcomingTab: próximos estrenos',
    '👤 AuthScreen: Login/Registro con avatares DiceBear',
    '📸 Pestaña Recuerdos: aparece solo cuando hay fotos guardadas',
    '💫 Pestaña Watchlist: aparece solo cuando hay un Cine-Match',
    '🎨 Glassmorphism premium + animaciones CSS suaves',
  ].forEach(f => md += `- ${f}\n`);
  md += `\n---\n\n`;

  // ── Ideas Pendientes ─────────────────────────
  md += `## 🚀 Ideas Pendientes / Próximas Features\n\n`;
  [
    '🎰 Ruleta "¿Qué vemos hoy?" — selección aleatoria de película con filtros',
    '🏆 Estadísticas de pareja compartidas (géneros favoritos, cine más visitado, racha)',
    '🎁 Sobres Sorpresa — recompensas desbloqueables por asistir al cine',
    '🔔 Alertas de Estreno — notificar cuando una película de Watchlist esté en cartelera',
    '📊 Cine-Wrapped anual — resumen animado estilo Spotify Wrapped',
  ].forEach(f => md += `- ${f}\n`);
  md += `\n---\n\n`;

  // ── Dependencias clave ───────────────────────
  md += `## 📦 Dependencias Principales\n\n`;
  md += `### Frontend (\`client/\`)\n`;
  const clientKeys = ['react', 'react-dom', 'vite', '@vitejs/plugin-react'];
  clientKeys.forEach(k => {
    if (clientDeps[k]) md += `- \`${k}\`: ${clientDeps[k]}\n`;
  });
  md += `\n### Backend (\`server/\`)\n`;
  const serverKeys = ['express', 'cors', 'nodemon'];
  serverKeys.forEach(k => {
    if (serverDeps[k]) md += `- \`${k}\`: ${serverDeps[k]}\n`;
  });
  md += `\n---\n\n`;

  // ── Cómo ejecutar ────────────────────────────
  md += `## 🛠️ Cómo Ejecutar el Proyecto\n\n`;
  md += `\`\`\`bash\n`;
  md += `# Terminal 1: Servidor backend\ncd server\nnode server.js\n# → Escucha en http://localhost:3001\n\n`;
  md += `# Terminal 2: Cliente React\ncd client\nnpm run dev\n# → Abre http://localhost:5173\n\n`;
  md += `# Compilar para producción:\ncd client && npm run build\n# → Sirve el build con el servidor (static files)\n\`\`\`\n\n`;
  md += `---\n\n`;

  md += `> 📝 *Regenera este archivo con \`node generate-context.js\` desde la raíz del proyecto.*\n`;

  return md;
}

// ──────────────────────────────────────────────
// Agentes conocidos del ecosistema CineGlow
// ──────────────────────────────────────────────
const AGENTS = [
  {
    id: 'context-agent',
    name: '🤖 Agente de Contextos',
    file: 'generate-context.js',
    type: 'Script Node.js',
    purpose: 'Escanea toda la app CineGlow y genera context.md y agents.md con el estado actual del proyecto: componentes, endpoints, base de datos, características y pendientes. Ideal para retomar sesiones de IA.',
    howToRun: [
      'node generate-context.js              → genera context.md',
      'node generate-context.js --json       → también genera context.json',
      'node generate-context.js --agents-only → solo genera agents.md',
      'npm run context                        → alias desde la raíz',
      'GET http://localhost:3001/api/context  → vía API REST',
    ],
    outputs: ['context.md', 'agents.md'],
    tools: ['fs (Node.js)', 'path (Node.js)', 'child_process (Node.js)']
  },
  {
    id: 'loyalty-booking-agent',
    name: '💳 LoyaltyBookingAgent',
    file: '.agents/agents/LoyaltyBookingAgent/agent.json',
    type: 'Antigravity Custom Agent',
    purpose: 'Guardián del sistema de lealtad y reservas de CineGlow (Fase 3 - Simulador de Butacas VIP y Fase 5 - GlowPoints + Dulcería Virtual). Almacena el código completo de estas features desactivadas y puede restaurarlas cuando el usuario lo decida.',
    howToRun: ['Invocar desde Antigravity CLI: "@LoyaltyBookingAgent restaura la Fase 3"'],
    outputs: ['SeatMap.jsx restaurado', 'MyRatingsTab.jsx con GlowPoints', 'App.jsx actualizado'],
    tools: ['write_to_file', 'replace_file_content', 'run_command', 'view_file']
  },
  {
    id: 'gallery-builder',
    name: '📸 Gallery Builder Agent',
    file: '.agents/agents/gallery_builder/agent.json',
    type: 'Antigravity Custom Agent',
    purpose: 'Construyó el componente MemoryGalleryTab.jsx — la Galería de Recuerdos premium con timeline cronológico, lightbox de pantalla completa y sistema de fotos comprimidas. Puede regenerar o extender la galería.',
    howToRun: ['Invocar desde Antigravity CLI: "@gallery_builder mejora la galería"'],
    outputs: ['MemoryGalleryTab.jsx'],
    tools: ['write_to_file', 'replace_file_content', 'view_file', 'run_command']
  }
];

// ──────────────────────────────────────────────
// Extraer info de agentes
// ──────────────────────────────────────────────
function extractAgentsInfo() {
  return AGENTS;
}

// ──────────────────────────────────────────────
// Generar agents.md
// ──────────────────────────────────────────────
function generateAgentsMd(agentsData) {
  const now = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });

  // Build anchor from name (strip emojis, lowercase, spaces→hyphens)
  function toAnchor(name) {
    return name
      .replace(/[^\w\s-]/g, '')  // remove emoji & special chars
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
  }

  let md = '';

  // Header
  md += `# 🤖 CineGlow — Agentes de IA\n`;
  md += `> Generado automáticamente el **${now}** por \`generate-context.js\`\n\n`;
  md += `Este documento describe todos los agentes de inteligencia artificial que forman parte del ecosistema CineGlow.\n\n`;
  md += `---\n\n`;

  // Index
  md += `## Índice\n`;
  agentsData.forEach(a => {
    const anchor = toAnchor(a.name);
    md += `- [${a.name}](#${anchor})\n`;
  });
  md += `\n---\n\n`;

  // Agent sections
  agentsData.forEach(a => {
    md += `## ${a.name}\n\n`;
    md += `| Campo | Valor |\n`;
    md += `|-------|-------|\n`;
    md += `| **Tipo** | ${a.type} |\n`;
    md += `| **Archivo** | \`${a.file}\` |\n`;
    md += `\n`;

    md += `**Propósito:**\n${a.purpose}\n\n`;

    md += `**Cómo ejecutar:**\n`;
    if (a.type === 'Script Node.js') {
      md += `\`\`\`bash\n`;
      a.howToRun.forEach(line => { md += `${line}\n`; });
      md += `\`\`\`\n\n`;
    } else {
      a.howToRun.forEach(line => { md += `- ${line}\n`; });
      md += `\n`;
    }

    md += `**Salidas:**\n`;
    a.outputs.forEach(o => { md += `- ${o}\n`; });
    md += `\n`;

    md += `**Herramientas disponibles:**\n`;
    md += `\`${a.tools.join('\`, \`')}\`\n\n`;

    md += `---\n\n`;
  });

  return md;
}

// ──────────────────────────────────────────────
// Descripciones de endpoints conocidos
// ──────────────────────────────────────────────
const endpointDescriptions = {
  '/api/auth/register':   'Registro de nuevo usuario',
  '/api/auth/login':      'Inicio de sesión',
  '/api/billboard':       'Cartelera en vivo de Cinépolis Sector Oriente',
  '/api/ratings/:movieKey': 'Valoraciones y resumen de una película',
  '/api/ratings':         'Guardar valoración (POST) / Listar todas (GET)',
  '/api/users/add-points': 'Añadir GlowPoints a un usuario',
  '/api/stats':           'Estadísticas analíticas de la cartelera',
  '/api/watchlist':       'Listar watchlist (GET)',
  '/api/watchlist/toggle': 'Añadir/quitar película de la watchlist',
  '/api/proxy-image':     'Proxy de imágenes para evitar CORS en Canvas',
  '/api/context':         'Contexto completo de la app (este agente)',
};

// ──────────────────────────────────────────────
// Definición de pestañas (manual, refleja App.jsx)
// ──────────────────────────────────────────────
const tabs = [
  { id: 'billboard',   icon: '🎬', name: 'Cartelera',   always: true  },
  { id: 'social',      icon: '🌐', name: 'Social',      always: true  },
  { id: 'upcoming',    icon: '🔔', name: 'Estrenos',    always: true  },
  { id: 'stats',       icon: '📊', name: 'Stats',       always: true  },
  { id: 'my-ratings',  icon: '⭐', name: 'Mis Ratings', always: true  },
  { id: 'watchlist',   icon: '❤️', name: 'Cine-Match',  always: false, condition: 'Al menos 2 usuarios han dado like a la misma película' },
  { id: 'memories',   icon: '📸', name: 'Recuerdos',   always: false, condition: 'Al menos un rating tiene fotos adjuntas' },
];

// ──────────────────────────────────────────────
// Estado global de App.jsx
// ──────────────────────────────────────────────
const appStateVars = [
  { name: 'currentTab',    desc: 'Pestaña activa actualmente (string)' },
  { name: 'currentUser',   desc: 'Usuario autenticado (objeto o null)' },
  { name: 'movies',        desc: 'Array de películas de la cartelera' },
  { name: 'ratingsList',   desc: 'Array de todas las valoraciones guardadas' },
  { name: 'watchlist',     desc: 'Array de items de watchlist (likes)' },
  { name: 'selectedMovie', desc: 'Película seleccionada para abrir el BottomSheet' },
  { name: 'isLoading',     desc: 'Indicador de carga de la cartelera' },
];

// ──────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────
(function main() {
  console.log('🤖 CineGlow — Agente de Contextos iniciando...\n');

  // ── Generar agents.md siempre ───────────────
  const agentsPath = path.join(ROOT, 'agents.md');
  const agentsData = extractAgentsInfo();
  const agentsMd   = generateAgentsMd(agentsData);
  fs.writeFileSync(agentsPath, agentsMd, 'utf-8');
  console.log(`✅ agents.md generado → ${agentsPath}`);
  console.log(`   📄 ${agentsMd.split('\n').length} líneas escritas\n`);

  // ── Si --agents-only, terminar aquí ─────────
  if (agentsOnly) {
    console.log('🤖 Modo --agents-only: solo se generó agents.md. ¡Listo!');
    return;
  }

  // ── Componentes ─────────────────────────────
  const componentFiles = listFiles(path.join(CLIENT_SRC, 'components'), '.jsx');
  const appFile = path.join(CLIENT_SRC, 'App.jsx');
  const allJsxFiles = [appFile, ...componentFiles];
  const components = allJsxFiles.map(extractComponentInfo);

  // ── Endpoints ───────────────────────────────
  const serverCode = readFileSafe(SERVER_FILE) || '';
  const endpoints = extractEndpoints(serverCode);

  // ── Base de datos ───────────────────────────
  const db = analyzeDb();

  // ── Dependencias ────────────────────────────
  const clientDeps = readDependencies(path.join(ROOT, 'client', 'package.json'));
  const serverDeps = readDependencies(path.join(ROOT, 'server', 'package.json'));

  const data = { components, endpoints, db, clientDeps, serverDeps, tabs, appStateVars };

  // ── Generar context.md ───────────────────────
  const markdown = generateMarkdown(data);
  fs.writeFileSync(outputPath, markdown, 'utf-8');
  console.log(`✅ context.md generado → ${outputPath}`);
  console.log(`   📄 ${markdown.split('\n').length} líneas escritas\n`);

  // ── Generar JSON si se pidió ─────────────────
  if (generateJson) {
    const jsonPath = outputPath.replace(/\.md$/, '.json');
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✅ context.json generado → ${jsonPath}`);
  }

  // ── Resumen rápido en consola ────────────────
  if (db) {
    console.log('📊 Resumen de la Base de Datos:');
    console.log(`   👥 Usuarios: ${db.users.length}`);
    console.log(`   ⭐ Valoraciones: ${db.totalRatings}`);
    console.log(`   📸 Fotos: ${db.photosTotal}`);
    console.log(`   ❤️  Watchlist items: ${db.watchlistItems}`);
    console.log(`   🎯 Cine-Matches: ${db.cineMatches}`);
    console.log(`   💾 Tamaño DB: ${db.dbSizeKb}KB\n`);
  }
  console.log(`🧩 Componentes analizados: ${components.length}`);
  console.log(`🌐 Endpoints encontrados: ${endpoints.length}`);
  console.log(`\n🎬 ¡Listo! Pega el contenido de context.md en tu próxima sesión de IA.`);
})();
