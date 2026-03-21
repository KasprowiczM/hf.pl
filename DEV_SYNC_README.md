# Dev Sync

This project uses a local, per-repository sync layer for files that should not live in Git.

- GitHub is the source of truth for tracked files.
- Proton Drive is the private overlay for untracked, ignored, sensitive, and local-only files.
- The sync mechanism stays inside this repository. No parent-level or global config is used.

## Commands

- `./dev-sync-export.sh` exports the filtered private overlay from this repo to Proton Drive.
- `./dev-sync-import.sh` imports the filtered overlay from Proton Drive into this repo.
- `./dev-sync-verify-git.sh` checks Git health and upstream state.
- `./dev-sync-verify-full.sh` checks that Git-tracked state plus Proton overlay reconstructs the working tree.

## Standard Workflow

1. Keep tracked source changes in Git.
2. Keep private or machine-local files in the Proton overlay.
3. Run `./dev-sync-export.sh` before leaving a machine.
4. On another machine, clone the repo from GitHub and run `./dev-sync-import.sh`.
5. Run `./dev-sync-verify-git.sh` and `./dev-sync-verify-full.sh` to confirm the project is complete.

## Local Config

The project-local config file is `.dev_sync_config.json`.

It stores the Proton mirror root and the include/exclude rules used by the sync scripts. If the file is missing, the tooling should create a sensible default and ask for review.
