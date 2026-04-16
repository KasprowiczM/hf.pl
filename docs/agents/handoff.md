# Handoff Checklist

## Before Handoff
- Summarize what changed and why (2–5 sentences max)
- List touched files and verification commands run
- Document any skipped checks with reason

## For Next Agent
- Provide current status and concrete next actions
- Include blockers, assumptions, and open decisions only
- Keep handoff concise; avoid replaying full command logs

## Claude Code Session Handoff
When context is near 60% fill, create a handoff note with:
1. **Active task** – what is currently in progress
2. **Last verified state** – last passing test run / build result
3. **Next actions** – exactly 3–5 concrete steps to continue
4. **Open decisions** – any unresolved architectural questions

Store handoff notes in: `docs/agents/handoff_current.md` (overwrite each time)

## Model Escalation Guide
| Situation | Escalate to |
|-----------|-------------|
| Unknown root cause of bug | Opus Advisor |
| Architecture decision | Opus Advisor |
| Write test scaffolding | Haiku Worker |
| Generate component boilerplate | Haiku Worker |
| Default implementation work | Sonnet (orchestrator) |
