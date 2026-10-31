/* ═══════════════════════════════════════════════════════════════════════
   EXCELSTRA v5: HYPERFRAMES CANVAS & GSAP SCROLLTRIGGER ENGINE
   Precision frame-accurate playback with GSAP ScrollTrigger pinning,
   hardware-accelerated kinetic stage transitions (opacity + transform only).
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const FRAME_COUNT = 239; // frame_000 to frame_238
  const ASSET_BASE = window.EXCELSTRA_ASSET_BASE || '';
  const isMobile = window.innerWidth <= 600;
  const FRAME_DIR = isMobile ? 'frames-sm/' : 'frames/';

  function getFrameSrc(index) {
    const padded = String(index).padStart(3, '0');
    return `${ASSET_BASE}${FRAME_DIR}frame_${padded}.webp`;
  }

  const canvas = document.getElementById('heroFilmCanvas') || document.getElementById('film');
  const stage = document.getElementById('heroStage') || document.getElementById('top');
  const stages = gsap.utils.toArray('.hero-stage, .hero-copy.stage');
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderPct = document.getElementById('loaderPct');

  function dismissLoader() {
    if (loader && !loader.classList.contains('done')) {
      loader.classList.add('done');
    }
  }

  if (!canvas || !stage) {
    dismissLoader();
    return;
  }

  const ctx = canvas.getContext('2d');
  const images = new Array(FRAME_COUNT);
  let loadedCount = 0;
  let isReady = false;
  let currentFrameIndex = 0;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = stage.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (images[currentFrameIndex] && images[currentFrameIndex].naturalWidth) {
      renderFrame(currentFrameIndex);
    }
  }

  function renderFrame(index) {
    currentFrameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
    const img = images[currentFrameIndex];
    if (!img || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function initPreload() {
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / FRAME_COUNT) * 100);
        if (loaderBar) loaderBar.style.width = pct + '%';
        if (loaderPct) loaderPct.textContent = pct + '%';

        if (i === 0) {
          resizeCanvas();
          renderFrame(0);
        }
        if (loadedCount >= 16 && !isReady) {
          isReady = true;
          dismissLoader();
          initScrollTrigger();
        }
      };
      img.onerror = () => {
        loadedCount++;
      };
      img.src = getFrameSrc(i);
      images[i] = img;
    }
  }

  function initScrollTrigger() {
    // 1. Initial State: Stage 0 is prominently visible on landing.
    // Clean hardware-accelerated transforms and opacity only (NO BLUR FILTERS).
    if (stages.length >= 3) {
      gsap.set(stages[0], { autoAlpha: 1, y: 0, force3D: true });
      gsap.set(stages[1], { autoAlpha: 0, y: 28, force3D: true });
      gsap.set(stages[2], { autoAlpha: 0, y: 28, force3D: true });
    }

    // 2. Master Pinned Scrubbing Timeline
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const frameIdx = Math.round(self.progress * (FRAME_COUNT - 1));
          renderFrame(frameIdx);
        }
      }
    });

    if (stages.length >= 3) {
      // Stage 0: Fades out as user begins scroll scrub
      heroTimeline.to(stages[0], {
        autoAlpha: 0,
        y: -24,
        duration: 0.6,
        ease: 'power2.in'
      }, 0.4);

      // Stage 1: Enters, holds, exits cleanly
      heroTimeline.fromTo(stages[1],
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.9
      )
      .to(stages[1], {
        autoAlpha: 0,
        y: -24,
        duration: 0.6,
        ease: 'power2.in'
      }, 1.6);

      // Stage 2: Resolution & Direct Consultation CTA
      heroTimeline.fromTo(stages[2],
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        2.1
      );
    }
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    initPreload();
  });

  // Safety fallback dismissal
  setTimeout(() => {
    resizeCanvas();
    dismissLoader();
    if (!isReady && images[0] && images[0].naturalWidth) {
      renderFrame(0);
      initScrollTrigger();
    }
  }, 1200);
})();
