---
title: Open source
summary: >-
  Open source spans everything from LLM fine-tuning tools and Kubernetes UIs to
  version control forges and npm packages, and the cited sources collectively
  illustrate both its strengths and the tensions that arise around trust,
  governance, and sustainability.
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
compiled_at: '2026-08-03T10:10:28.322Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10588
    output_tokens: 1173
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
  cost_usd: 0.049359
---
Open source is a mode of software production where source code is publicly visible and typically free to use, modify, and redistribute. The sources here span a wide range of contexts, which together reveal recurring tensions: transparency as both a strength and an attack surface, community trust as fragile, and the gap between open-source ideals and the commercial pressures that erode them.

On the tooling side, open-source projects cover a lot of ground. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers LLM fine-tuning with custom kernels at a fraction of the memory cost of FlashAttention 2. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline desktop LLM runtime with an OpenAI-compatible API. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) ships as a single Apache 2.0 binary that replaces a patchwork of Kubernetes tooling. [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) is an open-source agent memory system targeting state-of-the-art benchmark results. These projects share a common pitch: transparency, self-hostability, and freedom from cloud vendor lock-in.

But open-source reputation is easy to damage and hard to rebuild. The critique of Ollama in [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama obscured its llama.cpp dependency, shipped inferior inference, and is now pursuing a VC-driven cloud pivot, betraying the local-first promise that built its community. A similar charge lands on [OpenCode](/reading/2026-07/2026-07-20t215754-stop-using-opencode), where the open-source label coexists with security vulnerabilities and a default configuration that connects remote LLMs to a local shell with minimal safeguards.

Transparency cuts both ways on security. The supply-chain attack documented in [Supply-chain attack using invisible Unicode code](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) shows 151 malicious npm and GitHub packages encoding payloads in invisible Unicode variation-selector characters, bypassing code review and static analysis precisely because reviewers cannot see what they are auditing. Open repositories are a prerequisite for that kind of attack. [Approaching zero bugs?](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds a longer-term view: Daniel Stenberg's analysis of curl's bug data finds no measurable sign that even mature, well-maintained open-source projects are converging toward zero latent vulnerabilities, despite increasingly capable static analysis tools.

The infrastructure for hosting open-source code is itself under scrutiny. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) documents reliability and quality decline under Microsoft and argues developers should move to Codeberg, Forgejo, or self-hosted forges. [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) goes further, sketching a feature wishlist, including pre-commit remote CI, stacked PRs as first-class citizens, and signed offline-usable Actions, that no existing platform delivers. The dependency of the open-source ecosystem on a single dominant commercial forge is itself a structural risk.

Smaller open-source releases appear throughout: [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible VCS with conflict-as-data semantics; [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) is a zero-dependency npm package of braille spinners; [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) is an annotated GPT-from-scratch textbook. These occupy the other end of the spectrum from platform-level concerns, but they share the same ecosystem risks around discovery, trust, and longevity.
