---
title: Systems design
summary: >-
  Systems design spans the architectural decisions, tradeoffs, and structural
  principles that determine how software holds together under real-world
  conditions, from network protocol choices to module cohesion to diagramming
  clarity.
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
compiled_at: '2026-09-21T21:58:05.720Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
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
  cost_usd: 0.023112
---
Systems design is less about any single technique and more about the accumulating weight of decisions that determine whether a system behaves predictably at scale. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) draws a sharp line between interview-optimized algorithm knowledge and the genuine design skill production work demands: reading tradeoffs, shipping incrementally, and building for messy, unbounded real-world inputs.

At the network layer, a single socket option illustrates how invisible defaults compound. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) documents how Nagle's algorithm, combined with delayed ACKs, silently inflates latency in datacenter environments where the original problem it solved no longer applies. The lesson generalizes: assumptions baked into infrastructure outlive the conditions that justified them.

Durable execution represents a higher-level systems concern. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses failure recovery by persisting workflow state at every step, removing the need for manual reconciliation logic. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) extends this into a taxonomy of three forms: stateless functions, sessions, and actors, mapped along a behavior-state continuum and implemented differently across platforms like Temporal, Restate, and DBOS.

Module-level cohesion is a parallel concern at the code layer. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that misreading the Single Responsibility Principle as "do only one thing" produces over-granularized classes that increase cognitive load rather than reduce it. Responsibility is about accountability, not atomicity.

Linear's architecture shows these principles converging in a product context. [Dennis Brotzky](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) traces its near-instant performance to local-first IndexedDB sync, optimistic updates, and aggressive code splitting: each a deliberate structural choice, not a performance patch applied after the fact.

Communicating system structure introduces its own failure modes. [Billy Pilger](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies recurring diagram pitfalls including unlabeled resources, overloaded master views, and oversimplified behavioral flows, problems that obscure rather than clarify the system's actual shape.
