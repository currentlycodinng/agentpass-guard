# Technical Demo Script

Target length: 2 to 3 minutes.

## Walkthrough

1. Open the app.
   - Show the human policy panel.
   - Point out daily budget, allowed service, auto-approval threshold, expiry, and revocation.

2. Run the allowed action.
   - Select "Allowed API call".
   - Show that the service is allowlisted and the amount is below threshold.
   - Show the generated receipt and remaining budget.

3. Run the blocked action.
   - Select "Blocked tool".
   - Show that the service is not in the allowlist.
   - Show that no settlement receipt is created.

4. Run the approval-needed action.
   - Select "Needs approval".
   - Show that it is allowed but above the auto-approval threshold.

5. Show the code.
   - `src/policy.js` contains the policy checker.
   - `data/policies/research-agent-policy.json` shows the policy object.
   - `scripts/devnet-demo.mjs` creates a devnet payment and memo receipt.

6. Optional devnet proof.
   - Run `npm run devnet:demo`.
   - Show the printed explorer link if RPC and airdrop work.

## Technical Notes To Mention

- The app is static so judges can run it easily.
- The devnet script uses a temporary wallet and no secrets.
- The production version would put policy checks in wallet middleware or a server-side authorization layer.
- SPL USDC support is the natural next step after the lamport-based devnet proof.
