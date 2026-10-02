/* ═══════════════════════════════════════════════════════════════════════
   EXCELSTRA v5: GLOBAL INTERACTION & MOTION CONTROLLER
   Pure GSAP 3 scroll reveals (Transform and Opacity only),
   interactive SVG Architectural Hub, complete multi-page UI controllers,
   and resilient booking and assessment workflows.
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

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

  // Sticky Frosted Navigation Elevation
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

  /* ── 2. Universal GSAP Entrance Reveals (NO BLUR FILTERS) ── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    var revealTargets = gsap.utils.toArray('.glass-card, .tier-card, .tier-box, .level-card, .person, .testimonial-card, .pedigree-item, .dossier, .portrait-card');
    if (revealTargets.length) {
      revealTargets.forEach(function (el) {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 26, force3D: true },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
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

    // Classic .rv reveals support for backwards compatibility
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
  } else {
    // IntersectionObserver fallback
    var revealEls = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ── 3. Interactive SVG Architectural Hub ── */
  var hubData = {
    cpa: {
      title: 'Tax Strategy and Statutory Stewardship',
      desc: 'Proactive deduction design, multi-tier statutory structuring, and capital retention models that prevent annual wealth bleed.'
    },
    wealth: {
      title: 'Wealth Management and Private Banking',
      desc: 'Institutional capital preservation, family office asset governance, and liquidity modeling aligned directly with enterprise succession.'
    },
    estate: {
      title: 'Estate Counsel and Asset Protection',
      desc: 'Dynastic trusts, structural asset fortification, and multi-generational wealth preservation designed to withstand jurisdictional shifts.'
    },
    enterprise: {
      title: 'Enterprise Scaling and Operational Leverage',
      desc: 'Multi-million dollar business systemization, recurring operational enterprise value, and high-multiple exit preparation.'
    },
    longevity: {
      title: 'Founder Vitality and Longevity Protocol',
      desc: 'Integrating cognitive performance, physical endurance, and health capital alongside multi-generational balance sheet growth.'
    },
    core: {
      title: 'The Excelstra Integration Hub',
      desc: 'The single table where all five disciplines sit together. Led by Eunicia Peret, ensuring every advisor executes from one unified master plan.'
    }
  };

  var hubNodes = document.querySelectorAll('.hub-node');
  var hubTitle = document.getElementById('hubDetailTitle');
  var hubDesc = document.getElementById('hubDetailDesc');
  var activeHubKey = 'core';
  var hubTween = null;

  function activateHubNode(key, targetNode) {
    if (!key || !hubData[key] || key === activeHubKey) return;
    activeHubKey = key;

    hubNodes.forEach(function (n) {
      n.classList.remove('active-hub-node');
    });
    if (targetNode) {
      targetNode.classList.add('active-hub-node');
    }

    if (hubTitle && hubDesc) {
      hubTitle.textContent = hubData[key].title;
      hubDesc.textContent = hubData[key].desc;
      if (typeof gsap !== 'undefined') {
        if (hubTween) hubTween.kill();
        hubTween = gsap.fromTo([hubTitle, hubDesc],
          { opacity: 0.35, y: -2 },
          { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out', overwrite: 'auto' }
        );
      }
    }
  }

  hubNodes.forEach(function (node) {
    node.addEventListener('mouseenter', function () {
      var key = this.getAttribute('data-node');
      activateHubNode(key, this);
    });
    node.addEventListener('click', function () {
      var key = this.getAttribute('data-node');
      activateHubNode(key, this);
    });
  });

  /* ── 4. Interactive Wealth Calculator Flow ── */
  var calcForm = document.getElementById('wealthCalculatorForm');
  if (calcForm) {
    var step1 = document.getElementById('calcStep1');
    var step2 = document.getElementById('calcStep2');
    var step3 = document.getElementById('calcStep3');
    var calcResults = document.getElementById('calcResults');

    var toStep2Btn = document.getElementById('toStep2');
    var toStep3Btn = document.getElementById('toStep3');
    var backToStep1Btn = document.getElementById('backToStep1');
    var backToStep2Btn = document.getElementById('backToStep2');
    var backToEditBtn = document.getElementById('backToEdit');
    var calcSubmitBtn = document.getElementById('calcSubmit');

    if (toStep2Btn && step1 && step2) {
      toStep2Btn.addEventListener('click', function () {
        var revenue = calcForm.querySelector('input[name="revenue"]:checked');
        if (!revenue) {
          alert('Please select your current annual revenue tier to proceed.');
          return;
        }
        step1.style.display = 'none';
        step2.style.display = 'block';
      });
    }

    if (backToStep1Btn && step1 && step2) {
      backToStep1Btn.addEventListener('click', function () {
        step2.style.display = 'none';
        step1.style.display = 'block';
      });
    }

    if (toStep3Btn && step2 && step3) {
      toStep3Btn.addEventListener('click', function () {
        var priority = calcForm.querySelector('input[name="priority"]:checked');
        if (!priority) {
          alert('Please select your primary wealth priority to proceed.');
          return;
        }
        step2.style.display = 'none';
        step3.style.display = 'block';
      });
    }

    if (backToStep2Btn && step2 && step3) {
      backToStep2Btn.addEventListener('click', function () {
        step3.style.display = 'none';
        step2.style.display = 'block';
      });
    }

    if (backToEditBtn && step1 && calcResults) {
      backToEditBtn.addEventListener('click', function () {
        calcResults.style.display = 'none';
        step1.style.display = 'block';
      });
    }

    if (calcSubmitBtn) {
      calcSubmitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var emailInput = document.getElementById('calcEmail');
        var nameInput = document.getElementById('calcName');

        if (!emailInput || !emailInput.value || emailInput.value.indexOf('@') === -1) {
          alert('Please enter a valid email address to receive your private banking memo.');
          return;
        }

        var revInput = calcForm.querySelector('input[name="revenue"]:checked');
        var revVal = revInput ? revInput.value : '10m';

        var taxEst = '$420,000 to $1,180,000';
        var capGrowth = '2.4x to 3.8x';

        if (revVal === '3m') {
          taxEst = '$180,000 to $450,000';
          capGrowth = '2.1x to 3.2x';
        } else if (revVal === '25m') {
          taxEst = '$1,200,000 to $3,400,000';
          capGrowth = '2.8x to 4.2x';
        } else if (revVal === '50m') {
          taxEst = '$2,800,000 to $7,500,000+';
          capGrowth = '3.2x to 5.0x';
        }

        var memoTax = document.getElementById('memoTaxRec');
        var memoCap = document.getElementById('memoCapMult');
        var memoClient = document.getElementById('memoClientName');

        if (memoTax) memoTax.textContent = taxEst;
        if (memoCap) memoCap.textContent = capGrowth;
        if (memoClient && nameInput && nameInput.value.trim()) {
          memoClient.textContent = nameInput.value.trim();
        }

        if (step3) step3.style.display = 'none';
        if (calcResults) calcResults.style.display = 'block';
      });
    }
  }

  /* ── 5. Interactive Booking Scheduler ── */
  /* Live LeadConnector booking calendar widget is embedded directly in book-a-call.html */

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

  /* ── 7. Speaking Inquiry Form ── */
  var speakForm = document.getElementById('speakingInquiryForm');
  if (speakForm) {
    speakForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameEl = document.getElementById('speakName');
      var name = nameEl ? nameEl.value.trim() : '';
      speakForm.innerHTML = '<div class="notice-box"><p class="h3" style="color:var(--gold);">Inquiry Received</p><p class="body">Thank you, ' + name + '. Eunicia and the executive speaking team have received your stage details and will respond personally within 24 business hours.</p></div>';
    });
  }

  /* ── 8. Form Submissions & Webhook Pipeline ── */
  var newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var emailInput = this.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value.trim() : '';

      if (!email || email.indexOf('@') === -1) return;

      var webhookUrl = window.EXCELSTRA_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, form: 'newsletter', source: 'v5-preview' })
          });
        } catch (err) {
          console.warn('Webhook dispatch error:', err);
        }
      }

      this.innerHTML = '<p class="gold" style="font-family:var(--serif); font-size:1.05rem; padding:0.6rem 0;">You are included. The private letter will arrive directly in your inbox.</p>';
    });
  });

})();
