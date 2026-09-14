---
title: Production systems
summary: >-
  The principles and patterns that keep software reliable at scale, from durable
  execution and container isolation to observability, testing strategies, and
  the operational constraints that determine whether performance improvements
  actually change outcomes.
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
compiled_at: '2026-09-14T21:41:35.593Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1134
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
  cost_usd: 0.037113
---
Production systems are defined by what happens when things go wrong. The sources here cover that territory from several angles: workflow durability, container isolation, merge safety, observability, testing, and the quieter constraints that determine whether engineering improvements actually matter in practice.

Durable execution is one of the clearest fault-tolerance patterns across this cluster. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. Jack Vanlightly's taxonomy in [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each implement those patterns differently. Depot extends the idea into CI infrastructure: [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) describes using AWS Lambda checkpointed workflows to run a stateful CI scheduler without keeping a long-lived process alive.

Container isolation underpins much of how production workloads are packaged and run. [How Container Filesystem Works](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) walks through assembling a Docker-like container from scratch using Linux's unshare, mount, and pivot_root, showing how mount namespaces and root filesystem isolation actually function at the kernel level. At the networking layer, [It's always TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm is obsolete on modern datacenter hardware and silently degrades latency when paired with delayed ACKs.

Observability turns from passive logging into a feedback mechanism when traces carry actionable signal. [How to read distributed traces when you didn't write the code](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns. [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) extends this: for agentic systems, traces alone are insufficient; attaching feedback signals such as user ratings, LLM-as-judge scores, and deterministic rules is what converts observability into a learning loop.

Testing strategy in production requires a split between staging and production targets. [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) provides a decision framework for which flows belong where and what the operational costs of production testing are. [Testing a Security Tool Like It Can Hurt People](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further: Emphere's assurance platform uses fixture invariants and real-kernel eBPF runners, and deliberately includes red runs that prove the system fails loudly rather than overclaiming certainty.

Merge pipeline integrity carries its own category of risk. [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) documents a GitHub merge queue bug that silently deleted thousands of lines from main branches; Trunk avoided it by never pushing temp branches to main in the first place.

Finally, [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) offers a useful corrective: attention thresholds, discrete capacity increments, and pipeline backpressure mean that even order-of-magnitude improvements often fail to change practical outcomes. The unwritten corollary, stated directly in [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering), is to roll back before debugging and treat every external dependency as a future outage. Production systems are less about heroic optimization and more about designing for the failure modes you cannot yet see.
