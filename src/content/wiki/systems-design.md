---
title: Systems design
summary: >-
  Systems design spans the architectural decisions, tradeoffs, and structural
  principles that determine how software holds together under real-world
  conditions, from network protocols to filesystem internals to reactive data
  models.
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
compiled_at: '2026-10-26T22:34:10.162Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 839
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
  cost_usd: 0.025017
---
Systems design is the discipline of choosing how components fit together and how those choices ripple through correctness, performance, and maintainability. Several sources here illustrate the gap between algorithmic knowledge and actual design skill: [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) argues that production engineering is fundamentally about reading tradeoffs and shipping systems that handle messy, unbounded real-world inputs, not optimizing toy problems under time pressure.

At the protocol layer, design decisions have outsized and often invisible consequences. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm, designed to coalesce small packets, is now an antipattern in datacenter environments where application-layer protocols have solved the tiny-packet problem and the Nagle/delayed-ACK interaction silently kills latency.

For distributed applications, durable execution is an architectural pattern that sidesteps manual failure-recovery logic by persisting workflow state at every step. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) embodies this approach. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) provides a taxonomy of durable execution into stateless functions, sessions, and actors, then maps how Temporal and peers implement each form along a behavior-state continuum.

Containers show how clean namespace abstractions produce powerful isolation: [Ivan Velichko](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) demonstrates that Docker-like filesystem isolation is built from composable Linux primitives — mount namespaces, mount propagation, and pivot\_root — rather than any monolithic container runtime magic.

At the application level, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows how local-first IndexedDB sync, aggressive code splitting, service worker precaching, and optimistic updates combine into near-instant perceived performance. Reactive systems depend on similar structural clarity: [Willy Brauner](/reading/2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm) shows how Signals achieve efficiency through push-based invalidation paired with pull-based lazy re-evaluation, avoiding unnecessary recomputation.

Design quality also lives at the level of representation. [Billy Pilger](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs concrete diagram mistakes — unlabeled resources, disconnected nodes, overloaded master diagrams — that obscure rather than communicate system structure. And [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects a pervasive misreading of the Single Responsibility Principle: SRP is about cohesive grouping under one accountable responsibility, not about atomizing classes into meaningless fragments that increase cognitive load.
