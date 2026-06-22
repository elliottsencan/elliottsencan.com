---
title: Production systems
summary: >-
  Production systems span the infrastructure, reliability practices, and
  operational decisions that keep software running under real load, from durable
  execution and container isolation to CI safety, observability, and inference
  optimization.
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
compiled_at: '2026-06-22T02:35:01.257Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6013
    output_tokens: 1138
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
  cost_usd: 0.035109
---
Production systems are the layer where architectural choices become consequences. The sources here span a wide range of concerns, but they converge on a common pressure: things fail, state gets lost, and the gap between a working demo and a reliable service is filled with deliberate engineering decisions.

Durable execution is one recurring theme. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms, stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each implement the pattern differently. Depot CI takes a pragmatic slice of the same idea: [their orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions with a two-layer Run/Workflow hierarchy and callback-driven coordination to run a stateful CI scheduler without keeping a long-lived process alive.

CI safety connects infrastructure choices to correctness guarantees. A GitHub merge queue bug silently deleted thousands of lines by building temp branches off the wrong base commit; [Trunk's post-mortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) explains how never pushing temp branches to main avoided the incident. [Playwright testing in staging versus production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) extends this to test environments, offering a framework for deciding which flows need real production traffic versus a controlled staging surface.

Container isolation underpins how code reaches production safely. [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) assembles a Docker-like container from scratch using only Linux primitives, mount namespaces, mount propagation, and pivot\_root, making the mechanics of root filesystem isolation explicit rather than assumed.

Observability is only useful when it feeds back into improvement. [LangChain's argument](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) is that traces alone do not improve agentic systems; attaching feedback signals, user ratings, indirect behavior signals, LLM-as-judge, and deterministic rules, turns observability into a learning loop. [SigNoz's guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) addresses the operational side: reading span anatomy, finding critical paths, and diagnosing N+1 staircases in codebases you did not write.

For LLM workloads specifically, production concerns shift toward inference cost and latency. Three posts from Everpure argue for treating the KV cache as a persistent shared asset: [the first](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames the economic case, [the second](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) describes granular-prompt caching via metadata pointers, and [the third](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) benchmarks up to 20x faster inference by persisting attention states on NFS and S3 without changing model architecture. [The Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) maps the broader field, covering quantization, speculative decoding, parallelism, and disaggregation.

Across all of this, [Anton Zaides distills](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) a principle that runs underneath the technical specifics: roll back before debugging, and treat every external dependency as a future outage. Production reliability is less about any single tool than about the habit of designing for failure as the default case.
