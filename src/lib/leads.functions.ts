import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "./pulls";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    const githubKey = process.env["GITHUB_API_KEY"];
    if (!apiKey || !githubKey) return { success: false, error: "Contact delivery is unavailable. Please try again later." };
    const headers = { Authorization: `Bearer ${apiKey}`, "X-Connection-Api-Key": githubKey, Accept: "application/vnd.github+json", "Content-Type": "application/json" };
    const endpoint = "https://connector-gateway.lovable.dev/github/repos/apolloapi/postfix-ci-zot";
    try {
      const repoResponse = await fetch(endpoint, { headers });
      if (!repoResponse.ok) {
        console.error("GitHub repository check failed", repoResponse.status);
        return { success: false, error: "Could not verify private delivery. Please try again later." };
      }
      const repo = await repoResponse.json() as { private?: boolean; has_issues?: boolean };
      if (repo.private !== true || repo.has_issues !== true) return { success: false, error: "Private contact delivery is unavailable. Please try again later." };
      const response = await fetch(`${endpoint}/issues`, {
        method: "POST", headers,
        body: JSON.stringify({
          title: "Postfix CI — new migration inquiry",
          body: `Website contact submission\n\nFirst name: ${data.firstName}\nLast name: ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nSource: Postfix CI catalog lead sidecar`,
        }),
      });
      if (!response.ok) {
        // Do not log GitHub response bodies: validation errors can repeat contact data.
        console.error("GitHub lead delivery failed", response.status);
        return { success: false, error: "Your details were not delivered. Please try again." };
      }
      return { success: true };
    } catch {
      return { success: false, error: "Could not reach contact delivery. Please try again." };
    }
  });