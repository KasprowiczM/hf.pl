from __future__ import annotations

import fnmatch
import hashlib
import json
import os
import shutil
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable, Iterator, Sequence

CONFIG_FILENAME = ".dev_sync_config.json"
LOG_DIRNAME = "dev_sync_logs"

DEFAULT_EXCLUDE_PATTERNS = [
    "node_modules/",
    "dist/",
    "build/",
    ".next/",
    ".turbo/",
    ".cache/",
    "__pycache__/",
    ".venv/",
    "venv/",
    "*.log",
    "*.tmp",
    "*.bak",
    ".DS_Store",
    "**/.DS_Store",
    f"{LOG_DIRNAME}/",
    CONFIG_FILENAME,
]

DEFAULT_INCLUDE_ALWAYS = [
    ".env",
    ".env.*",
    "*.local.*",
    ".vscode/",
    ".idea/",
]


class DevSyncError(RuntimeError):
    pass


@dataclass(frozen=True)
class SyncConfig:
    project_name: str
    proton_project_root: str
    exclude_patterns: tuple[str, ...]
    include_always: tuple[str, ...]
    config_path: Path
    created: bool = False

    @property
    def proton_root(self) -> Path:
        raw = self.proton_project_root.strip()
        if not raw:
            raise DevSyncError(
                f"{CONFIG_FILENAME} does not define proton_project_root. Review the file and rerun."
            )
        return Path(raw).expanduser()

    def to_json_dict(self) -> dict[str, object]:
        return {
            "project_name": self.project_name,
            "proton_project_root": self.proton_project_root,
            "exclude_patterns": list(self.exclude_patterns),
            "include_always": list(self.include_always),
        }


class OperationLogger:
    def __init__(self, repo_root: Path, operation: str, verbose: bool = False) -> None:
        self.repo_root = repo_root
        self.operation = operation
        self.verbose = verbose
        log_dir = repo_root / LOG_DIRNAME
        log_dir.mkdir(parents=True, exist_ok=True)
        timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        self.path = log_dir / f"{operation}-{timestamp}.log"
        self._handle = self.path.open("w", encoding="utf-8")
        self.log(f"operation={operation}")
        self.log(f"repo_root={repo_root}")

    def log(self, message: str, always_print: bool = False) -> None:
        line = f"[{datetime.now(timezone.utc).isoformat()}] {message}"
        self._handle.write(line + "\n")
        self._handle.flush()
        if self.verbose or always_print:
            print(message)

    def close(self) -> None:
        self._handle.close()


def resolve_repo_root(start: Path | None = None) -> Path:
    current = start or Path.cwd()
    output = run_command(
        ["git", "rev-parse", "--show-toplevel"],
        cwd=current,
        check=True,
    ).stdout.strip()
    return Path(output).resolve()


def run_command(
    command: Sequence[str],
    cwd: Path,
    *,
    check: bool = True,
    input_text: str | None = None,
) -> subprocess.CompletedProcess[str]:
    try:
        completed = subprocess.run(
            list(command),
            cwd=str(cwd),
            check=check,
            capture_output=True,
            text=True,
            input=input_text,
        )
    except subprocess.CalledProcessError as exc:
        raise DevSyncError(
            f"Command failed ({format_command(command)}): {exc.stderr.strip() or exc.stdout.strip()}"
        ) from exc
    return completed


def format_command(command: Sequence[str]) -> str:
    return " ".join(command)


def find_proton_mounts() -> list[Path]:
    cloud_storage = Path.home() / "Library" / "CloudStorage"
    if not cloud_storage.exists():
        return []
    mounts = []
    for entry in sorted(cloud_storage.iterdir()):
        if entry.is_dir() and "proton" in entry.name.lower():
            mounts.append(entry)
    return mounts


def detect_default_proton_project_root(repo_root: Path) -> str:
    mounts = find_proton_mounts()
    if len(mounts) != 1:
        return ""
    mount = mounts[0]
    home = Path.home().resolve()
    try:
        relative = repo_root.resolve().relative_to(home)
    except ValueError:
        relative = Path(repo_root.name)
    return str((mount / relative).resolve())


def build_default_config(repo_root: Path) -> dict[str, object]:
    return {
        "project_name": repo_root.name,
        "proton_project_root": detect_default_proton_project_root(repo_root),
        "exclude_patterns": list(DEFAULT_EXCLUDE_PATTERNS),
        "include_always": list(DEFAULT_INCLUDE_ALWAYS),
    }


def load_or_create_config(repo_root: Path, *, stdout=None) -> SyncConfig:
    stream = stdout or sys.stdout
    config_path = repo_root / CONFIG_FILENAME
    created = False
    data = build_default_config(repo_root)
    if config_path.exists():
        try:
            raw = json.loads(config_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise DevSyncError(f"{CONFIG_FILENAME} is not valid JSON: {exc}") from exc
        if not isinstance(raw, dict):
            raise DevSyncError(f"{CONFIG_FILENAME} must contain a JSON object.")
        data.update(raw)
        missing_keys = [key for key in ("project_name", "proton_project_root", "exclude_patterns", "include_always") if key not in raw]
        if missing_keys:
            config_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
            print(
                f"Updated {CONFIG_FILENAME} with missing keys: {', '.join(missing_keys)}. Review the file.",
                file=stream,
            )
    else:
        config_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
        created = True
        print(
            f"Created {CONFIG_FILENAME} with project-local defaults. Review proton_project_root before relying on it.",
            file=stream,
        )

    exclude_patterns = normalize_patterns(data.get("exclude_patterns"), DEFAULT_EXCLUDE_PATTERNS)
    include_always = normalize_patterns(data.get("include_always"), DEFAULT_INCLUDE_ALWAYS)
    proton_project_root = str(data.get("proton_project_root", "")).strip()
    return SyncConfig(
        project_name=str(data.get("project_name", repo_root.name)),
        proton_project_root=proton_project_root,
        exclude_patterns=tuple(exclude_patterns),
        include_always=tuple(include_always),
        config_path=config_path,
        created=created,
    )


def normalize_patterns(raw: object, fallback: Sequence[str]) -> list[str]:
    if not isinstance(raw, list):
        return list(fallback)
    patterns = []
    for item in raw:
        if isinstance(item, str) and item.strip():
            patterns.append(item.strip())
    return patterns or list(fallback)


def to_posix_rel(path: Path, base: Path) -> str:
    return path.relative_to(base).as_posix()


def iter_all_files(root: Path) -> Iterator[Path]:
    for current_root, dir_names, file_names in os.walk(root):
        current = Path(current_root)
        rel = current.relative_to(root)
        if rel == Path("."):
            dir_names[:] = [name for name in dir_names if name != ".git"]
        else:
            dir_names[:] = [name for name in dir_names if name != ".git"]
        for file_name in file_names:
            yield current / file_name


def pattern_matches(rel_path: str, pattern: str) -> bool:
    rel = rel_path.strip("/")
    candidate = rel or "."
    basename = Path(candidate).name
    normalized_pattern = pattern.strip()

    if not normalized_pattern:
        return False

    if normalized_pattern.endswith("/"):
        trimmed = normalized_pattern.rstrip("/")
        if "/" in trimmed:
            return candidate == trimmed or candidate.startswith(trimmed + "/")
        parts = Path(candidate).parts
        return trimmed in parts

    if fnmatch.fnmatch(candidate, normalized_pattern):
        return True
    if fnmatch.fnmatch(basename, normalized_pattern):
        return True
    if normalized_pattern.startswith("**/"):
        direct = normalized_pattern[3:]
        return fnmatch.fnmatch(candidate, direct) or fnmatch.fnmatch(candidate, normalized_pattern)
    return False


def matches_any(rel_path: str, patterns: Sequence[str]) -> bool:
    return any(pattern_matches(rel_path, pattern) for pattern in patterns)


def should_include_overlay(rel_path: str, config: SyncConfig) -> bool:
    if matches_any(rel_path, config.include_always):
        return True
    return not matches_any(rel_path, config.exclude_patterns)


def split_null_records(output: str) -> list[str]:
    return [record for record in output.split("\0") if record]


def get_tracked_files(repo_root: Path) -> set[str]:
    output = run_command(["git", "ls-files", "-z"], cwd=repo_root).stdout
    return set(split_null_records(output))


def get_tracked_blob_hashes(repo_root: Path) -> dict[str, str]:
    output = run_command(["git", "ls-files", "-s", "-z"], cwd=repo_root).stdout
    result: dict[str, str] = {}
    for record in split_null_records(output):
        meta, path = record.split("\t", 1)
        mode, blob_hash, stage = meta.split()
        if stage == "0" and mode:
            result[path] = blob_hash
    return result


def get_untracked_and_ignored_paths(repo_root: Path) -> tuple[set[str], set[str]]:
    output = run_command(
        [
            "git",
            "status",
            "--porcelain=v1",
            "--ignored=matching",
            "--untracked-files=all",
            "-z",
        ],
        cwd=repo_root,
    ).stdout
    untracked: set[str] = set()
    ignored: set[str] = set()
    for record in split_null_records(output):
        status = record[:2]
        path = record[3:]
        if status == "??":
            untracked.update(expand_rel_entry(repo_root, path))
        elif status == "!!":
            ignored.update(expand_rel_entry(repo_root, path))
    return untracked, ignored


def expand_rel_entry(base: Path, rel_path: str) -> set[str]:
    rel = rel_path.rstrip("/")
    full = base / rel
    if rel_path.endswith("/") or full.is_dir():
        if not full.exists():
            return set()
        return {
            to_posix_rel(path, base)
            for path in iter_all_files(full)
            if path.is_file() or path.is_symlink()
        }
    if full.exists():
        return {rel.replace(os.sep, "/")}
    return {rel.replace(os.sep, "/")}


def get_local_overlay_candidates(repo_root: Path, config: SyncConfig) -> set[str]:
    untracked, ignored = get_untracked_and_ignored_paths(repo_root)
    return filter_overlay_paths(untracked | ignored, config)


def filter_overlay_paths(paths: Iterable[str], config: SyncConfig) -> set[str]:
    filtered: set[str] = set()
    for rel_path in paths:
        normalized = rel_path.strip().lstrip("./").replace(os.sep, "/")
        if not normalized:
            continue
        if should_include_overlay(normalized, config):
            filtered.add(normalized)
    return filtered


def get_proton_overlay_files(proton_root: Path, config: SyncConfig) -> set[str]:
    if not proton_root.exists():
        return set()
    all_files = {
        path.relative_to(proton_root).as_posix()
        for path in iter_all_files(proton_root)
        if path.is_file() or path.is_symlink()
    }
    return filter_overlay_paths(all_files, config)


def get_local_working_tree_files(
    repo_root: Path,
    tracked_files: set[str],
    config: SyncConfig,
) -> set[str]:
    files: set[str] = set()
    for path in iter_all_files(repo_root):
        rel = path.relative_to(repo_root).as_posix()
        if rel in tracked_files:
            files.add(rel)
            continue
        if should_include_overlay(rel, config):
            files.add(rel)
    return files


def ensure_directory(path: Path, *, dry_run: bool) -> None:
    if dry_run:
        return
    path.mkdir(parents=True, exist_ok=True)


def copy_file_like(src: Path, dst: Path, *, dry_run: bool) -> None:
    if dst.exists() and dst.is_dir():
        raise DevSyncError(f"Destination path is a directory, refusing to overwrite with file: {dst}")
    ensure_directory(dst.parent, dry_run=dry_run)
    if dry_run:
        return
    if src.is_symlink():
        target = os.readlink(src)
        if dst.exists() or dst.is_symlink():
            dst.unlink()
        os.symlink(target, dst)
        try:
            shutil.copystat(src, dst, follow_symlinks=False)
        except OSError:
            pass
        return
    shutil.copy2(src, dst)


def is_rsync_available() -> bool:
    return shutil.which("rsync") is not None


def transfer_with_rsync(
    source_root: Path,
    destination_root: Path,
    rel_paths: Sequence[str],
    *,
    dry_run: bool,
    logger: OperationLogger,
) -> None:
    if not rel_paths:
        logger.log("No files selected for rsync transfer.", always_print=True)
        return
    ensure_directory(destination_root, dry_run=dry_run)
    command = [
        "rsync",
        "-a",
        "--files-from=-",
        "--relative",
        "--itemize-changes",
        "./",
        str(destination_root),
    ]
    if dry_run:
        command.insert(1, "--dry-run")
    logger.log(f"Using rsync: {format_command(command)}", always_print=True)
    payload = "".join(f"./{path}\n" for path in rel_paths)
    completed = run_command(command, cwd=source_root, input_text=payload)
    if completed.stdout.strip():
        logger.log("rsync stdout:")
        for line in completed.stdout.strip().splitlines():
            logger.log(line, always_print=logger.verbose)
    if completed.stderr.strip():
        logger.log("rsync stderr:")
        for line in completed.stderr.strip().splitlines():
            logger.log(line, always_print=logger.verbose)


def transfer_with_python(
    source_root: Path,
    destination_root: Path,
    rel_paths: Sequence[str],
    *,
    dry_run: bool,
    logger: OperationLogger,
) -> None:
    if not rel_paths:
        logger.log("No files selected for Python copy.", always_print=True)
        return
    ensure_directory(destination_root, dry_run=dry_run)
    for rel_path in rel_paths:
        src = source_root / rel_path
        dst = destination_root / rel_path
        logger.log(f"{'DRY-RUN copy' if dry_run else 'copy'} {rel_path}", always_print=logger.verbose)
        copy_file_like(src, dst, dry_run=dry_run)


def read_bytes_for_hash(path: Path) -> bytes:
    if path.is_symlink():
        return os.readlink(path).encode("utf-8")
    return path.read_bytes()


def sha256_file(path: Path) -> str:
    return hashlib.sha256(read_bytes_for_hash(path)).hexdigest()


def git_blob_sha1_for_path(path: Path) -> str:
    payload = read_bytes_for_hash(path)
    header = f"blob {len(payload)}\0".encode("utf-8")
    return hashlib.sha1(header + payload).hexdigest()


def render_path_list(paths: Iterable[str]) -> list[str]:
    return sorted(path for path in paths)
