---
title: Production systems
summary: >-
  The engineering realities of running software in production: durability,
  observability, testing discipline, performance constraints, and the
  operational choices that determine whether systems recover gracefully or fail
  silently.
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
  - 2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix
compiled_at: '2026-10-19T22:13:29.825Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1209
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
  cost_usd: 0.038238
---
Production systems are where engineering decisions get priced. The gap between a working prototype and a reliable production deployment is filled with choices about state management, failure recovery, observability, and the constraints that make theoretical performance gains irrelevant in practice.

Durable execution is one of the more consequential bets a production system can make. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) taxonomizes durable execution into three forms — stateless functions, sessions, and actors — and maps how Temporal, Restate, DBOS, and Resonate each implement them. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle without a long-lived process: AWS Lambda durable functions checkpoint a stateful workflow scheduler through a two-layer Run/Workflow hierarchy, recovering state via callbacks rather than keeping anything alive.

Observability in production is only useful when it connects to action. [SigNoz](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers reading distributed traces in unfamiliar codebases — span anatomy, critical-path analysis, N+1 staircase patterns. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone do not improve agentic systems; feedback signals attached to traces are what turn observability into a learning loop. Both sources converge on the same principle: instrumentation without a downstream feedback path is logging theater.

Testing strategy in production requires explicit choices about where tests run. [Currents](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames this as a decision: which Playwright flows belong in staging versus production, and what the operational cost of each choice is. [Emphere](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes a harder line for security tooling, using real-kernel eBPF runners and red runs that verify the system fails loudly when it would overclaim certainty.

Infrastructure choices compound over time. [Ivan Velichko](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how container filesystem isolation actually works under Linux — mount namespaces, propagation, pivot_root — which matters when debugging production container behavior that abstractions have hidden. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm is obsolete on modern datacenter hardware and that the Nagle/delayed-ACK interaction still silently kills latency in systems that have not set TCP_NODELAY.

Performance improvements do not always change outcomes. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three constraints — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why even order-of-magnitude gains often fail to move the needle in practice. This sits alongside the [unwritten engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distilled from production incidents: roll back before debugging, treat every external dependency as a future outage.

At the data layer, [one post](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) advocates enforcing strict DB layer ownership of all commits using AST-based linters and CI checks, preventing transaction leakage before it reaches production. [A GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) demonstrates how a single wrong base commit in a temp branch silently deleted thousands of lines from main — an incident Trunk avoided by architectural choice rather than detection after the fact.

The through-line across these sources: production reliability is built from deliberate decisions at every layer, not recovered from after failures. State management, observability wiring, testing placement, dependency treatment, and low-level network defaults all compound into systems that either hold or quietly degrade.
