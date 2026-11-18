import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CatalogSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const [value, setValue] = useState("");
  return <form className="mt-8 flex max-w-xl gap-2" onSubmit={(e) => { e.preventDefault(); onSearch(value); }}><Input value={value} onChange={(e) => { setValue(e.target.value); if (!e.target.value) onSearch(""); }} aria-label="Search images" placeholder="Search images…" /><Button type="submit">Search</Button></form>;
}