# ADR Process

## Purpose
Capture architectural decisions and tradeoffs for the DartCounter rebuild.

## Naming
- File format: `NNNN-short-title.md`
- Example: `0001-single-page-application.md`

## Status Values
Use one of:
- `Proposed`
- `Accepted`
- `Deprecated`
- `Superseded by ADR-XXXX`

## Required Sections
Each ADR should include:
- Title
- Status
- Date
- Context
- Decision
- Consequences
- Alternatives considered

## Workflow
1. Create ADR with status `Proposed`.
2. Link it in this folder index.
3. Review and update to `Accepted` when approved.
4. If replaced, keep old ADR and mark `Superseded by ADR-XXXX`.

## Index
- ADR-0001: Single Page Application
- ADR-0002: Match Modes (1v1 and 2v2)
- ADR-0003: Event-Sourced Undo and Turn Order Integrity
- ADR-0004: Finish-Possible Indicator
- ADR-0005: Language and Runtime for SPA Prototype
- ADR-0006: Persistence via Browser Local Storage
- ADR-0007: Finish Hint Uses Threshold Rule in MVP
- ADR-0008: Task Runner Strategy (Make, Remake, Just)
