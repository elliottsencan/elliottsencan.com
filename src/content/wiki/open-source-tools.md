---
title: Open-source tools
summary: >-
  Open-source tools span version-controlled books, CLI utilities, design asset
  libraries, and developer workflows, each made more durable by being openly
  inspectable, forkable, and composable.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
compiled_at: '2026-06-22T02:41:37.033Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2723
    output_tokens: 511
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
  cost_usd: 0.015834
---
Open-source tools surface across disciplines in ways that reward treating the source as part of the product. The [Crafting Interpreters repository](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) makes this literal: the book text, two complete interpreter implementations, and the build system that weaves them into the published site all live in one public repo, so readers can follow prose and working code side by side. The tool is the artifact.

At the CLI end, [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) ships a zero-dependency bash script that organizes project context into tiered markdown files and a machine-readable manifest. Zero dependencies is itself a design choice: the tool stays portable and auditable precisely because there is nothing hidden inside a package graph.

Design tooling enters the picture with [Micrographics Templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts), a Figma community library of 50 modular layouts and 40+ vector symbols released for public remix. The open distribution model lets the asset library function more like a toolkit than a deliverable.

Finally, [Ben Gesoff's Jujutsu review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows open-source version control (jj) enabling a pattern Git does not easily support: inserting an empty parent commit to stage reviewed files incrementally, persisting review progress in the history itself. The workflow is only possible because the tool exposes its internals openly enough to be repurposed.

Across these cases, openness does more than enable reuse. It lets the tool's internals be understood, combined, and extended in ways the original author did not plan for.
