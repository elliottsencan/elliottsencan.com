---
title: Production systems
summary: >-
  Practices and architectural patterns that keep software reliable in
  production, spanning durable execution, observability, testing strategy,
  performance constraints, and the operational discipline required to run
  complex systems at scale.
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
compiled_at: '2026-08-13T21:18:07.279Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1231
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
  cost_usd: 0.038568
---
Production systems are where architectural decisions meet their consequences. The gap between code that works in development and code that survives real load, real failures, and real data is where most of the hard engineering lives.

Durable execution addresses one persistent class of production failure: long-running distributed workflows that break midway and leave state inconsistent. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover automatically without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms — stateless functions, sessions, and actors — showing how platforms like Temporal, Restate, DBOS, and Resonate each choose different points on the behavior-state continuum. Depot's CI orchestrator takes the same idea further, using [AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) to run a stateful, checkpointed scheduler without keeping a long-lived process alive.

Observability is what makes failures diagnosable after the fact. Distributed traces are the primary tool, but reading them in unfamiliar codebases requires understanding span anatomy, critical-path analysis, and patterns like N+1 staircases, as [SigNoz covers in detail](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). For agentic systems, traces alone are insufficient. [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that attaching feedback signals — user ratings, indirect behavior, LLM-as-judge — to traces is what turns observability into a learning loop rather than a post-mortem archive.

Testing strategy in production is its own discipline. [Currents' decision framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) for splitting Playwright tests between staging and production makes the tradeoff explicit: staging catches regressions safely, production testing catches what staging cannot simulate, and the operational costs differ substantially. Emphere goes further, building a [deterministic assurance platform](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) that uses real-kernel eBPF runners and red runs designed to fail loudly when the system overclaims certainty.

Performance work in production has its own trap. [Colin Breck identifies three constraints](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why order-of-magnitude improvements often change nothing in practice. The same logic applies to networking: [Marc Brooker's case for TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows how Nagle's algorithm silently degrades latency in datacenters where the original problem it solved no longer exists.

Production discipline also lives in conventions. [Anton Zaides distills](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) rules like rolling back before debugging and treating every external dependency as a future outage. Enforcing database layer ownership through [AST-based linters and CI checks](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) is another example of encoding production-learned constraints into tooling so they cannot be quietly violated. The GitHub merge queue incident documented by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows the stakes: a wrong base commit silently deleted thousands of lines from main branches, an incident their architecture avoided by never pushing temp branches to main.

At the infrastructure layer, container isolation mechanics — [mount namespaces, propagation, and pivot_root](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) — underpin how production workloads are isolated from each other. And for LLM serving specifically, [Netflix's in-house stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) illustrates the full operational surface: engine selection, model packaging, API compatibility, deployment strategies, and batched constrained decoding — all choices that compound into real production behavior.
