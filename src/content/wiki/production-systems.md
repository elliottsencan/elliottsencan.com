---
title: Production systems
summary: >-
  The operational concerns that arise when software runs in real environments:
  failure recovery, observability, testing boundaries, performance constraints,
  and the architectural choices that determine whether systems behave correctly
  under load.
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
compiled_at: '2026-07-16T11:37:31.637Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6333
    output_tokens: 1071
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
  cost_usd: 0.035064
---
Production systems are defined less by their code than by the conditions they run under: partial failures, concurrent load, state that must survive process restarts, and humans who need to understand what went wrong after the fact. The sources here collectively map the practical decisions that determine whether a system holds together in those conditions.

Durable execution sits at the center of several entries. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) formalizes this into three forms, stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each implement them differently. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same thinking to CI orchestration: AWS Lambda durable functions run a stateful, checkpointed scheduler without a long-lived process, using a two-layer Lambda hierarchy and callback-driven coordination.

Observability is the other recurring axis. Distributed traces give engineers a view into what happened across service boundaries, but [SigNoz's guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) points out that reading traces in unfamiliar code requires understanding span anatomy and critical-path analysis, not just tooling access. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) extends the argument for agentic systems: traces alone don't improve a system; attaching feedback signals to them is what turns observability into a learning loop.

Testing boundaries between staging and production carry real operational costs. [Currents' decision framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) covers which Playwright test flows belong in each environment and what it takes to run them safely in production. [Emphere's approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes a stricter line for security tooling: real-kernel eBPF runners, fixture invariants, and red runs that prove the system fails loudly rather than overclaiming certainty.

Configuration correctness is a quieter risk. [The Norway problem in YAML](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) illustrates how a decades-old parsing bug in a ubiquitous format persists across popular libraries because spec fixes don't propagate to implementations. Merge queues carry analogous risks at the CI layer: a [GitHub merge queue bug described by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines by building temp branches off the wrong base commit.

Performance constraints in production are often misread. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three reasons order-of-magnitude improvements can fail to change outcomes: attention thresholds, discrete capacity increments, and pipeline backpressure. Container isolation provides a cleaner substrate for reasoning about these systems; [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) of assembling a Docker-like container from Linux primitives shows how mount namespaces and root filesystem isolation actually work beneath the abstraction.

[Anton Zaides' engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distill field experience into a short list: roll back before debugging, treat every external dependency as a future outage. That orientation, systems are expected to fail and recovery is designed in from the start, runs through most of the other sources here.
