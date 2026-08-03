---
title: Systems design
summary: >-
  Systems design spans the tradeoffs in structuring software — from distributed
  state and container internals to module cohesion and network behavior — with
  no single correct answer, only choices whose consequences compound at scale.
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
compiled_at: '2026-08-03T10:13:17.317Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 843
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
  cost_usd: 0.025077
---
Systems design is less a discipline than a set of recurring tradeoffs: where state lives, how components communicate, how failure propagates, and how legible the resulting structure is to the people who maintain it. The sources here touch each of those dimensions from different angles.

State management under failure is a central concern. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover automatically without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) refines this into three durable execution forms — stateless functions, sessions, and actors — mapped along a behavior-state continuum, showing how Temporal, Restate, DBOS, and Resonate each commit to different points on that spectrum.

At the network layer, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm is a latency trap on modern hardware: application-layer protocols have already solved the tiny-packet problem, and the Nagle-plus-delayed-ACK interaction silently inflates round-trip times in ways that are hard to diagnose.

Local architecture choices compound too. [Linear's speed breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows how local-first IndexedDB sync, optimistic updates, and aggressive code splitting combine to push perceived latency near zero. [Ivan Velichko's container walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) grounds container isolation in concrete Linux primitives — mount namespaces, mount propagation, pivot_root — rather than Docker abstraction.

Module cohesion is a structural concern at a different scale. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is about cohesive grouping under one accountable purpose, not about atomizing classes until each does one thing. Over-granularizing violates the cognitive simplicity the principle was meant to protect.

Documentation and communication sit alongside structure. [Billy Pilger on architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs seven diagramming failures — unlabeled resources, overloaded master diagrams, fan traps — each of which obscures rather than conveys the design. And [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) draws a line between interview-style algorithm puzzles and the actual work of reading tradeoffs, shipping incrementally, and handling messy real-world inputs.

Taken together, the recurring theme is that systems design is an exercise in managing consequence: every structural choice — where state lives, how modules divide, how diagrams communicate — propagates outward in ways that reward careful reasoning over local optimization.
