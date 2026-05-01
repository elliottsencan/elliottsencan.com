import { describe, expect, it } from "vitest";
import { isoWithSiteOffset, siteDate } from "./utils.ts";

describe("siteDate", () => {
  it("returns YYYY-MM-DD in Pacific time", () => {
    // 09:30 UTC on 2026-04-16 = 02:30 PDT, same calendar day.
    const d = new Date(Date.UTC(2026, 3, 16, 9, 30, 0));
    expect(siteDate(d)).toBe("2026-04-16");
  });

  it("rolls back across the day boundary", () => {
    // 02:00 UTC on 2026-04-01 = 19:00 PDT on 2026-03-31.
    const late = new Date(Date.UTC(2026, 3, 1, 2, 0, 0));
    expect(siteDate(late)).toBe("2026-03-31");
  });

  it("handles PST (winter, UTC-8) and PDT (summer, UTC-7) symmetrically", () => {
    const pst = new Date(Date.UTC(2026, 0, 10, 8, 0, 0));
    const pdt = new Date(Date.UTC(2026, 6, 15, 7, 0, 0));
    expect(siteDate(pst)).toBe("2026-01-10");
    expect(siteDate(pdt)).toBe("2026-07-15");
  });
});

describe("isoWithSiteOffset", () => {
  it("emits the extended ISO offset for PDT", () => {
    const d = new Date(Date.UTC(2026, 3, 16, 9, 30, 45, 300));
    expect(isoWithSiteOffset(d)).toBe("2026-04-16T02:30:45.300-07:00");
  });

  it("emits the extended ISO offset for PST", () => {
    const d = new Date(Date.UTC(2026, 0, 10, 8, 0, 0, 0));
    expect(isoWithSiteOffset(d)).toBe("2026-01-10T00:00:00.000-08:00");
  });

  it("rolls back across the day boundary so the date matches the slug", () => {
    // The whole reason this helper exists. Same instant as
    // `2026-04-01T02:00:00.000Z` but the date portion is the Pacific date.
    const late = new Date(Date.UTC(2026, 3, 1, 2, 0, 0, 0));
    expect(isoWithSiteOffset(late)).toBe("2026-03-31T19:00:00.000-07:00");
  });

  it("zero-pads fractional seconds below 100ms to 3 digits", () => {
    const d = new Date(Date.UTC(2026, 3, 16, 9, 30, 45, 7));
    expect(isoWithSiteOffset(d)).toBe("2026-04-16T02:30:45.007-07:00");
  });

  it("does not throw on DST transition days", () => {
    const spring = new Date(Date.UTC(2026, 2, 8, 12, 0, 0));
    const fall = new Date(Date.UTC(2026, 10, 1, 12, 0, 0));
    expect(() => isoWithSiteOffset(spring)).not.toThrow();
    expect(() => isoWithSiteOffset(fall)).not.toThrow();
  });

  it("preserves the same instant as toISOString()", () => {
    const d = new Date(Date.UTC(2026, 3, 16, 9, 30, 45, 300));
    expect(new Date(isoWithSiteOffset(d)).toISOString()).toBe(d.toISOString());
  });
});
