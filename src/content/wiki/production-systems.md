---
title: Production systems
summary: >-
  The engineering concerns that govern software running at scale: durability,
  failure recovery, observability, testing discipline, and the operational costs
  imposed by every architectural choice.
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
compiled_at: '2026-07-06T00:19:36.680Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6166
    output_tokens: 1050
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
  cost_usd: 0.034248
---
Production systems are where architectural decisions stop being theoretical. The concerns that dominate — state persistence across failures, observability at depth, deployment safety, and the compounding cost of dependencies — appear consistently across the sources here.

Durable execution is one of the sharper examples. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation logic. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this further, proposing three forms — stateless functions, sessions, and actors — and showing how Temporal, Restate, DBOS, and Resonate each implement them differently. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same idea at the infrastructure level, using AWS Lambda durable functions to run a checkpointed CI scheduler without keeping a long-lived process alive.

Deployment integrity matters as much as runtime durability. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building temp branches off the wrong base commit; Trunk's architectural choice to never push temp branches to main avoided the incident entirely. The [unwritten laws of software engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distill similar hard-won lessons — roll back before debugging, treat every external dependency as a future outage.

Observability is the mechanism that turns production failures into learning. Distributed traces give structure to unfamiliar codebases: span anatomy, critical-path analysis, and N+1 staircase patterns are all readable once you know what to look for, as [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) documents. For agentic systems, [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone are insufficient — attaching feedback signals to traces is what turns observability into a learning loop.

Testing discipline divides by environment. [Playwright's staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) distinguishes which test flows belong where and names the operational costs of each. [Emphere's assurance platform](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further for security tooling: fixture invariants, real-kernel eBPF runners, and red runs that confirm the system fails loudly rather than overclaims certainty.

Performance optimization has its own ceiling problem. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three constraints — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why even order-of-magnitude gains often fail to change outcomes in practice. The [Linear architecture breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows what gains that do matter look like in practice: local-first IndexedDB sync, service worker precaching, and optimistic updates combine to make latency nearly imperceptible to users.

At the infrastructure layer, containerization provides the isolation model underpinning most of this. [Ivan Velichko's from-scratch walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) uses mount namespaces, mount propagation, and pivot_root to show how root filesystem isolation actually works beneath the abstractions developers rely on daily.
