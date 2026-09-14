---
title: Systems design
summary: >-
  Systems design spans the tradeoffs, patterns, and structural decisions that
  determine how software behaves at scale — from distributed workflow durability
  and container isolation to local-first sync, reactive state, and network
  protocol choices.
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
compiled_at: '2026-09-14T21:43:57.895Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 887
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
  cost_usd: 0.025737
---
Systems design is the discipline of making structural decisions that shape how a piece of software behaves under real conditions: failure, load, latency, and complexity. It is distinct from algorithmic problem-solving; as [Fagner Brack observes](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work), production engineering requires reading tradeoffs and handling messy, unbounded inputs rather than optimizing for clean asymptotic bounds.

At the distributed systems layer, durability and failure recovery are central concerns. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses this by persisting workflow state at every step so applications recover automatically from failures. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) breaks durable execution into three forms — stateless functions, sessions, and actors — and maps them along a behavior-state continuum, showing how platforms like Temporal and Restate implement these patterns differently.

Network-level decisions have similarly outsized effects. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm is obsolete on modern datacenter hardware and that its interaction with delayed ACKs still silently kills latency — a systems-design choice buried deep in default settings.

Client-side architecture carries the same weight. [Linear's local-first design](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) — IndexedDB sync, optimistic updates, service worker precaching, and aggressive code splitting — shows how structural decisions at the application layer produce perceived near-instant performance. Reactive state management follows a parallel logic: [signals](/reading/2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm) combine push-based invalidation with pull-based lazy re-evaluation to minimize unnecessary computation.

At the component level, [the Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) is often misapplied as "do only one thing" when it actually means cohesive grouping under a single accountable responsibility; over-granularizing violates the cognitive simplicity the principle is meant to provide. Documenting these structures brings its own pitfalls: [architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) fail when they carry unlabeled resources, disconnected nodes, or overloaded master views that obscure rather than clarify.

Lower in the stack, [container filesystem isolation](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) is built from Linux mount namespaces and pivot_root — composable primitives whose behavior must be understood to design reliable deployment boundaries. And even within a single function, structural choices matter: replacing float arithmetic with integer accumulators and division with reciprocal multiplication yielded a [5.9x speedup in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs), a reminder that systems design operates at every level of abstraction.
