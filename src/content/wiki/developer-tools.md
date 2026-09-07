---
title: Developer tools
summary: >-
  Software and platforms that help developers build, run, debug, and understand
  systems — spanning local LLM runners, CI orchestrators, documentation
  platforms, and security utilities.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231412-form-model-design-angular-signal-forms
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t231511-temporal
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - 2026-04/2026-04-30t231745-optimal-vs-usertesting
  - 2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-14t222554-piyush-mishra-00helply
  - 2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-07/2026-07-05t170602-building-a-cloud
  - >-
    2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you
  - 2026-08/2026-08-10t220951-gvzdvclaudish-to-english
compiled_at: '2026-09-07T21:14:08.429Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 1000
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
  cost_usd: 0.029685
---
Developer tools span an enormous surface area: anything a programmer reaches for to make building software faster, safer, or more comprehensible counts. The sources here cover that range, from low-level performance utilities to high-level workflow platforms.

On the local AI side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers custom CUDA kernels for fine-tuning and running LLMs locally, claiming up to 30x faster training and 90% less memory than FlashAttention 2. Alongside it, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) gives developers a quick calculation of whether their GPU's VRAM can handle a given model, showing compatible quantization levels and estimated tokens-per-second. Both address the practical gap between LLM capability and local hardware constraints.

Documentation is its own category of tooling. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) positions itself as an AI-native docs platform that serves knowledge to both humans and LLMs, with support for llms.txt and MCP. Good documentation infrastructure matters more as agents begin consuming it programmatically rather than just humans reading it.

Infrastructure tooling shows up in several forms. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) provides durable execution that persists workflow state at every step, removing manual failure-recovery logic from distributed applications. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) takes a related approach for CI pipelines, using AWS Lambda durable functions with a two-layer orchestration hierarchy to run stateful workflows without a persistent process. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes observability, Helm, GitOps, and MCP support into a single open-source binary.

Security tooling is under pressure. [Ars Technica's coverage](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) of invisible Unicode supply-chain attacks on npm and GitHub packages illustrates how static analysis and human code review can be defeated simultaneously. [Anthropic's defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to this landscape with an agentic pipeline for autonomous vulnerability scanning, triage, and patching, using gVisor sandboxing.

A few tools sit at the intersection of AI and desktop workflows: [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) is an Electron meeting assistant with real-time transcription and pluggable LLM backends, and [claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) is a Claude Code plugin that rewrites assistant output into plainer language using a local Ollama model. Both show developer tools extending into everyday AI interaction rather than staying confined to the build pipeline.

Finally, [David Crawshaw's argument](/reading/2026-07/2026-07-05t170602-building-a-cloud) that current cloud platforms rest on wrong abstractions and [Dan Q's reversal of an app back into a webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) both point at a recurring theme: the best developer tool is sometimes the simpler one, or a rethought foundation rather than another layer on top of existing ones.
