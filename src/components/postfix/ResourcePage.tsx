import type { ReactNode } from "react";
import { Shell } from "./Shell";

export function ResourcePage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <Shell><main className="mx-auto max-w-4xl px-4 py-12"><h1 className="text-3xl font-semibold">{title}</h1><p className="mt-4 max-w-3xl text-muted-foreground">{intro}</p><div className="mt-10 space-y-10">{children}</div></main></Shell>;
}

export function resourceHead(title: string, description: string) {
  return { meta: [{ title: `${title} — Postfix CI` }, { name: "description", content: description }, { property: "og:title", content: `${title} — Postfix CI` }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
}