import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hasLead, leadSchema, markLeadSubmitted, needsLead, readActions, recordAction, type Lead } from "@/lib/pulls";
import { submitLead } from "@/lib/leads.functions";

export const LEAD_MIN_DWELL_MS = 18_000;
let siteStart: number | null = null;
const ActionContext = createContext<() => void>(() => {});
export const useCatalogAction = () => useContext(ActionContext);

export function LeadSidecarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [error, setError] = useState("");
  const count = useRef(0);
  const [timeReady, setTimeReady] = useState(false);
  const [wanted, setWanted] = useState(false);
  useEffect(() => { siteStart ??= Date.now(); const t = setTimeout(() => setTimeReady(true), Math.max(0, LEAD_MIN_DWELL_MS - (Date.now() - siteStart))); return () => clearTimeout(t); }, []);
  useEffect(() => { if (wanted && timeReady) setOpen(true); }, [wanted, timeReady]);
  const send = useServerFn(submitLead);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Lead>({ resolver: zodResolver(leadSchema) });
  const action = () => {
    count.current = Math.max(count.current, readActions()) + 1;
    recordAction();
    if (needsLead(count.current, delivered || hasLead())) setWanted(true);
  };
  const onSubmit = handleSubmit(async (values) => {
    setError("");
    try {
      const result = await send({ data: values });
      if (!result.success) { setError(result.error ?? "Please try again."); return; }
      markLeadSubmitted();
      setDelivered(true);
    } catch { setError("Your details were not delivered. Please try again."); }
  });
  return <ActionContext.Provider value={action}>
    {children}
    {open && <aside role="dialog" aria-modal="false" aria-labelledby="lead-sidecar-title" className="fixed bottom-0 right-0 z-40 max-h-[85dvh] w-full overflow-y-auto rounded-t-md border border-border bg-card p-6 shadow-lg sm:bottom-4 sm:right-4 sm:w-[420px] sm:rounded-md">
      <Button variant="ghost" size="icon" aria-label="Close contact form" title="Close contact form" className="absolute right-2 top-2" onClick={() => { setOpen(false); setWanted(false); }}><X /></Button>
      {delivered ? <div role="status"><h2 id="lead-sidecar-title" className="text-xl font-semibold">Thanks for reaching out.</h2><p className="mt-3 text-sm text-muted-foreground">Your details have been sent to Apollo API.</p></div> : <>
        <p className="font-mono text-xs text-primary">POSTFIX CI / APOLLO API</p>
        <h2 id="lead-sidecar-title" className="mt-3 text-xl font-semibold">Planning a container migration?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Leave your details to discuss your application and CI with Adrian.</p>
        <form className="mt-5 space-y-3" onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-2 gap-3">{(["firstName", "lastName"] as const).map((field) => <div key={field} className="space-y-1"><Label htmlFor={`lead-${field}`}>{field === "firstName" ? "First name" : "Last name"}</Label><Input id={`lead-${field}`} autoComplete={field === "firstName" ? "given-name" : "family-name"} maxLength={80} {...register(field)} aria-invalid={!!errors[field]} />{errors[field] && <p className="text-xs text-destructive">{errors[field]?.message}</p>}</div>)}</div>
          {(["email", "phone"] as const).map((field) => <div key={field} className="space-y-1"><Label htmlFor={`lead-${field}`}>{field === "email" ? "Email" : "Phone"}</Label><Input id={`lead-${field}`} type={field === "email" ? "email" : "tel"} autoComplete={field === "email" ? "email" : "tel"} maxLength={field === "email" ? 254 : 30} {...register(field)} aria-invalid={!!errors[field]} />{errors[field] && <p className="text-xs text-destructive">{errors[field]?.message}</p>}</div>)}
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send to Adrian"}<ArrowUpRight /></Button>
          <p className="text-xs text-muted-foreground">Shared with Apollo API to respond to your inquiry. Stored privately, accessible to authorized team members.</p>
        </form>
      </>}
    </aside>}
  </ActionContext.Provider>;
}