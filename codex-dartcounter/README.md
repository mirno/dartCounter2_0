# Codex DartCounter

Single-page darts counter prototype for 1v1 and 2v2 play.

## Run
From `codex-dartcounter`:

```bash
make serve
```

Open `http://localhost:8081`.

## Deploy To GitHub Pages
From `codex-dartcounter`:

```bash
make deploy-ghpages
```

Then in GitHub:
1. Open repository `Settings` -> `Pages`.
2. Set `Source` to `Deploy from a branch`.
3. Set `Branch` to `gh-pages` and folder to `/ (root)`.
4. Save and wait for the site URL to appear.

Notes:
- The target publishes the SPA to the `gh-pages` branch.
- A `.nojekyll` file is added so GitHub Pages serves files as-is.
- `404.html` is copied from `index.html` to improve SPA refresh/deep-link handling.

## Test
From repository root:

```bash
cd codex-dartcounter
make test
```

## Task Runner Choices
- Canonical: `make` (`Makefile`)
- Optional debug: `remake` (`Remakefile`)
- Optional ergonomic wrapper: `just` (`justfile`)

## UML
Render UML diagrams:

```bash
cd codex-dartcounter
make uml
```

Source diagram:
- `codex-dartcounter/docs/uml/dartcounter-architecture.puml`

## What is implemented
- SPA setup and scoring view.
- Match modes: 1v1 and 2v2.
- Legs and sets tracking.
- Deterministic undo via event replay.
- Team/player order handling in 2v2.
- Finish-possible marker via threshold rule.
- Local persistence using browser `localStorage`.

## References
- Requirements: `codex-dartcounter/REQUIREMENTS.md`
- ADRs: `codex-dartcounter/adr/`
- Feature/Fix backlog: `codex-dartcounter/FEATURES_AND_FIXES.md`
