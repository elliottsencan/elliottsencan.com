---
title: Production systems
summary: >-
  The engineering concerns that arise when software runs at scale in live
  environments: reliability, failure recovery, observability, performance, and
  the operational costs of dependencies and configuration.
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
compiled_at: '2026-07-02T12:33:39.894Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6166
    output_tokens: 1093
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
  cost_usd: 0.034893
---
Production systems surface a cluster of concerns that are easy to defer during development and expensive to neglect afterward: how failures propagate and recover, how state is managed across distributed components, how observability translates into actual improvement, and how configuration choices compound into outages.

Failure recovery is a first-class design problem, not an afterthought. Temporal approaches it through durable execution, persisting workflow state at every step so distributed applications recover automatically without manual reconciliation [Temporal](/reading/2026-04/2026-04-30t231511-temporal). [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) formalizes this further, mapping stateless functions, sessions, and actors along a behavior-state continuum and showing how platforms like Temporal, Restate, DBOS, and Resonate each implement these patterns. Depot CI takes a related approach using AWS Lambda durable functions to run a stateful CI scheduler without a long-lived process, relying on checkpointing and callback-driven coordination instead [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Observability in production is only as useful as the feedback attached to it. Distributed traces provide span anatomy and critical-path analysis for diagnosing unfamiliar codebases [SigNoz](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code), but for agentic systems, traces alone are insufficient. Attaching feedback signals — user ratings, indirect behavior signals, LLM-as-judge verdicts, and deterministic rules — is what converts observability into a learning loop [LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

Performance gains do not automatically translate to production wins. Attention thresholds, discrete capacity increments, and pipeline backpressure can make even order-of-magnitude improvements irrelevant in practice [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter). Linear's architecture illustrates the other side: performance is a product of deliberate choices — local-first sync via IndexedDB, optimistic updates, service worker precaching — rather than a single optimization [performance.dev](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people).

Configuration is a hidden reliability risk. YAML's Norway problem — where the country code NO parses as false across library versions that predate the v1.2 spec fix — is a concrete example of how serialization choices can introduce silent bugs that survive for years in production [lab174](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem). The GitHub merge queue incident reinforces the same point from the infrastructure side: a wrong base commit silently deleted thousands of lines from main branches, an outcome Trunk avoided only because of an architectural choice made earlier [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

Testing strategy in production requires deliberate scoping. Splitting Playwright tests between staging and production environments involves real operational tradeoffs around which flows require live data, how to configure each environment, and the costs of running against production traffic [Currents](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Emphere's security tool testing goes further, using real-kernel eBPF runners and red runs that prove the system fails loudly rather than overclaiming certainty [Emphere](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown).

A recurring theme across these sources is the asymmetry between building and operating. The unwritten laws distilled from real incidents — roll back before debugging, treat every external dependency as a future outage — encode hard-won knowledge that accumulates only through production exposure [manager.dev](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering).
