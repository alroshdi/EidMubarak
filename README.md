# Eid Al Adha — Eid Mubarak

Cinematic Eid Al Adha landing page (React + Vite).

## Develop

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Open [alroshdis-projects on Vercel](https://vercel.com/alroshdis-projects) → **Add New…** → **Project**.
3. Import the `EidMubarak` repo. Vercel detects **Vite** automatically (`vercel.json` sets `npm run build` and `dist`).
4. Deploy with default settings (no environment variables required).

Or use the CLI (after `npx vercel login`):

```bash
npm run build
npx vercel --prod
```

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
