---
title: Engineering craft
summary: >-
  The accumulated judgment, tacit knowledge, and deliberate decisions that
  separate functional code from maintainable systems — covering design
  principles, tooling fluency, and the human transmission of expertise.
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
compiled_at: '2026-06-23T01:58:28.246Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7533
    output_tokens: 1491
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
  cost_usd: 0.044964
---
Engineering craft is the gap between code that works and code that holds up. Multiple sources here circle the same problem from different angles: that production engineering is less about algorithmic cleverness and more about tradeoffs, judgment, and systems that survive contact with reality.

Fagner Brack puts this plainly in [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work): interview performance optimizes for a trainable, narrow skill, while real engineering requires reading tradeoffs and shipping incrementally against messy, unbounded inputs. Vladimir Klepov's [The systemic decay of tech hiring](/reading/2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring) extends this diagnosis — error asymmetry drives ever-harder tests, and candidates overfit to process rather than developing the judgment the process was meant to select for.

What that judgment looks like in practice shows up across many of these pieces. Kobi Hari's [Better way to build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs should be refactored using composition so each concern stays encapsulated. Go Monk's [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) frames this more generally: small interfaces hiding large implementations reduce complexity for both humans and LLMs. Henrique Teixeira's [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds that over-granularizing classes violates the cognitive simplicity SRP is meant to provide — the principle is about cohesive grouping under a single accountable responsibility, not atomization.

The craft extends to knowing what you own and what will hurt you. Anton Zaides distills this in [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering): roll back before debugging, treat every external dependency as a future outage. Ally Piechowski's [Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and [How I Audit a Legacy Rails Codebase](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) operationalize this as concrete diagnostic workflows — churn analysis, bus-factor reads, stakeholder interviews — before touching any implementation.

Tooling fluency is part of craft too. Christian Hofstede-Kuhn's [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) covers Readline key bindings, history search, and script safety flags as the kind of low-level fluency that compounds over a career. Arthur Pastel's [5x faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates a different facet: replacing float arithmetic with integer accumulators and reciprocal multiplication to achieve a 5.9x speedup — the kind of optimization that requires understanding the full stack, not just the API.

Several sources address the tacit dimension of expertise directly. Cekrem's [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Michael Polanyi to argue that the most valuable engineering knowledge — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI and transmissible only through apprenticeship. Tuhin Nair's [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) locates the failure differently: senior engineers frame their work as complexity management while the rest of the business thinks in terms of uncertainty reduction, and bridging that translation gap is itself a craft skill.

AI's effect on craft is contested. Yusuf Aytas's [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues it does: LLMs lower the cost of producing code, not the cost of owning it, and can generate polished technical debt faster than any individual engineer. Abednego Gomes's [Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) puts this harder: shipping AI-generated code without review causes skill atrophy and is incompatible with safety-critical systems. Daniel Stenberg's curl data in [Approaching zero bugs?](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds an empirical note — despite powerful AI-assisted static analysis, there is no measurable sign that open-source projects are approaching zero latent bugs.

Robert Nystrom's [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) sits at the center of all of this: a full book implemented twice, in Java and C, where the build system weaves code and prose together. It is a demonstration that deep understanding of a system — enough to explain every line — is itself a form of craft that no shortcut replaces.
