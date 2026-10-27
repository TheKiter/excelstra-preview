/* ═══════════════════════════════════════════════════════════════════════
   EXCELSTRA V6: THE RIPPLE ARCHITECTURE + GLOBAL CONTROLLER
   Built on the V5 Light Luxury Architecture & Brand Steward Canon.
   Includes:
   1. V5/V6 Edition Switcher & Iframe Cache-Buster
   2. Sticky Frosted Navigation & Mobile Drawer
   3. GSAP 3 ScrollTrigger Entrance Reveals
   4. Interactive Skipping Stone Water Canvas (Every Decision Creates a Ripple)
   5. Interactive 5-Discipline Architectural Hub (SVG Vector Council)
   6. Interactive Whole-Picture Readiness Reflection
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 0. Cache-Buster & Floating Design Version Switcher (Just V5 & V6) ── */
  var BUILD_VER = '20261027v6c';
  try {
    var currentUrl = new URL(window.location.href);
    if (currentUrl.protocol.indexOf('http') === 0 && currentUrl.searchParams.get('v') !== BUILD_VER) {
      currentUrl.searchParams.set('v', BUILD_VER);
      window.location.replace(currentUrl.toString());
    }
  } catch (_) {}

  var allLinks = document.querySelectorAll('a[href]');
  for (var li = 0; li < allLinks.length; li++) {
    var rawHref = allLinks[li].getAttribute('href');
    if (!rawHref || rawHref.charAt(0) === '#' || rawHref.indexOf('http') === 0 || rawHref.indexOf('mailto:') === 0 || rawHref.indexOf('tel:') === 0) continue;
    var parts = rawHref.split('#');
    var basePart = parts[0].split('?')[0];
    var hashPart = parts[1] ? '#' + parts[1] : '';
    if (basePart.slice(-5) === '.html') {
      allLinks[li].setAttribute('href', basePart + '?v=' + BUILD_VER + hashPart);
    }
  }

  if (!document.getElementById('designVersionSwitcher')) {
    var pathName = window.location.pathname;
    var fileName = (pathName.split('/').pop() || 'index.html').split('?')[0] || 'index.html';
    var v6File = fileName.slice(-5) === '.html' ? fileName : 'index.html';
    var v5Map = {
      'index.html': 'index.html',
      'the-architecture.html': 'the-architecture.html',
      'membership.html': 'membership.html',
      'about.html': 'about-eunicia.html',
      'book-a-call.html': 'book-a-call.html',
      'privacy.html': 'privacy.html',
      'terms.html': 'terms.html'
    };
    var v5Target = v5Map[v6File] || 'index.html';
    var inV6Subdir = pathName.indexOf('/v6/') !== -1;
    var v5Prefix = inV6Subdir ? '../v5/' : 'v5/';

    var bar = document.createElement('div');
    bar.id = 'designVersionSwitcher';
    bar.className = 'design-version-switcher';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Design Version Comparison Switcher');
    bar.innerHTML =
      '<span class="dvs-label">Edition</span>' +
      '<a href="' + v5Prefix + v5Target + '?v=' + BUILD_VER + '" class="dvs-option">V5 &middot; Light Luxury</a>' +
      '<a href="' + v6File + '?v=' + BUILD_VER + '" class="dvs-option active" aria-current="true">V6 &middot; The Ripple</a>';
    document.body.appendChild(bar);
  }

  /* ── 1. Global Navigation & Mobile Drawer ── */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navToggle.classList.toggle('active', !expanded);
      navMobile.classList.toggle('open', !expanded);
      document.body.style.overflow = !expanded ? 'hidden' : '';
    });

    var mobileLinks = navMobile.querySelectorAll('a');
    for (var k = 0; k < mobileLinks.length; k++) {
      mobileLinks[k].addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  }

  var isHomePage = document.body.classList.contains('home-page');
  var heroStage = document.getElementById('heroStage');

  function updateNavScroll() {
    if (!nav) return;
    if (!isHomePage || !heroStage) {
      nav.classList.add('solid');
      return;
    }
    var rect = heroStage.getBoundingClientRect();
    var threshold = window.innerHeight * 0.35;
    if (rect.bottom <= threshold) {
      nav.classList.add('solid');
    } else {
      nav.classList.remove('solid');
    }
  }

  window.addEventListener('scroll', updateNavScroll, { passive: true });
  window.addEventListener('resize', updateNavScroll, { passive: true });
  updateNavScroll();

  /* ── 2. Scroll Reveal & Parallax Engine ── */
  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);

    var revealEls = document.querySelectorAll('.rv');
    revealEls.forEach(function (el) {
      if (el.closest('#heroStage')) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: function () {
          el.classList.add('in');
        },
        once: true
      });
    });

    setTimeout(function () {
      revealEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.05) {
          el.classList.add('in');
        }
      });
    }, 150);

    var prlxEls = document.querySelectorAll('.prlx');
    prlxEls.forEach(function (el) {
      var depth = parseFloat(el.getAttribute('data-depth') || '0.08');
      gsap.to(el, {
        y: function () { return -window.innerHeight * depth * 1.4; },
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  } else {
    var fallbackObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          fallbackObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.rv').forEach(function (el) {
      fallbackObs.observe(el);
    });
  }

  /* ── 3. Interactive 5-Discipline Architectural Hub (SVG Vector Council) ── */
  var hubSection = document.getElementById('architectural-hub');
  if (hubSection) {
    var hubNodes = hubSection.querySelectorAll('.hub-node');
    var hubTitle = document.getElementById('hubDetailTitle');
    var hubDesc = document.getElementById('hubDetailDesc');

    var hubData = {
      core: {
        title: 'The Excelstra Integration Core · Seen. Heard. Held.',
        desc: 'The single table where your personal priorities and all five specialist disciplines meet. Led by Eunicia Peret, connecting your existing advisors around one shared view of your life and balance sheet.'
      },
      cpa: {
        title: '01 · Strategic Tax Stewardship',
        desc: 'Keep more, with integrity. We examine your tax position across entities and time horizons alongside your CPA, uncovering lawful strategies that stay hidden when specialists work in separate rooms.'
      },
      wealth: {
        title: '02 · Wealth Amplification',
        desc: 'Grow more, with intention. Your capital answers to the life you are building and the transition you are preparing for, so every allocation serves a clear purpose.'
      },
      estate: {
        title: '03 · Legal Structure & Asset Protection',
        desc: 'Protective entity architecture, multi-generational trust design, and governance protocols built in partnership with your legal counsel to guard what you have created.'
      },
      enterprise: {
        title: '04 · Legacy-Centered Exit & Transition',
        desc: 'Live more. Leave more. Whether you are scaling, navigating industry consolidation, or preparing for a sale 24 to 60 months out, we design the transition and the chapter that follows.'
      },
      longevity: {
        title: '05 · Founder Vitality & Personal Clarity',
        desc: 'The founder is the asset everything rests on. We keep your personal growth, health, and family relationships at the center of the plan so you can enjoy what you have built.'
      }
    };

    hubNodes.forEach(function (node) {
      function activateHubNode() {
        var key = node.getAttribute('data-node');
        if (!key || !hubData[key]) return;
        hubNodes.forEach(function (n) { n.classList.remove('active-hub-node'); });
        node.classList.add('active-hub-node');
        if (hubTitle) hubTitle.textContent = hubData[key].title;
        if (hubDesc) hubDesc.textContent = hubData[key].desc;
      }
      node.addEventListener('mouseenter', activateHubNode);
      node.addEventListener('click', activateHubNode);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     4. INTERACTIVE SKIPPING STONE WATER SIMULATION (#ripplePhysicsCanvas)
     "Wealth Serving Life: Every decision creates a ripple."
     ═══════════════════════════════════════════════════════════════════════ */
  var rippleCanvas = document.getElementById('ripplePhysicsCanvas');
  if (rippleCanvas) {
    var ctx = rippleCanvas.getContext('2d');
    var modeBtns = document.querySelectorAll('[data-ripple-mode]');
    var relaunchBtn = document.getElementById('rippleRelaunchBtn');
    var skipPills = document.querySelectorAll('[data-skip-index]');
    var hudBadge = document.getElementById('rippleHudBadge');
    var readoutKicker = document.getElementById('rippleReadoutKicker');
    var readoutTitle = document.getElementById('rippleReadoutTitle');
    var readoutDesc = document.getElementById('rippleReadoutDesc');
    var readoutMetricLabel = document.getElementById('rippleReadoutMetricLabel');
    var readoutMetricValue = document.getElementById('rippleReadoutMetricValue');

    var skipNodesData = [
      {
        index: 0,
        xNorm: 0.17,
        yNorm: 0.60,
        shortLabel: '01 · RELEVANCE',
        kicker: 'Ripple 01 · Personal Relevance & Curiosity',
        title: 'Knowing What You Want for the Chapter Ahead',
        desc: 'Every enduring strategy begins with curiosity and personal relevance. Before we adjust a single structure, we clarify what you want your life and work to look like, and what responsibilities you are ready to hand off. That clarity sets the angle of every move that follows.',
        metricLabel: 'Starting Point',
        metricValue: 'We listen to who you are before we look at what you have.'
      },
      {
        index: 1,
        xNorm: 0.33,
        yNorm: 0.56,
        shortLabel: '02 · FOCUS',
        kicker: 'Ripple 02 · Highest-Effective Focus',
        title: 'Returning Your Energy to the Work You Love',
        desc: 'When you no longer spend your evenings translating between separate advisors, your attention returns to the highest, most effective activity only you can lead. Our team holds the operational follow-through across your financial picture.',
        metricLabel: 'Leadership Return',
        metricValue: 'Coordinated stewardship that frees your time and attention.'
      },
      {
        index: 2,
        xNorm: 0.50,
        yNorm: 0.53,
        shortLabel: '03 · TAX STEWARDSHIP',
        kicker: 'Ripple 03 · Strategic Tax Stewardship',
        title: 'Keep More, With Integrity',
        desc: 'The tax code rewards forward-looking design. Working alongside your CPA, we align your operating entities, real estate, and deductions years ahead of major milestones so what you keep can be redeployed with purpose.',
        metricLabel: 'First Pillar',
        metricValue: 'What you keep, you redeploy. What you redeploy, compounds.'
      },
      {
        index: 3,
        xNorm: 0.67,
        yNorm: 0.56,
        shortLabel: '04 · AMPLIFICATION',
        kicker: 'Ripple 04 · Wealth Amplification',
        title: 'Grow More, With Intention',
        desc: 'Money amplifies what matters most to you. We align your capital, liquidity, and private investments with your personal timeline so your balance sheet supports your growth rather than pulling your attention away from it.',
        metricLabel: 'Second Pillar',
        metricValue: 'Capital structured around your timeline and priorities.'
      },
      {
        index: 4,
        xNorm: 0.84,
        yNorm: 0.60,
        shortLabel: '05 · LEGACY',
        kicker: 'Ripple 05 · Legacy-Centered Exit Planning',
        title: 'Live More. Leave More.',
        desc: 'A business transition or industry shift is a single season; your family and your name endure for generations. We prepare your enterprise and estate two to five years in advance so you transition on your own terms.',
        metricLabel: 'Third Pillar',
        metricValue: 'Wealth that serves your family, your work, and your future.'
      }
    ];

    var sinkReadout = {
      kicker: 'Isolated Decision · Without the Whole in View',
      title: 'Why Disconnected Recommendations Lose Momentum',
      desc: 'Even capable specialists can only advise on the part of your picture they are shown. When a tax tactic, an investment product, or an entity change is introduced without considering your wider business and personal priorities, the move stops where it lands instead of carrying your plan forward.',
      metricLabel: 'Structural Difference',
      metricValue: 'Isolated moves address a single year; integrated design creates a lasting ripple.'
    };

    var currentMode = 'skip';
    var selectedNodeIdx = 0;
    var W = 900;
    var H = 430;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    var ripples = [];
    var particles = [];
    var trailPoints = [];

    var stone = {
      active: false,
      mode: 'skip',
      t: 0,
      segIdx: 0,
      x: 0,
      y: 0,
      sinkDepth: 0
    };

    function resizeCanvas() {
      var rect = rippleCanvas.parentElement.getBoundingClientRect();
      W = Math.max(320, rect.width);
      H = window.innerWidth < 700 ? 360 : 430;
      rippleCanvas.width = W * dpr;
      rippleCanvas.height = H * dpr;
      rippleCanvas.style.width = W + 'px';
      rippleCanvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawnRipple(x, y, maxR, color, speed, rings) {
      var count = rings || 3;
      for (var i = 0; i < count; i++) {
        ripples.push({
          x: x,
          y: y,
          r: 4 + i * 10,
          maxR: maxR + i * 28,
          alpha: 0.85 - i * 0.18,
          color: color || '218, 190, 129',
          speed: (speed || 1.15) * (1 - i * 0.08)
        });
      }
    }

    function spawnSplash(x, y, isGold) {
      var count = isGold ? 14 : 22;
      for (var i = 0; i < count; i++) {
        var angle = -Math.PI * 0.15 - Math.random() * Math.PI * 0.7;
        var spd = (isGold ? 2.2 : 3.2) + Math.random() * 2.8;
        particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * spd * (isGold ? 1.1 : 0.6),
          vy: Math.sin(angle) * spd,
          r: 1.5 + Math.random() * 2.2,
          alpha: 0.9,
          color: isGold ? '218, 190, 129' : '158, 177, 185'
        });
      }
    }

    function updateReadoutForSkip(idx) {
      var item = skipNodesData[idx] || skipNodesData[0];
      selectedNodeIdx = item.index;
      skipPills.forEach(function (pill, i) {
        pill.classList.toggle('active', i === selectedNodeIdx);
      });
      if (readoutKicker) readoutKicker.textContent = item.kicker;
      if (readoutTitle) readoutTitle.textContent = item.title;
      if (readoutDesc) readoutDesc.textContent = item.desc;
      if (readoutMetricLabel) readoutMetricLabel.textContent = item.metricLabel;
      if (readoutMetricValue) readoutMetricValue.textContent = item.metricValue;
    }

    function updateReadoutForSink() {
      skipPills.forEach(function (pill) { pill.classList.remove('active'); });
      if (readoutKicker) readoutKicker.textContent = sinkReadout.kicker;
      if (readoutTitle) readoutTitle.textContent = sinkReadout.title;
      if (readoutDesc) readoutDesc.textContent = sinkReadout.desc;
      if (readoutMetricLabel) readoutMetricLabel.textContent = sinkReadout.metricLabel;
      if (readoutMetricValue) readoutMetricValue.textContent = sinkReadout.metricValue;
    }

    function launchStone(mode) {
      currentMode = mode || currentMode;
      trailPoints = [];
      stone.active = true;
      stone.mode = currentMode;
      stone.t = 0;
      stone.segIdx = 0;
      stone.sinkDepth = 0;

      modeBtns.forEach(function (btn) {
        var m = btn.getAttribute('data-ripple-mode');
        var isAct = m === currentMode;
        btn.classList.toggle('active', isAct);
        btn.setAttribute('aria-pressed', isAct ? 'true' : 'false');
      });

      if (currentMode === 'skip') {
        if (hudBadge) {
          hudBadge.textContent = 'Whole-Picture Design · 5 Connected Ripples Across Your Life & Wealth';
          hudBadge.style.color = '#DABE81';
        }
        updateReadoutForSkip(0);
      } else {
        if (hudBadge) {
          hudBadge.textContent = 'Isolated Decision · Single Impact Without Downstream Coordination';
          hudBadge.style.color = '#9EB1B9';
        }
        updateReadoutForSink();
      }
    }

    modeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var m = btn.getAttribute('data-ripple-mode');
        launchStone(m);
      });
    });

    if (relaunchBtn) {
      relaunchBtn.addEventListener('click', function () {
        launchStone(currentMode);
      });
    }

    skipPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        var idx = parseInt(pill.getAttribute('data-skip-index') || '0', 10);
        if (currentMode !== 'skip') {
          currentMode = 'skip';
          modeBtns.forEach(function (b) {
            var act = b.getAttribute('data-ripple-mode') === 'skip';
            b.classList.toggle('active', act);
            b.setAttribute('aria-pressed', act ? 'true' : 'false');
          });
          if (hudBadge) {
            hudBadge.textContent = 'Whole-Picture Design · 5 Connected Ripples Across Your Life & Wealth';
            hudBadge.style.color = '#DABE81';
          }
        }
        updateReadoutForSkip(idx);
        var node = skipNodesData[idx];
        if (node) {
          spawnRipple(node.xNorm * W, node.yNorm * H, 135, '218, 190, 129', 1.25, 4);
          spawnSplash(node.xNorm * W, node.yNorm * H, true);
        }
      });
    });

    rippleCanvas.addEventListener('click', function (e) {
      var rect = rippleCanvas.getBoundingClientRect();
      var cx = e.clientX - rect.left;
      var cy = e.clientY - rect.top;

      for (var i = 0; i < skipNodesData.length; i++) {
        var nx = skipNodesData[i].xNorm * W;
        var ny = skipNodesData[i].yNorm * H;
        var dist = Math.hypot(cx - nx, cy - ny);
        if (dist < 38) {
          updateReadoutForSkip(i);
          spawnRipple(nx, ny, 140, '218, 190, 129', 1.3, 4);
          spawnSplash(nx, ny, true);
          return;
        }
      }

      if (cy > H * 0.34) {
        spawnRipple(cx, cy, 110, currentMode === 'skip' ? '218, 190, 129' : '158, 177, 185', 1.15, 3);
        spawnSplash(cx, cy, currentMode === 'skip');
      }
    });

    var wavePhase = 0;
    function renderFrame() {
      wavePhase += 0.018;
      ctx.clearRect(0, 0, W, H);

      var skyGrad = ctx.createLinearGradient(0, 0, 0, H);
      skyGrad.addColorStop(0, '#071118');
      skyGrad.addColorStop(0.38, '#0D1E26');
      skyGrad.addColorStop(0.42, '#112730');
      skyGrad.addColorStop(1, '#061015');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      var horizonY = H * 0.38;
      var sunGlow = ctx.createRadialGradient(W * 0.5, horizonY, 10, W * 0.5, horizonY, W * 0.45);
      sunGlow.addColorStop(0, 'rgba(191, 155, 48, 0.20)');
      sunGlow.addColorStop(0.5, 'rgba(191, 155, 48, 0.06)');
      sunGlow.addColorStop(1, 'rgba(191, 155, 48, 0)');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, W, H);

      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(W, horizonY);
      ctx.strokeStyle = 'rgba(218, 190, 129, 0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();

      for (var row = 1; row <= 9; row++) {
        var py = horizonY + Math.pow(row / 9, 1.55) * (H - horizonY - 12);
        ctx.beginPath();
        for (var x = 0; x <= W; x += 24) {
          var wy = py + Math.sin(x * 0.015 + wavePhase + row * 0.7) * (1.2 + row * 0.25);
          if (x === 0) ctx.moveTo(x, wy);
          else ctx.lineTo(x, wy);
        }
        ctx.strokeStyle = 'rgba(218, 190, 129, ' + (0.03 + row * 0.008).toFixed(3) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (var r = ripples.length - 1; r >= 0; r--) {
        var rp = ripples[r];
        rp.r += rp.speed;
        var progress = rp.r / rp.maxR;
        var curAlpha = rp.alpha * (1 - progress);
        if (curAlpha <= 0.01 || rp.r >= rp.maxR) {
          ripples.splice(r, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.36, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(' + rp.color + ', ' + curAlpha.toFixed(3) + ')';
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.restore();
      }

      if (currentMode === 'skip') {
        ctx.save();
        ctx.beginPath();
        for (var n = 0; n < skipNodesData.length; n++) {
          var nx = skipNodesData[n].xNorm * W;
          var ny = skipNodesData[n].yNorm * H;
          if (n === 0) ctx.moveTo(nx, ny);
          else ctx.lineTo(nx, ny);
        }
        ctx.strokeStyle = 'rgba(191, 155, 48, 0.22)';
        ctx.setLineDash([4, 6]);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      for (var i = 0; i < skipNodesData.length; i++) {
        var nd = skipNodesData[i];
        var xPos = nd.xNorm * W;
        var yPos = nd.yNorm * H;
        var isSelected = (currentMode === 'skip' && selectedNodeIdx === i);
        var nodeAlpha = currentMode === 'skip' ? 1 : 0.28;

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(xPos, yPos, isSelected ? 26 : 18, isSelected ? 10 : 7, 0, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? 'rgba(191, 155, 48, 0.24)' : 'rgba(191, 155, 48, 0.08)';
        ctx.fill();
        ctx.strokeStyle = isSelected
          ? 'rgba(218, 190, 129, 0.95)'
          : 'rgba(218, 190, 129, ' + (0.42 * nodeAlpha).toFixed(2) + ')';
        ctx.lineWidth = isSelected ? 1.8 : 1.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(xPos, yPos, isSelected ? 5.5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#DABE81' : 'rgba(218, 190, 129, ' + (0.75 * nodeAlpha).toFixed(2) + ')';
        ctx.fill();

        if (W > 520) {
          ctx.font = (isSelected ? '600 ' : '500 ') + '10px Inter, sans-serif';
          ctx.fillStyle = isSelected
            ? '#F7F4EE'
            : 'rgba(240, 244, 245, ' + (0.72 * nodeAlpha).toFixed(2) + ')';
          ctx.textAlign = 'center';
          ctx.fillText(nd.shortLabel, xPos, yPos + 24);
        }
        ctx.restore();
      }

      if (stone.active) {
        if (stone.mode === 'skip') {
          var startX = W * 0.04;
          var startY = H * 0.24;
          var segCount = skipNodesData.length;
          var segProgress = stone.t;

          var p0x = stone.segIdx === 0 ? startX : skipNodesData[stone.segIdx - 1].xNorm * W;
          var p0y = stone.segIdx === 0 ? startY : skipNodesData[stone.segIdx - 1].yNorm * H;
          var p1x = skipNodesData[stone.segIdx].xNorm * W;
          var p1y = skipNodesData[stone.segIdx].yNorm * H;

          var arcHeight = stone.segIdx === 0 ? 55 : Math.max(26, 48 - stone.segIdx * 5);
          stone.x = p0x + (p1x - p0x) * segProgress;
          stone.y = p0y + (p1y - p0y) * segProgress - Math.sin(segProgress * Math.PI) * arcHeight;

          trailPoints.push({ x: stone.x, y: stone.y, alpha: 0.85 });
          if (trailPoints.length > 38) trailPoints.shift();

          stone.t += 0.022;
          if (stone.t >= 1) {
            stone.t = 0;
            var hitNode = skipNodesData[stone.segIdx];
            var hx = hitNode.xNorm * W;
            var hy = hitNode.yNorm * H;
            spawnRipple(hx, hy, 125 + stone.segIdx * 12, '218, 190, 129', 1.18, 3);
            spawnSplash(hx, hy, true);
            updateReadoutForSkip(stone.segIdx);

            stone.segIdx++;
            if (stone.segIdx >= segCount) {
              stone.active = false;
            }
          }
        } else {
          var s0x = W * 0.14;
          var s0y = H * 0.14;
          var impactX = W * 0.34;
          var impactY = H * 0.58;

          if (stone.t < 1) {
            stone.t += 0.032;
            var easeIn = stone.t * stone.t;
            stone.x = s0x + (impactX - s0x) * stone.t;
            stone.y = s0y + (impactY - s0y) * easeIn;
            trailPoints.push({ x: stone.x, y: stone.y, alpha: 0.7 });
            if (stone.t >= 1) {
              spawnRipple(impactX, impactY, 58, '158, 177, 185', 0.85, 2);
              spawnSplash(impactX, impactY, false);
            }
          } else {
            stone.sinkDepth += 1.65;
            stone.x = impactX + Math.sin(stone.sinkDepth * 0.08) * 2.5;
            stone.y = impactY + stone.sinkDepth;
            if (stone.y > H - 22) {
              stone.active = false;
            }
          }
        }
      }

      if (trailPoints.length > 1) {
        for (var tp = 1; tp < trailPoints.length; tp++) {
          var pt0 = trailPoints[tp - 1];
          var pt1 = trailPoints[tp];
          pt0.alpha *= 0.965;
          ctx.beginPath();
          ctx.moveTo(pt0.x, pt0.y);
          ctx.lineTo(pt1.x, pt1.y);
          ctx.strokeStyle = stone.mode === 'skip'
            ? 'rgba(218, 190, 129, ' + (pt0.alpha * 0.65).toFixed(3) + ')'
            : 'rgba(158, 177, 185, ' + (pt0.alpha * 0.45).toFixed(3) + ')';
          ctx.lineWidth = stone.mode === 'skip' ? 2.2 : 1.8;
          ctx.stroke();
        }
      }

      if (stone.active || stone.mode === 'sink') {
        ctx.save();
        var isSinkingSubmerged = stone.mode === 'sink' && stone.t >= 1;
        var stoneAlpha = isSinkingSubmerged ? Math.max(0.18, 1 - stone.sinkDepth / 150) : 1;
        ctx.translate(stone.x, stone.y);
        ctx.beginPath();
        if (stone.mode === 'skip') {
          ctx.ellipse(0, 0, 10, 5.5, -0.12, 0, Math.PI * 2);
          ctx.fillStyle = '#DABE81';
          ctx.shadowColor = 'rgba(218, 190, 129, 0.8)';
          ctx.shadowBlur = 14;
          ctx.fill();
        } else {
          ctx.arc(0, 0, 9.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(130, 146, 154, ' + stoneAlpha.toFixed(2) + ')';
          ctx.fill();
          if (isSinkingSubmerged && W > 480) {
            ctx.font = '500 10px Inter, sans-serif';
            ctx.fillStyle = 'rgba(158, 177, 185, 0.78)';
            ctx.textAlign = 'left';
            ctx.fillText('Isolated Strategy · Stops Where It Lands', 16, 4);
          }
        }
        ctx.restore();
      }

      for (var p = particles.length - 1; p >= 0; p--) {
        var pt = particles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.16;
        pt.alpha -= 0.024;
        if (pt.alpha <= 0) {
          particles.splice(p, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + pt.color + ', ' + pt.alpha.toFixed(2) + ')';
        ctx.fill();
      }

      requestAnimationFrame(renderFrame);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    requestAnimationFrame(renderFrame);

    var hasAutoLaunched = false;
    var simObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasAutoLaunched) {
          hasAutoLaunched = true;
          launchStone('skip');
        }
      });
    }, { threshold: 0.25 });
    simObserver.observe(rippleCanvas);

    setInterval(function () {
      if (!stone.active && currentMode === 'skip') {
        var randIdx = Math.floor(Math.random() * skipNodesData.length);
        var rn = skipNodesData[randIdx];
        spawnRipple(rn.xNorm * W, rn.yNorm * H, 85, '218, 190, 129', 0.9, 2);
      }
    }, 3200);
  }

  /* ═══════════════════════════════════════════════════════════════════════
     5. INTERACTIVE WHOLE-PICTURE READINESS REFLECTION (book-a-call.html)
     ═══════════════════════════════════════════════════════════════════════ */
  var diagRunBtn = document.getElementById('v6DiagRunBtn');
  if (diagRunBtn) {
    diagRunBtn.addEventListener('click', function () {
      var q1 = document.querySelector('input[name="v6_friction"]:checked');
      var q2 = document.querySelector('input[name="v6_desire"]:checked');
      var q3 = document.querySelector('input[name="v6_scale"]:checked');

      var v1 = q1 ? q1.value : 'coordination';
      var v2 = q2 ? q2.value : 'relevance';
      var v3 = q3 ? q3.value : 'enterprise';

      var frictionMap = {
        coordination: 'Your CPA, attorney, and financial advisor each bring strong discipline to their part. Our first step is connecting their work around one shared plan so every move reinforces the next.',
        focus: 'You have built a substantial enterprise and carried the responsibility for everyone around you. We step in to hold the structural follow-through across your wealth so your energy returns to the work you love.',
        tailored: 'A life and business built by hand call for a strategy designed around your specific priorities, timeline, and risk posture rather than a standard model.',
        transition: 'As your industry evolves or a future transition comes into view, we engineer your tax, entity, and estate structure 24 to 60 months ahead so you move on your own terms.'
      };

      var desireMap = {
        relevance: 'We begin with a clear read of your whole picture: what you want your next chapter to hold, what you are ready to hand off, and how each financial decision can serve that direction.',
        love_work: 'Our specialist chairs coordinate the technical preparation and inter-advisor meetings, freeing you to focus on the highest-value leadership only you can provide.',
        amplify: 'We align your capital and tax savings with your long-term vision, and welcome you into True Wealth Mastery alongside peers building at your altitude.',
        family: 'We structure your trusts, governance, and liquidity timeline so your wealth strengthens family connection and prepares the next generation with care.'
      };

      var altitudeMap = {
        core: 'Recommended Engagement: Gold Partnership · A twelve-month engagement with up to sixteen private strategy sessions, active tax and entity coordination, and access to the Excelstra roundtable.',
        enterprise: 'Recommended Engagement: Gold or Diamond Partnership · Full multidisciplinary coordination across operating entities, statutory tax stewardship, and transition readiness.',
        family_office: 'Recommended Engagement: Diamond Partnership · Our fullest twelve-month partnership with up to thirty private strategy sessions, complete family-office orchestration, and multi-generational exit design.'
      };

      var out1 = document.getElementById('v6OutFriction');
      var out2 = document.getElementById('v6OutDesire');
      var out3 = document.getElementById('v6OutAltitude');
      var box = document.getElementById('v6DiagResultBox');

      if (out1) out1.textContent = frictionMap[v1] || frictionMap.coordination;
      if (out2) out2.textContent = desireMap[v2] || desireMap.relevance;
      if (out3) out3.textContent = altitudeMap[v3] || altitudeMap.enterprise;
      if (box) {
        box.style.display = 'block';
        box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* ── 6. Newsletter Form Handler ── */
  var nlForms = document.querySelectorAll('.newsletter-form');
  nlForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var input = form.querySelector('input[type="email"]');
      if (btn) {
        btn.textContent = 'Subscribed';
        btn.disabled = true;
      }
      if (input) input.value = '';
    });
  });
})();
