---
title: Production systems
summary: >-
  The engineering discipline of running software reliably at scale, covering
  durable execution, observability, testing strategy, infrastructure choices,
  and the operational habits that separate systems that survive incidents from
  those that don't.
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
compiled_at: '2026-08-17T18:50:04.059Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1164
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
  cost_usd: 0.037563
---
Production systems is the broad domain of concerns that arise once software leaves development and must run reliably for real users under real load. The sources here cover that domain from several angles: workflow durability, observability, testing strategy, infrastructure primitives, and the cultural habits that make systems survivable.

Durable execution sits at the foundation of many production workflows. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. Jack Vanlightly taxonomizes this space into three forms, stateless functions, sessions, and actors, and maps how Temporal, Restate, DBOS, and Resonate each implement them [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Depot CI takes a lighter approach, using AWS Lambda durable functions in a two-layer hierarchy to schedule stateful CI workflows without keeping a long-lived process alive Building CI with Lambda durable functions.

Observability is only as useful as what you attach to it. Distributed traces show where time goes and how services interact [How to read distributed traces when you didn't write the code](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code), but for agentic systems, Harrison Chase argues that traces without feedback signals cannot drive improvement; user ratings, indirect behavior signals, and LLM-as-judge outputs must be attached to traces to close the learning loop [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

Testing in production is distinct from testing in staging, and the decision of which flows belong where carries real operational cost [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Emphere goes further, building a deterministic assurance platform with real-kernel eBPF runners and red runs that prove the system fails loudly rather than overclaims certainty [Testing a Security Tool Like It Can Hurt People](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people).

Infrastructure choices have compounding effects. Marc Brooker's case that Nagle's algorithm is obsolete and TCP\_NODELAY should be the default is a concrete example: the Nagle/delayed-ACK interaction silently kills latency in ways that only surface under production traffic [It's always TCP\_NODELAY. Every damn time.](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time). Container isolation built from mount namespaces and pivot\_root is another layer that production engineers often treat as a black box [How Container Filesystem Works](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like).

Performance improvements require context to matter. Colin Breck identifies three constraints, attention thresholds, discrete capacity increments, and pipeline backpressure, that explain why even order-of-magnitude gains often fail to change outcomes [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter). Netflix's in-house LLM serving stack illustrates what it takes to optimize at scale: engine selection, model packaging, and batched constrained decoding all matter together [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix).

Operational discipline ties it together. The unwritten laws distilled from real incidents include rolling back before debugging and treating every external dependency as a future outage [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering). A GitHub merge queue bug that silently deleted thousands of lines from main branches shows what happens when architectural shortcuts interact with subtle state assumptions [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).
