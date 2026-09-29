import re

def build_v5_css():
    with open('v4/style.css', 'r', encoding='utf-8', errors='ignore') as f:
        v4_content = f.read()

    with open('v5/style.css', 'r', encoding='utf-8', errors='ignore') as f:
        current_v5 = f.read()

    # 1. Root variables in Apple HIG Dark Luxury Pro tokens
    root_replacement = """/* ═══════════════════════════════════════════════════════════════════════
   EXCELSTRA v5: APPLE HUMAN INTERFACE GUIDELINES & DARK LUXURY PRO MODE
   Palette: Deep Midnight (60%) | Excelstra Green & Navy (25%) | Gold (15%)
   Typography: Lora (Editorial Serif) | Inter (Technical Precision Sans)
   Motion: Pure GSAP 3 + ScrollTrigger (Transform & Opacity Only)
   Vector: 100% Scalable Vector Graphics (SVG)
   ═══════════════════════════════════════════════════════════════════════ */

:root {
  /* Apple Pro Materials & Surface Hierarchy (60% Weight) */
  --bg-deep: #05080a;
  --bg-canvas: #070c10;
  --bg-surface: #0e171b;
  --bg-surface-elevated: #132026;
  --bg-surface-glass: rgba(14, 23, 27, 0.75);
  --bg-surface-card: rgba(19, 32, 38, 0.75);
  --bg-card-hover: rgba(25, 42, 50, 0.85);

  /* Semantic Surface Aliases Mapped to Dark Luxury Pro */
  --bg: #070c10;
  --bg-panel: #0e171b;
  --bg-card: rgba(19, 32, 38, 0.75);
  --bg-parchment: #132026;

  /* Typography Colors */
  --ink: #F0F4F5;
  --ink-body: #9EB1B9;
  --ink-dim: #62757D;
  --ink-subtle: #4A5B64;
  --text-primary: #F0F4F5;
  --text-secondary: #9EB1B9;
  --text-muted: #62757D;
  --text-gold: #DABE81;

  /* Deep Brand Tones (25% Weight) */
  --navy: #000E21;
  --navy-light: #0A1E38;
  --navy-deep: #050A28;
  --green: #1D353C;
  --green-dark: #14292F;
  --green-light: #2A4B54;
  --green-glow: rgba(42, 75, 84, 0.4);
  --green-soft: rgba(29, 53, 60, 0.25);

  /* Precious Metal & Gold Accents (15% Weight) */
  --gold: #BF9B30;
  --gold-light: #DABE81;
  --gold-hover: #d8b979;
  --gold-soft: rgba(191, 155, 48, 0.12);
  --hair-gold: rgba(191, 155, 48, 0.32);
  --hair: rgba(255, 255, 255, 0.08);
  --hairline-specular: rgba(255, 255, 255, 0.09);
  --hairline-glass: rgba(255, 255, 255, 0.05);
  --hairline-gold: rgba(191, 155, 48, 0.32);
  --hairline-gold-active: rgba(218, 190, 129, 0.7);
  --gold-metallic: linear-gradient(135deg, #f3e3be 0%, #dabe81 40%, #bf9b30 70%, #8c6e18 100%);
  --gold-glow: rgba(191, 155, 48, 0.25);

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

    # Clean up legacy light backgrounds to Dark Luxury Pro equivalents
    v4_without_root = v4_without_root.replace('background: #fbf9f5;', 'background: var(--bg-surface);')
    v4_without_root = v4_without_root.replace('background: rgba(251, 249, 245, 0.92);', 'background: rgba(7, 12, 16, 0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);')
    v4_without_root = v4_without_root.replace('background: #ffffff;', 'background: var(--bg-surface-card);')
    v4_without_root = v4_without_root.replace('background: #FFFFFF;', 'background: var(--bg-surface-card);')
    v4_without_root = v4_without_root.replace('background: #FFFFFF !important;', 'background: var(--bg-surface-card) !important;')
    v4_without_root = v4_without_root.replace('background: #ede8dc !important;', 'background: var(--bg-surface-elevated) !important;')
    v4_without_root = v4_without_root.replace('background: #f7f3ec !important;', 'background: var(--bg-surface-card) !important;')
    v4_without_root = v4_without_root.replace('color: #09090b !important;', 'color: var(--text-primary) !important;')
    v4_without_root = v4_without_root.replace('color: #2c2a27 !important;', 'color: var(--text-secondary) !important;')
    v4_without_root = v4_without_root.replace('color: #121113 !important;', 'color: var(--text-primary) !important;')
    v4_without_root = v4_without_root.replace('color: #0a090b !important;', 'color: var(--text-primary) !important;')
    v4_without_root = v4_without_root.replace('color: #0c0b0d !important;', 'color: var(--text-primary) !important;')
    v4_without_root = v4_without_root.replace('color: #0c0b0e !important;', 'color: var(--text-primary) !important;')
    v4_without_root = v4_without_root.replace('color: #1a191b !important;', 'color: var(--text-primary) !important;')
    v4_without_root = v4_without_root.replace('color: #3b3834 !important;', 'color: var(--text-secondary) !important;')
    v4_without_root = v4_without_root.replace('color: #48443d;', 'color: var(--text-secondary);')

    # Replace em-dashes everywhere with colons, commas, or regular hyphens
    clean_v4 = v4_without_root.replace('—', ': ')

    # Extract v5-exclusive components
    v5_hub_match = re.search(r'/\* ═+ INTERACTIVE ARCHITECTURAL HUB \(SVG VECTOR SCHEMATIC\) ═+ \*/.*?(?=/\* ═+ PHOTO BREAK BANNER ═+ \*/|\Z)', current_v5, flags=re.DOTALL)
    v5_hub_css = v5_hub_match.group(0) if v5_hub_match else ""

    v5_reticle_match = re.search(r'/\* ═+ RETICLE & HERO PIN ═+ \*/.*?(?=/\* ═+ SECTION 1)', current_v5, flags=re.DOTALL)
    if not v5_reticle_match:
        v5_reticle_match = re.search(r'\.hero-scroll-stage\s*\{.*?(?=/\* ═+ SECTION|\Z)', current_v5, flags=re.DOTALL)
    v5_reticle_css = v5_reticle_match.group(0) if v5_reticle_match else ""

    # Master overrides placed at the end to guarantee precedence
    master_overrides = """
/* ═══════════════ APPLE HIG DARK LUXURY PRO OVERRIDES ═══════════════ */

/* Universal Glass Surfaces & Cards */
.glass-card, .level-card, .person, .pillar, .testimonial-card, .portrait-card, .tier-box, .calc-card, .booking-wrap, .dossier, .chair-plate, .notice-box, .host-lead, .callout-card, .speaking-topic, .pre-call-card, .guest-card {
  background: var(--bg-surface-card) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid var(--hairline-specular) !important;
  color: var(--text-primary) !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
}

/* Form Controls & Interactive Schedulers */
.form-field input, .form-field textarea, .form-field select, input[type="text"], input[type="email"], input[type="tel"] {
  background: var(--bg-surface-elevated) !important;
  border: 1px solid var(--hairline-specular) !important;
  color: var(--text-primary) !important;
  border-radius: var(--radius-sm) !important;
  padding: 0.85rem 1.1rem !important;
}

.form-field input:focus, .form-field textarea:focus, .form-field select:focus, input:focus {
  border-color: var(--gold) !important;
  background: rgba(19, 32, 38, 0.95) !important;
  outline: none !important;
}

.form-field label {
  color: var(--text-secondary) !important;
  font-size: 0.76rem !important;
  letter-spacing: 0.14em !important;
}

.calc-step-header {
  border-bottom: 1px solid var(--hairline-specular) !important;
}

.calc-step-num {
  color: var(--gold) !important;
}

.slot-btn {
  background: var(--bg-surface-elevated) !important;
  border: 1px solid var(--hairline-specular) !important;
  color: var(--text-secondary) !important;
  border-radius: var(--radius-sm) !important;
  padding: 0.75rem !important;
  transition: all 0.2s ease !important;
  cursor: pointer !important;
}

.slot-btn:hover, .slot-btn.selected {
  border-color: var(--gold) !important;
  background: rgba(191, 155, 48, 0.16) !important;
  color: var(--gold-light) !important;
}

.radio-tile {
  background: var(--bg-surface-elevated) !important;
  border: 1px solid var(--hairline-specular) !important;
  color: var(--text-secondary) !important;
}

.radio-tile:hover, input[type="radio"]:checked + .radio-tile {
  border-color: var(--gold) !important;
  background: rgba(191, 155, 48, 0.12) !important;
  color: var(--text-primary) !important;
}

/* Nav Dropdown Dark Mode */
.nav-dropdown-menu {
  background: rgba(14, 23, 27, 0.95) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid var(--hairline-specular) !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6) !important;
}

.nav-dropdown-menu a {
  color: var(--text-secondary) !important;
}

.nav-dropdown-menu a:hover {
  color: var(--gold-light) !important;
  background: rgba(191, 155, 48, 0.08) !important;
}

/* Mobile Nav Drawer */
.nav-mobile {
  background: rgba(7, 12, 16, 0.98) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
}

.nav-mobile a {
  color: var(--text-primary) !important;
  border-bottom: 1px solid var(--hairline-specular) !important;
}

/* Specular gold accent utilities */
.gold-gradient {
  background: var(--gold-metallic);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

/* Frosted Scrolled Nav */
#nav.scrolled, #nav.solid {
  background: rgba(7, 12, 16, 0.85) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  box-shadow: 0 1px 0 var(--hairline-specular), 0 12px 30px rgba(0, 0, 0, 0.5) !important;
}

.nav-logo-text {
  font-family: var(--sans);
  font-weight: 700;
  font-size: 0.88rem;
  letter-spacing: 0.22em;
  color: var(--text-primary);
  margin-left: 0.75rem;
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
#heroSvgReticle, .hero-svg-overlay { position: absolute; inset: 0; z-index: 5; pointer-events: none; }

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

/* Crisp Monogram SVG inside nav */
.nav-logo svg {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
}
"""

    unified_css = f"""{root_replacement}

{v5_reticle_css}

{v5_hub_css}

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

    print("v5/style.css written successfully with end-overrides. Length:", len(unified_css))

if __name__ == '__main__':
    build_v5_css()
