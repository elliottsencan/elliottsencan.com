---
title: Distributed systems
summary: >-
  Distributed systems span coordination protocols, failure recovery, network
  behavior, and observability; recent sources connect foundational theory to
  durable execution, multi-agent coordination, container infrastructure, and
  cloud platform design.
sources:
  - 2026-05/2026-05-01t112302-the-three-durable-function-forms
  - 2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - >-
    2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like
  - 2026-05/2026-05-05t135637-reddit-rdevops
  - 2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla
  - 2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions
  - 2026-05/2026-05-31t164554-jj-vcsjj
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
  - 2026-06/2026-06-21t231758-nasa-technical-report-20070005136
  - 2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter
  - 2026-07/2026-07-05t170602-building-a-cloud
  - 2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time
compiled_at: '2026-07-19T14:36:25.642Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 981
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
  cost_usd: 0.028398
---
The problems distributed systems researchers named decades ago keep resurfacing in new guises. Meiklejohn's multi-agent systems series makes this explicit: the concluding post [argues directly](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) that the MAS field is rediscovering distributed systems without the vocabulary to name it, pointing to unsolved problems like topology-to-reliability mapping, CRDTs for shared state, failure recovery, and backpressure protocols. An earlier installment [frames coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) through the CALM theorem and argues that coordination structure must match task structure, a claim straight from the distributed systems canon.

Durable execution is one concrete domain where these tensions play out. Vanlightly's taxonomy [maps durable functions](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) onto a behavior-state continuum of stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each make different tradeoffs. Depot's CI orchestrator [applies this in practice](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions), using AWS Lambda durable functions with a two-layer hierarchy and callback-driven coordination to run stateful workflows without a long-lived process.

Network behavior remains a persistent source of invisible latency. Brooker [traces many distributed system slowdowns](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) to the Nagle algorithm interacting with delayed ACKs, arguing TCP_NODELAY should be the default on modern datacenter hardware because application-layer protocols have already solved the tiny-packet problem Nagle was designed to address.

Observability across services has its own literacy requirements. A SigNoz guide [covers distributed trace reading](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) for unfamiliar codebases, including span anatomy, critical-path analysis, and N+1 staircase patterns. Kubernetes clusters add another layer; Radar [positions itself](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) as a unified UI replacing the patchwork of kubectl and supplementary tools that platform teams currently juggle.

Performance improvements in distributed pipelines do not always translate to outcome improvements. Breck [identifies three constraints](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) that absorb gains before they matter: attention thresholds, discrete capacity increments, and pipeline backpressure. The backpressure point connects directly to the open questions Meiklejohn raises for multi-agent systems.

At the infrastructure layer, Crawshaw [critiques current cloud abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) as fundamentally wrong, naming VMs tied to fixed resources, slow remote block storage, and expensive networking as the root causes, and announcing a ground-up rebuild. Separately, a SIGOPS study [benchmarks LLMs on TLA+ spec generation](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) for real system code, finding near-perfect syntax scores but only around 46% conformance, a gap the authors attribute to models reciting textbook protocols rather than modeling actual implementations.
