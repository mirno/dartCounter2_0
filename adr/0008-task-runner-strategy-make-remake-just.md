# ADR-0008: Task Runner Strategy (Make, Remake, Just)

- Status: Accepted
- Date: 2026-02-15

## Context
The project needs a stable, cross-platform command interface for build/test/run tasks. The team also wants optional ergonomics and debugging support.

## Decision
Use `Makefile` as the canonical automation interface.

Tool roles:
- `make`: source of truth for project tasks and CI commands.
- `remake`: optional debugging interface for Make dependency graphs/rules by reusing `Remakefile`.
- `just`: optional ergonomic wrapper that forwards to `make`.

Required workflow command:
- `make test` is the required test command for local and CI quality gates.

## Consequences
- Positive: single canonical command surface (`make`) with optional developer tooling (`remake`, `just`).
- Positive: CI and docs can stay consistent with `make test`.
- Negative: some duplication risk if `justfile` diverges (mitigated by delegating to `make`).
- Neutral: `remake` remains optional and only used for advanced troubleshooting.

## Alternatives Considered
- `just` as source of truth: rejected because many CI/workflows already standardize on `make`.
- `remake` as source of truth: rejected because it is less common in default environments.
- No task runner: rejected due to inconsistent command usage.
