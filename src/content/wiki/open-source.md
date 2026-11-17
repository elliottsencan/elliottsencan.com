---
title: Open source
summary: >-
  Open source spans a wide spectrum: community-maintained projects, permissively
  licensed tools released by companies, and codebases that blur the line when
  commercial incentives shift — with real consequences for security, trust, and
  longevity.
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
  - >-
    2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude
compiled_at: '2026-11-17T01:47:21.974Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10904
    output_tokens: 1327
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
  cost_usd: 0.052617
---
Open source is a licensing and development practice where code is published for anyone to read, modify, and redistribute. The practical reality is messier than the label suggests: a project can be open source in its license while remaining opaque in governance, compromised in security, or quietly pivoting toward a closed commercial model.

The most direct expression of the ecosystem's breadth is the volume of tools released under permissive licenses. Radar, an Apache 2.0 Kubernetes UI that ships as a single binary with no cloud account required, represents one pattern: a fully self-contained utility meant to replace a scattered toolchain [Radar HQ](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui). Jujutsu, a Git-compatible version control system, is another [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj). So are smaller libraries like a zero-dependency Unicode spinner package unicode-animations, Zod's schema validation, and tools like Biome and Knip [seven JS libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about). Many projects exist entirely on GitHub, which introduces its own dependency: David Bushell argues GitHub's reliability has declined sharply under Microsoft and urges developers to migrate to Codeberg, Forgejo, or self-hosted forges before things worsen [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), a concern echoed in Mat Duggan's wishlist for a reimagined code forge that handles stacked PRs, signed offline-usable Actions, and smaller self-hostable units [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

Open source in LLM tooling is a contested space. Unsloth delivers up to 30x faster fine-tuning with 90% less memory via custom kernels [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth). The hindsight agent memory library [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight), oobabooga's textgen [textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen), and the how-to-train-your-gpt textbook [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) all publish under open licenses. But Zetaphor's critique of Ollama illustrates how open-source framing can obscure dependencies: Ollama shipped without disclosing its reliance on llama.cpp, adopted inferior inference defaults, introduced misleading model naming, and launched a closed-source GUI while pivoting toward cloud services [Stop Using Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama). OpenCode draws a parallel critique: despite being described as open-source, it has been called out for security vulnerabilities, broken TUI interactions, and a default posture that connects remote LLMs to a local shell with minimal safeguards [Stop Using OpenCode](/reading/2026-07/2026-07-20t215754-stop-using-opencode).

Security is an active pressure on the ecosystem. Attackers uploaded 151 malicious npm and GitHub packages encoding payloads in invisible Unicode variation-selector characters, undetectable by reviewers and static analysis tools but executable at runtime [supply-chain attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). Daniel Stenberg's analysis of curl's bug data offers a measured counterpoint to AI-assisted security optimism: despite powerful new static analysis tools, there is no measurable sign yet that open-source projects are approaching zero latent bugs [Approaching zero bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs).

Contribution patterns are shifting alongside AI tooling. The image-rs blur optimization involved a contributor working directly in a Rust open-source library, replacing float arithmetic with integer accumulators for a 5.9x speedup [5x faster fast\_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs). OpenAI's PII-detection model was released under an open license, enabling the Gradio-based document redaction demos built on top of it [OpenAI privacy filter](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter). What open source means in practice, then, depends heavily on who controls the roadmap, whether the license is coupled with genuine transparency, and whether the hosting infrastructure is itself trustworthy.
