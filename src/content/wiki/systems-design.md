---
title: Systems design
summary: >-
  Systems design spans decisions about how components interact under real-world
  constraints, from network protocol choices and filesystem isolation to
  workflow durability and the communication structures that make designs legible
  to other engineers.
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
compiled_at: '2026-08-10T19:07:31.754Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 739
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
  cost_usd: 0.023517
---
Systems design is less a single discipline than a cluster of concerns that emerge whenever software must survive contact with infrastructure, failure, and other humans. The sources here span several layers of that concern.

At the network layer, [Brooker's case for TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows how a 1984 congestion algorithm interacts catastrophically with delayed ACKs in modern datacenter environments. The design lesson is that defaults outlive the constraints that justified them, and that latency bugs caused by protocol interactions are easy to miss because nothing looks broken.

At the infrastructure layer, [Velichko's container walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) grounds container isolation in concrete Linux primitives: mount namespaces, mount propagation, and pivot_root. Understanding what the abstraction is actually doing matters when the abstraction leaks.

For distributed application logic, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) address a different class of design decision: how to make workflows survive failures without scattering reconciliation logic through application code. Vanlightly maps durable execution into three forms (stateless functions, sessions, and actors) and compares how Temporal, Restate, DBOS, and Resonate each implement them, which is a useful frame for choosing between platforms.

Diagram quality is a systems design concern that often gets treated as cosmetic. [Pilger's breakdown of architecture diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) argues that unlabeled resources, fan traps, and overloaded master diagrams do real damage to shared understanding. A diagram that can't communicate behavioral flows accurately is a liability, not a convenience.

Module boundaries affect design at the code level. [Teixeira on SRP](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that the Single Responsibility Principle is about cohesion under a single accountability, not minimal line count. Over-granularizing components in the name of SRP often produces the cognitive overhead the principle was meant to eliminate.

[Brack's critique of algorithm interviews](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) frames the problem from the other direction: production engineering requires reading tradeoffs and shipping incrementally under messy, unbounded conditions, skills that timed whiteboard exercises do not test and may actively deprioritize.
