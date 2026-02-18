# DartCounter Feature and Fix Backlog

## Potential Features
- Checkout suggestions (not only finish marker).
- Configurable out rules (`single-out`, `double-out`, `master-out`).
- Per-dart entry mode (three darts instead of aggregated visit).
- Team/player avatars and match themes.
- Match export/import as JSON.
- Match history timeline and replay mode.
- Statistics: average per visit, checkout percentage, highest checkout.
- Keyboard shortcuts for faster scoring.
- PWA/offline install support.
- OpenAPI contract + backend sync for persisted matches.

## Fixes / Gaps to Address
- Current finish marker is threshold-based, not mathematically exact checkout validation.
- No bust variant options yet (currently basic bust if score < 0).
- Event log has no explicit event schema versioning yet.
- No dedicated telemetry events wired yet.
- No end-to-end UI tests yet.
- No import boundary checker yet for architecture rules.
- Undo has no configurable limit/cap.
- No optimistic concurrency strategy for multi-tab editing.

## Quality Tasks
- Add CI task for `node --test` domain checks.
- Add lint/format setup for frontend files.
- Add property-based tests for state reducer determinism.
- Add accessibility audit for controls and status announcements.
