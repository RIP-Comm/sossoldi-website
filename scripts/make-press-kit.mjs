#!/usr/bin/env node
/**
 * Build the downloadable press kit (P5) from the same assets the site uses.
 * Output: src/assets/press/sossoldi-press-kit.zip
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const assets = path.join(root, "src/assets");
const staging = fs.mkdtempSync(path.join(os.tmpdir(), "sossoldi-press-"));
const out = path.join(assets, "press", "sossoldi-press-kit.zip");

function copy(from, to) {
  fs.mkdirSync(path.dirname(path.join(staging, to)), { recursive: true });
  fs.copyFileSync(path.join(assets, from), path.join(staging, to));
}

const boilerplateEn = `Sossoldi is a free and open source wealth management app for iOS and Android. It tracks accounts, investments, budgets and recurring payments, and turns them into one number: your net worth. Everything is stored on the device — there is no account to create, no subscription and no Sossoldi server. Built with Flutter and released under the MIT licence, Sossoldi is developed in the open by a community of contributors, with a public roadmap and public discussions. The app is available on the App Store, Google Play and F-Droid.

Website: https://sossoldi.com
Source code: https://github.com/RIP-Comm/sossoldi
Licence: MIT
`;

const boilerplateIt = `Sossoldi è un'app gratuita e open source per gestire il patrimonio su iOS e Android. Tiene traccia di conti, investimenti, budget e pagamenti ricorrenti, e li riduce a un solo numero: il patrimonio netto. Tutto resta sul dispositivo: non c'è un account da creare, non c'è un abbonamento, non c'è un server Sossoldi. Scritta in Flutter e rilasciata con licenza MIT, è sviluppata apertamente da una community di contributor, con roadmap e discussioni pubbliche. L'app è disponibile su App Store, Google Play e F-Droid.

Sito: https://sossoldi.com
Codice sorgente: https://github.com/RIP-Comm/sossoldi
Licenza: MIT
`;

const facts = `# Sossoldi — fact sheet

- Name: Sossoldi
- What it is: wealth management, personal finance and net worth tracking app
- Platforms: iOS (App Store), Android (Google Play, F-Droid)
- Licence: MIT
- Price: free, no paid tier, no advertising
- App languages: English; Italian and Portuguese in progress
- First release: 0.1.0-beta, 4 December 2024
- Stable release: 1.0.0, 20 August 2026
- Source code: https://github.com/RIP-Comm/sossoldi
- Website: https://sossoldi.com
- Press contact: help.sossoldi@gmail.com

## Description (100 words)

Sossoldi is a free and open source wealth management app for iOS and Android. It tracks accounts, investments, budgets and recurring payments, and turns them into one number: your net worth. Everything is stored on the device — there is no account to create, no subscription and no Sossoldi server. Built with Flutter and released under the MIT licence, Sossoldi is developed in the open by a community of contributors, with a public roadmap and public discussions. The app is available on the App Store, Google Play and F-Droid.

## Colours

- Ink #00152D
- Paper #F1F5F9
- Structure #023B79
- Positive #248731
- Negative #C52626

## Typography

Nunito Sans, weights 300–900 (OFL). Wordmark set in Nunito Sans Black.
`;

fs.mkdirSync(path.join(staging, "screens"), { recursive: true });
copy("img/sossoldi-icon.png", "sossoldi-icon.png");
copy("img/sossoldi-icon.png", "sossoldi-icon-512.png");
copy("docs/sossoldi_project_cover.jpg", "sossoldi-cover.jpg");
for (let i = 1; i <= 5; i += 1) copy(`img/screens/0${i}.png`, `screens/sossoldi-0${i}.png`);
copy("css/tokens.css", "palette.css");

fs.writeFileSync(path.join(staging, "boilerplate-en.md"), boilerplateEn);
fs.writeFileSync(path.join(staging, "boilerplate-it.md"), boilerplateIt);
fs.writeFileSync(path.join(staging, "fact-sheet.md"), facts);
fs.writeFileSync(
  path.join(staging, "README.txt"),
  `Sossoldi press kit — generated ${new Date().toISOString().slice(0, 10)}

Contents
  boilerplate-en.md / boilerplate-it.md  short description, ready to paste
  fact-sheet.md                          facts, colours, typography
  sossoldi-icon.png                      512×512 app icon
  sossoldi-cover.jpg                     project cover
  screens/                               five screenshots of the released app
  palette.css                            design tokens (single source of truth)

The screenshots are real captures of the released app, not mockups.
Please link to https://sossoldi.com rather than copying pages.
Press contact: help.sossoldi@gmail.com
`,
);

fs.mkdirSync(path.join(assets, "press"), { recursive: true });
fs.rmSync(out, { force: true });
execFileSync("zip", ["-r", "-q", out, "."], { cwd: staging });
fs.rmSync(staging, { recursive: true, force: true });

const size = (fs.statSync(out).size / 1024 / 1024).toFixed(1);
console.log(`press kit: src/assets/press/sossoldi-press-kit.zip (${size} MB)`);
