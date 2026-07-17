/* ==========================================================================
   Sahil Sarki — Portfolio
   script.js — all interactive behavior
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Loading Screen ---------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('loaded'), 500);
  });

  /* ---------------- AOS Init ---------------- */
  if (window.AOS) {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* ---------------- Footer Year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Scroll Progress Bar ---------------- */
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';

    if (navbar) navbar.classList.toggle('scrolled', scrollTop > 30);
    if (backToTop) backToTop.classList.toggle('visible', scrollTop > 500);

    updateActiveNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------------- Mobile Nav ---------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------- Active Nav Highlight ---------------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        current = sec.getAttribute('id');
      }
    });
    navItems.forEach(item => {
      item.classList.toggle('active-link', item.getAttribute('href') === '#' + current);
    });
  }

  /* ---------------- Theme Toggle ---------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');

  function applyTheme(theme) {
    document.body.classList.toggle('light-mode', theme === 'light');
    if (themeIcon) themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const next = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  /* ---------------- Custom Cursor ---------------- */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (cursorDot) { cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; }
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (cursorRing) { cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px'; }
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .service-card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing?.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursorRing?.classList.remove('hovered'));
    });
  }

  /* ---------------- Typed.js Hero Rotation ---------------- */
  if (window.Typed) {
    new Typed('#typed-text', {
      strings: ['Full Stack Websites', 'Modern Web Designs', 'AI Automation Systems', 'Freelance Projects'],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: false
    });
  }

  /* ---------------- Particles.js Background ---------------- */
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 900 } },
        color: { value: '#6d94ff' },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, distance: 140, color: '#3b6fff', opacity: 0.18, width: 1 },
        move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.4 } }, push: { particles_nb: 3 } }
      },
      retina_detect: true
    });
  }

  /* ---------------- Animated Counters ---------------- */
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const countSpan = el.querySelector('.count');
      let current = 0;
      const duration = 1400;
      const stepTime = Math.max(16, duration / target);

      const timer = setInterval(() => {
        current += 1;
        countSpan.textContent = current;
        if (current >= target) clearInterval(timer);
      }, stepTime);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ---------------- Animated Skill Bars ---------------- */
  const skillRows = document.querySelectorAll('.skill-row');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const row = entry.target;
      const percent = row.getAttribute('data-percent');
      const fill = row.querySelector('.skill-fill');
      requestAnimationFrame(() => { fill.style.width = percent + '%'; });
      skillObserver.unobserve(row);
    });
  }, { threshold: 0.4 });

  skillRows.forEach(row => skillObserver.observe(row));

  /* ---------------- FAQ Accordion ---------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------------- Booking Form — EmailJS ---------------- */
  // Replace these with your own EmailJS credentials from https://www.emailjs.com/
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

  if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const bookingForm = document.getElementById('booking-form');
  const formStatus = document.getElementById('form-status');
  const submitText = document.getElementById('submit-text');

  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    if (!window.emailjs || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      formStatus.textContent = 'Form is set up — add your EmailJS keys in script.js to activate sending.';
      formStatus.className = 'form-status error';
      return;
    }

    submitText.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, bookingForm)
      .then(() => {
        formStatus.textContent = 'Thanks! Your inquiry has been sent — I\'ll reply within 24 hours.';
        formStatus.className = 'form-status success';
        bookingForm.reset();
      })
      .catch(() => {
        formStatus.textContent = 'Something went wrong. Please try WhatsApp or email instead.';
        formStatus.className = 'form-status error';
      })
      .finally(() => { submitText.textContent = 'Send Inquiry'; });
  });

});
