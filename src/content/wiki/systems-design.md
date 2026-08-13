---
title: Systems design
summary: >-
  Systems design spans the structural decisions that determine how software
  behaves under real conditions, from network protocol choices and filesystem
  isolation to workflow durability, reactive state, and the diagramming that
  communicates those decisions.
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
compiled_at: '2026-08-13T21:20:22.171Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 734
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
  cost_usd: 0.023442
---
Systems design is less a single discipline than a collection of load-bearing decisions made before and during implementation. What connects the sources here is a shared concern with how structural choices propagate through a running system.

At the network layer, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm, once a sensible default, silently degrades latency in modern datacenter environments because its interaction with delayed ACKs is nearly invisible until something is slow. The fix is a protocol-level default, not application logic. A similar instinct motivates [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and the taxonomy Jack Vanlightly lays out in [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms): pushing failure-recovery concerns into the platform rather than scattering reconciliation logic across application code.

At the module boundary, [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is routinely misread as granularity advice when it is actually a cohesion principle. Over-splitting responsibilities produces the same cognitive overhead that SRP was supposed to eliminate. This mirrors the argument in [Fagner Brack's piece](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) that real engineering requires reading tradeoffs across a system, not optimizing isolated functions.

Communicating system structure introduces its own failure modes. [Billy Pilger](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies concrete diagramming pitfalls, unlabeled resources, disconnected nodes, overloaded master diagrams, and fan traps, each of which obscures rather than conveys how a system actually behaves.

At the implementation level, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows what local-first sync, optimistic updates, and aggressive code splitting look like when composed deliberately. [Container filesystem isolation](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) and the reactive signal model described by [Willy Brauner](/reading/2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm) sit at similar levels of abstraction, each encoding a structural bet about where state lives and how changes propagate.
