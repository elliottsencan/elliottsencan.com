---
title: Production systems
summary: >-
  The engineering decisions that determine whether software survives contact
  with real load, real failures, and real users — covering durability,
  observability, testing, performance, and operational discipline.
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
compiled_at: '2026-08-11T08:01:02.257Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1422
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
  cost_usd: 0.041433
---
Production systems are where the gap between design intent and actual behavior becomes visible. The sources here cover that gap from many angles: workflow durability, observability, testing strategy, performance constraints, and the low-level infrastructure choices that determine whether a system holds under pressure.

Durable execution is one recurring theme. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this pattern into three forms — stateless functions, sessions, and actors — and shows how platforms like Temporal, Restate, DBOS, and Resonate implement them differently along a behavior-state continuum. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle using AWS Lambda durable functions: a two-layer hierarchy of Run and Workflow Lambdas runs a stateful, checkpointed scheduler without keeping a long-lived process alive.

Observability moves from logging toward feedback. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone do not improve agentic systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to those traces is what closes the learning loop. [SigNoz's guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers the practical side: reading span anatomy, identifying critical paths, and recognizing patterns like N+1 staircases in unfamiliar codebases.

Testing in production is its own discipline. [Currents Team](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames the staging-versus-production split as a decision framework: some flows only surface real behavior in production, and each environment carries distinct operational costs. [Emphere Engineering](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes this further for a container security tool, using fixture invariants, real-kernel eBPF runners, and deliberately red runs that prove the system fails loudly rather than overclaims certainty.

Infrastructure choices compound quietly. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues Nagle's algorithm is obsolete in modern datacenters and that TCP_NODELAY should be the default, because the Nagle and delayed-ACK interaction silently kills latency. [Ivan Velichko](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how container isolation actually works at the Linux layer — mount namespaces, mount propagation, and pivot_root — grounding production container behavior in first principles. A GitHub merge queue bug described by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates how an architectural choice — never pushing temp branches to main — avoided a silent deletion of thousands of lines from production codebases.

Performance gains do not always translate. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three constraints — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why order-of-magnitude improvements often change nothing in practice. This sits alongside LLM-specific performance work: [Netflix's in-house serving stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) covers engine selection, deployment strategies, and batched constrained decoding, while Everpure Engineering's series on KV caching ([persistence](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), and [S3/NFS storage](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs)) argues for treating the KV cache as a persistent shared asset to cut prefill costs by up to 20x.

Operational discipline cuts across all of this. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills hard-won rules from real incidents — roll back before debugging, treat every external dependency as a future outage. [Ally Piechowski's Rails audit process](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) starts with stakeholder interviews to surface fear and knowledge gaps before touching any tooling, which is itself a production-systems instinct: understand the social topology of a system before assuming the code tells the whole story.
