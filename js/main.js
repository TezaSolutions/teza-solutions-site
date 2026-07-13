// ==========================================================================
// TEZA SOLUTIONS — main.js
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Contact form (static hosting: no backend by default — mailto fallback)
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Anti-spam: si le champ piège est rempli, c'est un robot — on arrête silencieusement.
      const honeypot = contactForm.querySelector('#website');
      if (honeypot && honeypot.value.trim() !== '') {
        return;
      }

      const confirmBox = document.querySelector('#form-confirm');
      const errorBox = document.querySelector('#form-error');
      const submitBtn = document.querySelector('#form-submit-btn');
      if (confirmBox) confirmBox.hidden = true;
      if (errorBox) errorBox.hidden = true;

      const name = contactForm.querySelector('#name')?.value.trim();
      const email = contactForm.querySelector('#email')?.value.trim();
      const message = contactForm.querySelector('#message')?.value.trim();
      if (!name || !email || !message) {
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });
        const result = await response.json();

        if (result.success) {
          contactForm.reset();
          if (confirmBox) confirmBox.hidden = false;
        } else {
          if (errorBox) errorBox.hidden = false;
        }
      } catch (err) {
        if (errorBox) errorBox.hidden = false;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Envoyer le message';
        }
      }
    });
  }

  // Animate hero diagram lines drawing in
  const paths = document.querySelectorAll('.diagram-frame svg path[data-draw]');
  paths.forEach((path, i) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.transition = `stroke-dashoffset 1.1s ease ${0.15 * i}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = '0';
      });
    });
  });

  // Scroll reveal: fade + rise elements into view as the user scrolls
  const revealTargets = document.querySelectorAll(
    '.card, .process-step, .stat, .post-card, .section-head, .diagram-frame, .grid-2 > div'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // Fade the scattered nodes in staggered, then pulse the merge node
  const nodes = document.querySelectorAll('.diagram-frame [data-node]');
  nodes.forEach((node, i) => {
    node.style.opacity = '0';
    node.style.transition = `opacity 0.5s ease ${0.1 * i}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        node.style.opacity = '1';
      });
    });
  });
});
