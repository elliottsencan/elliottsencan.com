---
title: LLM tooling
summary: >-
  The infrastructure, runtimes, and developer-facing utilities that make large
  language models usable in practice, from local inference backends and
  context-compression middleware to knowledge-base compilers and MCP packaging.
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
compiled_at: '2026-10-19T22:11:42.602Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1057
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
  cost_usd: 0.028971
---
LLM tooling spans the full stack between a raw model weight and a working product: inference runtimes, context-management libraries, knowledge organization schemes, IDE integrations, and distribution formats that determine how a model's capabilities reach developers and end users.

On the inference side, tools differ sharply by philosophy. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a local, fully offline web UI with an OpenAI-compatible API, GGUF/llama.cpp backends, tool-calling, and MCP server support. Ollama occupies similar local-first territory, though [Zetaphor argues](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) it obscures its llama.cpp dependency, ships inferior inference performance, and is pivoting toward a closed-source cloud model that undercuts its original promise.

Context engineering sits at the center of most tooling decisions. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction without quality loss. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying Ricker wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without requiring language-specific parsers. For knowledge organization at scale, a [Reddit thread on Karpathy's LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes compiling raw documents into structured Markdown files the model maintains and queries directly, bypassing RAG. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) implements a lighter version of this as a zero-dependency bash CLI that generates both a human-readable index and a machine-readable manifest for agent navigation.

Distribution and integration formats are solidifying around MCP. [Anthropic's .mcpb guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) describes packaging a local MCP server as a single-click bundle for Claude Desktop. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships Databricks expertise as a composable MCP server supporting Claude Code, Cursor, and Gemini CLI. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) takes this further for documentation, exposing knowledge to both human readers and LLMs via llms.txt and MCP.

Security and cost round out the practical concerns. [cekrem's sandboxing guide](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues any agentic coding tool should run inside Docker to prevent credential leaks, regardless of how convenient full auto-approve feels outside a container. On cost, [Superframeworks notes](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) a 75x price gap now exists across frontier models, making provider-agnostic architecture a financial necessity rather than a nice-to-have. [gvzdv/claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) illustrates a composability pattern in the other direction: a Claude Code plugin that pipes assistant output through a local Ollama model purely to rewrite prose into plain English, treating the LLM layer as a post-processor rather than a primary runtime.
