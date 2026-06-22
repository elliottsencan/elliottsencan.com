---
title: Engineering craft
summary: >-
  The practice of software engineering as skilled, judgment-intensive work —
  spanning low-level optimization, tool fluency, design principles, and the
  tacit expertise that separates experienced engineers from code producers.
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
  - 2026-06/2026-06-21t231758-nasa-technical-report-20070005136
compiled_at: '2026-06-18T21:45:40.563Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5653
    output_tokens: 1343
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
  cost_usd: 0.037104
last_source_added: '2026-06-22T06:17:58.247Z'
---
Engineering craft names the cluster of skills, habits, and judgment that distinguish engineers who understand their work from those who merely produce output. The sources here span a wide range of sub-domains, but a shared concern runs through them: that technical quality requires active attention, and that shortcuts — whether cultural, tooling-related, or cognitive — compound into serious failures.

At the micro level, craft shows up in knowing your tools precisely. Shell tricks like Readline bindings, brace expansion, and script safety flags are the kind of fluency that speeds daily work without requiring new infrastructure. Similarly, [git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) that expose churn hotspots and bus factor let engineers read a codebase's history as diagnostic signal before opening a single file. A [Jujutsu-based review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) applies the same care to the review process itself, using incremental squash commits to track progress through large diffs.

At the design level, craft means resisting accretion. [Angular components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) bloated with dozens of inputs are a failure of encapsulation that the Composite Components pattern corrects by distributing concerns into directives. The [Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) suffers a similar distortion in practice: misread as "do one thing," it produces over-granular splits that fragment cohesive behavior instead of protecting it. [Architecture diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) fail in analogous ways when they try to show everything at once rather than communicate one clear model.

Systems-level craft means anticipating failure modes. [Merge queue bugs](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) that silently rewrite branches from stale divergence points illustrate how subtle assumptions in CI architecture can cause catastrophic, invisible damage. [YAML's Norway bug](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) — where NO parses as false due to implicit boolean typing — is a canonical example of a specification trap that persists in production libraries years after the spec fixed it. The [unwritten laws of production engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) encode the same lesson: roll back before debugging, treat every external dependency as a future outage.

Craft also applies to communication and knowledge transfer. Senior engineers who can't articulate their instincts in business terms lose influence even when their judgment is sound — [Tuhin Nair argues](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) the fix is reframing complexity management as uncertainty reduction. [Christian Ekrem draws on Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) to argue that the most valuable engineering knowledge is structurally tacit — pattern recognition and system intuition that can only transfer through apprenticeship, not documentation.

The AI coding era sharpens these concerns rather than dissolving them. [Vibe coding risks](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) from atrophied skills and unreviewed LLM output. [Yusuf Aytas notes](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) that LLMs lowered the cost of producing code but not the cost of owning it — engineering judgment remains the scarce asset. Conversely, [Jane Street finds](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) that agentic coding has made formal verification more practical, creating new demand for machine-checkable proofs of AI-generated code. And [Arthur Pastel's 5.9x blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) — replacing float accumulators with integer arithmetic and precomputed reciprocal multiplication — is a reminder that deep craft at the algorithmic level still produces gains no LLM would think to find.

Crafting Interpreters stands as a reference artifact for what serious craft looks like at full scale: a book and two working interpreters woven together from a single source, with no gap between the explanation and the working code.
