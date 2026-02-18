# ADR-0005: Language and Runtime for SPA Prototype

- Status: Accepted
- Date: 2026-02-15

## Context
A fast, dependency-light implementation is needed to validate scoring behavior and game rules before framework-level choices.

## Decision
Implement the first SPA prototype with standard web technologies:
- HTML for structure
- CSS for presentation
- JavaScript ES modules for application and domain logic

No frontend framework is introduced in this phase.

## Consequences
- Positive: Fast iteration, minimal setup, low build complexity.
- Negative: As UI complexity grows, component/state ergonomics are limited.
- Neutral: Domain engine can be reused if a framework is adopted later.

## Alternatives Considered
- React/Vue/Svelte first: rejected for MVP speed and dependency overhead.
- Backend-rendered UI first: rejected because client-side interaction is core.
