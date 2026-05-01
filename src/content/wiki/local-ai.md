---
title: Local AI
summary: >-
  Running LLMs on local hardware requires matching model size and quantization
  to available VRAM; tools like Unsloth and CanItRun make that process faster
  and more legible for developers.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
compiled_at: '2026-05-01T05:21:34.696Z'
compiled_with: claude-sonnet-4-6
---
Running large language models locally means working within hard constraints set by GPU memory. Before any fine-tuning or inference can happen, the model has to fit in VRAM, which depends on parameter count, precision, and quantization level. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses the selection problem directly: pick a GPU, get a list of which open-weight models fit, at which quantization, and at what token throughput. The benchmark data turns what would otherwise be trial-and-error into a lookup.

Once a model is selected, training and fine-tuning on consumer or prosumer hardware has historically been expensive in time and memory. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) targets both: its custom kernels claim up to 30x faster training and 90% lower memory use compared to FlashAttention 2, with support for LoRA, vision, audio, and over 500 models. A no-code studio lowers the barrier further for developers who do not want to work at the kernel level.

Together these tools reflect a broader shift in the local-AI space: the bottleneck is moving from raw feasibility to workflow. The question is less "can this run at all" and more "how do I pick the right model and configuration before spending time on it."

Quantization is the central tradeoff across both tools. Lower precision shrinks VRAM footprint and can increase throughput, but at some cost to output quality. CanItRun surfaces the quantization options per model and GPU; Unsloth's training pipeline accommodates quantized fine-tuning. Neither source specifies exactly where quality degrades, so the practical threshold depends on the use case.
