---
title: Production systems
summary: >-
  Production systems span the infrastructure, operational patterns, and
  engineering discipline required to run software reliably at scale, from
  durable execution and container isolation to observability, testing strategy,
  and performance constraints.
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
compiled_at: '2026-11-03T00:43:39.206Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1406
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
  cost_usd: 0.041193
---
Production systems are where theoretical engineering decisions meet real consequences. The gap between a working prototype and a system that runs reliably under load, across failures, and through organizational change is substantial, and the sources here trace that gap from several directions.

Durable execution is one foundational pattern. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures automatically rather than requiring manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into three forms — stateless functions, sessions, and actors — showing how Temporal, Restate, DBOS, and Resonate each implement them differently along a behavior-state continuum. [Depot CI's orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same pattern to CI pipelines, using AWS Lambda durable functions with a two-layer Run/Workflow hierarchy to coordinate jobs without keeping a long-lived process alive.

Container isolation underpins much of how production workloads are packaged. [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) assembles a Docker-like container from scratch using only Linux primitives — unshare, mount, pivot_root — making mount namespaces and filesystem isolation concrete rather than abstract.

Observability in production is not just about collecting data. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone don't improve agentic systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — is what turns observability into a learning loop. [The SigNoz guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers the practical mechanics of reading distributed traces in unfamiliar codebases, including span anatomy, critical-path analysis, and N+1 staircase patterns.

Testing in production is its own subdiscipline. [Currents' framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) distinguishes which Playwright flows belong in staging versus production and prices the operational cost of each. [Emphere's approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further, using fixture invariants and real-kernel eBPF runners alongside red runs that prove the system fails loudly rather than silently overclaiming correctness.

Performance at the infrastructure layer has its own traps. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm is obsolete on modern datacenter hardware and that the Nagle/delayed-ACK interaction still silently degrades latency. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) offers the counterpoint: even order-of-magnitude gains can fail to change outcomes when attention thresholds, discrete capacity increments, or pipeline backpressure constrain the system elsewhere.

Operational discipline compounds these technical concerns. [Anton Zaides' engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) include rolling back before debugging and treating every external dependency as a future outage — heuristics earned from real incidents. [The GitHub merge queue bug analysis from Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how an architectural choice to never push temp branches to main insulated their system from an incident that silently deleted thousands of lines from other teams' main branches.

At the data layer, [enforcing DB layer ownership of commits via AST-based linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) and guarding against YAML parsing surprises like the Norway problem — [where NO parses as false](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) across widely used libraries — illustrate how production correctness often depends on constraints enforced upstream of runtime.

For LLM-backed production systems specifically, [Netflix's in-house serving stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) details engine selection, model packaging, and batched constrained decoding at scale, while [Everpure's KV cache work](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) and [Anthropic's analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) show how careful infrastructure design — persistent attention states, semantic routing, governed data sources — determines whether these systems stay economically and operationally viable under real load.
