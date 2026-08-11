---
title: Systems design
summary: >-
  Systems design covers the structural and behavioral decisions that determine
  how software components fit together, handle failure, and perform at scale,
  from network tuning to workflow durability to diagram clarity.
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
compiled_at: '2026-08-11T05:24:48.790Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 765
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
  cost_usd: 0.023907
---
Systems design is less a single discipline than a cluster of decisions made at different layers of a stack: how processes isolate their resources, how workflows survive failures, how data moves between client and server, and how humans communicate those choices to one another.

At the infrastructure layer, container isolation relies on Linux primitives. [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how mount namespaces and `pivot_root` are the actual mechanism behind Docker-style filesystem isolation, stripping away the tooling abstraction to reveal the kernel calls underneath.

Network configuration carries similar hidden weight. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) documents how Nagle's algorithm interacts with delayed ACKs to silently inflate latency, arguing that `TCP_NODELAY` should be a default on modern datacenter hardware rather than an opt-in fix applied after debugging.

At the application layer, durable execution addresses the problem of workflows that must survive process crashes without manual reconciliation. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at each step. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps that pattern across a taxonomy of stateless functions, sessions, and actors, showing how Temporal and peer platforms each implement the tradeoffs differently.

Performance decisions thread through every layer. [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) achieves near-instant UI response through local-first IndexedDB sync, optimistic updates, and service worker precaching. [Arthur Pastel's blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates a different kind of systems thinking: replacing float arithmetic with integer accumulators to gain a 5.9x speedup by reasoning about how data fits into CPU-friendly operations.

How systems are communicated matters as much as how they are built. [Billy Pilger](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs seven recurring failures in architecture diagrams, including unlabeled resources, fan traps, and overloaded master diagrams, each of which obscures the structural intent the diagram is supposed to convey.

[Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) draws a distinction between the algorithmic puzzle-solving tested in interviews and the tradeoff-laden, incremental work that systems design actually requires in production. The skills overlap less than hiring processes assume.
