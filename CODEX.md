# CODEX.md – hf.pl

## Purpose
Codex CLI configuration index. See `@CLAUDE.md` for canonical orchestration rules.
Codex-specific settings live in `.codex/config.toml`.

## Stack
React 19 · Vite 8 · Tailwind CSS 4 · Vitest · ESLint · Cloudflare Wrangler

## Commands
| Task | Command |
|------|---------|
| Install | `npm install` |
| Dev server | `npm run dev` |
| Quality check | `npm run check` |
| Test (fast) | `npm run test -- --run` |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Full CI | `npm run ci` |

## Model Profiles
- **Rola decyzyjna i planistyczna**: `gpt-5.4` (effort `xhigh`) – decyzje, ryzyko, architektura, integracja końcowa.
- **Rola audytowa (read-only)**: `gpt-5.4` (effort `high`) – review, analiza ryzyk, ciężkie diagnozy.
- **Rola implementacyjna**: `gpt-5.2-codex` (effort `medium`) – zmiany produkcyjne i refaktory.
- **Rola testowa i jakościowa**: `gpt-5.1-codex-mini` (effort `low`) – testy, poprawki lint, dokumentacja pomocnicza.

Codex configuration settings are maintained directly in this file for local use; no separate config file is currently required.

## Planning Rule (non-negotiable)
> **95% CONFIDENCE RULE:** Do not write any code until you have at least 95% confidence in what needs to be built. Explore, ask, verify — then implement.

## References (Progressive Disclosure)
- `@CLAUDE.md` – main agent index and Claude model hierarchy
- `@AGENTS.md` – multi-agent framework configuration
- `@docs/agents/style_guide.md` – coding style
- `@docs/agents/testing_rules.md` – test strategy
- `@docs/agents/api_conventions.md` – API and Cloudflare conventions
- `@docs/agents/security.md` – security baseline
- `@docs/agents/handoff.md` – handoff checklist
- `@docs/codex/workflow.md` – Codex-specific workflow rules
- `@docs/codex/review_rules.md` – Codex review guidelines
