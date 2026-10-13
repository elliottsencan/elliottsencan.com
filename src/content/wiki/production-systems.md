---
title: Production systems
summary: >-
  The operational concerns that surface when software runs at scale: failure
  recovery, observability, configuration correctness, performance constraints,
  and the architectural choices that determine whether systems hold under real
  load.
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
compiled_at: '2026-10-13T00:21:16.280Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1146
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
  cost_usd: 0.037293
---
Running software in production is a different discipline from building it. The gap between a working prototype and a reliable service is filled with failure modes that only appear under real load, with real data, over time.

Durable execution is one of the more direct answers to the reliability problem. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications can recover from failures without manual reconciliation logic. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into three forms — stateless functions, sessions, and actors — and traces how Temporal, Restate, DBOS, and Resonate each implement the pattern differently. Depot took the same idea into CI infrastructure, using AWS Lambda durable functions to run a stateful, checkpointed workflow scheduler [without a long-lived process](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Observability is what makes failures legible after the fact. Distributed traces reveal how requests move through systems you didn't write; [a practical guide from SigNoz](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns. For agentic systems, traces alone are not enough: [LangChain argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that attaching feedback signals — user ratings, indirect behavior, LLM-as-judge — is what turns observability into a learning loop.

Configuration is a quieter failure vector. [The YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) — where the country code NO parses as boolean false — persisted through spec versions for over a decade because popular libraries lagged the fix. Network defaults carry similar debt: [Marc Brooker makes the case](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) that Nagle's algorithm is obsolete on modern datacenter hardware and that TCP_NODELAY should be the default, since the Nagle/delayed-ACK interaction still silently kills latency.

Performance gains in production do not always translate to outcomes. [Colin Breck identifies three constraints](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why even order-of-magnitude improvements often fail to change real-world results. LLM inference is a concrete domain where this calculus matters: Netflix runs the full serving stack in-house with vLLM over TensorRT-LLM [to control engine selection, batching, and deployment strategies](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Everpure argues that treating the KV cache as a persistent shared asset — loaded from fast storage via RDMA rather than recomputed — [can cut prefill costs by up to 20x](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure).

Testing strategy is inseparable from production reliability. [Currents frames the decision](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) as which Playwright flows belong in staging versus production, with different configuration and operational costs for each. Emphere describes building a deterministic assurance platform for a container security tool using [real-kernel eBPF runners and red runs that prove the system fails loudly](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) when it overclaims certainty.

The unifying thread across these concerns is that production systems punish deferred judgment. [Anton Zaides distills this](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) into rules like rolling back before debugging and treating every external dependency as a future outage — lessons that emerge from incidents rather than architecture diagrams.
