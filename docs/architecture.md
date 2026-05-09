# Architecture

## Product Boundary

AgentPass Guard is the control plane above agentic payment rails.

- pay.sh/x402: service discovery and payment negotiation.
- Solana: settlement and receipt trail.
- AgentPass Guard: budget, allowlist, approval threshold, revocation, and audit logic.

## MVP Flow

1. Human creates a policy for an agent.
2. Agent proposes a paid API action.
3. Policy checker evaluates the action.
4. If approved, payment can settle on Solana.
5. Receipt is recorded with service, amount, decision, and transaction link.
6. Human can inspect spend or revoke the pass.

## Policy Object

```json
{
  "agentName": "Research Agent",
  "dailyBudgetUsdc": 0.25,
  "autoApprovalThresholdUsdc": 0.02,
  "allowedServices": ["pay-sh-research"],
  "expiresInHours": 24,
  "revocable": true,
  "blockedByDefault": true
}
```

## Current Implementation

- Static web app in `index.html`, `src/app.js`, `src/policy.js`, and `src/styles.css`.
- Browser-side policy evaluation for demo clarity.
- Optional `scripts/devnet-demo.mjs` sends a real devnet transaction with memo metadata.
- Sample policy and receipts live in `data/`.

## Production Path

- Move policy checks into a server or wallet middleware.
- Support SPL USDC and Token-2022 assets.
- Add pay.sh/x402 request parsing.
- Store policy hashes and receipt references onchain or in a verifiable log.
- Add team-level spend analytics, anomaly alerts, and approval workflows.
