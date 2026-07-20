---
title: Production systems
summary: >-
  The engineering concerns that emerge when software runs at scale in the real
  world: reliability, observability, performance, failure recovery, and the
  operational discipline that keeps systems honest under load.
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
compiled_at: '2026-07-20T19:46:59.786Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6514
    output_tokens: 1196
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
  cost_usd: 0.037482
---
Production systems are distinguished from development or staging environments not by configuration alone but by consequence. Failures are real, latency costs money, and the gap between theoretical and actual behavior closes fast. The sources here span infrastructure primitives, distributed workflow patterns, and operational doctrine, and together they sketch what it actually takes to run software reliably.

Durable execution addresses one of production's oldest problems: what happens when a long-running process dies mid-flight. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover automatically without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) goes further, proposing three canonical forms, stateless functions, sessions, and actors, mapped along a behavior-state continuum, and shows how Temporal, Restate, DBOS, and Resonate each implement them. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle at a smaller scope, using AWS Lambda durable functions with a two-layer hierarchy to run stateful, checkpointed CI workflows without keeping a long-lived process alive.

Observability is the other side of reliability. Distributed traces let engineers understand what a system actually did, not what it was supposed to do. [The SigNoz guide to reading traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns in unfamiliar codebases. For agentic systems, traces alone fall short; [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that attaching feedback signals, user ratings, LLM-as-judge scores, and deterministic rules, to traces is what turns observability into a learning loop.

Performance gains in production are not always what they appear. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three constraints that explain why order-of-magnitude improvements often fail to change outcomes: attention thresholds, discrete capacity increments, and pipeline backpressure. On the networking side, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm silently kills latency in datacenter environments and that TCP_NODELAY should simply be the default.

Testing in production carries real costs but is sometimes necessary. [The Currents team's decision framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) covers which Playwright test flows belong in staging versus production and what the operational tradeoffs are for each. Separately, [Emphere Engineering](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) describes building a deterministic assurance platform with fixture invariants and real-kernel eBPF runners that proves a security tool fails loudly when it overclaims certainty, a harder standard than typical CI.

At the infrastructure layer, [Ivan Velichko's container walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how mount namespaces, mount propagation, and pivot_root actually produce filesystem isolation, grounding container abstractions in Linux primitives. A [GitHub merge queue incident analyzed by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates how a single architectural choice, never pushing temp branches to main, avoided a bug that silently deleted thousands of lines from other teams' repositories.

Operational discipline recurs as a theme. [Anton Zaides's distillation of engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) includes rolling back before debugging and treating every external dependency as a future outage. The [Legacy Rails audit guide](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) applies similar discipline to inherited codebases: surface fear and knowledge gaps before running any tools. These are not process rituals but responses to how production systems actually degrade.
