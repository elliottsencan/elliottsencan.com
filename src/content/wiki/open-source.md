---
title: Open source
summary: >-
  Open-source software spans infrastructure tools, LLM runtimes, security
  vulnerabilities, and hosting debates — collectively showing both the power and
  the fragility of code developed in the open.
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
compiled_at: '2026-06-26T03:00:41.624Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9868
    output_tokens: 1059
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
  cost_usd: 0.045489
---
Open-source software is not a single phenomenon but a set of ongoing tensions: between transparency and trust, between community governance and commercial incentives, and between the promise of shared infrastructure and the reality of shared risk.

On the infrastructure side, tools like [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) — distributed under Apache 2.0 as a single binary — represent the model at its most legible: auditable license, no cloud account required, self-contained enough to run anywhere. [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) and [image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) occupy similar territory: Rust-ecosystem projects where the source being open invites the kind of deep optimization work — replacing float arithmetic with integer accumulators for a 5.9x speedup — that closed code rarely receives.

The LLM tooling ecosystem is where open-source dynamics get more complicated. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) and [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offer local, offline-capable inference and fine-tuning, giving practitioners genuine control over their models. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) publishes an open-source agent memory system with benchmark results against proprietary alternatives. But [the Ollama critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) illustrates how a project can start open-source, obscure its upstream dependency on llama.cpp, ship a closed-source GUI, and pivot toward a VC-funded cloud model — each step technically compatible with the license while hollowing out the original ethos.

Hosting and forges are under similar pressure. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues that Microsoft's stewardship has degraded the platform's reliability and quality, pointing to alternatives like Codeberg, Forgejo, or self-hosted Git forges. [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) extends that frustration into a concrete wishlist — stacked PRs, signed offline Actions, pre-commit remote CI — describing features that remain unbuilt not because they are technically hard but because they do not fit GitHub's current incentive structure.

Security is the sharpest edge. Open repositories are not inherently safer; the supply-chain attack documented by [Ars Technica](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) placed 151 malicious npm and GitHub packages into the ecosystem using invisible Unicode variation-selector characters, undetectable by reviewers or static analysis. And [Daniel Stenberg's analysis of curl](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) offers a sobering counterpoint to optimism about AI-assisted tooling: despite new static analysis capabilities, there is no measurable trend toward fewer latent bugs in long-running open-source projects.

Smaller releases — a [zero-dependency spinner library](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations), [seven focused JS utilities](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about), an [interactive LLM textbook](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) — round out the picture: open source remains the default distribution model for developer tooling at every scale, from single-purpose npm packages to full Kubernetes UIs.
