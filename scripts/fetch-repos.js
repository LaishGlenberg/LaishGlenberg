/**
 * One-shot script: downloads all repos + READMEs from GitHub
 * and writes src/repos-data.json. Run whenever you want fresh data.
 *
 * Usage:  node scripts/fetch-repos.js
 *         node scripts/fetch-repos.js GITHUB_TOKEN   (to avoid rate limits)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OWNER = "LaishGlenberg";

// ── Featured repos (mirrors src/config.js) ──────────────
const FEATURED_REPOS = [
  "deepseek-v4-for-copilot",
  "firebase-emulator-mcp",
  "arrowhead-scaler-figma-plugin",
  "termai",
  "split-image-to-pdf",
  "image-moment-react-site",
];

// ── Helpers ─────────────────────────────────────────────
const token = process.argv[2] || "";
const headers = { Accept: "application/vnd.github+json" };
if (token) headers.Authorization = `Bearer ${token}`;

async function api(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} for ${url}`);
  }
  return res.json();
}

async function fetchReadme(repoName) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${repoName}/readme`,
      { headers: { ...headers, Accept: "application/vnd.github.raw+json" } },
    );
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

// ── Main ────────────────────────────────────────────────
const allRepos = await api(
  `https://api.github.com/users/${OWNER}/repos?sort=updated&per_page=100`,
);

const repos = allRepos
  .filter((r) => !r.fork)
  .map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description || "",
    html_url: r.html_url,
    language: r.language,
    stargazers_count: r.stargazers_count,
  }));

// Fetch READMEs for featured repos only
for (const repo of repos) {
  if (FEATURED_REPOS.includes(repo.name)) {
    process.stdout.write(`Fetching README for ${repo.name}… `);
    const readme = await fetchReadme(repo.name);
    repo.readme = readme;
    process.stdout.write(readme ? "OK\n" : "not found\n");
  }
}

// Write output
const outPath = path.join(__dirname, "..", "src", "repos-data.json");
fs.writeFileSync(outPath, JSON.stringify({ repos }, null, 2), "utf-8");
console.log(`\n✓ Wrote ${repos.length} repos to ${outPath}`);
