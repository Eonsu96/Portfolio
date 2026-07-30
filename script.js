/* ===================================================================
   EONSU — PORTFOLIO SCRIPT
   Theme persists only for the current session (no localStorage), so
   this works safely both as a standalone site and inside sandboxed
   previews. Hosting it yourself? Feel free to add localStorage for
   a persistent preference across visits.
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('is-hidden'), 350);
  });
  // Fallback in case 'load' already fired or takes too long
  setTimeout(() => loader && loader.classList.add('is-hidden'), 1800);

  /* ---------- Theme toggle (in-memory only) ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) root.setAttribute('data-theme', 'dark');

  themeToggle && themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
  });

  /* ---------- Navbar: scroll style + mobile toggle ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 30) navbar.classList.add('is-scrolled');
    else navbar.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle && navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-open');
    navLinks.classList.toggle('is-open');
  });
  navLinks && navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      navLinks.classList.remove('is-open');
    });
  });

  /* ---------- Typing animation ---------- */
  const roles = [
    'Co-Founder',
    'Geographer',
    'Entreprenure',
    'Gender Champion',
    'Public Speaker',
    'Student Leader'
  ];
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    let roleIndex = 0, charIndex = 0, deleting = false;
    const TYPE_SPEED = 55, DELETE_SPEED = 30, HOLD_TIME = 1400;

    const tick = () => {
      const word = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(tick, HOLD_TIME);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        typedEl.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    };
    tick();
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.masonry-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = item.dataset.caption || img.alt;
      lightbox.classList.add('is-open');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
  };
  lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
  lightbox && lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- Contact form -> mailto ---------- */
  const contactForm = document.getElementById('contactForm');
  const formHint = document.getElementById('formHint');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = contactForm.dataset.email || '{{EMAIL}}';
    const name = contactForm.querySelector('#cf-name').value;
    const fromEmail = contactForm.querySelector('#cf-email').value;
    const subject = contactForm.querySelector('#cf-subject').value;
    const message = contactForm.querySelector('#cf-message').value;

    const body = `${message}\n\n— ${name} (${fromEmail})`;
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    if (formHint) {
      formHint.textContent = 'Opening your email app…';
      setTimeout(() => {
        formHint.textContent = 'Opens your email app — no message is stored or sent automatically.';
      }, 4000);
    }
  });

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
