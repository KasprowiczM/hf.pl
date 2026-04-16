# AGENTS.md

## Project goal
Build and maintain a high-conversion bilingual (PL/EN) landing page for selling the `hf.pl` domain with reliable Cloudflare deployment.

## Stack
React 19 + Vite 8 + Tailwind CSS 4 + Vitest + ESLint + Cloudflare Wrangler.

## Minimal commands
- Install: `npm install`
- Dev: `npm run dev`
- Test: `npm run test -- --run`
- Lint: `npm run lint`
- Build: `npm run build`
- Full local CI: `npm run ci`
- Deploy worker: `npm run deploy:worker`
- Deploy pages: `npm run deploy:pages`

## Gemini Models Hierarchy
- **Domyślnie używaj profilu low-Pro:** Podstawowy, najtańszy profil do pracy ciągłej.
- **Profil orchestrator (Pro 3.1 High):** Używaj do planowania dużych funkcjonalności i refaktorów.
- **Profil advisor (Pro 3.1 High):** Read-only. Tylko do złażonej analizy architektury oraz szukania trudnych błędów. Nigdy do edycji.
- **Profil flash-worker (Gemini 3 Flash):** Szybkie rutynowe zadania poboczne (generowania boilerplate, testów, formatowania).

## Planning rule (non-negotiable)
> **PLANNING RULE (95% pewności):** Nie wprowadzaj żadnych zmian w kodzie, dopóki nie poznasz kodu i wymagań na tyle, aby mieć co najmniej 95% pewności krok po kroku, co trzeba zbudować. Zawsze zadawaj pytania doprecyzowujące i kilkukrotnie weryfikuj swoje założenia, zanim przejdziesz z trybu planowania do implementacji rzędu plików instalacyjnych/kodowych.

## References (Progressive Disclosure)
- `@README.md` - project overview and local workflows
- `@CLOUDFLARE.md` - deployment specifics
- `@.gemini/workspace.rules` - reguły globalne pre-prompt Antigravity
- `@docs/agents/style_guide.md` - coding style and formatting rules
- `@docs/agents/testing_rules.md` - test strategy and execution rules
- `@docs/agents/api_conventions.md` - API and integration conventions
- `@docs/agents/security.md` - security baseline for code and config changes
- `@docs/agents/handoff.md` - handoff checklist for multi-step work
