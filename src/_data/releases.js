import fs from "node:fs";
import path from "node:path";

const snapshotPath = path.join(import.meta.dirname, "snapshots", "releases.json");
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));

const REPO = "RIP-Comm/sossoldi";

async function fetchLive() {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "sossoldi-website" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, {
    headers,
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  const releases = await response.json();
  return releases.filter((release) => !release.draft);
}

export default async function () {
  let releases = snapshot.releases;
  let source = "snapshot";
  if (process.env.SOSSOLDI_LIVE_DATA === "1") {
    try {
      releases = await fetchLive();
      source = "live";
    } catch (error) {
      console.warn(`[releases] live data unavailable (${error.message}); using snapshot`);
    }
  }

  const sorted = [...releases].sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at),
  );

  return {
    source,
    snapshotAt: snapshot.snapshotAt,
    latest: sorted[0] || null,
    list: sorted,
  };
}
