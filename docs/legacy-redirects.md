# Legacy documentation URLs — 301 map

The ten pages used to be served by GitHub Pages from `RIP-Comm/sossoldi/docs` with
just-the-docs. Once `sossoldi.com` points at this site, every old URL must answer **301** to
the new one, or README links, Discord messages and search results break.

The redirect cannot live in this site: the old URLs are on `rip-comm.github.io/sossoldi/`, a
different host. The app repository keeps a `docs/` reduced to Jekyll stubs using
`jekyll-redirect-from` (verified available on GitHub Pages), one per row below.

| Old URL | New URL |
|---|---|
| `/sossoldi/index.html` | `https://sossoldi.com/docs/` |
| `/sossoldi/core-values.html` | `https://sossoldi.com/docs/core-values/` |
| `/sossoldi/roadmap.html` | `https://sossoldi.com/docs/roadmap/` |
| `/sossoldi/setup/setup.html` | `https://sossoldi.com/docs/setup/` |
| `/sossoldi/setup/setup-linux-evironment.html` | `https://sossoldi.com/docs/setup/linux/` |
| `/sossoldi/contributing/PR-guide.html` | `https://sossoldi.com/docs/contributing/pr-guide/` |
| `/sossoldi/contributing/coding-style.html` | `https://sossoldi.com/docs/contributing/coding-style/` |
| `/sossoldi/contributing/widget-list.html` | `https://sossoldi.com/docs/contributing/widget-list/` |
| `/sossoldi/doc-guide.html` | `https://sossoldi.com/docs/doc-guide/` |
| `/sossoldi/privacy-policy.html` | `https://sossoldi.com/docs/privacy-policy/` |

Italian readers land on the same page with `/it/` before `/docs/`.

Status: **not done** — it needs a pull request to `RIP-Comm/sossoldi` and a Pages build, which is
outside "everything local" for now. Verification is a `curl -I` table: ten 301, no 404.
