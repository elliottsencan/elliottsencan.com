---
title: Production systems
summary: >-
  How software actually behaves under real load, across the full stack from
  networking defaults to workflow durability, observability, and the operational
  disciplines that keep distributed systems running.
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
compiled_at: '2026-08-24T18:53:17.102Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1044
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
  cost_usd: 0.035763
---
Production systems is the broad category covering how software runs in reality: the infrastructure choices, failure modes, operational practices, and architectural patterns that separate a working prototype from a system that holds up under load, partial failure, and accumulated complexity.

At the networking layer, invisible defaults can silently degrade performance. [Marc Brooker's analysis](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) of Nagle's algorithm shows how a decades-old buffering heuristic still causes latency spikes in modern datacenters because the Nagle/delayed-ACK interaction was never fixed, it was just worked around at the application layer. Similar silent costs appear at the data layer: [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions with checkpointed state to avoid keeping long-lived processes alive, and [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of durable execution into stateless functions, sessions, and actors provides a conceptual map for how platforms like Temporal, Restate, DBOS, and Resonate implement these patterns differently.

When systems do fail, observability is what makes recovery tractable. [SigNoz's guide to distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy and critical-path analysis for codebases you didn't write. [LangChain's argument](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces alone are insufficient for agentic systems points toward a harder truth: observability only becomes actionable when feedback signals are attached to traces so the system can learn from them. [Colin Breck's post](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) adds a constraint worth internalizing: even order-of-magnitude improvements fail to change outcomes when attention thresholds, discrete capacity increments, or pipeline backpressure absorb the gains before they reach the bottleneck.

Testing in production is a distinct discipline from staging. [Currents' decision framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) for Playwright tests spells out which flows belong in each environment and what the operational costs of production testing actually look like. [Emphere's approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) to testing a container security tool adds the harder requirement: red runs that prove the system fails loudly when it overclaims certainty, not just green runs that confirm happy paths.

Architectural choices compound over time. [Linear's performance breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) attributes near-instant UI to local-first IndexedDB sync, optimistic updates, and aggressive code splitting. [Trunk's post-mortem of a GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how a single architectural choice, never pushing temp branches to main, avoided a silent deletion of thousands of lines from production branches. [Anton Zaides' distillation](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) of hard-won production rules arrives at a similar conclusion: roll back before debugging, and treat every external dependency as a future outage. These are not abstractions; they are the residue of real incidents.
