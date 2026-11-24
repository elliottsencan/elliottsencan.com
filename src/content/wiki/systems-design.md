---
title: Systems design
summary: >-
  Systems design spans architecture decisions, failure handling, and performance
  tradeoffs; the sources here collectively illustrate how those concerns play
  out across networking, distributed workflows, containerization, frontend sync,
  and software structure.
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
compiled_at: '2026-11-24T04:03:59.523Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 833
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
  cost_usd: 0.024927
---
Systems design is the practice of making structural decisions about how components, data flows, and failure modes fit together before and during implementation. The sources here approach it from several angles, each illuminating a different layer of the same underlying discipline.

At the network layer, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows that a single socket option, TCP_NODELAY, can silently dominate latency budgets because Nagle's algorithm was designed for a network environment that no longer exists in modern datacenters. It is a sharp example of how low-level defaults accumulate invisible costs.

At the distributed systems layer, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses the problem of workflow state surviving failures, and [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) provides a taxonomy for thinking about those problems, mapping stateless functions, sessions, and actors onto a behavior-state continuum across platforms like Temporal, Restate, and DBOS.

Linear's architecture, described in [a technical breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown), shows what local-first sync, optimistic updates, and aggressive code splitting look like when they are composed into a coherent product. It is systems design expressed as perceived performance.

At the code-structure level, [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is a system-organization rule, not a function-granularity rule, and that misreading it produces fragmented designs that are harder to reason about than the monoliths they replaced.

[Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes the broader point that production engineering is about reading tradeoffs and handling unbounded real-world inputs, which is precisely what systems design decisions must account for. Algorithm fluency is not the same skill as architectural judgment.

Container internals, covered in [Ivan Velichko's walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like), and performance optimization, shown in [Arthur Pastel's image-rs work](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs), both reinforce that good systems design requires understanding what is happening several levels below the abstraction you are working in. The container article exposes mount namespaces and pivot_root; the blur optimization exposes integer accumulator arithmetic. Neither is accessible without reading the machinery underneath.

Finally, [Billy Pilger on architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) addresses the communication side: a system that cannot be clearly diagrammed is often a system that has not been clearly thought through.
