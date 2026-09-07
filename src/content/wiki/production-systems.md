---
title: Production systems
summary: >-
  The engineering concerns that emerge when software runs at scale in the real
  world: failure recovery, observability, performance constraints, and the
  accumulated decisions that determine whether a system stays reliable under
  load.
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
compiled_at: '2026-09-07T21:20:28.702Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1085
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
  cost_usd: 0.036378
---
Production systems are defined less by their initial design than by what survives contact with reality. The sources here converge on a cluster of recurring themes: how systems fail and recover, how performance gains translate (or don't) into real outcomes, and how observability shapes the feedback loops that let teams improve over time.

Failure recovery is a first-class concern. Temporal's durable execution model persists workflow state at every step so distributed applications recover from failures without manual reconciliation [Temporal](/reading/2026-04/2026-04-30t231511-temporal). Jack Vanlightly's taxonomy of durable function forms maps this into three patterns — stateless functions, sessions, and actors — showing how platforms like Temporal, Restate, and DBOS each implement them differently along a behavior-state continuum [Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot's CI orchestrator takes a related approach, using AWS Lambda durable functions in a two-layer hierarchy to run stateful, checkpointed CI workflows without a persistent long-lived process [Building CI with Lambda](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). The GitHub merge queue incident reported by Trunk shows what happens when recovery is absent: a silent bug built temp branches off the wrong base commit and deleted thousands of lines from main, something Trunk's architecture avoided by never pushing temp branches to main at all [Merge Queue Bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

Performance in production is constrained by factors that benchmarks rarely capture. Colin Breck identifies three structural constraints — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why order-of-magnitude improvements often change nothing in practice [Performance Gains](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter). Marc Brooker's case for defaulting to TCP_NODELAY is a concrete instance of this: Nagle's algorithm still silently degrades latency in modern datacenters because application-layer protocols have already solved the tiny-packet problem it was designed for [TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time).

Observability is only useful when it closes a loop. LangChain's Harrison Chase argues that traces alone don't improve agentic systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, and deterministic rules — is what turns observability data into learning [Agent Observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). SigNoz's guide to reading distributed traces in unfamiliar codebases covers span anatomy, critical-path analysis, and N+1 staircase patterns as practical tools for diagnosing production issues without having written the code [Distributed Traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code).

At the infrastructure layer, Netflix's in-house LLM serving stack illustrates the full scope of production concerns: engine selection, model packaging, OpenAI-compatible API surfaces, deployment strategies, and batched constrained decoding at scale [Netflix LLM Serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Testing in production carries its own calculus — Currents' framework for splitting Playwright tests between staging and production treats each environment as having genuinely different roles rather than one being a proxy for the other [Playwright Testing](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Emphere's approach to testing a container security tool adds a harder requirement: the system must fail loudly when it overclaims certainty, treating false confidence as its own failure mode [Security Tool Testing](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people).
