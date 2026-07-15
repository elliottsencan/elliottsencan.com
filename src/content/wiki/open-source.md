---
title: Open source
summary: >-
  Open source spans tools, platforms, and norms governing shared code — from
  local LLM runners and Kubernetes UIs to code forges and vulnerability research
  — raising ongoing questions about sustainability, trust, and governance.
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
compiled_at: '2026-07-15T04:05:21.911Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10434
    output_tokens: 1057
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
  cost_usd: 0.047157
---
The sources here cover open source across several registers: infrastructure tooling, package distribution, forge infrastructure, and the longer arc of what it means to publish code under a permissive license and trust the ecosystem around it.

On the tooling side, several projects illustrate the practical range of what open source enables. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) ships as a single Apache 2.0 binary that consolidates Kubernetes topology, GitOps, Helm, and auditing without requiring a cloud account, replacing a typical patchwork of five separate tools. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline LLM desktop interface with an OpenAI-compatible API, and [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) packages custom CUDA kernels for local LLM fine-tuning that deliver up to 30x faster training than FlashAttention 2. The pattern in all three is open source as a guarantee of local control — no telemetry, no vendor lock-in, no required account.

That guarantee is not always honored over time. The post [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) documents how Ollama obscured its llama.cpp dependency, shipped inferior inference performance compared to alternatives, introduced confusing model naming, and eventually launched a closed-source GUI while pursuing VC funding. The piece reads as a case study in open-source drift: a project that adopted the label and community goodwill of open source while progressively abandoning its commitments. This is not a hypothetical risk. It is a documented trajectory.

Distribution infrastructure carries its own trust surface. [A supply-chain attack covered by Ars Technica](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) describes 151 malicious npm and GitHub packages that encoded payloads in invisible Unicode variation-selector characters, making them undetectable by code review or static analysis while remaining executable at runtime. The attack vector is the openness itself: anyone can publish to npm, and reviewers cannot see what is hidden in plain sight.

Forge infrastructure is under pressure separately. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues that GitHub's reliability and quality have declined materially under Microsoft, and recommends migration to Codeberg, Forgejo, or self-hosted alternatives before conditions worsen further. [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) elaborates on what a better forge would look like: pre-commit remote CI, stacked PRs as a first-class concept, signed and offline-usable Actions, and a self-hostable unit smaller than GitHub Enterprise. Both pieces reflect concern that the dominant open-source hosting layer has interests that diverge from the developers using it.

Quality and security remain open problems. Daniel Stenberg's analysis of curl's bug history [argues](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) that despite powerful AI-assisted static analysis, there is no measurable sign that open-source projects are approaching zero latent bugs. The distribution of vulnerability ages in curl suggests long-lived defects are the norm, not the exception.

Smaller packages like unicode-animations and the JavaScript libraries surveyed in [Seven Cool JS Libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) represent the other end of the spectrum: focused, dependency-light, MIT-licensed utilities that do one thing and distribute it freely. These generate little controversy but depend on the same infrastructure and trust assumptions as everything else in the ecosystem.
