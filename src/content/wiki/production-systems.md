---
title: Production systems
summary: >-
  The operational concerns that arise when software runs at scale: durability,
  observability, failure recovery, testing discipline, and the architectural
  choices that determine whether a system holds together under real-world load.
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
compiled_at: '2026-09-21T21:55:43.526Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1185
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
  cost_usd: 0.037878
---
Production systems are where the gap between a working demo and a working product becomes concrete. Across the sources here, several recurring concerns surface: how state survives failures, how to observe what is happening, how to test with confidence, and how architectural decisions compound over time.

Durable execution is one of the cleaner solutions to the failure-recovery problem. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications can recover automatically without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) formalizes this into three forms — stateless functions, sessions, and actors — and maps how platforms like Temporal, Restate, and DBOS each implement them along a behavior-state continuum. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows the pattern applied: AWS Lambda durable functions run a stateful, checkpointed scheduler without keeping a long-lived process alive, using a two-layer Lambda hierarchy and callback-driven job coordination.

Observability is not just logging — it requires understanding what traces actually tell you. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and patterns like N+1 staircases in unfamiliar codebases. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) extends the argument: traces alone don't improve agentic systems; feedback signals attached to those traces are what turn observability into a learning loop.

Testing discipline separates systems that hold under pressure from those that don't. [Emphere's approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) uses fixture invariants and red runs that prove the system fails loudly when it overclaims certainty — a form of negative testing that most production suites skip. [Currents' framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) draws a sharper boundary between staging and production testing, specifying which flows belong in each environment and what the operational costs of production testing actually are.

Small architectural decisions accumulate into large operational outcomes. [Marc Brooker on TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm is obsolete and its interaction with delayed ACKs still silently kills latency in modern datacenter deployments. [The merge queue bug analysis from Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how a single architectural choice — never pushing temp branches to main — avoided a GitHub incident that silently deleted thousands of lines from other teams' repositories. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) adds a useful counterweight: attention thresholds, discrete capacity increments, and pipeline backpressure mean that even order-of-magnitude performance improvements often fail to change real outcomes.

At the infrastructure layer, container isolation and LLM serving represent two areas where production specifics matter most. [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) builds a Docker-like container from scratch using Linux primitives to show how mount namespaces and root filesystem isolation actually work. [Netflix's in-house LLM serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) details engine selection, model packaging, and batched constrained decoding at scale — a full-stack production account rather than a benchmark comparison.

[Anton Zaides' engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before debugging, treat every external dependency as a future outage — read as a distillation of what production incidents teach repeatedly. The pattern across all of these sources is the same: production is where assumptions meet reality, and the systems that survive are the ones designed with that meeting in mind.
