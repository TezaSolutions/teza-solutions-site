// ==========================================================================
// TEZA SOLUTIONS — main.js
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- Hero animated node network ----
  const canvas = document.getElementById('hero-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let w, h, nodes, raf;
    const NODE_COUNT = window.innerWidth < 700 ? 26 : 54;
    const MAX_DIST = window.innerWidth < 700 ? 120 : 165;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.8,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.22;
            ctx.strokeStyle = `rgba(179, 48, 73, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(232, 166, 179, 0.55)';
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    function start() { resize(); init(); cancelAnimationFrame(raf); draw(); }
    start();
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(start, 200); });
  }


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
