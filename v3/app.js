/* ═══════════ EXCELSTRA — Global Interaction & UI Logic ═══════════ */
(function () {
  'use strict';

  /* ── 1. DOM Elements & State Cache ── */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  var prlxEls = Array.prototype.slice.call(document.querySelectorAll('.prlx'));
  var photoBreaks = Array.prototype.slice.call(document.querySelectorAll('.photo-break'));

  /* ── 2. Unified RAF-Throttled Scroll Loop ── */
  var scrollTicking = false;

  function updateScrollState() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Sticky Navigation
    if (nav) {
      nav.classList.toggle('solid', scrollY > 40);
    }

    // Parallax Floating Elements
    var pLen = prlxEls.length;
    for (var i = 0; i < pLen; i++) {
      var el = prlxEls[i];
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      var depth = parseFloat(el.dataset.depth || '0.05');
      var mid = r.top + r.height * 0.5 - vh * 0.5;
      el.style.transform = 'translateY(' + (mid * depth).toFixed(1) + 'px)';
    }

    // Smooth Photo Break Parallax
    var pbLen = photoBreaks.length;
    for (var j = 0; j < pbLen; j++) {
      var pEl = photoBreaks[j];
      var pbRect = pEl.getBoundingClientRect();
      if (pbRect.top < vh && pbRect.bottom > 0) {
        var progress = (vh - pbRect.top) / (vh + pbRect.height);
        var yOffset = (progress - 0.5) * -90;
        var img = pEl.querySelector('img');
        if (img) {
          img.style.transform = 'translateY(' + yOffset.toFixed(1) + 'px) scale(1.08)';
        }
      }
    }

    scrollTicking = false;
  }

  function requestScrollUpdate() {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollState);
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });

  // Initial scroll position pass
  requestScrollUpdate();

  /* ── 3. Navigation Drawer & Mobile Overlay ── */
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

  /* ── 4. Scroll Reveals (IntersectionObserver) ── */
  var staggers = document.querySelectorAll('[data-stagger]');
  for (var s = 0; s < staggers.length; s++) {
    var kids = staggers[s].querySelectorAll('.rv');
    for (var ki = 0; ki < kids.length; ki++) {
      kids[ki].style.transitionDelay = (ki * 110) + 'ms';
    }
  }

  var revealEls = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      for (var ei = 0; ei < entries.length; ei++) {
        var entry = entries[ei];
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    for (var ri = 0; ri < revealEls.length; ri++) {
      io.observe(revealEls[ri]);
    }
  } else {
    // Fallback if IntersectionObserver is unsupported
    for (var fi = 0; fi < revealEls.length; fi++) {
      revealEls[fi].classList.add('in');
    }
  }

  /* ── 5. FAQ Accordion: Single Expanded Pattern ── */
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

  /* ── 6. Interactive Wealth Assessment (Step-by-step Flow) ── */
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

        // Calculate dynamic projections
        var taxEst = '$420,000 — $1,180,000';
        var capGrowth = '2.4x — 3.8x';

        if (revVal === '3m') {
          taxEst = '$180,000 — $450,000';
          capGrowth = '2.1x — 3.2x';
        } else if (revVal === '25m') {
          taxEst = '$1,200,000 — $3,400,000';
          capGrowth = '2.8x — 4.2x';
        } else if (revVal === '50m') {
          taxEst = '$2,800,000 — $7,500,000+';
          capGrowth = '3.2x — 5.0x';
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

  /* ── 7. Interactive Booking Scheduler ── */
  var bookForm = document.getElementById('bookingForm');
  if (bookForm) {
    var bookStep1 = document.getElementById('bookStep1');
    var bookStep2 = document.getElementById('bookStep2');
    var bookConfirm = document.getElementById('bookConfirmation');
    var toBookStep2 = document.getElementById('toBookStep2');
    var backToBookStep1 = document.getElementById('backToBookStep1');
    var completeBooking = document.getElementById('completeBooking');

    if (toBookStep2 && bookStep1 && bookStep2) {
      toBookStep2.addEventListener('click', function () {
        var nameEl = document.getElementById('bookName');
        var emailEl = document.getElementById('bookEmail');
        var name = nameEl ? nameEl.value.trim() : '';
        var email = emailEl ? emailEl.value.trim() : '';
        if (!name || !email) {
          alert('Please enter your name and email to proceed.');
          return;
        }
        bookStep1.style.display = 'none';
        bookStep2.style.display = 'block';
      });
    }

    if (backToBookStep1 && bookStep1 && bookStep2) {
      backToBookStep1.addEventListener('click', function () {
        bookStep2.style.display = 'none';
        bookStep1.style.display = 'block';
      });
    }

    if (completeBooking && bookStep2 && bookConfirm) {
      completeBooking.addEventListener('click', function () {
        var selectedTime = document.querySelector('.slot-btn.selected');
        if (!selectedTime) {
          alert('Please select a time slot for your conversation.');
          return;
        }
        bookStep2.style.display = 'none';
        bookConfirm.style.display = 'block';
      });
    }

    var slotBtns = document.querySelectorAll('.slot-btn');
    for (var si = 0; si < slotBtns.length; si++) {
      slotBtns[si].addEventListener('click', function () {
        for (var sj = 0; sj < slotBtns.length; sj++) {
          slotBtns[sj].classList.remove('selected');
        }
        this.classList.add('selected');
      });
    }
  }

  /* ── 8. Speaking Inquiry Form ── */
  var speakForm = document.getElementById('speakingInquiryForm');
  if (speakForm) {
    speakForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameEl = document.getElementById('speakName');
      var emailEl = document.getElementById('speakEmail');
      var stageEl = document.getElementById('speakStage');
      var name = nameEl ? nameEl.value.trim() : '';
      var email = emailEl ? emailEl.value.trim() : '';
      var stage = stageEl ? stageEl.value.trim() : '';

      if (!name || !email || !stage) {
        alert('Please complete the required fields.');
        return;
      }
      speakForm.innerHTML = '<div class="notice-box"><p class="h3" style="color:var(--gold);">Inquiry Received</p><p class="body">Thank you, ' + name + '. Eunicia and the executive speaking team have received your stage details and will respond personally within 24 business hours.</p></div>';
    });
  }

  /* ── 9. Newsletter Subscription Box ── */
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