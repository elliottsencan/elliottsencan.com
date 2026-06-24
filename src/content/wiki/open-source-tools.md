---
title: Open-source tools
summary: >-
  Open-source tools span code editors, version control workflows, CLI utilities,
  and design assets, with each source here illustrating a different dimension:
  authoring infrastructure, context management, code review, and visual
  resources.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
compiled_at: '2026-06-24T04:39:04.559Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2873
    output_tokens: 598
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
  cost_usd: 0.017589
---
The term covers a wide range of artifacts shared under open licenses, from full books with build tooling to command-line utilities to Figma libraries. What the sources here share is a commitment to publishing the artifact itself, not just describing it.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is the canonical example of a project where the open-source repository is the product. The repo contains both complete interpreter implementations (jlox in Java, clox in C) and the full book prose, woven together by a custom build system that generates the final site. The tool and its documentation are inseparable.

On the CLI side, [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) is a zero-dependency bash utility that structures project context as tiered markdown files, producing both a human-readable INDEX.md and a manifest.json for AI agents. Small scope, no dependencies, and a single well-defined output format are recurring characteristics of tools designed to be composed with other systems.

[Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) is an open-source local code review tool that reads an AI agent's conversation history alongside the diff to surface mistakes standard review misses. Its open-source status matters practically: the tool runs locally and can be audited, which is relevant when the thing being reviewed is AI-generated code.

[Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) is not itself introduced as a new tool here, but the workflow described around it demonstrates how open-source version control tooling enables custom review workflows that commercial equivalents do not.

The [Micrographics Templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) library on Figma Community extends the concept into design: 50 customizable layouts with 40+ vector symbols, freely available for remixing. It shows that open-source tool distribution has expanded beyond code repositories into design platforms.
