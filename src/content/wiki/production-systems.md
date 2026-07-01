---
title: Production systems
summary: >-
  The infrastructure, operational patterns, and engineering discipline behind
  keeping software running reliably at scale, spanning durable execution,
  observability, testing strategy, deployment safety, and performance
  optimization.
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
compiled_at: '2026-06-22T07:20:33.651Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6013
    output_tokens: 1086
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
  cost_usd: 0.034329
last_source_added: '2026-07-01T01:52:07.468Z'
---
Production systems are where abstractions meet consequences. Several sources here address a common core problem: how do you build software that survives failure, scales under load, and remains debuggable after the fact?

Durable execution sits at one corner of this. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. Jack Vanlightly's taxonomy [of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) extends this, breaking execution models into stateless functions, sessions, and actors across a behavior-state continuum, then mapping how Temporal, Restate, DBOS, and Resonate each implement these patterns. Depot takes a related approach in CI: their orchestrator [uses AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) to run a stateful, checkpointed scheduler without keeping a long-lived process alive, avoiding the fragility of persistent servers.

Observability is the other side of reliability. [Distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) give engineers a way into unfamiliar codebases, with span anatomy, critical-path analysis, and N+1 staircase patterns serving as diagnostic vocabulary. LangChain's Harrison Chase argues that [traces alone aren't enough](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) for agentic systems; attaching feedback signals to traces is what turns observability into a learning loop. Anton Zaides distills production incident experience into [seven engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering), with rollback-before-debugging and treating every external dependency as a future outage near the top.

Testing strategy in production is its own discipline. The [Playwright staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) outlines which flows belong where and what operational costs production testing carries. Emphere's approach to [testing a security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further, using fixture invariants and red runs that prove the system fails loudly rather than silently overclaiming certainty.

Deployment safety surfaces in the [merge queue incident post-mortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit), where a GitHub bug silently deleted thousands of lines by building off the wrong base commit. Trunk avoided the incident through an architectural choice made before the bug existed.

Performance at scale ties several threads together. Linear's [near-instant interface](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) depends on local-first IndexedDB sync, optimistic updates, and service worker precaching rather than faster servers. On the LLM side, Everpure's work on [KV cache persistence](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) reframes the attention cache as a shared data asset injected from fast storage, cutting prefill costs by up to 20x. Anthropic's [self-service analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) shows a production AI system built on canonical datasets and a semantic layer to achieve 95% automation with measurable accuracy, avoiding the brittleness of open-ended warehouse access.
