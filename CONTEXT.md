# Excelstra Preview — Sub-Project Context & Build Architecture

## 1. Subsystem Scope
This repository houses the autonomous staging, bundling, and deployment engine for Excelstra client previews. It packages static marketing mockups, membership portals, and wealth tools into live previews surfaced to Eunicia via `https://go.excelstra.com/preview`.

## 2. Architecture & Pipeline
- **Live Frame:** GoHighLevel loads `https://go.excelstra.com/preview`, which frames `https://thekiter.github.io/excelstra-preview/` in a clean, full-screen viewport with valid SSL and zero domain reputation warnings.
- **In-Browser Visual Editor:** Embedded directly in `index.html`, allowing real-time copy edits and direct GitHub commit publishing.
- **Build Tools:**
  - `build_v5_index.py`: Stitches together component HTML templates into static release pages.
  - `build_v5_css.py`: Generates minified, branded CSS adhering to `#1D353C`, `#35626E`, and `#C79A3A`.
  - `check_classes.py`: Verifies Tailwind/custom class usage consistency.

## 3. Gating & Verification Invariants
- **Preflight Requirement:** Every build pushed to production must be tested with `curl -sIL` and headless Puppeteer.
- **Zero Drift:** Client deliverables never expose staging ports, localhost links, or private Tailscale IPs.
- **Zero Emojis:** Strictly zero emojis in all code, comments, and web copy.
