---
title: Open-source tools
summary: >-
  Open-source tools span developer utilities, AI agent frameworks, design
  assets, and learning resources, with the common thread that source
  availability lets practitioners inspect, adapt, and extend what they use.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-25t195020-strands-agents
compiled_at: '2026-07-08T00:19:14.358Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3023
    output_tokens: 566
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
  cost_usd: 0.017559
---
The breadth of open-source tooling visible across these sources resists a single category. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is a fully open book-and-codebase: the prose, the jlox Java interpreter, and the clox C interpreter all live in a public repository with a build system that weaves them together. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes the opposite scale, a zero-dependency bash CLI that structures project context as tiered markdown files for both human and AI consumption. [Strands Agents](/reading/2026-06/2026-06-25t195020-strands-agents) lands at the framework end: a Python and TypeScript SDK extracted from Amazon production systems, covering observability, guardrails, memory, and multi-agent orchestration. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) is narrower still, a local code review tool that reads an AI agent's conversation history alongside a diff to surface mistakes standard review misses.

Two sources extend the pattern beyond software. The [Jujutsu review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) documents a technique built around jj, an open version control system, using its commit model to persist code-review progress without stash gymnastics. The [Micrographics Templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) library on Figma Community offers 50 customizable layouts and 40+ vector symbols under a free community license, bringing open-access distribution norms into design assets.

The common thread is access to internals. Whether it is a book whose build pipeline is inspectable, a bash script with no hidden dependencies, or an agent SDK ported from production, each tool offers more than a black-box artifact.
