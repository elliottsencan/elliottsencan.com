---
title: Open source
summary: >-
  Open source spans tooling, security risks, platform infrastructure, and
  community trust, with sources ranging from local LLM runners to code forges,
  supply-chain attacks, and performance-optimized libraries.
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
compiled_at: '2026-07-04T21:25:16.446Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10131
    output_tokens: 1185
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
  cost_usd: 0.048168
---
Open source is not a single phenomenon but a set of overlapping practices and tensions: releasing code publicly, building community infrastructure around it, and navigating the commercial pressures that often follow adoption.

Several sources here are open-source tools for running LLMs locally. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers fine-tuning and inference with custom kernels at dramatically lower memory cost than alternatives. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop app with an OpenAI-compatible API, multiple backends, and LoRA support. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) is an open-source agent memory system benchmarked on LongMemEval. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui), released under Apache 2.0, collapses the typical Kubernetes toolchain into a single binary. These projects share a pattern: taking infrastructure that might otherwise be proprietary and making it inspectable, forkable, and self-hostable.

That inspectability is not a complete safety guarantee. The [invisible Unicode supply-chain attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) reported by Ars Technica placed malicious payloads in 151 npm and GitHub packages encoded in variation-selector characters, invisible to reviewers and static analysis. Open code is readable in principle; in practice, review capacity is finite and attackers exploit that gap.

Bug rates in open-source projects are another angle on the same problem. Daniel Stenberg's [analysis of curl's vulnerability history](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) found no measurable sign that AI-assisted static analysis is reducing latent bugs toward zero, even in a well-maintained project with decades of scrutiny.

Platform trust is a recurring theme. David Bushell's [critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues that reliability and quality have deteriorated sharply under Microsoft, and recommends migration to Codeberg, Forgejo, or self-hosted forges. Mat Duggan's [wishlist for a better code forge](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) is a concrete list of missing capabilities: pre-commit remote CI, stacked PRs as first-class citizens, signed and offline-usable Actions, and a smaller self-hostable unit. Both pieces reflect dissatisfaction with centralised gatekeeping of open-source infrastructure.

Commercial drift is a distinct but related risk. The [critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues the project obscured its llama.cpp dependency, ships inferior inference, introduced misleading model naming, launched a closed-source GUI, and is now pivoting toward VC-funded cloud services, betraying the local-first premise it launched on. This is a pattern the open-source ecosystem has seen repeatedly: a tool gains adoption on open principles, then monetises in ways that compromise them.

Smaller open-source contributions also appear throughout these sources. [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) is a fully annotated textbook for building a decoder-only LLM from scratch. [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) is a zero-dependency npm package of spinner frame data under MIT. Arthur Pastel's [optimisation of image-rs fast\_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) is a contribution to the Rust image ecosystem. [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible VCS with first-class conflict objects. These span the range from educational resources to utility libraries to core tooling, all released under permissive terms.

Across these sources, open source functions simultaneously as a distribution model, a trust signal, a security surface, and a site of ongoing tension between community expectations and commercial incentives.
