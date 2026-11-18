import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/postfix/Shell";
import { text } from "@/lib/legal-privacy";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — Postfix CI" },
    { name: "description", content: "Privacy Policy for Postfix CI by Apollo API." },
    { property: "og:title", content: "Privacy Policy — Postfix CI" },
    { property: "og:description", content: "Privacy Policy for Postfix CI by Apollo API." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Page,
});

function Page() {
  return <Shell><main className="mx-auto max-w-3xl px-4 py-12"><pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">{text}</pre></main></Shell>;
}
