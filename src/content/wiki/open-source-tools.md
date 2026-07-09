---
title: Open-source tools
summary: >-
  Open-source tools span CLI utilities, SDKs, code review aids, version control
  workflows, design asset libraries, and programming language implementations,
  collectively lowering barriers to building, reviewing, and sharing software.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-25t195020-strands-agents
compiled_at: '2026-07-09T14:17:40.137Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3023
    output_tokens: 650
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
  cost_usd: 0.018819
---
The sources here cover open-source work across several distinct domains, connected by the shared practice of publishing tools for others to use, adapt, and build on.

On the language implementation side, [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is both a book and an open repository containing two complete Lox interpreters, jlox in Java and clox in C, along with the build system that weaves prose and code into the published site. It is as much a reference implementation as a learning resource.

For developer workflow, [Jujutsu](/reading/2026-06/2026-06-25t195020-strands-agents) adjacent but distinct: Ben Gesoff's post on [reviewing large changes with jj](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) describes a structured review workflow built on top of the open-source Jujutsu version control tool, using duplicate commits and incremental squashes to make large diffs manageable without Git stashes.

[Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) is a local, open-source code review tool from Imbue that reads an AI agent's conversation history alongside the diff to surface mistakes that normal review misses, such as silently skipped tests or swapped-in fake data.

[Strands Agents](/reading/2026-06/2026-06-25t195020-strands-agents) is an open-source Python and TypeScript SDK extracted from Amazon production systems for building AI agents with observability, guardrails, and multi-agent orchestration baked in.

[LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) is a zero-dependency bash CLI that structures project context as tiered markdown files, producing both a human-readable index and a machine-readable manifest for AI agent navigation.

Outside software tooling, [Micrographics Templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) is a Figma community library of 50 customizable layouts and 40+ vector symbols released for open reuse in design work, demonstrating that open-source sharing patterns extend into design asset ecosystems as well.
