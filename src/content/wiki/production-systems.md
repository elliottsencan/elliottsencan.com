---
title: Production systems
summary: >-
  The engineering concerns that arise when software runs in real environments
  under real load: reliability, observability, failure recovery, performance
  constraints, and the operational practices that keep systems from silently
  degrading.
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
compiled_at: '2026-07-19T14:38:55.273Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6514
    output_tokens: 1270
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
  cost_usd: 0.038592
---
Production systems expose a class of problems that staging environments and local development systematically hide. The gap between code that passes tests and code that survives real traffic is where most hard-won engineering knowledge lives.

Reliability starts with how failures are handled. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses this directly: persisting workflow state at every step so distributed applications recover automatically rather than requiring manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of durable execution into stateless functions, sessions, and actors maps this design space more precisely, showing how platforms like Temporal, Restate, DBOS, and Resonate implement each form. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle differently, using AWS Lambda durable functions to run stateful checkpointed workflows without keeping a long-lived process alive.

Observability is the counterpart to reliability: you need visibility into what is actually happening. [The SigNoz guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns as practical tools for navigating unfamiliar systems. [LangChain's argument](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) extends this to agentic systems: traces alone are not enough; attaching feedback signals to traces is what converts observability into an improvement loop.

Performance constraints in production are subtler than benchmarks suggest. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three reasons order-of-magnitude improvements often fail to change outcomes: attention thresholds, discrete capacity increments, and pipeline backpressure. On the infrastructure side, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm is a persistent latency trap in datacenter environments and that TCP_NODELAY should simply be the default. For LLM workloads specifically, the Everpure Engineering series on KV caching argues that reusing attention states across sessions can cut prefill costs by up to 20x [by treating the KV cache as a persistent shared asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) and [segmenting prompts into reusable chunks](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure).

Testing and deployment practices shape how safely changes reach production. [The Playwright decision framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) separates which test flows belong in staging versus production and quantifies the operational cost of each. The GitHub merge queue incident documented by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is a concrete example of how an architectural choice, never pushing temp branches to main, can prevent a class of silent data-loss bugs. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) for a container security tool goes further: red runs that prove the system fails loudly when it overclaims, using real-kernel eBPF runners rather than mocks.

At the application layer, [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills incident-derived rules, including rolling back before debugging and treating every external dependency as a future outage. [The audit framework for legacy Rails codebases](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) approaches production systems from the opposite direction: how to orient yourself quickly in a system you did not build, starting with stakeholder fear maps before touching any tooling. [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows what production performance looks like when latency is treated as a product requirement from the start: local-first IndexedDB sync, optimistic updates, and service worker precaching combine to make the gap between local and network state nearly invisible to users.
