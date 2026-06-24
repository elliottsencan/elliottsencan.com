---
title: Open-source tools
summary: >-
  Open-source tools span programming education, developer workflows, AI-assisted
  coding, and design resources, with the common thread being freely available,
  community-shareable artifacts built for real use.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
compiled_at: '2026-06-24T06:35:19.838Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2873
    output_tokens: 644
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
  cost_usd: 0.018279
---
Open-source tools cover a wide range of artifacts: books with runnable code, CLI utilities, version control workflows, code review assistants, and design libraries. What connects them is that the source is public, the tool is meant to be used rather than just read about, and the value compounds when others build on it.

The most literal example is the [Crafting Interpreters repository](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters), which publishes the full source for both a Java and a C Lox interpreter alongside the book text, with a build system that weaves code and prose into the final site. The repository itself is the deliverable.

[LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) is a zero-dependency bash CLI that structures project context as tiered markdown files, producing an INDEX.md for humans and a manifest.json for AI agents. The zero-dependency constraint is a deliberate design choice that keeps the tool portable and auditable.

[Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) is an open-source local code review tool that reads an AI agent's conversation history alongside the diff to catch errors that a standard review misses, such as silently skipped tests or swapped-in fake data. It addresses a gap that appears specifically when AI agents write code.

[Reviewing large changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) describes a workflow built on top of the open-source version control tool jj: duplicate the change, insert an empty parent commit, squash files into it as you review them. The technique persists review progress in version control rather than in mental state or stash hacks.

On the design side, the [Micrographics Templates library](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) is a Figma Community file with 50 customizable layouts and 40+ vector symbols. Its availability on the Figma Community platform makes it open for anyone to duplicate and modify.

Across these examples, open-source tools share a structural property: the artifact is inspectable, the constraints are visible, and the tool tends to do one job well rather than abstracting away its internals.
