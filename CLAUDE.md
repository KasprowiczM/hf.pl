# CLAUDE.md – hf.pl

## Project
Bilingual (PL/EN) landing page for selling the `hf.pl` domain.
Deployed via Cloudflare Pages + Workers.

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

| Profile | Model | Code | Purpose |
|------|-------|------|---------|
| **Strategiczny** | gpt-5.4 | `gpt-5.4` (xhigh) | Decyzje, planowanie, finalne rozstrzygnięcia |
| **Analityczny** | gpt-5.4 | `gpt-5.4` (high, read-only) | Analiza architektury, audyty, ciężkie błędy |
| **Wykonawczy** | gpt-5.2-codex | `gpt-5.2-codex` (medium) | Zmiany produkcyjne i usprawnienia |
| **Kontrolny** | gpt-5.1-codex-mini | `gpt-5.1-codex-mini` (low) | Testy, boilerplate, dokumentacja pomocnicza |

> **Profil Analityczny nie wprowadza zmian w kodzie.** Dostarcza plan i rekomendacje.

## Planning Rule (non-negotiable)
> **95% CONFIDENCE RULE:** Do not write any code until you have explored the codebase and requirements enough to be at least 95% confident in every step. Ask clarifying questions in planning mode. Verify assumptions before implementation.

## References (Progressive Disclosure)
- `@README.md` – project overview and local workflows
- `@CLOUDFLARE.md` – deployment specifics
- `@AGENTS.md` – multi-agent framework configuration
- `@docs/agents/style_guide.md` – coding style and formatting rules
- `@docs/agents/testing_rules.md` – test strategy and execution rules
- `@docs/agents/api_conventions.md` – API and Cloudflare conventions
- `@docs/agents/security.md` – security baseline
- `@docs/agents/handoff.md` – handoff checklist between sessions

## Context Management
- Monitor context window usage; start summarizing at ~60% fill
- Tool output is capped at 200 lines / 120 KB per call (enforced in `.claude/settings.json`)
- Avoid running commands that produce huge logs without piping to a file first
- Before compacting: snapshot current status, active tasks, and next actions
