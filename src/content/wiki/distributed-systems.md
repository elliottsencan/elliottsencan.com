---
title: Distributed systems
summary: >-
  Distributed systems span coordination, state, observability, and networking
  across multiple nodes; recent sources trace how classical distributed theory
  is quietly re-emerging in durable execution, multi-agent AI, and cloud
  infrastructure design.
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
compiled_at: '2026-07-21T05:02:45.580Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4561
    output_tokens: 1095
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
  cost_usd: 0.030108
---
Distributed systems problems have a way of resurfacing in new clothing. Three persistent concerns run through the cited sources: how state and coordination are managed across failures, how operators observe what is happening inside a running system, and how infrastructure choices shape the constraints everything else inherits.

On state and coordination, Jack Vanlightly's taxonomy of durable execution [maps three forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) — stateless functions, sessions, and actors — along a behavior-state continuum. Platforms like Temporal, Restate, DBOS, and Resonate each land differently on that continuum, reflecting genuine trade-offs rather than marketing differences. Depot's CI orchestrator [applies one of these patterns directly](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions): a two-layer Lambda hierarchy checkpoints workflow state without keeping a long-lived process alive, trading simplicity for the durability guarantees that CI correctness requires.

Christopher Meiklejohn's multi-agent series makes the boldest claim in this batch: the AI agent field is [quietly rediscovering distributed systems](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) without the vocabulary to name it. Coordination structures — convergent debate, adversarial debate, shared-notebook state — [must match task structure](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate), and the CALM theorem from distributed computing is directly applicable to reasoning about when agents can coordinate without synchronization. Open questions include CRDTs for shared agent state, backpressure protocols, and failure recovery, all classical distributed systems concerns.

Observability is represented by two complementary pieces. Elizabeth's guide to [reading distributed traces in unfamiliar codebases](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) covers span anatomy, critical-path analysis, and N+1 staircase patterns — the practical skill of understanding a system you did not build. On the formal side, a SIGOPS benchmark [tests whether LLMs can generate TLA+ specs from real system code](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), finding near-perfect syntax but only around 46% conformance: models recite textbook protocols rather than faithfully capturing actual implementations. The gap matters because formal modeling is how distributed systems designers reason about correctness before problems reach production.

Infrastructure assumptions shape everything downstream. David Crawshaw [argues that today's clouds rest on wrong abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) — VMs tied to fixed resources, slow remote block storage, expensive networking — and is building from scratch to correct them. Marc Brooker's post on [TCP\_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) is a narrower instance of the same pattern: Nagle's algorithm made sense when it was designed, but the Nagle/delayed-ACK interaction still silently kills latency in datacenter environments where its original justification no longer applies. Colin Breck adds a counterweight: [even order-of-magnitude performance gains](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) often fail to change real outcomes when pipeline backpressure, discrete capacity increments, or attention thresholds constrain the system upstream or downstream of the improvement.

Kubernetes management sits at the operational edge of all this. Radar [addresses the tooling fragmentation](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) that accumulates when platform teams juggle kubectl alongside multiple specialized dashboards, proposing a unified UI across topology, events, Helm, GitOps, and image inspection. The underlying problem is observability and cognitive load at the cluster level, a coordination problem in its own right.
