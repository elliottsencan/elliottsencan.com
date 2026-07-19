---
title: Systems design
summary: >-
  Systems design spans the tradeoffs, patterns, and communication conventions
  that govern how software components are composed, isolated, and made resilient
  at scale.
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
compiled_at: '2026-07-19T14:41:21.606Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 735
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
  cost_usd: 0.023457
---
Systems design is less a single discipline than a cluster of tradeoffs: how components communicate, where state lives, how failure is contained, and how the resulting structure can be understood by the people who maintain it.

At the network layer, protocol defaults matter more than they appear. [Marc Brooker's analysis of Nagle's algorithm](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows how a 1984 optimization for slow WANs silently inflates latency in modern datacenter environments. The Nagle/delayed-ACK interaction is a systemic trap: individually reasonable defaults combine into millisecond penalties that compound across request chains.

State management is a recurring theme at every layer. [Linear's local-first architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) keeps a synchronized IndexedDB replica in the client so that reads never wait on the network. [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) handles the distributed version of the same problem: persisting workflow state at every step so that failures can be recovered automatically without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) extends this into three forms, stateless functions, sessions, and actors, mapped across a behavior-state continuum and showing how platforms like Temporal, Restate, and DBOS each make different tradeoffs.

Isolation at the process level has its own structural logic. [Ivan Velichko's container walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) traces how mount namespaces and pivot_root combine to produce filesystem isolation, a design that composes a small set of Linux primitives into a coherent boundary.

How a system is decomposed into units of responsibility shapes maintainability as much as any runtime choice. [Henrique Teixeira's reading of SRP](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the principle is about cohesive accountability, not minimal size, and that over-granularizing modules trades one form of complexity for another.

Communicating system structure clearly is its own discipline. [Billy Pilger's catalog of diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies concrete pitfalls: unlabeled resources, fan traps, overloaded master diagrams, and behavioral flows that omit the decision logic that actually governs runtime behavior. Diagrams that hide complexity rather than expose it undermine the shared understanding that good systems design depends on.
