---
title: Systems design
summary: >-
  Systems design spans the tradeoffs and structural decisions that determine how
  software behaves at scale, from network protocols and container internals to
  workflow durability, reactivity, and the cognitive load imposed by
  decomposition choices.
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
compiled_at: '2026-11-17T01:50:15.709Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 897
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
  cost_usd: 0.025887
---
Good systems design is less about knowing the right data structures and more about understanding how components interact under real conditions. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes this point directly: algorithm interviews test a narrow, trainable skill that weakly correlates with production performance, where the actual work involves reading tradeoffs and shipping incrementally against messy, unbounded inputs.

One concrete expression of those tradeoffs is in network configuration. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm is obsolete on modern datacenter hardware and that the Nagle/delayed-ACK interaction silently kills latency in ways that are hard to diagnose. The fix is simple, but reaching it requires understanding what the protocol was actually solving and whether that problem still applies.

At a higher level, [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) proposes a taxonomy of durable execution into three forms, stateless functions, sessions, and actors, mapped along a behavior-state continuum. Platforms like [Temporal](/reading/2026-04/2026-04-30t231511-temporal) implement these patterns to persist workflow state at every step, letting distributed applications recover from failures without manual reconciliation logic.

Container systems show a similar layering principle. [Ivan Velichko](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) demonstrates how mount namespaces, mount propagation, and pivot_root compose to produce filesystem isolation, using only standard Linux tools. The design is not magic; it is a sequence of well-scoped primitives stacked deliberately.

The same deliberateness applies to module boundaries. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is widely misread as "do only one thing" when it actually means cohesive grouping under a single accountable responsibility. Over-granularizing violates the cognitive simplicity SRP is meant to provide, a failure mode that scales badly as systems grow.

Communicating structure is its own design problem. [Billy Pilger](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies seven pitfalls in architecture diagrams, including unlabeled resources, overloaded master diagrams, and oversimplified behavioral flows, each of which obscures rather than clarifies the system being described.

Performance decisions are structural decisions. [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) achieves near-instant response through local-first IndexedDB sync, optimistic updates, and aggressive code splitting, choices made at the system level that no amount of micro-optimization after the fact could substitute for. [Arthur Pastel's work on image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows the complementary side: once structural choices are sound, targeted algorithmic work, replacing float arithmetic with integer accumulators, can produce a 5.9x speedup.
