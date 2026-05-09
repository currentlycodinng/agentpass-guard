import assert from "node:assert/strict";
import { ACTIONS, evaluateAction } from "../src/policy.js";

const basePolicy = {
  agentName: "Research Agent",
  dailyBudget: 0.25,
  autoThreshold: 0.02,
  allowedServices: ["pay-sh-research"],
  expiresHours: 24,
  revoked: false
};

assert.equal(evaluateAction(basePolicy, ACTIONS.allowed, 0).status, "approved");
assert.equal(evaluateAction(basePolicy, ACTIONS.blocked, 0).status, "blocked");
assert.equal(
  evaluateAction({ ...basePolicy, allowedServices: ["pay-sh-bigquery"] }, ACTIONS.approval, 0).status,
  "needs-approval"
);
assert.equal(evaluateAction({ ...basePolicy, revoked: true }, ACTIONS.allowed, 0).status, "blocked");
assert.equal(evaluateAction({ ...basePolicy, dailyBudget: 0.005 }, ACTIONS.allowed, 0).status, "blocked");

console.log("Policy checks passed.");
