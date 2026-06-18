---
title: Production systems
summary: >-
  Production systems demand failure resilience, durable state, observability,
  and disciplined rollback — sources across CI orchestration, workflow engines,
  inference infrastructure, and testing converge on these recurring pressures.
sources:
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231511-temporal
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t135637-reddit-rdevops
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - 2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions
  - 2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching
  - >-
    2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
  - 2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people
  - 2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
aliases:
  - production-engineering
compiled_at: '2026-06-18T21:53:25.492Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4548
    output_tokens: 780
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
  cost_usd: 0.025344
---
The hard lessons of running software in production cluster around a handful of recurring themes: state must survive failures, rollback beats debugging, dependencies will fail, and tests need to reflect real-world risk.

[Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses the state-survival problem directly, persisting workflow state at every step so distributed applications recover from failures without manual reconciliation. Depot CI's orchestrator applies the same principle at a different layer: [AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) run a stateful, checkpointed CI scheduler without any long-lived process, using a two-tier Lambda hierarchy and callback-driven job coordination.

Observability under unfamiliar conditions is a companion concern. [Reading distributed traces in code you didn't write](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) treats span shapes and attributes as the primary diagnostic surface, which pairs with the blunt rule from [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering): roll back first, debug second, and treat every external dependency as a scheduled outage.

Testing strategy reflects these pressures in environment design. [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames staging and production as having distinct risk profiles, not just as clones at different scales. [Emphere's security testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) pushes further, requiring real-kernel runners and "red runs" that prove the system fails loudly rather than silently overclaiming correctness.

At the infrastructure layer, production LLM serving adds cost and latency concerns that stateless request handling cannot address alone. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) persists precomputed attention states across sessions, cutting time-to-first-token by up to 20x at scale, with [Pure Storage's KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) demonstrating this on NFS and S3 without model or infrastructure changes.

Authentication hygiene across production machines is a lower-level but persistent concern; [SSH key-based authentication](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) with agent forwarding eliminates PAT tokens from the credential surface across distributed Linux environments.
