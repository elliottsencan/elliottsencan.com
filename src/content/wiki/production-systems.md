---
title: Production systems
summary: >-
  Production systems are the live, user-facing layer of software where
  reliability, observability, and failure recovery matter most — a surface where
  architectural choices made during development either hold or collapse under
  real load.
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
compiled_at: '2026-07-01T02:04:28.404Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6166
    output_tokens: 971
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
  cost_usd: 0.033063
---
A production system is distinguished from every earlier environment by one thing: real consequences. Bugs aren't caught by a developer; they affect users, corrupt state, or silently drop data. The sources here collectively map the disciplines that keep production systems viable: workflow durability, observability, testing strategy, performance architecture, and operational discipline.

Durable execution sits at the center of modern reliability work. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures automatically, and [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) gives this space structure: stateless functions, sessions, and actors map out what kinds of durability different systems actually need. Depot's CI orchestrator applies this directly, using AWS Lambda durable functions to run a stateful, checkpointed workflow scheduler without a long-lived process.

Observability is how production systems tell you what went wrong. Distributed traces are the primary instrument, and [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers reading them in unfamiliar codebases: span anatomy, critical-path analysis, and N+1 staircase patterns. For agentic systems, [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces alone are insufficient — attaching feedback signals to traces is what turns observability into a learning loop.

Testing strategy splits across environments. [Playwright in staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames which flows belong where and what the operational costs of production testing are. [Emphere's approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further: for a container security tool, they built an assurance platform using real-kernel eBPF runners and red runs designed to prove the system fails loudly rather than silently overclaiming certainty.

Architectural decisions made early show up as production constraints later. [Linear's performance breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) traces near-instant UI response to local-first IndexedDB sync, optimistic updates, and service worker precaching — choices baked into the architecture, not added afterward. [Colin Breck's analysis](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) is a useful counterweight: attention thresholds, discrete capacity increments, and pipeline backpressure explain why order-of-magnitude improvements often fail to change outcomes in practice.

Operational discipline fills the remaining gaps. [Anton Zaides's unwritten laws](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) include rolling back before debugging and treating every external dependency as a future outage — practices that only matter when systems are live. The [GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates what happens when assumptions about base commits go wrong in CI, silently deleting thousands of lines from main branches. Trunk avoided this by architectural choice: never pushing temp branches to main.

Production is where every abstraction gets tested against reality.
