---
title: Supply chain security
summary: >-
  Attacks on software supply chains exploit trust in shared registries, package
  ecosystems, and developer tooling; recent incidents show payloads hidden in
  Unicode characters, credential-stealing npm packages, and the use of SSH key
  signing as a countermeasure.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
aliases:
  - malware
compiled_at: '2026-05-28T14:44:04.728Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2665
    output_tokens: 456
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
  cost_usd: 0.014835
---
Software supply chain attacks target the distribution layer rather than application code directly, compromising packages that developers pull in as dependencies. Two recent npm incidents illustrate the range of techniques in use.

Researchers at Aikido Security found 151 malicious packages across GitHub, npm, and VS Code's marketplace that hid payloads inside invisible Unicode variation-selector characters [supply-chain attack using invisible code](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). The technique defeats normal code review and static analysis entirely because the characters render as nothing in most editors and diff views.

Separately, the TeamPCP threat actor poisoned four SAP-ecosystem npm packages with a self-propagating payload that harvests cloud credentials and browser passwords, then exfiltrates them through GitHub [SAP npm packages compromised](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). That attack also abused Claude Code and VS Code configuration paths as persistence vectors, showing how AI coding tooling has become part of the attack surface.

On the defensive side, SSH key-based commit signing offers a way to cryptographically bind commits to a verified identity, reducing the risk that poisoned commits can be quietly introduced under a stolen or forged identity [SSH keys for connectivity and signing](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure). It does not address registry-level poisoning directly, but it hardens the identity layer that supply chain attackers also exploit.
