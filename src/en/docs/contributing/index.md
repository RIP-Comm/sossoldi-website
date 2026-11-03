---
title: "Contributing"
description: "How to report a bug, propose a feature, or open a pull request for Sossoldi."
lead: "Sossoldi is built by volunteers. Code, design, translations, documentation and bug reports all move the project forward."
order: 40
navId: "contributing"
updated: "2026-11-03"
---

## Before you start

- **Bugs and ideas** go to [GitHub Issues](https://github.com/RIP-Comm/sossoldi/issues). Search first: a duplicate is closed, not fixed.
- **Questions and open-ended proposals** go to [GitHub Discussions](https://github.com/RIP-Comm/sossoldi/discussions), where the roadmap is discussed.
- **Chat** happens on [Discord](https://discord.sossoldi.com). It is the fastest place to ask whether a change is wanted before writing it.

## The three guides

- [Coding style](/docs/contributing/coding-style/) — Dart conventions, file layout and commit messages.
- [Pull request guide](/docs/contributing/pr-guide/) — fork, branch, checks and review, step by step.
- [Widget list](/docs/contributing/widget-list/) — the shared widgets the app is built from.

## What a good pull request looks like

1. **One change, one branch.** Create it from `upstream/main`, not from an old local branch.
2. **Run the checks locally**: `dart run build_runner build --delete-conflicting-outputs`, `dart format`, `flutter analyze`, `flutter test --concurrency=1`. The CI runs the same commands.
3. **Say what you tested.** A screenshot or a short clip of the app is worth more than a paragraph.
4. **Keep the description honest.** If something is not covered, write it instead of leaving the reviewer to find it.

## Non-code contributions

- **Design**: the app is designed in Figma with the community; ask on Discord before starting a new screen.
- **Translations**: the app is being localised; Italian and Portuguese are the first languages. The repository documents the `.arb` workflow.
- **Documentation**: these pages live in `sossoldi-website`. A factual correction is a pull request like any other.
- **Testing on devices**: reports on a device we do not own are genuinely useful, as long as they include the version, the OS and the steps.

## Licence

Sossoldi is released under the [MIT licence](https://github.com/RIP-Comm/sossoldi/blob/main/LICENSE). By opening a pull request you agree that your contribution is distributed under the same terms.
