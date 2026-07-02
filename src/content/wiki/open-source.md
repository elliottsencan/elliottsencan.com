---
title: Open source
summary: >-
  Open source underpins a wide spectrum of modern software, from local LLM
  runtimes and Kubernetes dashboards to npm libraries and version control
  systems, while raising persistent questions about security, stewardship, and
  platform trust.
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
compiled_at: '2026-07-02T12:32:43.444Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10007
    output_tokens: 967
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
  cost_usd: 0.044526
---
Open source is less a single practice than a condition of modern software infrastructure. The sources here illustrate that condition across several dimensions: tooling for local AI, code hosting and forging, security vulnerabilities, and small utility libraries.

The local LLM ecosystem runs almost entirely on open-source foundations. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) fine-tunes and runs models with custom kernels that cut memory use by 90% against FlashAttention 2. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline desktop UI with an OpenAI-compatible API, LoRA support, and MCP integration. CanItRun helps users assess VRAM feasibility for open-weight models before downloading them. These tools collectively lower the floor for running capable models without cloud dependencies.

The relationship between openness and trust is complicated by stewardship decisions. The critique of Ollama in [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that obscuring llama.cpp attribution, shipping inferior inference performance, and launching a closed-source GUI represent a drift away from the local-first ethos the project was built on. Meanwhile, [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) both push toward self-hosted or federated forges like Codeberg and Forgejo as alternatives when a dominant platform's reliability or priorities shift. The second piece adds a concrete wishlist: pre-commit remote CI, stacked PRs as first-class citizens, and a smaller self-hostable unit than GitHub Enterprise.

Security is an unresolved burden on open ecosystems. [A supply-chain attack documented by Ars Technica](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) used invisible Unicode variation-selector characters to hide payloads in 151 npm and GitHub packages, bypassing both human review and static analysis. Daniel Stenberg's analysis of [curl's bug-rate data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) shows that even powerful AI-assisted static analysis tools have produced no measurable decline in latent bug counts for a long-running open-source project.

Beyond AI and security, open source is the default distribution model for developer utilities. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) ships as a single Apache 2.0 binary that consolidates Kubernetes topology, Helm, GitOps, and security audits without requiring a cloud account. [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) is a zero-dependency npm package for braille CLI spinners, MIT-licensed. [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible version control system that treats working-copy changes and conflicts as first-class objects. These projects share the structural expectation that source availability, permissive licensing, and self-hostability are baseline properties rather than differentiators.
