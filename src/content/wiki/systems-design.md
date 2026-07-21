---
title: Systems design
summary: >-
  Systems design covers the architectural decisions, tradeoffs, and abstractions
  that determine how software components fit together and behave under real
  conditions, spanning everything from distributed state to filesystem isolation
  to network defaults.
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
compiled_at: '2026-07-21T05:07:41.657Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 856
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
  cost_usd: 0.025272
---
Systems design is the practice of making structural decisions about how software components interact, where state lives, what failure modes are acceptable, and how performance constraints shape architecture. The sources here span several layers of that discipline.

At the network layer, a deceptively small setting illustrates how legacy defaults undermine modern systems. [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm, designed for slow serial links, still silently inflates latency in datacenters because application-layer protocols have already solved the tiny-packet problem and the interaction with delayed ACKs is rarely visible until something breaks. The fix is trivial; the damage from not applying it is not.

At the application layer, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) demonstrates how local-first design, with an IndexedDB sync layer, optimistic updates, service worker precaching, and aggressive code splitting, produces near-instant perceived performance. The structural decision is to treat the client as the primary data store and the server as the authority to reconcile with later.

State management across failures is the central problem that [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses: persisting workflow state at every step so distributed applications can recover without manual reconciliation. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) extends this into a taxonomy: stateless functions, sessions, and actors map a behavior-state continuum that platforms like Temporal, Restate, DBOS, and Resonate each implement differently.

At the OS layer, [Ivan Velichko's container walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how mount namespaces, mount propagation, and pivot_root compose into filesystem isolation. Understanding these primitives matters because container abstractions hide failure modes that only surface when the defaults are wrong.

Module boundaries are a systems design question at the code level. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is about cohesive grouping under one accountable owner, not about minimizing the surface area of every class. Over-granularizing increases coupling and cognitive load rather than reducing it.

Communicating system structure has its own pitfalls. [Billy Pilger](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies failure modes in architecture diagrams: unlabeled nodes, disconnected resources, overloaded single diagrams, and oversimplified behavioral flows each let misunderstandings persist until integration time.

Finally, [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) draws a boundary between algorithmic puzzle-solving and actual systems work. Real engineering means reading tradeoffs, shipping incrementally, and building systems that handle messy, unbounded inputs, not optimizing toy problems under artificial constraints.
