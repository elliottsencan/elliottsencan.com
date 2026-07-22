---
title: Production systems
summary: >-
  The operational concerns that keep distributed software reliable at scale:
  workflow durability, observability, testing strategy, performance constraints,
  and the accumulated engineering judgment that separates code that ships from
  code that holds.
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
compiled_at: '2026-07-22T05:57:31.205Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6514
    output_tokens: 1269
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
  cost_usd: 0.038577
---
Production systems are where engineering decisions stop being theoretical. The sources here collectively trace the gap between code that runs and infrastructure that stays running, touching workflow orchestration, observability, testing discipline, networking details, and the institutional knowledge that accumulates around real systems.

Durable execution is one recurring thread. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step, letting distributed applications recover from failures automatically. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into three forms, stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each implement them differently. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) takes the same principle into serverless infrastructure, using AWS Lambda durable functions with a two-layer orchestration hierarchy to run stateful CI workflows without keeping a long-lived process alive.

Observability compounds these concerns. [SigNoz's guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy and critical-path analysis for unfamiliar codebases. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) pushes further, arguing that traces alone are insufficient for agentic systems and that feedback signals, user ratings, LLM-as-judge, and deterministic rules, are what convert observability into a learning loop.

Testing strategy splits across environments. [Currents' Playwright guide](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) provides a decision framework for which test flows belong in staging versus production, including the operational costs of running tests against live systems. [Emphere's approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further, building a deterministic assurance platform with real-kernel eBPF runners and red runs designed to prove the system fails loudly on overclaims, a model of testing as proof of failure bounds rather than proof of success.

Merge queues and CI pipelines have their own failure modes. Trunk's post-mortem on a GitHub merge queue bug describes how temp branches built off the wrong base silently deleted thousands of lines from main, and explains why their architectural decision to never push temp branches to main avoided the incident entirely.

Smaller choices compound into reliability too. [Marc Brooker on TCP\_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues Nagle's algorithm is obsolete in datacenter environments, the Nagle/delayed-ACK interaction still silently kills latency in systems where application-layer protocols have already solved the tiny-packet problem. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) provides the counterbalance: attention thresholds, discrete capacity increments, and pipeline backpressure mean that even order-of-magnitude performance gains frequently fail to change outcomes at the system level.

The institutional dimension appears in [Anton Zaides's unwritten engineering laws](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering), which distill production experience into rules like rolling back before debugging and treating every external dependency as a future outage. [Ally Piechowski's Rails audit method](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) applies a similar sensibility to legacy systems, starting with stakeholder interviews to surface knowledge gaps before touching any tooling.

Container isolation, YAML parsing quirks, and database transaction ownership round out the picture. [Ivan Velichko's from-scratch container walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) uses Linux primitives to show how mount namespaces and pivot\_root actually work. [The Norway problem in YAML](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) is a reminder that configuration formats carry sharp edges into production for decades. [Banning manual DB commits with AST analysis](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) shows how to enforce layer ownership mechanically rather than by convention.
