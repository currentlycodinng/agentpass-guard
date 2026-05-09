# Research Notes

Date: 2026-05-09

## Sources Checked

- Solana Agentic Payments docs: https://solana.com/docs/payments/agentic-payments
- Solana Agent Skills: https://solana.com/skills
- Pay.sh: https://pay.sh/
- Colosseum Copilot public AI Agent Payments example: https://docs.colosseum.com/copilot/examples/ai-agent-payments
- Superteam NL Frontier Side Track: https://superteam.fun/earn/listing/superteam-nl-x-aiso-or-frontier-hackathon-side-track
- Superteam NL First-Time Builders: https://superteam.fun/earn/listing/superteam-nl-x-aiso-or-frontier-hackathon-first-time-builders

## Main Finding

The agentic payments space is active. The strongest current primitive is pay-per-request API access through pay.sh/x402-style flows on Solana.

That makes a generic "AI agents can pay" pitch too broad. The stronger wedge is the missing control layer:

- Who sets the agent budget?
- Which APIs can it pay?
- What cost requires approval?
- How does a human revoke access?
- Where is the receipt trail?

## Product Decision

AgentPass Guard should not compete directly with pay.sh. It should sit above it.

- pay.sh/x402: payment rail and provider access.
- AgentPass Guard: human spending policy and audit layer.

## Copilot Status

The Colosseum Copilot skill is installed locally, but `COLOSSEUM_COPILOT_PAT` is not set in this shell. Because the skill requires the PAT before any API calls, private Copilot corpus queries were not run.

Official resource:

- Landing page: https://colosseum.com/copilot
- Docs: https://docs.colosseum.com/copilot/introduction
- Token page: https://arena.colosseum.org/copilot
- Install command: `npx skills add ColosseumOrg/colosseum-copilot`

To enable it later:

```bash
export COLOSSEUM_COPILOT_API_BASE="https://copilot.colosseum.com/api/v1"
export COLOSSEUM_COPILOT_PAT="your-token-here"
```

Then use it to validate competitors and sharpen the submission.

## Devnet Status

`npm run devnet:demo` reaches Solana devnet RPC when network access is allowed, but the public faucet returned 429 rate-limit errors during setup. The script includes retries and prints the temporary wallet address if manual funding is needed.

Current fallback:

- The app demonstrates policy decisions and simulated receipt hashes.
- The optional script is ready for a real devnet transaction when faucet access is available.

## Solana Skills Found

Official Solana skills page:

- https://solana.com/skills

Official install command from the page:

```bash
npx skills add https://github.com/solana-foundation/solana-dev-skill
```

Installed locally:

- `.agents/skills/solana-dev/SKILL.md`

Reference files downloaded into this project:

- `colosseum/agentpass-guard/reference-skills/solana-skill.md`
- `colosseum/agentpass-guard/reference-skills/colosseum-agent-hackathon-skill.md`

Most relevant official skills for this project:

- Common Errors & Solutions: useful for RPC, Anchor, CLI, and dependency errors.
- Tooling Version Compatibility Matrix: useful before adding Anchor or Solana CLI work.
- Tokens / Confidential Transfers: not needed for the current MVP, but relevant if AgentPass later supports private spend controls.

Relevant third-party skills listed by Solana:

- Solana Anchor Claude Skill: useful if we move from a static policy prototype to an Anchor program.
- Helius Skill: useful for RPC, DAS API, enhanced transactions, and webhooks.
- Metaplex Skill: not relevant to the current AgentPass wedge.
- DFlow / Jupiter-related skills: useful only if the product expands into trading or swaps.

Colosseum Agent Hackathon also exposes an agent skill file:

```bash
curl -s https://colosseum.com/skill.md
```

That skill is for the agent-hackathon flow, not the main Frontier side-track submission, but it is useful context for how agent-readable project APIs are structured.
