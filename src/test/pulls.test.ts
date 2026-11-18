import { describe, expect, it } from "vitest";
import { LEAD_ACTION_THRESHOLD, leadSchema, needsLead } from "@/lib/pulls";

describe("copy and search lead trigger", () => {
  it("opens after exactly two completed actions", () => {
    expect(LEAD_ACTION_THRESHOLD).toBe(2);
    expect(needsLead(1, false)).toBe(false);
    expect(needsLead(2, false)).toBe(true);
  });
  it("does not ask again after successful delivery", () => {
    expect(needsLead(3, true)).toBe(false);
  });
  const valid = { firstName: "Adrian", lastName: "Brown", email: "test@example.com", phone: "+1 202 555 0100" };
  it.each(["firstName", "lastName", "email", "phone"] as const)("requires %s", (field) => {
    expect(leadSchema.safeParse({ ...valid, [field]: "" }).success).toBe(false);
  });
  it("accepts the four requested contact fields", () => {
    expect(leadSchema.safeParse(valid).success).toBe(true);
  });
});
