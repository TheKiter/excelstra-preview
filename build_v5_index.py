import re

def build_v5_index():
    with open('v4/index.html', 'r', encoding='utf-8', errors='ignore') as f:
        v4_html = f.read()

    with open('v5/index.html', 'r', encoding='utf-8', errors='ignore') as f:
        current_v5 = f.read()

    # Extract the SVG Architecture Hub section from current v5/index.html
    hub_section_match = re.search(r'(<!-- ═+ SECTION 2: INTERACTIVE ARCHITECTURAL HUB.*?)(?=<!-- ═+ EDITORIAL PHOTO BREAK|\Z)', current_v5, flags=re.DOTALL)
    hub_section_html = hub_section_match.group(1) if hub_section_match else ""

    # In v4_html:
    # 1. Update stylesheet link from style.css?v=4.3 to style.css?v=5.0
    # 2. Add GSAP and ScrollTrigger CDN scripts in head/footer
    # 3. Upgrade canvas ID and classes to match v5 hero-film.js
    # 4. Integrate the SVG reticle and SVG monogram mark
    # 5. Insert the Interactive SVG Architectural Hub right after Section 03 (What Wealth Integration Is / Pillars)

    html = v4_html

    # Replace stylesheet link
    html = html.replace('href="style.css?v=4.3"', 'href="style.css?v=5.0"')

    # Replace logo in nav with crisp SVG mark + text
    svg_logo = """<a class="nav-logo" href="index.html" aria-label="Excelstra Home">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" stroke="#BF9B30" stroke-width="1.5" stroke-opacity="0.8"/>
          <path d="M10 21L16 11L22 21" stroke="#F0F4F5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="12.5" y1="18" x2="19.5" y2="18" stroke="#BF9B30" stroke-width="1.5"/>
          <circle cx="16" cy="11" r="2" fill="#DABE81"/>
        </svg>
        <span class="nav-logo-text">EXCELSTRA</span>
      </a>"""
    html = re.sub(r'<a class="nav-logo"[^>]*>.*?</a>', svg_logo, html, flags=re.DOTALL)

    # In hero section, ensure canvas has id="heroFilmCanvas" and stage has id="heroStage" and stages have class "hero-stage"
    # Also add SVG reticle
    hero_pattern = r'<section id="top" class="scroll-stage">.*?</section>'
    hero_v5 = """<section id="heroStage" class="scroll-stage hero-scroll-stage">
  <div class="sticky-frame">
    <div class="hero-canvas-wrap">
      <canvas id="heroFilmCanvas" role="img" aria-label="Cinematic film: an expansive architectural overlook transitioning across mountain waters into an Italian harbor."></canvas>
    </div>
    <div class="film-vignette"></div>
    <div class="film-grade"></div>
    <div class="film-scrim" id="filmScrim"></div>

    <!-- Animated SVG Reticle & Alignment Axis -->
    <svg class="hero-svg-overlay" id="heroSvgReticle" viewBox="0 0 1920 1080" preserveAspectRatio="none">
      <line class="reticle-path" x1="960" y1="0" x2="960" y2="1080" stroke="rgba(191,155,48,0.15)" stroke-width="1" stroke-dasharray="8 8"/>
      <line class="reticle-path" x1="0" y1="540" x2="1920" y2="540" stroke="rgba(191,155,48,0.15)" stroke-width="1" stroke-dasharray="8 8"/>
      <circle class="reticle-path" cx="960" cy="540" r="280" stroke="rgba(218,190,129,0.18)" stroke-width="1" fill="none"/>
      <circle class="reticle-path" cx="960" cy="540" r="420" stroke="rgba(255,255,255,0.06)" stroke-width="1" fill="none"/>
    </svg>

    <div class="hero-copy stage hero-stage" data-stage="0">
      <p class="eyebrow reveal-line">Excelstra</p>
      <h1 class="hero-h">To Advise Is&nbsp;Common.<br><em>To Integrate Is&nbsp;Rare.</em></h1>
    </div>

    <div class="hero-copy stage hero-stage" data-stage="1">
      <h2 class="hero-sub">You have advisors for the parts. Excelstra is the architect of the&nbsp;whole.<br><em>See what changes when your wealth is designed as&nbsp;one.</em></h2>
    </div>

    <div class="hero-copy stage hero-stage" data-stage="2">
      <div class="hero-ctas">
        <a class="btn btn-gold" href="the-architecture.html">See the&nbsp;Architecture</a>
        <p class="cta-note">A confidential two-minute assessment for complete clarity across your wealth.</p>
        <a class="btn btn-ghost btn-sm" href="https://go.excelstra.com/whole-wealth-assessment" target="_blank" rel="noopener">Begin Your Wealth&nbsp;Assessment</a>
      </div>
    </div>
  </div>
</section>"""
    html = re.sub(hero_pattern, hero_v5, html, flags=re.DOTALL)

    # Insert the Interactive SVG Architectural Hub right before Section 04 (The Calculator)
    if hub_section_html and 'id="hubSvgSchematic"' not in html:
        calc_marker = '<!-- ══════════ SECTION 04 · THE CALCULATOR ══════════ -->'
        html = html.replace(calc_marker, hub_section_html + '\n\n' + calc_marker)

    # Ensure GSAP CDN scripts are loaded before app.js and hero-film.js
    gsap_scripts = """<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="app.js"></script>
<script src="hero-film.js"></script>"""
    html = re.sub(r'<script src="app\.js"></script>\s*<script src="hero-film\.js"></script>', gsap_scripts, html)

    # Ensure zero em-dashes
    html = html.replace('—', ': ')

    with open('v5/index.html', 'w', encoding='utf-8') as f:
        f.write(html)

    print("v5/index.html restored and elevated successfully. Length:", len(html))

if __name__ == '__main__':
    build_v5_index()
