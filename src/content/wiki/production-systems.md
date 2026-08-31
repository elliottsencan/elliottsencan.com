---
title: Production systems
summary: >-
  The engineering concerns that govern software running in production:
  reliability, observability, performance, deployment safety, and the
  operational discipline required to keep complex systems stable under real
  load.
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
compiled_at: '2026-08-31T22:39:46.062Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6701
    output_tokens: 1299
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
  cost_usd: 0.039588
---
Production systems are where the gap between design intentions and runtime reality becomes visible. The sources here cover that gap from multiple angles: infrastructure choices, failure modes, observability strategies, and the discipline required to keep complex software running correctly.

Reliability starts with how you handle failure. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and the durable execution taxonomy in [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) address this directly: by persisting workflow state at every step, durable execution platforms let distributed applications recover from failures without manual reconciliation. Depot CI takes the same idea further by using AWS Lambda durable functions to run a stateful, checkpointed CI scheduler without any long-lived process, described in [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Deployment safety surfaces in a concrete incident case: [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how a GitHub merge queue bug silently deleted thousands of lines from main branches. The lesson there is architectural: never push temp branches to main. [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills related hard-won rules, including rolling back before debugging and treating every external dependency as a future outage.

Observability is not just trace collection. [How to read distributed traces when you didn't write the code](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and common patterns like N+1 staircases. For agentic systems, [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone are insufficient; attaching feedback signals to traces is what turns observability into a learning loop.

Performance improvements do not always translate to production outcomes. [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) names three constraints that explain why: attention thresholds, discrete capacity increments, and pipeline backpressure. A related point appears at the network layer in [It's always TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time), where Nagle's algorithm silently kills latency in datacenter environments because the Nagle/delayed-ACK interaction remains active by default.

Testing strategy under production conditions involves real trade-offs. [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) lays out which flows belong where and the operational costs of each. [Testing a Security Tool Like It Can Hurt People](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) pushes further: Emphere's assurance platform uses real-kernel eBPF runners and red runs that prove the system fails loudly when it overclaims, which is a meaningful standard for safety-critical tooling.

At the infrastructure layer, container isolation mechanics underpin much of what makes production deployments reproducible. [How Container Filesystem Works](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) traces mount namespaces, mount propagation, and root filesystem isolation using only Linux primitives. Netflix's approach to LLM serving, covered in [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix), applies similar first-principles thinking to engine selection, model packaging, and constrained decoding at scale. The Everpure KV caching series ([KV caching cost reduction](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), [KVA for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs)) treats the KV cache as a persistent shared asset injected from fast storage, claiming up to 20x inference cost reduction in production LLM workloads.
