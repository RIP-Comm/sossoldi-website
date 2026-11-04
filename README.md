# sossoldi-website

Public website for [Sossoldi](https://github.com/RIP-Comm/sossoldi): landing page, documentation,
changelog and blog. Eleventy 3, bilingual EN/IT, Pagefind search, static output.

The plan this implements is **P0–P4 and P6** of `Sossoldi - sito web` (vault, 03/11/2026); **P5 (press kit)
was removed on request on 04/11/2026**. P7 (DNS cutover) and P8 (post-launch analytics) are deliberately
not done: everything is local for now.

## Local development

```bash
npm install
npm run dev          # http://localhost:8080 — Eleventy serve, tokens synced first
npm run build        # translation guard + eleventy + pagefind → _site
npm run check        # translation guard + internal link check on the built site
npm run assets       # regenerate WebP and OG images (needs python3 + PIL)
```

The build reads GitHub stars, contributors and releases from committed snapshots
(`src/_data/snapshots/*.json`). Refresh them with `npm run snapshot` (requires `gh auth login`).
With `SOSSOLDI_LIVE_DATA=1` the build tries the live API first and falls back to the snapshot.

## Structure

```
src/
  en/ it/            mirrored trees; English at /, Italian at /it/
    docs/            ten migrated pages + contributing index
    blog/            two posts, Italian = translation of the English source
  _data/             site constants, UI strings (both languages), GitHub/releases, tokens
  _includes/layouts  base, page, home, doc, post
  assets/            CSS, fonts, images, generated OG images
scripts/             tokens sync, docs import, translation guard, link checker, snapshots, OG
```

URLs are derived from the file path by the `localeUrl` filter: `src/en/docs/setup/linux.md` →
`/docs/setup/linux/`, `src/it/docs/setup/linux.md` → `/it/docs/setup/linux/`.

## Translations

Every Italian page carries `source_hash`, the sha256 of the English body it was translated from.
`npm run build` fails when the English body changes without the Italian one being reviewed:

```bash
npm run check                    # lists out-of-date pairs and exits 1
npm run translations:stamp       # re-stamps after the Italian page has been reviewed
```

## Design system

Colour, type and rules come from `~/Projects/sossoldi-social-kit/design/tokens.json`.
`scripts/sync-tokens.mjs` copies `tokens.css` into `src/assets/css/` and fails if the source is missing.
Never edit the generated file; add tokens to the social kit.

## Deploy (not done yet)

Cloudflare Pages, two separate projects as decided in the brief:
`sossoldi-website` → `sossoldi.com`, `sossoldi-design` → `design.sossoldi.com`.
Build command `npm run build`, output `_site`, `NODE_VERSION=22`. The DNS cutover and the four
GoDaddy forwards (apex, www, ios, android) are P7 and belong to Marco.
