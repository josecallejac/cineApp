# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CineGlow — a mobile-first web app (PWA-like, also wrapped with Capacitor for Android/iOS) for couples to track movie dates. It consumes the live Cinépolis Chile "Sector Oriente" (Santiago) billboard and adds ratings, date invitations, surprise envelopes, photo memories, watchlist matching, and couple stats. UI text and code comments are in Spanish.

## Commands

Run from the repo root unless noted:

```bash
npm run install:all   # install root + server + client deps
npm run dev           # runs server (port 3001) + Vite client (port 5173) concurrently
npm run server        # backend only: node server/server.js
npm run client        # frontend only: vite dev server
npm run build         # installs client deps and builds client to client/dist
npm run context       # regenerates context.md / agents.md via generate-context.js
npm start             # production start (what Railway runs): node server/server.js
```

- Tests (server only): `cd server && npm test` — uses `node --test database.test.js`, the single test file. There is no client test suite.
- Lint (client only): `cd client && npm run lint`.

## Architecture

Three-part monorepo with nested npm packages (root, `client/`, `server/`), no workspaces — each has its own `node_modules`. Quirks: the root `postinstall` installs server deps (so a bare `npm install` at the root prepares the backend, as Railway does), and `client/package.json` depends on the root package via `"cineglow-mobile": "file:.."` to reach the Capacitor packages installed at the root.

**Server (`server/`)** — Express (CommonJS), two files:
- `server.js`: all REST endpoints under `/api/*` (auth, billboard, ratings, watchlist, envelopes, appointments, notifications, users/link, stats, diagnostics). It proxies/scrapes the Cinépolis Chile API (`cinepolischile.cl`) for the live billboard, enriches posters via TMDB with an in-memory cache, proxies external poster images through `/api/proxy-image` (host-allowlisted, disk-cached in `server/cache/`), and serves the built client from `client/dist` with an SPA catch-all. `/api/upcoming` is NOT scraped — it serves the hardcoded `UPCOMING_MOVIES` array in `server.js`; edit that array to change upcoming releases.
- `database.js`: flat-file JSON "database" held in memory and persisted to `server/db.json` with debounced async atomic writes (`db.test.json` when `NODE_ENV=test`; a Railway volume when `RAILWAY_VOLUME_PATH` is set). All data access goes through this module's exported functions — no SQL, no ORM. Passwords are bcrypt-hashed (with transparent migration of legacy plaintext on login). Rating photos are stored as files under `photos/` (volume in prod) and referenced as `/photos/<file>` URLs, never as base64 in the JSON (`initDb` migrates legacy base64 photos to files).
- Auth: login/register return an HMAC-signed token (`SESSION_SECRET` env var; random per boot if unset; 30-day TTL) and are rate-limited per IP. All `/api/*` endpoints except auth/billboard/upcoming/stats/proxy-image require `Authorization: Bearer <token>`, and endpoints validate that client-supplied `userId` matches the token owner (`assertSelf`). The client injects the token via a global fetch interceptor in `client/src/config.js`, which also auto-logs-out on 401.
- The Cinépolis scrape is cached in memory with a 10-minute TTL (shared by `/api/billboard` and `/api/stats`); TMDB poster lookups run in parallel and are cached by movie key.

**Client (`client/`)** — React 18 + Vite, vanilla CSS (glassmorphism/dark theme via CSS variables in `App.css`/`index.css`), no router and no state library:
- `App.jsx` owns all global state (currentUser, movies, ratingsList, watchlist, partnerUser, currentTab, notifications) and passes it down as props. Tab switching is a string state, not routing. Heavy/conditional views (MovieBottomSheet, DuoTab, WatchlistTab, MemoryGalleryTab) are lazy-loaded. Notifications poll every 30s, paused while the tab is hidden.
- **Partner linking is the core domain concept**: `/api/users/link` connects two accounts, which unlocks watchlist matches ("Cine-Match"), the Duo tab, partner notifications, envelopes, and appointments. Unlinking clears matches.
- Tabs are rendered by `App.jsx` and their visibility is controlled by `BottomTabBar` props: `billboard`, `social`, `upcoming`, and `my-ratings` are always present; `watchlist` appears only when a Cine-Match exists; `duo` appears only when a partner is linked; `memories` appears only when photo memories exist AND no partner is linked (DuoTab supersedes it). `App.jsx` auto-redirects away from a conditional tab if its precondition disappears.
- `MyRatingsTab` is itself a mini tab host: it embeds `AppointmentsTab` (scheduled dates) and `SavedEnvelopesTab` (saved surprise-date ideas) as internal sub-views.
- `MovieBottomSheet.jsx` is by far the largest component (~2.5k lines) and handles the entire rate/photo/schedule/invite/surprise-envelope flow for a selected movie.
- API base URL comes from `client/src/config.js` (`VITE_API_URL` env var in production, `http://localhost:3001` in dev). Use `API_BASE_URL` for new fetches, and `resolveAssetUrl()` for `/photos/...` URLs.

**Deployment**: Railway runs the Express server, which serves both the API and the built client. `db.json` persists on a Railway volume. Capacitor (`capacitor.config.json`, `android/`, `ios/`) wraps `client/dist` for native builds.

## Generated context docs

`generate-context.js` scans the codebase and writes `context.md` (full project snapshot: tabs, components, endpoints, DB schema) and `agents.md`. These are useful references but can be stale — trust the code over them. Regenerate with `npm run context` after significant changes.
