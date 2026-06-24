---
title: Engineering craft
summary: >-
  Engineering craft is the accumulated judgment, discipline, and taste that
  separates functioning code from well-owned systems — covering everything from
  API design and shell fluency to knowing when not to build.
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
compiled_at: '2026-06-24T04:36:17.930Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7533
    output_tokens: 1381
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
  cost_usd: 0.043314
---
Engineering craft is harder to define than any individual skill it contains, but the sources here point consistently at one core distinction: the gap between code that works and code worth owning. That gap is filled by judgment, discipline, and the kind of knowledge that resists being written down.

On the technical side, craft shows up in deliberate structural choices. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce cognitive load for both human maintainers and LLMs — the opposite of the shallow, over-granularized modules that proliferate when developers split things without coherent rationale. That same impulse to carve at the joints, not arbitrarily, runs through [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle), which corrects the common misreading of SRP: the principle asks for cohesive grouping under a single accountable responsibility, not for splitting every behavior into its own class. Over-granularization violates the cognitive simplicity SRP was meant to provide.

Craft also lives in how you use your tools. Shell Tricks That Actually Make Life Easier demonstrates that fluency with Readline bindings, brace expansion, and script safety flags is not trivia — it compounds into meaningful reductions in friction and error rate. [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) offers a similar argument at the code-review level: the right workflow turns an overwhelming diff into a series of manageable, version-controlled steps. And [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) extends this to codebase triage — reading churn, bus factor, and bug clusters from git history before touching a single file.

Performance work is its own form of craft, and [5× faster fast\_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) is a clean example: replacing float arithmetic with integer accumulators and expensive division with reciprocal multiplication achieves a 5.9× speedup by understanding the problem from first principles rather than guessing at bottlenecks.

The craft of communication is equally real. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identifies a structural mismatch: engineers think in complexity management while business stakeholders think in uncertainty reduction. Craft includes knowing which framing to use. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) addresses the same gap at the diagramming level — unlabeled resources, overloaded master diagrams, and over-reliance on AI generation all signal diagrams made for the creator rather than the reader.

Several sources address what degrades craft. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that shipping AI-generated code without review causes skill atrophy and is incompatible with safety-critical systems. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) agrees from a different angle: AI lowers the cost of producing code, not the cost of owning it, so taste and judgment matter more now than before. [Code Smells when you get AI to write your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) catalogs the concrete failure modes — over-mocking, happy-path-only coverage, tests written to match a buggy implementation rather than intended behavior.

At the level of production systems, [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills hard-won rules from real incidents: roll back before debugging, treat every external dependency as a future outage. [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes the related point that interview performance tests a narrow, trainable skill with weak correlation to production value — real engineering means reading tradeoffs and shipping incrementally against messy, unbounded inputs.

Finally, [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) pulls back to the epistemological question: the most valuable engineering knowledge — pattern recognition, design intuition, unwritten conventions — is structurally resistant to documentation or AI transfer. It is transmitted through apprenticeship, which is another way of saying that craft is never fully separable from practice.
