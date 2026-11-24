---
title: LLM tooling
summary: >-
  The ecosystem of tools, servers, runtimes, and infrastructure layers that
  mediate between raw language models and practical software workflows, from
  local inference runtimes to context-compression proxies and documentation
  platforms.
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
compiled_at: '2026-11-24T03:59:52.870Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 958
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
  cost_usd: 0.027486
---
LLM tooling spans everything between a model checkpoint and a working application: local inference runtimes, context-management utilities, MCP servers, documentation platforms, and sandboxed execution environments. The sources here map a wide cross-section of that stack.

At the runtime layer, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop interface with an OpenAI-compatible API, GGUF/llama.cpp support, tool-calling, and MCP server integration. A pointed counterpoint comes from [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama), which argues that Ollama obscures its llama.cpp dependency, delivers inferior inference performance, and is pivoting toward closed-source, VC-funded cloud products that undercut its local-first premise. The [Helply desktop assistant](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) illustrates how runtime flexibility matters in practice: it supports both cloud providers and local backends interchangeably.

Context engineering is a recurring theme. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction without quality loss. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying wavelet transforms to source code to produce multi-resolution structural views that give models precise context without language-specific parsers. On the knowledge-organization side, [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) structures project context as tiered markdown files with both human-readable and machine-readable outputs, while the [Karpathy LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) has models compile and maintain structured Markdown directly, avoiding RAG overhead.

The MCP layer connects models to external systems. [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) packages platform expertise as an MCP server consumable by Claude Code, Cursor, and Gemini CLI. Anthropic's [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) formalizes local MCP server distribution as single-click installable bundles. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) extends the pattern to documentation, serving knowledge via MCP to both humans and agents.

Security and cost round out the picture. [cekrem's sandbox post](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that agentic coding tools should always run inside Docker containers to prevent credential leaks. The [AI pricing analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x spread between cheapest and most expensive frontier models, making provider-agnostic architecture a cost-management necessity rather than an engineering nicety.
