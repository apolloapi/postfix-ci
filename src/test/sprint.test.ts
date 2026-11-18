import { describe, expect, it } from "vitest";
import { sprintOffer } from "../lib/sprint";

describe("fixed-scope pilot offer", () => {
  it("sets the proposed paid pilot at 2500 USD", () => {
    expect(sprintOffer.priceUsd).toBe(2500);
  });
  it("limits the pilot to one application", () => {
    expect(sprintOffer.applications).toBe(1);
  });
  it("uses a two-week delivery sprint", () => {
    expect(sprintOffer.durationWeeks).toBe(2);
  });
});