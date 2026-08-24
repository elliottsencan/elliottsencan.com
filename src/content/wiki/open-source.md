---
title: Open source
summary: >-
  Open source spans a wide range of software — from LLM tooling and Kubernetes
  dashboards to code forges and JavaScript libraries — raising persistent
  questions about licensing integrity, security exposure, and infrastructure
  control.
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
compiled_at: '2026-08-24T18:52:52.405Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10735
    output_tokens: 1146
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
  cost_usd: 0.049395
---
Open source is less a single practice than a set of commitments: publish the code, allow inspection and modification, and (usually) pick a license that codifies those permissions. What the sources here illustrate is how those commitments play out under pressure, and how often they fray.

On the tooling side, the ecosystem is dense. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) provides open-source LLM fine-tuning with custom kernels. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully local, fully offline LLM interface with an OpenAI-compatible API. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) is an open-source agent memory system. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) ships as a single Apache 2.0 binary that replaces several Kubernetes management tools at once. [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) is an annotated, interactive textbook for building LLMs from scratch. [gunnargray-dev/unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) is a zero-dependency npm package for terminal spinners. [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible version control system with first-class conflict handling. Breadth is not the problem.

What the sources expose instead are tensions internal to open source. The most direct is around licensing and commercial drift. [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama obscured its llama.cpp dependency, introduced a closed-source GUI, and is following a VC-driven cloud pivot that betrays its local-first origins. That pattern, open launch followed by proprietary enclosure, is a recognized risk in the ecosystem, and [OpenCode draws a similar critique](/reading/2026-07/2026-07-20t215754-stop-using-opencode) for security posture: being open-source does not mean being safe or well-designed, and defaulting to connecting remote LLMs to a local shell with minimal configuration is a meaningful failure regardless of license.

Security is the other major fault line. The supply-chain attack documented by [Dan Goodin](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) involved 151 malicious npm and GitHub packages hiding payloads in invisible Unicode characters, undetectable by code review or static analysis. Open registries and public repositories are the attack surface; openness is both the mechanism of collaboration and of infiltration. [Daniel Stenberg's analysis of curl](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds a longer view: even well-maintained, widely scrutinized open-source projects accumulate latent bugs over years, and no current tooling, AI-assisted or otherwise, shows a measurable trend toward eliminating them.

The infrastructure layer is under its own strain. [David Bushell](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues GitHub's reliability has declined sharply under Microsoft and recommends migrating to Codeberg, Forgejo, or self-hosted alternatives. [Mat Duggan](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) independently lists structural features missing from existing forges, from pre-commit remote CI to signed offline-usable Actions, suggesting no current platform fully serves the needs of serious open-source teams.

Taken together, the sources show open source as a productive but contested space. Code gets written, shared, and improved in public. It also gets compromised, enclosed, or neglected. The license on a repository is a starting condition, not a guarantee of quality, security, or sustained community stewardship.
