# ADR-0006: Persistence via Browser Local Storage

- Status: Accepted
- Date: 2026-02-15

## Context
A match should survive reloads without requiring backend integration in the prototype stage.

## Decision
Persist match setup and event log in browser `localStorage`.

## Consequences
- Positive: Zero backend dependency, immediate state recovery on reload.
- Negative: Data is local-only and single-browser scoped.
- Neutral: Storage adapter can be replaced later with API-backed persistence.

## Alternatives Considered
- No persistence: rejected due to poor UX on reload.
- IndexedDB first: rejected due to additional complexity for MVP needs.
- Backend persistence first: rejected to keep MVP focused on gameplay correctness.
