#!/usr/bin/env node
/**
 * Internal link checker (P6). Runs on the built site: every href/src that
 * points inside the site must resolve to a file in _site, and every fragment
 * must exist in the target document.
 *
 *   node scripts/check-links.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const site = path.join(root, "_site");
const skipPrefixes = ["/pagefind/", "/cdn-cgi/"];

if (!fs.existsSync(site)) {
  console.error("_site not found: run npm run build first.");
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const htmlFiles = walk(site);
const ids = new Map();

function collectIds(file) {
  const html = fs.readFileSync(file, "utf8");
  const found = new Set();
  for (const match of html.matchAll(/\sid="([^"]+)"/g)) found.add(match[1]);
  return found;
}

for (const file of htmlFiles) ids.set(file, collectIds(file));

function resolveTarget(urlPath) {
  let clean = decodeURIComponent(urlPath.split("?")[0]);
  if (clean.endsWith("/")) clean += "index.html";
  if (!path.extname(clean)) clean += "/index.html";
  const full = path.join(site, clean);
  return full;
}

let checked = 0;
const broken = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const page = "/" + path.relative(site, file).replace(/index\.html$/, "");
  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = match[1];
    if (!raw || raw.startsWith("http://") || raw.startsWith("https://")) continue;
    if (raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("data:") || raw.startsWith("#")) continue;
    if (!raw.startsWith("/")) continue;
    if (skipPrefixes.some((prefix) => raw.startsWith(prefix))) continue;

    checked += 1;
    const [pathPart, fragment] = raw.split("#");
    const target = resolveTarget(pathPart || "/");
    if (!fs.existsSync(target)) {
      broken.push({ page, link: raw, reason: "file not found" });
      continue;
    }
    if (fragment && ids.has(target) && !ids.get(target).has(fragment)) {
      broken.push({ page, link: raw, reason: "anchor not found" });
    }
  }
}

if (broken.length) {
  console.error(`Broken internal links: ${broken.length}`);
  for (const item of broken) console.error(`  ${item.page} → ${item.link} (${item.reason})`);
  process.exit(1);
}

console.log(`link check: ${checked} internal links across ${htmlFiles.length} pages, all good`);
