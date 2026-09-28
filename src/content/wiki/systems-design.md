---
title: Systems design
summary: >-
  Systems design spans the structural decisions — from network protocols and
  filesystem internals to reactive state and workflow durability — that
  determine how software behaves under real-world conditions.
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
compiled_at: '2026-09-28T23:12:12.815Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 855
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
  cost_usd: 0.025257
---
Systems design is less a single discipline than a set of recurring questions: how do components communicate, recover from failure, isolate state, and stay coherent under load? The sources here approach those questions from several angles, each illuminating a different layer of the stack.

At the network layer, [Marc Brooker's case against Nagle's algorithm](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows how a decades-old heuristic designed to batch small packets now silently inflates latency in datacenters, because the interaction between Nagle's algorithm and delayed ACKs stalls connections in ways that are hard to observe and easy to overlook. The fix is straightforward once you know to look, but it illustrates how defaults persist long after the conditions that justified them have changed.

At the infrastructure layer, [Ivan Velichko's container walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) reconstructs filesystem isolation from first principles — mount namespaces, mount propagation, pivot\_root — making explicit the Linux primitives that container runtimes abstract away. Understanding those primitives matters when abstractions leak or when you need to reason about what isolation actually guarantees.

Durable execution adds another dimension. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications can recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms — stateless functions, sessions, and actors — showing how platforms like Temporal and Restate make different tradeoffs along a behavior-state continuum.

Performance design surfaces in two very different contexts. [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) achieves near-instant UI response through local-first IndexedDB sync, optimistic updates, and aggressive prefetching — treating latency as a product property to be designed out rather than optimized around. [Arthur Pastel's blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) operates at a much lower level, replacing float arithmetic with integer accumulators to remove bottlenecks inside a hot loop, demonstrating that systems performance often comes from understanding what the hardware actually does with your code.

Module boundaries shape systems as much as runtime behavior. Henrique Teixeira on SRP argues that the Single Responsibility Principle is about cohesive accountability, not minimal surface area — over-granularizing components creates coordination overhead that defeats the cognitive simplicity the principle was meant to provide.

Finally, [architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) are themselves a systems design artifact. Unlabeled resources, fan traps, and overloaded master diagrams obscure the very structure they are meant to communicate, making diagrams an active risk when they substitute for clear thinking rather than capturing it.
