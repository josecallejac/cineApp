---
description: Inicializa la sesión, lee el último estado guardado y propone con qué continuar
---

# /iniciar — Apertura de sesión y sincronización de estado

Al iniciar una nueva sesión (cuando el usuario escriba `/iniciar`, `/abrir` o al comenzar un nuevo hilo), realiza los siguientes pasos en orden:

## 1. Leer el estado vivo y la memoria del proyecto

1. Abre y lee el archivo `estado-proyecto.md` (en la raíz del repo) para entender en qué quedó la última sesión. Si no existe todavía, indícalo (aún no se ha cerrado ninguna sesión con `/cerrar`).
2. Consulta el log de Git (`git log -1`) para verificar el último commit y compararlo con el ancla del último cierre. Revisa también la rama actual y `git status`.
3. Lee `MEMORY.md` del proyecto (`C:\Users\joseu\.claude\projects\E--gravityCine\memory\MEMORY.md`) si existe, para recuperar contexto persistente.

## 2. Reportar resumen de la última sesión

Presenta al usuario un resumen directo con:
- La fecha del último cierre registrado y el commit de referencia (del ancla en `estado-proyecto.md`).
- Qué se completó en la sesión anterior.
- Rama actual y si hay cambios sin commitear.
- Estado de las memorias clave si aplica.

Si el commit del ancla no coincide con `git log -1`, avísale al usuario que la memoria podría estar desactualizada respecto al código.

## 3. Recomendaciones y Siguientes Pasos

Propón una lista priorizada de 2 o 3 tareas concretas para continuar hoy, ordenadas por relevancia, según `estado-proyecto.md`. Por ejemplo:
- Features de cartelera pendientes (migración/ajustes de la API GraphQL de Cinépolis, enriquecimiento TMDB).
- Tests del server pendientes de correr o arreglar (`cd server && npm test`).
- Validaciones de build/lint (`npm run build`, `cd client && npm run lint`) o del deploy en Railway.

---

*Este comando ayuda a retomar el contexto rápidamente y evitar duplicar esfuerzos entre sesiones.*
