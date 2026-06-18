---
title: Production systems
summary: >-
  The discipline of running software reliably in production spans durable
  execution, container isolation, observability, testing strategy, and the
  cultural habits that keep systems from silently degrading.
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
aliases:
  - reliability-engineering
compiled_at: '2026-06-18T22:58:03.002Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6012
    output_tokens: 916
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
  cost_usd: 0.031776
---
Production systems are the infrastructure, patterns, and practices that keep software running correctly under real load, across failures, and over time. The sources here span a wide range of concerns, but a few themes recur: state must be managed explicitly, failures must be visible, and trust in a running system has to be earned through deliberate testing.

Durable execution is one answer to the problem of state in distributed work. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications can recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms, stateless functions, sessions, and actors, showing how platforms like Temporal and Restate each implement these patterns differently. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle at the build layer, using AWS Lambda durable functions with checkpointing to run a stateful CI scheduler without a long-lived process.

Container isolation is a related foundation. [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) assembles a Docker-like container from scratch using Linux primitives, mount namespaces, and pivot_root, making explicit what most production tooling hides. Understanding those primitives matters when something breaks.

Observability and testing are where production confidence actually gets built. [Distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) are most useful when you can identify critical-path spans and N+1 staircases, even in unfamiliar code. [LangChain's post on agent observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) goes further: traces alone don't improve systems; feedback signals attached to traces are what create a learning loop. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes a strict line on correctness for security tooling, using fixture invariants and real-kernel eBPF runners, and running red tests that prove the system fails loudly rather than overclaims.

Testing strategy also means deciding where tests live. [Currents' framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) for splitting Playwright tests between staging and production acknowledges that production testing has real operational costs, and that not every flow belongs in both environments.

A merge queue incident described by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how architectural choices compound over time: GitHub's bug silently deleted thousands of lines by building temp branches off the wrong base commit, and Trunk avoided it only because they had never pushed temp branches to main.

[The unwritten laws post](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills cultural habits that matter in production: roll back before debugging, treat every external dependency as a future outage. These aren't novel but they reflect what repeated incidents teach.
