import { createContext, useContext, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, GitPullRequest, Terminal } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SPRINT_URL } from "@/lib/catalog";
import { sprintOffer } from "@/lib/sprint";

const SprintContext = createContext<(() => void) | undefined>(undefined);

export function SprintButton({ children = "Staff your migration", ...props }: ButtonProps) {
  const open = useContext(SprintContext);
  return <Button {...props} onClick={open}>{children}</Button>;
}

export function SprintOfferProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <SprintContext.Provider value={() => setOpen(true)}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sprint-modal max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto gap-0 p-0">
          <div className="px-6 pb-7 pt-10 text-center sm:px-10">
            <p className="font-mono text-xs uppercase text-muted-foreground">Postfix CI / Migration staffing</p>
            <DialogTitle className="mt-4 text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">One focused sprint.<br /><span className="font-serif font-normal italic">Your application, hardened.</span></DialogTitle>
            <DialogDescription className="mx-auto mt-4 max-w-lg">Founder-led migration support for your Dockerfiles and CI. A fixed scope, a tested PR, and a clear handoff.</DialogDescription>
          </div>
          <div className="grid border-t border-border md:grid-cols-[0.85fr_1.15fr]">
            <div className="order-2 flex flex-col justify-between gap-8 bg-secondary p-6 sm:p-8 md:order-1">
              <div className="migration-art font-mono text-xs" aria-label="Migration from existing Dockerfile to reviewed pull request">
                <div className="flex items-center gap-2 border-b border-border pb-3 text-muted-foreground"><Terminal className="size-4" /> Dockerfile → pull request</div>
                <div className="space-y-3 py-6"><p className="text-muted-foreground">01 / Inspect Dockerfile + CI</p><p className="text-muted-foreground">02 / Select compatible image</p><p className="text-primary">03 / Remediate + test</p><p className="text-primary">04 / Review + hand off</p></div>
                <div className="flex items-center gap-2 border-t border-border pt-3"><GitPullRequest className="size-4 text-primary" /> Owner-reviewed PR</div>
              </div>
              <div><p className="font-mono text-xs text-primary">APOLLO API / HANDS-ON DELIVERY</p><h3 className="mt-3 text-2xl font-semibold">Staff the last mile.<br />Keep your stack.</h3><p className="mt-3 text-sm text-muted-foreground">Minimal, Docker Hardened Images, or Chainguard. The catalog is a starting point—not a lock-in.</p></div>
            </div>
            <div className="order-1 bg-card p-6 sm:p-8 md:order-2">
              <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl font-semibold">Migration pilot</h3><span className="font-mono text-xs text-primary">{sprintOffer.durationWeeks} WEEKS / FIXED SCOPE</span></div>
              <div className="my-6 border-y border-border py-6"><p className="font-mono text-xs text-primary">FOUNDER-LED / PAID PILOT</p><p className="mt-3 text-5xl font-semibold">${sprintOffer.priceUsd.toLocaleString("en-US")}<span className="ml-2 text-sm font-normal text-muted-foreground">USD / sprint</span></p><p className="mt-3 text-sm text-muted-foreground">{sprintOffer.applications} application · {sprintOffer.durationWeeks} weeks · one fixed fee.<br />Confirm compatibility and acceptance checks before kickoff.</p></div>
              <p className="mb-4 font-mono text-xs uppercase text-muted-foreground">Sprint deliverables</p>
              <ul className="space-y-3 text-sm">
                {[
                  "Dockerfile and CI compatibility assessment",
                  "Catalog-agnostic image selection and remediation",
                  "Migration PR with agreed application and CI tests",
                  "Final application-image scan and results comparison",
                  "Handoff with test coverage and residual risks",
                ].map((item) => <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 size-4 shrink-0 text-primary" /><span>{item}</span></li>)}
              </ul>
              <Button asChild size="lg" className="mt-8 w-full"><a href={SPRINT_URL} target="_blank" rel="noopener noreferrer">Book a coffee chat <ArrowUpRight /></a></Button>
              <p className="mt-4 text-sm text-muted-foreground">Prefer email? <a href="mailto:adrian@apolloapi.io" className="text-primary underline underline-offset-4">adrian@apolloapi.io</a></p>
              <p className="mt-3 text-xs text-muted-foreground">Discuss your migration scope with Apollo API. No subscription or automated checkout.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SprintContext.Provider>
  );
}