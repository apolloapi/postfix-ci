import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage, resourceHead } from "@/components/postfix/ResourcePage";

export const Route = createFileRoute("/docs")({ head: () => resourceHead("Docs", "Using minimal images: tags, pinning, development variants, updates and scanner interpretation."), component: Docs });
function Docs() {
  return <ResourcePage title="Docs" intro="How to use minimal images and evaluate them for your application. Recipes and upstream documentation remain available in the MIT-licensed source.">
    <div className="grid gap-4 sm:grid-cols-2">{[
      ["Tags & pinning", "A latest tag can move. Resolve and pin an image digest for repeatable deployments, then update it through reviewed PRs. Check each recipe for available version tags."],
      ["Development variants", "Some images offer a latest-dev tag with debugging tools. Inspect the recipe before relying on a shell; keep debugging tools out of the production image where practical."],
      ["How images stay current", "The upstream project maintains its own rebuild pipeline. Check the actual image build date rather than assuming freshness."],
      ["Reading scan results", "A successful build is not a clean scan. Record the scanner version, vulnerability database date, image digest and findings. Scan your final application image, not only its base."],
      ["Why two scanners disagree", "Grype and Trivy may identify packages and vulnerabilities differently. Compare the same digest, database date and severity definitions; investigate differences rather than treating a green count as proof."],
    ].map(([title, text]) => <article key={title} className="rounded-md border border-border bg-card p-5"><h2 className="font-semibold">{title}</h2><p className="mt-3 text-sm text-muted-foreground">{text}</p></article>)}</div>
    <section><h2 className="text-xl font-semibold">Contributing</h2><p className="mt-3 text-muted-foreground">Postfix CI's public catalog references Minimal as-is. Contribute recipes upstream.</p><a className="mt-3 inline-block text-primary underline" href="https://github.com/apolloapi/postfix-ci">Postfix CI source</a> · <a className="text-primary underline" href="https://github.com/rtvkiz/minimal">Minimal recipes and contribution guide</a></section>
  </ResourcePage>;
}