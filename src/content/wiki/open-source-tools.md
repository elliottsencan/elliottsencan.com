---
title: Open-source tools
summary: >-
  Open-source tools span programming education, developer workflows, AI agent
  infrastructure, and design assets, each offering freely available
  implementations that practitioners can adopt, fork, or extend.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-25t195020-strands-agents
compiled_at: '2026-07-02T12:32:55.536Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3023
    output_tokens: 583
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
  cost_usd: 0.017814
---
The open-source tools tagged here span several distinct domains, but share a common posture: ship the full implementation, not just the idea.

On the programming education side, [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) publishes both the complete book text and two working Lox interpreters (jlox in Java, clox in C) in a single repository. Readers get runnable source alongside the prose, not excerpts.

For developer workflow, Jujutsu's review technique describes a jj-native approach to large pull requests: duplicate the change, insert an empty parent commit, and squash files into it as you review, persisting progress in version control rather than mental state. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) is a local, open-source code review tool that reads an AI agent's conversation history alongside the diff to catch mistakes that standard review misses, including silently skipped tests or swapped-in fake data.

In AI infrastructure, [Strands Agents](/reading/2026-06/2026-06-25t195020-strands-agents) is an open-source Python and TypeScript SDK extracted from Amazon production systems, providing built-in observability, guardrails, memory, and multi-agent orchestration. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) is a zero-dependency bash CLI that structures project context as tiered markdown files and a machine-readable manifest so AI agents can navigate without burning excess tokens.

Outside the software stack entirely, Micrographics Templates is a freely available Figma community library with 50 customizable layouts drawn from post-WWII industrial schematics, offering 40-plus vector symbols as modular building blocks for technical, data-heavy compositions.
