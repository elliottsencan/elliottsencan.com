---
title: Engineering craft
summary: >-
  The habits, judgment, and tacit knowledge that separate working software from
  good software: reading tradeoffs, writing for maintainability, and knowing
  when simplicity beats sophistication.
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
compiled_at: '2026-07-01T00:37:22.083Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7703
    output_tokens: 1544
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
  cost_usd: 0.046269
---
Engineering craft is the gap between code that works and code that holds up. It shows up in dozens of small decisions: how a module is bounded, whether a shell script has safety flags, how a diagram labels its connections, whether a test actually verifies behavior. The sources here illuminate that gap from many angles, but they converge on a few durable ideas.

The first is that expertise is largely tacit. [cekrem's reading of Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) makes the structural argument: the pattern recognition and design intuition that define senior engineers cannot be extracted into documentation or prompts — they are transmitted through apprenticeship and practice. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) adds a social layer: senior engineers frame their work around complexity management, while the rest of the organization thinks in terms of uncertainty reduction. The mismatch is not a communication failure — it is a knowledge-structure mismatch that takes deliberate bridging to close.

The second idea is that simplicity is a design decision, not a default. [Go Monk's case for deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce cognitive overhead for both humans and LLMs. [Henrique Teixeira on SRP](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) argues the reverse failure mode: over-granularizing classes in the name of single responsibility produces the very cognitive sprawl SRP is meant to prevent. [Kobi Hari on Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) shows what this looks like in practice: inputs accumulate until a component's API becomes its own abstraction problem, solvable through composition rather than parameter explosion.

The third idea is that knowing the tools deeply matters. Christian Hofstede-Kuhn's shell tricks guide treats Readline bindings and script safety flags not as trivia but as the difference between a script that fails silently and one that fails loudly. [Arthur Pastel's image-rs optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates how close reading of a bottleneck — replacing float arithmetic with integer accumulators, division with reciprocal multiplication — produces a 5.9x speedup without algorithmic change. [Robert Nystrom's Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) represents craft at the book level: weaving complete, working interpreter implementations into prose so the reader builds understanding by building software.

The fourth idea is that judgment operates under uncertainty, and overconfidence is its own failure mode. [Daniel Stenberg's curl bug analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) shows that even with AI-assisted static analysis, latent bug counts in mature open-source projects show no measurable decline — vulnerability age and fix rates don't support optimism. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) frames the AI-era version of this: AI lowers code production cost but not ownership cost, and the taste required to avoid generating technical debt faster than it can be repaid is a craft skill, not a tooling feature. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) sharpens that into a safety argument: shipping AI-generated code without review causes skill atrophy and is incompatible with safety-critical systems.

Good engineering practice also means reading a codebase before changing it. [Ally Piechowski's git log approach](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) uses churn, bus factor, and bug-cluster analysis to map risk before reading a single file. [Piechowski's Rails audit guide](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) extends that to stakeholder interviews and schema reading before reaching for automated tools. [Ben Gesoff's Jujutsu review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) solves a related problem: reviewing large changesets without losing your place, persisting progress in version control rather than in memory.

[Anton Zaides's production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) treat craft as a set of hard-won defaults: roll back before debugging, treat every external dependency as a future outage. [The idiot index for code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) reframes over-engineering as a signal, applying Musk's manufacturing ratio to software: bloated code is a low-value-to-effort ratio made legible. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes a parallel point about hiring signals: algorithm interviews test a narrow, trainable skill that weakly predicts the real work of reading tradeoffs and shipping incrementally under ambiguous conditions.

Craft is not a checklist. It is the accumulated judgment about which rules apply when, how to read a situation before acting on it, and how to leave a system in better shape than you found it.
