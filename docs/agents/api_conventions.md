# API Conventions

## Frontend
- Keep all external links and canonical URLs centralized in SEO-related components.
- Ensure locale handling remains consistent between route and i18n state.

## Cloudflare
- Treat `worker/index.js` as deployment adapter only.
- Keep `wrangler.toml` minimal and environment-safe.
- Never commit secrets; use Wrangler-managed secrets/env vars.
