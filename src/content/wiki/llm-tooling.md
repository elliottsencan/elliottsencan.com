---
title: LLM tooling
summary: >-
  The infrastructure layer around large language models: serving backends,
  context management, MCP integrations, knowledge bases, and the operational
  choices that determine cost, safety, and capability in practice.
sources:
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t071908-oobaboogatextgen
  - 2026-05/2026-05-14t222554-piyush-mishra-00helply
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - >-
    2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
  - 2026-06/2026-06-20t145835-chopratejasheadroom
  - 2026-08/2026-08-10t220951-gvzdvclaudish-to-english
compiled_at: '2026-09-21T21:53:57.177Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1062
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
  cost_usd: 0.029046
---
LLM tooling covers the layer of software between a raw model and a working application: inference backends, context pipelines, protocol integrations, and the scaffolding that connects models to real data and interfaces.

On the inference side, the options range from cloud APIs to fully local runtimes. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a desktop app with an OpenAI-compatible API, support for GGUF via llama.cpp, LoRA fine-tuning, and MCP servers, all running offline. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) takes a hybrid approach, letting users switch between cloud providers (OpenAI, Anthropic, Groq) and local backends (Ollama, LM Studio) depending on need. The local-model ecosystem itself is contested: [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) documents how Ollama obscured its llama.cpp dependency, ships inferior inference performance, and is pivoting toward a closed-source, VC-backed cloud product, a trajectory that undermines the local-first premise.

Context management is a recurring concern. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, reporting 60-95% token reduction without quality loss. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying wavelet transforms to source code to produce multi-resolution structural views that give models precise context without language-specific parsers. Knowledge-base tooling addresses the same pressure from the storage side: [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) generates tiered markdown and a machine-readable manifest so agents can navigate project context without burning excess tokens, while the [Karpathy LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) has the model itself build and maintain structured markdown files, querying at scale without RAG.

MCP has become a common integration layer. [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships Databricks expertise as an MCP server alongside markdown skills and a Python core library. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation to both humans and LLMs through MCP and llms.txt. [Claude Desktop's .mcpb format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) packages local MCP servers as single-click bundles for end-user distribution. [gvzdv/claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) extends Claude Code itself via a plugin that rewrites assistant output using a local Ollama model.

Two operational concerns cut across all of this. Cost: a [pricing analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) shows a 75x spread between the cheapest and most expensive frontier models, making provider-agnostic architecture a financial necessity rather than a preference. Safety: [the case for sandboxing Claude Code in Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that auto-approve mode is only safe inside a container that isolates credentials and production systems from the agent's file system access.
