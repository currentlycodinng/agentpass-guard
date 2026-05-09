# Colosseum Form Answers

## Project name

AgentPass Guard

## Brief description

AgentPass Guard is a local-first policy simulator and guard layer for AI agents using pay.sh/x402-style Solana payments, with budget, allowlist, approval, revocation, and receipt controls.

## Project website

Use the deployed demo URL. If deployment is not ready, use the GitHub repo or public slide deck temporarily.

## What are you building, and who is it for?

AgentPass Guard is a local-first spending-policy simulator and guard layer for AI agents that use paid APIs. It is for AI builders, student teams, and small companies that want agents to access pay-per-use services without giving them unlimited wallet access, raw API keys, or credit-card credentials.

The MVP lets a human create a pass for an agent with a daily budget, allowed services, an auto-approval threshold, expiry, and revocation. When the agent requests a paid API action, AgentPass checks the policy and explains the exact guardrail result. If the request is inside policy, it can settle on Solana and produce a receipt. If it is outside policy, it is blocked or paused for human approval.

The demo shows one research agent attempting three actions: an approved paid API call, a blocked unapproved vendor, and an allowed but high-cost call that requires human approval. Builders can export the policy JSON and receipt log, which makes the project useful as a test harness before connecting real agent spend.

## Why did you decide to build this, and why build it now?

AI agents are moving from chat to execution. They can search, write code, call tools, and now pay for APIs through emerging rails such as pay.sh and x402 on Solana. That unlocks useful workflows, but it creates a trust problem: agents need spending power, and humans need a way to limit that spending.

Without a policy layer, users either approve every action manually or give agents credentials that are too powerful. Neither path works for frequent autonomous workflows.

We built AgentPass Guard because the base payment rail is arriving now, but the builder-facing control and testing layer is still thin. Solana is a strong fit because agent payments are small, frequent, programmatic, and benefit from fast settlement, low fees, and inspectable receipts.

## What technologies are you using or integrating with?

- Solana devnet for payment receipt proof.
- Solana Memo program for receipt metadata in the optional devnet script.
- JavaScript policy checker for budget, allowlist, threshold, expiry, and revocation logic.
- Static web app with HTML, CSS, and ES modules for a simple judge-friendly demo.
- pay.sh/x402-compatible product model for agent-paid APIs.
- `@solana/web3.js` for the optional devnet transaction script.
- JSON policy and receipt exports for testing agent payment rules before live deployment.

## Category

AI / Agents if available. Otherwise choose Infrastructure or Payments.

## Mobile-focused dApp

No.
