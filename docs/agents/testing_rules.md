# Testing Rules

## Scope
Cover rendering, language switching, SEO metadata, and critical CTA/navigation behavior.

## Execution
- Fast check: `npm run test -- --run`
- Coverage pass: `npm run test:coverage`
- Pre-merge baseline: `npm run ci`

## Expectations
- Add tests for every behavior change in UI logic.
- Prefer user-centric assertions via Testing Library.
- Keep tests deterministic; no reliance on wall clock or network.
