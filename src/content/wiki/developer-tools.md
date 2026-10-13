---
title: Developer tools
summary: >-
  Software and platforms that extend what developers can build, test, ship, and
  understand — spanning LLM fine-tuning utilities, CI infrastructure,
  documentation systems, security harnesses, and runtime diagnostics.
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
compiled_at: '2026-10-13T00:14:57.871Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 1160
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
  cost_usd: 0.032085
---
Developer tooling spans a wide surface area: anything that changes the economics of building, running, or understanding software. The sources here cover several distinct clusters, each representing a different layer of the stack.

At the model-development end, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers custom CUDA kernels for fine-tuning LLMs locally at up to 30x faster speeds and 90% less memory than FlashAttention 2. Alongside it, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) lets practitioners check VRAM headroom for a given model and quantization level before committing to a run, bridging the gap between model size and available hardware.

For distributed systems and CI, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) provides durable execution that persists workflow state at every step, eliminating manual failure reconciliation. Depot takes a related idea into CI specifically: [their orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions in a two-layer hierarchy to run stateful, checkpointed pipelines without keeping a long-lived process alive.

Documentation and API surface have their own tooling layer. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) positions itself as an AI-native documentation platform serving knowledge to both humans and LLMs, with llms.txt and MCP integration. [Angular's Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) is itself an example of a framework investing in precise, typed developer guidance.

Security tooling is increasingly agentic. [Anthropic's defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) automates threat modeling, scanning, triage, and patching through an agentic pipeline with gVisor sandboxing. That context makes the supply-chain risk documented by [Ars Technica](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) more pointed: 151 malicious npm and GitHub packages hid payloads in invisible Unicode variation-selector characters, defeating code review and static analysis, which are themselves developer tools.

Desktop and local tooling is a growing category. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) is an Electron-based meeting assistant with local and cloud LLM backends. [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) offers a desktop cockpit for multi-agent teams. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes topology, Helm, GitOps, and MCP into a single binary. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows how to bundle a local MCP server into a one-click Claude Desktop extension.

Two sources cut against the grain of tool proliferation. [David Crawshaw](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues cloud platforms are built on wrong abstractions — VMs, slow block devices, expensive networking — and that the tooling built atop them inherits those costs. [Dan Q](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) makes a parallel point at the app layer: a travel itinerary Android app was serving plain HTML over HTTP; replacing it with a webpage removed tracking, ads, and unnecessary build complexity. Both suggest that the right developer tool is sometimes no tool at all, or a much simpler one.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) occupies a different register: a book and repository that teaches how language runtimes themselves are built, grounding developer tooling in the mechanisms underneath it.
