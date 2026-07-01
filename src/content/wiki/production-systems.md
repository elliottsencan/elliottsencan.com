---
title: Production systems
summary: >-
  The operational realities of running software in production: failure modes,
  observability, performance constraints, and the architectural choices that
  separate systems that hold under load from ones that silently degrade.
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
compiled_at: '2026-07-01T04:52:05.635Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6166
    output_tokens: 1059
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
  cost_usd: 0.034383
---
Production systems are where the gap between good engineering and good intentions becomes visible. The sources here converge on a recurring theme: systems fail not through dramatic crashes but through subtle misalignments between design assumptions and real conditions.

Failure often comes from trusting infrastructure that looks reliable. A GitHub merge queue bug, detailed by Phil Vendola at Trunk, silently corrupted main branches by building against the wrong base commit [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). The fix was architectural: never push temp branches to main. Anton Zaides distills the same instinct into a rule of thumb — roll back before debugging, and treat every external dependency as a future outage [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering).

Observability is the other recurring thread. Distributed traces give you visibility into unfamiliar systems, but Elizabeth at SigNoz is clear that reading them requires understanding span anatomy and critical-path analysis, not just collecting data [How to read distributed traces when you didn't write the code](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). Harrison Chase at LangChain makes a parallel argument for agentic systems: traces alone don't improve anything — you need feedback signals attached to those traces to create a learning loop [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

Performance gains in production don't always translate to outcomes. Colin Breck identifies three constraints — attention thresholds, discrete capacity increments, and pipeline backpressure — that can swallow even order-of-magnitude improvements without changing system behavior [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter). This pairs with the Linear architecture breakdown, which shows that perceived performance often depends as much on local-first sync and optimistic updates as on raw throughput [How's Linear so fast?](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown).

Durability and stateful coordination are structural concerns that surface repeatedly. Temporal provides durable execution by persisting workflow state at every step, allowing automatic recovery without manual reconciliation [Temporal](/reading/2026-04/2026-04-30t231511-temporal). Jack Vanlightly maps this design space into three forms — stateless functions, sessions, and actors — showing how platforms like Temporal, Restate, and DBOS each occupy different positions on a behavior-state continuum [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot applies similar ideas to CI orchestration, using AWS Lambda durable functions with a two-layer hierarchy to run stateful workflows without keeping long-lived processes alive [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Testing discipline under production conditions is its own category. The Playwright testing piece lays out a decision framework for which tests belong in staging versus production, treating production testing as an operational cost to be managed rather than avoided [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Emphere's approach to testing a container security tool goes further, requiring red runs that prove the system fails loudly when it overclaims certainty [Testing a Security Tool Like It Can Hurt People](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people). Both reflect the same underlying principle: production readiness is proven by what breaks correctly, not just by what works.
