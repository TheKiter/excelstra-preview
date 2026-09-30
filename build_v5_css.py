import re

def build_v5_css():
    with open('v4/style.css', 'r', encoding='utf-8', errors='ignore') as f:
        v4_content = f.read()

    # 1. Root variables in Apple HIG Light Luxury Pro mode (60 / 25 / 15 Official Canon)
    root_replacement = """/* ═══════════════════════════════════════════════════════════════════════
   EXCELSTRA v5: APPLE HUMAN INTERFACE GUIDELINES & LIGHT LUXURY PRO MODE
   Palette: Warm Neutral Canvas #F4F3F0 (60%) | Deep Navy & Green (25%) | Gold (15%)
   Typography: Lora (Editorial Serif) | Inter (Technical Precision Sans)
   Motion: Pure GSAP 3 + ScrollTrigger (Transform & Opacity Only)
   Vector: 100% Scalable Vector Graphics (SVG)
   ═══════════════════════════════════════════════════════════════════════ */

:root {
  /* Official Excelstra Brand Palette - 60 / 25 / 15 Canon (Light Luxury) */
  --bg-deep: #000E21;               /* Deep Navy - Authority grounding */
  --bg-canvas: #F4F3F0;             /* Warm Neutral Canvas (60%) */
  --bg-surface: #F8F7F5;            /* Light Beige surface */
  --bg-surface-elevated: #FFFFFF;   /* Pure White card interior */
  --bg-surface-glass: rgba(255, 255, 255, 0.88);
  --bg-surface-card: #FFFFFF;
  --bg-card-hover: #FAFAF8;

  /* Semantic Surface Aliases */
  --bg: #F4F3F0;
  --bg-panel: #F8F7F5;
  --bg-card: #FFFFFF;
  --bg-parchment: #EFECE6;

  /* Typography Colors */
  --ink: #000E21;                   /* Deep Navy for headings & authority */
  --ink-body: #1F2937;              /* High-legibility neutral dark for reading copy */
  --ink-dim: #5A6A78;               /* Muted slate text */
  --ink-subtle: #8A98A5;            /* Timestamps and subtle markers */
  --text-primary: #000E21;
  --text-secondary: #1F2937;
  --text-muted: #5A6A78;
  --text-gold: #BF9B30;

  /* Deep Brand Tones (25% Weight) */
  --navy: #000E21;                 /* Corporate Authority Deep Navy */
  --navy-light: #0A1E38;           /* Lighter Navy for contrast */
  --navy-deep: #050A28;            /* Midnight Navy */
  --green: #1D353C;                /* Signature Excelstra Green */
  --green-dark: #14292F;           /* Supporting Deep Green */
  --green-light: #2A4B54;
  --green-soft: rgba(29, 53, 60, 0.08);

  /* Precious Metal & Gold Accents (15% Weight) */
  --gold: #BF9B30;
  --gold-light: #DABE81;
  --gold-hover: #d8b979;
  --gold-soft: rgba(191, 155, 48, 0.12);
  --hair-gold: rgba(191, 155, 48, 0.28);
  --hair: rgba(0, 14, 33, 0.08);
  --hairline-specular: rgba(0, 14, 33, 0.08);
  --hairline-glass: rgba(0, 14, 33, 0.06);
  --hairline-gold: rgba(191, 155, 48, 0.32);
  --hairline-gold-active: rgba(191, 155, 48, 0.7);
  --gold-metallic: linear-gradient(135deg, #bf9b30 0%, #dabe81 50%, #8c6e18 100%);
  --gold-glow: rgba(191, 155, 48, 0.2);

  /* Fonts */
  --serif: 'Lora', Georgia, serif;
  --sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Radii & Motion */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-pill: 9999px;
  --ease-apple: cubic-bezier(0.16, 1, 0.3, 1);
}"""

    # Replace :root in v4_content
    v4_without_root = re.sub(r'/\* ═+ EXCELSTRA — cinematic dark luxury ═+ \*/\s*:root\s*\{[^}]+\}', '', v4_content, flags=re.DOTALL)

    # Replace em-dashes everywhere with colons, commas, or regular hyphens
    clean_v4 = v4_without_root.replace('—', ': ')

    # SVG Hub CSS for Light Luxury Pro Mode
    light_hub_css = """
/* ══════════ INTERACTIVE ARCHITECTURAL HUB (SVG VECTOR SCHEMATIC - LIGHT LUXURY) ══════════ */
.hub-wrapper {
  margin-top: 3.5rem;
  position: relative;
  overflow: hidden;
}

.hub-svg-container {
  width: 100%;
  max-width: 980px;
  margin-inline: auto;
  position: relative;
  background: #FFFFFF;
  border: 1px solid rgba(0, 14, 33, 0.08);
  border-radius: var(--radius-lg);
  padding: 2.5rem 1.5rem;
  box-shadow: 0 16px 40px rgba(0, 14, 33, 0.05);
}

.hub-svg {
  width: 100%;
  height: auto;
  display: block;
}

.hub-node {
  cursor: pointer;
  outline: none;
}

.hub-node text {
  fill: #000E21 !important;
  font-family: var(--sans);
  font-weight: 600;
  pointer-events: none;
  user-select: none;
}

.hub-node-circle {
  fill: #FFFFFF !important;
  stroke: var(--gold) !important;
  stroke-width: 1.5;
  transition: stroke 0.25s ease, stroke-width 0.25s ease, filter 0.25s ease;
}

.hub-node:hover .hub-node-circle,
.hub-node.active-hub-node .hub-node-circle {
  stroke: #DABE81 !important;
  stroke-width: 2.75 !important;
  filter: drop-shadow(0 0 10px rgba(191, 155, 48, 0.5));
}

.hub-node[data-node="core"] circle:first-of-type {
  fill: #000E21 !important;
  stroke: var(--gold-light) !important;
  stroke-width: 2;
  transition: stroke-width 0.25s ease, filter 0.25s ease;
}

.hub-node[data-node="core"]:hover circle:first-of-type,
.hub-node[data-node="core"].active-hub-node circle:first-of-type {
  stroke-width: 3.5 !important;
  filter: drop-shadow(0 0 14px rgba(191, 155, 48, 0.6));
}

.hub-node[data-node="core"] text:first-of-type {
  fill: var(--gold-light) !important;
  pointer-events: none;
}

.hub-node[data-node="core"] text:last-of-type {
  fill: #DEDAD2 !important;
  pointer-events: none;
}

.hub-connector-line {
  stroke-dasharray: 6 6;
  animation: strokeFlow 30s linear infinite;
}

@keyframes strokeFlow {
  to {
    stroke-dashoffset: -300;
  }
}

.hub-detail-box {
  margin-top: 2rem;
  padding: 1.5rem 2rem;
  background: #FFFFFF;
  border: 1px solid rgba(191, 155, 48, 0.32);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 30px rgba(0, 14, 33, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.hub-detail-box .h3 {
  color: #000E21 !important;
  font-size: 1.15rem;
  margin-bottom: 0.3rem;
}

.hub-detail-box .body {
  color: #1F2937 !important;
  font-size: 0.92rem;
  margin: 0;
}
"""

    reticle_css = ""

    # Master light luxury overrides placed at the end to guarantee precedence
    master_overrides = """
/* ═══════════════ APPLE HIG LIGHT LUXURY PRO OVERRIDES ═══════════════ */

/* Universal Canvas Background */
body, html {
  background: var(--bg-canvas) !important;
  color: var(--ink-body) !important;
}

/* Universal Elevated Cards in Pure White with Specular Hairline */
.glass-card, .level-card, .person, .pillar, .testimonial-card, .portrait-card, .tier-box, .calc-card, .booking-wrap, .dossier, .chair-plate, .notice-box, .host-lead, .callout-card, .speaking-topic, .pre-call-card, .guest-card {
  background: #FFFFFF !important;
  border: 1px solid rgba(0, 14, 33, 0.08) !important;
  color: var(--ink-body) !important;
  box-shadow: 0 14px 34px rgba(0, 14, 33, 0.05), 0 1px 2px rgba(0, 14, 33, 0.03) !important;
}

/* Headings in Deep Navy Authority */
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .lead-statement, .hero-lead, .dossier-title, .person-name, .tier-title {
  color: var(--navy) !important;
}

/* Body Text in High-Legibility Dark Charcoal */
p, .body, .pillar p, .level-desc, .faq-item p, .step p {
  color: var(--ink-body) !important;
}

/* Eyebrows in Precious Gold */
.eyebrow {
  color: var(--gold) !important;
}

/* Form Controls in Crisp White */
.form-field input, .form-field textarea, .form-field select, input[type="text"], input[type="email"], input[type="tel"] {
  background: #FFFFFF !important;
  border: 1px solid #DEDAD2 !important;
  color: #000E21 !important;
  border-radius: var(--radius-sm) !important;
  padding: 0.85rem 1.1rem !important;
  box-shadow: inset 0 1px 2px rgba(0, 14, 33, 0.02) !important;
}

.form-field input:focus, .form-field textarea:focus, .form-field select:focus, input:focus {
  border-color: var(--gold) !important;
  background: #FFFFFF !important;
  box-shadow: 0 0 0 3px rgba(191, 155, 48, 0.15) !important;
  outline: none !important;
}

.form-field label {
  color: var(--ink-dim) !important;
  font-size: 0.76rem !important;
  letter-spacing: 0.14em !important;
  font-weight: 500 !important;
}

.calc-step-header {
  border-bottom: 1px solid rgba(0, 14, 33, 0.08) !important;
}

.calc-step-num {
  color: var(--gold) !important;
}

/* Booking Slots */
.slot-btn {
  background: #F8F7F5 !important;
  border: 1px solid #DEDAD2 !important;
  color: var(--ink-body) !important;
  border-radius: var(--radius-sm) !important;
  padding: 0.75rem !important;
  transition: all 0.2s ease !important;
  cursor: pointer !important;
}

.slot-btn:hover, .slot-btn.selected {
  border-color: var(--gold) !important;
  background: rgba(191, 155, 48, 0.14) !important;
  color: #000E21 !important;
  font-weight: 600 !important;
}

/* Radio Tiles for Calculator */
.radio-tile {
  background: #F8F7F5 !important;
  border: 1px solid #DEDAD2 !important;
  color: var(--ink-body) !important;
}

.radio-tile:hover, input[type="radio"]:checked + .radio-tile {
  border-color: var(--gold) !important;
  background: rgba(191, 155, 48, 0.12) !important;
  color: #000E21 !important;
}

/* Frosted Scrolled Navigation in Apple Light Luxury */
#nav {
  background: transparent;
  transition: background 0.4s ease, box-shadow 0.4s ease;
}

#nav.scrolled, #nav.solid {
  background: rgba(244, 243, 240, 0.92) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  box-shadow: 0 1px 0 rgba(0, 14, 33, 0.08), 0 8px 24px rgba(0, 14, 33, 0.04) !important;
}

.nav-logo-text {
  font-family: var(--sans);
  font-weight: 700;
  font-size: 0.88rem;
  letter-spacing: 0.22em;
  color: var(--navy) !important;
  margin-left: 0.75rem;
}

.nav-links a {
  color: var(--navy) !important;
  font-weight: 500;
}

.nav-links a:hover, .nav-links a.active {
  color: var(--gold) !important;
}

/* Nav Dropdown Menu */
.nav-dropdown-menu {
  background: #FFFFFF !important;
  border: 1px solid rgba(0, 14, 33, 0.08) !important;
  box-shadow: 0 16px 36px rgba(0, 14, 33, 0.08) !important;
  border-radius: var(--radius-sm) !important;
}

.nav-dropdown-menu a {
  color: var(--ink-body) !important;
}

.nav-dropdown-menu a:hover {
  color: var(--gold) !important;
  background: rgba(191, 155, 48, 0.06) !important;
}

/* Mobile Nav Drawer */
.nav-mobile {
  background: rgba(244, 243, 240, 0.98) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
}

.nav-mobile a {
  color: var(--navy) !important;
  border-bottom: 1px solid rgba(0, 14, 33, 0.08) !important;
}

/* Precise Hero Stacking Architecture */
.scroll-stage, .hero-scroll-stage {
  height: 100vh !important;
  position: relative;
  overflow: hidden;
}

.sticky-frame {
  position: relative !important;
  width: 100% !important;
  height: 100vh !important;
  overflow: hidden;
}

#heroFilmCanvas, #film {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  display: block;
  z-index: 1;
}

.hero-canvas-wrap {
  position: absolute; inset: 0;
  z-index: 1;
}

.film-vignette { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
.film-grade { position: absolute; inset: 0; z-index: 3; pointer-events: none; }
.film-scrim { position: absolute; inset: 0; z-index: 4; pointer-events: none; }

/* Cinematic Hero Copy over Landscape Video */
.hero-copy, .hero-stage {
  position: absolute; inset: 0;
  z-index: 10;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  padding: 0 clamp(1.4rem, 6vw, 4rem);
  will-change: opacity, transform;
}
.hero-copy.active, .hero-stage.active { pointer-events: auto; }

.hero-copy .hero-h {
  color: #FFFFFF !important;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.75) !important;
}

.hero-copy .hero-sub {
  color: #F0F4F5 !important;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.7) !important;
}

.hero-copy .eyebrow {
  color: var(--gold-light) !important;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.8) !important;
}

.hero-copy .cta-note {
  color: #E2DFD8 !important;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.75) !important;
}

/* Crisp Monogram SVG inside nav */
.nav-logo svg {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
}

/* Tactile Gold Buttons */
.btn-gold {
  background: linear-gradient(135deg, #dabe81 0%, #bf9b30 100%) !important;
  color: #000E21 !important;
  font-weight: 600 !important;
  box-shadow: 0 4px 16px rgba(191, 155, 48, 0.28) !important;
  border: none !important;
}

.btn-gold:hover {
  background: linear-gradient(135deg, #e4cca0 0%, #c9a869 100%) !important;
  box-shadow: 0 6px 22px rgba(191, 155, 48, 0.38) !important;
}

.btn-ghost {
  border: 1px solid rgba(0, 14, 33, 0.22) !important;
  color: var(--navy) !important;
  background: transparent !important;
}

.btn-ghost:hover {
  border-color: var(--gold) !important;
  color: var(--gold) !important;
}

/* Gold Gradient Utilities */
.gold-gradient {
  background: var(--gold-metallic);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

/* Pedigree Strip in Light Mode */
.pedigree-strip {
  background: var(--bg-surface) !important;
  border-top: 1px solid rgba(0, 14, 33, 0.08) !important;
  border-bottom: 1px solid rgba(0, 14, 33, 0.08) !important;
}

.pedigree-label {
  color: var(--ink-dim) !important;
}

.pedigree-name {
  color: var(--navy) !important;
  font-weight: 500 !important;
}

.pedigree-dot {
  color: var(--gold) !important;
}

/* Grounding Luxury Footer in Deep Navy */
footer {
  background: var(--navy) !important;
  color: #F0F4F5 !important;
  border-top: 2px solid var(--gold) !important;
}

footer .foot-col-title {
  color: var(--gold-light) !important;
}

footer .body, footer p, footer a, footer .foot-legal, footer .foot-newsletter-text {
  color: #B2C0C7 !important;
}

footer a:hover {
  color: var(--gold-light) !important;
}

footer .foot-legal span {
  color: #8A98A5 !important;
}

/* ══════════ IMAGE CAPTIONS OVERLAY (100% PURE WHITE CONTRAST) ══════════ */
.photo-break-scrim {
  position: absolute !important;
  inset: 0 !important;
  background: linear-gradient(180deg, rgba(0, 14, 33, 0.45) 0%, rgba(0, 14, 33, 0.25) 35%, rgba(0, 14, 33, 0.92) 100%) !important;
  pointer-events: none !important;
  z-index: 2 !important;
}

.photo-break-caption {
  position: absolute !important;
  bottom: 2.2rem !important;
  left: clamp(1.5rem, 5vw, 4rem) !important;
  right: clamp(1.5rem, 5vw, 4rem) !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-end !important;
  color: #FFFFFF !important;
  z-index: 5 !important;
  pointer-events: none !important;
}

.photo-break-caption *,
.photo-break-caption p,
p.photo-break-quote,
.photo-break-quote {
  color: #FFFFFF !important;
  font-family: var(--serif) !important;
  font-style: italic !important;
  font-size: clamp(1.15rem, 2.2vw, 1.65rem) !important;
  max-width: 52ch !important;
  line-height: 1.45 !important;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.95), 0 1px 4px rgba(0, 0, 0, 0.9) !important;
  margin: 0 !important;
}

.photo-break-tag {
  font-size: 0.72rem !important;
  letter-spacing: 0.22em !important;
  text-transform: uppercase !important;
  color: #FFFFFF !important;
  background: rgba(0, 14, 33, 0.75) !important;
  border: 1px solid rgba(191, 155, 48, 0.8) !important;
  padding: 0.4rem 0.95rem !important;
  border-radius: 999px !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.85) !important;
  white-space: nowrap !important;
}

.continuance-card {
  background: #FFFFFF !important;
  border: 1px solid rgba(0, 14, 33, 0.08) !important;
  border-left: 4px solid var(--gold) !important;
  box-shadow: 0 14px 34px rgba(0, 14, 33, 0.04), 0 1px 2px rgba(0, 14, 33, 0.02) !important;
}
"""

    unified_css = f"""{root_replacement}

{reticle_css}

{light_hub_css}

/* ═══════════════ ORIGINAL COMPONENT SUITE ═══════════════ */
{clean_v4}

{master_overrides}
"""

    # Double check zero em-dashes in output
    unified_css = unified_css.replace('—', ': ')

    # Remove any filter: blur in animations or reveals
    unified_css = re.sub(r'filter:\s*blur\([^)]+\);?', '', unified_css)

    with open('v5/style.css', 'w', encoding='utf-8') as f:
        f.write(unified_css)

    print("v5/style.css built in Apple Light Luxury Pro mode. Length:", len(unified_css))

if __name__ == '__main__':
    build_v5_css()
