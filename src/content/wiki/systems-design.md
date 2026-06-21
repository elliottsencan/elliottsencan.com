---
title: Systems design
summary: >-
  Systems design spans architectural tradeoffs across distributed coordination,
  filesystem isolation, reactive state, UI performance, and API boundaries — a
  discipline where the core challenge is managing complexity at the right level
  of abstraction.
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
compiled_at: '2026-06-21T18:34:35.016Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3843
    output_tokens: 927
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
  cost_usd: 0.025434
---
Systems design is less a single technique than a lens for reasoning about how components interact, where failures propagate, and what tradeoffs get baked in at each layer. The sources here cover a wide band of that territory.

At the infrastructure end, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses one of the hardest distributed systems problems: keeping workflow state consistent across partial failures without forcing application code to handle every recovery edge case. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) sharpens this by mapping durable execution into three forms — stateless functions, sessions, and actors — and showing how Temporal, Restate, DBOS, and Resonate each land differently on the behavior-state continuum. Choosing among them is a design decision with long-term consequences for how failure recovery and statefulness are expressed.

One level down, [Ivan Velichko's container walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how Linux mount namespaces, mount propagation, and pivot_root compose into the filesystem isolation that container runtimes depend on. Understanding that substrate matters when designing systems that run on top of it.

At the application layer, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) demonstrates what local-first sync, optimistic updates, and aggressive code splitting look like when taken seriously as design commitments rather than optimizations bolted on after the fact. The reactive side of that picture is covered by [Willy Brauner's Signal explainer](/reading/2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm), which traces how push-based invalidation and pull-based lazy re-evaluation let reactive systems avoid redundant recomputation.

Good design also depends on communicating structure clearly. [Billy Pilger's piece on architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) makes the case that unlabeled resources, overloaded diagrams, and oversimplified behavioral flows are not aesthetic failures but epistemic ones — they obscure the very tradeoffs a diagram should expose.

At the code organization level, [Henrique Teixeira's reading of SRP](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the principle is routinely misapplied: over-granularizing components in the name of "single responsibility" fragments cohesion and increases cognitive load rather than reducing it. The real goal is grouping behavior under a single accountable concern. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes the related point that production engineering is fundamentally about reading tradeoffs and shipping incrementally into messy, unbounded conditions — not optimizing for the narrow, well-specified problems that interview algorithms address.

Performance sits inside systems design too. [Arthur Pastel's blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) is a localized example, but the method — replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication — reflects the general pattern of finding where a system's cost model diverges from intuition and fixing it at the right level.
