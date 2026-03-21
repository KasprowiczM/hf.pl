from __future__ import annotations

import argparse
import sys

from pathlib import Path

from dev_sync_core import (
    DevSyncError,
    OperationLogger,
    get_local_overlay_candidates,
    is_rsync_available,
    load_or_create_config,
    render_path_list,
    resolve_repo_root,
    transfer_with_python,
    transfer_with_rsync,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Export private overlay files to the project-local Proton mirror.")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be exported without copying.")
    parser.add_argument("--verbose", action="store_true", help="Print detailed file activity.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo_root = resolve_repo_root(Path.cwd())
    config = load_or_create_config(repo_root)
    logger = OperationLogger(repo_root, "export", verbose=args.verbose)
    try:
        proton_root = config.proton_root
        candidates = render_path_list(get_local_overlay_candidates(repo_root, config))
        logger.log(f"project_name={config.project_name}", always_print=True)
        logger.log(f"proton_project_root={proton_root}", always_print=True)
        logger.log(f"selected_files={len(candidates)}", always_print=True)
        for rel_path in candidates:
            logger.log(f"EXPORT {rel_path}", always_print=args.verbose)

        if is_rsync_available():
            transfer_with_rsync(
                repo_root,
                proton_root,
                candidates,
                dry_run=args.dry_run,
                logger=logger,
            )
        else:
            logger.log("rsync not available; falling back to pure Python copy.", always_print=True)
            transfer_with_python(
                repo_root,
                proton_root,
                candidates,
                dry_run=args.dry_run,
                logger=logger,
            )

        logger.log(
            f"Export {'dry-run ' if args.dry_run else ''}complete. Files considered: {len(candidates)}. Log: {logger.path}",
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
