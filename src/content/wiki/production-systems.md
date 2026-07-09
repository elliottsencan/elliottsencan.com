---
title: Production systems
summary: >-
  Production systems span the infrastructure, workflows, and operational
  practices that keep software running reliably at scale, from durable execution
  and container isolation to observability, testing, and performance
  engineering.
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
compiled_at: '2026-07-09T14:18:24.845Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6166
    output_tokens: 1092
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
  cost_usd: 0.034878
---
Production systems are the full stack of decisions that determine whether software works when real users depend on it. The sources here cut across several layers: workflow durability, container primitives, observability, testing strategy, and performance constraints.

Durable execution sits at the foundation of long-running production workflows. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures automatically. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms — stateless functions, sessions, and actors — and shows how platforms like Temporal and Restate implement each. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle differently, using AWS Lambda durable functions in a two-layer hierarchy to run a stateful CI scheduler without keeping a long-lived process alive.

Container isolation is the runtime substrate beneath most production deployments. [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) assembles a Docker-like container from Linux primitives — unshare, mount, and pivot_root — making explicit how mount namespaces and root filesystem isolation actually function. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) extends this by running eBPF security checks against real kernels and using fixture invariants plus deliberate red runs to prove the system fails loudly rather than silently overclaiming certainty.

Observability is the mechanism by which production behavior becomes legible. [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns for reading traces in unfamiliar codebases. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone do not improve agentic systems — feedback signals attached to traces are what turn observability into a learning loop.

Testing strategy in production requires deliberate splits. [Currents](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames which Playwright flows belong in staging versus production and prices the operational cost of each. The [GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is a sharp example of what happens when infrastructure builds on wrong assumptions — silently deleting lines from main branches — and why architectural choices about temp branch handling have production consequences.

Performance constraints operate at multiple levels. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three reasons order-of-magnitude improvements often fail to change outcomes: attention thresholds, discrete capacity increments, and pipeline backpressure. At the LLM serving layer, [Everpure's KV caching work](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) and [Pure KVA's granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) show that treating the KV cache as a persistent shared asset can cut prefill costs dramatically — but Breck's framing applies: whether those gains matter depends on where the actual bottleneck sits.

[Anton Zaides's engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distill this into practical discipline: roll back before debugging, treat every external dependency as a future outage. These are the operating principles that connect infrastructure choices to production outcomes.
