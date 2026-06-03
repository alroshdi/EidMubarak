# AGENTS.md

## Cursor Cloud specific instructions

### Product

Single-package **Eid Al Adha** celebration SPA (React 19 + Vite 8 + Tailwind 4 + Framer Motion). No backend, database, or Docker services.

### Commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (default `http://localhost:5173`) |
| Production build | `npm run build` |
| Preview build | `npm run preview` (run after `build`) |
| Lint | `npm run lint` |

There is **no** `test` script (no Vitest/Jest/Playwright in repo).

### Running the dev server

Use a dedicated tmux session so the process stays available across shell commands:

```bash
SESSION_NAME="vite-dev-server"
tmux -f /exec-daemon/tmux.portal.conf has-session -t "=$SESSION_NAME" 2>/dev/null \
  || tmux -f /exec-daemon/tmux.portal.conf new-session -d -s "$SESSION_NAME" -c "/workspace" -- "${SHELL:-bash}" -l
tmux -f /exec-daemon/tmux.portal.conf send-keys -t "$SESSION_NAME:0.0" \
  'cd /workspace && npm run dev -- --host 0.0.0.0 --port 5173' C-m
```

For browser testing from the VM, bind to `0.0.0.0` as above.

### Media assets

Sheep/moon images and `takbeer.mp3` live under `public/assets/`. The app runs without them but images/audio will be missing.

### Lint caveat

`npm run lint` currently reports `react-hooks/purity` errors in `src/components/StarsBackground.jsx` (`Math.random` during render). The production build (`npm run build`) still succeeds.

### Hello-world verification

1. Open `http://127.0.0.1:5173/`
2. Toggle **EN** / **عربي** and confirm copy + `dir` on the page change
3. Use **Play Takbeer** to exercise audio (browser autoplay policies may block until user gesture)
