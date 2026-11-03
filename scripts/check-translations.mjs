#!/usr/bin/env node
/**
 * Translation guard (P6).
 *
 * Every Italian page carries `source_hash`, the sha256 of the English body it
 * was translated from. If the English body changes and the hash is not updated,
 * `npm run build` fails and prints the pairs to review.
 *
 *   node scripts/check-translations.mjs           # check
 *   node scripts/check-translations.mjs --write   # re-stamp after a review
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(import.meta.dirname, "..");
const write = process.argv.includes("--write");

const pairs = [];
const enRoot = path.join(root, "src/en");
const itRoot = path.join(root, "src/it");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

for (const enFile of walk(enRoot)) {
  const relative = path.relative(enRoot, enFile);
  pairs.push({ en: enFile, it: path.join(itRoot, relative), relative });
}

function split(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { frontmatter: "", body: text };
  return { frontmatter: match[1], body: text.slice(match[0].length) };
}

function hashBody(body) {
  return crypto
    .createHash("sha256")
    .update(body.replace(/\r\n/g, "\n").trim() + "\n")
    .digest("hex");
}

const missing = [];
const stale = [];

for (const pair of pairs) {
  if (!fs.existsSync(pair.it)) {
    missing.push(pair.relative);
    continue;
  }
  const en = split(fs.readFileSync(pair.en, "utf8"));
  const it = split(fs.readFileSync(pair.it, "utf8"));
  const expected = hashBody(en.body);
  const recorded = (it.frontmatter.match(/^source_hash:\s*"?([a-f0-9]{64})"?$/m) || [])[1];

  if (write) {
    let frontmatter = it.frontmatter;
    if (recorded) frontmatter = frontmatter.replace(/^source_hash:.*$/m, `source_hash: "${expected}"`);
    else frontmatter = `${frontmatter}\nsource_hash: "${expected}"`;
    fs.writeFileSync(pair.it, `---\n${frontmatter}\n---\n${it.body}`);
    continue;
  }

  if (recorded !== expected) stale.push({ ...pair, recorded, expected });
}

if (write) {
  console.log(`translation guard: stamped ${pairs.length - missing.length} Italian pages`);
  if (missing.length) console.warn(`missing Italian pages:\n- ${missing.join("\n- ")}`);
  process.exit(missing.length ? 1 : 0);
}

if (missing.length) {
  console.error(`Missing Italian pages (${missing.length}):`);
  for (const file of missing) console.error(`  - ${file}`);
}

if (stale.length) {
  console.error(`\nOut-of-date translations (${stale.length}):`);
  for (const item of stale) {
    const state = item.recorded ? "source changed since the translation" : "source_hash missing";
    console.error(`  - ${item.relative} — ${state}`);
  }
  console.error("\nReview the Italian page, then run: npm run translations:stamp");
}

if (missing.length || stale.length) process.exit(1);

console.log(`translation guard: ${pairs.length} pairs in sync`);
