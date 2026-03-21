from __future__ import annotations

import argparse
import sys

from pathlib import Path

from dev_sync_core import (
    DevSyncError,
    OperationLogger,
    get_proton_overlay_files,
    is_rsync_available,
    load_or_create_config,
    render_path_list,
    resolve_repo_root,
    transfer_with_python,
    transfer_with_rsync,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Import private overlay files from the project-local Proton mirror.")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be imported without copying.")
    parser.add_argument("--verbose", action="store_true", help="Print detailed file activity.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo_root = resolve_repo_root(Path.cwd())
    config = load_or_create_config(repo_root)
    logger = OperationLogger(repo_root, "import", verbose=args.verbose)
    try:
        proton_root = config.proton_root
        if not proton_root.exists():
            raise DevSyncError(f"Configured proton_project_root does not exist: {proton_root}")

        candidates = render_path_list(get_proton_overlay_files(proton_root, config))
        logger.log(f"project_name={config.project_name}", always_print=True)
        logger.log(f"proton_project_root={proton_root}", always_print=True)
        logger.log(f"selected_files={len(candidates)}", always_print=True)
        for rel_path in candidates:
            logger.log(f"IMPORT {rel_path}", always_print=args.verbose)

        if is_rsync_available():
            transfer_with_rsync(
                proton_root,
                repo_root,
                candidates,
                dry_run=args.dry_run,
                logger=logger,
            )
        else:
            logger.log("rsync not available; falling back to pure Python copy.", always_print=True)
            transfer_with_python(
                proton_root,
                repo_root,
                candidates,
                dry_run=args.dry_run,
                logger=logger,
            )

        logger.log(
            f"Import {'dry-run ' if args.dry_run else ''}complete. Files considered: {len(candidates)}. Log: {logger.path}",
            always_print=True,
        )
        return 0
    except DevSyncError as exc:
        logger.log(f"FAIL {exc}", always_print=True)
        return 1
    finally:
        logger.close()


if __name__ == "__main__":
    sys.exit(main())
