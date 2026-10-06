---
title: Engineering craft
summary: >-
  The deliberate, judgment-driven practices that separate durable software from
  code that merely ships — spanning design intuition, system modularity, tooling
  discipline, and the tacit knowledge that formal processes cannot fully encode.
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
  - 2026-07/2026-07-09t070315-the-submarine
  - >-
    2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs
  - >-
    2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you
  - >-
    2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters
  - 2026-07/2026-07-16t043206-i-stopped-destructuring-everything
  - >-
    2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent
  - 2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time
  - 2026-08/2026-08-03t025839-dont-be-a-meat-proxy
  - >-
    2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms
  - >-
    2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude
  - 2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic
compiled_at: '2026-10-05T23:52:13.143Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10087
    output_tokens: 1807
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
  cost_usd: 0.057366
---
Engineering craft is the sum of choices made below the threshold of explicit process: which abstraction to reach for, when to stop optimizing, how to structure a codebase so that future readers can reason about it without a guide. The sources collected here orbit that theme from many angles, but they share a common premise — that producing working software is not the same as producing good software, and that the gap between the two is filled by judgment accumulated over time.

One consistent thread is the cost of careless abstraction. [The Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) is widely understood as "do one thing," but the actual principle concerns cohesive grouping under a single accountable responsibility; over-granularizing classes trades one kind of complexity for another. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes the same structural argument: small interfaces hiding large implementations reduce cognitive load for humans and LLMs alike, while shallow modules push complexity outward onto callers. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies this to component design — a component bloated with dozens of inputs is a shallow module in disguise, and the fix is moving concerns into directives and sub-components so each API surface stays narrow.

The same logic extends to how code is organized at scale. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues that grouping frontend code by domain vertical rather than by technical layer (components, hooks, utils) produces stronger cohesion and better discoverability, because the unit of understanding matches the unit of change. Architectural communication compounds the problem when diagrams fail: [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) documents how overloaded master diagrams and unlabeled resources make systems harder to reason about even for people who built them.

Craft also means knowing what not to do. [I Stopped Destructuring Everything](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) illustrates how a reflex borrowed from style guides can work against readability — the original object reference often carries context that scattered variable names lose. [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) frames over-engineering as a signal of low-value work by analogy with inflated manufacturing costs. [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) adds that even technically correct improvements — order-of-magnitude speedups — fail to move outcomes when attention thresholds, discrete capacity increments, or pipeline backpressure absorb them entirely. Contrast that with [5× Faster fast\_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs), where replacing float arithmetic with integer accumulators and reciprocal multiplication produced a 5.9× speedup in a genuinely constrained path — a demonstration that rigorous optimization has its place once you have correctly identified the constraint.

Tacit knowledge is the hardest part of craft to transmit. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that pattern recognition, design intuition, and unwritten convention are structurally inaccessible to AI tools and can only be transferred through apprenticeship. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identifies a related gap: experienced engineers frame everything as complexity management while the rest of the organization thinks in terms of uncertainty reduction, so expertise fails to land even when it is present.

The AI coding wave sharpens these questions. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues it does — LLMs lower the cost of generating code, not the cost of owning it, and they can produce polished technical debt faster than any individual engineer. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) calls vibe coding — shipping AI output without review — categorically incompatible with safety-critical systems. [Use Your Brain](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) and [The "I Don't Know, Claude Wrote This" Pandemic](/reading/2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic) both argue that surrendering cognitive ownership of code is not a productivity strategy — it is a form of professional abdication. [Don't Be a Meat Proxy](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) makes the point more sharply: relaying raw AI output without reading or synthesizing it shifts cognitive work onto the recipient and destroys the value you were supposed to add.

Tooling discipline is part of craft too. [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) covers the shell shortcuts and script safety flags that reduce friction across daily work. [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and [How I Audit a Legacy Rails Codebase in the First Week](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) demonstrate that experienced engineers read history and stakeholder fear before they read source — a discipline that surfaces real risk faster than any static analysis run. [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows how a thoughtful tool workflow can persist review progress in version control and reduce the cognitive overhead of understanding large diffs.

[Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) cuts across all of this: the skills tested in hiring correlate weakly with production performance, and real engineering is reading tradeoffs, shipping incrementally, and building systems that handle messy real-world inputs. Craft is what fills the space between passing a filter and actually doing the work.
