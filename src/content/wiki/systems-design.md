---
title: Systems design
summary: >-
  Systems design spans decisions about structure, tradeoffs, and failure modes
  across software — from container isolation and durable execution to
  local-first sync and reactive state — where the dominant challenge is managing
  complexity under real-world constraints.
sources:
  - >-
    2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t231511-temporal
  - 2026-05/2026-05-01t112302-the-three-durable-function-forms
  - >-
    2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like
  - 2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs
  - 2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle
  - 2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams
  - 2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown
  - 2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm
  - 2026-06/2026-06-21t231758-nasa-technical-report-20070005136
  - 2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time
compiled_at: '2026-07-22T05:59:54.130Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 807
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
  cost_usd: 0.024537
---
Systems design is less a discipline than a disposition: every architectural decision encodes assumptions about what will fail, what will scale, and what the humans maintaining the system will actually understand. The sources here range widely, but each one illuminates a layer of that problem.

At the infrastructure level, containers illustrate how isolation is constructed rather than given. [Building a container from scratch](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows that mount namespaces and `pivot_root` are the actual primitives behind Docker's apparent magic — understanding them makes the failure modes of containerized systems legible.

Distributed workflows add a second layer of complexity. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step, offloading the failure-recovery problem from application code. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of stateless functions, sessions, and actors across platforms like Temporal and Restate clarifies that "durable execution" is not a single pattern but a family of tradeoffs arranged along a behavior-state continuum.

Network configuration is often where latency hides. [Marc Brooker's case for TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) is a concrete example: Nagle's algorithm interacting with delayed ACKs silently degrades latency in datacenter environments where its original motivation no longer applies.

At the application layer, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) demonstrates how local-first IndexedDB sync, optimistic updates, and aggressive code splitting combine to produce perceived instantaneity. These are not independent tricks but a coherent system-level commitment to moving latency off the critical path.

Diagrams are where systems design gets communicated. [Common architecture diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) — unlabeled resources, fan traps, overloaded master diagrams — are not aesthetic failures; they produce misunderstandings that propagate into implementation decisions.

Structural principles operate at the code level too. [The SRP article](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that over-granularizing modules under a misread "do one thing" rule produces fragmentation that makes a system harder to reason about, not easier. Cohesion is itself a systems property.

Finally, [the algorithm-interview critique](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) names the gap between puzzle-solving and actual systems thinking: production engineering requires reading tradeoffs and handling messy, unbounded inputs, skills that narrow interview formats do not test.
