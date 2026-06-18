---
title: Engineering craft
summary: >-
  Engineering craft spans the practical judgment, design instincts, and
  disciplined habits that separate functional code from code worth owning —
  touching everything from CSS layout decisions to module boundaries to how
  teams transmit expertise.
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
compiled_at: '2026-06-18T22:57:11.116Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6681
    output_tokens: 1200
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
  cost_usd: 0.038043
---
Engineering craft is the accumulated layer of judgment that sits between working software and good software. It shows up in small decisions — whether to reach for a breakpoint or a container query, whether to divide a class by line count or by coherent responsibility — and in larger habits around reading codebases, reviewing changes, and communicating what you know.

At the implementation level, craft often means choosing the primitive that matches the problem. [Building a UI without breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that modern CSS — intrinsic layout, `clamp()`, container queries — makes viewport breakpoints a blunt tool for component-level concerns. [Modern fluid typography using CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) extends this to type: the math exists to express a fluid scale precisely, but the right choice between fluid and stepped typography still requires judgment about context and accessibility. [Signals, the push-pull based algorithm](/reading/2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm) shows the same instinct at the framework level: understanding the internal mechanism of a tool — invalidation, lazy re-evaluation — is what separates use from mastery.

Design principles matter too, but only when understood correctly. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues that SRP is not a mandate for miniaturization; it means grouping behaviors under a single accountable reason to change. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes a compatible point: small interfaces hiding large implementations reduce cognitive load for humans and LLMs alike. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies this concretely — component APIs bloated with dozens of inputs should be decomposed into directives and sub-components so each concern stays encapsulated.

Craft also lives in how engineers read and navigate existing code before touching it. [The git commands I run before reading any code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) offers churn analysis and bus-factor checks as diagnostic tools. [How I audit a legacy Rails codebase in the first week](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) frames the first week as stakeholder interviews and schema reading before running any automated tools. [Reviewing large changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) treats code review itself as a workflow problem with a concrete solution: persist review progress in version control rather than in a mental stack.

The harder-to-teach dimension of craft is what resists documentation. [The tacit dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that pattern recognition and design intuition are structurally inaccessible to AI tools and can only be transmitted through apprenticeship. [Why senior developers fail to communicate their expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames the communication problem differently: senior engineers speak in terms of complexity management while stakeholders think in uncertainty reduction, and bridging that gap is itself a craft skill.

AI tools complicate the picture. [When code is cheap, does quality still matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues yes: LLMs lower the cost of producing code but not the cost of owning it. [The perils of AI to the software engineering profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) goes further, calling unreviewed AI-generated code reckless and warning of skill atrophy. [Learn algorithms for interviews, forget them for work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes a parallel point about hiring: the skills screened in interviews correlate weakly with the judgment required in production. Craft, in all these accounts, is precisely what is hardest to proxy.
