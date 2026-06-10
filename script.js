// =============================================
// ASMA C. DIDATO — Portfolio Scripts
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // === TYPING EFFECT ===
  const titles = ['System Developer', 'UI Designer', 'BSIS Student', 'Poster Designer'];
  let tIdx = 0, cIdx = 0, isDeleting = false;
  const typingEl = document.getElementById('typing-text');

  function typeLoop() {
    if (!typingEl) return;
    const current = titles[tIdx];
    typingEl.textContent = isDeleting
      ? current.substring(0, --cIdx)
      : current.substring(0, ++cIdx);

    let delay = isDeleting ? 55 : 100;
    if (!isDeleting && cIdx === current.length) { delay = 1800; isDeleting = true; }
    else if (isDeleting && cIdx === 0) { isDeleting = false; tIdx = (tIdx + 1) % titles.length; delay = 300; }
    setTimeout(typeLoop, delay);
  }
  typeLoop();

  // === NAVBAR SCROLL ===
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // === HAMBURGER ===
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger && hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks && navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // === SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // === SCROLL REVEAL ===
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // === SKILL BARS ===
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.getAttribute('data-width') + '%'; }, 300);
        });
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  const skillsSec = document.getElementById('skills');
  if (skillsSec) skillObs.observe(skillsSec);

  // === ACTIVE NAV ===
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (s.getBoundingClientRect().top < 120) current = s.id; });
    navAs.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) a.style.color = 'var(--text-on-dark)';
    });
  });

  // === YEAR ===
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
