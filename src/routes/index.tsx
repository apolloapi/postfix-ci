import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/postfix/Shell";
import { catalog, imageRef } from "@/lib/catalog";
import { SprintButton } from "@/components/postfix/SprintOffer";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CatalogSearch } from "@/components/postfix/CatalogSearch";
import { PullCommand } from "@/components/postfix/PullCommand";
import { paginateCatalog } from "@/lib/pagination";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Postfix CI — Container migration staffing & minimal images" },
      { name: "description", content: `Founder-led container migration sprints and an open-source catalog of ${catalog.images.length} minimal images. Dockerfile remediation, tested PRs and measured scan results.` },
      { property: "og:title", content: "Postfix CI — Staff your container migration" },
      { property: "og:description", content: "Fixed-scope migration support for Dockerfiles and CI. Browse minimal images and discuss a two-week sprint with Apollo API." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);
  const counts = useMemo(() => Object.fromEntries(catalog.categories.map((c) => [c, catalog.images.filter((i) => i.category === c).length])), []);
  const list = catalog.images.filter((i) => (cat === "All" || i.category === cat) && (i.name + i.summary).toLowerCase().includes(q.toLowerCase()));
  const pagination = paginateCatalog(list, page);

  return (
    <Shell>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs text-primary">// Postfix CI by Apollo API · open-source · MIT</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-normal md:text-6xl">Hardened container images.<br />Hands-on migration staffing.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Missing shells, glibc vs. musl, root assumptions. Staff a focused sprint to migrate your application and CI to minimal images—with tested PRs and measurable results.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4"><SprintButton size="lg">View migration sprint <ArrowUpRight /></SprintButton><span className="font-mono text-xs text-muted-foreground">Founder-led · 2 weeks · fixed scope</span></div>
          <div className="mt-8 max-w-2xl"><PullCommand name="python" /></div>
          <div className="mt-10 flex flex-wrap items-baseline justify-between gap-2"><h2 className="text-lg font-semibold">All {catalog.images.length} hardened container images</h2><p className="text-xs text-muted-foreground">Upstream Minimal catalog</p></div>
          <CatalogSearch onSearch={(value) => { setQ(value); setPage(1); }} />
          <div className="mt-4 flex flex-wrap gap-2">
            {["All", ...catalog.categories].map((c) => (
              <Button key={c} size="sm" variant={cat === c ? "default" : "secondary"} onClick={() => { setCat(c); setPage(1); }}>
                {c} {c !== "All" && <span className="opacity-60">{counts[c]}</span>}
              </Button>
            ))}
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <ul aria-label="Container images" className="divide-y divide-border rounded-md border border-border">
          {pagination.items.map((i) => (
            <li key={i.name}>
              <Link to="/images/$name" params={{ name: i.name }} className="flex flex-col gap-1 p-4 hover:bg-muted md:flex-row md:items-center md:gap-6">
                <div className="md:w-56"><p className="font-mono font-semibold">{i.name}</p><p className="text-xs text-muted-foreground">{i.category}</p></div>
                <p className="flex-1 text-sm text-muted-foreground">{i.summary}</p>
                <code className="truncate font-mono text-xs text-accent-foreground md:w-72">{imageRef(i.name)}</code>
              </Link>
            </li>
          ))}
          {list.length === 0 && <li className="p-8 text-center text-muted-foreground">No images match.</li>}
        </ul>
        <nav aria-label="Catalog pagination" className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="font-mono text-xs text-muted-foreground">{pagination.start}–{pagination.end} of {list.length} images</p>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" aria-label="Previous page" title="Previous page" disabled={pagination.page === 1} onClick={() => setPage(pagination.page - 1)}><ChevronLeft /></Button>
            <span className="min-w-24 text-center font-mono text-xs">Page {pagination.page} of {pagination.totalPages}</span>
            <Button variant="outline" size="icon" aria-label="Next page" title="Next page" disabled={pagination.page === pagination.totalPages} onClick={() => setPage(pagination.page + 1)}><ChevronRight /></Button>
          </div>
        </nav>
        <section className="mt-12 border-t border-border py-8">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]"><div><h2 className="text-2xl font-semibold">What to check in every image</h2><p className="mt-3 text-sm text-muted-foreground">Inspect upstream artifacts and verify the candidate against your application.</p><Link to="/verify" className="mt-4 inline-block text-sm text-primary underline">Verification checklist →</Link></div><div className="grid gap-6 sm:grid-cols-2">{[
            ["Cosign signature", "Check the signer and expected workflow identity."], ["SPDX SBOM", "Inspect packages, versions and licenses for the actual digest."], ["Build provenance", "Check source revision, workflow and artifact subject."], ["Final-image CVE scan", "Record scanner and database dates plus remaining findings."], ["Non-root compatibility", "Test writable paths, volumes and runtime permissions."], ["Shell-less runtime", "Check dependencies and plan a debugging workflow."],
          ].map(([title, description]) => <div key={title} className="border-t border-border pt-4"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{description}</p></div>)}</div></div>
        </section>
        <section className="border-t border-border py-8"><h2 className="mb-6 text-2xl font-semibold">Common questions</h2>{[
          ["Are the upstream images free?", "Minimal publishes its images as an open-source project. Postfix CI's paid pilot covers application migration work, not a fee for the upstream image."],
          ["Do I need an account to pull an image?", "Current commands reference upstream Minimal's public registry. The contact form is for migration inquiries; it does not enforce registry access."],
          ["What makes an image hardened?", "Evaluate reduced package surface, runtime permissions and verifiable artifacts. No single label guarantees zero CVEs or application compatibility."],
          ["How often are images rebuilt?", "Check upstream build history and image timestamps. Apollo-owned publication remains a review-only proposal, not an active rebuild service."],
          ["How do these compare with other catalogs?", "Compare matched versions, measured findings, runtime compatibility and support requirements. Postfix CI does not publish a current comparative scan dataset."],
          ["Can I debug an image with no shell?", "Use an available development variant or an external debugging workflow. Validate the recipe and avoid assuming debugging tools exist in production."],
        ].map(([question, answer]) => <details key={question} className="border-b border-border py-4"><summary className="cursor-pointer font-medium">{question}</summary><p className="mt-3 max-w-3xl text-sm text-muted-foreground">{answer}</p></details>)}</section>
        <section className="mt-12 border-t border-border py-8">
          <h2 className="text-2xl font-bold">Your application. Your CI. A focused migration.</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">From base-image selection to a reviewed migration PR. Agree the scope first, then measure application-image scan results, test coverage, and remaining risks.</p>
          <SprintButton className="mt-4">View migration sprint <ArrowUpRight /></SprintButton>
        </section>
      </main>
    </Shell>
  );
}
