/* ═══════════════════════════════════════════════
   TOPIARY MARKETING — PREMIUM JAVASCRIPT v3
   ═══════════════════════════════════════════════ */
'use strict';

/* ── PRELOADER ────────────────────────────────── */
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  document.body.style.overflow = 'hidden';

  function hidePreloader() {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
    initHeroAnimations();
  }

  window.addEventListener('load', () => setTimeout(hidePreloader, 2000));
  setTimeout(hidePreloader, 3200); // fallback
})();

/* ── GSAP HERO ANIMATIONS ─────────────────────── */
function initHeroAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.to('.orb-1', { y: -30, x: 20,  duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.orb-2', { y: 20,  x: -15, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
  gsap.to('.orb-3', { y: -15, x: 25,  duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4 });

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // CTA glow pulse
    const ctaGlow = document.querySelector('.cta-bg-glow');
    if (ctaGlow) gsap.to(ctaGlow, { scale: 1.15, opacity: .8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Section title clip reveal
    gsap.utils.toArray('.section-title').forEach(el => {
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
      );
    });
  }
}

/* ── NAVBAR ───────────────────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── MOBILE MENU ──────────────────────────────── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('mobile-menu');
  if (!hamburger || !menu) return;

  const open  = () => { hamburger.classList.add('open'); menu.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { hamburger.classList.remove('open'); menu.classList.remove('open'); document.body.style.overflow = ''; };

  hamburger.addEventListener('click', () => hamburger.classList.contains('open') ? close() : open());
  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => e.key === 'Escape' && close());
})();

/* ── SCROLL PROGRESS ──────────────────────────── */
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  }, { passive: true });
})();

/* ── BACK TO TOP ──────────────────────────────── */
(function () {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── ANIMATED COUNTER ─────────────────────────── */
(function () {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;
  let started = false;

  function run(el) {
    const target = parseInt(el.dataset.count, 10);
    const step   = target / (2000 / 16);
    let cur = 0;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = Math.floor(cur);
    }, 16);
  }

  function check() {
    if (started) return;
    const stats = document.querySelector('.hero-stats');
    if (stats && stats.getBoundingClientRect().top < window.innerHeight) {
      started = true;
      counters.forEach(run);
      window.removeEventListener('scroll', check);
    }
  }
  window.addEventListener('scroll', check, { passive: true });
  setTimeout(check, 2600);
})();

/* ── SMOOTH ANCHOR SCROLL ─────────────────────── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = (document.getElementById('navbar')?.offsetHeight || 80);
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
})();

/* ── SCROLL SPY ───────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => {
          l.classList.toggle('active-link', l.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe && sections.forEach(s =>
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(l => l.classList.toggle('active-link', l.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' }).observe(s)
  );
})();

/* ── BUTTON RIPPLE ────────────────────────────── */
(function () {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = this.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 1.5;
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
})();

/* ── CONTACT FORM — Web3Forms ─────────────────── */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn  = form.querySelector('button[type="submit"]');
    const note = form.querySelector('.form-note');

    btn.innerHTML = '<span>Sending…</span> <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;

    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form)
      });
      const json = await res.json();

      if (json.success) {
        btn.innerHTML = '<span>Sent Successfully!</span> <i class="fa-solid fa-check"></i>';
        btn.style.background = '#25d366';
        if (note) { note.textContent = "Thank you! We'll get back to you within 24 hours."; note.style.color = '#25d366'; }
        form.reset();
      } else throw new Error(json.message);

    } catch {
      btn.innerHTML = '<span>Failed — Try Again</span> <i class="fa-solid fa-xmark"></i>';
      btn.style.background = '#cc0033';
      btn.disabled = false;
      if (note) { note.textContent = 'Something went wrong. Please email us directly.'; note.style.color = '#ff4444'; }
    }

    setTimeout(() => {
      btn.innerHTML = '<span>Send Enquiry</span> <i class="fa-solid fa-paper-plane"></i>';
      btn.disabled = false; btn.style.background = '';
      if (note) { note.textContent = "We'll respond within 24 hours."; note.style.color = ''; }
    }, 6000);
  });
})();

/* ── TILT ON CARDS ────────────────────────────── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;

  document.querySelectorAll('.svc-card, .why-card, .product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `perspective(600px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.transition = 'transform .4s ease'; });
    card.addEventListener('mouseenter', () => { card.style.transition = 'transform .1s ease'; });
  });
})();

/* ── MAGNETIC BUTTONS ─────────────────────────── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;

  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.2}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; btn.style.transition = 'transform .4s ease'; });
    btn.addEventListener('mouseenter', () => { btn.style.transition = 'transform .1s ease'; });
  });
})();

/* ── PARALLAX HERO ────────────────────────────── */
(function () {
  const img = document.querySelector('.hero-img');
  if (!img || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('scroll', () => {
    img.style.transform = `scale(1.06) translateY(${window.scrollY * .25}px)`;
  }, { passive: true });
})();

/* ── HERO BADGE SCRAMBLE ──────────────────────── */
(function () {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  const original = "Zimbabwe's Office Solutions Leader Since 1999";
  const chars    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let iter = 0, interval = null;

  function scramble() {
    clearInterval(interval);
    interval = setInterval(() => {
      const node = badge.childNodes[badge.childNodes.length - 1];
      if (!node) return;
      node.textContent = original.split('').map((c, i) => {
        if (i < iter) return c;
        if (c === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (iter >= original.length) { clearInterval(interval); node.textContent = original; }
      iter += 1.5;
    }, 30);
  }
  setTimeout(scramble, 2400);
})();

/* ── FOOTER YEAR ──────────────────────────────── */
(function () {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ── AOS INIT ─────────────────────────────────── */
(function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, easing: 'cubic-bezier(0.4,0,0.2,1)', once: true, offset: 60 });
  }
})();

/* ── ACTIVE NAV STYLE INJECTION ───────────────── */
const s = document.createElement('style');
s.textContent = `
  .nav-link.active-link { color: var(--white) !important; }
  .nav-link.active-link::after { left: .9rem !important; right: .9rem !important; }
`;
document.head.appendChild(s);