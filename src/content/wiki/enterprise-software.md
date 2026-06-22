---
title: Enterprise software
summary: >-
  Enterprise software sits at the intersection of organizational process, vendor
  ecosystems, and institutional trust, with recent sources highlighting
  governance pressures from AI adoption, supply chain risk, onboarding
  dysfunction, and the fragility of human-scale loyalty.
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
compiled_at: '2026-06-22T07:22:03.914Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4506
    output_tokens: 792
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
  cost_usd: 0.025398
---
Enterprise software is distinguished less by technical complexity than by the organizational weight it carries: compliance requirements, multi-stakeholder procurement, deep integrations with legacy systems, and the political cost of replacing any of it. Several recent sources illuminate different pressure points on that weight.

Legacy integration remains a stubborn reality. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) exists precisely because QuickBooks Desktop, used by millions of small and mid-sized businesses, still speaks qbXML and SOAP over a Web Connector, and no amount of SaaS momentum has retired it. The business logic is in the old system; the new tooling has to speak its language.

Security exposure scales with ecosystem size. A supply chain attack on SAP-adjacent npm packages [described by The Hacker News](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) harvested cloud credentials and browser passwords from developers building inside one of the largest enterprise software ecosystems in the world. The attack surface is not the platform itself but the peripheral tooling developers install around it.

Governance is becoming the central argument for AI tooling adoption inside enterprises. [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) argues that the real value of MCP is not developer convenience but the auditable, policy-aware proxy layer it provides between AI agents and enterprise resources, exactly the kind of control that procurement and security teams require before approving any agentic deployment.

Organizational dysfunction often shows up first in the software-adjacent processes. [DHg](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile) documents how enterprise onboarding rituals, packed calendars, same-sprint expectations, and probationary silence, systematically fail new hires while giving management a plausible cover story. The tooling and the process are usually fine on paper; the problem is structural incentives that no software upgrade fixes.

AI adoption introduces its own structural trap. A paper cited by [Falk and Tsoukalas](/reading/2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects) argues that competitive pressure pushes firms to shed workers before automation's productivity gains are confirmed, producing collectively suboptimal outcomes. Enterprise software buyers face the same coordination failure their vendors are helping to create.

Finally, the trust that enterprise relationships depend on is fragile in ways that dashboards do not capture. [Ghost in the Data](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) argues that organizations automating away human contact, whether through branch closures or metric-driven decisions, destroy loyalty that no personalization engine can rebuild. Enterprise software that optimizes process at the cost of relationship is winning a local maximum.
