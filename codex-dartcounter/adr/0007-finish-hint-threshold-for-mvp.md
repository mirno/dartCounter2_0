# ADR-0007: Finish Hint Uses Threshold Rule in MVP

- Status: Accepted
- Date: 2026-02-15

## Context
The product needs a finish indicator quickly, but exact checkout validation depends on finalized out rules and possibly per-dart modeling.

## Decision
For MVP, finish indication is threshold-based:
- indicator is true when active remaining score is `> 1` and `<= finishHintThreshold`.

Exact checkout route validation is deferred.

## Consequences
- Positive: Fast delivery of a useful in-game signal.
- Negative: Can produce false positives compared to exact checkout logic.
- Neutral: Rule can be replaced without changing UI contract.

## Alternatives Considered
- Exact checkout engine now: rejected for MVP scope.
- No finish marker: rejected due to gameplay requirement.
