/**
 * SYNTRA CONSULTING · Main Interactive Script
 * Modern Agency & Consulting Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initNewsletterToast();
  initEiaAccordion();
  initAnnexToggles();
  initMethodologyPopovers();
});

/* Mobile Menu Toggle & Navigation Handling */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownItem = document.querySelector('.nav-item-dropdown');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('is-active');
      toggleBtn.classList.toggle('is-active', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Mobile dropdown toggle for EIA (accordion behavior on small screens)
    if (dropdownItem) {
      const dropdownToggle = dropdownItem.querySelector('.nav-link');
      if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownItem.classList.toggle('is-open');
          }
        });
      }
    }

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
        if (dropdownItem) {
          dropdownItem.classList.remove('is-open');
        }
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

