/* ═══════════ EXCELSTRA — Cinematic Scroll Film Engine ═══════════ */
(function () {
  'use strict';

  var FRAME_COUNT = 239; // frame_000 … frame_238
  var ASSET_BASE = window.EXCELSTRA_ASSET_BASE || '';
  if (ASSET_BASE && !ASSET_BASE.endsWith('/')) {
    ASSET_BASE += '/';
  }

  // Phones get the 960px set (~10MB); everything else gets the 1920px set
  var FRAME_DIR = window.innerWidth <= 600 ? 'frames-sm/' : 'frames/';
  function frameSrc(i) {
    return ASSET_BASE + FRAME_DIR + 'frame_' + String(i).padStart(3, '0') + '.webp';
  }

  var canvas = document.getElementById('film');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var stage = document.querySelector('.scroll-stage');
  var loader = document.getElementById('loader');
  var loaderBar = document.getElementById('loaderBar');
  var loaderPct = document.getElementById('loaderPct');
  var scrim = document.getElementById('filmScrim');
  var scrollHint = document.getElementById('scrollHint');
  var stages = Array.prototype.slice.call(document.querySelectorAll('.hero-copy.stage'));

  var images = new Array(FRAME_COUNT);
  var loaded = 0;
  var ready = false;

  /* ── Preload all frames with progress bar ── */
  function preload() {
    for (var i = 0; i < FRAME_COUNT; i++) {
      (function (idx) {
        var img = new Image();
        img.onload = img.onerror = function () {
          loaded++;
          var pct = Math.round((loaded / FRAME_COUNT) * 100);
          if (loaderBar) loaderBar.style.width = pct + '%';
          if (loaderPct) loaderPct.textContent = pct + '%';
          if (loaded === FRAME_COUNT) onReady();
        };
        img.src = frameSrc(idx);
        images[idx] = img;
      })(i);
    }
  }

  function onReady() {
    ready = true;
    resize();
    drawFrame(0);
    if (loader) loader.classList.add('done');
    document.body.style.overflow = '';
    requestAnimationFrame(tick);
  }

  /* ── Canvas: cover-fit draw at device pixel ratio ── */
  var dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    lastDrawn = -1; // force redraw
  }

  var lastDrawn = -1;
  function drawFrame(i) {
    var img = images[i];
    if (!img || !img.naturalWidth) return;
    var cw = canvas.width, ch = canvas.height;
    var iw = img.naturalWidth, ih = img.naturalHeight;
    var scale = Math.max(cw / iw, ch / ih);
    var dw = iw * scale, dh = ih * scale;
    var dx = (cw - dw) / 2, dy = (ch - dh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawn = i;
  }

  /* ── Scroll → frame, with easing for cinematic smoothness ── */
  var current = 0;   // smoothed float frame position
  var target = 0;

  function stageProgress() {
    if (!stage) return 0;
    var rect = stage.getBoundingClientRect();
    var total = stage.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    var p = -rect.top / total;
    return Math.max(0, Math.min(1, p));
  }

  /* ── Hero copy stages: [start, full, hold, end] in scroll progress ── */
  var STAGE_WINDOWS = [
    [0.10, 0.20, 0.36, 0.46],   // "To Advise Is Common. To Integrate Is Rare."
    [0.50, 0.58, 0.68, 0.78],   // "You have advisors for the parts..."
    [0.82, 0.90, 1.00, 1.01]    // [ See the Architecture ] + Calculator Note
  ];

  function updateStages(p) {
    for (var s = 0; s < stages.length; s++) {
      var w = STAGE_WINDOWS[s];
      var o = 0;
      if (p >= w[0] && p < w[1]) o = (p - w[0]) / (w[1] - w[0]);
      else if (p >= w[1] && p <= w[2]) o = 1;
      else if (p > w[2] && p < w[3]) o = 1 - (p - w[2]) / (w[3] - w[2]);
      var el = stages[s];
      el.style.opacity = o.toFixed(3);
      var drift = (1 - o) * 26 * (p > w[2] ? -1 : 1);
      el.style.transform = 'translateY(' + drift.toFixed(1) + 'px)';
      el.classList.toggle('active', o > 0.5);
    }
    if (scrollHint) {
      scrollHint.style.opacity = p > 0.04 ? '0' : '1';
    }
    if (scrim) {
      var s = (p - 0.42) / 0.32;
      scrim.style.opacity = Math.max(0, Math.min(1, s)).toFixed(3);
    }
  }

  /* ── Main loop ── */
  function tick() {
    if (ready) {
      if (canvas.width !== Math.round(canvas.clientWidth * dpr) ||
          canvas.height !== Math.round(canvas.clientHeight * dpr)) {
        resize();
      }
      var p = stageProgress();
      target = p * (FRAME_COUNT - 1);
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.05) current = target;
      var frame = Math.round(current);
      if (frame !== lastDrawn) drawFrame(frame);
      updateStages(p);
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', function () {
    resize();
    if (ready) drawFrame(Math.round(current));
  });

  // Hold scroll during initial load
  if (loader && !loader.classList.contains('done')) {
    document.body.style.overflow = 'hidden';
  }
  window.scrollTo(0, 0);
  preload();
})();
