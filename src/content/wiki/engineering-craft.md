---
title: Engineering craft
summary: >-
  The habits, judgment, and tacit knowledge that separate working software from
  good software: clarity in design, discipline in production, and honesty about
  what tools can and cannot replace.
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
compiled_at: '2026-06-24T06:31:21.183Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7533
    output_tokens: 1358
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
  cost_usd: 0.042969
---
Engineering craft is the accumulated set of judgments, disciplines, and intuitions that determine whether software is merely functional or genuinely well-made. The sources collected here approach it from many angles, but they share a common thread: craft is what gets lost when process, tooling, or shortcuts substitute for understanding.

At the code level, craft means choosing designs that minimize complexity rather than just satisfying the immediate requirement. The case for deep modules [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) applies Parnas's information-hiding principle directly: small interfaces over large implementations reduce the surface area that both humans and LLMs must hold in mind. The Single Responsibility Principle [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) gets at the same idea from a different angle, arguing that SRP is about cohesion under a single accountable concern, not atomization into microscopic classes. Angular component design [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) demonstrates the cost of ignoring this: inputs-bloated components become brittle APIs, repaired by moving concerns into directives and sub-components.

At the implementation level, craft shows up in attention to what the machine is actually doing. The step-by-step optimization of Rust's blur function [5x faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) illustrates how replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication yields a 5.9x speedup without changing the algorithm's shape. Shell muscle memory [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) is a humbler example: Readline bindings, brace expansion, and script safety flags are the kind of craft that accumulates invisibly and compounds over years.

Craft also lives in the judgment to know when not to build. Paul Buchheit's observation [If Your Product Is Great, It Doesn't Need to Be Good](/reading/2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good) that great products nail two or three attributes and deliberately neglect the rest is not an excuse for sloppiness; it is a discipline of prioritization. The idiot index applied to code [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) extends this: bloated, over-engineered implementations signal low-value work, the same way inflated manufacturing costs signal waste.

The hardest part of craft is that much of it is tacit. The argument from Polanyi [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) is that the most valuable engineering knowledge, pattern recognition, design intuition, and unwritten conventions, is structurally difficult to articulate and can only be transmitted through apprenticeship. Senior developers who can't communicate their expertise [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) are often not failing at craft itself but at translating complexity-management into the uncertainty-reduction language the rest of the organization uses.

AI tools complicate the picture without resolving it. Vibe coding [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) is craft's opposite: shipping AI-generated code without review causes skill atrophy and is incompatible with safety-critical work. Even outside critical systems, LLMs generate well-formatted technical debt faster than any individual engineer [When Code Is Cheap, Does Quality Still Matter](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter), which makes taste and bounded prompting more important, not less. Formal methods [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) represent one response: agentic coding lowers the cost of writing proofs, making verification newly tractable as a complement to testing.

Craft is also visible in production discipline. The unwritten engineering rules distilled from real incidents [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering), such as rolling back before debugging and treating every external dependency as a future outage, are not formalized anywhere but separate teams that ship reliably from those that don't. The git-archaeology approach to auditing unfamiliar codebases [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) applies the same discipline to inherited work: read history before reading code.
