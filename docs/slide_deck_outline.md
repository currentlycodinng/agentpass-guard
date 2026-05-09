# 8-Slide Deck Outline

## Slide 1: AgentPass Guard

Local-first policy simulator and guard layer for AI agents that pay for APIs on Solana.

Close line: Test agent payment policies before real spend.

## Slide 2: The New Problem

Agents can now pay for APIs, but unrestricted agent spending is unsafe.

- Too many services.
- Too many credentials.
- No tested spend policy.
- Weak audit trail.
- Humans cannot approve every tiny action.

## Slide 3: Why Now

pay.sh/x402 are making agent-paid APIs real.

Solana makes tiny agent payments practical, but teams still need to test budget, allowlist, threshold, approval, and revocation controls before live agent spend.

## Slide 4: The Product

AgentPass Guard sits between the agent and paid API calls, then explains each guardrail decision.

The human sets:

- Daily budget.
- Allowed services.
- Auto-approval threshold.
- Expiry.
- Revocation.

## Slide 5: Demo Flow

Three actions:

1. Approved API call.
2. Blocked unapproved vendor.
3. Approval-needed high-cost call.

Each action produces guardrail checks plus a receipt or blocked decision. Builders can export the policy JSON and receipt log.

## Slide 6: Why Solana

Agent payments are small, frequent, and programmatic.

Solana gives:

- Fast settlement.
- Low fees.
- Stablecoin path.
- Transaction receipts.
- Wallet-native agent identity.

## Slide 7: MVP Built

- Static demo app.
- Policy checker.
- Receipt dashboard.
- Policy JSON export.
- Receipt log export.
- Optional devnet transaction with memo receipt metadata.
- Submission docs and scripts.

## Slide 8: Path After Hackathon

Start with AI builders and student agents using pay-per-use APIs.

Next:

- SPL USDC support.
- pay.sh/x402 request parser.
- Team approval workflow.
- Wallet middleware or server-side authorization.
- Agent fleet spend dashboard.
- Provider integrations.
