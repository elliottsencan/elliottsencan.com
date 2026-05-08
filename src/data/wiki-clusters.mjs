/**
 * Hand-curated wiki cluster definitions and slug → cluster assignments.
 *
 * Five editorial neighborhoods covering the current 41-concept corpus.
 * The constellation build step (`scripts/build-constellation-layout.mjs`)
 * imports these to seed the force solver with cluster ids and to embed the
 * mapping into `src/data/constellation-layout.json`, so the strip and rail
 * components only have to read one file at render time.
 *
 * When a new wiki article is compiled, add its slug to `clusterById`. Slugs
 * not present here are emitted with `cluster: null` and render as nodes
 * without contributing to a cluster region — graceful degradation, no build
 * break.
 *
 * `hue` values feed `oklch(L C <hue>)` cluster-region fills. Chroma is held
 * very low (0.04 normal, 0.07 focused) so the colors read as ink temperature,
 * not as a multi-color graph; the editorial accent stays reserved for the
 * active-node treatment.
 */

export const clusters = [
  { id: "agents", title: "Agents & language models", short: "Agents · LLMs", hue: 35 },
  { id: "craft", title: "Engineering craft", short: "Craft", hue: 145 },
  { id: "systems", title: "Systems & platform", short: "Systems", hue: 230 },
  { id: "web", title: "Web · typography", short: "Web", hue: 295 },
  { id: "ecosystem", title: "Open ecosystem", short: "Ecosystem", hue: 60 },
];

export const clusterById = {
  // AI / LLMs / agents
  "ai-agents": "agents",
  "agent-coordination": "agents",
  "agentic-workflows": "agents",
  "multi-agent-systems": "agents",
  "ai-safety": "agents",
  "ai-infrastructure": "agents",
  "llm-engineering": "agents",
  "llm-fine-tuning": "agents",
  "llm-inference": "agents",
  "llm-orchestration": "agents",
  "llm-tooling": "agents",
  mcp: "agents",
  "multimodal-ai": "agents",
  "retrieval-augmented-generation": "agents",
  "context-engineering": "agents",
  benchmarks: "agents",

  // Engineering practice / craft
  "ai-assisted-coding": "craft",
  "engineering-craft": "craft",
  "software-engineering": "craft",
  "software-architecture": "craft",
  "developer-productivity": "craft",
  "developer-tooling": "craft",
  "developer-tools": "craft",
  "continuous-integration": "craft",
  "flaky-tests": "craft",
  "api-design": "craft",

  // Systems / ops / platform
  "distributed-systems": "systems",
  kubernetes: "systems",
  observability: "systems",
  "production-systems": "systems",
  reliability: "systems",
  "supply-chain-security": "systems",
  "systems-design": "systems",
  "enterprise-software": "systems",
  "platform-strategy": "systems",

  // Web / typography / design
  "responsive-design": "web",
  "fluid-typography": "web",
  "font-pairing": "web",
  "web-accessibility": "web",

  // Open ecosystem
  "open-source": "ecosystem",
  "startup-ecosystem": "ecosystem",
};
