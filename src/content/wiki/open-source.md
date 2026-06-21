---
title: Open source
summary: >-
  Open source spans a wide range of practices and tensions: freely available
  code enabling local LLM inference, Kubernetes tooling, and agent memory
  systems, while also serving as a vector for supply-chain attacks and a
  platform for community-driven quality debates.
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
compiled_at: '2026-06-21T20:12:43.551Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9703
    output_tokens: 1394
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
  cost_usd: 0.050019
---
Open source today is less a single philosophy than a practical condition that shapes how developers build, distribute, and trust software. The sources here cut across several dimensions of that condition.

The local LLM ecosystem is almost entirely open-source-dependent. Tools like [Unsloth](https://unsloth.ai/) ([2026-04/2026-04-24t093356-unsloth](/reading/2026-04/2026-04-24t093356-unsloth)) and [oobabooga/text-generation-webui](https://github.com/oobabooga/textgen) ([2026-05/2026-05-05t071908-oobaboogatextgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen)) exist because model weights and inference runtimes are publicly available. The same open ecosystem that enables these tools also creates friction: [Friends Don't Let Friends Use Ollama](https://sleepingrobots.com/dreams/stop-using-ollama/) ([2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama)) documents how Ollama obscured its llama.cpp dependency, introduced misleading model naming, and is now pivoting toward a closed-source GUI and cloud services, a pattern where a project starts open and drifts toward proprietary lock-in as commercial incentives accumulate.

Platform infrastructure sees the same dynamic. [Radar](https://radarhq.io/) ([2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui)) ships as an Apache 2.0 single binary explicitly to avoid the cloud-account dependency that commercial Kubernetes tooling imposes. Agent memory system [hindsight](https://github.com/vectorize-io/hindsight) ([2026-05/2026-05-03t173422-vectorize-iohindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight)) and the file-based memory design described for zerostack ([2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store)) both treat open, inspectable file formats as a feature rather than a limitation, prioritizing auditability and portability.

GitHub's centrality to open-source distribution is itself under scrutiny. [GitHub is Sinking](https://dbushell.com/2026/04/29/github-is-sinking/) ([2026-05/2026-05-10t205349-github-is-sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking)) argues that Microsoft's stewardship has degraded reliability and quality to the point where migration to Codeberg, Forgejo, or self-hosted forges is worth serious consideration. Meanwhile, the same platform's openness makes it a target: [a supply-chain attack](https://arstechnica.com/security/2026/03/supply-chain-attack-using-invisible-code-hits-github-and-other-repositories/) ([2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and)) used 151 malicious npm and GitHub packages to embed invisible Unicode payloads, exploiting the assumption that open code is reviewed code.

On software quality, Daniel Stenberg's analysis of curl ([2026-05/2026-05-02t094735-approaching-zero-bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs)) offers a grounded counterpoint to AI-driven optimism: even a mature, heavily scrutinized open-source project shows no measurable sign of approaching zero latent bugs despite new static analysis tooling. Openness enables scrutiny, but scrutiny has limits.

Smaller open-source artifacts round out the picture: a zero-dependency npm package of Unicode spinner animations ([2026-06/2026-06-17t075738-gunnargray-devunicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations)), an annotated GPT-from-scratch textbook ([2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt)), and performance contributions back into Rust's image-rs ([2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs)) all represent the incremental, public accumulation of work that open source depends on.
