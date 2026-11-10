---
title: Production systems
summary: >-
  The engineering decisions that govern how software behaves in production —
  reliability, observability, failure recovery, and performance — recur across
  distributed systems, CI pipelines, LLM serving, and application architecture.
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
compiled_at: '2026-11-10T01:24:07.114Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1242
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
  cost_usd: 0.038733
---
Production systems are where the gap between theory and practice closes, usually painfully. The sources here span CI orchestration, LLM serving, durable execution, container isolation, and application performance, but a consistent set of concerns surfaces: how systems fail, how they recover, and how they communicate failure clearly.

Durable execution is one of the more direct responses to production unreliability. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications can recover automatically, and [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms — stateless functions, sessions, and actors — showing how platforms like Temporal, Restate, DBOS, and Resonate each occupy different positions along a behavior-state continuum. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle at a smaller scale, using AWS Lambda durable functions in a two-layer hierarchy to run a stateful CI scheduler without keeping a long-lived process alive.

Failure modes in production often come from implicit assumptions. The GitHub merge queue bug documented by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches because temp branches were built off the wrong base commit. YAML's Norway problem — where the country code NO parses as false — is a quieter version of the same pattern: [a spec-level bug](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) that persisted across versions because popular libraries never adopted the fix. Anton Zaides distills this category of risk into a rule of thumb: [roll back before debugging, and treat every external dependency as a future outage](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering).

Observability in production is not just about collecting data. [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces alone don't improve agentic systems — feedback signals attached to traces are what turn observability into a learning loop. [SigNoz's guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) makes the complementary point for traditional systems: span anatomy, critical-path analysis, and N+1 staircase patterns are the tools for reasoning about systems you didn't build.

Performance gains in production require context. [Colin Breck identifies three constraints](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why order-of-magnitude improvements often fail to change real outcomes. [Marc Brooker's case for TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) is a concrete instance: Nagle's algorithm still silently degrades latency in datacenters because the Nagle/delayed-ACK interaction outlasted the problem it was designed to solve.

LLM serving has introduced its own production concerns. [Netflix runs the full serving stack in-house](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix), choosing vLLM over TensorRT-LLM and building an OpenAI-compatible API surface with batched constrained decoding. The Everpure series argues that [KV cache persistence](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) — treating attention states as a shared data asset injected via RDMA rather than recomputed — can cut prefill costs by up to 20x, a claim extended to [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) that only processes changed tokens.

[Linear's performance architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) — local-first IndexedDB sync, service worker precaching, optimistic updates — shows that production system design extends to the client tier. The same reasoning that motivates durable execution on the server (don't lose state, recover fast) motivates local-first sync on the client.
