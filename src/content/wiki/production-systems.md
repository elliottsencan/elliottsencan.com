---
title: Production systems
summary: >-
  The engineering decisions that determine how software behaves under real load,
  covering durability, observability, testing discipline, performance
  constraints, and the operational costs of failure.
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
compiled_at: '2026-07-09T23:27:48.881Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6166
    output_tokens: 1033
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
  cost_usd: 0.033993
last_source_added: '2026-07-19T14:32:55.605Z'
---
Production systems are where abstractions meet reality. The gap between what software does in development and what it does under live load is where most interesting engineering problems live, and the sources here circle that gap from several angles.

Durability is one axis. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures automatically. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps durable execution into three forms — stateless functions, sessions, and actors — and shows how Temporal, Restate, DBOS, and Resonate each implement them. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle differently, using AWS Lambda durable functions to run a stateful, checkpointed workflow scheduler without keeping a long-lived process alive.

Failure modes in production are rarely dramatic. The GitHub merge queue bug described by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches because temp branches were built off the wrong base commit. [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) draws the same lesson in principle: roll back before debugging, and treat every external dependency as a future outage.

Observability is the mechanism for understanding what actually happened. [Distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) let engineers read unfamiliar codebases by examining span anatomy and critical-path analysis rather than source code alone. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) extends this: traces alone don't improve agentic systems; feedback signals attached to traces are what turn observability into a learning loop.

Testing discipline connects staging and production concerns. [Currents](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) provides a decision framework for splitting Playwright tests between environments, including the operational costs of testing in production. [Emphere](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes a harder line with their container security tool, using red runs that prove the system fails loudly when it overclaims certainty.

Performance has its own traps. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three constraints — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why order-of-magnitude improvements often fail to change outcomes. [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) illustrates the other side: local-first IndexedDB sync, optimistic updates, and aggressive code splitting compound into perceived near-instant performance. LLM inference has its own cost dynamics; [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset rather than a per-request computation can cut prefill costs by up to 20x.

Configuration correctness is an underrated production concern. [YAML's Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) — where the country code NO parses as false — persists in popular libraries a decade after the spec fixed it, illustrating how configuration formats carry silent failure modes into production deployments.
