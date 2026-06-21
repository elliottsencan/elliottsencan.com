---
title: Systems design
summary: >-
  Systems design spans the decisions that shape how software components behave
  under real-world conditions, from decomposition principles and data flow
  patterns to distributed execution and performance tradeoffs.
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
compiled_at: '2026-06-21T20:18:26.107Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3843
    output_tokens: 712
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
  cost_usd: 0.022209
---
Good systems design is not a single discipline but a cluster of interlocking decisions: how to decompose responsibility, how to move and persist state, how to represent the system's structure, and how to make the whole thing fast enough to be useful.

Decomposition starts with how you assign responsibility to components. The Single Responsibility Principle is a common reference point, but [its common reading is wrong](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle): "do only one thing" misses the actual intent, which is to group behaviors under a single accountable owner so that changes have a coherent scope. Over-granularizing inverts the benefit and increases cognitive overhead.

State and execution across distributed components is harder. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) approaches this by persisting workflow state at every step, so applications recover from failures automatically. The taxonomy proposed by Jack Vanlightly [maps durable execution into three forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms): stateless functions, sessions, and actors, each sitting at a different point on a behavior-state continuum. How a particular platform implements those forms matters for which failure and scaling properties you inherit.

Representing the system visually is also a design act. [Common pitfalls in architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) include unlabeled resources, overloaded master diagrams that try to show everything at once, and oversimplified behavioral flows that obscure how the system actually responds to events.

At a lower level, systems design governs runtime performance. Linear's speed comes from [a set of concrete architectural choices](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown): local-first sync via IndexedDB, optimistic updates, aggressive code splitting, and service worker precaching. The [image-rs blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows how replacing float arithmetic with integer accumulators and swapping division for reciprocal multiplication yields a 5.9x speedup, a reminder that algorithmic choices inside a component have system-wide latency consequences.

The complementary view from [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) is that production engineering is about reading tradeoffs and shipping incrementally under messy, unbounded real-world inputs, not optimizing isolated puzzles. Systems design is where those tradeoffs live.
