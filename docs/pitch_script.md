# Pitch Video Script

Target length: 2 minutes.

## Script

AI agents are starting to pay for APIs. With pay.sh and x402, an agent can discover a service, see a price, make a request, and pay with Solana.

That is a huge unlock, but it creates the next problem: who controls the agent's spending?

Today the choices are bad. You either make the human approve every paid action, which kills the point of an autonomous agent, or you give the agent too much wallet or API-key access, which is unsafe.

AgentPass Guard is a local-first policy simulator and guard layer for AI agents.

A human creates a pass for an agent with a daily budget, allowed services, an auto-approval threshold, expiry, and revocation. When the agent tries to buy an API response, AgentPass checks the policy first and explains the exact guardrail result.

Inside policy, the action is approved and a Solana receipt can be created. Outside policy, the action is blocked or paused for human approval. Builders can export the policy JSON and receipt log before connecting real spend.

In the demo, our research agent tries three actions. The first pays for an approved research API call. The second tries a non-approved tool and gets blocked. The third is an allowed BigQuery call, but the cost is above the threshold, so AgentPass asks for approval.

This is not trying to replace pay.sh or x402. Those rails let agents pay. AgentPass helps builders test and enforce the spending rules around those payments.

The first users are AI builders and small teams who want their agents to use paid tools without exposing unlimited payment credentials.

For Solana, this is a strong fit because agent payments are small, frequent, programmatic, and need receipts. AgentPass adds the missing trust layer before people let agents spend more than tiny amounts.

Our MVP is narrow: one agent, one policy, three explainable payment decisions, JSON exports, and a devnet receipt path. The bigger vision is a production guardrail for companies running many autonomous agents.
