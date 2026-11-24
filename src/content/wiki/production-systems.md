---
title: Production systems
summary: >-
  The engineering concerns that surface when software runs at scale in live
  environments: reliability, observability, failure recovery, performance, and
  the operational discipline those properties demand.
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
compiled_at: '2026-11-24T04:01:37.508Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1137
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
  cost_usd: 0.037158
---
Production systems expose the gap between software that works in development and software that holds up under real load, real failures, and real users. The sources here cluster around four recurring concerns: failure recovery, observability, performance constraints, and the unglamorous discipline of keeping things running.

Failure recovery is the most fundamental. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover automatically without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this idea across stateless functions, sessions, and actors, showing how platforms like Temporal, Restate, DBOS, and Resonate implement different points on a behavior-state continuum. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same pattern to CI orchestration, using AWS Lambda durable functions and callback-driven coordination to run a stateful scheduler without keeping a long-lived process alive.

Observability in production means more than collecting traces. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns as tools for reading unfamiliar systems. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) goes further: for agentic systems, traces without attached feedback signals don't improve anything. The learning loop requires connecting user ratings, indirect behavior signals, and deterministic rules back to the traces that generated them.

Performance constraints in production are rarely where engineers expect them. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three reasons an order-of-magnitude improvement can still change nothing: attention thresholds, discrete capacity increments, and pipeline backpressure. Meanwhile, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) points to a subtler performance trap: Nagle's algorithm interacting with delayed ACKs silently kills latency on modern datacenter hardware, and TCP_NODELAY should simply be the default. At the LLM serving layer, [Netflix's platform team](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) chose vLLM over TensorRT-LLM and built an in-house stack covering engine selection, model packaging, and batched constrained decoding, while [Everpure's KV cache work](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating attention states as a persistent shared asset rather than recomputing them can cut prefill costs by up to 20x.

Operational discipline shows up in smaller decisions that compound. [Playwright testing guidance](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) draws a practical boundary between which test flows belong in staging and which require production. [The Trunk post on merge queues](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how a single architectural choice — never pushing temp branches to main — insulated one team from a GitHub bug that silently deleted thousands of lines from other repos. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills the same intuition into rules: roll back before debugging, treat every external dependency as a future outage. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) extends this to correctness guarantees, using red runs that prove a system fails loudly when it overclaims rather than silently emitting wrong answers.

Across all of this, the through-line is the same: production surfaces assumptions that development conceals, and the engineering work is building systems that survive contact with reality.
