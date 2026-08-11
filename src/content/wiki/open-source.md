---
title: Open source
summary: >-
  Open source spans a wide range of projects and tensions: training tools,
  Kubernetes UIs, version control alternatives, JavaScript libraries, and code
  forges — united by shared code but divided by questions of governance,
  security, and commercial drift.
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
compiled_at: '2026-08-11T05:21:58.273Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10735
    output_tokens: 1201
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
  cost_usd: 0.05022
---
Open source is not a single thing. Across the sources here it appears as infrastructure tooling, machine learning utilities, developer libraries, and platform alternatives, each with its own community dynamics and failure modes.

On the tooling side, several projects demonstrate what open source enables when it works well. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers LLM fine-tuning with custom kernels that run up to 30x faster and use 90% less memory than FlashAttention 2, a result that depends on the model weights and backends being openly accessible. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline desktop LLM runner with an OpenAI-compatible API, and [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) builds a GPU compatibility calculator on top of publicly available model metadata. Radar ([Product Hunt listing](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), [official site](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui)) ships as a single Apache 2.0 binary that consolidates Kubernetes topology, GitOps, and security audits without requiring a cloud account.

Open source libraries show up across other sources too. [Seven Cool JavaScript Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) covers small, focused tools like Zod, Biome, and Knip. [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) publishes 18 Unicode spinner animations as zero-dependency raw frame data under MIT. [image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) is the subject of a detailed optimization post showing how a contributor achieved a 5.9x speedup on its blur function through open contribution. Jujutsu [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj) offers a Git-compatible VCS with novel conflict handling.

But open source also surfaces persistent tensions. [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) documents how Ollama obscured its llama.cpp dependency, shipped inferior inference, and has since pivoted toward a closed-source GUI and VC-driven cloud services — a pattern where a project starts open and drifts toward proprietary capture. [Stop Using OpenCode](/reading/2026-07/2026-07-20t215754-stop-using-opencode) argues the opposite failure mode: an open-source AI coding agent that ships with security vulnerabilities and a reckless default posture connecting remote LLMs to a local shell.

Security is a structural risk. The [supply-chain attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) on 151 npm and GitHub packages used invisible Unicode variation-selector characters to hide payloads that bypassed code review and static analysis entirely. Open repositories lower the barrier to contribution and to attack in equal measure.

Code forges are under pressure too. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues that GitHub's reliability has declined sharply under Microsoft and points toward Codeberg, Forgejo, or self-hosted forges as alternatives. [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) extends that critique into a concrete wishlist: remote pre-commit CI, stacked PRs as first-class objects, signed offline-usable Actions, and a self-hostable unit smaller than GitHub Enterprise.

Finally, [Daniel Stenberg's analysis of curl](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses vulnerability age and bugfix-rate data to argue that even long-lived, well-maintained open-source projects show no measurable sign of approaching zero latent bugs, despite powerful new AI-assisted static analysis tools. Open source enables scrutiny, but scrutiny does not guarantee safety.
