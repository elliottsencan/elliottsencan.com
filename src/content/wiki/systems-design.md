---
title: Systems design
summary: >-
  Systems design spans the tradeoffs, patterns, and structural decisions that
  make software work reliably at scale, from network tuning and distributed
  execution to module cohesion and the diagrams used to communicate it all.
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
compiled_at: '2026-08-03T19:41:01.411Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 865
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
  cost_usd: 0.025407
---
Real systems design is not about passing a whiteboard problem. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) draws a clear line between the narrow algorithmic puzzles that dominate technical interviews and the actual work of building production systems: reading tradeoffs, shipping incrementally, handling unbounded real-world inputs.

At the infrastructure layer, design choices compound quickly. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows that a single socket option, TCP_NODELAY, can silently destroy latency when Nagle's algorithm interacts with delayed ACKs. The fix is trivial once you know it, but the point is that low-level defaults carry architectural consequences. Container isolation tells a similar story: [Ivan Velichko](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) demonstrates that Docker's filesystem model rests on a small set of Linux primitives — mount namespaces, mount propagation, pivot_root — whose composition is the design.

For distributed systems that need to survive failure, durable execution is an increasingly important pattern. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover without manual reconciliation. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) provides a taxonomy for this space: stateless functions, sessions, and actors, mapped along a behavior-state continuum, with Temporal and peers occupying different positions depending on the workload.

Module-level design has its own failure modes. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is routinely misread as "do only one thing," when it actually means cohesive grouping under a single accountable responsibility. Over-granularizing a system in the name of SRP produces the opposite of clarity.

Communicating design is itself a design problem. [Billy Pilger](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs seven recurring diagram failures — unlabeled nodes, overloaded master diagrams, fan traps — each of which obscures the very structure it is meant to convey. Good architecture diagrams are a design artifact, not an afterthought.

Performance is embedded in structural choices. [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) — local-first IndexedDB sync, optimistic updates, aggressive code splitting — shows that perceived speed follows from decisions made at the data and module boundary level, not from micro-optimization alone. Contrast that with [Arthur Pastel's blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs), where a 5.9x speedup came from replacing float arithmetic with integer accumulators: sometimes the design is correct and the implementation just needs to match it.
