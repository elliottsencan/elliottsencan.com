---
title: Systems design
summary: >-
  Systems design covers the structural and architectural decisions that
  determine how software components fit together, handle failure, and perform
  under real conditions — from networking defaults to workflow durability to
  filesystem isolation.
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
compiled_at: '2026-09-07T21:23:01.776Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 800
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
  cost_usd: 0.024432
---
Systems design is less a single discipline than a collection of judgment calls made at different levels of abstraction. The sources here span that range: networking primitives, container internals, distributed workflow patterns, performance architecture, and diagram communication.

At the networking layer, [Marc Brooker's analysis](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the case that Nagle's algorithm — designed to coalesce small packets on slow, congested links — is now a latency hazard in modern datacenter environments where application-layer protocols already handle batching. The Nagle/delayed-ACK interaction can silently add hundreds of milliseconds to round-trip times, and the fix is simply setting TCP_NODELAY. One flag, one decision, measurable consequence. That kind of low-level detail shapes system behavior as much as any architectural diagram.

Containers illustrate a different layer. [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) reconstructs a Docker-like container using only Linux primitives — unshare, mount, pivot_root — showing that container isolation is a composition of kernel features, not a single abstraction. Understanding what sits underneath a platform matters when something breaks at the boundary.

At the distributed-systems level, durable execution is an architectural pattern that eliminates manual failure-recovery logic by persisting workflow state at every step. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) is the prominent platform here, and [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps the space into three forms — stateless functions, sessions, and actors — positioned along a behavior-state continuum and implemented differently by Temporal, Restate, DBOS, and Resonate.

Performance architecture appears in [the Linear breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown), which attributes near-instant UI response to local-first sync over IndexedDB, aggressive code splitting, service worker precaching, and optimistic updates. The decisions compound: no single trick accounts for the result.

Communicating designs clearly is its own problem. [Billy Pilger's piece on architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies recurring failures — unlabeled resources, fan traps, overloaded master diagrams — that cause diagrams to mislead rather than clarify. A diagram that obscures behavior is a systems risk, not just a communication failure.

[Fagner Brack's argument](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) that production engineering requires reading tradeoffs and shipping incrementally rather than solving bounded algorithmic puzzles connects to all of this: real systems are unbounded, stateful, and full of emergent interactions that no interview whiteboard captures.
