---
title: Production systems
summary: >-
  The engineering concerns that emerge when software must run reliably at scale:
  failure recovery, observability, testing strategy, data correctness, and the
  architectural decisions that determine whether a system survives contact with
  the real world.
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
compiled_at: '2026-06-20T22:08:25.075Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5842
    output_tokens: 975
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
  cost_usd: 0.032151
---
Production systems are where abstract architecture meets operational reality. The concerns that surface in production, failure recovery, observability, correctness under edge cases, and deployment safety, are qualitatively different from what shows up in development, and the sources here approach them from several angles.

Reliability under failure is a recurring theme. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses it by persisting workflow state at every step so distributed applications recover automatically without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) extends this by mapping durable execution into three forms, stateless functions, sessions, and actors, and showing how Temporal, Restate, DBOS, and Resonate each implement them differently. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same idea in practice: AWS Lambda durable functions run a stateful, checkpointed scheduler without keeping a long-lived process alive.

Observability is only as useful as the feedback attached to it. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone don't improve agentic systems; attaching user ratings, behavioral signals, and deterministic rules to those traces is what creates a learning loop. [SigNoz's guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) makes the complementary point that reading traces in unfamiliar codebases requires understanding span anatomy and critical-path analysis before any optimization is possible.

Testing strategy in production is its own discipline. [Currents' framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) separates which Playwright tests belong in staging versus production and accounts for the operational cost of running tests against live systems. [Emphere's approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further for high-stakes tooling: fixture invariants and real-kernel eBPF runners that prove the system fails loudly rather than overclaiming certainty.

Deployment correctness surfaces in smaller places too. The [GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how a single wrong base commit silently deleted thousands of lines from main branches, an architectural choice Trunk avoided by never pushing temp branches to main. [YAML's Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a quieter version of the same failure mode: a spec-level parsing bug that persists across library implementations a decade after the fix landed.

[Anton Zaides' production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distill these lessons into heuristics, roll back before debugging, treat every external dependency as a future outage, drawn from real incidents rather than theory. Linear's architecture, [detailed by Dennis Brotzky](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown), shows what investing in production-quality infrastructure produces: local-first IndexedDB sync, optimistic updates, and service worker precaching that together make the app feel instant under real network conditions.
