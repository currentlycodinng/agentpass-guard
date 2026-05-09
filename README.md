# AgentPass Guard

AgentPass Guard is a local-first policy simulator and guard layer for AI agents using paid APIs on Solana.

The point is simple:

> Pay.sh and x402 let agents pay. AgentPass Guard helps builders test and enforce when an agent is allowed to pay.

## Demo

The demo shows a research agent with a human-defined pass:

- Daily budget.
- Allowed API services.
- Auto-approval threshold.
- Expiration.
- Revocation.
- Receipt log.

The agent attempts three actions:

1. An allowed pay-per-use API call that auto-approves.
2. A non-allowed tool call that is blocked.
3. A larger request that requires human approval.

## Why Solana

Agentic API payments need small, frequent, programmatic payments with receipts. Solana is a strong fit because fees are low, settlement is fast, and devnet/mainnet transaction links can serve as an inspectable receipt trail.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4173`.

The web app itself is static and works without a backend. `npm install` is only needed for the optional devnet proof script.

## Environment

No secrets are committed. Copy `.env.example` to `.env` for Colosseum Copilot validation:

```bash
COLOSSEUM_COPILOT_API_BASE=https://copilot.colosseum.com/api/v1
COLOSSEUM_COPILOT_PAT=your-token-here
```

Real `.env` files are ignored by git.

To check the token from this app folder:

```bash
npm run copilot:status
```

## Optional Devnet Proof

```bash
npm run devnet:demo
```

This script:

- Creates a temporary devnet payer wallet.
- Requests a devnet airdrop.
- Sends a tiny payment to a mock API provider wallet.
- Adds receipt metadata through the Solana Memo program.
- Prints an explorer link for the transaction.

If the public faucet is rate-limited or unreachable, the script falls back to a simulated receipt and exits cleanly. Force the simulation path with:

```bash
node scripts/devnet-demo.mjs --simulate
```

Override the RPC endpoint (e.g. Helius devnet) with `SOLANA_RPC_URL`.

## Submission Positioning

AgentPass Guard is not trying to replace pay.sh or x402. It sits above the payment rail as the builder-facing policy simulator and control layer:

- Budgets.
- Tool allowlists.
- Approval thresholds.
- Revocation.
- Receipts.

This keeps the product narrow enough for a hackathon demo while pointing toward a real startup wedge: production guardrails for teams running many agents.

## Deck

Generate the local PPTX:

```bash
npm run deck
```

Imported Google Slides deck:

https://docs.google.com/presentation/d/1FmRyTSevpSDiDhdgkVfr9Fgi6v8GZEhn82GuVPDoxLk/edit?usp=drivesdk
