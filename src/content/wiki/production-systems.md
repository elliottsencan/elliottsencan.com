---
title: Production systems
summary: >-
  The constellation of concerns that arise when software runs at scale under
  real load: durability, observability, testing fidelity, configuration safety,
  and the compounding cost of ignoring any one layer.
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
compiled_at: '2026-07-08T00:20:05.866Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6166
    output_tokens: 1165
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
  cost_usd: 0.035973
---
Production systems are where theory meets constraint. The gap between a working prototype and software that survives real traffic, partial failures, and accumulated operational debt is not bridged by any single technique but by a pattern of decisions made across every layer of the stack.

Durability is one of the first gaps to close. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so that distributed applications recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space further, classifying durable execution into stateless functions, sessions, and actors across a behavior-state continuum and showing how Temporal, Restate, DBOS, and Resonate each implement those patterns. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle differently: AWS Lambda durable functions run a stateful, checkpointed scheduler without keeping a long-lived process alive, using a two-layer Lambda hierarchy and callback-driven job coordination.

Observability is the complement to durability. Distributed traces give operators a window into what happened across service boundaries, but reading them in unfamiliar codebases requires understanding span anatomy, critical-path analysis, and common patterns like N+1 staircases [as detailed in this SigNoz guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). For agentic systems, traces alone are insufficient. [Harrison Chase at LangChain argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that attaching feedback signals to traces is what turns observability into a learning loop, without which production monitoring only records failures rather than preventing them.

Testing strategy shapes how much confidence you actually carry into production. [Currents's framework for Playwright tests](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) lays out which flows belong in staging and which in production, along with the operational costs of each choice. [Emphere's assurance platform](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further, using red runs that prove the system fails loudly on overclaimed certainty, a pattern that matters especially for security tools where false confidence is worse than no confidence.

Configuration bugs are a quieter source of production failures. [The YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) illustrates how the country code NO parses as false across many libraries that still implement the pre-1.2 spec, a class of bug that surfaces only under specific data conditions in live environments. The [GitHub merge queue incident described by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is another example: a silent deletion of thousands of lines caused by building temp branches off the wrong base commit, avoided entirely by an architectural choice made before the bug was known to exist.

Performance gains require context to matter. [Colin Breck observes](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) that attention thresholds, discrete capacity increments, and pipeline backpressure mean even order-of-magnitude improvements often change nothing in practice. That framing applies to LLM inference work too: [Everpure's KV cache research](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) shows 20x prefill cost reductions possible via persistent, shared attention states, but the benefit only lands when the surrounding pipeline is not the bottleneck. [The Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) situates these techniques within the broader discipline of serving LLMs reliably at scale.

A thread running across all of this is expressed plainly in [the unwritten laws of software engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering): roll back before debugging, treat every external dependency as a future outage. Production systems do not forgive deferred caution.
