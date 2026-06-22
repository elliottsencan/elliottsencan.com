---
title: Enterprise software
summary: >-
  Enterprise software sits at the intersection of organizational process,
  compliance, and developer tooling; recent sources highlight its supply chain
  vulnerabilities, governance demands, AI adoption pressures, and the hidden
  costs of scaling human systems.
sources:
  - 2026-04/2026-04-24t162154-he-came-he-saw-he-cooked
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t231537-startupsrip
  - 2026-04/2026-04-30t231709-conductor
  - 2026-04/2026-04-30t231745-optimal-vs-usertesting
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects
  - >-
    2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate
compiled_at: '2026-06-22T02:36:36.198Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4506
    output_tokens: 775
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
  cost_usd: 0.025143
---
Enterprise software is distinguished less by scale than by the institutional weight it carries: procurement cycles, compliance requirements, audit trails, and deep integration with legacy systems. Several recent sources illuminate different pressure points on that weight.

On the security front, [a 2026 supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) targeted the SAP ecosystem specifically through poisoned npm packages that harvested cloud credentials and used GitHub as an exfiltration channel. The attack is notable because it exploited developer tooling — Claude Code and VS Code configs — as persistence vectors, meaning the blast radius runs through the engineering layer into production SAP environments.

Governance is the argument [Stephane Derosiaux makes for MCP](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) in enterprise AI contexts. The protocol's value is not developer convenience but a policy-aware, auditable proxy between AI agents and enterprise resources. That framing treats the enterprise not as a user of AI tools but as an entity that needs to control what those tools can touch and prove that control to auditors.

[Conductor](/reading/2026-04/2026-04-30t231709-conductor) illustrates the enduring integration tax: QuickBooks Desktop, decades old, still requires SOAP, qbXML, and a Web Connector. A typed API layer over that stack is a business because the enterprise installed base does not turn over on startup timescales.

The [Optimal Workshop comparison page](/reading/2026-04/2026-04-30t231745-optimal-vs-usertesting) signals how enterprise software buyers evaluate platforms differently from individual users: compliance, SSO, and audit support appear alongside feature comparisons, because procurement cannot ignore them.

The organizational dynamics inside enterprises are their own category of risk. [Research on AI layoff strategy](/reading/2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects) argues that competitive pressure pushes firms to shed workers before automation's productivity gains are confirmed, producing a collectively bad equilibrium. [Ghost in the Data](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) extends that concern to customer relationships: automating away human touchpoints destroys trust that no personalization engine can rebuild. And [a critique of enterprise onboarding practices](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile) shows how internal dysfunction gets laundered through process language, with new hires absorbing the cost in ways management cannot see.

Taken together, the picture is of software environments where the technical debt is institutional as much as architectural, where AI introduces new governance problems faster than it resolves old operational ones, and where the human systems running alongside the software carry their own fragility.
