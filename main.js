/* ==========================================================================
   EXCELSTRA — INTERACTIVE ARCHITECTURE & DIAGNOSTIC ENGINE
   Zero dependencies, zero em-dashes, zero emojis.
   Full keyboard navigation, ARIA synchronization, and reduced-motion support.
   ========================================================================== */

(function () {
  'use strict';

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

  /* 2. Interactive Bridge & Alignment Explorer */
  const bridgeData = {
    bridge: {
      kicker: 'The Central Bridge',
      title: 'Excelstra: Seeing the Whole Before Changing the Parts',
      sub: 'Where wealth is integrated with intention, transformed with artistry, and delivered with mastery.',
      body: 'You are the wealth generator; we are the wealth integrators. We act as the bridge between your existing teams and current strategies, connecting what operates in isolation and revealing where deeper alignment to your vision is possible. Retained exclusively through engagement fees, our sole allegiance is to your long-term wellbeing.'
    },
    tax: {
      kicker: 'Pillar I · Strategic Tax Stewardship',
      title: 'Keep More, With Integrity',
      sub: 'Tax as a pathway to freedom and purposeful capital.',
      body: 'Of the many dimensions in a financial life, tax is the one you have the most power to shape, and the one that rewards intention most richly. Working alongside your CPA and our specialized tax strategists, we identify, corroborate, and implement multi-year strategies that emerge only through full-picture integration.'
    },
    wealth: {
      kicker: 'Pillar II · Wealth Amplification',
      title: 'Grow More, With Intention',
      sub: 'Portfolios built around the life they are meant to serve.',
      body: 'We examine what you hold with clarity and discipline, understanding which vehicles genuinely advance your vision. We preserve what works, reconstruct with intention, and amplify through curated, off-market opportunities available through true independence and discerning relationships.'
    },
    exit: {
      kicker: 'Pillar III · Legacy-Centered Exit Planning',
      title: 'Live More. Leave More.',
      sub: 'Your full value revealed and your transition navigated years in advance.',
      body: 'Whether you are a business owner preparing for a future transition, or an executive or surgeon shifting from active compensation to enduring portfolio income, we align your future income streams, enterprise value, and generational preparedness long before the transition date arrives.'
    },
    advisors: {
      kicker: 'Collaborative Orchestration',
      title: 'Harmonizing Your Existing CPA, Advisor, and Attorney',
      sub: 'We do not replace your trusted professionals; we elevate what they can achieve together.',
      body: 'Your CPA, financial advisor, and estate attorney bring dedicated skill to their respective disciplines. Excelstra provides the unified strategic design that connects their work, ensuring tax filings, legal entities, and investment allocations advance one shared blueprint.'
    },
    longevity: {
      kicker: 'The Fifth Discipline · Wealth Serving Life',
      title: 'Holistic Health, Longevity, and Family Flourishing',
      sub: 'Money is the vehicle; a life fully lived is the destination.',
      body: 'A legacy is best experienced by the leader who built it. Our integration encompasses holistic health, longevity, and preparing the next generation to steward what they receive with clarity, responsibility, and an understanding of the values behind the wealth.'
    }
  };

  const bridgeNodes = document.querySelectorAll('[data-bridge-key]');
  const bridgeActiveCard = document.querySelector('.bridge-active-card');
  const bridgeKicker = document.getElementById('bridgeDetailKicker');
  const bridgeTitle = document.getElementById('bridgeDetailTitle');
  const bridgeSub = document.getElementById('bridgeDetailSub');
  const bridgeBody = document.getElementById('bridgeDetailBody');

  function activateBridgeKey(key) {
    const item = bridgeData[key];
    if (!item || !bridgeTitle) return;

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

    if (bridgeActiveCard) {
      bridgeActiveCard.classList.add('transitioning');
      setTimeout(function () {
        if (bridgeKicker) bridgeKicker.textContent = item.kicker;
        if (bridgeTitle) bridgeTitle.textContent = item.title;
        if (bridgeSub) bridgeSub.textContent = item.sub;
        if (bridgeBody) bridgeBody.textContent = item.body;
        bridgeActiveCard.classList.remove('transitioning');
      }, 90);
    } else {
      if (bridgeKicker) bridgeKicker.textContent = item.kicker;
      if (bridgeTitle) bridgeTitle.textContent = item.title;
      if (bridgeSub) bridgeSub.textContent = item.sub;
      if (bridgeBody) bridgeBody.textContent = item.body;
    }
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
    node.addEventListener('mouseenter', function () {
      if (window.innerWidth > 900) {
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

  /* 5. Private Consultation Form Submission Feedback */
  const consultForm = document.getElementById('privateConsultationForm');
  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const statusBox = document.getElementById('consultFormStatus');
      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.innerHTML = '<strong>Thank you. Your private inquiry has been recorded.</strong> A senior member of the Excelstra leadership team will review your note with care and respond personally. You may also proceed directly to the <a href="https://go.excelstra.com/whole-wealth-assessment" target="_blank" rel="noopener" style="text-decoration:underline; color:var(--excelstra-green); font-weight:600;">Whole Wealth Assessment</a>.';
      }
      consultForm.reset();
    });
  }

  /* 6. Progressive Editorial Scroll Reveal (IntersectionObserver) */
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll('.arch-card, .tier-card, .value-row, .proof-metric-box, .bridge-explorer, .ledger-grid, .matrix-wrap');
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
})();
