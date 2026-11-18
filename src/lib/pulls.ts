import { z } from "zod";

export const LEAD_ACTION_THRESHOLD = 2;
const ACTION_KEY = "postfixci.actions";
const LEAD_KEY = "postfixci.lead-submitted";

export function needsLead(actionCount: number, submitted: boolean): boolean {
  return !submitted && actionCount >= LEAD_ACTION_THRESHOLD;
}

export const leadSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(80).regex(/^[\p{L}\p{M} '\-]+$/u, "Enter a valid name"),
  lastName: z.string().trim().min(1, "Enter your last name").max(80).regex(/^[\p{L}\p{M} '\-]+$/u, "Enter a valid name"),
  email: z.string().trim().email("Enter a valid email").max(254),
  phone: z.string().trim().min(7, "Enter your phone number").max(30).regex(/^\+?[\d ()\-.]+$/, "Enter a valid phone number").refine((v) => v.replace(/\D/g, "").length >= 7, "Enter a valid phone number"),
});
export type Lead = z.infer<typeof leadSchema>;

export function readActions(): number {
  try { const count = Number(localStorage.getItem(ACTION_KEY)); return Number.isSafeInteger(count) && count > 0 ? count : 0; } catch { return 0; }
}
export function hasLead(): boolean {
  try { return localStorage.getItem(LEAD_KEY) === "true"; } catch { return false; }
}
export function recordAction(): number {
  const count = readActions() + 1;
  try { localStorage.setItem(ACTION_KEY, String(count)); } catch { /* Session state still counts actions. */ }
  return count;
}
export function markLeadSubmitted() {
  try { localStorage.setItem(LEAD_KEY, "true"); localStorage.removeItem("postfixci.lead"); } catch { /* Never store contact details in browser storage. */ }
}
