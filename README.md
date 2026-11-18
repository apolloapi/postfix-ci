# Postfix CI

Open-source index & interactive comparison of hardened container images (Minimal, DHI, Chainguard) with live CVE counts, SBOMs, and migration guides. By Apollo API.

## What's inside
- **`/catalog-recipes`** — fork of [`rtvkiz/minimal`](https://github.com/rtvkiz/minimal) (MIT): apko/melange recipes, tests, VEX data, `catalog.json`. Upstream workflows kept in `upstream-github-workflows/` (inactive).
- **`/src`** — the Postfix CI catalog web UI (TanStack Start). Every visitor gets **2 free image pulls**; the 3rd asks for name, work email and company.
- Private Layer 3 work (`migration-linter/`, `ci-auto-pr-agent/`, `pioneer-playbooks/`) lives in a separate private repo.

## Syncing upstream
`git remote add upstream https://github.com/rtvkiz/minimal && git subtree pull --prefix catalog-recipes upstream main --squash`, then copy `catalog-recipes/catalog.json` to `src/lib/catalog.json`.

## Need help migrating your CI without breaking builds?
Book a 2-week sprint — catalog-agnostic: free Minimal images or enterprise DHI/Chainguard.

## Attribution & license
Container build definitions and catalog data derived from `rtvkiz/minimal`, Copyright (c) 2026 rtvkiz, MIT License (see `catalog-recipes/LICENSE`).

## Apollo-owned image publishing
See [the review-first image publishing setup](docs/IMAGE-PUBLISHING.md).
Minimal-derived image work remains in `apolloapi/postfix-ci`; Zot hosting
configuration is separate. Website references remain upstream until Apollo
images have been published and verified.
