# Loom Recording Script — AgentPass Guard

**Target length:** 1:50 – 2:10
**Tools:** Loom (camera + screen), Chrome at `http://127.0.0.1:4173/`, terminal in second tab.
**Pre-flight:** `npm run check` passes, the live site is open, the deck is open in a third tab, mic level checked.

---

## 0:00 — 0:10 · Hook (camera on)

> "AI agents can now pay for APIs on Solana through pay.sh and x402. The unsolved problem is the next one: who decides what the agent is actually allowed to buy? That's AgentPass Guard."

*(Switch to screen — site hero visible.)*

## 0:10 — 0:25 · The wedge

> "Right now builders have two bad options: approve every micro-payment by hand, which kills autonomy, or hand the agent unlimited wallet access, which is unsafe. AgentPass Guard sits above the payment rail. The rail lets agents pay; we let humans control the spend."

*(Scroll to the "How it works" section. Hover the highlighted middle card.)*

## 0:25 — 1:15 · Live demo (most important 50 seconds)

*(Scroll to the demo. Move slowly — the form is the product.)*

> "On the left, a human writes the policy: a 0.25 USDC daily budget, an auto-approval threshold of 0.02, two allowlisted services, a 24-hour expiry."

*(Click "Allowed API call".)*

> "First action — a 0.008 USDC research API call. Allowlist passes, budget passes, it's under the auto-approval threshold, so it auto-approves and a receipt is written."

*(Click "Blocked tool".)*

> "Second action — an unapproved scraping vendor. Allowlist check fails. Blocked before settlement. No payment leaves the wallet."

*(Click "High-cost call".)*

> "Third action — a BigQuery call that is allowlisted but costs 0.075 USDC. Above threshold, so it pauses for human approval instead of auto-paying."

*(Pan down to the Receipts table.)*

> "Every decision lands in the audit log with the service, the amount, and the receipt hash. Builders can export both the policy and the receipts as JSON to test their agent against this guard before going live."

## 1:15 — 1:40 · Solana proof

*(Scroll to the dark "Solana proof" panel. Switch to terminal.)*

> "Approved actions can settle on Solana devnet. The included script creates a temp wallet, sends a tiny payment, and attaches a Memo-program receipt."

*(Run `npm run devnet:demo` — or `--simulate` if you don't have a funded explorer link cached. Hold on the explorer URL or simulated receipt JSON for ~3 seconds.)*

> "Solana fits because agent payments are small, frequent, and need receipts. Low fees and fast confirmation make this practical."

## 1:40 — 2:00 · Closing positioning

*(Camera back on, or stay on the site footer.)*

> "AgentPass Guard isn't trying to replace pay.sh or x402 — those rails let agents pay. AgentPass is the policy and audit layer above them. First users are AI builders and small teams who want their agents to use paid APIs without exposing unlimited credentials. Code, demo, and deck are linked in the description. Thanks."

---

## Cut list (if you go long)

- Drop the "two bad options" sentence (saves ~7s).
- Combine the second and third demo actions into one beat ("blocked because not allowlisted; high-cost paused for human").
- Skip the live `npm run devnet:demo` and just point at the dark panel + the explorer link in the README.

## Things to nail

- **Cursor discipline.** Pause on each decision card for one full second before clicking the next.
- **No reading.** Glance at the script, look at camera or screen. Don't read off it.
- **Energy delta.** Slightly higher energy on the hook and the closer. Calmer in the demo.
- **First-take posture.** Re-record the whole thing rather than splicing — judges feel splice cuts.
