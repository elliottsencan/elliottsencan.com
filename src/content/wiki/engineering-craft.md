---
title: Engineering craft
summary: >-
  Engineering craft spans the technical precision, design judgment, and tacit
  knowledge that separate code that merely works from systems built to last — a
  thread running through sources on module design, tooling, CSS layout, and
  professional skill.
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
compiled_at: '2026-06-20T12:42:39.089Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6511
    output_tokens: 1314
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
  cost_usd: 0.039243
---
Engineering craft is the accumulated judgment that guides decisions beneath the level of explicit rules: when to split a module, how to read a codebase quickly, which abstractions reduce complexity over time rather than just today. It shows up in small choices and large ones alike.

At the structural level, several sources converge on the value of hiding complexity behind clean interfaces. The deep-module argument in [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) holds that small interfaces over large implementations reduce cognitive load for both human readers and LLMs. This mirrors the case in [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) for replacing bloated input APIs with composable directives, and in [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), which argues that SRP is about cohesive responsibility, not decomposing things into arbitrarily small units.

Craft also means choosing the right tool for the actual problem. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that intrinsic layouts and container queries serve component-first UIs better than viewport breakpoints. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) works through the math and accessibility tradeoffs of fluid type rather than treating clamp() as a magic fix. [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) argues for multiple linked HTML pages over JS-powered in-page state when the simpler path produces equivalent results. Each of these is a judgment call, not a rule.

Precision matters at the implementation level too. [5× Faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) traces a 5.9× speedup through integer arithmetic and reciprocal multiplication, demonstrating that understanding what the machine actually does still produces results that abstraction alone cannot. [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) and the Jujutsu review workflow in [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) reflect the same orientation: invest in understanding your tools deeply enough that they extend your reach rather than constrain it.

Knowing a codebase is its own craft. [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and [How I Audit a Legacy Rails Codebase in the First Week](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) both treat codebase comprehension as a discipline with method, starting from signals like churn and stakeholder fear rather than from the code itself.

The tacit dimension of craft is harder to transfer. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that the most valuable engineering knowledge, pattern recognition and design intuition, cannot be fully articulated and survives primarily through apprenticeship. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identifies a related gap: senior engineers frame problems as complexity management while the rest of an organization frames them as uncertainty reduction, and bridging that gap is itself a craft skill.

Quality remains the right target even as AI lowers the cost of generating code. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that ownership costs persist regardless of generation costs, and that LLMs can produce polished technical debt faster than any individual. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) frames uncritical AI code acceptance as skill atrophy. [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes the same point from a different angle: interview performance tests a narrow, trainable skill that weakly predicts the ability to read tradeoffs and ship incrementally in messy production systems.
