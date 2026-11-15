/**
 * SYNTRA CONSULTING · Main Interactive Script
 * Modern Agency & Consulting Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initNavSmoothScroll();
  initNewsletterToast();
  initTeamAccordion();
  initEiaAccordion();
  initAnnexToggles();
  initMethodologyPopovers();
  initServicesCarousel3D();
});

/* Mobile Menu Toggle & Navigation Handling */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownItem = document.querySelector('.nav-item-dropdown');

  // EIA Dropdown: Open on hover and KEEP open until clicking anywhere on the screen
  if (dropdownItem) {
    const dropdownToggle = dropdownItem.querySelector('.nav-link');

    // Desktop: open on hover (mouseenter) and stay open
    dropdownItem.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        dropdownItem.classList.add('is-open');
      }
    });

    // Mobile: accordion click toggle
    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdownItem.classList.toggle('is-open');
        }
      });
    }

    // Close when clicking ANYWHERE outside on the screen
    document.addEventListener('click', (e) => {
      if (!dropdownItem.contains(e.target)) {
        dropdownItem.classList.remove('is-open');
      }
    });

    // Close when clicking any option inside the dropdown
    dropdownItem.querySelectorAll('.nav-dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        dropdownItem.classList.remove('is-open');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdownItem.classList.remove('is-open');
      }
    });
  }

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('is-active');
      toggleBtn.classList.toggle('is-active', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on any navigation link click (regular nav links and dropdown items)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        // If clicking the EIA dropdown toggle on mobile, do not close the entire nav
        if (window.innerWidth <= 768 && dropdownItem && link === dropdownItem.querySelector('.nav-link')) {
          return;
        }
        navMenu.classList.remove('is-active');
        toggleBtn.classList.remove('is-active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        if (dropdownItem) {
          dropdownItem.classList.remove('is-open');
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-active')) {
        if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
          navMenu.classList.remove('is-active');
          toggleBtn.classList.remove('is-active');
          toggleBtn.setAttribute('aria-expanded', 'false');
          if (dropdownItem) {
            dropdownItem.classList.remove('is-open');
          }
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
        navMenu.classList.remove('is-active');
        toggleBtn.classList.remove('is-active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        if (dropdownItem) {
          dropdownItem.classList.remove('is-open');
        }
      }
    });

    // Reset mobile classes on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('is-active');
        toggleBtn.classList.remove('is-active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* Header Sticky Scroll Effect */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });
}

/* Cross-page Smooth Anchor Scrolling */
function initNavSmoothScroll() {
  const path = window.location.pathname;
  const isIndex = path.endsWith('index.html') || path.endsWith('/') || path === '' || !path.includes('.html');
  if (isIndex) {
    document.querySelectorAll('a[href*="index.html#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        const hash = href.substring(href.indexOf('#'));
        const targetElem = document.querySelector(hash);
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, null, hash);
        }
      });
    });
  }
}

/* Newsletter Submit Feedback */
function initNewsletterToast() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        const originalBtn = form.querySelector('.newsletter-btn');
        if (originalBtn) {
          const originalHTML = originalBtn.innerHTML;
          originalBtn.innerHTML = '✓';
          originalBtn.style.backgroundColor = '#10B981';
          input.value = '';
          input.placeholder = '¡Suscripción confirmada!';
          setTimeout(() => {
            originalBtn.innerHTML = originalHTML;
            originalBtn.style.backgroundColor = '';
            input.placeholder = 'Ingresa tu correo';
          }, 3000);
        }
      }
    });
  });
}

/* EIA Index Accordion Stream */
function initEiaAccordion() {
  const headers = document.querySelectorAll('.eia-accordion-header');
  if (!headers.length) return;

  headers.forEach(header => {
    header.addEventListener('click', (e) => {
      // If user clicked the direct "Ver sección" link inside header, allow navigation
      if (e.target.closest('a')) return;

      const card = header.closest('.eia-card-accordion');
      if (card) {
        card.classList.toggle('is-open');
      }
    });
  });
}

/* Collapsible Annex / Appendix Toggles */
function initAnnexToggles() {
  const toggleBtns = document.querySelectorAll('.annex-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const annexBox = btn.closest('.annex-box');
      if (annexBox) {
        const isOpen = annexBox.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen);
        const textSpan = btn.querySelector('.toggle-label');
        if (textSpan) {
          textSpan.textContent = isOpen ? 'Ocultar anexo documental' : 'Ver anexo documental y detalles';
        }
      }
    });
  });
}

/* Methodology Lightbulb Popovers (Daniel Piorun Principles) */
function initMethodologyPopovers() {
  const wrappers = document.querySelectorAll('.methodology-bar-wrapper');
  if (!wrappers.length) return;

  wrappers.forEach(wrapper => {
    const trigger = wrapper.querySelector('.methodology-trigger-btn');
    const popoverId = trigger ? trigger.getAttribute('aria-controls') : null;
    const popover = popoverId ? document.getElementById(popoverId) : wrapper.querySelector('.methodology-popover-box');
    const bar = wrapper.querySelector('.methodology-pill-bar');

    if (!trigger || !popover) return;

    const closeBtn = popover.querySelector('.popover-close-btn');

    const togglePopover = (forceState) => {
      const isCurrentlyOpen = popover.classList.contains('is-open');
      const shouldOpen = typeof forceState === 'boolean' ? forceState : !isCurrentlyOpen;

      popover.classList.toggle('is-open', shouldOpen);
      trigger.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      if (bar) bar.classList.toggle('is-active', shouldOpen);
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePopover();
    });

    if (bar) {
      bar.addEventListener('click', (e) => {
        if (e.target.closest('.methodology-trigger-btn')) return;
        e.stopPropagation();
        togglePopover();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePopover(false);
      });
    }

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (popover.classList.contains('is-open')) {
        if (!popover.contains(e.target) && !bar.contains(e.target)) {
          togglePopover(false);
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popover.classList.contains('is-open')) {
        togglePopover(false);
      }
    });
  });
}

/* Horizontal & Mobile Team Accordion Component */
function initTeamAccordion() {
  const accordion = document.getElementById('teamAccordion');
  if (!accordion) return;

  const cards = accordion.querySelectorAll('.team-acc-card');
  if (!cards.length) return;

  let activeCard = accordion.querySelector('.team-acc-card.is-active') || cards[0];

  function toggleCard(targetCard) {
    const isMobile = window.innerWidth <= 860;

    // Mobile: tapping an already open card toggles it closed
    if (isMobile && activeCard === targetCard) {
      targetCard.classList.remove('is-active');
      targetCard.setAttribute('aria-expanded', 'false');
      activeCard = null;
      return;
    }

    cards.forEach(card => {
      const isActive = card === targetCard;
      card.classList.toggle('is-active', isActive);
      card.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
    activeCard = targetCard;

    if (isMobile) {
      setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }

  cards.forEach(card => {
    // Click on card / pill
    card.addEventListener('click', (e) => {
      const isMobile = window.innerWidth <= 860;
      // On mobile, ignore clicks inside expanded content area (text selection, reading)
      if (isMobile && e.target.closest('.team-acc-expanded')) {
        return;
      }
      toggleCard(card);
    });

    // Hover on desktop
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 860) {
        toggleCard(card);
      }
    });

    // Keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card);
      }
    });
  });
}

/* ==========================================================================
   3D Services Carousel (Qué Hacemos)
   Coverflow / 3D Perspective + Arrow Navigation + Touch & Drag Support
   ========================================================================== */
function initServicesCarousel3D() {
  const wrapper = document.getElementById('servicesCarousel3D');
  if (!wrapper) return;

  const stage = document.getElementById('carousel3DStage');
  const track = document.getElementById('carousel3DTrack');
  const cards = Array.from(wrapper.querySelectorAll('.carousel-3d-card'));
  const prevBtn = document.getElementById('carousel3DPrev');
  const nextBtn = document.getElementById('carousel3DNext');
  const dots = Array.from(wrapper.querySelectorAll('.carousel-3d-dot'));

  if (!cards.length) return;

  const totalCards = cards.length;
  let currentIndex = 0;

  function updateStageHeight() {
    if (!stage) return;
    let maxH = 0;
    cards.forEach(card => {
      const h = card.offsetHeight || card.scrollHeight;
      if (h > maxH) maxH = h;
    });
    if (maxH > 0) {
      const extraPad = window.innerWidth <= 640 ? 30 : 50;
      const cleanH = Math.ceil(maxH / 2) * 2 + extraPad;
      stage.style.setProperty('--carousel-stage-height', cleanH + 'px');
    }
  }

  function updateCarousel() {
    const w = window.innerWidth;
    const isMobile = w <= 640;
    const isTablet = w > 640 && w <= 992;

    cards.forEach((card, k) => {
      let offset = k - currentIndex;
      while (offset > totalCards / 2) offset -= totalCards;
      while (offset < -totalCards / 2) offset += totalCards;

      const absOffset = Math.abs(offset);
      const isActive = offset === 0;

      card.classList.toggle('is-active', isActive);
      card.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      card.setAttribute('tabindex', isActive ? '0' : '-1');

      let transform = '';
      let opacity = 0;
      let zIndex = 0;
      let pointerEvents = 'none';

      if (isMobile) {
        if (offset === 0) {
          transform = 'translate3d(-50%, -50%, 0) scale(1)';
          opacity = 1;
          zIndex = 20;
          pointerEvents = 'auto';
        } else if (offset === 1) {
          transform = 'translate3d(calc(-50% + 76px), -50%, -40px) rotateY(-18deg) scale(0.88)';
          opacity = 0.45;
          zIndex = 5;
          pointerEvents = 'auto';
        } else if (offset === -1) {
          transform = 'translate3d(calc(-50% - 76px), -50%, -40px) rotateY(18deg) scale(0.88)';
          opacity = 0.45;
          zIndex = 5;
          pointerEvents = 'auto';
        } else {
          transform = `translate3d(calc(-50% + ${offset > 0 ? 120 : -120}px), -50%, -120px) rotateY(${offset > 0 ? -30 : 30}deg) scale(0.7)`;
          opacity = 0;
          zIndex = 1;
          pointerEvents = 'none';
        }
      } else if (isTablet) {
        if (offset === 0) {
          transform = 'translate3d(-50%, -50%, 0) scale(1)';
          opacity = 1;
          zIndex = 20;
          pointerEvents = 'auto';
        } else if (offset === 1) {
          transform = 'translate3d(calc(-50% + 200px), -50%, -60px) rotateY(-24deg) scale(0.86)';
          opacity = 0.72;
          zIndex = 6;
          pointerEvents = 'auto';
        } else if (offset === -1) {
          transform = 'translate3d(calc(-50% - 200px), -50%, -60px) rotateY(24deg) scale(0.86)';
          opacity = 0.72;
          zIndex = 6;
          pointerEvents = 'auto';
        } else if (absOffset === 2) {
          transform = `translate3d(calc(-50% + ${offset > 0 ? 330 : -330}px), -50%, -140px) rotateY(${offset > 0 ? -35 : 35}deg) scale(0.72)`;
          opacity = 0.25;
          zIndex = 2;
          pointerEvents = 'auto';
        } else {
          transform = 'translate3d(-50%, -50%, -240px) scale(0.5)';
          opacity = 0;
          zIndex = 0;
          pointerEvents = 'none';
        }
      } else {
        // Desktop
        if (offset === 0) {
          transform = 'translate3d(-50%, -50%, 0) scale(1)';
          opacity = 1;
          zIndex = 20;
          pointerEvents = 'auto';
        } else if (offset === 1) {
          transform = 'translate3d(calc(-50% + 300px), -50%, -70px) rotateY(-26deg) scale(0.88)';
          opacity = 0.78;
          zIndex = 6;
          pointerEvents = 'auto';
        } else if (offset === -1) {
          transform = 'translate3d(calc(-50% - 300px), -50%, -70px) rotateY(26deg) scale(0.88)';
          opacity = 0.78;
          zIndex = 6;
          pointerEvents = 'auto';
        } else if (offset === 2) {
          transform = 'translate3d(calc(-50% + 520px), -50%, -160px) rotateY(-38deg) scale(0.72)';
          opacity = 0.38;
          zIndex = 3;
          pointerEvents = 'auto';
        } else if (offset === -2) {
          transform = 'translate3d(calc(-50% - 520px), -50%, -160px) rotateY(38deg) scale(0.72)';
          opacity = 0.38;
          zIndex = 3;
          pointerEvents = 'auto';
        } else {
          transform = 'translate3d(-50%, -50%, -260px) rotateY(0deg) scale(0.55)';
          opacity = 0;
          zIndex = 0;
          pointerEvents = 'none';
        }
      }

      card.style.transform = transform;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      card.style.pointerEvents = pointerEvents;
    });

    // Update Dots
    dots.forEach((dot, idx) => {
      const isDotActive = idx === currentIndex;
      dot.classList.toggle('is-active', isDotActive);
      dot.setAttribute('aria-selected', isDotActive ? 'true' : 'false');
    });
  }

  function goTo(index) {
    currentIndex = ((index % totalCards) + totalCards) % totalCards;
    updateCarousel();
  }

  function goToNext() {
    goTo(currentIndex + 1);
  }

  function goToPrev() {
    goTo(currentIndex - 1);
  }

  // Event Listeners: Navigation Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToPrev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToNext();
    });
  }

  // Event Listeners: Dots
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      goTo(idx);
    });
  });

  // Event Listeners: Clicking on a side card rotates it to center
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      if (idx !== currentIndex) {
        e.preventDefault();
        goTo(idx);
      }
    });
  });

  // Touch Swipe on Mobile
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let isSwiping = false;

  if (stage) {
    stage.addEventListener('touchstart', (e) => {
      if (!e.touches || !e.touches[0]) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchEndX = touchStartX;
      touchEndY = touchStartY;
      isSwiping = true;
    }, { passive: true });

    stage.addEventListener('touchmove', (e) => {
      if (!isSwiping || !e.touches || !e.touches[0]) return;
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // If swipe is horizontal, prevent document scrolling jitter
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 12) {
        if (e.cancelable) e.preventDefault();
      }
    }, { passive: false });

    stage.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // 36px threshold for swipe detection
      if (Math.abs(diffX) > 36 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    }, { passive: true });

    stage.addEventListener('touchcancel', () => {
      isSwiping = false;
    });

    // Mouse Drag on Desktop
    let isMouseDown = false;
    let mouseStartX = 0;
    let mouseDeltaX = 0;

    stage.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isMouseDown = true;
      mouseStartX = e.clientX;
      mouseDeltaX = 0;
      stage.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      mouseDeltaX = e.clientX - mouseStartX;
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      stage.style.cursor = '';
      if (Math.abs(mouseDeltaX) > 50) {
        if (mouseDeltaX < 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    });

    // Keyboard support (Left / Right Arrow)
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    });
  }

  // Initial render & resize handler
  updateCarousel();
  updateStageHeight();

  // Re-calculate after font and style loading
  window.addEventListener('load', () => {
    updateStageHeight();
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    updateStageHeight();
    updateCarousel();
  });
}

