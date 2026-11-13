/** Refresh the public, non-fork repository list: npm run fetch-data */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const owner = "LaishGlenberg";
const outPath = fileURLToPath(new URL("../src/repos-data.json", import.meta.url));
const token = process.env.GITHUB_TOKEN || process.argv[2];
const headers = { Accept: "application/vnd.github+json" };
if (token) headers.Authorization = `Bearer ${token}`;

async function main() {
  let existing = { repos: [] };
  try {
    existing = JSON.parse(await readFile(outPath, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (!Array.isArray(existing.repos)) throw new Error("Invalid repository data: repos must be an array");

  const fetched = [];
  for (let page = 1; ; page++) {
    const url = `https://api.github.com/users/${owner}/repos?per_page=100&page=${page}`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}: ${await response.text()}`);
    }
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error("GitHub API returned an invalid repository list");
    fetched.push(...batch.filter((repo) => !repo.fork));
    if (batch.length < 100) break;
  }

  const previous = new Map(existing.repos.map((repo) => [repo.id, repo]));
  const current = new Map(fetched.map((repo) => [repo.id, {
    ...previous.get(repo.id),
    id: repo.id,
    name: repo.name,
    description: repo.description || "",
    html_url: repo.html_url,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
  }]));

  // Keep existing order and extra fields to avoid unrelated changes in the data file.
  const repos = existing.repos.filter((repo) => current.has(repo.id)).map((repo) => current.get(repo.id));
  const added = [...current.values()].filter((repo) => !previous.has(repo.id));
  added.sort((a, b) => a.name.localeCompare(b.name));
  repos.push(...added);
  const removed = existing.repos.filter((repo) => !current.has(repo.id)).length;
  const updated = repos.filter((repo) => previous.has(repo.id) &&
    JSON.stringify(previous.get(repo.id)) !== JSON.stringify(repo)).length;

  if (!added.length && !removed && !updated) {
    console.log(`Repository list is already up to date (${repos.length} repositories).`);
    return;
  }

  await writeFile(outPath, JSON.stringify({ ...existing, repos }, null, 2) + "\n", "utf8");
  console.log(`Updated repository list: ${added.length} added, ${removed} removed, ${updated} updated (${repos.length} total).`);
}

main().catch((error) => {
  console.error(`Could not refresh repositories: ${error.message}`);
  process.exitCode = 1;
});
