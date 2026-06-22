---
title: Engineering craft
summary: >-
  Engineering craft is the discipline of building software with deliberate
  judgment — in code structure, tooling fluency, system design, and
  communication — as distinct from the narrower skills that hiring or automation
  pipelines tend to reward.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
  - >-
    2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - >-
    2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-02t094735-approaching-zero-bugs
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - 2026-05/2026-05-05t091632-building-websites-with-llms
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
  - 2026-05/2026-05-30t210309-90percent-of-the-t-distribution
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - >-
    2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with
  - 2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams
  - 2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - 2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
compiled_at: '2026-06-22T02:34:07.216Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6511
    output_tokens: 1149
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
  cost_usd: 0.036768
---
Engineering craft covers the gap between producing working code and building software that is maintainable, comprehensible, and honest about its own risks. It shows up at every layer: how modules are shaped, how the shell is used, how diagrams are drawn, and how expertise is transferred.

At the structural level, craft means making decisions that serve long-term legibility. ["AI Likes Deep Modules"](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce cognitive load for both humans and LLMs, while the opposite — shallow modules with wide, leaky surfaces — compounds complexity across every future change. The Single Responsibility Principle points in the same direction, though [its common reading is distorted](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle): over-granularizing classes fragments cohesion rather than preserving it. The principle is about grouping behavior under a single accountable concern, not about minimizing lines per file. [Angular component composition](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the same point in practice: components bloated with dozens of inputs should be refactored into directives and sub-components so each concern stays encapsulated.

Craft also lives in the specifics of implementation. [Optimizing image-rs fast_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates it concretely: replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication produced a 5.9x speedup, not by guessing but by understanding the cost model. [Shell fluency](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) is a quieter example — Readline bindings, history search, process substitution, and script safety flags are individually small but collectively define how much friction accumulates in daily work.

Several sources push back against proxies that substitute for craft. [Algorithm interview performance](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) is a trainable signal that weakly correlates with production capability; real engineering requires reading tradeoffs and shipping incrementally against messy, unbounded inputs. [Vibe coding](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) — shipping AI-generated code without review — is described as causing skill atrophy and as categorically incompatible with safety-critical systems. [AI lowering the cost of writing code](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) does not lower the cost of owning it; LLMs can generate polished technical debt faster than any individual engineer, which raises rather than lowers the demand for taste and judgment.

Transmitting craft is its own problem. [The tacit dimension of engineering expertise](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to documentation or AI tools and can only move through apprenticeship. [Senior developers' communication failures](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) often trace to speaking in complexity-management terms while the rest of the business thinks in uncertainty-reduction terms; bridging that gap is itself a craft skill.

Craft also governs how engineers orient themselves in unfamiliar systems. [Git log commands run before reading any code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) surface churn hotspots, bus factor, and bug clusters before a single source file is opened. [Auditing a legacy Rails codebase](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) starts with stakeholder interviews to locate fear and knowledge gaps, then reads the Gemfile and schema before running any automated tools. Both approaches reflect the same underlying discipline: deferring judgment until the right signals have been gathered.
