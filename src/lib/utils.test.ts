import { describe, expect, it } from "vitest";
import { siteDate } from "./utils.ts";

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
