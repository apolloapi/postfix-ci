import { describe, expect, it } from "vitest";
import { paginateCatalog } from "../lib/pagination";

describe("catalog pagination", () => {
  const items = Array.from({ length: 24 }, (_, index) => index + 1);
  it("shows exactly 10 items on a full page", () => {
    expect(paginateCatalog(items, 1).items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  it("shows the next 10 without repeating the first page", () => {
    expect(paginateCatalog(items, 2).items).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });
  it("clamps to the final page with the remaining rows", () => {
    expect(paginateCatalog(items, 9)).toEqual({ items: [21, 22, 23, 24], page: 3, totalPages: 3, start: 21, end: 24 });
  });
  it("handles no matching items", () => {
    expect(paginateCatalog([], 2)).toEqual({ items: [], page: 1, totalPages: 1, start: 0, end: 0 });
  });
});