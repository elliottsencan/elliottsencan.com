/**
 * Per-call Anthropic cost computation.
 *
 * Every CostRecord carries its own pricing snapshot, so historical numbers
 * stored in worker responses (and committed to /experiments JSON files)
 * remain reproducible after the static price table here is later updated.
 *
 * Adding a new model: append it to MODELS and add a matching PRICES entry.
 * cost.test.ts asserts parity, so the typecheck-and-test suite catches a
 * forgotten price entry at CI time.
 */

export type Usage = {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens: number;
  cache_read_input_tokens: number;
};

export type Pricing = {
  model: string;
  input_per_million: number;
  output_per_million: number;
  cache_read_per_million: number;
  cache_write_5m_per_million: number;
  priced_at: string;
};

export type CostRecord = {
  usage: Usage;
  model: string;
  /** null when `model` has no entry in the static price table. */
  pricing: Pricing | null;
  /** null when `pricing` is null. Otherwise USD computed from usage × pricing. */
  cost_usd: number | null;
};

export const PRICED_AT = "2026-04-30";

// Models the worker may invoke. cost.test.ts asserts every entry has a
// matching PRICES row.
export const MODELS = ["claude-opus-4-7", "claude-sonnet-4-6", "claude-haiku-4-5"] as const;

export type ModelId = (typeof MODELS)[number];

const PRICES: Record<ModelId, Omit<Pricing, "model" | "priced_at">> = {
  "claude-opus-4-7": {
    input_per_million: 15,
    output_per_million: 75,
    cache_read_per_million: 1.5,
    cache_write_5m_per_million: 18.75,
  },
  "claude-sonnet-4-6": {
    input_per_million: 3,
    output_per_million: 15,
    cache_read_per_million: 0.3,
    cache_write_5m_per_million: 3.75,
  },
  "claude-haiku-4-5": {
    input_per_million: 1,
    output_per_million: 5,
    cache_read_per_million: 0.1,
    cache_write_5m_per_million: 1.25,
  },
};

export function isKnownModel(model: string): model is ModelId {
  return (MODELS as readonly string[]).includes(model);
}

export function getPricing(model: string): Pricing | null {
  if (!isKnownModel(model)) {
    return null;
  }
  return { model, ...PRICES[model], priced_at: PRICED_AT };
}

export function computeCost(usage: Usage, model: string): CostRecord {
  const pricing = getPricing(model);
  if (!pricing) {
    return { usage, model, pricing: null, cost_usd: null };
  }
  const cost_usd =
    (usage.input_tokens * pricing.input_per_million +
      usage.output_tokens * pricing.output_per_million +
      usage.cache_read_input_tokens * pricing.cache_read_per_million +
      usage.cache_creation_input_tokens * pricing.cache_write_5m_per_million) /
    1_000_000;
  return { usage, model, pricing, cost_usd };
}

export function emptyUsage(): Usage {
  return {
    input_tokens: 0,
    output_tokens: 0,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
  };
}

export function addUsage(a: Usage, b: Usage): Usage {
  return {
    input_tokens: a.input_tokens + b.input_tokens,
    output_tokens: a.output_tokens + b.output_tokens,
    cache_creation_input_tokens: a.cache_creation_input_tokens + b.cache_creation_input_tokens,
    cache_read_input_tokens: a.cache_read_input_tokens + b.cache_read_input_tokens,
  };
}

export type RunCost = {
  records: CostRecord[];
  total_usd: number;
  total_usage: Usage;
};

/**
 * Aggregate cost across multiple Anthropic calls in a single endpoint run
 * (e.g. a /synthesize run that compiles N wiki articles). `total_usd` skips
 * records with null cost so an unknown-model call doesn't poison the sum.
 */
export function aggregateCost(records: CostRecord[]): RunCost {
  const total_usage = records.reduce((acc, r) => addUsage(acc, r.usage), emptyUsage());
  const total_usd = records.reduce((acc, r) => acc + (r.cost_usd ?? 0), 0);
  return { records, total_usd, total_usage };
}
