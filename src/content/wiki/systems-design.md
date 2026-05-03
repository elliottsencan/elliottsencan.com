---
title: Systems design
summary: >-
  Systems design concerns how components of a program or service are separated,
  coordinated, and made resilient; sources here address boundary-drawing in
  agent infrastructure, language runtimes, and distributed workflow execution.
sources:
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t231511-temporal
compiled_at: '2026-05-03T19:07:12.511Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 1391
    output_tokens: 529
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
  cost_usd: 0.012108
---
The core problem in systems design is deciding where to draw boundaries between components so that each can change, fail, or scale independently. How those boundaries are drawn determines latency characteristics, fault isolation, and how much complexity leaks across interfaces.

Anthropics Managed Agents architecture is a direct case study in boundary discipline. By separating the agent harness, session log, and sandbox into independent interfaces, the team ensured that a failure or upgrade in one layer does not cascade into the others. The payoff was concrete: [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) reports p50 time-to-first-token dropping roughly 60% and p95 dropping over 90% once the brain and hands of the system were decoupled. The architectural principle and the performance result are the same thing looked at from different angles.

Temporal approaches the boundary problem from the persistence side. Rather than asking components to coordinate recovery manually, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so that distributed applications can resume after failure without reconciliation logic scattered across services. The boundary here is between durable state and execution logic, and keeping those separate is what makes the recovery guarantee possible.

At a smaller scale, interpreter design surfaces the same concerns. The [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) repository builds two complete Lox implementations, one in Java and one in C, each with distinct internal boundaries between scanning, parsing, and evaluation. Nystrom's decision to implement the same language twice makes the tradeoffs of those boundaries visible: jlox favors clarity and object structure while clox favors performance through tighter memory layout. Same interface contract, different internal geometry.

Across all three, the design question is the same: what changes together should be grouped, and what needs to vary independently should be separated.
