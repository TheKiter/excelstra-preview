/* ==========================================================================
   EXCELSTRA — INTERACTIVE ARCHITECTURE & DIAGNOSTIC ENGINE
   Zero dependencies, zero em-dashes, zero emojis.
   Full keyboard navigation, ARIA synchronization, and reduced-motion support.
   ========================================================================== */

(function () {
  'use strict';

  /* 0. Iframe & Subpage Cache-Buster (Prevents stale GitHub Pages cache inside GHL preview) */
  const BUILD_VER = '20261024a';
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

  /* 1. Sticky Header & Mobile Navigation Drawer */
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

  /* 2. Interactive Bridge & Alignment Explorer (Fixed-Height Grid Stack) */
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

  /* 3. Interactive Whole Wealth Readiness Diagnostic */
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
            tier: 'Gold or Copper Engagement Altitude',
            focus: 'Business Owner ($3M to $15M Company Revenue)',
            summary: 'At this stage of growth, integrating your operating company structure with personal tax stewardship and intentional capital allocation creates immediate strategic clarity.'
          },
          owner_scale: {
            tier: 'Diamond or Gold Engagement Altitude',
            focus: 'Established Enterprise Leader ($15M to $50M+ Revenue)',
            summary: 'At your scale, multi-entity tax coordination, off-market wealth amplification, and pre-transition structuring work together to elevate enterprise and family value simultaneously.'
          },
          executive: {
            tier: 'Copper or Gold Engagement Altitude',
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

  /* 4. Accordion / FAQ Triggers with ARIA Synchronization */
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

  /* 5. Progressive Editorial Scroll Reveal (IntersectionObserver) */
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll('.arch-card, .tier-card, .value-row, .proof-metric-box, .bridge-explorer, .ledger-grid, .matrix-wrap, .hermes-plate-frame, .video-testimonial-card');
    revealTargets.forEach(function (el) {
      el.classList.add('reveal-on-scroll');
    });

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* 6. Interactive Video Testimonial Player & Category Filter */
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
})();
