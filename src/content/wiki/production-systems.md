---
title: Production systems
summary: >-
  The engineering practices, architectural patterns, and operational realities
  that govern software running in production, from durable execution and
  observability to configuration hazards and deployment safety.
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
compiled_at: '2026-07-21T05:05:13.513Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6514
    output_tokens: 1121
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
  cost_usd: 0.036357
---
Production systems are defined less by their initial design than by what happens when they run under real load, encounter failures, and accumulate history. Several recurring themes connect the sources tagged here: failure recovery, observability, safe deployment, and the hidden costs of seemingly mundane choices.

Durable execution represents one architectural answer to production reliability. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications can recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms — stateless functions, sessions, and actors — and shows how platforms like Temporal, Restate, DBOS, and Resonate each implement them. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle at a different scale, using AWS Lambda durable functions with a two-layer Run/Workflow hierarchy so a stateful CI scheduler survives without keeping a long-lived process alive.

Deployment safety surfaces in more mundane ways too. A GitHub merge queue bug silently deleted thousands of lines from main branches by building temp branches off the wrong base commit; [Trunk's post-mortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) explains how their architectural choice to never push temp branches to main avoided the incident entirely. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills a complementary rule from production incidents: roll back before debugging, and treat every external dependency as a future outage. The [Playwright testing decision framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) addresses where in the pipeline tests belong, covering which flows warrant production execution and what operational costs that implies.

Observability in production is only as useful as what you do with signals. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone don't improve agentic systems; attaching feedback signals — user ratings, LLM-as-judge scores, deterministic rules — is what turns observability into a learning loop. [SigNoz's guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) gives the complementary skill: reading span anatomy and critical-path analysis in unfamiliar codebases. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) pushes further, insisting that a production security tool must fail loudly and abstain rather than overclaim certainty, using red runs that prove the system behaves correctly under adversarial conditions.

Configuration and protocol choices carry hidden production costs that rarely appear in benchmarks. [YAML's Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) — where the country code NO parses as false — persists in widely-used libraries despite the spec fix landing over a decade ago, a reminder that configuration formats carry silent failure modes. [Marc Brooker on TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the same point at the network layer: Nagle's algorithm is obsolete on modern datacenter hardware and its interaction with delayed ACKs still silently kills latency in systems that never explicitly set TCP_NODELAY.

Performance optimization is constrained by systemic factors that can make even large gains irrelevant. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three: attention thresholds below which users don't notice, discrete capacity increments that mean a 2x speedup doesn't halve your server bill, and pipeline backpressure that shifts the bottleneck rather than eliminating it. This frames the engineering work differently: production optimization requires understanding where the actual constraint lives before optimizing anything.
