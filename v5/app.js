/* ═══════════════════════════════════════════════════════════════════════
   EXCELSTRA v5 — GLOBAL INTERACTION & GSAP MOTION CONTROLLER
   Pure GSAP 3 animations, interactive SVG Architectural Hub,
   tactile glassmorphism controls, and resilient lead webhook pipeline.
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // Verify GSAP
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ── 1. Frosted Navigation Elevation ── */
  const nav = document.getElementById('nav');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -40',
      onUpdate: (self) => {
        if (self.direction === 1 && self.progress > 0.05) {
          nav.classList.add('scrolled');
        } else if (self.progress <= 0.01) {
          nav.classList.remove('scrolled');
        }
      }
    });
  }

  /* ── 2. Universal GSAP Entrance Reveals ── */
  const revealCards = gsap.utils.toArray('.glass-card, .tier-card, .pedigree-item');
  if (revealCards.length) {
    revealCards.forEach((el) => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 35, filter: 'blur(6px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /* ── 3. Interactive SVG Architectural Hub ── */
  const hubData = {
    cpa: {
      title: 'Tax Strategy & Statutory Stewardship',
      desc: 'Proactive deduction design, multi-tier statutory structuring, and aggressive capital retention models that prevent annual wealth bleed.'
    },
    wealth: {
      title: 'Wealth Management & Private Banking',
      desc: 'Institutional capital preservation, family office asset governance, and liquidity modeling aligned directly with enterprise succession.'
    },
    estate: {
      title: 'Estate Counsel & Asset Protection',
      desc: 'Dynastic trusts, structural asset fortification, and multi-generational wealth preservation designed to withstand jurisdictional shifts.'
    },
    enterprise: {
      title: 'Enterprise Scaling & Operational Leverage',
      desc: 'Multi-million dollar business systemization, recurring operational enterprise value, and high-multiple exit preparation.'
    },
    longevity: {
      title: 'Founder Vitality & Longevity Protocol',
      desc: 'Integrating cognitive performance, physical endurance, and health capital alongside multi-generational balance sheet growth.'
    },
    core: {
      title: 'The Excelstra Integration Hub',
      desc: 'The single table where all five disciplines sit together. Led by Eunicia Peret, ensuring every advisor executes from one unified master plan.'
    }
  };

  const hubNodes = document.querySelectorAll('.hub-node');
  const hubTitle = document.getElementById('hubDetailTitle');
  const hubDesc = document.getElementById('hubDetailDesc');

  hubNodes.forEach((node) => {
    node.addEventListener('mouseenter', function () {
      const key = this.getAttribute('data-node');
      if (hubData[key] && hubTitle && hubDesc) {
        gsap.to([hubTitle, hubDesc], {
          opacity: 0,
          y: -5,
          duration: 0.15,
          onComplete: () => {
            hubTitle.textContent = hubData[key].title;
            hubDesc.textContent = hubData[key].desc;
            gsap.to([hubTitle, hubDesc], { opacity: 1, y: 0, duration: 0.25 });
          }
        });

        // Pulse the hovered node SVG circle
        const circle = this.querySelector('.hub-node-circle');
        if (circle) {
          gsap.fromTo(circle, 
            { scale: 1, transformOrigin: 'center' },
            { scale: 1.12, duration: 0.3, yoyo: true, repeat: 1, ease: 'power1.out' }
          );
        }
      }
    });
  });

  /* ── 4. Photo Break Parallax Scrubbing ── */
  const photoBreaks = gsap.utils.toArray('.photo-break img');
  photoBreaks.forEach((img) => {
    gsap.fromTo(img,
      { yPercent: -10, scale: 1.1 },
      {
        yPercent: 10,
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        }
      }
    );
  });

  /* ── 5. Form Submissions & Webhook Pipeline ── */
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach((form) => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || email.indexOf('@') === -1) return;

      const webhookUrl = window.EXCELSTRA_WEBHOOK_URL;
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
