# ADR-0004: Finish-Possible Indicator

- Status: Accepted
- Date: 2026-02-15

## Context
Players need immediate feedback when checkout is possible.

## Decision
Expose a finish-possible indicator for the active side during scoring.

MVP rule:
- Indicator is true when remaining score is in configured finish-eligible range.

Future extension:
- Provide concrete checkout suggestions.

## Consequences
- Positive: Better in-game decision support with low UI cost.
- Negative: Requires clear configuration handling for out rules (for example double-out).
- Neutral: Suggestion engine can be added without breaking the indicator contract.

## Alternatives Considered
- No finish indicator in MVP: rejected; loses a key gameplay aid.
- Full checkout recommendation engine first: rejected for MVP scope control.
