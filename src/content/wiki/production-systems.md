---
title: Production systems
summary: >-
  The operational concerns that arise when software runs at scale in the real
  world, from failure recovery and observability to configuration hazards and
  performance constraints that theory alone cannot predict.
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
compiled_at: '2026-10-05T23:57:26.359Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1124
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
  cost_usd: 0.036963
---
Production systems are where engineering decisions meet their consequences. The sources here collectively trace a recurring theme: the gap between how a system is designed and how it actually behaves under real conditions.

Failure recovery is a foundational concern. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications can resume after failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) extends this, mapping durable execution across stateless functions, sessions, and actors, showing how platforms like Temporal, Restate, DBOS, and Resonate each make different tradeoffs along a behavior-state continuum. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies the same principle differently: AWS Lambda durable functions run a stateful CI scheduler without keeping a long-lived process alive, using callback-driven coordination across a two-layer Lambda hierarchy.

Observability shapes whether failures become learnable events. [SigNoz's guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns as practical tools for navigating unfamiliar codebases. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone are insufficient for agentic systems; attaching feedback signals (user ratings, LLM-as-judge, deterministic rules) is what turns observability into a learning loop.

Configuration is a quieter failure mode. [The YAML Norway problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) shows how the country code NO parses as false across popular libraries despite a spec fix over a decade ago. [Marc Brooker's TCP_NODELAY post](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes an analogous point about Nagle's algorithm: a decades-old default silently degrades latency because application-layer protocols have already solved the problem it was designed for.

Performance gains, once achieved, can still fail to matter. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three structural constraints — attention thresholds, discrete capacity increments, and pipeline backpressure — that explain why even order-of-magnitude improvements often change nothing in practice.

Testing must account for production conditions that staging cannot replicate. [Currents' framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) for splitting Playwright tests between staging and production covers which flows belong where and what the operational costs of each environment are. [Emphere's security tool testing](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further: red runs that prove the system fails loudly when it overclaims certainty are as important as green ones.

Architectural choices made early have outsized effects. [Trunk's postmortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) of a GitHub merge queue bug that silently deleted code traces the incident to a single design decision: pushing temp branches to main. Their alternative architecture avoided it entirely. [Linear's performance breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) attributes near-instant UI to local-first IndexedDB sync, aggressive code splitting, and optimistic updates — choices that must be made early and are expensive to retrofit.

[Anton Zaides's engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distill the production mindset directly: roll back before debugging, treat every external dependency as a future outage. These are not best practices in the abstract; they are lessons encoded from real incidents.
