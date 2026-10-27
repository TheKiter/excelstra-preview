/* ═══════════════════════════════════════════════════════════════════════
   EXCELSTRA V6: RIPPLE & FREQUENCY PHYSICS ENGINE + GLOBAL CONTROLLER
   Built on the V5 Light Luxury Architecture.
   Includes:
   1. V5/V6 Edition Switcher & Iframe Cache-Buster
   2. Sticky Frosted Navigation & Mobile Drawer
   3. GSAP 3 ScrollTrigger Entrance Reveals
   4. Interactive Skipping Stone vs. Sinking Rock Water Physics Canvas
   5. Interactive 5-Discipline Architectural Hub (SVG Vector Council)
   6. Interactive Relevance & Ripple Readiness Diagnostic
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 0. Cache-Buster & Floating Design Version Switcher (Just V5 & V6) ── */
  var BUILD_VER = '20261027v6a';
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
      '<a href="' + v6File + '?v=' + BUILD_VER + '" class="dvs-option active" aria-current="true">V6 &middot; Ripple &amp; Frequency</a>';
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

  if (typeof ScrollTrigger !== 'undefined' && nav) {
    ScrollTrigger.create({
      start: 'top -40',
      onUpdate: function (self) {
        if (self.direction === 1 && self.progress > 0.04) {
          nav.classList.add('scrolled', 'solid');
        } else if (self.progress <= 0.01) {
          nav.classList.remove('scrolled', 'solid');
        }
      }
    });
  } else if (nav) {
    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      nav.classList.toggle('scrolled', scrollY > 40);
      nav.classList.toggle('solid', scrollY > 40);
    }, { passive: true });
  }

  /* ── 2. Universal GSAP Entrance Reveals ── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    var revealTargets = gsap.utils.toArray('.glass-card, .tier-card, .tier-box, .level-card, .person, .testimonial-card, .pedigree-item, .dossier, .portrait-card, .unspoken-card, .sanctuary-card');
    if (revealTargets.length) {
      revealTargets.forEach(function (el) {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 24, force3D: true },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }

    var rvEls = gsap.utils.toArray('.rv:not(.in)');
    if (rvEls.length) {
      rvEls.forEach(function (el) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: function () {
            el.classList.add('in');
          }
        });
      });
    }

    var photoBreaks = gsap.utils.toArray('.photo-break');
    photoBreaks.forEach(function (pb) {
      var img = pb.querySelector('img');
      if (img) {
        gsap.fromTo(img,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 8,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: pb,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    });
  } else {
    var allRv = document.querySelectorAll('.rv');
    for (var fi = 0; fi < allRv.length; fi++) {
      allRv[fi].classList.add('in');
    }
  }

  /* ── 3. Awe-Inspiring Skipping Stone vs. Sinking Rock Physics Engine ── */
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

    var skipData = [
      {
        kicker: 'Skip 01 · Inner Relevance & Curiosity',
        title: 'Knowing What You Want vs. What You Really Do Not Want',
        desc: 'Before touching a single tax or investment tactic, we start with curiosity and personal relevance. Most owners are stuck scanning for what is wrong or repeating old patterns. When you clarify what you truly want versus what you refuse to carry anymore, the angle of the stone is set.',
        metricLabel: 'Frequency Shift',
        metricValue: 'From Pattern Repetition & Fear to Curiosity & What Is Possible',
        normX: 0.16,
        normY: 0.62
      },
      {
        kicker: 'Skip 02 · Highest-Effectiveness Flow',
        title: 'Forgetting Dead Tactics so You Can Love What You Do Again',
        desc: 'You are paid not only for your work, but for the heavy emotional labor of carrying everyone else. By releasing the things you have over-owned and focusing on your highest, most effective activity, your business ceiling expands alongside your personal growth.',
        metricLabel: 'Founder Liberation',
        metricValue: 'Stop Overgiving & Carrying It Alone · Reclaim Creative Joy',
        normX: 0.33,
        normY: 0.56
      },
      {
        kicker: 'Skip 03 · Strategic Tax Stewardship',
        title: 'Keep More, With Integrity (Fueling the Next Ripple)',
        desc: 'Instead of a CPA filing history in isolation or pushing a risky scheme that gets you in trouble, tax stewardship is engineered around your life vision. Every lawful dollar preserved becomes clean energy redeployed into your trajectory.',
        metricLabel: 'Capital Preserved',
        metricValue: 'Proactive Multi-Entity Tax Architecture Aligned to Your Why',
        normX: 0.50,
        normY: 0.61
      },
      {
        kicker: 'Skip 04 · Intentional Wealth Amplification',
        title: 'Money Amplifies Your Frequency',
        desc: 'Your financial team should never impose cookie-cutter strategies on you without understanding the hard knocks inside your business. When your capital answers to your intention and frequency, your portfolio stops drifting and starts compounding.',
        metricLabel: 'Energetic Alignment',
        metricValue: 'Zero Cookie-Cutter Products · Bespoke Private Market & Liquidity Design',
        normX: 0.68,
        normY: 0.55
      },
      {
        kicker: 'Skip 05 · Family, Tribe & Legacy Resonance',
        title: 'Seen, Heard, Held · And Connected to Those You Love',
        desc: 'Whether your industry is consolidating or you are reinventing who you are, you never lose yourself or your relevance. The fifth ripple secures your transition years in advance so wealth deepens connection with your family and those you love.',
        metricLabel: 'The Ultimate Return',
        metricValue: 'Safe Reinvention · Multi-Generational Harmony & Enduring Purpose',
        normX: 0.85,
        normY: 0.60
      }
    ];

    var sinkInfo = {
      kicker: 'Typical Advisory · The Sinking Rock Effect',
      title: 'Why Isolated Strategies Sink Without a Ripple',
      desc: 'When an advisor, CPA, or attorney imposes a pre-packaged tactic on you without understanding your bigger picture, the emotional weight you carry, or what you truly want, it hits the water at a steep angle and sinks straight to the bottom. You are left anxious from past bad advice and stuck doing more of the same.',
      metricLabel: 'Trajectory Outcome',
      metricValue: 'Zero Ripple Effect · Fragmented Silos & Pattern Repetition'
    };

    var currentMode = 'skip';
    var activeSkipIndex = 0;
    var ripples = [];
    var particles = [];
    var stone = null;
    var cw = 800;
    var ch = 420;

    function updateReadout(idx, isSink) {
      if (isSink) {
        if (readoutKicker) readoutKicker.textContent = sinkInfo.kicker;
        if (readoutTitle) readoutTitle.textContent = sinkInfo.title;
        if (readoutDesc) readoutDesc.textContent = sinkInfo.desc;
        if (readoutMetricLabel) readoutMetricLabel.textContent = sinkInfo.metricLabel;
        if (readoutMetricValue) readoutMetricValue.textContent = sinkInfo.metricValue;
        for (var s = 0; s < skipPills.length; s++) {
          skipPills[s].classList.remove('active');
        }
        return;
      }
      var item = skipData[idx] || skipData[0];
      activeSkipIndex = idx;
      if (readoutKicker) readoutKicker.textContent = item.kicker;
      if (readoutTitle) readoutTitle.textContent = item.title;
      if (readoutDesc) readoutDesc.textContent = item.desc;
      if (readoutMetricLabel) readoutMetricLabel.textContent = item.metricLabel;
      if (readoutMetricValue) readoutMetricValue.textContent = item.metricValue;
      for (var p = 0; p < skipPills.length; p++) {
        skipPills[p].classList.toggle('active', p === idx);
      }
    }

    function spawnRipple(x, y, maxR, colorType, strength) {
      ripples.push({
        x: x,
        y: y,
        r: 4,
        maxR: maxR || 190,
        alpha: strength || 0.95,
        colorType: colorType || 'gold',
        speed: colorType === 'sink' ? 1.35 : 1.85
      });
      // Spawn luminous spray particles
      var count = colorType === 'sink' ? 10 : 16;
      for (var i = 0; i < count; i++) {
        var ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        var spd = (colorType === 'sink' ? 1.2 : 2.2) * (0.5 + Math.random() * 0.8);
        particles.push({
          x: x,
          y: y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd * 0.45 - (colorType === 'sink' ? 1.0 : 2.4),
          life: 1.0,
          colorType: colorType
        });
      }
    }

    function launchSimulation(mode) {
      currentMode = mode;
      for (var b = 0; b < modeBtns.length; b++) {
        var isAct = modeBtns[b].getAttribute('data-ripple-mode') === mode;
        modeBtns[b].classList.toggle('active', isAct);
        modeBtns[b].setAttribute('aria-pressed', isAct ? 'true' : 'false');
      }

      if (mode === 'skip') {
        if (hudBadge) {
          hudBadge.textContent = 'Trajectory: Mastered Angle · 5 Harmonic Ripples Active';
        }
        stone = {
          mode: 'skip',
          progress: 0,
          speed: 0.0052,
          lastSkipTriggered: -1,
          trail: []
        };
        updateReadout(0, false);
      } else {
        if (hudBadge) {
          hudBadge.textContent = 'Trajectory: Unaligned Imposition · Sinks on Impact (0% Ripple)';
        }
        stone = {
          mode: 'sink',
          progress: 0,
          speed: 0.011,
          impacted: false,
          x: cw * 0.32,
          y: ch * 0.12,
          sinkDepth: 0,
          trail: []
        };
        updateReadout(0, true);
      }
    }

    function resizeCanvas() {
      var rect = rippleCanvas.parentElement.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = Math.max(320, rect.width);
      ch = Math.max(260, rect.height);
      rippleCanvas.width = cw * dpr;
      rippleCanvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Mode buttons
    for (var mb = 0; mb < modeBtns.length; mb++) {
      modeBtns[mb].addEventListener('click', function () {
        launchSimulation(this.getAttribute('data-ripple-mode') || 'skip');
      });
    }

    if (relaunchBtn) {
      relaunchBtn.addEventListener('click', function () {
        launchSimulation(currentMode);
      });
    }

    // 5 Skip node pills
    for (var sp = 0; sp < skipPills.length; sp++) {
      skipPills[sp].addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-skip-index') || '0', 10);
        if (currentMode !== 'skip') {
          currentMode = 'skip';
          for (var b = 0; b < modeBtns.length; b++) {
            var isAct = modeBtns[b].getAttribute('data-ripple-mode') === 'skip';
            modeBtns[b].classList.toggle('active', isAct);
          }
          if (hudBadge) {
            hudBadge.textContent = 'Trajectory: Mastered Angle · Inspecting Ripple 0' + (idx + 1);
          }
        }
        updateReadout(idx, false);
        var node = skipData[idx];
        if (node) {
          spawnRipple(cw * node.normX, ch * node.normY, 220, 'gold', 1.0);
          spawnRipple(cw * node.normX, ch * node.normY, 150, 'emerald', 0.85);
        }
      });
    }

    // Interactive click on water canvas
    rippleCanvas.addEventListener('click', function (e) {
      var rect = rippleCanvas.getBoundingClientRect();
      var clickX = e.clientX - rect.left;
      var clickY = e.clientY - rect.top;

      // Check if user clicked near one of the 5 skip nodes
      var closestIdx = -1;
      var minDist = 52;
      for (var i = 0; i < skipData.length; i++) {
        var nx = cw * skipData[i].normX;
        var ny = ch * skipData[i].normY;
        var d = Math.hypot(clickX - nx, clickY - ny);
        if (d < minDist) {
          minDist = d;
          closestIdx = i;
        }
      }

      if (closestIdx !== -1) {
        updateReadout(closestIdx, false);
        spawnRipple(cw * skipData[closestIdx].normX, ch * skipData[closestIdx].normY, 230, 'gold', 1.0);
      } else {
        spawnRipple(clickX, clickY, currentMode === 'sink' ? 70 : 190, currentMode === 'sink' ? 'sink' : 'gold', 0.9);
      }
    });

    // Animation loop
    var animTime = 0;
    function renderRippleScene() {
      animTime += 0.016;
      ctx.clearRect(0, 0, cw, ch);

      // 1. Subtle perspective horizon water grid lines
      var horizonY = ch * 0.28;
      ctx.save();
      ctx.strokeStyle = 'rgba(218, 190, 129, 0.07)';
      ctx.lineWidth = 1;
      for (var row = 1; row <= 6; row++) {
        var py = horizonY + Math.pow(row / 6, 1.45) * (ch - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(cw, py);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Ambient harmonic wave lines across the water
      ctx.save();
      for (var wl = 0; wl < 4; wl++) {
        ctx.beginPath();
        var baseY = ch * (0.42 + wl * 0.13);
        ctx.strokeStyle = currentMode === 'skip'
          ? 'rgba(218, 190, 129, ' + (0.08 - wl * 0.012) + ')'
          : 'rgba(142, 161, 169, 0.04)';
        ctx.lineWidth = 1;
        for (var wx = 0; wx <= cw; wx += 16) {
          var wy = baseY + Math.sin(wx * 0.014 + animTime * 1.1 + wl) * (currentMode === 'skip' ? 4.5 : 1.5);
          if (wx === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 3. Render expanding concentric perspective ripples
      for (var r = ripples.length - 1; r >= 0; r--) {
        var rp = ripples[r];
        rp.r += rp.speed;
        rp.alpha *= 0.985;
        var progressRatio = rp.r / rp.maxR;
        var fade = rp.alpha * (1 - progressRatio);

        if (fade <= 0.015 || rp.r >= rp.maxR) {
          ripples.splice(r, 1);
          continue;
        }

        ctx.save();
        // Draw 3 nested harmonic rings per ripple
        for (var ring = 0; ring < 3; ring++) {
          var rr = rp.r - ring * 14;
          if (rr <= 2) continue;
          ctx.beginPath();
          ctx.ellipse(rp.x, rp.y, rr, rr * 0.42, 0, 0, Math.PI * 2);
          if (rp.colorType === 'sink') {
            ctx.strokeStyle = 'rgba(148, 163, 172, ' + (fade * (0.55 - ring * 0.15)).toFixed(3) + ')';
            ctx.lineWidth = 1.4;
          } else if (rp.colorType === 'emerald') {
            ctx.strokeStyle = 'rgba(82, 168, 178, ' + (fade * (0.6 - ring * 0.16)).toFixed(3) + ')';
            ctx.lineWidth = 1.6;
          } else {
            ctx.strokeStyle = 'rgba(218, 190, 129, ' + (fade * (0.85 - ring * 0.22)).toFixed(3) + ')';
            ctx.lineWidth = ring === 0 ? 2.2 : 1.2;
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      // 4. Connective golden trajectory arc between the 5 Skip Nodes (when in Skip mode)
      if (currentMode === 'skip') {
        ctx.save();
        ctx.setLineDash([5, 6]);
        ctx.strokeStyle = 'rgba(218, 190, 129, 0.28)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (var k = 0; k < skipData.length; k++) {
          var sx = cw * skipData[k].normX;
          var sy = ch * skipData[k].normY;
          if (k === 0) ctx.moveTo(sx, sy);
          else {
            var prevX = cw * skipData[k - 1].normX;
            var prevY = ch * skipData[k - 1].normY;
            var midX = (prevX + sx) * 0.5;
            var midY = Math.min(prevY, sy) - ch * 0.14;
            ctx.quadraticCurveTo(midX, midY, sx, sy);
          }
        }
        ctx.stroke();
        ctx.restore();

        // Draw the 5 interactive Skip Nodes on the water surface
        for (var n = 0; n < skipData.length; n++) {
          var nx = cw * skipData[n].normX;
          var ny = ch * skipData[n].normY;
          var isNodeActive = n === activeSkipIndex;

          ctx.save();
          // Standing ambient ring around active node
          var pulseR = 22 + Math.sin(animTime * 2.4 + n) * 4;
          ctx.beginPath();
          ctx.ellipse(nx, ny, isNodeActive ? pulseR * 1.45 : pulseR, (isNodeActive ? pulseR * 1.45 : pulseR) * 0.44, 0, 0, Math.PI * 2);
          ctx.strokeStyle = isNodeActive ? 'rgba(218, 190, 129, 0.78)' : 'rgba(218, 190, 129, 0.26)';
          ctx.lineWidth = isNodeActive ? 2 : 1;
          ctx.stroke();

          // Vertical light beacon on active node
          if (isNodeActive) {
            var grad = ctx.createLinearGradient(nx, ny - 65, nx, ny);
            grad.addColorStop(0, 'rgba(218, 190, 129, 0)');
            grad.addColorStop(1, 'rgba(218, 190, 129, 0.38)');
            ctx.fillStyle = grad;
            ctx.fillRect(nx - 1.5, ny - 65, 3, 65);
          }

          // Node center jewel
          ctx.beginPath();
          ctx.arc(nx, ny, isNodeActive ? 7 : 5, 0, Math.PI * 2);
          ctx.fillStyle = isNodeActive ? '#DABE81' : '#1D353C';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#BF9B30';
          ctx.stroke();

          // Label above node
          ctx.font = '600 10px Inter, sans-serif';
          ctx.fillStyle = isNodeActive ? '#FFFFFF' : 'rgba(218, 190, 129, 0.82)';
          ctx.textAlign = 'center';
          ctx.fillText('0' + (n + 1), nx, ny - 14);
          ctx.restore();
        }
      }

      // 5. Update and draw the Stone (Skipping Stone vs. Sinking Rock)
      if (stone) {
        if (stone.mode === 'skip') {
          stone.progress += stone.speed;
          if (stone.progress <= 1.0) {
            // Interpolate across 5 segments
            var totalSegs = skipData.length;
            var scaled = stone.progress * totalSegs;
            var segIdx = Math.min(totalSegs - 1, Math.floor(scaled));
            var localT = scaled - segIdx;

            var startX = segIdx === 0 ? cw * 0.03 : cw * skipData[segIdx - 1].normX;
            var startY = segIdx === 0 ? ch * 0.34 : ch * skipData[segIdx - 1].normY;
            var endX = cw * skipData[segIdx].normX;
            var endY = ch * skipData[segIdx].normY;

            var curX = startX + (endX - startX) * localT;
            var arcLift = Math.sin(localT * Math.PI) * (ch * 0.13);
            var curY = startY + (endY - startY) * localT - arcLift;

            stone.trail.push({ x: curX, y: curY });
            if (stone.trail.length > 22) stone.trail.shift();

            // Trigger skip impact at end of segment
            if (localT > 0.92 && stone.lastSkipTriggered < segIdx) {
              stone.lastSkipTriggered = segIdx;
              spawnRipple(endX, endY, 210, 'gold', 1.0);
              spawnRipple(endX, endY, 140, 'emerald', 0.75);
              updateReadout(segIdx, false);
            }

            // Draw golden ribbon trail
            ctx.save();
            for (var t = 1; t < stone.trail.length; t++) {
              ctx.beginPath();
              ctx.moveTo(stone.trail[t - 1].x, stone.trail[t - 1].y);
              ctx.lineTo(stone.trail[t].x, stone.trail[t].y);
              ctx.strokeStyle = 'rgba(218, 190, 129, ' + ((t / stone.trail.length) * 0.75).toFixed(3) + ')';
              ctx.lineWidth = (t / stone.trail.length) * 3.2;
              ctx.stroke();
            }

            // Draw glowing golden skipping stone
            ctx.beginPath();
            ctx.ellipse(curX, curY, 9, 4.5, -0.15, 0, Math.PI * 2);
            ctx.fillStyle = '#FFE4A3';
            ctx.shadowColor = '#BF9B30';
            ctx.shadowBlur = 16;
            ctx.fill();
            ctx.restore();
          } else if (Math.random() < 0.025) {
            // Gentle ambient pulse on the active node after the initial flight completes
            var actNode = skipData[activeSkipIndex] || skipData[0];
            spawnRipple(cw * actNode.normX, ch * actNode.normY, 160, 'gold', 0.55);
          }
        } else if (stone.mode === 'sink') {
          stone.progress += stone.speed;
          var impactX = cw * 0.46;
          var impactY = ch * 0.58;

          if (!stone.impacted) {
            var p = Math.min(1, stone.progress * 1.8);
            var sx = cw * 0.22 + (impactX - cw * 0.22) * p;
            var sy = ch * 0.10 + (impactY - ch * 0.10) * (p * p);
            stone.trail.push({ x: sx, y: sy });
            if (p >= 1) {
              stone.impacted = true;
              spawnRipple(impactX, impactY, 68, 'sink', 0.75);
            }
            ctx.save();
            ctx.beginPath();
            ctx.arc(sx, sy, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#7E8C94';
            ctx.fill();
            ctx.restore();
          } else {
            // Sinking straight down into the murky depths
            stone.sinkDepth = Math.min(ch * 0.36, stone.sinkDepth + 1.4);
            var sinkY = impactY + stone.sinkDepth;
            var sinkAlpha = Math.max(0.12, 1 - stone.sinkDepth / (ch * 0.36));

            ctx.save();
            // Vertical sinking shaft
            ctx.setLineDash([3, 5]);
            ctx.strokeStyle = 'rgba(148, 163, 172, 0.35)';
            ctx.beginPath();
            ctx.moveTo(impactX, impactY);
            ctx.lineTo(impactX, sinkY);
            ctx.stroke();

            // Sunken heavy rock
            ctx.beginPath();
            ctx.arc(impactX, sinkY, 8.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(126, 140, 148, ' + sinkAlpha.toFixed(2) + ')';
            ctx.fill();

            ctx.font = '600 11px Inter, sans-serif';
            ctx.fillStyle = 'rgba(218, 190, 129, 0.85)';
            ctx.textAlign = 'center';
            ctx.fillText('SINKING TACTIC · ZERO RIPPLE EFFECT', impactX, impactY - 18);
            ctx.restore();
          }
        }
      }

      // 6. Render water spray particles
      for (var pt = particles.length - 1; pt >= 0; pt--) {
        var part = particles[pt];
        part.x += part.vx;
        part.y += part.vy;
        part.vy += 0.12;
        part.life -= 0.025;
        if (part.life <= 0) {
          particles.splice(pt, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(part.x, part.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = part.colorType === 'sink'
          ? 'rgba(160, 175, 182, ' + part.life.toFixed(2) + ')'
          : 'rgba(255, 228, 163, ' + part.life.toFixed(2) + ')';
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(renderRippleScene);
    }

    // Launch automatically when scrolled into view
    var hasLaunchedOnce = false;
    if ('IntersectionObserver' in window) {
      var rippleObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !hasLaunchedOnce) {
          hasLaunchedOnce = true;
          launchSimulation('skip');
        }
      }, { threshold: 0.25 });
      rippleObs.observe(rippleCanvas);
    } else {
      launchSimulation('skip');
    }
    requestAnimationFrame(renderRippleScene);
  }

  /* ── 4. Interactive SVG Architectural Hub (The 5 Disciplines) ── */
  var hubNodes = document.querySelectorAll('.hub-node');
  var hubTitle = document.getElementById('hubDetailTitle');
  var hubDesc = document.getElementById('hubDetailDesc');

  var hubData = {
    cpa: {
      title: 'Chair I · Strategic Tax Stewardship (CPA Integration)',
      desc: 'Proactive multi-entity tax engineering, statutory incentives, and flow-through optimization. We coordinate directly with your CPA so every dollar preserved fuels the next ripple of your vision.'
    },
    wealth: {
      title: 'Chair II · Intentional Wealth Amplification',
      desc: 'Money amplifies your frequency. We align private market allocations, institutional liquidity, and alternative yield to what you truly want·never imposing cookie-cutter products.'
    },
    estate: {
      title: 'Chair III · Legal Structure & Family Protection',
      desc: 'Multi-generational trust governance, asset protection vaults, and corporate structuring that safeguard both what you have built and the people you love.'
    },
    enterprise: {
      title: 'Chair IV · Enterprise Value & Safe Reinvention',
      desc: 'Preparing your operating company 24 to 60 months ahead of transition or industry consolidation, so you can reinvent who you are without losing your relevance or hard-earned value.'
    },
    longevity: {
      title: 'Chair V · Personal Evolution, Energy & Longevity',
      desc: 'Your business can only develop as far as your personal development does. We integrate founder vitality, mindset clarity, and emotional liberation alongside balance-sheet command.'
    },
    core: {
      title: 'The Excelstra Sanctuary · Seen. Heard. Held.',
      desc: 'The single room where your inner clarity and all five outer disciplines meet as one. Led by Eunicia Peret, lifting the emotional labor of coordination off your shoulders.'
    }
  };

  if (hubNodes.length && hubTitle && hubDesc) {
    hubNodes.forEach(function (node) {
      function activateNode() {
        var key = node.getAttribute('data-node');
        var info = hubData[key] || hubData.core;
        hubNodes.forEach(function (n) { n.classList.remove('active-hub-node'); });
        node.classList.add('active-hub-node');
        hubTitle.textContent = info.title;
        hubDesc.textContent = info.desc;
      }
      node.addEventListener('mouseenter', activateNode);
      node.addEventListener('click', activateNode);
    });
  }

  /* ── 5. Interactive Relevance & Ripple Readiness Diagnostic (Page 5) ── */
  var v6DiagBtn = document.getElementById('v6DiagRunBtn');
  var v6DiagResult = document.getElementById('v6DiagResultBox');
  if (v6DiagBtn && v6DiagResult) {
    v6DiagBtn.addEventListener('click', function () {
      var frictionEl = document.querySelector('input[name="v6_friction"]:checked');
      var desireEl = document.querySelector('input[name="v6_desire"]:checked');
      var scaleEl = document.querySelector('input[name="v6_scale"]:checked');

      var friction = frictionEl ? frictionEl.value : 'bad_advice';
      var desire = desireEl ? desireEl.value : 'relevance';
      var scale = scaleEl ? scaleEl.value : 'core';

      var frictionMap = {
        bad_advice: 'You have experienced the cost of fragmented or bad advice in the past·or watched peers suffer during industry consolidation·creating hesitation around your next major move.',
        overgiving: 'You are carrying heavy emotional labor and overgiving to everyone around you, leaving little space to let go of old patterns and focus on yourself.',
        cookie_cutter: 'You are tired of advisors imposing pre-packaged strategies and tactics on you without understanding why or seeing your bigger picture.',
        reinvention: 'You are ready to reinvent who you are for your next chapter, while making sure you do not lose your relevance, purpose, or what you have built.'
      };

      var desireMap = {
        relevance: 'First Ripple: Clarifying what you truly want versus what you really do not want, turning past contrast into wisdom.',
        love_work: 'First Ripple: Dropping dead tactics and pattern repetition so you can focus on your highest, most effective activity and love what you do again.',
        amplify: 'First Ripple: Aligning tax stewardship and wealth amplification so money amplifies your frequency and serves your life vision.',
        family: 'First Ripple: Engineering a multi-year legacy and transition blueprint centered on deep connection with your family and those you love.'
      };

      var altitudeText = (scale === 'enterprise' || scale === 'family_office')
        ? 'Recommended Sanctuary: Diamond Partnership (Comprehensive Family Office & Transition Architecture)'
        : 'Recommended Sanctuary: Gold Partnership (Full-Picture Tax, Wealth & Personal Trajectory Integration)';

      var outFriction = document.getElementById('v6OutFriction');
      var outDesire = document.getElementById('v6OutDesire');
      var outAltitude = document.getElementById('v6OutAltitude');

      if (outFriction) outFriction.textContent = frictionMap[friction] || frictionMap.bad_advice;
      if (outDesire) outDesire.textContent = desireMap[desire] || desireMap.relevance;
      if (outAltitude) outAltitude.textContent = altitudeText;

      v6DiagResult.style.display = 'block';
      v6DiagResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ── 6. FAQ Accordion: Single Expanded Pattern ── */
  var faqItems = document.querySelectorAll('.faq-item');
  for (var qi = 0; qi < faqItems.length; qi++) {
    (function (item) {
      item.addEventListener('toggle', function () {
        if (item.open) {
          for (var oj = 0; oj < faqItems.length; oj++) {
            if (faqItems[oj] !== item) {
              faqItems[oj].open = false;
            }
          }
        }
      });
    })(faqItems[qi]);
  }

  /* ── 7. Newsletter Subscription Box ── */
  var newsForms = document.querySelectorAll('.newsletter-form');
  for (var ni = 0; ni < newsForms.length; ni++) {
    newsForms[ni].addEventListener('submit', function (e) {
      e.preventDefault();
      var input = this.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        this.innerHTML = '<p class="gold" style="font-family:var(--serif);font-style:italic;font-size:1.05rem;padding:0.6rem 0;">You are included. The next letter will arrive directly in your inbox.</p>';
      }
    });
  }
})();
