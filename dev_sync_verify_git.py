from __future__ import annotations

import sys

from pathlib import Path

from dev_sync_core import DevSyncError, resolve_repo_root, run_command


def main() -> int:
    repo_root = resolve_repo_root(Path.cwd())
    failures: list[str] = []
    details: list[str] = []

    try:
        branch = run_command(
            ["git", "symbolic-ref", "--quiet", "--short", "HEAD"],
            cwd=repo_root,
        ).stdout.strip()
        details.append(f"Current branch: {branch}")
    except DevSyncError:
        failures.append("HEAD is detached; an upstream-tracking branch is required.")
        branch = ""

    status_output = run_command(
        ["git", "status", "--porcelain=v1"],
        cwd=repo_root,
    ).stdout.splitlines()
    tracked_changes = [line for line in status_output if not line.startswith("?? ")]
    if tracked_changes:
        failures.append("Tracked files are not clean.")
        details.extend(f"tracked-change {line}" for line in tracked_changes)
    else:
        details.append("Tracked files are clean.")

    if branch:
        try:
            upstream = run_command(
                ["git", "rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"],
                cwd=repo_root,
            ).stdout.strip()
            details.append(f"Upstream branch: {upstream}")
        except DevSyncError:
            failures.append("Current branch has no upstream configured.")
            upstream = ""

        if upstream:
            try:
                run_command(["git", "fetch", "--quiet"], cwd=repo_root)
                counts = run_command(
                    ["git", "rev-list", "--left-right", "--count", f"{upstream}...HEAD"],
                    cwd=repo_root,
                ).stdout.strip()
                behind_str, ahead_str = counts.split()
                behind = int(behind_str)
                ahead = int(ahead_str)
                details.append(f"Behind upstream by {behind} commit(s).")
                details.append(f"Ahead of upstream by {ahead} commit(s).")
                if ahead != 0:
                    failures.append("Local branch is ahead of upstream; latest tracked state is not pushed.")
            except DevSyncError as exc:
                failures.append(str(exc))

    if failures:
        print("FAIL dev-sync-verify-git")
        for item in failures:
            print(f"- {item}")
        for item in details:
            print(f"- {item}")
        return 1

    print("PASS dev-sync-verify-git")
    for item in details:
        print(f"- {item}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
