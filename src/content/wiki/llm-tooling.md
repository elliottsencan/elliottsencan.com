---
title: LLM tooling
summary: >-
  The infrastructure, runtimes, and developer utilities built around large
  language models: local inference backends, context-management layers, MCP
  integrations, knowledge-base patterns, and the cost structures that shape
  which tools survive.
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
compiled_at: '2026-06-21T18:33:11.262Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4233
    output_tokens: 941
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
  cost_usd: 0.026814
---
LLM tooling spans the full stack between a raw model and a working product: local inference runtimes, context-packaging utilities, protocol adapters, and the pricing dynamics that determine what is economically viable to build.

On the inference side, the choice of backend matters more than it appears. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) ships a fully offline desktop runtime with an OpenAI-compatible API, GGUF/llama.cpp support, tool-calling, and MCP server integration. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) takes a hybrid approach, letting users switch between cloud providers and local backends like Ollama or LM Studio. Ollama itself has faced scrutiny: [Zetaphor's critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) documents how it obscured its llama.cpp dependency, ships inferior inference performance relative to alternatives, and is drifting toward a closed-source cloud product.

Context engineering is an increasingly active layer. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies Ricker wavelet transforms to source code, giving LLMs multi-resolution structural views without language-specific parsers. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, cutting token usage by 60-95%. Knowledge-base approaches like [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) and [Karpathy's wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) organize project context as tiered markdown files with machine-readable manifests, avoiding RAG entirely for structured domains.

MCP has emerged as a connective layer. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) exposes Databricks expertise through an MCP server that works across Claude Code, Cursor, and Gemini CLI. Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) lets developers bundle a local MCP server as a single-click install for Claude Desktop. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) extends MCP into documentation, serving knowledge to both humans and agents from a single platform.

Safety and cost cut across all of this. [Claude Code's sandboxing guidance](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that agentic coding tools should always run inside Docker containers to prevent credential leaks. On pricing, a [Superframeworks analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between the cheapest and most expensive frontier models, making provider-agnostic architecture a practical necessity rather than a preference.
