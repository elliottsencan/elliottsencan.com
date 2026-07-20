---
title: Systems design
summary: >-
  Systems design spans the tradeoffs behind distributed state, container
  isolation, network protocols, reactive patterns, and code organization — each
  source illuminating a different layer where architectural decisions compound.
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
compiled_at: '2026-07-20T19:49:13.549Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 794
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
  cost_usd: 0.024342
---
Systems design is not one discipline but a stack of concerns that compound across layers. At the network layer, [Marc Brooker's analysis of TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows how a 1984 congestion heuristic (Nagle's algorithm) still silently inflates latency in modern datacenters because its interaction with delayed ACKs was never fixed, only worked around. The fix is a single socket option, but the lesson is that invisible defaults carry long-term cost.

At the application layer, [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) addresses a different compounding cost: the manual reconciliation logic that accumulates when distributed workflows fail. By persisting state at every step, the platform shifts the failure-recovery burden from application code into infrastructure. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this design space further, distinguishing stateless functions, sessions, and actors as three forms with different behavior-state tradeoffs, each suited to a different class of problem.

Performance characteristics emerge from architectural choices made early. [Linear's local-first architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) — IndexedDB sync, optimistic updates, service worker precaching, aggressive code splitting — produces perceived instant response by moving latency off the critical path. [The image-rs blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates a complementary principle at the algorithm level: replacing float arithmetic with integer accumulators and reciprocal multiplication instead of division yields a 5.9x speedup without changing external behavior.

Modularity decisions shape maintainability over time. [The SRP analysis](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that over-granularizing classes in the name of "doing one thing" violates the principle's actual intent, which is cohesive grouping under a single accountable responsibility. Fragmentation has a cost just as entanglement does.

Communicating designs introduces its own failure modes. [Pilger's architecture diagram critique](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs how unlabeled resources, disconnected nodes, and overloaded master diagrams obscure rather than clarify system behavior. Diagrams that try to show everything show nothing.

Finally, [Fagner Brack's argument](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) that algorithm interviews weakly correlate with production performance points at what systems design actually requires: reading tradeoffs, shipping incrementally, and building systems that handle messy real-world inputs — skills that no whiteboard problem tests.
