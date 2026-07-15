---
title: Open source
summary: >-
  Open source spans a spectrum from foundational infrastructure and
  community-governed tools to VC-backed projects with contested loyalties,
  raising persistent questions about trust, sustainability, and what openness
  actually guarantees.
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
compiled_at: '2026-07-15T10:07:25.302Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10434
    output_tokens: 1166
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
  cost_usd: 0.048792
---
Open source is not a single thing. The sources here span ML training tools, Kubernetes dashboards, npm packages, version control systems, agent memory libraries, and code forges. What connects them is not a unified philosophy but a set of recurring tensions: who controls the code, what openness actually guarantees, and whether the license is the whole story.

At the utility end, several tools arrive with no ambiguity. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) is MIT-licensed LLM fine-tuning tooling that ships custom CUDA kernels for 30x faster training. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) is a fully offline desktop inference UI with an OpenAI-compatible API. [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible version control system built around first-class conflict objects and automatic rebasing. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) is an agent memory system targeting biomimetic knowledge structures. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) ships as a single Apache 2.0 binary that consolidates Kubernetes topology, Helm, GitOps, and security audits across clusters. These projects treat the open-source release as the product.

The more complicated case is Ollama. [The critique from Sleeping Robots](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama obscured its llama.cpp dependency, ships inferior inference performance compared to alternatives, introduced misleading model naming conventions, and launched a closed-source GUI before pivoting toward a VC-funded cloud offering. The license does not prevent any of that. Open source as a starting point is compatible with a trajectory away from it.

GitHub sits at the infrastructure layer underneath much of this. [David Bushell's piece](/reading/2026-05/2026-05-10t205349-github-is-sinking) documents declining reliability and quality under Microsoft, recommending migration to Codeberg, Forgejo, or self-hosted Git forges. [Mat Duggan's wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) frames the problem as missing features: pre-commit remote CI, stacked PRs, signed offline-usable Actions, and a self-hostable unit smaller than GitHub Enterprise. The point of convergence is that the dominant open-source hosting platform is itself a proprietary product with a single corporate owner, and the community's dependence on it is a structural risk.

Security is a harder problem still. [The supply-chain attack reported by Ars Technica](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) involved 151 malicious npm and GitHub packages encoding payloads in invisible Unicode variation-selector characters, invisible to reviewers and static analysis. Open repositories lower the cost of publishing; they also lower the cost of poisoning the dependency graph.

On the bug-count question, [Daniel Stenberg's analysis of curl](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses vulnerability age and fix-rate data to argue that even with AI-assisted static analysis, there is no measurable signal that open-source projects are converging on zero latent bugs. Maturity and scrutiny help, but do not eliminate the problem.

Smaller projects in the sources illustrate what open source looks like at the individual-contributor scale: a [unicode spinner animation library](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) with no dependencies, a [GPT-from-scratch textbook on GitHub](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt), a [PII-detection demo on Hugging Face](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter). These exist because the infrastructure for publishing and distributing open code is cheap and accessible. Whether they persist, get maintained, or get abandoned is a separate question the license does not answer.
