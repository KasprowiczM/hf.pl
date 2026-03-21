from __future__ import annotations

import sys

from pathlib import Path

from dev_sync_core import (
    DevSyncError,
    get_local_overlay_candidates,
    get_local_working_tree_files,
    get_proton_overlay_files,
    get_tracked_blob_hashes,
    get_tracked_files,
    git_blob_sha1_for_path,
    load_or_create_config,
    render_path_list,
    resolve_repo_root,
    sha256_file,
)


def print_section(title: str, items: list[str]) -> None:
    print(f"{title}: {len(items)}")
    for rel_path in items:
        print(f"  {rel_path}")


def main() -> int:
    repo_root = resolve_repo_root(Path.cwd())
    config = load_or_create_config(repo_root)

    try:
        proton_root = config.proton_root
    except DevSyncError as exc:
        print("FAIL dev-sync-verify-full")
        print(f"- {exc}")
        return 1

    tracked_files = get_tracked_files(repo_root)
    tracked_hashes = get_tracked_blob_hashes(repo_root)
    local_overlay = get_local_overlay_candidates(repo_root, config)
    proton_overlay = get_proton_overlay_files(proton_root, config)
    local_working_tree = get_local_working_tree_files(repo_root, tracked_files, config)

    stale_proton_only = proton_overlay - local_overlay
    expected_local = tracked_files | local_overlay

    missing_from_local = render_path_list(expected_local - local_working_tree)
    missing_from_proton = render_path_list(local_overlay - proton_overlay)
    orphan_local = render_path_list(local_working_tree - (tracked_files | proton_overlay))
    stale_proton_only_list = render_path_list(stale_proton_only)

    tracked_content_mismatches = []
    for rel_path in sorted(tracked_files & local_working_tree):
        local_path = repo_root / rel_path
        if not local_path.exists():
            continue
        expected_hash = tracked_hashes.get(rel_path)
        if expected_hash and git_blob_sha1_for_path(local_path) != expected_hash:
            tracked_content_mismatches.append(rel_path)

    overlay_content_mismatches = []
    for rel_path in sorted(local_overlay & proton_overlay & local_working_tree):
        local_path = repo_root / rel_path
        proton_path = proton_root / rel_path
        if not proton_path.exists() or not local_path.exists():
            continue
        if sha256_file(local_path) != sha256_file(proton_path):
            overlay_content_mismatches.append(rel_path)

    failing_groups = [
        missing_from_local,
        missing_from_proton,
        orphan_local,
        tracked_content_mismatches,
        overlay_content_mismatches,
    ]
    passed = not any(failing_groups)

    print(f"Tracked snapshot A: {len(tracked_files)}")
    print(f"Proton overlay snapshot B: {len(proton_overlay)}")
    print(f"Local working tree snapshot C: {len(local_working_tree)}")
    print_section("orphan local files", orphan_local)
    print_section("missing-from-local files", missing_from_local)
    print_section("missing-from-Proton overlay files", missing_from_proton)
    print_section("stale Proton-only files", stale_proton_only_list)
    print_section("tracked content mismatches", tracked_content_mismatches)
    print_section("overlay content mismatches", overlay_content_mismatches)
    print(f"OVERALL {'PASS' if passed else 'FAIL'}")

    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
