# Excelstra Preview — Sub-Project Routing Switchboard

**Sub-Project:** Excelstra Client Staging & Preview Deployment
**Parent ICM:** `/Developer/Clients/excelstra/` (Layer 1 Context)
**Live Surface:** `https://go.excelstra.com/preview` (GoHighLevel Canonical Frame)
**Hosting Target:** GitHub Pages (`TheKiter/excelstra-preview`)

## Routing Switchboard

| Domain / Activity | Location | Primary File |
|---|---|---|
| Sub-Project Context & Build Pipeline | Local Root | `CONTEXT.md` |
| Live Client Index & Editor Container | Local Root | `index.html` |
| Active Production Version | `v5/` | `v5/index.html` |
| Archived Preview Builds | `v3/`, `v4/` | Previous iterations |
| Build & CSS Generation Scripts | Local Root | `build_v5_index.py`, `build_v5_css.py` |
| Master Client Governance & Preflight | `../../` | `GOVERNANCE.md` |

## Sub-Project Invariants
- Entry switchboard strictly under 50 lines.
- Mandatory Live Preflight: Test every live preview link with `curl -sIL` and Puppeteer before sharing with Eunicia.
- Zero raw IP or port exposure. Deployments surface strictly on `https://go.excelstra.com/preview`.
- Zero emojis across all HTML, CSS, JavaScript, and markdown files.
