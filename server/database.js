const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const BCRYPT_ROUNDS = 10;

// ¿El valor almacenado ya es un hash bcrypt?
function isBcryptHash(value) {
  return typeof value === 'string' && /^\$2[aby]\$/.test(value);
}

const dbFilename = process.env.NODE_ENV === 'test' ? 'db.test.json' : 'db.json';
const dbPath = process.env.RAILWAY_VOLUME_PATH 
  ? path.join(process.env.RAILWAY_VOLUME_PATH, dbFilename)
  : path.join(__dirname, dbFilename);

// Asegurarse de que el directorio padre de dbPath exista
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Directorio de fotos de recuerdos: las imágenes se guardan como archivos
// (no como base64 dentro de db.json) y se sirven vía /photos/<archivo>
const photosDir = process.env.RAILWAY_VOLUME_PATH
  ? path.join(process.env.RAILWAY_VOLUME_PATH, 'photos')
  : path.join(__dirname, 'photos');
if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
}

// Convierte un data URI base64 en archivo dentro de photosDir y retorna su URL pública.
// Las URLs ya existentes (http/https o /photos/...) se retornan intactas.
function persistPhoto(photo, hint) {
  if (typeof photo !== 'string' || !photo.startsWith('data:')) return photo;
  const match = photo.match(/^data:image\/(\w+);base64,(.+)$/s);
  if (!match) return null;
  const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
  const filename = `${hint}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
  fs.writeFileSync(path.join(photosDir, filename), Buffer.from(match[2], 'base64'));
  return `/photos/${filename}`;
}

// Cuentas demo predeterminadas
const defaultUsers = [
  {
    id: "user_palomero",
    username: "palomero",
    password: "123",
    name: "Palomero VIP",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=palomero",
    joinedAt: new Date().toISOString(),
    points: 150,
    level: 1
  },
  {
    id: "user_cinefilo",
    username: "cinefilo",
    password: "123",
    name: "Cinéfilo Pro",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=cinefilo",
    joinedAt: new Date().toISOString(),
    points: 450,
    level: 2
  },
  {
    id: "user_critico",
    username: "critico",
    password: "123",
    name: "Crítico Experto",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=critico",
    joinedAt: new Date().toISOString(),
    points: 920,
    level: 4
  }
];

// Función para inicializar la base de datos si no existe
function initDb() {
  if (!fs.existsSync(dbPath)) {
    const defaultDb = {
      users: defaultUsers,
      ratings: [],
      watchlist: [],
      envelopes: [],
      appointments: [],
      notifications: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2), 'utf-8');
    console.log("Base de datos db.json inicializada y sembrada con éxito.");
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      let modified = false;
      
      // Migrar base de datos si tiene profiles viejos
      if (data.profiles) {
        delete data.profiles;
        modified = true;
      }
      if (!data.users) {
        data.users = defaultUsers;
        modified = true;
      } else if (data.users.length === 0) {
        data.users = defaultUsers;
        modified = true;
      }
      if (!data.ratings) {
        data.ratings = [];
        modified = true;
      }
      if (!data.watchlist) {
        data.watchlist = [];
        modified = true;
      }
      if (!data.envelopes) {
        data.envelopes = [];
        modified = true;
      }
      if (!data.appointments) {
        data.appointments = [];
        modified = true;
      }
      if (!data.notifications) {
        data.notifications = [];
        modified = true;
      }

      // Migrar fotos base64 heredadas dentro de db.json a archivos en photosDir
      (data.ratings || []).forEach(r => {
        if (r.photos && r.photos.some(p => typeof p === 'string' && p.startsWith('data:'))) {
          r.photos = r.photos.map(p => persistPhoto(p, 'rating')).filter(Boolean);
          modified = true;
        }
      });

      if (modified) {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
      }
    } catch (e) {
      console.error("Error leyendo db.json, recreando...", e);
      const defaultDb = {
        users: defaultUsers,
        ratings: [],
        watchlist: [],
        envelopes: [],
        appointments: [],
        notifications: []
      };
      fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2), 'utf-8');
    }
  }
}

// --- Persistencia: la DB vive en memoria y se escribe a disco de forma
// asíncrona con debounce (evita I/O síncrono bloqueante y race conditions
// de lecturas/escrituras de archivo completo por operación) ---

let dbCache = null;
let writeTimer = null;
let writeInFlight = false;
let writeQueued = false;

// Cargar base de datos (desde memoria; solo lee disco la primera vez)
function loadDb() {
  if (!dbCache) {
    initDb();
    dbCache = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  }
  return dbCache;
}

// Escritura atómica a disco (archivo temporal + rename)
function flushToDisk() {
  if (!dbCache) return;
  if (writeInFlight) {
    writeQueued = true;
    return;
  }
  writeInFlight = true;
  const tmpPath = dbPath + '.tmp';
  const payload = JSON.stringify(dbCache, null, 2);
  fs.writeFile(tmpPath, payload, 'utf-8', (err) => {
    if (err) {
      console.error('Error escribiendo db temporal:', err.message);
      writeInFlight = false;
      return;
    }
    fs.rename(tmpPath, dbPath, (renameErr) => {
      writeInFlight = false;
      if (renameErr) console.error('Error renombrando db:', renameErr.message);
      if (writeQueued) {
        writeQueued = false;
        flushToDisk();
      }
    });
  });
}

// Escritura síncrona (para tests y apagado del proceso)
function flushToDiskSync() {
  if (!dbCache) return;
  fs.writeFileSync(dbPath, JSON.stringify(dbCache, null, 2), 'utf-8');
}

// Guardar base de datos: actualiza memoria y agenda la escritura a disco
function saveDb(data) {
  dbCache = data;
  if (process.env.NODE_ENV === 'test') {
    // En tests la escritura es inmediata para que las aserciones lean el archivo
    flushToDiskSync();
    return;
  }
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(flushToDisk, 200);
}

// Garantizar que los cambios pendientes lleguen a disco al apagar el servidor
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    try { flushToDiskSync(); } catch (e) { console.error(e.message); }
    process.exit(0);
  });
}
process.on('beforeExit', () => {
  try { flushToDiskSync(); } catch (e) { console.error(e.message); }
});

// --- Autenticación ---

// Registrar un nuevo usuario
function registerUser(username, password, name) {
  const db = loadDb();
  
  if (!username || !password || !name) {
    throw new Error("Todos los campos (usuario, contraseña y nombre) son obligatorios.");
  }

  const cleanUsername = username.trim().toLowerCase();
  
  // Verificar si ya existe el usuario
  const exists = db.users.some(u => u.username === cleanUsername);
  if (exists) {
    throw new Error("El nombre de usuario ya está registrado.");
  }

  const newUser = {
    id: 'user_' + Date.now(),
    username: cleanUsername,
    password: bcrypt.hashSync(password.trim(), BCRYPT_ROUNDS),
    name: name.trim(),
    avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${cleanUsername}`,
    joinedAt: new Date().toISOString(),
    points: 100,
    level: 1
  };

  db.users.push(newUser);
  saveDb(db);

  // Retornar sin password por seguridad
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

// Iniciar sesión
function loginUser(username, password) {
  const db = loadDb();
  
  if (!username || !password) {
    throw new Error("Usuario y contraseña requeridos.");
  }

  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();
  const user = db.users.find(u => u.username === cleanUsername);

  let valid = false;
  if (user) {
    if (isBcryptHash(user.password)) {
      valid = bcrypt.compareSync(cleanPassword, user.password);
    } else if (user.password === cleanPassword) {
      // Migración transparente: cuentas antiguas con contraseña en texto plano
      valid = true;
      user.password = bcrypt.hashSync(cleanPassword, BCRYPT_ROUNDS);
      saveDb(db);
    }
  }

  if (!valid) {
    throw new Error("Credenciales inválidas. Revisa tu usuario y contraseña.");
  }

  // Retornar sin password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// --- Valoraciones ---

// Obtener todas las valoraciones
function getRatings() {
  return loadDb().ratings;
}

// Obtener valoraciones de una película específica
function getMovieRatings(movieKey) {
  const db = loadDb();
  return db.ratings.filter(r => r.movieKey === movieKey);
}

// Agregar o actualizar una valoración de usuario
function addRating(ratingData) {
  const db = loadDb();
  const { userId, movieKey, movieTitle, score, comment, watchedAt, cinemaName, menuOption, moodOption, photos } = ratingData;

  // Validaciones
  if (!userId || !movieKey || !movieTitle || typeof score !== 'number' || score < 1 || score > 5) {
    throw new Error("Datos de valoración inválidos.");
  }

  // Buscar el usuario en la base de datos
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  // Buscar si ya existe una valoración de este usuario para esta película
  const existingIndex = db.ratings.findIndex(r => r.userId === userId && r.movieKey === movieKey);
  const existingRating = existingIndex >= 0 ? db.ratings[existingIndex] : null;

  const newRating = {
    id: existingRating ? existingRating.id : 'rating_' + Date.now(),
    userId,
    author: user.name,
    avatar: user.avatar,
    movieKey,
    movieTitle,
    score,
    comment: comment || "",
    // Si ya existe fecha, cine, comida o mood registrados, los preservamos intactos (Cápsula del Tiempo)
    watchedAt: (existingRating && existingRating.watchedAt) ? existingRating.watchedAt : (watchedAt || null),
    cinemaName: (existingRating && existingRating.cinemaName) ? existingRating.cinemaName : (cinemaName || null),
    menuOption: (existingRating && existingRating.menuOption) ? existingRating.menuOption : (menuOption || null),
    moodOption: (existingRating && existingRating.moodOption) ? existingRating.moodOption : (moodOption || null),
    photos: (existingRating && existingRating.photos && existingRating.photos.length > 0)
      ? existingRating.photos
      : (photos || []).map(p => persistPhoto(p, 'rating')).filter(Boolean),
    timestamp: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    db.ratings[existingIndex] = newRating; // Actualizar
  } else {
    db.ratings.push(newRating); // Insertar
    user.points = (user.points || 0) + 50;
    user.level = Math.floor(user.points / 300) + 1;
  }

  saveDb(db);
  return newRating;
}

// Añadir puntos a un usuario (por ejemplo, al simular reserva de butacas)
function addPoints(userId, amount) {
  const db = loadDb();
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }
  
  user.points = (user.points || 0) + amount;
  user.level = Math.floor(user.points / 300) + 1;
  
  saveDb(db);
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Obtener resumen estadístico de ratings por película
function getMovieRatingSummary(movieKey) {
  const ratings = getMovieRatings(movieKey);
  if (ratings.length === 0) {
    return {
      average: 0,
      count: 0,
      starsDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }

  const sum = ratings.reduce((acc, curr) => acc + curr.score, 0);
  const average = parseFloat((sum / ratings.length).toFixed(1));

  const starsDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratings.forEach(r => {
    if (starsDistribution[r.score] !== undefined) {
      starsDistribution[r.score]++;
    }
  });

  return {
    average,
    count: ratings.length,
    starsDistribution
  };
}

// --- Watchlist & Cine-Match ---

// Obtener likes de la watchlist
function getWatchlist() {
  const db = loadDb();
  return db.watchlist || [];
}

// Conmutar (like/dislike) una película de la watchlist
function toggleWatchlist(userId, movieKey) {
  const db = loadDb();
  if (!db.watchlist) db.watchlist = [];

  const existingIndex = db.watchlist.findIndex(w => w.userId === userId && w.movieKey === movieKey);
  let isLiked = false;

  if (existingIndex >= 0) {
    db.watchlist.splice(existingIndex, 1); // Dislike
  } else {
    db.watchlist.push({
      id: 'wl_' + Date.now(),
      userId,
      movieKey,
      likedAt: new Date().toISOString()
    });
    isLiked = true;
  }

  saveDb(db);

  // Comprobar si se convirtió en un Match de pareja (si su pareja vinculada también le dio like)
  let hasMatch = false;
  const user = db.users.find(u => u.id === userId);
  if (user && user.partnerId) {
    hasMatch = db.watchlist.some(w => w.userId === user.partnerId && w.movieKey === movieKey) && isLiked;
  } else {
    // Si no está vinculado, usar el comportamiento anterior (cualquier otro like)
    const otherLikes = db.watchlist.filter(w => w.userId !== userId && w.movieKey === movieKey).length;
    hasMatch = otherLikes >= 1 && isLiked;
  }

  return { isLiked, hasMatch };
}

// --- Sobres Sorpresa ---

// Guardar un sobre recibido tras calificar
function saveEnvelope({ userId, ideaIndex, emoji, text, tip, movieTitle, movieKey }) {
  const db = loadDb();
  if (!db.envelopes) db.envelopes = [];

  const envelope = {
    id: 'env_' + Date.now(),
    userId,
    ideaIndex,
    emoji,
    text,
    tip,
    movieTitle,
    movieKey,
    receivedAt: new Date().toISOString(),
    isUsed: false,
    usedAt: null
  };

  db.envelopes.push(envelope);
  saveDb(db);
  return envelope;
}

// Obtener todos los sobres de un usuario (más reciente primero)
function getUserEnvelopes(userId) {
  const db = loadDb();
  return (db.envelopes || [])
    .filter(e => e.userId === userId)
    .sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
}

// Marcar un sobre como "idea usada"
function markEnvelopeUsed(id) {
  const db = loadDb();
  if (!db.envelopes) db.envelopes = [];
  const envelope = db.envelopes.find(e => e.id === id);
  if (!envelope) throw new Error('Sobre no encontrado.');
  envelope.isUsed = true;
  envelope.usedAt = new Date().toISOString();
  saveDb(db);
  return envelope;
}

// --- Calendario de Citas ---

// Crear una cita nueva
function createAppointment({ userId, title, movieTitle, movieKey, date, cinemaName, menuOption, notes }) {
  const db = loadDb();
  if (!db.appointments) db.appointments = [];

  const appointment = {
    id: 'apt_' + Date.now(),
    userId,
    title,
    movieTitle,
    movieKey,
    date,
    cinemaName,
    menuOption,
    notes,
    createdAt: new Date().toISOString()
  };

  db.appointments.push(appointment);
  saveDb(db);
  return appointment;
}

// Obtener las citas del usuario y de su pareja vinculada (ordenadas por fecha)
function getUserAppointments(userId) {
  const db = loadDb();
  const user = db.users.find(u => u.id === userId);
  const allowedIds = new Set([userId]);
  if (user && user.partnerId) {
    allowedIds.add(user.partnerId);
  }
  return (db.appointments || [])
    .filter(a => allowedIds.has(a.userId))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Eliminar una cita
function deleteAppointment(id) {
  const db = loadDb();
  if (!db.appointments) db.appointments = [];
  const index = db.appointments.findIndex(a => a.id === id);
  if (index === -1) throw new Error('Cita no encontrada.');
  const deleted = db.appointments.splice(index, 1)[0];
  saveDb(db);
  return deleted;
}

// --- Notificaciones ---

// Crear una notificación nueva
function createNotification({ userId, senderId, senderName, senderAvatar, type, title, message }) {
  const db = loadDb();
  if (!db.notifications) db.notifications = [];

  const notification = {
    id: 'not_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    userId,
    senderId,
    senderName,
    senderAvatar,
    type,
    title,
    message,
    read: false,
    createdAt: new Date().toISOString()
  };

  db.notifications.push(notification);
  saveDb(db);
  return notification;
}

// Obtener todas las notificaciones de un usuario
function getUserNotifications(userId) {
  const db = loadDb();
  return (db.notifications || [])
    .filter(n => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Marcar todas las notificaciones de un usuario como leídas
function markNotificationsAsRead(userId) {
  const db = loadDb();
  if (!db.notifications) db.notifications = [];
  
  db.notifications.forEach(n => {
    if (n.userId === userId) {
      n.read = true;
    }
  });
  
  saveDb(db);
  return { success: true };
}

// Vincular dos usuarios (Duo de Pareja)
function linkUsers(userId, partnerUsername) {
  const db = loadDb();
  
  const user = db.users.find(u => u.id === userId);
  if (!user) {
    throw new Error("Usuario actual no encontrado.");
  }

  if (!partnerUsername || !partnerUsername.trim()) {
    throw new Error("El nombre de usuario de la pareja es obligatorio.");
  }

  const cleanPartnerName = partnerUsername.trim().toLowerCase();
  
  if (user.username === cleanPartnerName) {
    throw new Error("No puedes vincularte contigo mismo.");
  }

  const partner = db.users.find(u => u.username === cleanPartnerName);
  if (!partner) {
    throw new Error(`El usuario "${partnerUsername}" no existe. Pídele que se registre primero.`);
  }

  // Vincular perfiles mutuamente
  user.partnerId = partner.id;
  partner.partnerId = user.id;

  saveDb(db);

  return {
    success: true,
    partner: {
      id: partner.id,
      name: partner.name,
      username: partner.username,
      avatar: partner.avatar
    }
  };
}

// Obtener datos de la pareja vinculada
function getPartner(userId) {
  const db = loadDb();
  const user = db.users.find(u => u.id === userId);
  if (!user || !user.partnerId) return null;
  
  const partner = db.users.find(u => u.id === user.partnerId);
  if (!partner) return null;

  return {
    id: partner.id,
    name: partner.name,
    username: partner.username,
    avatar: partner.avatar
  };
}

// Desvincular pareja
function unlinkUsers(userId) {
  const db = loadDb();
  const user = db.users.find(u => u.id === userId);
  if (!user) return { success: false };

  if (user.partnerId) {
    const partner = db.users.find(u => u.id === user.partnerId);
    if (partner) {
      delete partner.partnerId;
    }
    delete user.partnerId;
  }
  
  saveDb(db);
  return { success: true };
}

module.exports = {
  registerUser,
  loginUser,
  getRatings,
  getMovieRatings,
  addRating,
  addPoints,
  getMovieRatingSummary,
  getWatchlist,
  toggleWatchlist,
  saveEnvelope,
  getUserEnvelopes,
  markEnvelopeUsed,
  createAppointment,
  getUserAppointments,
  deleteAppointment,
  createNotification,
  getUserNotifications,
  markNotificationsAsRead,
  linkUsers,
  getPartner,
  unlinkUsers,
  photosDir
};

// Inicializar la base de datos inmediatamente al importar el módulo
initDb();
