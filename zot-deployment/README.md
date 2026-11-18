# Postfix CI Zot configuration proposal

This folder is submitted separately to `apolloapi/postfix-ci-zot` for review.
Image recipes, Minimal source, builds, and publishing belong exclusively in
`apolloapi/postfix-ci`. Nothing in this repository deploys a server or changes
an existing registry. No workflows auto-deploy or merge.

`config.example.json` is based on Zot v2.1.23's documented configuration format.
It listens on loopback only and requires a host-provided htpasswd file. It has
no anonymous-read exception. This is a review example, not a production policy
or a two-pull entitlement system. Do not expose it directly without HTTPS.

## Owner decisions before implementation

- Choose the host, registry DNS name and TLS termination mechanism.
- Choose durable storage, backups, retention and a tested restore procedure.
- Choose authentication and repository authorization, including whether reads
  are anonymous, authenticated, or controlled by an entitlement service.
- Choose Docker Compose, systemd, Kubernetes, or another deployment mechanism;
  none is selected here.
- Pin a reviewed Zot release and image/binary digest. Validate the configuration
  against that exact binary with `zot verify config.example.json` before use.
- Supply publishing credentials as GitHub Actions secrets in postfix-ci, never
  in either repository. Keep hosting credentials in the deployment repository.
- Run a non-production OCI image push/pull, then a Cosign signature, SPDX SBOM
  and provenance verification round trip before enabling production publication.

## Publishing integration

The postfix-ci proposal initially produces Apollo-owned GHCR references.
Moving to Zot is a reviewed change in **postfix-ci**, adapting login, repository
paths, evidence upload, and verification together. No registry hostname or host
was supplied, so the change is intentionally not activated.

## Acceptance checklist

- Configuration validates with the pinned Zot binary.
- HTTPS `/v2/` challenge returns 401 without credentials.
- Unauthenticated writes fail; authorized push/pull succeeds.
- Repository permissions match the owner's approved policy.
- Signatures, SBOMs and provenance are retrievable and verifiable by digest.
- Backup restore preserves OCI manifests, blobs and evidence artifacts.
- Deployment changes arrive through PRs; protected main and deployment approval
  are configured by the owner before automation is enabled.

These checks have not been run against a live host. Only configuration parsing
and local proposal tests have been performed.