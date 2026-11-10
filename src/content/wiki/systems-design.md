---
title: Systems design
summary: >-
  Systems design is the practice of choosing and composing architectural
  structures to meet real-world constraints; sources here illuminate that work
  through durable execution patterns, container internals, local-first sync,
  network tuning, and diagramming clarity.
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
compiled_at: '2026-11-10T01:26:32.655Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 848
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
  cost_usd: 0.025152
---
Real systems design is not about selecting the textbook-correct abstraction; it is about reading tradeoffs under production conditions. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes this explicit: interview algorithms test a narrow, trainable skill that weakly predicts how well an engineer handles messy, unbounded real-world inputs. The work is incremental, contextual, and full of competing constraints.

Durable execution illustrates those constraints well. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Jack Vanlightly](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) gives that space a taxonomy: stateless functions, sessions, and actors, arrayed along a behavior-state continuum, with Temporal, Restate, DBOS, and Resonate each occupying different positions.

At the infrastructure layer, [Ivan Velichko](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) shows how container isolation actually works, using mount namespaces and pivot_root to demonstrate that the abstractions engineers rely on daily are concrete Linux mechanisms. Similarly, [Marc Brooker](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm is obsolete in modern datacenters and that TCP_NODELAY should be the default, since application-layer protocols have already solved the tiny-packet problem and the Nagle/delayed-ACK interaction silently kills latency.

At the application layer, [Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) shows what local-first IndexedDB sync, aggressive code splitting, and optimistic updates look like when composed deliberately for perceived performance.

Design clarity matters as much as implementation. [Billy Pilger](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) catalogs seven pitfalls in architecture diagrams, including unlabeled resources, overloaded master diagrams, and fan traps, each of which obscures the system's actual behavior. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds that the Single Responsibility Principle is frequently misread as "do one thing" when it means cohesive grouping under a single accountable responsibility; over-granularizing structures violates the cognitive simplicity SRP exists to protect.

Performance optimization is part of the same design loop. [Arthur Pastel](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates this at the algorithm level, replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication to achieve a 5.9x speedup, a reminder that representation choices inside a system boundary carry real cost.
