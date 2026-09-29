/* ═══════════════════════════════════════════════════════════════════════
   EXCELSTRA v5 — HYPERFRAMES CANVAS & GSAP SCROLLTRIGGER ENGINE
   Precision frame-accurate playback with GSAP ScrollTrigger pinning,
   kinetic stage transitions, and synchronous SVG vector drawing.
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

  const canvas = document.getElementById('heroFilmCanvas');
  const stage = document.getElementById('heroStage');
  const stages = gsap.utils.toArray('.hero-stage');
  const scrollIndicator = document.getElementById('heroScrollIndicator');
  const heroSvgReticle = document.getElementById('heroSvgReticle');

  if (!canvas || !stage) return;

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
        if (i === 0) {
          resizeCanvas();
          renderFrame(0);
        }
        if (loadedCount >= 16 && !isReady) {
          isReady = true;
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
    // 1. Initial State: Stage 0 is prominently visible on initial landing
    if (stages.length >= 3) {
      gsap.set(stages[0], { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
      gsap.set(stages[1], { autoAlpha: 0, y: 30, filter: 'blur(10px)' });
      gsap.set(stages[2], { autoAlpha: 0, y: 30, filter: 'blur(10px)' });
    }

    // 2. Master Pinned Scrubbing Timeline
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: '+=350%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const frameIdx = Math.round(self.progress * (FRAME_COUNT - 1));
          renderFrame(frameIdx);

          if (scrollIndicator) {
            scrollIndicator.style.opacity = self.progress > 0.04 ? '0' : '1';
          }
        }
      }
    });

    if (stages.length >= 3) {
      // Stage 0: Fades out as user scrolls through first third
      heroTimeline.to(stages[0], {
        autoAlpha: 0,
        y: -30,
        filter: 'blur(8px)',
        duration: 0.8,
        ease: 'power2.in'
      }, 0.6);

      // Stage 1: Enters, holds, exits
      heroTimeline.fromTo(stages[1],
        { autoAlpha: 0, y: 35, filter: 'blur(8px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }, 1.4
      )
      .to(stages[1], {
        autoAlpha: 0,
        y: -30,
        filter: 'blur(8px)',
        duration: 0.8,
        ease: 'power2.in'
      }, 2.4);

      // Stage 2: Resolution & Direct Call to Action
      heroTimeline.fromTo(stages[2],
        { autoAlpha: 0, y: 35, filter: 'blur(8px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }, 3.0
      );
    }
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    initPreload();
  });

  // Backup load check
  setTimeout(() => {
    resizeCanvas();
    if (!isReady && images[0] && images[0].naturalWidth) {
      renderFrame(0);
      initScrollTrigger();
    }
  }, 300);
})();
