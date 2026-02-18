# DartCounter Requirements (Codex Workspace)

## Goal
Build a single-page application (SPA) for darts scoring with robust match-state handling for 1v1 and 2v2, including legs/sets, undo, and finish guidance.

## Product Scope
In scope:
- SPA UX for match setup and live scoring.
- Match formats: `1v1` and `2v2`.
- Legs/sets configuration.
- Deterministic undo that preserves valid player/team order.
- Finish-possible marker (checkout hint trigger).

Out of scope (initially):
- Online multiplayer.
- User accounts/auth.
- Tournament brackets.
- Advanced analytics dashboards.

## Core Functional Requirements

### FR-1 SPA
- The app is delivered as a single-page application.
- Navigation between setup and scoring views happens client-side.
- Reload should restore current match state if persisted.

### FR-2 Match Setup
- User can choose:
  - `1v1` (two players).
  - `2v2` (two teams, two players per team).
- User can configure starting score (for example 301/501), legs, and sets.
- User can configure who starts the first leg.

### FR-3 Match Model: Sets and Legs
- A match contains sets.
- A set contains legs.
- A leg contains visits/throws and ends when checkout is valid.
- The system computes winners of legs, sets, and match.
- Leg starter alternates according to configured rule after each leg.

### FR-4 Turn and Order Management
- Track active side and active player.
- In `1v1`, turns alternate between players.
- In `2v2`, turns alternate between teams; within a team, player order is deterministic and preserved.
- Order rules are explicit and testable.

### FR-5 Undo Mechanism
- Undo is event-based, not snapshot guessing.
- Every scoring action appends an immutable event.
- Undo removes the latest reversible event and recomputes derived state.
- Undo must correctly handle boundary events:
  - leg completed
  - set completed
  - starter rotation update
  - player/team turn changes

### FR-6 Finish-Possible Indicator
- Show a visible marker when checkout is possible for the active side.
- Minimum initial behavior:
  - mark true when score is in configured finish range.
- Future enhancement:
  - suggest concrete checkout routes.

## Non-Functional Requirements
- Deterministic state transitions.
- Pure domain logic for scoring/order/undo (easy unit testing).
- No layer boundary violations (Clean Architecture).
- Telemetry for key match lifecycle events and undo actions.

## Domain Rules to Lock Early
- Bust behavior.
- Double-out / single-out options.
- Leg starter rotation policy.
- 2v2 intra-team throw order policy.
- Undo depth and limits.

## Acceptance Criteria (MVP)
- User can finish a full match in either `1v1` or `2v2` mode.
- Legs and sets are tracked correctly through to match end.
- Undo can roll back across a completed leg/set without corrupting turn order.
- Finish marker appears consistently for eligible scores.
- Existing state can be reloaded in SPA without invalid order/state.

## Suggested First Milestones
1. Domain model and event log for scoring + undo.
2. Match setup UI (mode, players/teams, legs/sets, starter).
3. Live scoring UI with finish marker.
4. Set/leg completion logic and rotation.
5. Undo across leg/set boundaries with tests.
6. Telemetry hooks and hardening.
