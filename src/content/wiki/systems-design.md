---
title: Systems design
summary: >-
  Systems design spans tradeoffs in architecture, data flow, component
  boundaries, and runtime behavior — sources here address durable execution
  patterns, local-first sync, container internals, low-level protocol tuning,
  and diagramming clarity.
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
compiled_at: '2026-10-05T23:59:45.200Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 708
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
  cost_usd: 0.023052
---
Systems design is less a discipline than a collection of judgment calls made at every level of a stack: how state is persisted, how components communicate, how failure is handled, and how the resulting structure is communicated to others.

At the execution layer, durable workflows represent one of the sharper design choices. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) gives this space a useful taxonomy: stateless functions, sessions, and actors, mapped along a behavior-state continuum, with Temporal, Restate, DBOS, and Resonate implementing these patterns in different ways.

At the client layer, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows how local-first IndexedDB sync, optimistic updates, and aggressive code splitting produce near-instant perceived performance. The system pushes state to the client so that reads never wait on the network.

Network protocol choices sit further down but carry outsized impact. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm is obsolete in datacenter environments and that the Nagle/delayed-ACK interaction silently kills latency; TCP_NODELAY should be the default.

Component boundaries matter as much as runtime behavior. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is misread as "do one thing" when it actually means cohesive grouping under a single accountable responsibility. Over-granularizing is itself a design failure.

Communicating designs clearly is its own problem. [Billy Pilger](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies pitfalls in architecture diagrams, including unlabeled resources, fan traps, and overloaded master diagrams, each of which obscures the system rather than clarifying it.

[Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) notes that real engineering is about reading tradeoffs and shipping incrementally against messy, unbounded real-world inputs, a description that fits every other source here.
