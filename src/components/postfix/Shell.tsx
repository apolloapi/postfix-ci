import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SprintButton, SprintOfferProvider } from "./SprintOffer";
import { LeadSidecarProvider } from "./LeadSidecar";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <LeadSidecarProvider><SprintOfferProvider><div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-mono text-sm font-semibold">
            <span className="rounded bg-primary px-1.5 py-0.5 text-primary-foreground">pf</span>
            postfix<span className="text-primary">-ci</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm" aria-label="Main navigation">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Images</Link>
            <Link to="/docs" className="text-muted-foreground hover:text-foreground">Docs</Link>
            <Link to="/compare" className="text-muted-foreground hover:text-foreground">Compare</Link>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link>
            <Link to="/verify" className="text-muted-foreground hover:text-foreground">Verify</Link>
            <a href="https://github.com/apolloapi/postfix-ci" className="text-muted-foreground hover:text-foreground">GitHub</a>
            <SprintButton size="sm" />
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <nav className="mb-6 flex flex-wrap justify-center gap-6" aria-label="Footer navigation"><Link to="/">All images</Link><Link to="/docs">Docs</Link><Link to="/compare">Comparisons</Link><Link to="/blog">Blog</Link><Link to="/verify">Verify an image</Link><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Service</Link><a href="https://github.com/rtvkiz/minimal/blob/main/LICENSE">MIT license</a></nav>
        <p>Postfix CI by Apollo API. Catalog & build recipes adapted from{" "}
          <a className="text-primary underline" href="https://github.com/rtvkiz/minimal">rtvkiz/minimal</a> (MIT) — images served from ghcr.io/rtvkiz.</p>
      </footer>
    </div></SprintOfferProvider></LeadSidecarProvider>
  );
}
