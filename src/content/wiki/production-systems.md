---
title: Production systems
summary: >-
  The architecture, reliability patterns, and operational discipline required to
  run software at scale, covering durable execution, observability, performance
  constraints, and the compounding costs of production incidents.
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
compiled_at: '2026-08-03T10:10:56.328Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1120
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
  cost_usd: 0.036903
---
Production systems are where design decisions meet real consequences. The gap between a working prototype and software that operates reliably under load, across failures, and over time is the central problem this concept addresses.

Durable execution has emerged as one of the more principled approaches to distributed system reliability. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications can recover from failures without manual reconciliation. Jack Vanlightly [taxonomizes durable execution](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) into three forms — stateless functions, sessions, and actors — mapped along a behavior-state continuum, with Temporal, Restate, DBOS, and Resonate each implementing different combinations. Depot CI applies the same principle differently: their orchestrator [uses AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) to run a stateful, checkpointed scheduler without a long-lived process, using a two-layer Lambda hierarchy and callback-driven coordination.

Observability is only useful when it closes a feedback loop. Distributed traces let engineers understand unfamiliar systems by [reading span anatomy and identifying critical-path bottlenecks](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) like N+1 staircases. For agentic systems, Harrison Chase argues that [traces alone are insufficient](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) — attaching feedback signals (user ratings, LLM-as-judge, deterministic rules) to traces is what turns observability into a learning loop.

Performance gains do not automatically translate to production outcomes. Colin Breck identifies three constraints — [attention thresholds, discrete capacity increments, and pipeline backpressure](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) — that explain why even order-of-magnitude improvements often change nothing in practice. A related networking example: [TCP_NODELAY should be the default](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) on modern datacenter hardware because Nagle's algorithm's interaction with delayed ACKs silently kills latency in ways that are easy to miss and hard to diagnose.

At the infrastructure layer, container isolation depends on Linux primitives — [mount namespaces, mount propagation, and pivot_root](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) — that most engineers never touch directly but that underlie every containerized deployment. Merge queues introduce their own failure modes: a GitHub bug [silently deleted thousands of lines from main branches](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) by building temp branches off the wrong base commit, an incident Trunk avoided by never pushing temp branches to main.

Testing strategy splits across environments. [Playwright tests belong in staging or production depending on the flow](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production), with production testing carrying real operational costs that must be weighed against coverage value. Security tooling demands higher standards still: [Emphere's deterministic assurance platform](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) uses fixture invariants and real-kernel eBPF runners, including red runs that prove the system fails loudly rather than overclaiming certainty.

Hard-won production rules distilled from incidents include [rolling back before debugging, and treating every external dependency as a future outage](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering). Configuration formats introduce their own production risk: [YAML's Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem), where the country code NO parses as false, persists in widely-used libraries despite the spec fix landing over a decade ago.
