---
title: Open source
summary: >-
  Open source spans tools, platforms, and practices that publish source code
  publicly; the cited sources collectively show its scope running from LLM
  training utilities and Kubernetes dashboards to supply-chain attack vectors
  and platform-hosting dilemmas.
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
compiled_at: '2026-08-13T21:17:39.179Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10735
    output_tokens: 1287
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
  cost_usd: 0.05151
---
Open source names software whose source code is publicly available, typically under a license that permits inspection, modification, and redistribution. The cited sources touch nearly every layer of the modern stack where that openness matters: local AI tooling, infrastructure dashboards, version control platforms, JavaScript libraries, and the security risks that public repositories introduce.

On the AI side, open-source tooling is the primary path for running LLMs outside of cloud APIs. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster fine-tuning than FlashAttention 2 by shipping custom kernels under an open license, while [oobabooga/text-generation-webui](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline desktop interface with an OpenAI-compatible API for local inference. The [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) repository takes this further by publishing a 12-chapter annotated textbook for building decoder-only LLMs from scratch. Meanwhile [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) is an open-source agent memory system posting state-of-the-art results on LongMemEval, and [Pythia](/reading/2026-07/2026-07-02t052125-jangles-bytepythia) fuses live data feeds into a local-first forecasting agent via Ollama.

Open source also underpins infrastructure tooling. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) ships as a single Apache 2.0 binary that consolidates Kubernetes topology, Helm, GitOps, and security audits without requiring a cloud account. [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is an open-source Git-compatible version control system that auto-commits the working copy and treats conflicts as first-class objects. Smaller libraries fill gaps too: [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) is a zero-dependency MIT-licensed npm package for braille spinner animations, and the JavaScript survey in [Seven Cool JavaScript Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) covers focused open-source utilities like Biome, Zod, and Knip.

The platform layer that hosts open source is itself under pressure. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues that reliability and quality have declined under Microsoft and recommends migrating to Codeberg, Forgejo, or self-hosted forges. [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) extends that critique into a wishlist for a reimagined forge with pre-commit CI, stacked PRs, and a smaller self-hostable unit. These pieces reflect a recurring tension: open-source communities depend on hosting infrastructure they do not control.

Public repositories also create a security surface. The supply-chain attack documented in [Supply-chain attack using invisible Unicode](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) embedded malicious payloads in invisible Unicode variation-selector characters across 151 npm and GitHub packages, bypassing code review and static analysis. [Approaching zero bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses curl's historical data to argue that open-source projects, despite AI-assisted static analysis, show no measurable trend toward eliminating latent vulnerabilities.

Open source is not a guarantee of safety, quality, or long-term openness. The [critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) illustrates how a project can obscure its dependency on llama.cpp, ship inferior performance relative to that dependency, and pivot toward a closed-source GUI and VC-backed cloud product while still carrying an open-source label. OpenAI's PII-detection model, used in [Gradio demos on Hugging Face](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter), and the [OpenCode security critique](/reading/2026-07/2026-07-20t215754-stop-using-opencode) both show that open availability of code does not automatically translate into secure or well-considered defaults.
