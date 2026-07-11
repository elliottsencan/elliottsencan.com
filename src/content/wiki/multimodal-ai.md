---
title: Multimodal AI
summary: >-
  AI systems that process and generate across multiple input or output
  modalities, including text, images, video, and audio, now powering everything
  from local desktop inference to autonomous video production pipelines.
sources:
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - 2026-04/2026-04-30t231206-poolday
  - 2026-05/2026-05-05t071908-oobaboogatextgen
  - 2026-07/2026-07-09t161342-ai-2040-plan-a
compiled_at: '2026-07-09T23:25:59.663Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2622
    output_tokens: 494
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
  cost_usd: 0.015276
---
Multimodal AI covers models and systems that work across more than one data modality. The clearest technical survey comes from [Vision Language Models (Better, Faster, Stronger)](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger), which maps the 2025 VLM landscape: any-to-any architectures, mixture-of-experts decoders, video understanding, multimodal RAG, and agentic VLM pipelines that take actions rather than just answer questions. Smaller models have closed much of the gap with frontier ones, making capable multimodal inference practical outside datacenter settings.

That local story is illustrated by [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen), a desktop app that runs LLMs fully offline and includes multimodal input alongside tool-calling and LoRA fine-tuning. Multimodal capability, once a cloud-only feature, is now part of the self-hosted stack.

On the production side, [Poolday](/reading/2026-04/2026-04-30t231206-poolday) shows multimodal AI as infrastructure: its Creator-1 platform orchestrates 100+ generative models to execute video edits end-to-end, handling cuts, AI asset generation, and project assembly without human handoffs at each step. The output is an editable project, not a static render, which reflects how multimodal pipelines are beginning to slot into creative workflows rather than replace them wholesale.

[AI 2040: Plan A](/reading/2026-07/2026-07-09t161342-ai-2040-plan-a) treats multimodal capability as part of the broader trajectory toward systems powerful enough to warrant international governance, though it focuses on scaling and safety rather than modality specifics.
