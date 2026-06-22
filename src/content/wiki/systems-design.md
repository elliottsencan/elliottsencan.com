---
title: Systems design
summary: >-
  Systems design spans architectural decisions about how components fit
  together, handle failure, and scale — covering everything from module
  boundaries and data flow to distributed state, container internals, and
  performance tradeoffs.
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
compiled_at: '2026-06-22T02:37:33.204Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3843
    output_tokens: 845
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
  cost_usd: 0.024204
---
Systems design is the discipline of deciding how software components are organized, communicate, and degrade. The sources here approach it from several angles: distributed state management, module decomposition, container internals, performance optimization, and communication of designs through diagrams.

At the distributed end, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses one of the hardest systems problems: ensuring that long-running workflows survive failures without manual reconciliation. Jack Vanlightly's taxonomy in [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps durable execution onto a behavior-state continuum — stateless functions, sessions, and actors — and shows how Temporal, Restate, DBOS, and Resonate each implement these patterns differently. The distinction matters because choosing the wrong form couples state to the wrong boundary.

At the module level, [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that SRP is not about doing one thing but about cohesive grouping under a single accountable responsibility. Over-granularizing classes fragments cohesion rather than protecting it, which is a structural analog to the distributed problem of drawing boundaries in the wrong place.

[How's Linear so fast?](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) demonstrates how local-first architecture — syncing state into IndexedDB, using service worker precaching, and applying optimistic updates — can produce near-instant perceived performance. The architectural decisions there are systems decisions: where state lives, how it is synchronized, and how failures surface to users.

Container internals are covered at the Linux level in [How Container Filesystem Works](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like), which walks through mount namespaces and pivot_root to show how filesystem isolation actually works. Understanding this layer matters when designing systems that depend on container behavior under unusual conditions.

On performance, [5x faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows how replacing float arithmetic with integer accumulators and integer division with reciprocal multiplication yields a 5.9x speedup — a reminder that algorithmic and data-representation choices compound at scale.

Finally, [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) addresses how poorly labeled or overloaded diagrams obscure the very systems they are meant to communicate. Unlabeled resources, disconnected nodes, and over-reliance on a single master diagram are structural failures in documentation that mirror structural failures in design.

[Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes the broader point that real engineering requires reading tradeoffs and shipping incrementally, not optimizing for toy problem metrics — which is the disposition systems design actually demands.
