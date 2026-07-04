---
title: Supply chain security
summary: >-
  Attacks against software supply chains exploit the trusted path from upstream
  packages and repositories to running production code, using techniques from
  invisible Unicode payloads to poisoned npm packages to harvest credentials and
  persist in developer environments.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
compiled_at: '2026-07-04T21:28:46.244Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2962
    output_tokens: 594
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
  cost_usd: 0.017796
---
Supply chain attacks target the gap between trusting a dependency and verifying it. Two recent npm campaigns show how wide that gap can be. Attackers uploaded 151 malicious packages that encoded payloads in invisible Unicode variation-selector characters, making the malicious code undetectable by code reviewers and static analysis while remaining executable at runtime [Supply-chain attack via invisible Unicode](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). A separate campaign attributed to the TeamPCP threat actor poisoned four SAP-ecosystem npm packages with a self-propagating, credential-stealing payload that harvested cloud secrets and browser passwords, exfiltrated them through GitHub, and abused Claude Code and VS Code configuration files as persistence vectors [SAP npm packages compromised](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing).

Authentication hygiene is part of the defensive surface. SSH keys with commit signing reduce reliance on personal access tokens that credential-stealing malware specifically targets, and agent forwarding narrows the credential footprint across remote machines [Using SSH keys](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure). On the forge side, a critique of GitHub's current model calls for signed, offline-usable Actions and stronger first-party controls over CI pipelines [If I could make my own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github), pointing to how supply chain risk extends into CI infrastructure itself.

Automated detection is increasingly part of the response. Anthropic's reference harness for autonomous vulnerability discovery runs threat modeling, scanning, triage, and patching through an agentic pipeline with gVisor sandboxing, treating the detection problem as something an LLM agent can own end-to-end rather than waiting for human review [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness). The invisible-Unicode attack already shows that static analysis alone fails; automated agents that understand semantic behavior may be the next meaningful layer.
