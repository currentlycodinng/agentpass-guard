export const SERVICE_LABELS = {
  "pay-sh-research": "Pay.sh Research API",
  "pay-sh-bigquery": "Pay.sh BigQuery",
  "pay-sh-knowledge": "Pay.sh Knowledge Graph",
  "unapproved-scraper": "Unapproved Scraping API"
};

export const ACTIONS = {
  allowed: {
    id: "action-allowed-research",
    serviceId: "pay-sh-research",
    serviceName: SERVICE_LABELS["pay-sh-research"],
    amount: 0.008,
    description: "Find three cited sources for an AI payments market brief.",
    txMode: "simulated-devnet"
  },
  blocked: {
    id: "action-blocked-scraper",
    serviceId: "unapproved-scraper",
    serviceName: SERVICE_LABELS["unapproved-scraper"],
    amount: 0.006,
    description: "Pull untrusted scraped profile data from a non-approved vendor.",
    txMode: "none"
  },
  approval: {
    id: "action-approval-bigquery",
    serviceId: "pay-sh-bigquery",
    serviceName: SERVICE_LABELS["pay-sh-bigquery"],
    amount: 0.075,
    description: "Query a premium BigQuery dataset for a deeper research report.",
    txMode: "pending-human"
  }
};

export function buildPolicy(form) {
  const data = new FormData(form);
  return {
    agentName: String(data.get("agentName") || "Research Agent").trim(),
    dailyBudget: Number(data.get("dailyBudget") || 0),
    autoThreshold: Number(data.get("autoThreshold") || 0),
    allowedServices: data.getAll("allowedServices").map(String),
    expiresHours: Number(data.get("expiresHours") || 0),
    revoked: data.get("revoked") === "on"
  };
}

export function evaluateAction(policy, action, currentSpend) {
  const checks = [
    {
      label: "Pass active",
      passed: !policy.revoked && policy.expiresHours > 0,
      detail: policy.revoked ? "Revoked" : policy.expiresHours > 0 ? `${policy.expiresHours}h remaining` : "Expired"
    },
    {
      label: "Service allowlist",
      passed: policy.allowedServices.includes(action.serviceId),
      detail: policy.allowedServices.includes(action.serviceId) ? "Service is allowed" : "Service is not allowed"
    },
    {
      label: "Daily budget",
      passed: currentSpend + action.amount <= policy.dailyBudget,
      detail: `${formatUsdc(currentSpend + action.amount)} requested of ${formatUsdc(policy.dailyBudget)}`
    },
    {
      label: "Auto-approval threshold",
      passed: action.amount <= policy.autoThreshold,
      detail:
        action.amount <= policy.autoThreshold
          ? `${formatUsdc(action.amount)} is within threshold`
          : `${formatUsdc(action.amount)} needs human approval`
    }
  ];

  if (policy.revoked) {
    return {
      status: "blocked",
      title: "Blocked",
      reason: "This AgentPass has been revoked.",
      checks
    };
  }

  if (policy.expiresHours <= 0) {
    return {
      status: "blocked",
      title: "Blocked",
      reason: "This AgentPass has expired.",
      checks
    };
  }

  if (!policy.allowedServices.includes(action.serviceId)) {
    return {
      status: "blocked",
      title: "Blocked",
      reason: `${action.serviceName} is not on the allowed-service list.`,
      checks
    };
  }

  if (currentSpend + action.amount > policy.dailyBudget) {
    return {
      status: "blocked",
      title: "Blocked",
      reason: "This action would exceed the daily budget.",
      checks
    };
  }

  if (action.amount > policy.autoThreshold) {
    return {
      status: "needs-approval",
      title: "Human approval needed",
      reason: `The action costs ${formatUsdc(action.amount)}, above the auto-approval threshold.`,
      checks
    };
  }

  return {
    status: "approved",
    title: "Approved",
    reason: "The service, amount, budget, and expiry match the policy.",
    checks
  };
}

export function formatUsdc(amount) {
  return `${amount.toFixed(3)} USDC`;
}

export function makeReceipt(policy, action, decision, currentSpend) {
  const now = new Date();
  const hash = decision.status === "approved" ? makeMockHash(action.id, now) : "not-settled";
  return {
    id: `${action.id}-${now.getTime()}`,
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    agentName: policy.agentName || "Research Agent",
    serviceName: action.serviceName,
    amount: action.amount,
    decision: decision.title,
    status: decision.status,
    reason: decision.reason,
    checks: decision.checks,
    actionDescription: action.description,
    receiptHash: hash,
    remainingBudget: Math.max(policy.dailyBudget - currentSpend - (decision.status === "approved" ? action.amount : 0), 0)
  };
}

function makeMockHash(input, now) {
  const raw = `${input}:${now.toISOString()}`;
  let hash = 0;
  for (let index = 0; index < raw.length; index += 1) {
    hash = (hash << 5) - hash + raw.charCodeAt(index);
    hash |= 0;
  }
  return `sim-${Math.abs(hash).toString(16).padStart(8, "0")}`;
}
