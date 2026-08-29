---
title: Systems design
summary: >-
  Systems design covers the structural and behavioral decisions that determine
  how software holds together under real-world conditions, from low-level
  networking choices to distributed workflow patterns to module boundaries.
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
compiled_at: '2026-08-29T20:23:19.037Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 693
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
  cost_usd: 0.022827
---
Systems design is less a single discipline than a collection of recurring decisions: how components communicate, how state is managed across failures, how module boundaries are drawn, and how diagrams represent all of it legibly. The sources here pull in several directions that reinforce each other.

At the network layer, [Marc Brooker's analysis](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows that a single socket option, TCP_NODELAY, has outsized latency consequences because Nagle's algorithm interacts badly with delayed ACKs in ways that are invisible until measured. The lesson is that default assumptions embedded in infrastructure accumulate into real performance penalties.

One level up, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) illustrates how a coherent set of structural choices, local-first IndexedDB sync, optimistic updates, and aggressive code splitting, compound into application-level speed that no single optimization could produce alone.

For distributed systems, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [Jack Vanlightly's taxonomy of durable execution](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) show how workflow state persistence changes the design surface: when failures are handled by the platform rather than the application, engineers can model business logic directly without reconciliation scaffolding.

Module-level design gets its own treatment in the [Single Responsibility Principle article](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), which argues that SRP is about cohesive accountability, not fragmentation into the smallest possible units. Splitting too aggressively destroys the cognitive clarity the principle was meant to create.

Diagrams are where design decisions get communicated, and [Billy Pilger's breakdown of architecture diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies specific failure modes: unlabeled nodes, overloaded master diagrams, and behavioral flows so simplified they mislead. Diagrams that obscure rather than clarify are a design failure in their own right.

[Fagner Brack's critique of algorithm interviews](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) ties this together from another angle: real production work is about reading tradeoffs and handling unbounded real-world inputs, which is precisely what systems design requires and what interview performance fails to predict.
