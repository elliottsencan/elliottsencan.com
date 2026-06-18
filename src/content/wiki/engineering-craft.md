---
title: Engineering craft
summary: >-
  The judgment, tacit knowledge, and deliberate technique that separate working
  software from well-made software, examined across language internals, shell
  tooling, component design, version control, and the question of what survives
  automation.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - >-
    2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - 2026-05/2026-05-06t163329-multi-stroke-text-effect-in-css
  - >-
    2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile
  - >-
    2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise
  - 2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - 2026-05/2026-05-18t113714-yaml-thats-norway-problem
  - >-
    2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you
  - 2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - >-
    2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with
  - 2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - 2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
aliases:
  - software-quality
compiled_at: '2026-06-18T21:12:28.983Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5653
    output_tokens: 1340
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
  cost_usd: 0.037059
---
Engineering craft is the accumulated set of habits, heuristics, and structural instincts that shape how software is built, not just whether it runs. The sources here approach it from many angles, but a consistent thread runs through them: craft is what remains after the obvious technical requirements are met.

At the implementation level, craft shows up in small decisions compounding over time. Replacing float accumulators with integer arithmetic and precomputed reciprocal multiplication, as [Arthur Pastel documents in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs), yields a 5.9x speedup precisely because someone understood the cost model well enough to see the redundancy. Shell scripting has its own version of this: [Christian Hofstede-Kuhn's survey of Readline bindings, brace expansion, and script safety flags](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) is a catalog of accumulated practice that speeds up daily work without requiring new tools.

At the design level, craft is about cohesion and appropriate responsibility. [Kobi Hari's argument against bloated Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) and [Henrique Teixeira's correction of the single-responsibility principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) both point to the same failure mode: over-granular decomposition that mistakes fragmentation for clarity. SRP, Teixeira argues, is about cohesion under a clearly named responsibility, not about minimizing the number of things a class does.

Craft also lives in the supporting practices that make code readable across time. [Ally Piechowski's git log approach](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) treats version history as a diagnostic instrument, surfacing churn hotspots and bus factor before reading a line of source. Her [Rails audit process](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) extends this to human context, starting with stakeholder interviews to locate fear and knowledge gaps before opening any tools. [Ben Gesoff's Jujutsu workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) applies similar care to code review, using incremental squash commits to track progress through large diffs without losing orientation.

Where craft is absent, failure tends to be subtle. The GitHub merge queue bug documented by [Phil Vendola at Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is a precise case: a system that looked correct silently rewrote branches by operating from stale divergence points. YAML's Norway bug, traced by [LAB174](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem), persists in major libraries seventeen years after the spec fixed it — a reminder that implicit behavior accumulates into production risk.

The question of what craft means under AI-assisted coding runs through several sources. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that LLMs lowered the cost of producing code but not the cost of owning it, and that judgment and taste remain the scarce assets. [Christian Ekrem, drawing on Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), adds that the most valuable engineering knowledge is structurally inaccessible to AI tools because it is tacit, transmitted through apprenticeship rather than documentation. The essay on vibe coding risks [published on GitHub Pages](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) sharpens this into a concern about skill atrophy: shipping AI-generated code without review erodes the very judgment needed to catch compounding errors.

Craft is also communicative. [Anton Zaides's seven unwritten engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) are things developers learn by breaking production, not by reading documentation. [Tuhin Nair's analysis of senior developers](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) finds that expertise fails to influence organizations when engineers speak in terms of complexity management rather than uncertainty reduction. Robert Nystrom's Crafting Interpreters is itself an artifact of this communicative dimension: a complete, carefully woven book-and-implementation that models what serious craft looks like when it is made explicit.
