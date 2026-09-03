# Cloudflare deployment

## Pages — primary (2026-09-03 Editorial-Luxury)

Recommended settings:

- Framework preset: `Vite`
- Build command: `npm run build` (generates `dist` + `dist/en/index.html` + `og-card.png` + `sitemap.xml` with hreflang)
- Build output directory: `dist`
- Node version: `22.16.0` (Pages build image v3 default, engines `^22.12.0 || ^24`)
- Headers: `public/_headers` → `dist/_headers` (CSP `script-src 'self' https://plausible.io`, `style-src 'self' 'unsafe-inline'`, immutable `/assets/*`/`/fonts/*`)
- Redirects: `public/_redirects` → `dist/_redirects` (`/en/*  /en/index.html  200`, `/*  /index.html  200`)
- SEO: `dist/sitemap.xml` (xhtml hreflang, lastmod git), `dist/robots.txt` (Allow GPTBot/PerplexityBot/CCBot), `dist/llms.txt`/`ai.txt`

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

- This project is a prerendered SPA (2 shells: `dist/index.html` PL + `dist/en/index.html` EN via `scripts/postbuild.js`), so `/en/` is crawlable without JS — critical for hreflang GEO.
- `_headers` + `_redirects` are copied to `dist/` by Vite + postbuild; verify after build: `ls dist/_headers dist/_redirects dist/en/index.html`.
- For Pages, the app deploys as static output with `not_found_handling` via `_redirects 200` (not Workers `single-page-application`).
- For Workers fallback, current setup at `worker/index.js` + `wrangler.worker.toml` (`compatibility_date 2026-03-21`) injects nonce CSP and rewrites `og:locale`/canonical for `/en/` — kept for portability but Pages is primary since 2026-09-03.
