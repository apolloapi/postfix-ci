import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage, resourceHead } from "@/components/postfix/ResourcePage";

export const Route = createFileRoute("/compare")({ head: () => resourceHead("Comparing hardened container images", "Evaluate Minimal, Chainguard, Docker Hardened Images and distroless against application compatibility and measured scan results."), component: Compare });
function Compare() {
  return <ResourcePage title="Comparing hardened container images" intro="Choose a compatible base for your application—not a winner from an unmatched CVE count. Postfix CI migration support is catalog-agnostic.">
    <div className="grid gap-4 sm:grid-cols-2">{[
      ["Minimal vs Chainguard", "Compare recipe transparency, available runtime versions, libc compatibility, support terms and the specific image you can access.", "https://www.chainguard.dev/chainguard-images"],
      ["Minimal vs Docker Hardened Images", "Check the available image, license, access requirements and support terms directly. Catalog breadth does not establish compatibility with your application.", "https://www.docker.com/products/hardened-images/"],
      ["Replacing Bitnami images", "Map entrypoints, environment variables, volume ownership and initialization behavior. A base-image swap is not necessarily a drop-in replacement.", "https://github.com/bitnami/containers"],
      ["Moving off an existing vendor", "Inventory tags and digests, select a maintained candidate, test the final application, then document rollout and rollback before switching production.", "https://github.com/rtvkiz/minimal"],
      ["Minimal vs distroless", "Review language runtime versions, debugging strategy and dependencies. Evaluate both candidates with the same application tests and scanner setup.", "https://github.com/GoogleContainerTools/distroless"],
    ].map(([title, text, url]) => <article key={title} className="rounded-md border border-border bg-card p-5"><h2 className="font-semibold">{title}</h2><p className="mt-3 text-sm text-muted-foreground">{text}</p><a href={url} className="mt-4 inline-block text-sm text-primary underline">Inspect source and vendor details →</a></article>)}</div>
    <section><h2 className="text-xl font-semibold">Which one should you actually use?</h2><p className="mt-3 text-muted-foreground">Start with application compatibility and operational requirements. Reach for a small auditable catalog when its images fit; consider a commercial vendor when you need contractual support or broader coverage. Verify any compliance or provenance requirement separately.</p></section>
    <section><h2 className="text-xl font-semibold">Publish the method, including the losses</h2><p className="mt-3 text-muted-foreground">Record exact digests, matched versions, scanner and database dates, raw findings and classification rules. No current comparative scan dataset is published by Postfix CI; upstream figures are not our own measurements.</p></section>
  </ResourcePage>;
}