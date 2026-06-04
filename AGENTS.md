# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Single-page React + Vite app (`eid`) — an Eid Al Adha celebration landing page with bilingual EN/AR UI, animations, and optional Takbeer audio. No backend, database, or Docker services.

### Services

| Service | Command | URL |
|---------|---------|-----|
| Dev server (required) | `npm run dev` | http://localhost:5173 |
| Production preview (optional) | `npm run preview` | http://localhost:4173 (after `npm run build`) |

### Common commands

See `package.json` scripts:

- **Install deps:** `npm install`
- **Lint:** `npm run lint` — may fail on pre-existing `react-hooks/purity` warnings in `src/components/StarsBackground.jsx` (`Math.random` during render)
- **Build:** `npm run build` → `dist/`
- **Dev:** `npm run dev`
- **Tests:** none configured (no `test` script)

### Media assets

Optional media lives under `public/assets/` (see `public/assets/README.md`). The app works without them but shows broken images/audio until files are added.

### Gotchas

- **No test suite** — validate with lint, build, and manual browser checks.
- **Lint is not clean** — 5 ESLint errors in `StarsBackground.jsx` are known; build still succeeds.
- **Audio autoplay** — browsers may block Takbeer autoplay until user interaction; the play/pause button still works.
- **Package manager** — use **npm** (`package-lock.json` present).
