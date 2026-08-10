---
title: Open source
summary: >-
  Open source spans version control infrastructure, local AI tooling, security
  risks, and governance tensions, with sources collectively illustrating both
  the practical power and institutional fragility of publicly shared code.
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
compiled_at: '2026-08-10T19:04:42.096Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10588
    output_tokens: 1157
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
  cost_usd: 0.049119
---
Open source software is not a single thing but a surface across which many different forces act: contributors publishing libraries and tools, platforms hosting the resulting code, and actors exploiting the same openness that makes collaboration possible.

Several sources here are themselves open-source projects. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) ships LLM fine-tuning with custom kernels under a public license. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) is a fully offline LLM desktop app with an OpenAI-compatible API. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) is an open-source agent memory system publishing state-of-the-art benchmark results. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) ships as a single Apache 2.0 binary that consolidates an entire Kubernetes toolchain. [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible VCS released publicly. Smaller utilities like [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) and the JavaScript library roundup at [neciudan.dev](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) represent the lighter end of the open-source spectrum, zero-dependency packages released for reuse with minimal friction.

The openness that makes these projects shareable also creates attack surface. The supply-chain attack documented by [Ars Technica](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) placed 151 malicious npm and GitHub packages in the wild, encoding payloads in invisible Unicode characters that reviewers and static analysis tools both missed. Open registries with low publication barriers are a structural precondition for both the ecosystem's richness and this class of attack.

The platform question is its own thread. GitHub hosts most of the repositories cited here, but [David Bushell](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues its reliability and quality have declined sharply under Microsoft and recommends migrating to Codeberg, Forgejo, or self-hosted forges. [Mat Duggan](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) goes further, describing a wishlist for a reimagined forge with stacked PRs as first-class citizens, signed offline-usable Actions, and a self-hostable footprint smaller than GitHub Enterprise. Both pieces reflect a recurring anxiety: the infrastructure that open-source collaboration depends on is itself controlled by a private company with its own incentives.

Governance tensions surface inside individual projects too. The [critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) traces a pattern of obscuring the llama.cpp dependency, shipping inferior inference, and pivoting toward a closed-source GUI and VC-funded cloud, arguing the project has drifted from local-first principles. OpenCode faces a different charge: [wren's critique](/reading/2026-07/2026-07-20t215754-stop-using-opencode) argues that being open source does not substitute for security hygiene, pointing to prompt-cache-busting defaults and a posture that connects remote LLMs to a local shell with minimal configuration.

On the question of software quality, [Daniel Stenberg's curl analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses decades of vulnerability data to argue that even a mature, well-maintained open-source project shows no measurable sign of approaching zero latent bugs, despite AI-assisted static analysis. Openness enables broad code review but does not guarantee it happens, and tooling improvements have not yet moved the baseline.

Across these sources, open source functions simultaneously as a distribution model, a governance structure, a security posture, and a platform dependency. The practical value is visible in the tools themselves; the structural tensions are visible in who controls the hosting infrastructure and what happens when a project's incentives shift.
