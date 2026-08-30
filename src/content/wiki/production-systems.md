---
title: Production systems
summary: >-
  The design, operation, and failure modes of software running in production,
  spanning durable execution, observability, testing strategy, performance, and
  the hard-won rules that emerge only when real workloads hit real
  infrastructure.
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
compiled_at: '2026-08-30T05:58:09.664Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1283
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
  cost_usd: 0.039348
---
Production systems are where engineering assumptions meet reality. The gap between a working prototype and a system that stays working under load, failure, and human error is the domain these sources collectively map.

Durable execution addresses the fundamental problem of long-running work that must survive process crashes. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover automatically, and [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) shows this sits on a continuum from stateless functions through sessions to actors, each requiring different state and behavior guarantees. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same idea with AWS Lambda durable functions, running a checkpointed scheduler without keeping any long-lived process alive.

When things go wrong, the first rule is to roll back before debugging. [Anton Zaides's production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distill this and others from real incidents, including treating every external dependency as a scheduled outage. Distributed traces are the diagnostic tool of record in these systems; [the SigNoz guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers reading span anatomy and identifying N+1 staircases even in unfamiliar codebases. Observability without feedback is incomplete: [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces only become useful when paired with feedback signals that close the loop into learning.

Infrastructure correctness is a prerequisite. [Ivan Velichko's container walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how mount namespaces and pivot_root produce filesystem isolation that container orchestration depends on. [Marc Brooker on TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) is a reminder that low-level defaults can silently kill latency when Nagle's algorithm interacts with delayed ACKs on modern datacenter hardware. Database discipline matters too: [one post advocates](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) enforcing DB layer ownership of commits through AST-based linters to prevent accidental transaction leakage.

Testing strategy in production is a real design decision. [Currents's Playwright framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) lays out which flows belong in staging versus production and what the operational costs of each choice are. [Emphere's assurance platform](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further, requiring red runs that prove the system fails loudly rather than overclaiming certainty.

Performance in production is bounded by constraints that raw benchmark numbers ignore. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies attention thresholds, discrete capacity increments, and pipeline backpressure as three reasons order-of-magnitude improvements can fail to change outcomes. This frames the LLM inference optimization work practically: [Everpure's KV caching approach](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by up to 20x, but only matters where prefill is the actual bottleneck. [Netflix's in-house LLM serving stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) shows what full ownership of the inference pipeline looks like at scale, choosing vLLM over TensorRT-LLM and maintaining an OpenAI-compatible API surface throughout.

The merge queue incident documented by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates how architectural choices made before an incident determine whether a bug silently corrupts main or is contained. Production systems accumulate these choices across years; the [Rails audit process](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) is one method for surfacing what has accreted and where the fear lives.
