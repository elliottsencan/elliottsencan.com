---
title: Open-source tools
summary: >-
  Openly published tools and libraries that expose source code for reuse, study,
  and contribution, spanning developer utilities, design assets, and educational
  projects.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
compiled_at: '2026-06-21T18:39:00.153Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2723
    output_tokens: 502
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
  cost_usd: 0.015699
---
Open-source tools appear across every layer of the software and design stack. What connects them is not a shared license or governance model but the practice of publishing source alongside the artifact so others can inspect, extend, or build on top of it.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is a canonical example: Robert Nystrom published both the full book text and two complete interpreter implementations in a single repository, letting readers follow the prose and run the code in the same sitting. The build system that weaves code and prose into the final site is itself part of the open artifact.

[LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a more utilitarian approach: a zero-dependency bash CLI that organizes project context into tiered markdown files with no external packages required. Keeping the dependency surface at zero is itself a design choice that lowers the bar for adoption and inspection.

Open-source distribution also shows up in design tooling. The [Micrographics Templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) library on Figma Community makes 50 customizable layouts and 40+ vector symbols freely available, applying the same share-and-extend logic to visual assets that software projects apply to code.

Ben Gesoff's [Jujutsu review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) demonstrates how open-source version control tools can be composed in novel ways: Jujutsu's commit model enables a review technique that Git's stash-based workflow makes impractical, illustrating that open tooling creates headroom for users to find uses the original authors did not anticipate.
