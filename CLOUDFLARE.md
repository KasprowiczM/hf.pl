# Cloudflare deployment

## Pages

Recommended settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22.16.0`

Cloudflare Pages does not infer Node from `package.json` engines, so keep the Pages project aligned with [.node-version](.node-version) or set `NODE_VERSION=22.16.0` in the dashboard.

## Workers static assets

This repo also ships a minimal Worker entry at [worker/index.js](worker/index.js) and Wrangler config at [wrangler.toml](wrangler.toml).

Deploy flow:

```bash
npm install
npm run build
npm run deploy:worker
```

The Worker serves the built `dist/` directory through Cloudflare static assets with SPA fallback enabled.

## Authentication

Verify Wrangler authentication before deploying:

```bash
npm run cf:whoami
```

If you are not authenticated locally, run:

```bash
npx wrangler login
```

## Notes

- This project is a static SPA. It does not need the Cloudflare Vite plugin unless Worker runtime code, bindings, or SSR are introduced later.
- For Pages, the app deploys directly as static output.
- For Workers, the current setup is intentionally minimal and keeps the landing page portable between both deployment targets.
