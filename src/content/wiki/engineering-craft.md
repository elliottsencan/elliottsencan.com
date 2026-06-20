---
title: Engineering craft
summary: >-
  Engineering craft is the discipline of making deliberate, informed decisions
  in software work — across code structure, tooling, communication, and process
  — as distinct from simply producing output.
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
compiled_at: '2026-06-20T22:07:36.998Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6511
    output_tokens: 1269
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
  cost_usd: 0.038568
---
Engineering craft, as a concept, keeps surfacing across discussions that seem unrelated on first glance: CSS layout math, shell scripting habits, interpreter design, Angular component structure, production incident heuristics. What connects them is a shared insistence on deliberateness — understanding why a technique works before using it, recognizing when a shortcut causes long-term harm, and caring about the quality of the decisions behind the output, not just the output itself.

At the implementation level, craft shows up in choosing the right abstraction. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes the case that small interfaces hiding large implementations reduce complexity for both humans and LLMs. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues the same point from a different angle: over-granularizing classes in the name of SRP actually violates the cognitive simplicity the principle is meant to produce. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) shows what this looks like concretely — components bloated with dozens of inputs should be decomposed into composable directives and sub-components so each concern stays bounded and APIs stay legible.

Craft also means understanding your tools precisely enough to use them correctly. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) and [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) are detailed in the math and accessibility implications of `clamp()` and container queries — not because the math is hard, but because using these features without understanding them produces layouts that fail in non-obvious ways. The same precision-under-the-hood ethic runs through [5x Faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs), which walks through replacing float arithmetic with integer accumulators to get a 5.9x speedup — small decisions with measurable consequences.

Knowing when not to reach for a tool matters as much as knowing how to use one. [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) argues that production engineering is about reading tradeoffs and shipping incrementally against messy real-world inputs — a very different skill from what coding interviews select for. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) extends this: shipping AI-generated code without review causes skill atrophy and is categorically unsafe in critical systems. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) puts the cost structure clearly — LLMs lower the cost of producing code, not the cost of owning it, and they can generate polished technical debt faster than any individual engineer.

Craft also lives in the parts of expertise that are hardest to articulate. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that pattern recognition, design intuition, and unwritten conventions are structurally inaccessible to AI and can only be transmitted through apprenticeship. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identifies a related gap: senior engineers think in complexity management while businesses think in uncertainty reduction, and bridging that translation gap is itself a craft skill.

Finally, craft shows up in how engineers navigate unfamiliar codebases and production incidents. [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and [How I Audit a Legacy Rails Codebase in the First Week](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) treat codebase investigation as a discipline with its own methods. [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) collects hard-won heuristics — roll back before debugging, treat every external dependency as a future outage — that are only legible to someone who has already felt the cost of ignoring them.
