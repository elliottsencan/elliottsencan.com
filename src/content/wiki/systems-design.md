---
title: Systems design
summary: >-
  Systems design spans the architectural decisions, tradeoffs, and structural
  principles that determine how software behaves at scale, from networking and
  storage to module boundaries and diagram clarity.
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
compiled_at: '2026-10-19T22:15:53.145Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 819
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
  cost_usd: 0.024717
---
Good systems design is less about any single algorithm or clever trick and more about reading tradeoffs and choosing structures that hold together under real-world pressure [learn-algorithms-for-interviews-forget-them-for-work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work). That pressure shows up at every layer.

At the network layer, a single misconfigured socket option can silently inflate latency across an entire service. Marc Brooker's analysis of Nagle's algorithm demonstrates that the interaction between delayed ACKs and buffering can cost hundreds of milliseconds, and that TCP_NODELAY should simply be the default in datacenter environments [its-always-tcpnodelay](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time).

At the application layer, Linear's architecture shows what local-first design buys in practice: IndexedDB sync, optimistic updates, and service-worker precaching combine to produce near-instant perceived performance without sacrificing correctness [hows-linear-so-fast](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown). Durable execution platforms like Temporal take a complementary angle, persisting workflow state at every step so distributed applications recover from failures without hand-rolled reconciliation [temporal](/reading/2026-04/2026-04-30t231511-temporal). Jack Vanlightly's taxonomy of stateless functions, sessions, and actors maps how different platforms implement these guarantees along a behavior-state continuum [three-durable-function-forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms).

Module boundaries matter as much as runtime behavior. The Single Responsibility Principle, properly understood, is about cohesive grouping under a single accountable responsibility, not about splitting every behavior into its own class [srp-distorted](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Over-granularizing erodes the cognitive simplicity the principle was meant to provide. Similarly, architecture diagrams that try to show everything in one view introduce fan traps, unlabeled nodes, and behavioral flows too coarse to reason about [architecture-diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams).

Containerization illustrates how isolation is itself a systems-design primitive: mount namespaces and pivot_root let processes share a kernel while seeing independent filesystem trees [container-filesystem](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like). Even low-level optimization work like replacing float arithmetic with integer accumulators in a blur function [fast-blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) reflects the same design instinct: understand the data path, then remove unnecessary cost. Across all these layers, the recurring theme is that structural decisions made early shape what is even possible to optimize later.
