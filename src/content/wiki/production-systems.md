---
title: Production systems
summary: >-
  The engineering decisions that keep software running reliably in production,
  from durable execution and observability to testing discipline, configuration
  hazards, and the constraints that determine whether performance gains actually
  matter.
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
compiled_at: '2026-07-04T21:26:13.346Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6166
    output_tokens: 1074
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
  cost_usd: 0.034608
---
Running software in production is a different discipline from building it. The gap between a working prototype and a system that survives real traffic, partial failures, and operational entropy is where most of the hard-won lessons live.

Durable execution addresses one of the most persistent failure modes in distributed systems: processes that die mid-workflow and leave no recoverable state. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover automatically without manual reconciliation. Jack Vanlightly's taxonomy of [durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) — stateless functions, sessions, and actors — shows how Temporal, Restate, DBOS, and Resonate each implement these patterns along a behavior-state continuum. Depot's CI orchestrator takes a similar approach, using [AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) to checkpoint a stateful workflow scheduler without keeping a long-lived process alive.

Observability is necessary but not sufficient. Distributed traces reveal what happened and where time went — a [practical guide to reading traces in unfamiliar codebases](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and common patterns like N+1 staircases. LangChain's Harrison Chase makes the case that [traces alone don't improve agentic systems](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning): attaching feedback signals to traces is what turns observability into a learning loop.

Testing strategy in production requires explicit decisions about what belongs in staging versus live environments. A [Playwright decision framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) covers which flows belong where and the operational costs of production testing. Emphere's approach to a container security tool goes further: [deterministic assurance with real-kernel runners and red runs](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) that prove the system fails loudly rather than overclaims certainty.

Configuration is a routine source of subtle production bugs. The [YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) — where `NO` parses as `false` — persists in widely used libraries more than a decade after the spec fixed it. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) that silently deleted code from main branches illustrates how architectural choices at the tooling level propagate into production incidents.

Performance work in production is bounded by constraints that are easy to ignore. Colin Breck's analysis of [when impressive performance gains don't matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three: attention thresholds, discrete capacity increments, and pipeline backpressure — any of which can nullify an order-of-magnitude improvement. Anton Zaides's [unwritten laws of software engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering), distilled from real incidents, reinforce the same instinct: roll back before debugging, and treat every external dependency as a future outage.

At the infrastructure level, container isolation via [mount namespaces and pivot_root](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) and LLM serving optimizations like [KV cache persistence](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) both reflect the same underlying concern: reducing the cost and fragility of repeated work in live systems.
