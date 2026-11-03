#!/usr/bin/env node
/**
 * Refresh the committed GitHub snapshots used by the site build.
 * Run with the GitHub CLI authenticated: `gh auth status`.
 *
 *   node scripts/snapshot-github.mjs
 *
 * The build reads these files; they are the fallback when the public API is
 * rate-limited (60 requests/hour per IP, which Cloudflare Pages shares).
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPO = "RIP-Comm/sossoldi";
const root = path.resolve(import.meta.dirname, "..");
const snapshots = path.join(root, "src/_data/snapshots");
fs.mkdirSync(snapshots, { recursive: true });

function gh(args) {
  return execFileSync("gh", args, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
}

const repo = JSON.parse(
  gh([
    "api",
    `repos/${REPO}`,
    "--jq",
    "{stars:.stargazers_count,forks:.forks_count,license:.license.spdx_id,description:.description,homepage:.homepage,topics:.topics}",
  ]),
);

const contributors = JSON.parse(
  gh([`api`, `repos/${REPO}/contributors?per_page=100`, "--jq", "length"]),
);

const releases = JSON.parse(
  gh([
    "api",
    `repos/${REPO}/releases?per_page=30`,
    "--jq",
    "[.[] | {name,tag_name,published_at,html_url,body,prerelease,draft}]",
  ]),
);

const github = {
  snapshotAt: new Date().toISOString(),
  repo: REPO,
  ...repo,
  contributors: typeof contributors === "number" ? contributors : 0,
};
const releasesData = {
  snapshotAt: new Date().toISOString(),
  releases: releases.filter((release) => !release.draft),
};

fs.writeFileSync(path.join(snapshots, "github.json"), `${JSON.stringify(github, null, 2)}\n`);
fs.writeFileSync(path.join(snapshots, "releases.json"), `${JSON.stringify(releasesData, null, 2)}\n`);

console.log(
  `github.json: ${github.stars} stars, ${github.forks} forks, ${github.contributors} contributors\n` +
    `releases.json: ${releasesData.releases.length} releases`,
);
