# Postfix CI

Open-source catalog of minimal, hardened container images. Postfix CI is a white-label front end for [`rtvkiz/minimal`](https://github.com/rtvkiz/minimal) and currently points **upstream**: every image reference resolves to `ghcr.io/rtvkiz/minimal-*`.

## What's inside
- **`/catalog-recipes`** — vendored copy of [`rtvkiz/minimal`](https://github.com/rtvkiz/minimal) (MIT), unmodified: apko/melange recipes, tests, VEX data, `catalog.json`. Upstream workflows are kept in `upstream-github-workflows/` (inactive).
- **`/src`** — the catalog web UI (TanStack Start) reading `src/lib/catalog.json`.

## Syncing upstream
`git remote add upstream https://github.com/rtvkiz/minimal && git subtree pull --prefix catalog-recipes upstream main --squash`, then copy `catalog-recipes/catalog.json` to `src/lib/catalog.json`.

## Roadmap
A Postfix CI build and publishing process may be added later. Until then, images, signatures and provenance are upstream Minimal's.

## Attribution & license
Container build definitions and catalog data from `rtvkiz/minimal`, Copyright (c) 2026 rtvkiz, MIT License (see `catalog-recipes/LICENSE`).
