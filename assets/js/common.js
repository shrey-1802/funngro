/**
 * FUNNGRO ADVANCED INTERACTION ENGINE
 * Built to Principal Creative Frontend Standards
 * - Dynamic Mouse Spotlight & Border Halo Engine (Raycast / Linear style)
 * - Hardware-Accelerated 3D Card Tilt with Multi-Tier Parallax Depth
 * - Magnetic Button Physics Engine
 * - High-Performance Scroll Reveal (Intersection Observer)
 * - Smooth Progressive Value-Increment Counter Ticker
 * - Accessible Navigation & Modal Controller
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. DYNAMIC MOUSE SPOTLIGHT BORDER ENGINE
     Tracks cursor coordinates and binds CSS variables (--mouse-x, --mouse-y)
     ========================================================================== */
  function initSpotlightEngine() {
    const spotlightCards = document.querySelectorAll('.spotlight-card, .tilt-card');
    if (!spotlightCards.length) return;

    spotlightCards.forEach(card => {
      let isHovered = false;

      const handlePointerMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      };

      card.addEventListener('pointerenter', () => { isHovered = true; }, { passive: true });
      card.addEventListener('pointermove', (e) => {
        if (isHovered) {
          handlePointerMove(e);
        }
      }, { passive: true });
      card.addEventListener('pointerleave', () => { isHovered = false; }, { passive: true });
    });
  }

  /* ==========================================================================
     2. MAGNETIC BUTTON ENGINE
     Subtly pulls action CTAs toward the cursor with spring physics
     ========================================================================== */
  function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    if (!magneticBtns.length || window.matchMedia('(hover: none)').matches) return;

    magneticBtns.forEach(btn => {
      const inner = btn.querySelector('.magnetic-btn-inner') || btn;
      let rafId = null;

      const onMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.32;
        const deltaY = (e.clientY - centerY) * 0.32;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
          if (inner !== btn) {
            inner.style.transform = `translate3d(${deltaX * 0.4}px, ${deltaY * 0.4}px, 0)`;
          }
        });
      };

      const onMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        btn.style.transform = 'translate3d(0px, 0px, 0)';
        if (inner !== btn) {
          inner.style.transform = 'translate3d(0px, 0px, 0)';
        }
      };

      btn.addEventListener('mousemove', onMouseMove, { passive: true });
      btn.addEventListener('mouseleave', onMouseLeave, { passive: true });
    });
  }

  /* ==========================================================================
     3. 3D CARD TILT WITH MULTI-TIER DEPTH PARALLAX
     ========================================================================== */
  function init3DTiltEngine() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    if (!tiltCards.length || window.matchMedia('(hover: none)').matches) return;

    tiltCards.forEach(card => {
      let rafId = null;
      let mouseX = 0;
      let mouseY = 0;
      let isHovering = false;

      let glare = card.querySelector('.tilt-card-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'tilt-card-glare';
        card.appendChild(glare);
      }

      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        if (!isHovering) {
          isHovering = true;
          glare.style.opacity = '1';
        }

        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            const width = rect.width;
            const height = rect.height;

            const normalizedX = (mouseX / width) * 2 - 1;
            const normalizedY = (mouseY / height) * 2 - 1;

            const rotateX = (-normalizedY * 11).toFixed(2);
            const rotateY = (normalizedX * 11).toFixed(2);

            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`;

            const glareX = (mouseX / width) * 100;
            const glareY = (mouseY / height) * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.18) 0%, transparent 65%)`;

            rafId = null;
          });
        }
      };

      const onMouseLeave = () => {
        isHovering = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        glare.style.opacity = '0';
      };

      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave, { passive: true });
    });
  }

  /* ==========================================================================
     4. HARDWARE-ACCELERATED SCROLL REVEAL ENGINE
     ========================================================================== */
  function initScrollRevealEngine() {
    const revealElements = document.querySelectorAll('.reveal-item');
    if (!revealElements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealElements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => scrollObserver.observe(el));
  }

  /* ==========================================================================
     5. PROGRESSIVE COUNTER TICKER ENGINE
     ========================================================================== */
  function initCounterTickerEngine() {
    const counterElements = document.querySelectorAll('.counter-val');
    if (!counterElements.length) return;

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(el => counterObserver.observe(el));

    function animateCounter(element) {
      const targetVal = parseFloat(element.getAttribute('data-target') || '0');
      const duration = parseInt(element.getAttribute('data-duration') || '2000', 10);
      const prefix = element.getAttribute('data-prefix') || '';
      const suffix = element.getAttribute('data-suffix') || '';
      const decimals = parseInt(element.getAttribute('data-decimals') || '0', 10);

      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentVal = targetVal * easeProgress;

        const formatted = currentVal.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });

        element.textContent = `${prefix}${formatted}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          const finalFormatted = targetVal.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
          });
          element.textContent = `${prefix}${finalFormatted}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    }
  }

  /* ==========================================================================
     6. NAVIGATION, MODAL, & ACCESSIBILITY CONTROLLER
     ========================================================================== */
  function initNavigation() {
    const navbar = document.getElementById('main-nav');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          navbar.classList.add('shadow-xl', 'border-opacity-100');
        } else {
          navbar.classList.remove('shadow-xl');
        }
      }, { passive: true });
    }

    // Mobile Hamburger Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-drawer');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
          mobileMenu.classList.remove('hidden');
          document.body.classList.add('modal-active');
        } else {
          mobileMenu.classList.add('hidden');
          document.body.classList.remove('modal-active');
        }
      });

      if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          document.body.classList.remove('modal-active');
        });
      }
    }

    // Modal Triggers
    const modalTriggers = document.querySelectorAll('[data-open-modal]');
    modalTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = btn.getAttribute('data-open-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.remove('hidden');
          document.body.classList.add('modal-active');
          const firstInput = modal.querySelector('input, select, textarea, button');
          if (firstInput) firstInput.focus();
        }
      });
    });

    const modalClosers = document.querySelectorAll('[data-close-modal]');
    modalClosers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = btn.closest('.modal-container');
        if (modal) {
          modal.classList.add('hidden');
          document.body.classList.remove('modal-active');
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal-container:not(.hidden)');
        openModals.forEach(modal => modal.classList.add('hidden'));
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
        document.body.classList.remove('modal-active');
      }
    });
  }

  /* ==========================================================================
     LIFECYCLE INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initSpotlightEngine();
    initMagneticButtons();
    init3DTiltEngine();
    initScrollRevealEngine();
    initCounterTickerEngine();
    initNavigation();
  });

})();
