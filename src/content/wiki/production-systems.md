---
title: Production systems
summary: >-
  The operational, architectural, and tooling concerns that arise when software
  runs at scale in real environments, from durable execution and observability
  to inference efficiency and deployment correctness.
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
compiled_at: '2026-10-26T22:31:49.897Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1142
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
  cost_usd: 0.037233
---
Production systems is the broad surface where engineering decisions stop being theoretical and start carrying real costs. The sources here span infrastructure plumbing, workflow reliability, observability, and the emerging demands of serving AI models at scale.

Durable execution is a recurring pressure point. Temporal's platform [persists workflow state at every step](/reading/2026-04/2026-04-30t231511-temporal) so distributed applications recover from failures without custom reconciliation logic. Jack Vanlightly's taxonomy [maps this space into three forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) — stateless functions, sessions, and actors — and shows how Temporal, Restate, DBOS, and Resonate implement each differently. Depot's CI orchestrator [applies the same pattern to continuous integration](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions), using AWS Lambda durable functions in a two-layer hierarchy so a stateful scheduler can run without a long-lived process.

Observability is what connects failures to understanding. Distributed traces are the primary artifact, and a practical guide to reading them [covers span anatomy, critical-path analysis, and N+1 staircase patterns](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) for unfamiliar codebases. LangChain's Harrison Chase [argues that traces alone are insufficient](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) for agentic systems: attaching feedback signals — user ratings, indirect behavior, LLM-as-judge — is what turns observability into a learning loop.

Correctness in deployment is harder than it looks. A GitHub merge queue bug [silently deleted thousands of lines from main](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) by building temp branches off the wrong base commit. Container isolation, often assumed rather than understood, [requires assembling mount namespaces, mount propagation, and root filesystem isolation from Linux primitives](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like). Colin Breck [adds a sobering constraint](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter): even order-of-magnitude improvements often fail to change outcomes when attention thresholds, discrete capacity increments, or pipeline backpressure absorb the gains.

Network-level defaults matter more than most teams assume. Marc Brooker [makes the case that Nagle's algorithm is obsolete](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) in modern datacenters and that the Nagle/delayed-ACK interaction still silently kills latency in production services that never set TCP_NODELAY.

LLM inference has become its own production discipline. Netflix [details running the full serving stack in-house](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix), covering engine selection (vLLM over TensorRT-LLM), model packaging, and batched constrained decoding at scale. The KV cache has emerged as the central optimization lever: Everpure argues for [treating it as a persistent shared data asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), with [granular-prompt segmentation](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) and [NFS/S3-backed persistence](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) delivering up to 20x inference speedups without model changes.

The unwritten rules of production [distilled from real incidents](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) include rolling back before debugging and treating every external dependency as a future outage. These aren't principles; they're scar tissue.
