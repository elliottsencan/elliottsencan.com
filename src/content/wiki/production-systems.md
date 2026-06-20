---
title: Production systems
summary: >-
  The operational, architectural, and process concerns that arise when software
  runs in real environments at real scale, from durable execution and container
  isolation to testing strategy, observability, and deployment safety.
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
compiled_at: '2026-06-20T12:43:33.479Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5842
    output_tokens: 1205
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
  cost_usd: 0.035601
---
Production systems are where abstractions meet reality. The concerns that matter in development, correctness in isolation, tend to compound once a system runs under real load, crosses failure boundaries, and must be operated by people who did not write it.

Durable execution is one persistent challenge. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications can recover from failures without manual reconciliation. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) offers a complementary taxonomy, mapping durable execution into three forms (stateless functions, sessions, actors) and showing how Temporal, Restate, DBOS, and Resonate each implement them differently. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same ideas at the CI layer, using AWS Lambda durable functions with a two-tier Run/Workflow hierarchy to run a stateful scheduler without a long-lived process.

Container isolation underpins much of modern production infrastructure. [Ivan Velichko](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) demonstrates that Linux primitives, unshare, mount, and pivot_root, are sufficient to reproduce Docker-style filesystem isolation, which makes the behavior of container runtimes legible rather than magical.

Deployment safety is where architectural choices have irreversible consequences. [Phil Vendola](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) describes a GitHub merge queue bug that silently deleted thousands of lines from main branches by building temp branches off the wrong base commit, and explains how Trunk's decision to never push temp branches to main avoided the damage entirely. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) reaches a similar conclusion from incident experience: roll back before debugging, and treat every external dependency as a future outage.

Testing strategy in production environments requires deliberate scoping. [Currents](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) provides a decision framework for splitting Playwright tests between staging and production, noting that some flows only make sense to verify against real infrastructure, while others carry too much operational risk to run there. [Emphere](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes a harder line for security tooling, insisting that red runs proving loud failure on overclaimed certainty are as important as green runs.

Observability closes the feedback loop. [SigNoz](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers how to read distributed traces in unfamiliar codebases, including span anatomy, critical-path analysis, and N+1 staircase patterns. [LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that for agentic systems, traces alone are insufficient; attaching feedback signals (user ratings, LLM-as-judge, deterministic rules) to traces is what converts observability into a learning loop.

Performance at scale often comes from architectural choices made early. [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) achieves near-instant response by combining local-first IndexedDB sync, optimistic updates, and service worker precaching, moving latency-sensitive work off the network path entirely. LLM inference at production scale faces analogous pressure; the Everpure Engineering series ([KV caching overview](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), [KVA for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs)) argues that treating the KV cache as a persistent shared asset, loaded via RDMA rather than recomputed, can reduce prefill costs by up to 20x and substantially improve throughput.
