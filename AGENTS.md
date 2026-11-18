<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

<!-- AGENT-MEMORY:BEGIN -->
- Catalog pagination uses a tested pure helper; search and category changes reset to the first page so filtered results stay visible.
- All sprint CTAs open the shared SprintOffer dialog through the Shell provider; keep one offer and accessible modal state across catalog pages.
- Pilot price, duration, and application scope use a shared tested offer object so displayed terms cannot drift between views.
- `catalog-recipes/` is a vendored fork of rtvkiz/minimal (MIT); never edit it for app logic, keep its LICENSE. Why: clean upstream syncs + attribution.
- The UI reads `src/lib/catalog.json` (copy of upstream catalog.json). Why: build-time data, no runtime fetch.
- Copy actions and submitted searches share a tested counter through LeadSidecarProvider; persist only action count and delivery status, never contact data.
- Lead submission is validated server-side and writes only to the fixed private GitHub repository after verifying its privacy; never expose issue bodies or identifiers to visitors.
- Public resource routes adapt upstream topics without claiming unverified scan metrics or copying vendor-specific guarantees.
- Generate Apollo build workflows outside the vendor tree and adapt only disposable runner copies; this preserves upstream source and reviewable changes.
- Image build proposals use manual publication with an explicit owner enable flag; schedules, deployment, and deletion await owner review.
<!-- AGENT-MEMORY:END -->
