# Codex Workflow

## Orchestrator flow
1. Explore repository and constraints.
2. Create short plan with disjoint work chunks.
3. Delegate analysis-only tasks to `advisor` when deep reasoning is needed.
4. Delegate implementation chunks to `worker-*` profiles.
5. Integrate, verify, and report only relevant evidence.

## Token controls
- Prefer `rg` and targeted reads over broad dumps.
- Summarize large command outputs.
- Compact context early (target ~60% usage ceiling).
