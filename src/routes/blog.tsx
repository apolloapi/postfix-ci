import { createFileRoute } from "@tanstack/react-router";
import { ResourcePage, resourceHead } from "@/components/postfix/ResourcePage";

export const Route = createFileRoute("/blog")({ head: () => resourceHead("Blog & migration reading", "Upstream engineering notes on container debugging, non-root permissions, scanner results and migration."), component: Blog });
function Blog() {
  return <ResourcePage title="Blog" intro="Migration guides and engineering notes from the upstream Minimal project. These are upstream articles, not Postfix CI client outcomes.">
    <div className="divide-y divide-border">{[
      ["Debugging a container that has no shell", "Plan a debugging workflow before removing tools from production."],
      ["Permission denied: running containers as a non-root user", "Check volume ownership, writable directories and runtime user assumptions."],
      ["Why your scanner reports zero CVEs", "A scanner can miss packages. A zero count is not a guarantee."],
      ["A dependency bump that fixed nothing and broke four builds", "Keep application tests in the update loop—not only vulnerability checks."],
    ].map(([title, summary]) => <article key={title} className="py-6"><p className="font-mono text-xs text-muted-foreground">UPSTREAM / MINIMAL</p><a className="mt-2 inline-block text-lg font-semibold text-primary underline" href="https://minimalcontainers.com/blog/">{title} →</a><p className="mt-2 text-sm text-muted-foreground">{summary}</p></article>)}</div>
    <a href="https://minimalcontainers.com/blog/" className="text-primary underline">Browse the upstream blog →</a>
  </ResourcePage>;
}