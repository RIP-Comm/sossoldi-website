#!/usr/bin/env node
/**
 * One-off migration: copy the ten Jekyll pages from the app repository into
 * src/en/docs with clean URLs, strip the Jekyll frontmatter and rewrite the
 * handful of internal links. The Italian tree is translated from these files.
 *
 *   node scripts/import-docs.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const docsSource = path.resolve(root, "../sossoldi/docs");
const target = path.join(root, "src/en");

const pages = [
  {
    from: "index.md",
    to: "docs/index.md",
    title: "Overview",
    navId: "overview",
    order: 10,
    lead: "What Sossoldi is, what it does, and where to go next.",
  },
  {
    from: "core-values.md",
    to: "docs/core-values.md",
    title: "Core Values",
    order: 20,
    lead: "The principles behind every decision in the app, the code and the community.",
  },
  {
    from: "roadmap.md",
    to: "docs/roadmap.md",
    title: "Roadmap",
    order: 30,
    lead: "Where the project is going, phase by phase — and what is already shipped.",
  },
  {
    from: "contributing/coding-style.md",
    to: "docs/contributing/coding-style.md",
    title: "Coding Style",
    order: 41,
    parent: "contributing",
    lead: "Conventions for Dart code, files and commits, so the review is about the change and not the formatting.",
  },
  {
    from: "contributing/PR-guide.md",
    to: "docs/contributing/pr-guide.md",
    title: "Pull request guide",
    navTitle: "Pull requests",
    order: 42,
    parent: "contributing",
    lead: "From fork to merged pull request, including the checks the CI runs.",
  },
  {
    from: "contributing/widget-list.md",
    to: "docs/contributing/widget-list.md",
    title: "Widget list",
    order: 43,
    parent: "contributing",
    lead: "The shared widgets the app is built from, and where to find them.",
  },
  {
    from: "setup/setup.md",
    to: "docs/setup/index.md",
    title: "Setup Guide",
    navId: "setup",
    order: 50,
    lead: "A working development environment from a clean machine: Git, Flutter, an IDE and the repository.",
  },
  {
    from: "setup/setup-linux-evironment.md",
    to: "docs/setup/linux.md",
    title: "Linux setup",
    navTitle: "Linux",
    order: 51,
    parent: "setup",
    lead: "Dependencies and Android SDK configuration for a Linux development machine.",
  },
  {
    from: "doc-guide.md",
    to: "docs/doc-guide.md",
    title: "Documentation guide",
    navTitle: "Writing docs",
    order: 60,
    lead: "How the documentation is written, reviewed and kept in sync with the app.",
  },
  {
    from: "privacy-policy.md",
    to: "docs/privacy-policy.md",
    title: "Privacy policy",
    order: 70,
    lead: "What the app stores, where it stores it, and what never leaves your device.",
  },
];

const linkMap = new Map([
  ["widget-list.html", "/docs/contributing/widget-list/"],
  ["setup/setup.html", "/docs/setup/"],
  ["../setup/setup.html", "/docs/setup/"],
  ["contributing/PR-guide.html", "/docs/contributing/pr-guide/"],
  ["privacy-policy.html", "/docs/privacy-policy/"],
  ["core-values.html", "/docs/core-values/"],
  ["roadmap.html", "/docs/roadmap/"],
  ["doc-guide.html", "/docs/doc-guide/"],
  ["index.html", "/docs/"],
]);

function stripFrontmatter(text) {
  return text.replace(/^---\n[\s\S]*?\n---\n/, "");
}

function stripFirstHeading(text) {
  return text.replace(/^\s*#\s+[^\n]*\n+/, "");
}

function rewrite(text) {
  let out = text
    .replaceAll('src="./assets/', 'src="/assets/docs/')
    .replaceAll('src="../assets/', 'src="/assets/docs/')
    .replaceAll('](./assets/', '](/assets/docs/')
    .replaceAll('](../assets/', '](/assets/docs/')
    .replaceAll('](assets/', '](/assets/docs/');

  for (const [from, to] of linkMap) {
    out = out.replaceAll(`](${from})`, `](${to})`);
  }
  return out;
}

fs.mkdirSync(target, { recursive: true });

for (const page of pages) {
  const source = path.join(docsSource, page.from);
  if (!fs.existsSync(source)) {
    console.error(`missing source: ${page.from}`);
    process.exitCode = 1;
    continue;
  }
  let body = rewrite(stripFirstHeading(stripFrontmatter(fs.readFileSync(source, "utf8")))).trimStart();
  const destination = path.join(target, page.to);
  fs.mkdirSync(path.dirname(destination), { recursive: true });

  const frontmatter = {
    title: page.title,
    ...(page.navTitle ? { navTitle: page.navTitle } : {}),
    description: page.lead,
    lead: page.lead,
    order: page.order,
    ...(page.parent ? { parent: page.parent } : {}),
    ...(page.navId ? { navId: page.navId } : {}),
    updated: "2026-11-03",
  };

  const yaml = Object.entries(frontmatter)
    .map(([key, value]) => `${key}: ${typeof value === "string" ? JSON.stringify(value) : value}`)
    .join("\n");

  fs.writeFileSync(destination, `---\n${yaml}\n---\n\n${body.trimEnd()}\n`);
  console.log(`imported ${page.from} → src/en/${page.to}`);
}

// Documentation images keep their relative structure under /assets/docs/.
const assetsSource = path.join(docsSource, "assets");
const assetsTarget = path.join(root, "src/assets/docs");
if (fs.existsSync(assetsSource)) {
  fs.cpSync(assetsSource, assetsTarget, { recursive: true });
  console.log("copied docs/assets → src/assets/docs");
}
