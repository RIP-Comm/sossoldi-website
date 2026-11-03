import fs from "node:fs";
import path from "node:path";

const snapshotPath = path.join(import.meta.dirname, "snapshots", "github.json");
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));

const REPO = "RIP-Comm/sossoldi";

async function fetchLive() {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "sossoldi-website" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const repoResponse = await fetch(`https://api.github.com/repos/${REPO}`, {
    headers,
    signal: AbortSignal.timeout(5000),
  });
  if (!repoResponse.ok) throw new Error(`GitHub API ${repoResponse.status}`);

  const contributorsResponse = await fetch(
    `https://api.github.com/repos/${REPO}/contributors?per_page=1`,
    { headers, signal: AbortSignal.timeout(5000) },
  );
  if (!contributorsResponse.ok) throw new Error(`GitHub API ${contributorsResponse.status}`);

  const repo = await repoResponse.json();
  const link = contributorsResponse.headers.get("link") || "";
  const lastPage = Number(link.match(/[?&]page=(\d+)>; rel="last"/)?.[1] || "1");

  return {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    license: repo.license?.spdx_id,
    description: repo.description,
    homepage: repo.homepage,
    topics: repo.topics,
    contributors: lastPage,
    snapshotAt: new Date().toISOString(),
    source: "live",
  };
}

/**
 * Live numbers when SOSSOLDI_LIVE_DATA=1 and the API answers, otherwise the
 * committed snapshot. A rate limit can never break the deploy.
 */
export default async function () {
  const base = { ...snapshot, source: "snapshot" };
  if (process.env.SOSSOLDI_LIVE_DATA !== "1") return base;
  try {
    return { ...base, ...(await fetchLive()) };
  } catch (error) {
    console.warn(`[github] live data unavailable (${error.message}); using snapshot`);
    return base;
  }
}
