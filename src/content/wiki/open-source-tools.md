---
title: Open-source tools
summary: >-
  Open-source tools span development infrastructure, design assets, and workflow
  utilities, with the common thread being publicly available source that
  practitioners can inspect, modify, and redistribute.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
compiled_at: '2026-06-22T07:26:54.501Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2723
    output_tokens: 385
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
  cost_usd: 0.013944
---
The sources here illustrate how open-source tools operate across several distinct domains. At the infrastructure end, [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) publishes both the full book text and two complete interpreter implementations (jlox in Java, clox in C) in a single repository, making the educational artifact and the working code inseparable. At the workflow end, [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) is a zero-dependency bash CLI distributed under a Homebrew tap, structured so AI agents and humans can navigate project context from the same tiered markdown files. Ben Gesoff's [Jujutsu review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) depends on jj, an open-source version-control system, to persist incremental review progress in commits rather than stashes. The [Micrographics Templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) library distributes 50 Figma layouts as a free community file, extending open-source distribution norms into design tooling. Across these cases, open-source access enables inspection and adaptation rather than mere consumption.
