---
title: Open source
summary: >-
  Open source spans infrastructure tools, LLM runtimes, security risks, and
  platform trust — a mode of software development that enables transparency and
  community contribution but introduces distinct governance and security
  pressures.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - 2026-05/2026-05-02t094735-approaching-zero-bugs
  - 2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui
  - 2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t071908-oobaboogatextgen
  - 2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt
  - 2026-05/2026-05-10t205349-github-is-sinking
  - 2026-05/2026-05-10t213609-raiyanyahyahow-to-train-your-gpt
  - >-
    2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about
  - >-
    2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio
  - 2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs
  - 2026-05/2026-05-14t222554-piyush-mishra-00helply
  - >-
    2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a
  - 2026-05/2026-05-31t164554-jj-vcsjj
  - >-
    2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store
  - 2026-06/2026-06-17t075738-gunnargray-devunicode-animations
  - 2026-06/2026-06-17t075816-matt-palmer
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
  - 2026-07/2026-07-02t052125-jangles-bytepythia
  - 2026-07/2026-07-03t044356-project-gutenberg-document-33283
  - 2026-07/2026-07-09t070315-the-submarine
  - >-
    2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you
  - 2026-07/2026-07-20t215754-stop-using-opencode
  - 2026-08/2026-08-10t220951-gvzdvclaudish-to-english
  - >-
    2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude
compiled_at: '2026-09-21T21:55:16.400Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10904
    output_tokens: 1431
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
  cost_usd: 0.054177
---
Open source is not a single practice so much as a shared contract: source code is published, forks are permitted, and improvements can flow back. The sources here touch nearly every layer of that contract, from licensing and hosting to runtime performance and supply-chain integrity.

The infrastructure end is well represented. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) ships as a single binary under Apache 2.0, explicitly positioning its open-source status as a differentiator against tools that require cloud accounts or proprietary registries. [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible version control system that publishes its conflict-handling and auto-commit model in the open, inviting scrutiny of behaviors that centralized tools keep opaque. Several JavaScript libraries reviewed in [a practical tour of seven JS/TS packages](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) — including Zod, Biome, and Knip — are open source projects maintained in public repositories, and [Zod's memory optimization work](/reading/2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude) shows the kind of deep internals work that becomes possible when contributors can read and modify the full codebase. The [image-rs blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) is another example: a contributor profiled and rewrote a hot path in a public Rust library, achieving a 5.9x speedup that benefits every downstream user.

The LLM tooling ecosystem is heavily open source by default. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) publishes custom CUDA kernels for faster fine-tuning. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) is a fully offline desktop LLM runtime. [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) is an open-source agent memory system. [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) is an annotated open textbook for building LLMs from scratch. [OpenAI's PII-detection model](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter) is itself open source, enabling Hugging Face authors to build on top of it without API keys or usage fees. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) surfaces compatibility data for open-weight models specifically. [Pythia](/reading/2026-07/2026-07-02t052125-jangles-bytepythia) runs swarm-intelligence forecasting entirely locally using Ollama.

But open source is not uniformly safe or well-governed. [A supply-chain attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) involving 151 malicious npm and GitHub packages demonstrated that public repositories are a vector as much as a resource: invisible Unicode variation-selector characters encoded payloads that reviewers and static analysis tools missed entirely. [The critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) shows governance problems from another angle: the project obscured its llama.cpp dependency, shipped inferior performance, introduced misleading model naming, and then launched a closed-source GUI, which the author reads as a VC-driven drift away from the local-first values that made the project popular. [The critique of OpenCode](/reading/2026-07/2026-07-20t215754-stop-using-opencode) is sharper still, arguing that being open source does not make a tool safe — OpenCode's default posture connects remote LLMs to a local shell with minimal configuration, and its codebase contains prompt-cache-busting design choices and broken TUI interactions.

Platform trust is its own dimension. [David Bushell's argument](/reading/2026-05/2026-05-10t205349-github-is-sinking) that GitHub has declined under Microsoft, and [Mat Duggan's wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) for a reimagined forge with pre-commit CI, stacked PRs as first-class citizens, and a self-hostable footprint, both treat hosting infrastructure as a concern distinct from licensing. Code can be open source and still be concentrated on a platform whose reliability or values are in question; Bushell points toward Codeberg and Forgejo as alternatives.

Finally, [Daniel Stenberg's analysis of curl's bug rate](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses a long-lived open-source project as a case study in the limits of tooling: despite AI-assisted static analysis, there is no measurable sign that mature open-source projects are converging on zero latent bugs. Transparency helps, but it does not substitute for sustained maintenance.
