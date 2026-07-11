const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// Asegurar que estamos en entorno de prueba
process.env.NODE_ENV = 'test';

const dbPath = path.join(__dirname, 'db.test.json');

// Helper para limpiar la base de datos de prueba
function cleanup() {
  if (fs.existsSync(dbPath)) {
    try {
      fs.unlinkSync(dbPath);
    } catch (e) {
      console.error("Error limpiando db.test.json:", e);
    }
  }
}

// Limpiar antes de requerir la base de datos para que se inicialice y siembre limpia
cleanup();

const database = require('./database');

test.describe('CineGlow Database Unit Tests', () => {
  
  // Limpieza final al acabar todas las pruebas
  test.after(() => cleanup());

  test.describe('Autenticación y Gestión de Usuarios', () => {
    
    test('Debería inicializar la base de datos con los usuarios demo', () => {
      assert.strictEqual(fs.existsSync(dbPath), true, 'El archivo db.test.json debería existir');
      
      const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      assert.ok(db.users, 'Debería contener la tabla users');
      assert.ok(db.users.length >= 3, 'Debería haber al menos 3 usuarios demo');
      
      const palomero = db.users.find(u => u.username === 'palomero');
      assert.ok(palomero, 'Debería contener el usuario palomero');
      assert.strictEqual(palomero.name, 'Palomero VIP');
    });

    test('Debería registrar un nuevo usuario con éxito', () => {
      const newUser = database.registerUser('testuser', 'pass123', 'Test User');
      
      assert.ok(newUser.id, 'El usuario registrado debería tener un ID generado');
      assert.strictEqual(newUser.username, 'testuser');
      assert.strictEqual(newUser.name, 'Test User');
      assert.ok(newUser.avatar, 'El usuario debería tener un avatar autogenerado');
      assert.strictEqual(newUser.password, undefined, 'No debería retornar la contraseña por seguridad');

      // Verificar en disco
      const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      const dbUser = db.users.find(u => u.username === 'testuser');
      assert.ok(dbUser, 'El usuario debería guardarse en db.test.json');
      assert.notStrictEqual(dbUser.password, 'pass123', 'La contraseña NO debería almacenarse en texto plano');
      assert.match(dbUser.password, /^\$2[aby]\$/, 'La contraseña debería almacenarse como hash bcrypt');
    });

    test('Debería arrojar un error al registrar un usuario duplicado', () => {
      assert.throws(() => {
        database.registerUser('testuser', 'pass999', 'Duplicate User');
      }, /El nombre de usuario ya está registrado/);
    });

    test('Debería arrojar un error al registrar con datos vacíos', () => {
      assert.throws(() => {
        database.registerUser('', 'pass', 'Name');
      }, /Todos los campos/);
    });

    test('Debería iniciar sesión correctamente con credenciales válidas', () => {
      const user = database.loginUser('testuser', 'pass123');
      
      assert.ok(user.id);
      assert.strictEqual(user.username, 'testuser');
      assert.strictEqual(user.password, undefined);
    });

    test('Debería arrojar un error al iniciar sesión con contraseña incorrecta', () => {
      assert.throws(() => {
        database.loginUser('testuser', 'wrongpass');
      }, /Credenciales inválidas/);
    });

    test('Debería arrojar un error al iniciar sesión con usuario inexistente', () => {
      assert.throws(() => {
        database.loginUser('ghostuser', 'pass123');
      }, /Credenciales inválidas/);
    });
  });

  test.describe('Valoraciones de Películas (Ratings)', () => {
    
    test('Debería agregar una valoración exitosamente', () => {
      // Registrar valoración del usuario demo "palomero" (id: user_palomero)
      const rating = database.addRating({
        userId: 'user_palomero',
        movieKey: 'michael',
        movieTitle: 'Michael',
        score: 5,
        comment: 'Una película biográfica increíble'
      });

      assert.ok(rating.id);
      assert.strictEqual(rating.userId, 'user_palomero');
      assert.strictEqual(rating.movieKey, 'michael');
      assert.strictEqual(rating.score, 5);
      assert.strictEqual(rating.author, 'Palomero VIP');
      assert.ok(rating.timestamp);

      // Verificar en la lista global de ratings
      const allRatings = database.getRatings();
      assert.ok(allRatings.some(r => r.id === rating.id));
    });

    test('Debería actualizar una valoración existente si el mismo usuario califica la misma película', () => {
      const allRatingsBefore = database.getRatings().length;

      // Volver a valorar la misma película con diferente puntuación y comentario
      const updatedRating = database.addRating({
        userId: 'user_palomero',
        movieKey: 'michael',
        movieTitle: 'Michael',
        score: 4,
        comment: 'Pensándolo mejor, un 4. Sigue siendo muy buena.'
      });

      const allRatingsAfter = database.getRatings().length;
      
      assert.strictEqual(allRatingsAfter, allRatingsBefore, 'El número total de valoraciones no debería aumentar');
      assert.strictEqual(updatedRating.score, 4);
      assert.strictEqual(updatedRating.comment, 'Pensándolo mejor, un 4. Sigue siendo muy buena.');
    });

    test('Debería arrojar un error al valorar con una puntuación inválida', () => {
      assert.throws(() => {
        database.addRating({
          userId: 'user_palomero',
          movieKey: 'michael',
          movieTitle: 'Michael',
          score: 6, // Fuera del rango 1-5
          comment: 'Excesiva'
        });
      }, /Datos de valoración inválidos/);
    });

    test('Debería calcular el resumen de valoraciones correctamente', () => {
      // Agregar otra calificación de un usuario diferente
      database.addRating({
        userId: 'user_cinefilo',
        movieKey: 'michael',
        movieTitle: 'Michael',
        score: 2,
        comment: 'Regular'
      });

      // Calificaciones actuales para 'michael': 4 (palomero) y 2 (cinefilo) -> Promedio = 3.0, Total = 2
      const summary = database.getMovieRatingSummary('michael');

      assert.strictEqual(summary.count, 2);
      assert.strictEqual(summary.average, 3.0);
      assert.strictEqual(summary.starsDistribution[4], 1);
      assert.strictEqual(summary.starsDistribution[2], 1);
      assert.strictEqual(summary.starsDistribution[5], 0);
    });

    test('Debería retornar un resumen vacío para una película sin valoraciones', () => {
      const summary = database.getMovieRatingSummary('pelicula_fantasma');
      
      assert.strictEqual(summary.count, 0);
      assert.strictEqual(summary.average, 0);
      assert.strictEqual(summary.starsDistribution[1], 0);
    });
  });

  test.describe('Sobres Sorpresa (Envelopes)', () => {
    test('Debería guardar un sobre sorpresa correctamente', () => {
      const envData = {
        userId: 'user_palomero',
        ideaIndex: 2,
        emoji: '🌙',
        text: 'Elijan la función más tarde de la noche y salgan a caminar después.',
        tip: 'Las noches post-cine tienen magia propia.',
        movieTitle: 'Michael',
        movieKey: 'michael'
      };
      
      const savedEnv = database.saveEnvelope(envData);
      
      assert.ok(savedEnv.id, 'Debería generar un ID para el sobre');
      assert.strictEqual(savedEnv.userId, 'user_palomero');
      assert.strictEqual(savedEnv.text, envData.text);
      assert.strictEqual(savedEnv.isUsed, false);
      assert.ok(savedEnv.receivedAt);

      // Verificar en la lista de sobres del usuario
      const userEnvs = database.getUserEnvelopes('user_palomero');
      assert.ok(userEnvs.some(e => e.id === savedEnv.id), 'El sobre debería estar en la lista del usuario');
    });

    test('Debería marcar un sobre sorpresa como usado con éxito', () => {
      const userEnvs = database.getUserEnvelopes('user_palomero');
      const activeEnv = userEnvs.find(e => !e.isUsed);
      assert.ok(activeEnv, 'Debería haber un sobre activo');

      const updatedEnv = database.markEnvelopeUsed(activeEnv.id);
      
      assert.strictEqual(updatedEnv.isUsed, true);
      assert.ok(updatedEnv.usedAt);

      // Verificar que ya no aparezca como activo de la misma forma
      const refreshedEnvs = database.getUserEnvelopes('user_palomero');
      const found = refreshedEnvs.find(e => e.id === activeEnv.id);
      assert.strictEqual(found.isUsed, true);
    });
  });

  test.describe('Vínculo de Pareja (Duo / Linking)', () => {
    test('Debería vincular dos usuarios exitosamente y desvincularlos', () => {
      // Registrar un usuario extra para prueba de vínculo (username, password, name)
      database.registerUser('noviapruebas', 'password123', 'Novia de Pruebas');

      // Obtener el usuario registrado previamente en los tests de auth
      const user = database.loginUser('testuser', 'pass123');
      
      // Vincular testuser con noviapruebas
      const linkResult = database.linkUsers(user.id, 'noviapruebas');
      assert.strictEqual(linkResult.success, true);
      assert.ok(linkResult.partner);
      assert.strictEqual(linkResult.partner.username, 'noviapruebas');

      // Verificar que getPartner retorne a noviapruebas para testuser
      const partner = database.getPartner(user.id);
      assert.ok(partner);
      assert.strictEqual(partner.username, 'noviapruebas');

      // Desvincular
      const unlinkResult = database.unlinkUsers(user.id);
      assert.strictEqual(unlinkResult.success, true);

      // Verificar que getPartner retorne null
      const partnerAfter = database.getPartner(user.id);
      assert.strictEqual(partnerAfter, null);
    });

    test('Debería fallar si intenta vincularse consigo mismo o con usuario inexistente', () => {
      const user = database.loginUser('testuser', 'pass123');
      
      // Intentar vincularse consigo mismo
      assert.throws(() => {
        database.linkUsers(user.id, 'testuser');
      }, /No puedes vincularte contigo mismo/);

      // Intentar vincularse con inexistente
      assert.throws(() => {
        database.linkUsers(user.id, 'usuario_fantasma_999');
      }, /El usuario "usuario_fantasma_999" no existe/);
    });
  });
});
