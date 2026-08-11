---
title: Systems design
summary: >-
  Systems design spans decisions about how components, state, and failure modes
  interact — from distributed execution and container isolation to protocol
  choices and diagram clarity, each tradeoff shapes what a system can actually
  sustain in production.
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
compiled_at: '2026-08-11T08:03:34.134Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 919
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
  cost_usd: 0.026217
---
Systems design is concerned with how software components fit together and what happens when they do not. Several practical axes appear repeatedly across the sources here: state persistence, isolation boundaries, communication protocols, and how humans represent and reason about the result.

Durable execution addresses one of the hardest state problems in distributed systems: what to do when a long-running process fails mid-flight. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications can recover without manual reconciliation. Jack Vanlightly's taxonomy [of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) makes the design space more navigable, mapping stateless functions, sessions, and actors onto a behavior-state continuum and showing how Temporal, Restate, DBOS, and Resonate each occupy different positions on it.

Isolation operates at a lower layer. [Building a container filesystem from scratch](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) using Linux primitives like mount namespaces and pivot_root reveals that container boundaries are not magic but a composition of kernel features, each with its own propagation semantics. Knowing that layer matters when reasoning about what a system's runtime environment actually guarantees.

Protocol defaults also shape observable behavior. Marc Brooker's case for [TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) is a concrete example: Nagle's algorithm was designed for a network environment that no longer exists in most datacenters, and its interaction with delayed ACKs silently degrades latency in ways that are hard to diagnose after the fact. Good systems design includes auditing which defaults are still load-bearing and which are inherited anachronisms.

At the application layer, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows how local-first IndexedDB sync, aggressive code splitting, service worker precaching, and optimistic updates compose into perceived near-instant performance. No single technique achieves this; the performance is a property of how the pieces interlock.

Module boundaries inside a system are a recurring design question. The [SRP article](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is routinely misread as "do one thing" when it actually means cohesive grouping under a single accountable responsibility. Over-granularizing components in the name of that principle can increase cognitive load rather than reduce it.

Representing a system's design is its own discipline. [Common architecture diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) include unlabeled resources, overloaded master diagrams, and oversimplified behavioral flows, all of which produce diagrams that look complete but fail to communicate actual system behavior. A diagram that conceals tradeoffs is not a design artifact; it is a liability.

Finally, [Fagner Brack's argument](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) that real engineering requires reading tradeoffs and handling messy unbounded inputs is a useful frame for the whole field. Algorithm puzzles test a narrow skill; systems design is the broader activity of making choices that hold under production conditions.
