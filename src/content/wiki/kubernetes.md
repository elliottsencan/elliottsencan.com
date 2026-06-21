---
title: Kubernetes
summary: >-
  Kubernetes is the dominant container orchestration platform, providing the
  runtime substrate for modern platform engineering, AI inference
  infrastructure, and tooling ecosystems built around managing containerized
  workloads at scale.
sources:
  - 2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui
  - 2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui
  - >-
    2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
  - 2026-06/2026-06-21t130559-what-is-inference-engineering
compiled_at: '2026-06-21T20:22:11.307Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2792
    output_tokens: 614
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
  cost_usd: 0.017586
---
Kubernetes sits at the center of how organizations run containerized software in production. Its core job is scheduling and managing containers across clusters, but the operational surface area it creates has spawned entire categories of tooling, practices, and roles built around taming that complexity.

The tooling gap is well-documented. Platform teams routinely stitch together kubectl with five or more other utilities to get visibility into what is actually running, and this patchwork breaks down as cluster counts grow. Tools like Radar address this directly, offering a single binary that consolidates topology visualization, Helm management, GitOps status, image inspection, and security audits across multiple clusters without requiring a cloud account [Radar HQ](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui). The Product Hunt listing for the same tool adds live traffic inspection and MCP integration for AI agents [Radar — Open-Source Kubernetes UI](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), signaling that Kubernetes UIs are beginning to accommodate AI-driven operations workflows.

Understanding what Kubernetes actually manages requires understanding containers themselves. The Linux primitives underneath, mount namespaces, mount propagation, and pivot_root, are what give each container an isolated root filesystem, as Ivan Velichko shows by assembling a Docker-like container from scratch using only standard Linux tools [How Container Filesystem Works](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like). Kubernetes inherits and depends on all of this.

At the organizational level, Kubernetes is the default runtime for internal developer platforms. Luca Cavallin's walkthrough of platform engineering treats Kubernetes as assumed infrastructure, the layer on which golden paths and self-service tooling are built for application teams [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end). And in AI infrastructure, Kubernetes clusters are where inference workloads run; Gergely Orosz's breakdown of inference engineering describes techniques like disaggregated prefill-decode and tensor parallelism that require precise control over GPU allocation and network topology within a cluster [What is Inference Engineering?](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering).
