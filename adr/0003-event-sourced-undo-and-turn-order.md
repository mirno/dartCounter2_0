# ADR-0003: Event-Sourced Undo and Turn Order Integrity

- Status: Accepted
- Date: 2026-02-15

## Context
Undo must remain correct even when reverting events that cross leg/set completion boundaries and starter rotation changes.

## Decision
Use an append-only event log for match actions. Derive current state by replay/reduction.

Undo behavior:
- Remove the latest reversible event.
- Recompute state from remaining events.
- Keep turn order, leg/set winners, and starter rotation derived from event sequence.

## Consequences
- Positive: Deterministic rollback with strong auditability and testability.
- Negative: Requires robust reducer logic and careful event schema design.
- Neutral: Can be optimized later with snapshots if needed.

## Alternatives Considered
- Mutable in-place state with inverse commands: rejected due to high rollback complexity.
- Snapshot-only history: rejected because cross-boundary correctness is harder to guarantee.
