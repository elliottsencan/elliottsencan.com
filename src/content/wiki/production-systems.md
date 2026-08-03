---
title: Production systems
summary: >-
  The practical, operational concerns that arise when software runs at scale in
  real environments: failure modes, latency traps, workflow durability,
  observability, and the gap between theoretical gains and actual outcomes.
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
compiled_at: '2026-08-03T19:38:37.307Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1336
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
  cost_usd: 0.040143
---
Production systems expose every assumption made during development. The gap between a working prototype and a reliable deployed service is where most of the hard engineering actually lives.

Durability and fault tolerance are recurring themes. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures automatically. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) formalizes this into three durable function forms — stateless functions, sessions, and actors — and maps how platforms like Temporal, Restate, DBOS, and Resonate implement them. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same idea to CI pipelines, using AWS Lambda durable functions to run stateful, checkpointed workflows without keeping a long-lived process alive.

Latency is frequently invisible until it isn't. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm is effectively obsolete in datacenter environments and that TCP_NODELAY should be the default, since the Nagle/delayed-ACK interaction still silently degrades latency in systems that never set it explicitly. At a higher level, [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three constraints — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why even order-of-magnitude improvements often fail to change real outcomes.

Observability closes the loop between what a system does and what engineers understand about it. [SigNoz's distributed tracing guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and common patterns like N+1 staircases. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) extends this to agentic systems, arguing that traces alone are insufficient — attaching feedback signals (user ratings, LLM-as-judge, deterministic rules) is what turns observability into a learning loop.

Testing in production is its own discipline. [Currents](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames the staging-versus-production split for Playwright tests, noting which flows belong where and what the operational costs of production testing actually are. [Emphere](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes a stricter approach for security tooling, using fixture invariants and real-kernel runners with deliberate red runs that prove the system fails loudly rather than overclaiming certainty.

Infrastructure correctness matters at the lowest layers. [Ivan Velichko](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how container filesystem isolation actually works via mount namespaces and pivot_root, knowledge that matters when debugging production container behavior. A [GitHub merge queue bug documented by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building off the wrong base commit — an incident Trunk avoided through an architectural choice made before it happened.

At the application layer, [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills production-incident experience into rules like rolling back before debugging and treating every external dependency as a future outage. [Netflix's in-house LLM serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) shows what operating at scale looks like for ML infrastructure specifically, covering engine selection, model packaging, and batched constrained decoding. Performance optimization at the LLM layer — KV cache persistence via RDMA, granular prompt segmentation — is addressed across several Everpure posts ([here](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), [here](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), [here](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs)) and synthesized in [The Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering).
