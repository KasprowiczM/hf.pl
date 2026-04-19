# Cloudflare deployment

## Pages

Recommended settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22.16.0` (Pages build image v3 default)

Cloudflare Pages build image versions (z dokumentacji):

- v3 (domyślny): Node `22.16.0`
- v2: Node `18.17.1`
- v1: Node `12.18.0`

Pages does not infer Node from `package.json` engines. Keep versioning via:

- `[.node-version](/.node-version)` (domyślnie), or
- `NODE_VERSION` / `.nvmrc` override.

Free plan has `500` deploys per month.

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
