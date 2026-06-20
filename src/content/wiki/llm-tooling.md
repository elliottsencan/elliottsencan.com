---
title: LLM tooling
summary: >-
  The infrastructure layer around large language models: runtimes,
  context-packaging tools, MCP servers, knowledge-base patterns, and pricing
  considerations that shape how models are deployed and integrated into real
  workflows.
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
compiled_at: '2026-06-20T12:44:58.611Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4103
    output_tokens: 916
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
  cost_usd: 0.026049
---
LLM tooling covers the layer between a model and a working product: how context gets shaped and delivered, how the model connects to external systems, how it runs locally or in the cloud, and what it costs.

On the context side, several patterns have emerged for feeding structured knowledge to models without RAG. The Karpathy wiki pattern [described here](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) has the model ingest raw documents and maintain structured Markdown files it can query directly. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a similar approach with a bash CLI that produces both a human-readable INDEX.md and a machine-readable manifest.json, letting agents navigate project context without burning excess tokens. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) goes further, applying wavelet transforms to source code to produce multi-resolution structural views as an MCP server, giving models precise context without language-specific parsers.

MCP itself has become a common integration surface. [Databricks ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships Databricks expertise as an MCP server alongside markdown skills and a Python core library. Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) lets developers package local MCP servers as single-click bundles for Claude Desktop. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) exposes documentation through MCP and llms.txt so both agents and human users get context-aware access to the same knowledge.

Local inference tooling ranges from mature to contested. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline desktop app with an OpenAI-compatible API, GGUF support, tool-calling, and MCP servers. Ollama is more popular but [criticized sharply](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) for obscuring its llama.cpp dependency, shipping inferior inference performance, and pivoting toward a VC-backed cloud model. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) shows the practical end of this spectrum: a meeting assistant that switches between cloud and local backends depending on what the user has available.

Security and cost are increasingly first-class concerns. [cekrem's post](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that agentic coding tools like Claude Code should run inside Docker sandboxes to prevent credential leaks. On pricing, a [Superframeworks analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x gap between the cheapest and most expensive frontier models, with the practical implication that provider-agnostic architecture is now a financial requirement, not just a design preference.
