/* ==========================================================================
   EXCELSTRA V2 — HERMES SILK SHADERGRADIENT & LIQUID GLASS OPTICAL ENGINE
   Inspired by rdev/liquid-glass-react & ruucm/shadergradient.
   Zero external dependencies, zero emojis, respects prefers-reduced-motion.
   ========================================================================== */

(function () {
  'use strict';

  const BUILD_VER = '20261025v2c';

  /* ------------------------------------------------------------------------
     0. Iframe Cache-Buster & Internal Link Versioning
     ------------------------------------------------------------------------ */
  try {
    const currentUrl = new URL(window.location.href);
    if (currentUrl.protocol.startsWith('http') && currentUrl.searchParams.get('v') !== BUILD_VER) {
      currentUrl.searchParams.set('v', BUILD_VER);
      window.location.replace(currentUrl.toString());
    }
  } catch (_) {}

  document.querySelectorAll('a[href]').forEach(function (link) {
    const rawHref = link.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('http') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;
    const parts = rawHref.split('#');
    const basePart = parts[0].split('?')[0];
    const hashPart = parts[1] ? '#' + parts[1] : '';
    if (basePart.endsWith('.html')) {
      link.setAttribute('href', basePart + '?v=' + BUILD_VER + hashPart);
    }
  });

  /* ------------------------------------------------------------------------
     1. Floating Design Version Switcher (V1 Classic vs V2 Hermes Liquid Glass)
     ------------------------------------------------------------------------ */
  function mountVersionSwitcher() {
    if (document.getElementById('designVersionSwitcher')) return;
    const pathName = window.location.pathname;
    const fileName = (pathName.split('/').pop() || 'index.html').split('?')[0] || 'index.html';
    const targetFile = fileName.endsWith('.html') ? fileName : 'index.html';

    const bar = document.createElement('div');
    bar.id = 'designVersionSwitcher';
    bar.className = 'design-version-switcher liquid-glass-pill';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Design Version Comparison Switcher');

    bar.innerHTML =
      '<span class="dvs-label">Design Edition</span>' +
      '<a href="../' + targetFile + '?v=' + BUILD_VER + '" class="dvs-option">V1 &middot; Classic Editorial</a>' +
      '<a href="' + targetFile + '?v=' + BUILD_VER + '" class="dvs-option active" aria-current="true">V2 &middot; Herm&egrave;s Liquid Glass</a>';

    document.body.appendChild(bar);
  }

  /* ------------------------------------------------------------------------
     2. Optical Bezel Displacement Map Generator (rdev/liquid-glass-react style)
     Generates a rounded crystal lens displacement map in R/G channels +
     chromatic aberration filter in inline SVG for backdrop-filter refraction.
     ------------------------------------------------------------------------ */
  function generateLensDisplacementDataURL(width, height, borderRadius, bezelWidth) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;
    const halfW = width / 2;
    const halfH = height / 2;
    const r = Math.min(borderRadius, halfW, halfH);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const px = x - halfW;
        const py = y - halfH;
        const qx = Math.abs(px) - (halfW - r);
        const qy = Math.abs(py) - (halfH - r);
        const distFromEdge =
          Math.min(Math.max(qx, qy), 0) +
          Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) -
          r;

        // Inside the shape, distFromEdge is negative (0 at the outer border)
        const depth = -distFromEdge;
        let dx = 0;
        let dy = 0;

        if (depth > 0 && depth < bezelWidth) {
          // Smooth cosine bevel curve near the glass edge
          const t = 1 - depth / bezelWidth;
          const profile = Math.pow(t, 1.85) * Math.sin(t * Math.PI * 0.5);
          const nx = px / (halfW || 1);
          const ny = py / (halfH || 1);
          dx = -nx * profile;
          dy = -ny * profile;
        } else if (depth >= bezelWidth) {
          // Subtle organic liquid ripple inside the glass core
          const ux = x / width;
          const uy = y / height;
          dx = Math.sin(ux * Math.PI * 2.0) * Math.cos(uy * Math.PI * 2.0) * 0.06;
          dy = Math.cos(ux * Math.PI * 2.0) * Math.sin(uy * Math.PI * 2.0) * 0.06;
        }

        const idx = (y * width + x) * 4;
        data[idx] = Math.max(0, Math.min(255, Math.round(128 + dx * 127)));     // R: X displacement
        data[idx + 1] = Math.max(0, Math.min(255, Math.round(128 + dy * 127))); // G: Y displacement
        data[idx + 2] = 128;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png');
  }

  function injectLiquidGlassSVGFilters() {
    if (document.getElementById('excelstraLiquidGlassFilters')) return;

    const cardMapUrl = generateLensDisplacementDataURL(256, 256, 18, 42);
    const pillMapUrl = generateLensDisplacementDataURL(256, 96, 48, 28);

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.id = 'excelstraLiquidGlassFilters';
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.position = 'absolute';
    svg.style.width = '0';
    svg.style.height = '0';
    svg.style.pointerEvents = 'none';

    svg.innerHTML =
      '<defs>' +
        /* Card & Panel Liquid Glass Filter with Bezel Refraction + Chromatic Aberration */
        '<filter id="liquid-glass-card-filter" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">' +
          '<feImage href="' + cardMapUrl + '" result="lensMap" preserveAspectRatio="none" />' +
          '<feDisplacementMap in="SourceGraphic" in2="lensMap" scale="38" xChannelSelector="R" yChannelSelector="G" result="refracted" />' +
          '<feColorMatrix in="refracted" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="rChan" />' +
          '<feOffset in="rChan" dx="1.35" dy="0.6" result="rShift" />' +
          '<feColorMatrix in="refracted" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="gChan" />' +
          '<feColorMatrix in="refracted" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="bChan" />' +
          '<feOffset in="bChan" dx="-1.35" dy="-0.6" result="bShift" />' +
          '<feBlend in="rShift" in2="gChan" mode="screen" result="rgBlend" />' +
          '<feBlend in="rgBlend" in2="bShift" mode="screen" result="finalGlass" />' +
        '</filter>' +

        /* Pill / Header / Button Liquid Glass Filter */
        '<filter id="liquid-glass-pill-filter" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">' +
          '<feImage href="' + pillMapUrl + '" result="pillMap" preserveAspectRatio="none" />' +
          '<feDisplacementMap in="SourceGraphic" in2="pillMap" scale="28" xChannelSelector="R" yChannelSelector="G" result="pillRefracted" />' +
        '</filter>' +
      '</defs>';

    document.body.insertBefore(svg, document.body.firstChild);
  }

  /* ------------------------------------------------------------------------
     3. Hermes Silk Twill WebGL ShaderGradient Engine (ruucm/shadergradient style)
     Renders organic draped silk waves, 3-color luxury blending, 45-degree
     diagonal silk twill micro-weave, and tactile archival grain.
     ------------------------------------------------------------------------ */
  const VERTEX_SHADER = [
    'attribute vec2 a_position;',
    'varying vec2 v_uv;',
    'void main() {',
    '  v_uv = a_position * 0.5 + 0.5;',
    '  gl_Position = vec4(a_position, 0.0, 1.0);',
    '}'
  ].join('\n');

  const FRAGMENT_SHADER = [
    'precision mediump float;',
    'varying vec2 v_uv;',
    'uniform float u_time;',
    'uniform vec2 u_resolution;',
    'uniform vec2 u_mouse;',
    'uniform float u_theme;', // 0.0 = Hermes Silk Ivory/Gold, 1.0 = Sovereign Navy/Gold, 2.0 = Warm Cashmere/Gold
    '',
    'float hash(vec2 p) {',
    '  p = fract(p * vec2(123.34, 456.21));',
    '  p += dot(p, p + 45.32);',
    '  return fract(p.x * p.y);',
    '}',
    '',
    'float noise(vec2 p) {',
    '  vec2 i = floor(p);',
    '  vec2 f = fract(p);',
    '  vec2 u = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),',
    '             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);',
    '}',
    '',
    'void main() {',
    '  vec2 uv = v_uv;',
    '  float aspect = u_resolution.x / max(u_resolution.y, 1.0);',
    '  vec2 p = vec2(uv.x * aspect, uv.y);',
    '',
    '  // Subtle mouse parallax offset',
    '  vec2 m = (u_mouse - 0.5) * 0.18;',
    '  p += m;',
    '',
    '  // ShaderGradient waterPlane domain-warped silk folds',
    '  float t = u_time * 0.22;',
    '  float n1 = noise(p * 2.1 + vec2(t * 0.7, -t * 0.5));',
    '  float n2 = noise(p * 3.8 - vec2(t * 0.5, t * 0.65) + n1 * 1.15);',
    '  float silkWave = sin((p.x * 3.2 + p.y * 2.4) + n1 * 3.4 + t) * 0.5 + 0.5;',
    '  float secondaryWave = cos((p.x * 2.1 - p.y * 3.6) + n2 * 2.8 - t * 0.8) * 0.5 + 0.5;',
    '  float foldCrest = pow( clamp(silkWave * 0.62 + secondaryWave * 0.38, 0.0, 1.0), 1.45 );',
    '',
    '  // Hermes 45-degree diagonal silk twill weave & fine cross-thread',
    '  vec2 pixelCoord = uv * u_resolution;',
    '  float twillDiag = sin((pixelCoord.x + pixelCoord.y) * 0.75) * 0.5 + 0.5;',
    '  float crossWeft = sin((pixelCoord.x - pixelCoord.y) * 0.38) * 0.5 + 0.5;',
    '  float silkMicroSheen = (twillDiag * 0.65 + crossWeft * 0.35) - 0.5;',
    '',
    '  // Fine tactile parchment / saddlery grain',
    '  float grain = hash(pixelCoord + fract(u_time * 0.1)) - 0.5;',
    '',
    '  vec3 col;',
    '  if (u_theme < 0.5) {',
    '    // THEME 0: Hermes Silk Carre — Parchment Ivory, Champagne Silk, Burnished Gold & Warm Amber',
    '    vec3 cIvory     = vec3(0.976, 0.961, 0.929); // #F9F5ED',
    '    vec3 cChampagne = vec3(0.922, 0.875, 0.780); // #EBDFC7',
    '    vec3 cGoldRibbon= vec3(0.835, 0.718, 0.455); // #D5B774',
    '    vec3 cSaddleTint= vec3(0.878, 0.812, 0.690); // #E0CFB0',
    '',
    '    col = mix(cIvory, cChampagne, foldCrest * 0.85);',
    '    float ribbonBand = smoothstep(0.42, 0.58, sin(p.x * 2.6 - p.y * 1.9 + n2 * 2.5));',
    '    col = mix(col, cSaddleTint, ribbonBand * 0.52);',
    '    float specularSheen = pow(foldCrest, 3.2) * 0.38;',
    '    col = mix(col, cGoldRibbon, specularSheen);',
    '    col += silkMicroSheen * 0.018;',
    '    col += grain * 0.016;',
    '  } else if (u_theme < 1.5) {',
    '    // THEME 1: Sovereign Midnight — Deep Navy, Prussian Silk, Forest Emerald & Burnished Gold',
    '    vec3 cDeepNavy  = vec3(0.004, 0.055, 0.129); // #010E21',
    '    vec3 cPrussian  = vec3(0.039, 0.125, 0.235); // #0A203C',
    '    vec3 cEmerald   = vec3(0.051, 0.245, 0.165); // Deep Excelstra Green undertone',
    '    vec3 cGoldThread= vec3(0.780, 0.635, 0.265); // #C7A244',
    '',
    '    col = mix(cDeepNavy, cPrussian, foldCrest * 0.9);',
    '    float emeraldCurrent = smoothstep(0.3, 0.75, secondaryWave * n1);',
    '    col = mix(col, cEmerald, emeraldCurrent * 0.42);',
    '    float goldCrest = pow(foldCrest, 3.6) * 0.48;',
    '    col = mix(col, cGoldThread, goldCrest);',
    '    col += silkMicroSheen * 0.022;',
    '    col += grain * 0.02;',
    '  } else {',
    '    // THEME 2: Warm Cashmere & Saddlery Parchment',
    '    vec3 cWarmBase  = vec3(0.953, 0.929, 0.878); // #F3EDE0',
    '    vec3 cCashmere  = vec3(0.890, 0.835, 0.733); // #E3D5BB',
    '    vec3 cBronze    = vec3(0.765, 0.624, 0.325); // #C39F53',
    '    col = mix(cWarmBase, cCashmere, foldCrest * 0.88);',
    '    col = mix(col, cBronze, pow(foldCrest, 3.4) * 0.32);',
    '    col += silkMicroSheen * 0.02;',
    '    col += grain * 0.018;',
    '  }',
    '',
    '  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);',
    '}'
  ].join('\n');

  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createShaderInstance(canvas, themeValue) {
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, preserveDrawingBuffer: false });
    if (!gl) return null;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return null;

    const prog = gl.createProgram();
    if (!prog) return null;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;

    gl.useProgram(prog);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uTheme = gl.getUniformLocation(prog, 'u_theme');

    return {
      canvas: canvas,
      gl: gl,
      prog: prog,
      uTime: uTime,
      uRes: uRes,
      uMouse: uMouse,
      uTheme: uTheme,
      themeValue: themeValue,
      isVisible: false,
      width: 0,
      height: 0,
      seedOffset: Math.random() * 100
    };
  }

  function mountHermesShaderBackdrops() {
    const sections = document.querySelectorAll(
      '.hero-editorial, .page-hero, .section-dark, .section-navy, .section-ivory, .section-white, .section-warm'
    );

    const engravingPool = [
      '../assets/hermes-hero-architecture.jpg',
      '../assets/hermes-hero-membership.jpg',
      '../assets/hermes-hero-events.jpg',
      '../assets/hermes-hero-assessment.jpg',
      '../assets/hermes-hero-speaking.jpg',
      '../assets/hermes-hero-2.jpg',
      '../assets/hermes-hero-3.jpg',
      '../assets/hermes-hero-5.jpg'
    ];

    const instances = [];
    const globalMouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    window.addEventListener('pointermove', function (e) {
      globalMouse.tx = e.clientX / Math.max(window.innerWidth, 1);
      globalMouse.ty = 1.0 - e.clientY / Math.max(window.innerHeight, 1);
    }, { passive: true });

    sections.forEach(function (sec, idx) {
      sec.classList.add('hermes-textured-section');

      let themeVal = 0.0;
      if (sec.classList.contains('section-dark') || sec.classList.contains('section-navy')) {
        themeVal = 1.0;
      } else if (sec.classList.contains('section-warm') || sec.classList.contains('hero-editorial') || sec.classList.contains('page-hero')) {
        themeVal = 2.0;
      }

      const canvas = document.createElement('canvas');
      canvas.className = 'hermes-shader-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      sec.insertBefore(canvas, sec.firstChild);

      // Ensure every section has an intaglio engraving watermark layer so Liquid Glass cards refract classical artwork
      if (!sec.querySelector('.hermes-hero-backdrop, .hermes-dark-backdrop')) {
        const underlay = document.createElement('div');
        underlay.className = (themeVal === 1.0)
          ? 'hermes-dark-backdrop hermes-auto-underlay'
          : 'hermes-hero-backdrop hermes-auto-underlay';
        underlay.style.backgroundImage = "url('" + engravingPool[idx % engravingPool.length] + "')";
        underlay.style.backgroundPosition = (idx % 2 === 0) ? 'right center' : 'left center';
        sec.insertBefore(underlay, canvas.nextSibling);
      }

      // Add a decorative Hermes Carre silk border frame inside the section
      const silkFrame = document.createElement('div');
      silkFrame.className = 'hermes-carre-border';
      silkFrame.setAttribute('aria-hidden', 'true');
      sec.insertBefore(silkFrame, canvas.nextSibling);

      const inst = createShaderInstance(canvas, themeVal);
      if (inst) {
        instances.push(inst);
      }
    });

    if (!instances.length) return;

    function resizeInstance(inst) {
      const rect = inst.canvas.parentElement.getBoundingClientRect();
      // Render at 0.55x resolution for silky interpolation and 60fps performance
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.55;
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (inst.width !== w || inst.height !== h) {
        inst.width = w;
        inst.height = h;
        inst.canvas.width = w;
        inst.canvas.height = h;
      }
    }

    function renderFrame(inst, timeSec) {
      resizeInstance(inst);
      const gl = inst.gl;
      gl.viewport(0, 0, inst.width, inst.height);
      gl.useProgram(inst.prog);
      gl.uniform1f(inst.uTime, timeSec + inst.seedOffset);
      gl.uniform2f(inst.uRes, inst.width, inst.height);
      gl.uniform2f(inst.uMouse, globalMouse.x, globalMouse.y);
      gl.uniform1f(inst.uTheme, inst.themeValue);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    // Initial static paint for all sections
    instances.forEach(function (inst) {
      renderFrame(inst, 1.5);
    });

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if ('IntersectionObserver' in window) {
      const visObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          const match = instances.find(function (i) { return i.canvas.parentElement === entry.target; });
          if (match) {
            match.isVisible = entry.isIntersecting;
          }
        });
      }, { rootMargin: '120px 0px 120px 0px' });

      instances.forEach(function (inst) {
        visObserver.observe(inst.canvas.parentElement);
      });
    } else {
      instances.forEach(function (inst) { inst.isVisible = true; });
    }

    let startTime = performance.now();
    function tick(now) {
      const elapsed = (now - startTime) * 0.001;
      globalMouse.x += (globalMouse.tx - globalMouse.x) * 0.08;
      globalMouse.y += (globalMouse.ty - globalMouse.y) * 0.08;

      for (let i = 0; i < instances.length; i++) {
        if (instances[i].isVisible) {
          renderFrame(instances[i], elapsed);
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------------
     4. Liquid Glass Interactive Surface Tracking (Specular Glare & Elasticity)
     ------------------------------------------------------------------------ */
  function initLiquidGlassSurfaces() {
    const surfaceSelector = [
      '.arch-card',
      '.tier-card',
      '.specialist-card',
      '.chair-plate',
      '.video-testimonial-card',
      '.page-hero-callout',
      '.bridge-explorer',
      '.ledger-grid',
      '.proof-metric-box',
      '.unbroken-alignment-box',
      '.architectural-break-card',
      '.form-card',
      '.diag-shell',
      '.guarantee-banner',
      '.editorial-quote'
    ].join(', ');

    const surfaces = document.querySelectorAll(surfaceSelector);
    surfaces.forEach(function (el) {
      el.classList.add('liquid-glass-surface');

      el.addEventListener('pointermove', function (e) {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
        const y = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
        const dx = (x - 50) / 50;
        const dy = (y - 50) / 50;

        el.style.setProperty('--glass-mx', x.toFixed(1) + '%');
        el.style.setProperty('--glass-my', y.toFixed(1) + '%');
        el.style.setProperty('--glass-tx', (dx * 3.5).toFixed(2) + 'px');
        el.style.setProperty('--glass-ty', (dy * 3.5).toFixed(2) + 'px');
      }, { passive: true });

      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--glass-mx', '50%');
        el.style.setProperty('--glass-my', '0%');
        el.style.setProperty('--glass-tx', '0px');
        el.style.setProperty('--glass-ty', '0px');
      }, { passive: true });
    });
  }

  /* ------------------------------------------------------------------------
     5. Standard Site Interactions (Header, Alignment Map, Diagnostic, FAQ, Video)
     ------------------------------------------------------------------------ */
  function initSiteInteractions() {
    const header = document.querySelector('.site-header');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');

    if (header) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 16) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', function () {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileBtn.textContent = isOpen ? 'Close' : 'Menu';
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
          mobileBtn.setAttribute('aria-expanded', 'false');
          mobileBtn.textContent = 'Menu';
          mobileBtn.focus();
        }
      });
    }

    /* Interactive Alignment Map */
    const bridgeNodes = document.querySelectorAll('[data-bridge-key]');
    const bridgePanes = document.querySelectorAll('[data-bridge-pane]');

    function activateBridgeKey(key) {
      if (!key || !bridgePanes.length) return;
      bridgeNodes.forEach(function (el) {
        const isMatch = el.getAttribute('data-bridge-key') === key;
        if (isMatch) {
          el.classList.add('active');
          if (el.tagName === 'BUTTON') el.setAttribute('aria-pressed', 'true');
        } else {
          el.classList.remove('active');
          if (el.tagName === 'BUTTON') el.setAttribute('aria-pressed', 'false');
        }
      });
      bridgePanes.forEach(function (pane) {
        if (pane.getAttribute('data-bridge-pane') === key) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    }

    bridgeNodes.forEach(function (node) {
      node.addEventListener('click', function () {
        activateBridgeKey(node.getAttribute('data-bridge-key'));
      });
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateBridgeKey(node.getAttribute('data-bridge-key'));
        }
      });
    });

    /* Interactive Whole Wealth Readiness Diagnostic */
    const diagForm = document.getElementById('diagnosticInteractive');
    if (diagForm) {
      const step1 = document.getElementById('diagStep1');
      const step2 = document.getElementById('diagStep2');
      const step3 = document.getElementById('diagStep3');
      const stepResult = document.getElementById('diagResult');

      const btnTo2 = document.getElementById('btnDiagTo2');
      const btnBack1 = document.getElementById('btnDiagBack1');
      const btnTo3 = document.getElementById('btnDiagTo3');
      const btnBack2 = document.getElementById('btnDiagBack2');
      const btnFinish = document.getElementById('btnDiagFinish');
      const btnReset = document.getElementById('btnDiagReset');

      function showStep(stepEl) {
        [step1, step2, step3, stepResult].forEach(function (el) {
          if (el) el.style.display = (el === stepEl) ? 'block' : 'none';
        });
      }

      if (btnTo2) btnTo2.addEventListener('click', function () { showStep(step2); });
      if (btnBack1) btnBack1.addEventListener('click', function () { showStep(step1); });
      if (btnTo3) btnTo3.addEventListener('click', function () { showStep(step3); });
      if (btnBack2) btnBack2.addEventListener('click', function () { showStep(step2); });

      if (btnFinish) {
        btnFinish.addEventListener('click', function () {
          const profileInput = diagForm.querySelector('input[name="diag_profile"]:checked');
          const pillarInput = diagForm.querySelector('input[name="diag_pillar"]:checked');
          const horizonInput = diagForm.querySelector('input[name="diag_horizon"]:checked');

          const profileVal = profileInput ? profileInput.value : 'owner_core';
          const pillarVal = pillarInput ? pillarInput.value : 'integration';
          const horizonVal = horizonInput ? horizonInput.value : 'near_term';

          const altitudeMap = {
            owner_core: {
              tier: 'Gold Engagement Altitude',
              focus: 'Business Owner ($3M to $15M Company Revenue)',
              summary: 'At this stage of growth, integrating your operating company structure with personal tax stewardship and intentional capital allocation creates immediate strategic clarity.'
            },
            owner_scale: {
              tier: 'Diamond or Gold Engagement Altitude',
              focus: 'Established Enterprise Leader ($15M to $50M+ Revenue)',
              summary: 'At your scale, multi-entity tax coordination, off-market wealth amplification, and pre-transition structuring work together to elevate enterprise and family value simultaneously.'
            },
            executive: {
              tier: 'Gold Engagement Altitude',
              focus: 'Executive, Surgeon, or Physician ($500K+ Household Income)',
              summary: 'For high-earning leaders, transforming active income, equity positions, and deferred compensation into tax-efficient, enduring portfolio income is the foundation of lasting freedom.'
            },
            family_office: {
              tier: 'Diamond Bespoke Partnership',
              focus: 'Established Family Office / Multi-Generational Steward',
              summary: 'Full-picture integration across complex holdings, curated independent opportunities, and next-generation stewardship preparation.'
            }
          };

          const pillarInsightMap = {
            tax: 'Primary Lever: Strategic Tax Stewardship (Keep more, with integrity) paired with entity-level alignment.',
            wealth: 'Primary Lever: Wealth Amplification (Grow more, with intention) aligned to your personal vision and independent access.',
            exit: 'Primary Lever: Legacy-Centered Exit Planning (Live more. Leave more.) initiated well ahead of your transition window.',
            integration: 'Primary Lever: Full Three-Pillar Convergence across Tax Stewardship, Wealth Amplification, and Legacy Transition.'
          };

          const horizonNoteMap = {
            immediate: 'Timeline Perspective: Active transition window (1 to 3 years). Pre-transaction structuring and income redesign carry the highest immediate impact.',
            near_term: 'Timeline Perspective: Strategic expansion window (3 to 5 years). Ideal runway to compound tax stewardship and intangible enterprise value.',
            long_term: 'Timeline Perspective: Generational horizon (5+ years). Multi-year architecture designed for enduring freedom and family preparedness.'
          };

          const selectedAltitude = altitudeMap[profileVal] || altitudeMap.owner_core;
          const outTier = document.getElementById('diagOutTier');
          const outProfile = document.getElementById('diagOutProfile');
          const outSummary = document.getElementById('diagOutSummary');
          const outPillar = document.getElementById('diagOutPillar');
          const outHorizon = document.getElementById('diagOutHorizon');

          if (outTier) outTier.textContent = selectedAltitude.tier;
          if (outProfile) outProfile.textContent = selectedAltitude.focus;
          if (outSummary) outSummary.textContent = selectedAltitude.summary;
          if (outPillar) outPillar.textContent = pillarInsightMap[pillarVal] || pillarInsightMap.integration;
          if (outHorizon) outHorizon.textContent = horizonNoteMap[horizonVal] || horizonNoteMap.near_term;

          showStep(stepResult);
        });
      }

      if (btnReset) {
        btnReset.addEventListener('click', function () {
          showStep(step1);
        });
      }
    }

    /* Accordion / FAQ Triggers */
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const item = btn.closest('.accordion-item');
        if (!item) return;
        const isOpen = item.classList.contains('open');
        accordionTriggers.forEach(function (otherBtn) {
          const otherItem = otherBtn.closest('.accordion-item');
          if (otherItem) {
            otherItem.classList.remove('open');
            otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* Interactive Video Testimonial Player & Category Filter */
    const videoWraps = document.querySelectorAll('.video-frame-wrap');
    videoWraps.forEach(function (wrap) {
      const video = wrap.querySelector('video');
      const overlay = wrap.querySelector('.video-play-overlay');
      if (!video || !overlay) return;

      function togglePlay() {
        if (video.paused) {
          document.querySelectorAll('.video-frame-wrap video').forEach(function (otherVid) {
            if (otherVid !== video && !otherVid.paused) {
              otherVid.pause();
            }
          });
          video.setAttribute('controls', 'controls');
          video.play();
        } else {
          video.pause();
        }
      }

      overlay.addEventListener('click', togglePlay);
      overlay.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          togglePlay();
        }
      });

      video.addEventListener('play', function () {
        wrap.classList.add('is-playing');
        video.setAttribute('controls', 'controls');
      });

      video.addEventListener('pause', function () {
        if (video.currentTime === 0 || video.ended) {
          wrap.classList.remove('is-playing');
        }
      });

      video.addEventListener('ended', function () {
        wrap.classList.remove('is-playing');
      });
    });

    const filterButtons = document.querySelectorAll('.video-filter-btn');
    if (filterButtons.length) {
      filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const filterVal = btn.getAttribute('data-video-filter') || 'all';
          const section = btn.closest('section') || document;
          section.querySelectorAll('.video-filter-btn').forEach(function (b) {
            const active = b === btn;
            b.classList.toggle('active', active);
            b.setAttribute('aria-pressed', active ? 'true' : 'false');
          });
          section.querySelectorAll('.video-testimonial-card').forEach(function (card) {
            const cat = card.getAttribute('data-video-category');
            if (filterVal === 'all' || cat === filterVal) {
              card.classList.remove('is-hidden');
            } else {
              const vid = card.querySelector('video');
              if (vid && !vid.paused) vid.pause();
              card.classList.add('is-hidden');
            }
          });
        });
      });
    }
  }

  /* Initialize all systems */
  injectLiquidGlassSVGFilters();
  mountHermesShaderBackdrops();
  initLiquidGlassSurfaces();
  mountVersionSwitcher();
  initSiteInteractions();
})();
