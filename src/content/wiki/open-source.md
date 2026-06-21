---
title: Open source
summary: >-
  Open source spans a wide band of practice: from permissively licensed
  infrastructure tools and LLM fine-tuning frameworks to community-hosted
  forges, and the security vulnerabilities that openness can simultaneously
  enable and expose.
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
compiled_at: '2026-06-21T18:28:30.647Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9703
    output_tokens: 1020
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
  cost_usd: 0.044409
---
Open source as a practice shows up across the sources here in several distinct modes: as a licensing and distribution choice, as an infrastructure philosophy, as a community trust relationship, and as a surface for attack.

On the tooling side, several projects illustrate what "open source" looks like when applied to developer infrastructure. Radar, the Kubernetes UI, ships as a single Apache 2.0 binary with no cloud account required, explicitly positioning its openness as the alternative to vendor lock-in among platform teams [Radar HQ](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui). Jujutsu is distributed openly on GitHub as a Git-compatible VCS with first-class conflict objects [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj). The image-rs blur optimization work happened inside an existing open Rust crate, where a contributor could inspect, benchmark, and rewrite the implementation without asking permission [5x faster fast_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs).

In the local-LLM space, open-weight models and open-source inference tooling are tightly coupled. Unsloth delivers fine-tuning performance gains through custom kernels released openly [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth), oobabooga/textgen provides a fully offline inference interface under an open license [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen), and the hindsight agent memory system is published on GitHub as a reference implementation [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). The "how-to-train-your-gpt" repository takes the same approach for education, annotating every line of a decoder-only LLM build so anyone can follow along [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt).

The Ollama critique complicates this picture. The post argues that Ollama obscured its llama.cpp dependency, shipped worse inference than the upstream it wrapped, and has since launched a closed-source GUI while pivoting toward cloud services [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama). That trajectory illustrates a recurring tension: projects that start as open-source community tools sometimes drift toward proprietary layers as commercial pressure builds.

Open source is also a trust surface. The supply-chain attack documented by Ars Technica used 151 malicious npm and GitHub packages encoding payloads in invisible Unicode characters, exploiting the assumption that publicly visible code has been reviewed [Supply-chain attack using invisible Unicode](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). Daniel Stenberg's analysis of curl's bug history makes a related point from the other direction: even a well-maintained, long-lived open-source project shows no measurable approach toward zero latent bugs despite better tooling [Approaching zero bugs?](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs).

The GitHub-as-platform question sits underneath much of this. David Bushell's case for migrating to Codeberg, Forgejo, or self-hosted forges [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) reflects a broader concern that open-source code increasingly depends on centralized, proprietary hosting infrastructure, and that the reliability of that infrastructure is itself now in question.
