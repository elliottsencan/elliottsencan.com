---
title: Open source
summary: >-
  Open source spans a spectrum from foundational infrastructure and dev tooling
  to LLM training utilities and code forges, with recurring tensions around
  licensing, governance, supply-chain security, and commercial drift.
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
compiled_at: '2026-07-06T00:18:38.299Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10131
    output_tokens: 1382
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
  cost_usd: 0.051123
---
Open source here means software whose source is publicly available, typically under a permissive or copyleft license, with no private build required to inspect or run it. The sources collected under this topic cut across several domains: local LLM tooling, developer infrastructure, JavaScript libraries, Kubernetes UIs, version control, and code forges.

On the LLM side, several tools are explicitly open source or open-weight by design. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) is a fine-tuning toolkit that ships custom kernels for dramatically faster training; [oobabooga/text-generation-webui](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) is a fully offline, MIT-licensed desktop app for running LLMs locally; and [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) is an annotated open-source textbook for building a decoder-only model from scratch. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) publishes an open agent memory system with benchmark results, and [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) is an open tool that maps GPU VRAM to runnable open-weight models.

Beyond LLMs, several sources are open-source projects in adjacent spaces. Radar is an Apache 2.0 Kubernetes UI ([Product Hunt listing](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), [Radar HQ site](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui)) that replaces a patchwork of CLI tools with a single self-hostable binary. [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is an open-source Git-compatible version control system. gunnargray-dev/unicode-animations is a zero-dependency MIT-licensed npm package. The JavaScript libraries surveyed in [Seven Cool JS Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) are all open source, and [Arthur Pastel's image-rs optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) is a contribution to Rust's open-source image library.

Two sources raise governance and platform concerns that touch open-source infrastructure directly. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues that Microsoft's stewardship has degraded reliability enough that developers should consider Codeberg, Forgejo, or self-hosted forges. [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) sketches a wishlist for a better forge: signed, offline-usable Actions, stacked PRs as first-class citizens, and a self-hostable unit smaller than GitHub Enterprise. Both pieces reflect a broader anxiety about the centralization of open-source collaboration on a single commercial platform.

Commercial drift is a separate concern. [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) documents how Ollama obscured its llama.cpp dependency, shipped inferior inference performance, and has moved toward a closed-source GUI and a VC-driven cloud pivot, arguing this trajectory betrays the local-first, open-source community it built on.

Security is also a live issue. [Supply-chain attack using invisible Unicode](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) describes 151 malicious npm and GitHub packages that encoded payloads in invisible Unicode variation selectors, bypassing both human review and static analysis. This is a direct attack on the open-source supply chain, exploiting the trust that open repositories extend to published packages. [Approaching zero bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds a complementary data point: Daniel Stenberg's analysis of curl's vulnerability history finds no measurable sign yet that AI-assisted static analysis is reducing the latent bug count in open-source projects.

OpenAI's PII-detection model, covered in [How to Build Scalable Web Apps with OpenAI's Privacy Filter](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter), is itself open source, enabling the Gradio-based demos described there. [jangles-byte/Pythia](/reading/2026-07/2026-07-02t052125-jangles-bytepythia) is a local-first forecasting agent built entirely on open tools and keyless data feeds.
