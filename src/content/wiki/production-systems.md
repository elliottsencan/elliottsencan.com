---
title: Production systems
summary: >-
  The engineering concerns that arise when software runs at scale in real
  environments: failure recovery, observability, performance constraints,
  deployment safety, and the operational gap between what works and what holds
  up.
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
compiled_at: '2026-08-29T20:21:01.630Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1191
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
  cost_usd: 0.037968
---
Production systems occupy a different problem space than development or staging environments. The constraints are harder, the failure modes are less predictable, and the consequences of getting things wrong compound in ways that are difficult to simulate in advance.

Failure recovery is one of the oldest concerns. Temporal's durable execution model [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses this by persisting workflow state at every step so distributed applications can recover automatically. Jack Vanlightly's taxonomy of durable function forms [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) elaborates this into stateless functions, sessions, and actors, mapping how Temporal, Restate, DBOS, and Resonate each implement these patterns along a behavior-state continuum. Depot CI takes a similar approach at the infrastructure layer, using AWS Lambda durable functions with a two-layer Run/Workflow hierarchy so a stateful CI scheduler can operate without keeping a long-lived process alive [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Deployment safety surfaces in subtler ways. A GitHub merge queue bug silently deleted thousands of lines from main branches by building temp branches off the wrong base commit; Trunk's architectural decision to never push temp branches to main avoided the incident entirely [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). YAML's Norway problem, where the country code NO parses as false, is another class of silent production failure caused by configuration tooling that behaves differently than operators expect [YAML? That's Norway Problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem).

Performance improvements in production are not always meaningful. Colin Breck's analysis of attention thresholds, discrete capacity increments, and pipeline backpressure [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) explains why even order-of-magnitude gains can fail to change real outcomes. Marc Brooker makes a narrower but pointed version of this argument for networking: Nagle's algorithm is obsolete on modern datacenter hardware, and TCP_NODELAY should be the default because the Nagle/delayed-ACK interaction silently kills latency in ways that are hard to diagnose [It's always TCP_NODELAY. Every damn time.](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time).

Observability ties these concerns together. Reading distributed traces in unfamiliar codebases requires understanding span anatomy, critical-path analysis, and patterns like N+1 staircases [How to read distributed traces when you didn't write the code](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). For agentic systems, LangChain's Harrison Chase argues that traces alone are not enough; attaching feedback signals to traces is what turns observability into a learning loop across model, harness, and context layers [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

At the application layer, hard-won rules from real incidents include rolling back before debugging and treating every external dependency as a future outage [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering). Testing in production carries real costs but is sometimes the only environment that captures actual user flows, and the decision of what belongs in staging versus production requires deliberate framework rather than convention [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Container isolation at the filesystem level, built from Linux primitives like mount namespaces and pivot_root [How Container Filesystem Works](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like), underpins most modern deployment infrastructure, and getting that isolation right matters for security tools that must fail loudly when they overclaim certainty rather than abstain [Testing a Security Tool Like It Can Hurt People](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people).
