# Submissions — AgentPass Guard

Copy/paste-ready answers for every form.
Last verified: 2026-05-10.

## Master link pack

| Field | Value |
|---|---|
| Live demo | `https://currentlycodinng.github.io/agentpass-guard/` |
| GitHub repo | `https://github.com/currentlycodinng/agentpass-guard` |
| Pitch deck (Google Slides) | `https://docs.google.com/presentation/d/18eGCgYkq3uaEZ5zpnDfH_EPuLrDwhxyjiLDce4GCXw0/edit?usp=sharing` |
| Pitch deck (PDF backup) | `https://currentlycodinng.github.io/agentpass-guard/deliverables/agentpass-guard-frontier-deck.pdf` |
| Pitch video | `https://youtu.be/olA4Mg2w62c` |

---

# 1. Colosseum Frontier

Form: arena.colosseum.org → your project page

## Project name
```
AgentPass Guard
```

## Brief description
*(≤500 chars · this is 274)*
```
AgentPass Guard is a local-first policy simulator and guard layer for AI agents using pay.sh / x402-style Solana payments. Builders set the budget, allowlist, auto-approval threshold, expiry, and revocation — every paid action gets checked and explained before settlement.
```

## Project website
```
https://currentlycodinng.github.io/agentpass-guard/
```

## What are you building, and who is it for?
*(≤1000 chars · this is 962)*
```
AgentPass Guard is a local-first spending-policy simulator and guard layer for AI agents that pay for APIs on Solana. It is for AI builders, student teams, and small companies who want their agents to use paid services without giving them unlimited wallet access or raw API keys.

A human creates a pass for an agent with a daily budget, allowed services, an auto-approval threshold, expiry, and revocation. When the agent requests a paid call, AgentPass evaluates the policy and explains the exact guardrail result. Inside policy: the call can settle on Solana with a Memo-program receipt. Outside policy: blocked or paused for human approval.

The demo runs one research agent through three actions — an approved API call, a blocked unapproved vendor, and an allowed-but-high-cost call that requires human approval. Builders can export the policy and receipt log as JSON to test their agents before connecting real spend.
```

## Why did you decide to build this, and why build it now?
*(≤1000 chars · this is 968)*
```
AI agents are moving from chat to execution — they search, write code, call tools, and now pay for APIs through pay.sh and x402-style flows on Solana. That unlocks useful workflows but creates the next problem: agents need spending power and humans need a way to limit it.

Without a control layer, builders either approve every micro-payment by hand (which kills autonomy) or hand the agent unlimited credentials (which is unsafe). The base payment rail is arriving now; the builder-facing policy and audit layer is still thin.

We built AgentPass Guard because the wedge is narrow enough to demo, real enough to use, and points toward a production guardrail for teams running many agents. Solana fits because agent payments are small, frequent, programmatic, and benefit from low fees, fast settlement, and inspectable transaction-and-memo receipt trails. The next layer above the rail is policy: what is this agent allowed to buy?
```

## What technologies are you using or integrating with?
```
• Solana devnet and the Solana Memo program for receipt metadata
• @solana/web3.js for the optional devnet payment + receipt script
• pay.sh / x402-compatible request and response model
• Static web app: HTML, CSS, ES modules — no backend required
• Pure JavaScript policy evaluator with unit-style assertion checks (npm run check)
• JSON policy and receipt exports for builder-side testing
• Puppeteer (headless Chrome) for live-site screenshot capture and PDF deck rendering
• pptxgenjs for the PowerPoint deck pipeline
• GitHub Pages for static hosting and the public deck PDF
• Colosseum Copilot for competitor and archive validation against the agentic-payments space
• Solana Agent Skills (solana-foundation/solana-dev-skill) for development reference
• Claude Code (Anthropic) as the AI coding assistant during the build
```

## Category
```
AI / Agents
```
*If "AI / Agents" isn't listed, fall back in this order: Consumer → Infrastructure → DePIN.*

## Is your project a mobile-focused dApp?
```
No
```

## Country (for Superteam NL eligibility)
```
Netherlands
```
*Setting Netherlands here is required for both Superteam NL tracks below.*

---

# 2. Superteam NL × AISO Frontier — Side Track

Form: https://superteam.fun/earn/listing/superteam-nl-x-aiso-or-frontier-hackathon-side-track

**Prize pool:** 8,000 USDG · **Winners announced:** 2026-05-27
**Eligibility:** Submit to Colosseum (Netherlands), submit here, attend Dutch Demo Day in person.

## Project Title
```
AgentPass Guard
```

## Project Description
*(use the same brief description as Colosseum)*
```
AgentPass Guard is a local-first policy simulator and guard layer for AI agents using pay.sh / x402-style Solana payments. Builders set the budget, allowlist, auto-approval threshold, expiry, and revocation — every paid action gets checked and explained before settlement.

The demo runs one research agent through three actions: an approved API call, a blocked unapproved vendor, and an allowed-but-high-cost call that requires human approval. Builders can export the policy and receipt log as JSON to test their agents before connecting real spend. The optional devnet script settles a tiny payment with a Memo-program receipt and prints an explorer link.

It is for AI builders and small teams who want their agents to use paid APIs without exposing unlimited credentials. The base payment rail is here — pay.sh, x402, Solana settlement. AgentPass Guard adds the missing control plane on top: budgets, allowlists, thresholds, revocation, and receipts.
```

## Project GitHub Link
```
https://github.com/currentlycodinng/agentpass-guard
```

## Project Website
```
https://currentlycodinng.github.io/agentpass-guard/
```

## Did you submit this project to the official Frontier Hackathon on Colosseum?
```
Yes
```

## Link to your Colosseum profile
*(grab this from arena.colosseum.org after Colosseum submission goes through. Format will be like:)*
```
https://arena.colosseum.org/projects/agentpass-guard
```

## Link to your Loom / Demo Video
```
https://youtu.be/olA4Mg2w62c
```

## Slide-deck Link
```
https://docs.google.com/presentation/d/18eGCgYkq3uaEZ5zpnDfH_EPuLrDwhxyjiLDce4GCXw0/edit?usp=sharing
```

## Project Twitter Profile Link *(optional)*
```
(leave blank unless you have one)
```

## Telegram account
```
(your @handle)
```

---

# 3. Superteam NL × AISO Frontier — First-Time Builders

Form: https://superteam.fun/earn/listing/superteam-nl-x-aiso-or-frontier-hackathon-first-time-builders

**Prize pool:** 2,000 USDG · **Winners announced:** 2026-05-27
**Eligibility:** Same as Side Track **+** this must be your first Solana project. **+** judges also evaluate how much Solana knowledge you developed during the hackathon.

## Eligibility self-check before you submit

- [ ] This is my first Solana project (no prior Solana code, no prior shipped Solana projects)
- [ ] I will physically attend Dutch Demo Day
- [ ] I have submitted to Colosseum Frontier with Netherlands selected
- [ ] I have submitted to the Side Track listing above

If any of these is false, **do not submit to this track** — you can still win the Side Track and the main Colosseum prize.

## All form fields

Use the **same answers as the Side Track above** for every shared field. The two tracks have identical form structure.

## "What did you learn?" / first-time-builder context

If the form asks what you learned, paste this *(if no such field, skip)*:
```
This was my first Solana project. During the hackathon I learned:
• How to create a devnet keypair, request airdrops, and inspect transactions on the Solana explorer
• How to send a transfer with @solana/web3.js and attach receipt metadata via the Solana Memo program
• How agent-paid APIs work in practice through pay.sh / x402 patterns
• Why Solana's low fees and fast confirmation make sub-cent agent payments economically viable
• How to map a builder-side policy layer (budget, allowlist, threshold, revocation) onto on-chain settlement so every approved action produces an inspectable receipt trail
```

---

# Final pre-submit verification

Before hitting submit on either form:

1. **Watch the YouTube video back once.** Make sure it loads, plays, and represents the product fairly. The current URL is a Short — if it's <60s vertical, judges will see a cropped strip; consider re-recording landscape if you have time.
2. **Open the Google Slides URL in incognito.** Confirm it shows the deck without a "Request access" wall.
3. **Click the live demo link.** Confirm `currentlycodinng.github.io/agentpass-guard/` loads with the hero, demo cards, and decision panel working.
4. **Click the GitHub link.** Confirm the repo is public and README shows the project description.

After Colosseum is submitted, grab your Colosseum project URL and paste it into the Superteam fields.

# Submission order

1. Colosseum Frontier (must be first — Superteam needs the project URL)
2. Superteam Side Track
3. Superteam First-Time Builders *(only if this is your first Solana project)*
