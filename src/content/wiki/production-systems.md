---
title: Production systems
summary: >-
  The operational concerns of running software in production: reliability,
  observability, testing strategy, workflow durability, and the infrastructure
  decisions that determine how systems behave under real load.
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
compiled_at: '2026-06-21T18:31:49.628Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5842
    output_tokens: 959
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
  cost_usd: 0.031911
---
Running software in production is a distinct discipline from building it. The gap between a working prototype and a system that survives real users, hardware failures, and accumulated edge cases is where most engineering complexity lives.

Reliability starts with how failures are handled. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures automatically, without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) organizes this space into three durable execution forms — stateless functions, sessions, and actors — and maps how Temporal, Restate, DBOS, and Resonate each implement them. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle differently, using AWS Lambda durable functions in a two-layer hierarchy so a stateful CI scheduler runs without keeping a long-lived process alive.

Observability is the other side of reliability. [Distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) let engineers diagnose systems they didn't write by reading span anatomy and critical-path patterns like N+1 staircases. But traces alone don't improve agentic systems; [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that attaching feedback signals — user ratings, indirect behavior, LLM-as-judge — to traces is what turns observability into a learning loop.

Testing strategy under production conditions requires choosing what to verify where. [Currents' framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) for Playwright tests separates flows by environment based on risk and operational cost. [Emphere's approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further for high-stakes tooling, requiring red runs that prove the system fails loudly when it would otherwise overclaim certainty.

Infrastructure choices compound over time. [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) of assembling a container from Linux primitives shows how mount namespaces and root filesystem isolation actually work beneath the abstraction layer. A GitHub merge queue bug described by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches; their architectural choice to avoid pushing temp branches to main was the specific decision that prevented the incident.

At scale, configuration format bugs become production hazards. [YAML's Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) — where the country code NO parses as false — persists in widely used libraries a decade after the spec fix, a reminder that format choices carry long operational tails.

[Anton Zaides distills](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) several hard-won production rules from real incidents: roll back before debugging, and treat every external dependency as a future outage. The lesson underlying most production failures is that systems behave differently under real conditions than under designed ones, and the engineering disciplines around reliability, observability, and testing exist to close that gap.
