---
title: Open-source tools
summary: >-
  Open-source tools span compilers, CLI utilities, design assets, and
  version-control workflows, each released publicly so practitioners can
  inspect, adapt, and build on the underlying work.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
compiled_at: '2026-06-20T12:50:52.087Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2723
    output_tokens: 520
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
  cost_usd: 0.015969
---
The four sources here span radically different domains but share the same structural logic: release the full artifact, not just a polished surface, so others can inspect, adapt, and extend it.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is perhaps the clearest example. Robert Nystrom's repository ships the complete book text alongside two working Lox implementations, jlox in Java and clox in C, with a build system that weaves prose and code into the published site. Everything that produces the final output is present and auditable.

[LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a narrower scope: a zero-dependency bash CLI that organizes project context into tiered markdown files and emits both a human-readable INDEX.md and a machine-readable manifest.json. The zero-dependency constraint is itself a design statement about portability and auditability.

The [Micrographics Templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) Figma library extends the pattern into design work. Zachary Winterton's 50 customizable layouts and 40+ vector symbols are released on the Figma Community, making a set of reusable industrial-schematic building blocks available without cost or closed licensing.

Ben Gesoff's [jujutsu review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) is different in kind: the tool itself, Jujutsu, is open source, and the post describes a practice that only works because jj exposes composable, inspectable commit manipulation that Git's model makes awkward. Open source here enables a workflow that a closed tool would not permit users to construct.
