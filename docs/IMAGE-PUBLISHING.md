# Postfix CI image publishing — review-first setup

All Minimal-derived recipes, build adaptation, and image publishing stay in
`apolloapi/postfix-ci`. The separate `apolloapi/postfix-ci-zot` repository is
only for registry hosting configuration; it does not own the image recipes.

## Review sequence for the currently README-only GitHub repository

1. Review and merge this setup PR yourself. Nothing auto-merges or deploys.
2. Set `MINIMAL_IMPORT_COMMIT` to a reviewed 40-character commit SHA from
   `rtvkiz/minimal`. Set `POSTFIX_PR_TOKEN` as a GitHub Actions secret with
   Contents, Pull requests, and Workflows write access to **postfix-ci only**.
   GitHub's normal Actions token cannot create commits changing workflow files.
3. Manually run **Propose Minimal recipe import**. It imports the full MIT
   source, makes upstream automation inactive, and opens a second review PR.
4. Review that recipe/build PR. It includes generated `build.yml` and reusable
   `melange-images.yml`, maintaining upstream tests, scan reports, two native
   architectures, SBOM attestation, keyless signing, and build provenance.
5. Supply your own `MELANGE_SIGNING_KEY` and `MELANGE_SIGNING_KEY_PUB` Actions
   secrets, generated with the pinned melange version. Never commit keys.
6. Only when you approve publishing, set `POSTFIX_PUBLISH_ENABLED=true` and
   manually run **Build Hardened Images** on main. There are no schedules,
   automatic pushes to main, or package cleanup jobs in this proposal.

## Naming and source adaptation

Output: `ghcr.io/apolloapi/postfix-ci-python:latest` (and equivalent image names).
The owner remains Apollo; references, signature verification identities, SBOM
subjects and provenance subjects are adapted consistently. `postfix-catalog.json`
contains proposed Apollo catalog references. Do not switch the website away
from the working upstream references until Apollo images and verification pass.

`scripts/prepare-postfix-builds.py` generates reviewable workflow copies from the
vendored workflows. `scripts/prepare-postfix-workspace.py` copies the vendor data
into a disposable runner workspace, adjusts OCI title/source annotations there,
and leaves committed upstream recipes unchanged. After updating upstream, rerun
the generator and review its diff before merging. PyYAML 6.0.3 is required.

Upstream scanners produce reports; this proposal does not invent a zero-CVE
release policy or claim a SLSA assurance level. Native ARM runner availability,
package versions, signatures, and provenance must pass real Actions runs before
production use. All original notices and the full MIT license are preserved;
package licenses remain separate obligations.

## Zot handoff

No host, storage architecture, deployment mechanism, or credential policy is
selected by this proposal. The Zot configuration repository starts as a reviewed
example, not an automatic deployment. Switching publication to Zot requires
your chosen hostname, publishing credentials, and a verified signature/SBOM/
provenance round trip. GHCR-specific login and provenance checks must be adapted
and tested before changing `REGISTRY`; changing that variable alone is unsafe.

## Two free pulls

The existing website gate counts browser command selections, not Docker
downloads. Public registry reads bypass it. Authenticated download accounting
and entitlement enforcement are intentionally not implemented here: their
architecture and counting policy need your decision.
