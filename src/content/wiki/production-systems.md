---
title: Production systems
summary: >-
  Production systems span durable workflow execution, credential management, and
  deployment tooling; the cited sources collectively highlight how reliability,
  transparency, and operational simplicity are the recurring concerns across
  each layer.
sources:
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231511-temporal
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t135637-reddit-rdevops
compiled_at: '2026-05-06T16:14:57.352Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2732
    output_tokens: 482
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
  cost_usd: 0.015426
---
The concerns that recur across production infrastructure are reliability under failure, trust in the tools being used, and predictable credential handling. Each of these surfaces in different layers of the stack.

[Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses the reliability layer directly: by persisting workflow state at every step, it lets distributed applications recover from failures automatically, removing the need to hand-write reconciliation logic. That durability guarantee is what separates production-grade orchestration from scripts that simply hope nothing crashes.

Credential handling is a quieter concern but equally load-bearing. Using SSH keys shows how OpenSSH key pairs, agent forwarding, and SSH-based commit signing can replace PAT tokens across local and remote Linux machines, reducing the credential surface that production pipelines have to manage.

Tool transparency is a third axis. The critique of Ollama in Friends Don't Let Friends Use Ollama points out that opaque dependencies, misleading model naming, and a drift toward closed-source components create operational risk in production AI deployments. The argument is that faster, more auditable alternatives exist and that production decisions should prefer them.

[Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) is a more specialized case: a multi-agent system that orchestrates 100+ generative models to execute video editing end-to-end, outputting editable projects rather than static files. It illustrates how production AI pipelines increasingly depend on the same orchestration and reliability properties as conventional distributed systems.
