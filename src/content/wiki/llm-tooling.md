---
title: LLM tooling
summary: >-
  The practical layer of software built around LLMs: local runtimes, context
  management utilities, MCP servers, knowledge-base compilers, and pricing
  infrastructure that determines what is economically viable to build.
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
compiled_at: '2026-09-14T21:39:51.405Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1017
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
  cost_usd: 0.028371
---
LLM tooling covers the software that sits between a raw model and useful output: local inference runtimes, context-shaping utilities, protocol adapters, knowledge-base compilers, and the pricing signals that govern which combinations are worth building.

On the local inference side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline web UI with an OpenAI-compatible API, GGUF/llama.cpp backends, tool-calling, and MCP server support. [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) critiques Ollama specifically for obscuring its llama.cpp dependency, shipping worse inference performance than direct alternatives, and pivoting toward closed-source cloud products, which signals that local-first tooling choices carry long-term strategic risk.

Context management is its own sub-layer. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, cutting token usage by 60-95%. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different approach, applying Ricker wavelet transforms to source code as a signal, producing multi-resolution structural views without language-specific parsers. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) handles the problem at the organizational level with a bash CLI that generates tiered markdown and a machine-readable manifest so agents can navigate large knowledge bases without excess token burn. The Karpathy LLM wiki pattern described on [Reddit](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) extends this further: having the model itself ingest raw documents and maintain structured markdown files, queried directly rather than through RAG.

MCP has become a connective standard across this stack. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) exposes Databricks expertise to coding assistants through an MCP server. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation to both humans and LLMs via MCP and llms.txt. Anthropic's [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) formalizes packaging: a single-click .mcpb bundle for Claude Desktop with manifest, Node.js runtime, and Connectors Directory distribution.

Security and cost round out the practical concerns. [cekrem](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that agentic coding tools should always run inside Docker sandboxes to prevent credential leaks. On cost, [Superframeworks](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents the 75x spread between cheapest and most expensive frontier models and recommends building provider-agnostic from the start. [gvzdv/claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) sits at the far end of the stack, a Claude Code plugin that pipes assistant output through a local model to rewrite it into plain English, a reminder that tooling extends to post-output transformation as well.
