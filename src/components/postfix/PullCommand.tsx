import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { imageRef } from "@/lib/catalog";
import { useCatalogAction } from "./LeadSidecar";

export function PullCommand({ name, tag = "latest" }: { name: string; tag?: string }) {
  const cmd = `docker pull ${imageRef(name)}:${tag}`;
  const action = useCatalogAction();
  const copy = async () => {
    try { await navigator.clipboard.writeText(cmd); toast.success("Copied command"); action(); }
    catch { toast.error("Could not copy. Select the command to copy it manually."); }
  };

  return (
      <div className="flex items-center gap-2 rounded-md border border-border bg-muted p-2 font-mono text-sm">
        <span className="text-primary">$</span>
        <code className="flex-1 overflow-x-auto">{cmd}</code>
        <Button size="sm" onClick={copy}><Copy className="h-3.5 w-3.5" /> Copy</Button>
      </div>
  );
}
