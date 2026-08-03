---
title: Engineering craft
summary: >-
  Engineering craft is the set of judgment, discipline, and taste that separates
  code that merely works from code that is maintainable, comprehensible, and fit
  for its real purpose.
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
compiled_at: '2026-08-03T10:06:29.401Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9567
    output_tokens: 1781
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
  cost_usd: 0.055416
---
Engineering craft is not a single technique but a disposition toward the work: the accumulated judgment about what to simplify, what to verify, when to ship, and when to push back. The sources gathered here approach it from many angles, but a common thread runs through all of them — that producing working software is the easy part, and that the hard part is everything surrounding that production.

At the structural level, craft shows up in how code is organized. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce complexity for humans and LLMs alike; the design principle is not a new one, but the observation that LLMs find shallow, chatty APIs harder to reason about is a contemporary restatement of a durable truth. The same impulse drives [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to), which argues that components bloated with dozens of inputs should be decomposed into directives and sub-components so that each concern stays encapsulated. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) clarifies that SRP was never about doing "only one thing" but about cohesive grouping under a single accountable responsibility — over-granularizing classes violates the cognitive simplicity the principle was designed to provide.

Craft also shows up in knowing what you are building toward. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues that organizing by domain rather than technical layer (components/hooks/utils) improves cohesion and discoverability, which is another way of saying that the structure of a codebase should reflect how the people who maintain it actually think about the problem. [The Idiot Index for Code](/reading/2026-06/2026-06-22t001042-how-to-leave) — actually [here](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) — applies the idea that bloated, over-engineered code signals low-value work just as inflated manufacturing costs do.

Precision matters at every layer of the stack. [5x Faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) walks through replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication to achieve a 5.9x speedup, illustrating that craft at the algorithmic level requires knowing not just what the code does but why certain operations are expensive. [It's Always TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the complementary point that Nagle's algorithm is obsolete on modern datacenter hardware and that failing to set TCP_NODELAY silently kills latency — a case where the default assumption embedded in infrastructure no longer matches reality. [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) corrects the opposite error: attention thresholds, discrete capacity increments, and pipeline backpressure can all make an order-of-magnitude speedup irrelevant in practice. Knowing which situation you are in is itself a craft skill.

Tool fluency is a component of craft, not a substitute for it. [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) documents Readline bindings, history search, brace expansion, and script safety flags that reduce friction without requiring deeper architectural judgment. [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows a workflow for reviewing large pull requests by duplicating the change, inserting an empty parent commit, and squashing files into it incrementally — a small technique that preserves progress in version control and reduces cognitive overhead. [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) turns git log into a diagnostic instrument, finding churn hotspots, bus factor risks, and bug clusters before touching a single file.

Craft is inseparable from judgment about what not to build. [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) argues that algorithm interviews test a narrow trainable skill that weakly correlates with the actual work, which involves reading tradeoffs and shipping incrementally against messy, unbounded real-world inputs. [I Stopped Destructuring Everything](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) makes a smaller but structurally identical point: reflexive style conventions optimize for writing code rather than reading it, and judgment means knowing when a rule serves comprehension and when it doesn't.

The AI-assisted coding moment has made craft more visible, not less necessary. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that LLMs can generate polished, well-formatted technical debt faster than any individual engineer, making taste and bounded prompting more important than ever. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that shipping AI-generated code without review causes skill atrophy and is incompatible with safety-critical systems. [Don't Be a Meat Proxy](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) frames the same failure mode in terms of cognitive responsibility: relaying raw AI output without reading or synthesizing it shifts the work onto the recipient. The value you add is understanding, not transmission.

Finally, craft is partly tacit. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Michael Polanyi to argue that the most valuable engineering expertise — pattern recognition, unwritten conventions, design intuition — cannot be fully articulated and can only be transmitted through apprenticeship. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) makes the related point that senior engineers and the rest of the business are often talking past each other because complexity management and uncertainty reduction are not the same concern. Craft without communication is incomplete; the discipline includes making the judgment legible to others.
