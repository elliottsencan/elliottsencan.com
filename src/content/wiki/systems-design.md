---
title: Systems design
summary: >-
  Systems design spans the architectural decisions, tradeoffs, and primitives
  that determine how software behaves at scale, from network tuning and
  filesystem isolation to workflow durability and reactive state management.
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
compiled_at: '2026-08-17T18:52:28.461Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 837
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
  cost_usd: 0.024987
---
Good systems design is not a single discipline but a collection of cross-cutting judgment calls that compound across every layer of a stack. A few recurring themes emerge from the sources here: the gap between theoretical correctness and real-world performance, the cost of accidental complexity, and the importance of matching abstractions to the problems they solve.

At the network level, [Marc Brooker's analysis of Nagle's algorithm](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows how a decades-old default can silently degrade latency in modern datacenters, because the Nagle/delayed-ACK interaction was designed for a world that no longer exists. The fix is not clever but it requires understanding why the original decision was made.

At the application layer, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) demonstrates how local-first sync, optimistic updates, and aggressive code splitting combine to produce near-instant perceived performance. Each technique is individually well-known; the design insight is applying them together coherently.

Distributed workflow durability introduces a different class of tradeoffs. [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) persists state at every workflow step, eliminating manual reconciliation logic. [Jack Vanlightly's taxonomy of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space more precisely, distinguishing stateless functions, sessions, and actors, and showing how Temporal, Restate, DBOS, and Resonate implement each pattern differently.

Below the application layer, [container filesystem isolation](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) rests on Linux primitives like mount namespaces and pivot_root. Building a container from scratch with only those tools clarifies what Docker is actually doing and which guarantees come from the kernel versus from tooling conventions.

Module boundaries matter too. [Henrique Teixeira's reading of the Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that SRP is about cohesive accountability, not minimal line count, and that over-granularizing components produces its own complexity tax. Separately, [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) notes that real engineering centers on reading tradeoffs and shipping incrementally, not on algorithm trivia, which connects to the same idea: good design is about managing change over time, not optimizing a snapshot.

Communicating designs is its own problem. [Billy Pilger's critique of architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs failures like unlabeled resources, overloaded master diagrams, and oversimplified behavioral flows. A diagram that hides the decisions it is supposed to explain defeats the purpose of drawing it.
