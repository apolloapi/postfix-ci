import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCatalogAction } from "./LeadSidecar";

export function CatalogSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const [value, setValue] = useState("");
  const action = useCatalogAction();
  return <form className="mt-8 flex max-w-xl gap-2" onSubmit={(e) => { e.preventDefault(); onSearch(value); if (value.trim()) action(); }}><Input value={value} onChange={(e) => { setValue(e.target.value); if (!e.target.value) onSearch(""); }} aria-label="Search images" placeholder="Search images…" /><Button type="submit">Search</Button></form>;
}