# Security Baseline

## Secrets and credentials
- Do not store secrets in repo files, tests, or example payloads.
- Keep `.env.local` out of commits and logs.

## Dependencies and CI
- Run `npm run audit` for dependency risk checks.
- Prefer minimal dependency additions; justify each new package.

## Output hygiene
- Avoid pasting full logs into persistent docs.
- Redact tokens, cookies, and account identifiers from shared outputs.
