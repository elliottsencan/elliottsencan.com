---
title: Production systems
summary: >-
  The operational concerns that emerge when software runs at scale —
  reliability, performance, observability, and correctness under failure —
  spanning infrastructure choices, workflow durability, and the gap between
  engineering gains and real-world outcomes.
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
compiled_at: '2026-08-10T19:05:12.381Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1284
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
  cost_usd: 0.039363
---
Production systems are where the abstractions of software engineering meet physical constraints: partial failures, network latency, shared state, and the irreversibility of actions taken on real data. The sources here circle this territory from multiple angles.

Durability and failure recovery are a recurring concern. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications can recover automatically from failures. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms — stateless functions, sessions, and actors — and shows how platforms like Temporal, Restate, DBOS, and Resonate implement them along a behavior-state continuum. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle at the CI layer, using AWS Lambda durable functions with a two-layer orchestration hierarchy to run stateful pipelines without a long-lived process.

Correctness under edge cases is harder than it looks. The GitHub merge queue incident described by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how a subtle base-commit bug silently deleted thousands of lines from main branches. [Emphere](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) addresses a related problem in security tooling: building real-kernel test fixtures that prove the system fails loudly rather than overclaiming certainty. YAML configuration, often treated as inert, carries its own correctness traps — [the Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) where the country code `NO` parses as `false` persists in widely-used libraries despite a spec fix over a decade old.

Observability requires more than data collection. [SigNoz](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) explains how to read distributed traces in unfamiliar codebases by analyzing span anatomy and critical paths. [LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone don't improve agentic systems — attaching feedback signals turns observability into a learning loop. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) draws from production incidents to argue for rollback-before-debugging as a default and treating every external dependency as a future outage.

Performance optimization has an underappreciated ceiling. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three constraints — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why even order-of-magnitude gains often change nothing in practice. At the network layer, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues Nagle's algorithm is obsolete in datacenter environments and that the Nagle/delayed-ACK interaction still silently kills latency in systems that haven't opted into `TCP_NODELAY`.

Infrastructure isolation is a foundational concern. [Ivan Velichko](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) demonstrates how mount namespaces, propagation, and `pivot_root` compose to produce container filesystem isolation — knowledge that matters when debugging failures that production containers expose but local environments hide.

LLM serving at scale introduces its own production constraints. [Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) details engine selection, model packaging, and batched constrained decoding for in-house LLM infrastructure. Everpure Engineering argues across multiple posts that treating the KV cache as a [persistent shared asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) — stored on NFS or S3 and reused across sessions — can cut prefill costs by up to 20x and that [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) reduces GPU costs further by only processing changed tokens.

Across these sources, the consistent pressure is the same: production exposes assumptions that development conceals, and reliability comes from designing explicitly for the failure modes that only appear at scale.
