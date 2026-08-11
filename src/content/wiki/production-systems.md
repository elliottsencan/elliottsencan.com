---
title: Production systems
summary: >-
  The operational concerns that keep software running reliably at scale:
  durability, observability, testing fidelity, configuration hazards,
  performance constraints, and the architectural decisions that determine
  whether a system recovers or fails silently.
sources:
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231511-temporal
  - 2026-05/2026-05-01t112302-the-three-durable-function-forms
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - >-
    2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t135637-reddit-rdevops
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - 2026-05/2026-05-18t113714-yaml-thats-norway-problem
  - 2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions
  - 2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching
  - >-
    2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure
  - >-
    2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
  - 2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people
  - 2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
  - 2026-06/2026-06-21t130559-what-is-inference-engineering
  - 2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter
  - >-
    2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters
  - 2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time
  - 2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix
compiled_at: '2026-08-11T05:22:25.978Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1135
    cache_creation_input_tokens: 0
    cache_read_input_tokens: 0
  model: claude-sonnet-4-6
  pricing:
    model: claude-sonnet-4-6
    input_per_million: 3
    output_per_million: 15
    cache_read_per_million: 0.3
    cache_write_5m_per_million: 3.75
    priced_at: '2026-04-30'
  cost_usd: 0.037128
---
Production systems are defined less by their features than by their failure modes. The gap between code that works in development and code that holds up under real load is where most of the engineering discipline actually lives.

Durability is one of the foundational concerns. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into three forms — stateless functions, sessions, and actors — and shows how platforms like Temporal, Restate, DBOS, and Resonate each occupy different points on a behavior-state continuum. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) took a related approach, using AWS Lambda durable functions to run a stateful CI scheduler without keeping a long-lived process alive, relying on a two-layer Lambda hierarchy and callback-driven coordination instead.

Observability is the other side of durability: knowing what the system is doing. [SigNoz's guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns as tools for diagnosing unfamiliar codebases. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone are insufficient for agentic systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — is what turns observability into a learning loop.

Testing fidelity carries its own production tradeoffs. [Currents](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames this as a decision framework: which Playwright test flows belong in staging and which require production, and what the operational cost of each choice is. [Emphere](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) approaches the problem differently for security tooling, using real-kernel eBPF runners and red runs that verify the system fails loudly rather than overclaiming certainty.

Configuration hazards are quieter killers. [YAML's Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) — where the country code NO parses as false — persists in popular libraries like PyYAML and libyaml more than a decade after the spec fix, illustrating how infrastructure-level parsing bugs outlive their supposed corrections. [TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) is a similar case: Nagle's algorithm silently degrades latency through its interaction with delayed ACKs on modern datacenter networks, and Marc Brooker argues it should simply be off by default.

Architectural decisions made early constrain what production can recover from. [The GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches because temp branches were pushed to the wrong base commit; Trunk's architecture avoided the incident by never pushing temp branches to main at all. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) offers the complementary observation: even order-of-magnitude performance improvements often fail to change outcomes because of attention thresholds, discrete capacity increments, and pipeline backpressure — context that shapes whether any optimization is worth pursuing.

[The unwritten laws of software engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills similar hard-won thinking into rules like rolling back before debugging and treating every external dependency as a future outage. These aren't best practices in the abstract; they are the operational posture that distinguishes systems built to survive contact with production from ones that merely pass CI.
