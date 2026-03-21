# Dev Sync Operations Manual

## Overview

This repository uses a two-layer recovery model:

- GitHub stores all tracked project files.
- Proton Drive stores the private overlay for untracked, ignored, sensitive, and machine-local files.

The full project is reconstructable on another machine by combining:

1. `git clone` or `git pull` from GitHub.
2. `./dev-sync-import.sh` from the project-local Proton mirror.

This design is intentionally local to the repository. There is no shared `~/Dev_Env` sync state and no global config file.

## Files And Commands

The sync layer is expected to live in the project root:

- `.dev_sync_config.json`
- `dev_sync_core.py`
- `dev_sync_export.py`
- `dev_sync_import.py`
- `dev_sync_verify_git.py`
- `dev_sync_verify_full.py`
- `dev-sync-export.sh`
- `dev-sync-import.sh`
- `dev-sync-verify-git.sh`
- `dev-sync-verify-full.sh`

The wrappers are the supported entry points:

- `./dev-sync-export.sh`
- `./dev-sync-import.sh`
- `./dev-sync-verify-git.sh`
- `./dev-sync-verify-full.sh`

## Config

`.dev_sync_config.json` is the only project-local config file.

Expected fields:

- `project_name`
- `proton_project_root`
- `exclude_patterns`
- `include_always`

Behavior:

- The Proton root should be detected automatically when possible.
- On macOS, Proton mounts under `~/Library/CloudStorage/...` should be preferred.
- If one clear Proton mount exists, the config should point to the matching project folder under that mount.
- The config should always be kept local to this repository and ignored by Git.

The include/exclude rules are used for both export and import. The intent is to keep the sync scope stable across machines.

## File Classification

Classification must use Git, not a raw filesystem walk alone.

Use these sources:

- `git ls-files` for tracked files.
- `git status --porcelain=v1` for untracked files.
- Git ignored-file listing for ignored matches.

The Proton candidate set is:

1. untracked files
2. ignored files
3. filtered by `exclude_patterns`
4. re-including anything matching `include_always`

Typical exclusions include rebuildable or noisy content such as `node_modules/`, `dist/`, `build/`, `.next/`, `.turbo/`, `.cache/`, `__pycache__/`, `.venv/`, `venv/`, `*.log`, `*.tmp`, `*.bak`, `.DS_Store`, and `dev_sync_logs/`.

Always keep private environment and editor files in scope, such as:

- `.env`
- `.env.*`
- `*.local.*`
- `.vscode/`
- `.idea/`

## Export Procedure

Use export to mirror the private overlay from the repo into Proton Drive.

Recommended sequence:

1. Review `.dev_sync_config.json`.
2. Run `./dev-sync-export.sh --dry-run --verbose`.
3. Confirm the candidate set looks correct.
4. Run `./dev-sync-export.sh --verbose`.

Export behavior:

- Only the filtered Proton candidate set is exported.
- The wrapper delegates to the project-local Python script.
- The implementation should prefer `rsync --files-from=- --relative` when available.
- If `rsync` is unavailable, the implementation should fall back to standard-library file copying.
- Logs should be written under `./dev_sync_logs/`.

Dry-run mode should report what would be copied without modifying the Proton mirror.

## Import Procedure

Use import to restore the Proton overlay into a fresh clone or a local checkout.

Recommended sequence:

1. Clone or pull the Git repository.
2. Verify `.dev_sync_config.json` points at the correct Proton mirror.
3. Run `./dev-sync-import.sh --dry-run --verbose`.
4. Run `./dev-sync-import.sh --verbose`.
5. Run `./dev-sync-verify-full.sh`.

Import behavior:

- Read from `proton_project_root`.
- Add missing files and overwrite matching files.
- Do not delete local files by default.
- Apply the same include/exclude logic used for export.
- Write logs under `./dev_sync_logs/`.

## Verification

### Git Verification

Run:

`./dev-sync-verify-git.sh`

This checks:

- tracked files are clean,
- the current branch has an upstream,
- the local branch is not ahead of upstream,
- the latest tracked state is pushed to GitHub.

The script should print clear `PASS` or `FAIL` results and exit non-zero on failure.

### Full Verification

Run:

`./dev-sync-verify-full.sh`

This checks that the local working tree can be reconstructed from:

- Snapshot A: tracked files from Git,
- Snapshot B: filtered files from `proton_project_root`,
- Snapshot C: local working tree files, excluding known junk for non-tracked content.

The report should list:

- orphan local files,
- missing-from-local files,
- missing-from-Proton overlay files,
- stale Proton-only files.

`stale Proton-only files` may be informational rather than fatal, but they must be listed explicitly.

Overall result should be `PASS` when the reconstruction is complete and `FAIL` otherwise.

## Troubleshooting

If export or import finds the wrong Proton root, check `.dev_sync_config.json` first. The most common failure is a stale path after moving mounts or machines.

If verification reports missing private files, confirm they are included by the local rules and not blocked by an exclusion pattern.

If Git verification fails, inspect:

- `git status --short`
- `git branch -vv`
- `git log --oneline --decorate --graph --max-count=20`

If the full verification shows junk files, extend the ignore rules rather than syncing the junk itself.

## Migration Workflow

Old computer to new computer:

1. Push or pull the latest tracked code to GitHub.
2. Run `./dev-sync-export.sh` on the old computer to refresh the Proton overlay.
3. Record or reuse the project-local `.dev_sync_config.json`.
4. On the new computer, clone the repository from GitHub.
5. Ensure Proton Drive is mounted and the config points to the same project folder in the Proton mirror.
6. Run `./dev-sync-import.sh`.
7. Run `./dev-sync-verify-git.sh`.
8. Run `./dev-sync-verify-full.sh`.

The reconstruction is complete only when GitHub plus the Proton overlay reproduce the same project state on the new machine.
