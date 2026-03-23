# hf.pl

Premium bilingual landing page for selling the `hf.pl` two-letter domain.

## Stack

- React `19.2.4`
- Vite `8.0.1`
- Tailwind CSS `4.2.2`
- i18next `25.10.2`
- Wrangler `4.76.0`

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

## Deployment

This repository is prepared for both Cloudflare Pages and Cloudflare Workers static asset deployment.

- Pages build command: `npm run build`
- Pages output directory: `dist`
- Worker deploy command: `npm run deploy:worker`
- Pages deploy command: `npm run deploy:pages`

Node is pinned through [.node-version](.node-version) to align with Cloudflare Pages build-image expectations.

See [CLOUDFLARE.md](CLOUDFLARE.md) for deployment details.

## SEO and content

The page includes:

- canonical and alternate language links
- Open Graph and Twitter metadata
- `WebSite`, `Product`, and `FAQPage` JSON-LD
- `robots.txt`, `sitemap.xml`, and an Open Graph card asset

## Repo notes

Project-local sync tooling is documented in [DEV_SYNC_README.md](DEV_SYNC_README.md) and [DEV_SYNC_OPERATIONS.md](DEV_SYNC_OPERATIONS.md).
