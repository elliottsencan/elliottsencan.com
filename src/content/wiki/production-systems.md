---
title: Production systems
summary: >-
  The operational realities of running software in production, from durable
  execution and distributed tracing to testing strategies, performance
  constraints, and infrastructure choices that determine whether systems hold
  under real load.
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
compiled_at: '2026-09-28T23:09:51.789Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1321
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
  cost_usd: 0.039918
---
Production systems are where architectural decisions stop being theoretical. A cluster of sources here addresses the specific engineering disciplines required to keep distributed, stateful, and AI-heavy systems reliable under real conditions.

Durable execution is one prominent thread. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures automatically. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this design space into three forms — stateless functions, sessions, and actors — and shows how platforms including Temporal, Restate, DBOS, and Resonate each implement them. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same pattern practically, using AWS Lambda durable functions to orchestrate a stateful CI scheduler without keeping a long-lived process running.

Observability and feedback close the loop on what's actually happening. Distributed traces are a primary tool, but reading them in unfamiliar codebases requires understanding span anatomy, critical-path analysis, and patterns like N+1 staircases, as [SigNoz covers](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). For agentic systems specifically, [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces alone don't improve anything; feedback signals attached to traces, whether user ratings, LLM-as-judge, or deterministic rules, are what turn observability into a learning loop.

Testing strategy splits meaningfully between environments. [Currents](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) lays out which Playwright test flows belong in staging versus production, along with the operational costs of each. [Emphere](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes this further with a deterministic assurance platform for their container security tool, using fixture invariants and real-kernel eBPF runners that prove the system fails loudly when it overclaims certainty.

Performance is frequently misread. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three constraints — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why even order-of-magnitude improvements often fail to change outcomes. At a lower level, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm is obsolete in datacenter environments and that the interaction between Nagle and delayed ACK silently degrades latency in ways teams rarely trace back to the root cause.

Infrastructure choices carry long-term production weight. [Ivan Velichko's walk through container filesystem primitives](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows that mount namespaces, mount propagation, and pivot_root are the actual mechanisms production container isolation depends on. A [merge queue bug described by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates how architectural choices made early, like never pushing temp branches to main, determined which teams were exposed to a silent data-deletion incident.

For AI workloads specifically, production concerns shift toward inference cost and reliability. Netflix describes [running their full LLM serving stack in-house](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix), selecting vLLM over TensorRT-LLM, and handling batched constrained decoding at scale. Everpure Engineering argues across [three](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) [posts](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) [that](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) treating the KV cache as a persistent shared asset — served from fast storage via RDMA rather than recomputed per request — cuts prefill costs by up to 20x and dramatically improves token throughput.

[Anton Zaides distills hard-won rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) from real incidents: roll back before debugging, treat every external dependency as a future outage. These aren't abstract principles; they are the operational posture production systems require.
