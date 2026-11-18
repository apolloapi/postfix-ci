import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SprintButton } from "@/components/postfix/SprintOffer";
import { Shell } from "@/components/postfix/Shell";
import { PullCommand } from "@/components/postfix/PullCommand";
import { catalog, imageRef } from "@/lib/catalog";

export const Route = createFileRoute("/images/$name")({
  loader: ({ params }) => {
    const image = catalog.images.find((i) => i.name === params.name);
    if (!image) throw notFound();
    return image;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Image"} hardened container image — Postfix CI` },
      { name: "description", content: loaderData?.summary ?? "" },
      { property: "og:title", content: `${loaderData?.name} image — Postfix CI` },
      { property: "og:description", content: loaderData?.summary ?? "" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ImagePage,
});

function ImagePage() {
  const i = Route.useLoaderData();
  const ref = imageRef(i.name);
  return (
    <Shell>
      <main className="mx-auto max-w-4xl px-4 py-12">
        <Link to="/" className="font-mono text-xs text-muted-foreground hover:text-primary">← all images</Link>
        <p className="mt-6 text-xs text-primary">{i.category}</p>
        <h1 className="mt-1 font-mono text-4xl font-bold">{i.name}</h1>
        <p className="mt-3 text-muted-foreground">{i.description}</p>
        <div className="mt-8 space-y-3">
          <PullCommand name={i.name} />
          {i.variants.includes("dev") && <PullCommand name={i.name} tag="latest-dev" />}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-border bg-card p-4">
            <h2 className="font-semibold">Verify signature</h2>
            <pre className="mt-2 overflow-x-auto font-mono text-xs text-muted-foreground">{`cosign verify ${ref}:latest \\
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \\
  --certificate-identity-regexp github.com/rtvkiz/minimal`}</pre>
          </div>
          <div className="rounded-md border border-border bg-card p-4">
            <h2 className="font-semibold">Defaults</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Non-root (UID 65532)</li><li>No shell in prod tag</li><li>SPDX SBOM + SLSA provenance</li>
              {i.upstream_url && <li><a className="text-primary underline" href={i.upstream_url}>Upstream project</a></li>}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border py-6">
          <p className="font-semibold">Need hands-on help migrating {i.name} into your application and CI?</p>
          <SprintButton className="mt-3">View migration sprint →</SprintButton>
        </div>
      </main>
    </Shell>
  );
}
