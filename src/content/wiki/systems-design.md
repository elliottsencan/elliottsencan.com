---
title: Systems design
summary: >-
  Systems design spans the architectural decisions that determine how software
  components interact, recover from failure, scale under load, and remain
  comprehensible to the engineers who maintain them.
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
compiled_at: '2026-06-20T22:11:14.885Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3843
    output_tokens: 838
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
  cost_usd: 0.024099
---
Systems design is less a single technique than a collection of recurring problems: how do components communicate, what happens when they fail, how is state persisted, and how do humans reason about the resulting structure?

Durable execution is one concrete answer to the failure-recovery problem. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications can recover automatically without bespoke reconciliation logic. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this further, distinguishing stateless functions, sessions, and actors along a behavior-state continuum and showing how platforms like Temporal, Restate, DBOS, and Resonate each implement those forms differently.

Performance architecture demands its own discipline. Linear's near-instant feel comes from local-first IndexedDB sync, optimistic updates, aggressive code splitting, and service worker precaching, as [Brotzky's breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) details. At a lower level, [Pastel's optimization of image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows that algorithmic choices inside a single function, replacing float arithmetic with integer accumulators and division with reciprocal multiplication, can yield a 5.9x speedup without changing the system's external contract.

Isolation and boundary-drawing recur at every layer. [Velichko's container walkthrough](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) grounds container filesystem isolation in concrete Linux primitives: mount namespaces, mount propagation, and pivot_root. [Teixeira's reading of SRP](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) applies the same logic at the code level, arguing that cohesive grouping of behaviors under a single accountable responsibility matters more than artificial one-thing-per-class granularity.

Communication about systems is as fraught as the systems themselves. [Pilger's catalogue of diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) identifies unlabeled resources, fan traps, and overloaded master diagrams as common failure modes that obscure rather than clarify system structure.

Finally, [Brack's argument](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) that algorithm interviews test a narrow trainable skill weakly correlated with production performance points to what systems design actually requires: reading tradeoffs, shipping incrementally, and handling messy unbounded real-world inputs. Crafting an interpreter, as [Nystrom's book](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) demonstrates through two complete Lox implementations, is itself an exercise in that kind of end-to-end systems thinking, where every design choice in the grammar propagates into the runtime.
