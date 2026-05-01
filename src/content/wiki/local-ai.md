---
title: Local AI
summary: >-
  Running LLMs on personal hardware rather than cloud APIs, covering tools for
  VRAM compatibility checking, quantization tradeoffs, and fine-tuning with
  reduced memory overhead.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
compiled_at: '2026-05-01T05:13:33.047Z'
compiled_with: claude-sonnet-4-6
---
Local AI refers to running large language models on personal or on-premises hardware, outside cloud inference APIs. Two practical concerns dominate the space: whether a given GPU has enough VRAM to load a model at all, and whether training or fine-tuning that model is feasible without industrial hardware.

[CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses the first concern directly. Given a GPU selection, it reports which open-weight models fit in available VRAM, at which quantization level, and what token throughput to expect. Quantization is the key variable: a model that cannot run at full precision may run acceptably at 4-bit or 8-bit, trading some fidelity for memory reduction. The tool makes that tradeoff visible before you download anything.

[Unsloth](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses the second concern. Fine-tuning even a mid-sized model normally requires substantial VRAM and time. Unsloth claims up to 30x faster training and 90% less memory than FlashAttention 2, achieved through hand-written GPU kernels rather than general-purpose frameworks. It supports LoRA adapters, vision and audio modalities, and over 500 models, with both an open-source path and a no-code studio for teams without kernel-level expertise.

Together these tools reflect a broader pattern in local AI: the gap between consumer hardware and useful model deployment is narrowing through quantization, efficient fine-tuning methods, and tooling that surfaces hardware constraints before they become blockers.
