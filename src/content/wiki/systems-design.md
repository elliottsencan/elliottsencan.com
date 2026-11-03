---
title: Systems design
summary: >-
  Systems design spans the architectural decisions, tradeoffs, and
  implementation patterns that determine how software behaves at scale — from
  network protocols and filesystem isolation to reactive state models and
  durable execution.
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
compiled_at: '2026-11-03T00:46:03.665Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 715
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
  cost_usd: 0.023157
---
Systems design is less a single discipline than a set of recurring tradeoffs: latency vs. throughput, simplicity vs. flexibility, local state vs. distributed consistency. The sources here surface that pattern repeatedly across very different layers of the stack.

At the network layer, [Brooker's case for TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) illustrates how a decades-old default (Nagle's algorithm) can silently degrade latency in modern datacenter contexts where application protocols have already solved the tiny-packet problem it was designed to address. Default assumptions calcify into invisible costs.

At the application layer, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows how local-first sync via IndexedDB, optimistic updates, and aggressive code splitting combine to produce near-instant perceived performance. The design decision is fundamentally about where state lives and who waits for whom.

Durable execution addresses a parallel problem in distributed workflows. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover from failures without manual reconciliation. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms, stateless functions, sessions, and actors, showing how platforms like Temporal and Restate each make different bets on the behavior-state continuum.

Module boundaries matter just as much as runtime choices. [Teixeira on SRP](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is about cohesive grouping under one accountable owner, not maximum granularity. Over-splitting is itself a systems failure: it disperses responsibility without clarifying it.

Communicating design is its own discipline. [Pilger's analysis of architecture diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies pitfalls like unlabeled resources, fan traps, and overloaded master diagrams. A diagram that obscures more than it reveals is a systems problem, not just an aesthetic one.

Finally, [Brack's argument about algorithm interviews](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) frames what systems design actually demands in practice: reading tradeoffs, shipping incrementally, and handling messy real-world inputs rather than optimizing for clean, bounded problems.
