---
title: Supply chain security
summary: >-
  Attackers compromise software supply chains by poisoning packages, hiding
  payloads in invisible Unicode characters, and harvesting credentials from
  developer environments; SSH key hygiene and code signing are among the
  defensive countermeasures.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
compiled_at: '2026-05-22T16:18:29.655Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2665
    output_tokens: 428
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
  cost_usd: 0.014415
last_source_added: '2026-06-04T23:36:01.357Z'
---
Supply chain attacks target the packages and tools developers trust rather than the applications themselves. Two recent incidents illustrate how varied the attack surface has become.

Researchers at Aikido Security discovered 151 malicious packages across GitHub, npm, and the VS Code marketplace that hid payloads inside invisible Unicode variation-selector characters [invisible-unicode-attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). Because these characters render as nothing, normal code review and most static analysis tooling pass over them entirely, making detection dependent on tools that specifically inspect raw byte sequences.

A separate campaign attributed to the TeamPCP threat actor poisoned four SAP-ecosystem npm packages with a self-propagating credential-stealing payload [sap-npm-attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). The malware harvested cloud secrets and browser passwords, exfiltrated them via GitHub, and used Claude Code and VS Code configuration files as persistence vectors, showing how AI coding tools can become unintended footholds.

On the defensive side, replacing token-based authentication with SSH key pairs and using SSH-signed commits reduces the credential attack surface that both campaigns exploited [ssh-keys](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure). Commit signing in particular creates a verifiable identity chain that makes unsigned or tampered commits detectable before they reach downstream consumers.
