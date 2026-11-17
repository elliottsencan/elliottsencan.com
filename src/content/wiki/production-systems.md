---
title: Production systems
summary: >-
  The engineering decisions that shape how software behaves under real load,
  from durable execution and container isolation to observability, caching, and
  the hidden costs of seemingly obvious optimizations.
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
compiled_at: '2026-11-17T01:47:50.284Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1159
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
  cost_usd: 0.037488
---
Production systems are where assumptions meet reality. The gap between a working prototype and a system that runs reliably at scale is filled with operational detail: how state survives failures, how latency compounds across service boundaries, how configuration formats behave under edge cases, and how performance gains that look impressive in benchmarks can evaporate inside a real pipeline.

Durable execution addresses the state-survival problem directly. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step, allowing distributed applications to recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) organizes this space into three forms — stateless functions, sessions, and actors — mapped along a behavior-state continuum, showing how platforms like Temporal, Restate, DBOS, and Resonate each occupy a different position. Depot's CI orchestrator applies a similar pattern at infrastructure level, using [AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) to run a stateful, checkpointed workflow scheduler without keeping a long-lived process alive.

Container isolation is a related foundation. [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) of building a Docker-like container from scratch using only Linux primitives — unshare, mount, pivot_root — makes concrete what a runtime actually provides: mount namespace isolation and root filesystem separation, not magic.

Observability is the production feedback mechanism. [SigNoz's guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy and critical-path analysis for unfamiliar codebases. LangChain's Harrison Chase argues that [traces alone are insufficient](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) — attaching feedback signals to traces is what turns observability into a learning loop. And [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) for a container security tool goes further: fixture invariants and red runs that prove the system fails loudly when it overclaims certainty.

Testing in production is its own operational domain. [Currents's decision framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) for splitting Playwright tests between staging and production surfaces the tradeoffs: staging catches regressions cheaply, but production testing is the only way to verify real user flows against live infrastructure. The costs of getting this wrong are concrete. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building on the wrong base commit.

Performance optimization in production carries its own class of surprises. [Marc Brooker on TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm silently kills latency in modern datacenters via its interaction with delayed ACKs. At the LLM serving layer, [Netflix's in-house stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) covers engine selection, batched constrained decoding, and deployment strategies at scale. Everpure's work on [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating attention states as a persistent shared asset — injected via RDMA — can cut prefill costs by up to 20x.

Not every gain translates, though. [Colin Breck's analysis](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) of why order-of-magnitude improvements often fail to change outcomes in practice identifies three constraints: attention thresholds, discrete capacity increments, and pipeline backpressure. This is the production systems reminder that the bottleneck is rarely where the optimization landed.
