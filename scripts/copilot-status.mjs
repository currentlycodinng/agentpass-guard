import fs from "node:fs";
import path from "node:path";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.resolve(process.cwd(), "../../.env"));
loadEnvFile(path.resolve(process.cwd(), ".env"));

const apiBase = process.env.COLOSSEUM_COPILOT_API_BASE || "https://copilot.colosseum.com/api/v1";
const token = process.env.COLOSSEUM_COPILOT_PAT;

if (!token) {
  console.error("Missing COLOSSEUM_COPILOT_PAT. Put it in .env or export it in your shell.");
  process.exit(1);
}

const response = await fetch(`${apiBase.replace(/\/$/, "")}/status`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

if (!response.ok) {
  console.error(`Copilot status check failed: HTTP ${response.status}`);
  process.exit(1);
}

const status = await response.json();
console.log(
  JSON.stringify(
    {
      authenticated: Boolean(status.authenticated),
      expiresAt: status.expiresAt || null,
      scope: status.scope || null,
      skillVersionHeader: response.headers.get("x-copilot-skill-version")
    },
    null,
    2
  )
);
