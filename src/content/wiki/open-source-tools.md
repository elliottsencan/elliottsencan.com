---
title: Open-source tools
summary: >-
  Open-source tools span version control workflows, AI agent SDKs, code review
  utilities, knowledge organization CLIs, design asset libraries, and
  educational compilers, showing how public release shapes how tools get built
  and adopted.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-25t195020-strands-agents
compiled_at: '2026-07-06T00:18:53.519Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3023
    output_tokens: 649
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
  cost_usd: 0.018804
---
The sources tagged here cover a wide range of domains, but each represents a tool or resource released publicly for others to use, modify, or extend. What ties them together is not subject matter but distribution philosophy and the design choices that follow from it.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is the canonical example of open source as pedagogy. The repository contains the full book text alongside two complete interpreter implementations, with a build system that weaves prose and code into the published site. Making the source available is not incidental; it is the point, allowing readers to trace every claim back to running code.

[LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a narrower angle: a zero-dependency bash CLI that structures project context as tiered markdown files. The no-dependency constraint is itself an open-source design value, keeping the tool auditable and portable without requiring a package manager.

[Strands Agents](/reading/2026-06/2026-06-25t195020-strands-agents) was extracted from Amazon production systems and released as a Python and TypeScript SDK for building AI agents with observability, guardrails, and multi-agent orchestration baked in. Production lineage released publicly is a common open-source pattern: internal tooling that generalizes.

[Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) is a local, open-source code review tool that reads an AI agent's conversation history alongside the diff to surface mistakes that standard review misses. Running locally is another recurring value: users can inspect what the tool does with their code.

The [Jujutsu large-change review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) documents a technique built on top of jj, itself an open-source version control system. The workflow is shareable precisely because the underlying tool is.

[Micrographics Templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) extends the pattern to design: a Figma community library of 50 modular micrographic layouts, freely available for customization. Open distribution in design communities often looks like this, shared assets rather than shared code.
