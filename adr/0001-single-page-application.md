# ADR-0001: Single Page Application

- Status: Accepted
- Date: 2026-02-15

## Context
The product should provide fast scoring interactions with minimal navigation friction during live games.

## Decision
Implement DartCounter as a single-page application (SPA).

## Consequences
- Positive: Fast transitions, simplified live scoring flow, local state continuity.
- Negative: Requires careful client-side state management and persistence strategy.
- Neutral: Backend API remains available as domain/service boundary.

## Alternatives Considered
- Multi-page application: rejected due to slower flow and fragmented state.
- Native-only app first: rejected for higher initial delivery cost.
