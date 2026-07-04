---
title: Open-source tools
summary: >-
  Open-source tools span CLI utilities, SDKs, design libraries, and code review
  aids, collectively showing how public source distribution accelerates
  learning, workflow improvement, and AI-era development practices.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-25t195020-strands-agents
compiled_at: '2026-07-04T21:25:27.855Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3023
    output_tokens: 516
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
  cost_usd: 0.016809
---
The range of open-source tools collected here resists a single category. What connects them is the decision to publish source so others can audit, extend, and learn from the implementation, not just consume the output.

At the educational end, [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) publishes the full source of two Lox interpreter implementations alongside its prose, letting readers run and modify real compilers rather than trace pseudocode.

At the workflow tooling end, [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) ships a zero-dependency bash CLI for organizing project context as tiered markdown, and [Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) enables a structured approach to reviewing large diffs by inserting empty parent commits and squashing files into them progressively.

AI-adjacent open-source tooling is increasingly prominent. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) is a local code review tool that reads an agent's conversation history alongside its diff to surface mistakes standard review misses. [Strands Agents](/reading/2026-06/2026-06-25t195020-strands-agents) is a Python and TypeScript SDK extracted from Amazon production systems for building AI agents with built-in observability and multi-agent orchestration.

Design assets appear here too: [Micrographics Templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) releases a Figma library of 50 customizable layouts under community licensing, applying open distribution logic to visual building blocks rather than code.
