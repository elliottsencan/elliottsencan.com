---
title: Production systems
summary: >-
  The practices, architectures, and failure modes that define software running
  at scale in real environments, from durable execution and observability to
  testing strategies and infrastructure tradeoffs.
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
compiled_at: '2026-07-15T10:07:51.664Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6333
    output_tokens: 1082
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
  cost_usd: 0.035229
---
Production systems are where engineering decisions meet consequences. The gap between code that works in development and code that holds up under real load, partial failures, and organizational change is the central problem every source here addresses from a different angle.

Durable execution is one architectural response to that gap. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications can recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space further, distinguishing stateless functions, sessions, and actors along a behavior-state continuum and showing how Temporal, Restate, DBOS, and Resonate each implement those patterns. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same ideas practically, using AWS Lambda durable functions in a two-layer hierarchy to run a stateful CI scheduler without keeping a long-lived process alive.

Observability is the other side of the coin. Distributed traces are the primary instrument for understanding what production is actually doing, but reading them in unfamiliar codebases requires knowing span anatomy, critical-path analysis, and patterns like N+1 staircases [as SigNoz details](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). For agentic systems specifically, [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces alone are insufficient; attaching feedback signals to traces is what turns observability into a learning loop.

Testing across environments is a persistent operational cost. [Currents' decision framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) for splitting Playwright tests between staging and production surfaces the tradeoffs: staging catches regressions safely, but only production testing can catch the class of failures that depend on real traffic and data. [Emphere's approach to testing a container security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further, requiring red runs that prove the system fails loudly rather than overclaims certainty.

Infrastructure choices compound over time. [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) of assembling a container from scratch using Linux primitives illustrates how mount namespaces and root filesystem isolation actually work, knowledge that matters when things break. The [GitHub merge queue incident described by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how a single architectural assumption, building temp branches off the wrong base, silently deleted thousands of lines from main branches.

Performance gains require careful framing. [Colin Breck's analysis](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three constraints, attention thresholds, discrete capacity increments, and pipeline backpressure, that explain why order-of-magnitude improvements often fail to change outcomes. [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown), with local-first IndexedDB sync, service worker precaching, and optimistic updates, shows what it looks like when performance is treated as a first-class production constraint from the start.

Finally, [the unwritten laws distilled from real incidents](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) capture the organizational side: roll back before debugging, treat every external dependency as a future outage. Production systems fail at the intersection of technical and human factors, and the sources here collectively argue that the discipline is about building for that reality rather than the happy path.
