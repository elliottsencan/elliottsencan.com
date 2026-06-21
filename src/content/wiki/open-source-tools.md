---
title: Open-source tools
summary: >-
  Open-source tools span programming education, developer utilities, and design
  resources, each sharing code and assets publicly to enable direct use,
  inspection, and contribution.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
compiled_at: '2026-06-21T20:22:31.515Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2723
    output_tokens: 507
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
  cost_usd: 0.015774
---
Open-source tools show up across a wide range of disciplines, from language implementation to version control workflows to design assets. What connects them is public availability of the underlying artifact, whether that is source code or a design file, so anyone can inspect, adapt, or contribute.

The [Crafting Interpreters repository](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is a particularly thorough example: the full book text, the jlox Java interpreter, and the clox C interpreter are all published together with a build system that weaves code and prose into the final site. The repository is the product, not just a companion to it.

On the utility end, [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) is a zero-dependency bash CLI that organizes project context as tiered markdown files, producing both a human-readable INDEX.md and a machine-readable manifest.json. Its open distribution via Homebrew and GitHub Releases makes the tool easy to adopt without any build setup.

Design tooling follows similar patterns. The [Micrographics Templates library](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) published on the Figma Community offers 50 customizable layouts and 40+ vector symbols under an open sharing model, letting designers remix technical, data-heavy compositions without starting from scratch.

Finally, [Ben Gesoff's Jujutsu review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) relies on jj, an open-source version control system, to handle large pull requests by duplicating changes and squashing files into an empty parent commit as review progresses. The openness of the tool is what makes the workflow portable and reproducible across teams.
