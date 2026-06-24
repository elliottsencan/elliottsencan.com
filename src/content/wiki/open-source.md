---
title: Open source
summary: >-
  Open source spans from collaborative infrastructure and local tooling to
  software forges and security vulnerabilities, with the sources collectively
  mapping both its productivity gains and its structural risks.
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
compiled_at: '2026-06-24T06:35:06.745Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9868
    output_tokens: 1030
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
  cost_usd: 0.045054
---
Open source is a broad surface. The sources here touch it from several angles: tools built in the open for local-first computing, the infrastructure that hosts them, the security threats that exploit shared code, and the long-run question of whether open-source maintenance can approach zero defects.

On the tooling side, the local LLM ecosystem is almost entirely open-source driven. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers fine-tuning with custom kernels at a fraction of the memory cost of FlashAttention 2. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline web UI and OpenAI-compatible API for local inference. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) helps users assess which open-weight models fit their hardware. The educational layer is open too: [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) is an annotated textbook for building a decoder LLM from scratch. Agent memory is following the same pattern, with [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) releasing a biomimetic memory system under open terms.

Beyond LLMs, the open-source default extends to infrastructure tooling. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) ships as an Apache 2.0 single binary that replaces a patchwork of Kubernetes management tools, and [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible VCS with a fully open development model. Small utility libraries follow the same ethos: [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) is a zero-dependency MIT-licensed spinner package, and the JavaScript libraries surveyed in [Seven Cool JS Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) are all open.

The hosting layer raises harder questions. [GitHub Is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues that GitHub's reliability and quality have declined under Microsoft and recommends migrating to Codeberg, Forgejo, or self-hosted forges. [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) catalogs structural gaps in existing forges, from pre-commit CI to stacked PRs, that still lack good open-source implementations.

Security is the most direct structural risk. [Supply-chain attack using invisible Unicode](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) documents 151 malicious npm and GitHub packages encoding payloads in invisible Unicode variation-selector characters, bypassing code review and static analysis entirely. The open publish model that makes the ecosystem productive is the same surface attackers exploit.

On long-run quality, Daniel Stenberg's analysis of [curl's bug history](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable trend toward zero latent bugs despite AI-assisted static analysis, a grounding note on the limits of tooling improvements in mature open-source projects.

The tension that runs through all of this: open source lowers the floor for building and distributing software dramatically, while simultaneously expanding the attack surface and concentrating critical infrastructure on platforms whose governance is outside contributors' control.
