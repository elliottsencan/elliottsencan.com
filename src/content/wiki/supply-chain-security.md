---
title: Supply chain security
summary: >-
  Attackers exploit trust in shared package ecosystems and code forges to inject
  malicious payloads; defenses range from cryptographic authentication to
  agentic vulnerability scanning.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
compiled_at: '2026-07-06T00:22:16.986Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2962
    output_tokens: 598
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
  cost_usd: 0.017856
---
Software supply chains are attack surfaces because every dependency, build tool, and repository host is an implicit trust boundary. Two recent npm incidents show how that trust gets abused. In one, attackers uploaded 151 packages encoding malicious payloads in invisible Unicode variation-selector characters, making the code undetectable to human reviewers and static analysis while still executing at runtime [Supply-chain attack using invisible Unicode](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). In another, the TeamPCP threat actor compromised four SAP-ecosystem npm packages with a self-propagating credential harvester that exfiltrated cloud secrets and browser passwords via GitHub, and used Claude Code and VS Code configuration files as persistence vectors [SAP-Related npm Packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing).

Cryptographic controls are a foundational countermeasure. SSH key-based authentication and commit signing remove the PAT tokens that attackers commonly steal, replacing shared secrets with asymmetric key pairs tied to specific identities [Using SSH Keys](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure). On the forge side, signed and offline-usable CI actions would limit the blast radius when an upstream action is tampered with, a gap noted in proposals for a more trustworthy code platform [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

Automated detection is increasingly agentic. Anthropic's defending-code reference harness runs Claude through threat modeling, vulnerability scanning, triage, and patching inside a gVisor sandbox, providing an autonomous pipeline for finding and remediating issues before they reach production [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness). The invisible-Unicode attack is a direct counter-argument to over-reliance on any single detection layer: payloads that survive static analysis and code review illustrate why defense in depth, covering authentication, signing, sandboxing, and runtime monitoring, matters more than any one control.
