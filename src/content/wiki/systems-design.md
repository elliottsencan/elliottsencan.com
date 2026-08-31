---
title: Systems design
summary: >-
  Systems design covers architectural decisions that determine how software
  components fit, communicate, and fail together, from low-level kernel
  primitives to distributed workflow orchestration.
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
compiled_at: '2026-08-31T22:42:06.873Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4144
    output_tokens: 832
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
  cost_usd: 0.024912
---
Systems design is less a discrete skill than a continuum of decisions, each carrying tradeoffs that only become visible under production conditions. The gap between interview performance and engineering judgment is real: algorithm puzzles test a trainable, narrow ability, while actual systems work demands reading tradeoffs, shipping incrementally, and handling messy, unbounded inputs [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work).

At the component level, how you draw boundaries matters. The Single Responsibility Principle is routinely misread as "do only one thing," when its real directive is cohesive grouping under a single accountable responsibility; over-granularizing splits cognitive load without simplifying anything [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Communicating those boundaries accurately is its own discipline: architecture diagrams fail when resources are unlabeled, nodes are disconnected, or a single overloaded diagram tries to carry every perspective at once [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams).

Performance is structural before it is algorithmic. Linear's near-instant feel comes from local-first IndexedDB sync, aggressive code splitting, and optimistic updates, not from clever data structures [How's Linear so fast?](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown). A 5.9x speedup in image blurring came from replacing float arithmetic with integer accumulators and reciprocal multiplication, changes that required understanding memory and CPU behavior at a low level [5x faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs). Even at the network layer, a single socket option, TCP_NODELAY, can silently dominate latency because Nagle's algorithm was designed for a network environment that no longer exists [It's always TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time).

Distributed systems add state and failure to every decision. Temporal persists workflow state at every step so applications recover from failures without manual reconciliation [Temporal](/reading/2026-04/2026-04-30t231511-temporal). A taxonomy of durable execution patterns, stateless functions, sessions, and actors, shows how platforms like Temporal, Restate, and DBOS each position themselves along a behavior-state continuum [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms). Container isolation is another systems primitive that looks simple from the outside; assembling one from scratch with unshare, mount, and pivot_root exposes how mount namespaces and root filesystem isolation actually compose [How Container Filesystem Works](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like).
