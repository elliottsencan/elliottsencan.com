---
title: Local AI
summary: >-
  Running large language models on personal hardware, covering feasibility
  checks, quantization tradeoffs, and fine-tuning toolchains that make local
  inference practical without datacenter resources.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
compiled_at: '2026-05-01T05:35:07.963Z'
compiled_with: claude-sonnet-4-6
---
Running LLMs locally means trading cloud convenience for privacy, cost control, and offline capability, but the practical barrier is almost always VRAM. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses this directly: given a specific GPU, it shows which open-weight models fit at which quantization level and estimates tokens-per-second throughput. Quantization is the key variable. A model that won't fit at full precision often runs comfortably at 4-bit or 8-bit, with acceptable quality loss depending on the task.

Once you know a model fits, fine-tuning it locally is the next challenge. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) targets this with custom CUDA kernels that reduce training memory by up to 90% compared to FlashAttention 2 and cut training time by up to 30x. It supports LoRA adapters, vision and audio modalities, and over 500 models, accessible either through open-source code or a no-code studio interface.

Together these tools outline the two-step reality of local AI: first confirm the hardware can handle inference, then decide whether fine-tuning is worth the additional setup. The VRAM ceiling remains the binding constraint throughout, which is why quantization support in both inference tooling and training frameworks has become the central engineering concern for anyone running models outside the cloud.
