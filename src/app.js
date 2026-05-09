import {
  ACTIONS,
  SERVICE_LABELS,
  buildPolicy,
  evaluateAction,
  formatUsdc,
  makeReceipt
} from "./policy.js";

const form = document.querySelector("#policy-form");
const policySummary = document.querySelector("#policy-summary");
const decisionBox = document.querySelector("#decision-box");
const receiptBody = document.querySelector("#receipt-body");
const resetButton = document.querySelector("#reset-demo");
const exportPolicyButton = document.querySelector("#export-policy");
const exportReceiptsButton = document.querySelector("#export-receipts");
const actionButtons = Array.from(document.querySelectorAll("[data-action]"));

let receipts = [];

function currentSpend() {
  return receipts
    .filter((receipt) => receipt.status === "approved")
    .reduce((total, receipt) => total + receipt.amount, 0);
}

function renderPolicySummary() {
  const policy = buildPolicy(form);
  const allowed = policy.allowedServices.map((id) => SERVICE_LABELS[id] || id).join(", ");
  const spent = currentSpend();
  policySummary.innerHTML = `
    <div>
      <p class="metric">${formatUsdc(spent)} spent</p>
      <p class="muted">of ${formatUsdc(policy.dailyBudget)} daily budget</p>
    </div>
    <div>
      <p class="metric">${formatUsdc(policy.autoThreshold)}</p>
      <p class="muted">auto-approval threshold</p>
    </div>
    <div>
      <p class="metric">${allowed}</p>
      <p class="muted">${policy.expiresHours}h expiry${policy.revoked ? ", revoked" : ""}</p>
    </div>
  `;
}

function renderDecision(receipt) {
  const toneClass = {
    approved: "approved",
    blocked: "blocked",
    "needs-approval": "needs-approval"
  }[receipt.status];

  decisionBox.className = `decision-box ${toneClass}`;
  decisionBox.innerHTML = `
    <p class="label">${receipt.decision}</p>
    <h4>${receipt.serviceName}</h4>
    <p>${receipt.reason}</p>
    <ul class="check-list">
      ${receipt.checks
        .map(
          (check) => `
            <li class="${check.passed ? "check-pass" : "check-fail"}">
              <span>${check.passed ? "Pass" : "Flag"}</span>
              <strong>${check.label}</strong>
              <em>${check.detail}</em>
            </li>
          `
        )
        .join("")}
    </ul>
    <dl>
      <div><dt>Amount</dt><dd>${formatUsdc(receipt.amount)}</dd></div>
      <div><dt>Remaining budget</dt><dd>${formatUsdc(receipt.remainingBudget)}</dd></div>
      <div><dt>Receipt</dt><dd>${receipt.receiptHash}</dd></div>
    </dl>
  `;
}

function exportJson(filename, payload) {
  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function buildPolicyExport() {
  const policy = buildPolicy(form);
  return {
    schema: "agentpass.guard.policy.v0",
    exportedAt: new Date().toISOString(),
    policy,
    currentSpend: currentSpend(),
    integrationTarget: "pay.sh/x402-style Solana agent payments",
    guardrails: [
      "active pass",
      "allowed service",
      "daily budget",
      "auto-approval threshold",
      "revocation"
    ]
  };
}

function renderReceipts() {
  if (receipts.length === 0) {
    receiptBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">No actions yet. Run the scripted agent to create receipts.</td>
      </tr>
    `;
    return;
  }

  receiptBody.innerHTML = receipts
    .map(
      (receipt) => `
        <tr>
          <td>${receipt.time}</td>
          <td>${receipt.agentName}</td>
          <td>${receipt.serviceName}</td>
          <td>${formatUsdc(receipt.amount)}</td>
          <td><span class="badge ${receipt.status}">${receipt.decision}</span></td>
          <td><code>${receipt.receiptHash}</code></td>
        </tr>
      `
    )
    .join("");
}

function runAction(actionKey) {
  const policy = buildPolicy(form);
  const action = ACTIONS[actionKey];
  const decision = evaluateAction(policy, action, currentSpend());
  const receipt = makeReceipt(policy, action, decision, currentSpend());
  receipts = [receipt, ...receipts].slice(0, 10);
  renderDecision(receipt);
  renderReceipts();
  renderPolicySummary();
}

actionButtons.forEach((button) => {
  button.addEventListener("click", () => runAction(button.dataset.action));
});

form.addEventListener("input", renderPolicySummary);

resetButton.addEventListener("click", () => {
  receipts = [];
  decisionBox.className = "decision-box";
  decisionBox.innerHTML = `
    <p class="label">Waiting for agent action</p>
    <p>Select an action to see the policy decision, guardrail checks, receipt, and remaining budget.</p>
  `;
  renderReceipts();
  renderPolicySummary();
});

exportPolicyButton.addEventListener("click", () => {
  exportJson("agentpass-guard-policy.json", buildPolicyExport());
});

exportReceiptsButton.addEventListener("click", () => {
  exportJson("agentpass-guard-receipts.json", {
    schema: "agentpass.guard.receipts.v0",
    exportedAt: new Date().toISOString(),
    receipts
  });
});

renderPolicySummary();
renderReceipts();
