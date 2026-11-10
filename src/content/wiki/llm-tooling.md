---
title: LLM tooling
summary: >-
  The ecosystem of tools, servers, and infrastructure layers that extend what
  LLMs can do in practice: running them locally, feeding them structured
  context, compressing token overhead, sandboxing execution, and distributing
  capabilities as composable packages.
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
compiled_at: '2026-11-10T01:22:12.417Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 998
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
  cost_usd: 0.028086
---
LLM tooling spans the full stack between a raw model and a working application. At the execution layer, tools like [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provide local, fully offline runtimes with OpenAI-compatible APIs, multi-backend support, and built-in MCP server integration. Ollama occupies a similar niche but has drawn criticism for obscuring its llama.cpp dependency, shipping inferior inference performance, and pivoting toward closed-source cloud products [as documented by Zetaphor](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama). The choice of local runtime carries real quality and trust implications.

Context engineering is a recurring pressure point. WaveScope applies Ricker wavelet transforms to source code as a 1D signal, giving LLMs multi-resolution structural views without language-specific parsers [and without inflating token counts](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Headroom takes a complementary approach, compressing tool outputs, logs, and RAG chunks before they reach the model, [reporting 60–95% token reduction](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). On the knowledge-organization side, Karpathy's LLM-compiled wiki pattern replaces RAG with structured Markdown files the model builds and maintains itself [with periodic health checks to prevent drift](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), while the LostWarrior knowledge-base CLI generates both a human-readable INDEX.md and a machine-readable manifest.json [so agents can navigate context without burning excess tokens](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base).

MCP has emerged as a connective tissue across tooling. Databricks packages its AI platform expertise as an MCP server plus markdown skills and a Python core library, targeting Claude Code, Cursor, and Gemini CLI [from a single composable kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit). Anthropic's own .mcpb format lets developers bundle a local MCP server as a single-click package for Claude Desktop [with Node.js runtime included](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb). Mintlify extends the pattern to documentation, serving knowledge to both humans and LLMs via llms.txt and MCP [with context-aware agent support](/reading/2026-04/2026-04-30t231435-mintlify).

Security and cost round out the practical concerns. Running Claude Code inside Docker's sbx sandbox is recommended to prevent credential leaks and accidental production writes [while still enabling full auto-approve mode](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box). A 75x pricing gap across frontier providers means token costs are now a design variable; building provider-agnostic from day one [protects margins as the pricing floor continues to drop](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on). Even output rendering is now a tooling concern: a Claude Code plugin by Gvozdev rewrites assistant messages into plain English using a local Ollama model [without touching the underlying prompt or response](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english).
