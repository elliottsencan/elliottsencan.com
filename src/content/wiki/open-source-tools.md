---
title: Open-source tools
summary: >-
  Open-source tools span compilers, CLIs, design assets, version-control
  workflows, and AI agent SDKs; what connects them is public availability of
  both artifact and process, letting practitioners inspect, adapt, and build on
  each other's work.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-25t195020-strands-agents
compiled_at: '2026-06-26T03:00:56.794Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3023
    output_tokens: 629
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
  cost_usd: 0.018504
---
The sources here cover a wide range of tool categories, but each is open-source in a meaningful way: the artifact is public and the decisions behind it are visible.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is a GitHub repository containing the full book text alongside two complete interpreter implementations in Java and C. The repo itself is the product; the build system that weaves prose and code into the published site is part of what is released. That transparency is what makes it a teaching resource rather than just a reference.

[LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) is a zero-dependency bash CLI that organizes project context as tiered markdown files. No runtime dependencies means the tool is auditable by inspection and portable anywhere bash runs.

[Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) is a local code review tool that reads an AI agent's conversation history alongside the diff to surface mistakes standard review misses. Being open-source and local matters here: users can verify what the tool does with their code before trusting its output.

[Strands Agents](/reading/2026-06/2026-06-25t195020-strands-agents) is an SDK for building AI agents, released from Amazon's production systems. Open-sourcing production infrastructure lets external teams evaluate whether the abstractions match their own production constraints.

Not every entry here is software. The [Micrographics Templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) Figma library is a community-published design asset with 50 customizable layouts and 40+ vector symbols. The Figma Community distribution model functions analogously: the file is free, forkable, and inspectable.

[Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) documents a workflow built on top of jj, itself an open-source version control system, using its primitives in a way Git's model does not easily permit. The workflow depends on the tool being open enough to compose.
