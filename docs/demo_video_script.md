# Demo Video Script — AgentPass Guard

**Target:** ≤3:00 · **Format:** Screen recording, voiceover only, **no camera**, **no slides**, **no code walkthrough**.
**Tool:** QuickTime (Cmd+Shift+5 → "Record Selected Portion") or Loom screen-only.
**Output:** Landscape 1920×1080 (or 1280×720). Upload to YouTube Unlisted.

## Pre-flight

- Open `https://currentlycodinng.github.io/agentpass-guard/` full screen.
- Click **Reset demo**. The Receipts table should say "No actions yet."
- Form set to defaults: budget 0.25, threshold 0.02, "Pay.sh Research API" + "Pay.sh BigQuery" checked, expiry 24h, Revoked unchecked.
- Mic level checked. Notifications off.
- **Everything happens on the website. No terminal, no slides, no code editor.**

---

## 0:00 — 0:15 · Open on the product (screen only)

*(Live site visible. Hover the hero.)*

> "This is AgentPass Guard. It's a policy simulator for AI agents that pay for APIs on Solana through pay.sh and x402-style flows. The pitch is simple: agents can now pay — we let humans decide what they're allowed to buy."

## 0:15 — 0:30 · The wedge in the UI

*(Scroll smoothly to the "How it works" cards.)*

> "Without a policy layer, builders either approve every micro-payment by hand or hand the agent unlimited credentials. Both fail. AgentPass Guard sits between the agent and the payment rail and explains every decision."

## 0:30 — 1:30 · The demo (the heart of the video)

*(Scroll to Step 1 — the policy form.)*

> "Step 1 — the human writes the policy. Daily budget 0.25 USDC, auto-approve under 0.02. Two services on the allowlist: Pay.sh Research and Pay.sh BigQuery. 24-hour expiry."

*(Click the green **Allowed API call**. Pause one second on the decision panel.)*

> "First action — a 0.008 USDC research call. Allowlist passes. Budget passes. It's under the auto-approval threshold. All four checks green, auto-approved, receipt written."

*(Click the red **Blocked tool**.)*

> "Second action — an unapproved scraping vendor. Allowlist check fails. Blocked before settlement. Zero lamports leave the wallet."

*(Click the amber **High-cost call**.)*

> "Third action — a BigQuery call. It's allowlisted but it's 0.075 USDC, which is above the threshold. AgentPass pauses for human approval instead of auto-paying."

*(Scroll down to the Receipts table.)*

> "Every decision lands in the audit trail. Builders can export the policy and the receipts as JSON, so they can test their agent against this guard before connecting any real spend."

## 1:30 — 2:00 · Solana proof — on the website only

*(Stay on the live site. Scroll to the dark "Solana proof" section.)*

> "Approved actions can settle on Solana devnet with a Memo-program receipt. Low fees, fast confirmation, and an inspectable trail — that's why agent payments belong on Solana."

> ⚠️ **Don't switch to a terminal.** Colosseum's prompt explicitly says "not a code walkthrough." The receipts table on the website already shows the proof. Keep the camera on the product.

## 2:00 — 2:30 · Closing

*(Scroll to the submission section at the bottom of the site.)*

> "AgentPass Guard isn't trying to replace pay.sh or x402 — those rails let agents pay. AgentPass is the policy and audit layer above them. Code, deck, and live demo are linked here. Thanks for watching."

---

## What NOT to do

- **No slides.** Colosseum's instructions are explicit: live product only.
- **No code walkthrough.** Don't open VS Code. Judges aren't reading your `policy.js`.
- **No camera.** Save the camera for the pitch video.
- **Don't read the script.** Glance, talk naturally.

## Compression checklist

- Keep the cursor moving but not jittery. Pause for 1 second on each decision panel.
- Speak ~150 words/min — natural pace, not rushed.
- Trim silence at the start/end before uploading.
- If it's >3:00, shorten the policy-form intro (0:30–0:50) and skim through it visually instead of describing every field.
