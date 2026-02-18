# ADR-0002: Match Modes (1v1 and 2v2)

- Status: Accepted
- Date: 2026-02-15

## Context
The product must support direct play and team play while preserving predictable turn handling.

## Decision
Support two explicit match modes:
- `1v1`: two players.
- `2v2`: two teams with two players each.

Model `2v2` as teams containing ordered players. Turn progression alternates teams first, then applies deterministic intra-team order.

## Consequences
- Positive: Clear domain model and deterministic turn logic.
- Negative: More rules to define for intra-team order and starter rotation.
- Neutral: UI setup requires explicit player/team configuration.

## Alternatives Considered
- Generic N-vs-N mode initially: rejected to reduce MVP complexity.
- Flat list of players without team entity: rejected because team semantics become implicit and fragile.
