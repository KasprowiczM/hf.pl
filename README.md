# hf.pl

Premium bilingual landing page for selling the `hf.pl` two-letter domain.

## Design

**Editorial-Luxury (FT × Hermès)** — 2026-09-03. Paper `#fbf8f1` / ink `#0a0e14`, archival NASK provenance (`PL-676 • 1996`), hairline 1px, artifact-card / evidence-row / ghost-card, mono stamps, quiet reveal 420ms, noise grain. No gold gradients — accent only 1px. TL;DR `#tldr` + comparison table for GEO/AIO.

## Stack

- React `19.2.8`
- Vite `8.2.2` (`baseline-widely-available`)
- Tailwind CSS `4.3.3` (`@tailwindcss/vite`)
- i18next `25.10.10`
- Wrangler `4.128.0`
- Node `22.16.0` (Pages v3 `22.16`, engines `^22.12.0 || ^24`)

## Local development

```bash
npm install
npm run dev
```

The page supports Polish by default and English through `/en/`. Language choice is also persisted locally in the browser.

## Quality checks

```bash
npm run lint
npm run test -- --run
npm run build
npm run check
```

For a full local CI-equivalent run:

```bash
npm run ci
```

## Deployment — Cloudflare Pages (primary)

This repository is **Pages-first** (prerendered SPA) with Workers fallback.

- Pages build command: `npm run build` (→ `dist` + `dist/en/index.html` + `og-card.png` + `sitemap.xml`)
- Pages output directory: `dist`
- Pages headers: `public/_headers` (CSP `script-src self plausible`, `X-Frame`, HSTS, immutable `/assets/*`/`/fonts/*`)
- Pages redirects: `public/_redirects` (`/en/* → /en/index.html 200`, `/* → /index.html 200`)
- Worker fallback: `npm run deploy:worker` (`wrangler.worker.toml`, `compatibility_date 2026-03-21`)
- Pages deploy: `npm run deploy:pages` (`wrangler pages deploy dist --project-name hf-pl --branch main`)

Node is pinned through [.node-version](.node-version) to align with Cloudflare Pages build-image v3 (`22.16.0`, engines `^22.12.0 || ^24`).

See [CLOUDFLARE.md](CLOUDFLARE.md) for deployment details.

## SEO and content — GEO/AIO ready

The page includes:

- canonical + hreflang `pl-PL` / `en` / `x-default` + `og:locale` + `twitter:alt` + `preconnect plausible`
- Open Graph / Twitter `og-card.png` 1200×630 + `_headers` immutable cache
- 5× JSON-LD: `WebSite` (speakable `#tldr`/`#faq`), `Product` (2× `Offer` PLN 35–40k / €8.2–9.4k, `priceValidUntil`), `Organization` (logo, `sameAs`), `BreadcrumbList`, `FAQPage` 7 Q&A
- `robots.txt` allow `GPTBot`/`PerplexityBot`/`CCBot` + `Host`/`Sitemap`, `sitemap.xml` with `xhtml:link hreflang` + `lastmod` from git, `dist/en/index.html` prerender
- `public/llms.txt` + `ai.txt` for LLM RAG, comparison table `Miesiąc Ads vs Rebrand vs hf.pl` for citations

## Repo notes

Project-local sync tooling is documented in [DEV_SYNC_README.md](DEV_SYNC_README.md) and [DEV_SYNC_OPERATIONS.md](DEV_SYNC_OPERATIONS.md).
