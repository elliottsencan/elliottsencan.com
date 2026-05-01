import { describe, expect, it } from "vitest";
import {
  addUsage,
  aggregateCost,
  computeCost,
  emptyUsage,
  getPricing,
  isKnownModel,
  MODELS,
  PRICED_AT,
} from "./cost.ts";

describe("MODELS / PRICES parity", () => {
  it("every model in MODELS is priced", () => {
    for (const model of MODELS) {
      const pricing = getPricing(model);
      expect(pricing, `no pricing for ${model}`).not.toBeNull();
      expect(pricing?.input_per_million).toBeGreaterThan(0);
      expect(pricing?.output_per_million).toBeGreaterThan(0);
      expect(pricing?.priced_at).toBe(PRICED_AT);
    }
  });

  it("isKnownModel narrows MODELS entries", () => {
    expect(isKnownModel("claude-sonnet-4-6")).toBe(true);
    expect(isKnownModel("not-a-real-model")).toBe(false);
  });
});

describe("computeCost", () => {
  it("returns null pricing and cost when model is unknown", () => {
    const usage = { ...emptyUsage(), input_tokens: 1000, output_tokens: 200 };
    const record = computeCost(usage, "made-up-model");
    expect(record.pricing).toBeNull();
    expect(record.cost_usd).toBeNull();
    expect(record.usage).toEqual(usage);
  });

  it("snapshots pricing into the record so historical numbers don't rot", () => {
    const usage = { ...emptyUsage(), input_tokens: 1_000_000, output_tokens: 1_000_000 };
    const record = computeCost(usage, "claude-sonnet-4-6");
    expect(record.pricing).not.toBeNull();
    expect(record.pricing?.priced_at).toBe(PRICED_AT);
    expect(record.pricing?.model).toBe("claude-sonnet-4-6");
    // 3 + 15 = $18 at 1M input + 1M output for Sonnet 4.6
    expect(record.cost_usd).toBeCloseTo(18, 5);
  });

  it("handles cache tokens", () => {
    const usage = {
      input_tokens: 0,
      output_tokens: 0,
      cache_creation_input_tokens: 1_000_000,
      cache_read_input_tokens: 1_000_000,
    };
    const record = computeCost(usage, "claude-sonnet-4-6");
    // cache_write 3.75 + cache_read 0.30 = 4.05
    expect(record.cost_usd).toBeCloseTo(4.05, 5);
  });
});

describe("addUsage / aggregateCost", () => {
  it("sums usage fields component-wise", () => {
    const a = {
      input_tokens: 10,
      output_tokens: 5,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 1,
    };
    const b = {
      input_tokens: 3,
      output_tokens: 2,
      cache_creation_input_tokens: 4,
      cache_read_input_tokens: 0,
    };
    expect(addUsage(a, b)).toEqual({
      input_tokens: 13,
      output_tokens: 7,
      cache_creation_input_tokens: 4,
      cache_read_input_tokens: 1,
    });
  });

  it("aggregates cost across mixed-model calls and tolerates unknown models", () => {
    const usage = { ...emptyUsage(), input_tokens: 1_000_000, output_tokens: 1_000_000 };
    const records = [
      computeCost(usage, "claude-sonnet-4-6"), // $18
      computeCost(usage, "claude-haiku-4-5"), // $6
      computeCost(usage, "made-up-model"), // null cost — not included in total
    ];
    const agg = aggregateCost(records);
    expect(agg.records).toHaveLength(3);
    expect(agg.total_usd).toBeCloseTo(24, 5);
    expect(agg.total_usage.input_tokens).toBe(3_000_000);
    expect(agg.total_usage.output_tokens).toBe(3_000_000);
  });
});
