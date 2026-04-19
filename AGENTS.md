# AGENTS.md – hf.pl

## Purpose
Multi-agent configuration index for Claude Code, Gemini CLI, and Codex.
See `@CLAUDE.md` for the canonical orchestration rules and model hierarchy.

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
| Deploy worker | `npm run deploy:worker` |
| Deploy pages | `npm run deploy:pages` |

## Model Profiles
- **Profil kierowniczy i decyzyjny**: `gpt-5.4` (effort `xhigh`) – planowanie, decyzje architektoniczne, integracja końcowa.
- **Profil audytowo-analityczny**: `gpt-5.4` (effort `high`, read-only) – audyty, analiza ryzyk, trudne decyzje diagnostyczne.
- **Profil implementacyjny**: `gpt-5.2-codex` (effort `medium`) – routine coding, refaktory, zmiany robocze.
- **Profil kontrolny (testy/docs)**: `gpt-5.1-codex-mini` (effort `low`) – testy, poprawki lint, dokumentacja pomocnicza.

## Gemini CLI Model Hierarchy
- **Default** (low-Pro) – standard execution, low cost
- **Orchestrator** (Pro 3.1 High) – complex planning and refactors
- **Advisor** (Pro 3.1 High, read-only) – architecture/bug analysis only
- **Flash Worker** (Gemini 3 Flash) – boilerplate, formatting, simple tasks

## Planning Rule (non-negotiable)
> **95% CONFIDENCE RULE:** Do not write any code until you have at least 95% confidence in what needs to be built. Explore, ask, verify — then implement.

## References (Progressive Disclosure)
- `@CLAUDE.md` – Claude Code main index
- `@README.md` – project overview
- `@CLOUDFLARE.md` – deployment specifics
- `@docs/agents/style_guide.md` – coding style
- `@docs/agents/testing_rules.md` – test strategy
- `@docs/agents/api_conventions.md` – API and Cloudflare conventions
- `@docs/agents/security.md` – security baseline
- `@docs/agents/handoff.md` – handoff checklist
