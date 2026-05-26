# 🤖 CineGlow — Agentes de IA
> Generado automáticamente el **25-05-2026, 21:36:08** por `generate-context.js`

Este documento describe todos los agentes de inteligencia artificial que forman parte del ecosistema CineGlow.

---

## Índice
- [🤖 Agente de Contextos](#agente-de-contextos)
- [💳 LoyaltyBookingAgent](#loyaltybookingagent)
- [📸 Gallery Builder Agent](#gallery-builder-agent)

---

## 🤖 Agente de Contextos

| Campo | Valor |
|-------|-------|
| **Tipo** | Script Node.js |
| **Archivo** | `generate-context.js` |

**Propósito:**
Escanea toda la app CineGlow y genera context.md y agents.md con el estado actual del proyecto: componentes, endpoints, base de datos, características y pendientes. Ideal para retomar sesiones de IA.

**Cómo ejecutar:**
```bash
node generate-context.js              → genera context.md
node generate-context.js --json       → también genera context.json
node generate-context.js --agents-only → solo genera agents.md
npm run context                        → alias desde la raíz
GET http://localhost:3001/api/context  → vía API REST
```

**Salidas:**
- context.md
- agents.md

**Herramientas disponibles:**
`fs (Node.js)`, `path (Node.js)`, `child_process (Node.js)`

---

## 💳 LoyaltyBookingAgent

| Campo | Valor |
|-------|-------|
| **Tipo** | Antigravity Custom Agent |
| **Archivo** | `.agents/agents/LoyaltyBookingAgent/agent.json` |

**Propósito:**
Guardián del sistema de lealtad y reservas de CineGlow (Fase 3 - Simulador de Butacas VIP y Fase 5 - GlowPoints + Dulcería Virtual). Almacena el código completo de estas features desactivadas y puede restaurarlas cuando el usuario lo decida.

**Cómo ejecutar:**
- Invocar desde Antigravity CLI: "@LoyaltyBookingAgent restaura la Fase 3"

**Salidas:**
- SeatMap.jsx restaurado
- MyRatingsTab.jsx con GlowPoints
- App.jsx actualizado

**Herramientas disponibles:**
`write_to_file`, `replace_file_content`, `run_command`, `view_file`

---

## 📸 Gallery Builder Agent

| Campo | Valor |
|-------|-------|
| **Tipo** | Antigravity Custom Agent |
| **Archivo** | `.agents/agents/gallery_builder/agent.json` |

**Propósito:**
Construyó el componente MemoryGalleryTab.jsx — la Galería de Recuerdos premium con timeline cronológico, lightbox de pantalla completa y sistema de fotos comprimidas. Puede regenerar o extender la galería.

**Cómo ejecutar:**
- Invocar desde Antigravity CLI: "@gallery_builder mejora la galería"

**Salidas:**
- MemoryGalleryTab.jsx

**Herramientas disponibles:**
`write_to_file`, `replace_file_content`, `view_file`, `run_command`

---

