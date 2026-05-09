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

const apiBase = (process.env.COLOSSEUM_COPILOT_API_BASE || "https://copilot.colosseum.com/api/v1").replace(/\/$/, "");
const token = process.env.COLOSSEUM_COPILOT_PAT;

if (!token) {
  console.error("Missing COLOSSEUM_COPILOT_PAT. Put it in .env or export it in your shell.");
  process.exit(1);
}

async function post(endpoint, body) {
  const response = await fetch(`${apiBase}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${endpoint} failed: HTTP ${response.status} ${text}`);
  }
  return response.json();
}

function summarizeProjects(payload) {
  const items = payload.projects || payload.results || payload.items || [];
  return items.slice(0, 6).map((item) => ({
    name: item.name || item.title || item.projectName || "Unknown",
    slug: item.slug || item.projectSlug || item.id || null,
    score: item.score || item.similarity || null,
    hackathon: item.hackathon?.slug || item.hackathonSlug || item.hackathon || null,
    description: item.description || item.summary || item.shortDescription || null
  }));
}

function summarizeArchives(payload) {
  const items = payload.documents || payload.results || payload.items || [];
  return items.slice(0, 5).map((item) => ({
    title: item.title || item.documentTitle || item.name || "Unknown",
    documentId: item.documentId || item.id || null,
    score: item.score || item.similarity || null,
    snippet: item.snippet || item.summary || item.text || null
  }));
}

const checks = {
  broadOverlap: summarizeProjects(
    await post("/search/projects", {
      query: "agent wallet spending policy x402 Solana",
      limit: 6
    })
  ),
  acceleratorOverlap: summarizeProjects(
    await post("/search/projects", {
      query: "agent wallet spending policy x402 Solana",
      limit: 6,
      filters: { acceleratorOnly: true }
    })
  ),
  winnerOverlap: summarizeProjects(
    await post("/search/projects", {
      query: "agent wallet spending policy x402 Solana",
      limit: 6,
      filters: { winnersOnly: true }
    })
  ),
  narrowedOverlap: summarizeProjects(
    await post("/search/projects", {
      query: "policy simulator guardrail agent payments pay.sh x402",
      limit: 6
    })
  ),
  archiveContext: summarizeArchives(
    await post("/search/archives", {
      query: "agent payments policy wallet controls",
      limit: 5
    })
  )
};

console.log(JSON.stringify(checks, null, 2));
