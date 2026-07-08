---
title: Engineering craft
summary: >-
  Engineering craft is the set of judgment, discipline, and tacit skill that
  separates code that merely runs from code worth owning — spanning design
  intuition, tooling fluency, communication, and knowing when to stop adding.
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
  - 2026-06/2026-06-21t231758-nasa-technical-report-20070005136
  - 2026-06/2026-06-22t000701-the-idiot-index-for-code
  - 2026-06/2026-06-22t001042-how-to-leave
  - 2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good
  - 2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
  - 2026-06/2026-06-30t173037-a-return-to-two-pizza-culture
  - 2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter
  - 2026-07/2026-07-03t044356-project-gutenberg-document-33283
  - 2026-07/2026-07-04t141323-the-vertical-codebase
  - 2026-07/2026-07-07t170607-the-software-engineering-war
compiled_at: '2026-07-08T00:14:10.177Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8281
    output_tokens: 1341
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
  cost_usd: 0.044958
---
Engineering craft is not a single technique but a disposition that runs across every layer of software work: how a function is shaped, how a system is explained, how a codebase is navigated when it first arrives on your desk, and how a team decides what not to build.

At the code level, craft shows up in decisions that are hard to articulate but immediately visible in their effects. The argument for deep modules — small interfaces hiding large implementations — is one concrete expression: [a well-designed module](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) reduces the cognitive surface area that any reader or automated tool has to hold in mind. The Single Responsibility Principle is another touchstone, though it is routinely distorted: [Henrique Teixeira argues](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) that SRP is about cohesive accountability, not about atomizing every behavior into its own class, and that over-granularizing produces exactly the complexity SRP was meant to prevent. Both observations converge on the same underlying skill: knowing where to draw a boundary.

Performance work is a similar exercise in judgment. A [step-by-step optimization of Rust's image-rs blur function](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) replaced float arithmetic with integer accumulators and expensive division with reciprocal multiplication to achieve a 5.9x speedup — a result that required understanding the hardware before reaching for a profiler. But craft also means knowing when speed gains are beside the point: [three structural constraints](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) — attention thresholds, discrete capacity increments, and pipeline backpressure — explain why order-of-magnitude improvements often change nothing in practice.

Tooling fluency is a quieter form of craft. Shell shortcuts, history search, and script safety flags are the kind of accumulated small knowledge that separates a fast, confident terminal user from one who is perpetually one typo away from a bad day. Reviewing large pull requests with Jujutsu — [duplicating a change, inserting an empty parent, then squashing files as you read them](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) — is another: a workflow that turns an overwhelming diff into something manageable without losing state.

Navigating an unfamiliar codebase is its own craft. [Git log commands that surface churn hotspots, bus factor, and firefighting frequency](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) give a new engineer a risk map before opening a single file. A [week-one Rails audit](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) starts with stakeholder interviews to surface fear and knowledge gaps before running any tool, because the social context of a codebase often matters more than its metrics.

Craft extends to communication and judgment about complexity. [Senior developers who speak in terms of complexity management](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) fail to connect with stakeholders who think in terms of uncertainty reduction — bridging that gap is part of the job. The most valuable engineering knowledge is also, in large part, tacit: [pattern recognition and design intuition](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), drawing on Polanyi's philosophy, are structurally difficult to transfer through documentation and resistant to AI replication.

The current moment puts craft under pressure from two sides. AI tools lower the cost of producing code without lowering the cost of owning it, so [taste and judgment about what to build remain scarce](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). At the same time, [shipping AI-generated code without review](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) causes skill atrophy and is incompatible with safety-critical systems. Algorithm interviews, meanwhile, [test a narrow trainable skill](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) that weakly predicts the actual work of reading tradeoffs and shipping incrementally — a mismatch that [hiring processes systematically fail to correct](/reading/2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring).

Craft, in the end, is what remains when the scaffolding is stripped away: the ability to make a good decision with incomplete information, explain it to someone who wasn't in the room, and leave the system easier to understand than you found it.
