// ── DOM REFS ─────────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const cursor    = document.getElementById('cursor');
const follower  = document.getElementById('cursorFollower');

// ── PAGE LOADER ──────────────────────────────────────────
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('done');
        document.body.classList.add('loaded');
        revealOnScroll();
        updateNavbar();
    }, 1200);
});

// ── NAVBAR — tighten on scroll ────────────────────────────
function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateProcessLine();
}
window.addEventListener('scroll', updateNavbar, { passive: true });
// ── HAMBURGER ────────────────────────────────────────────
hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ── CUSTOM CURSOR ────────────────────────────────────────
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx}px, ${my}px)`;
});
(function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.transform = `translate(${fx}px, ${fy}px)`;
    requestAnimationFrame(animateFollower);
})();
document.querySelectorAll('a, button, .product-card, .usecase-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover');    follower.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
});

// ── SCROLL REVEAL ────────────────────────────────────────
const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-right], [data-reveal-stagger]');
const observer  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = el.dataset.revealStagger !== undefined
            ? [...el.parentElement.children].indexOf(el) * 80
            : 0;
        setTimeout(() => el.classList.add('revealed'), delay);
        observer.unobserve(el);
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function revealOnScroll() {
    revealEls.forEach(el => observer.observe(el));
}

// ── HERO TITLE ANIMATION ─────────────────────────────────
document.querySelectorAll('.hero-title .line').forEach((line, i) => {
    line.style.transitionDelay = `${0.1 + i * 0.12}s`;
});
setTimeout(() => {
    document.querySelectorAll('.hero-title .line').forEach(l => l.classList.add('in'));
    document.querySelector('.hero-eyebrow')?.classList.add('in');
    document.querySelector('.hero-sub')?.classList.add('in');
    document.querySelector('.hero-actions')?.classList.add('in');
}, 1300);

// ── PROCESS LINE FILL ────────────────────────────────────
function updateProcessLine() {
    const section = document.getElementById('process');
    const line    = document.getElementById('processLine');
    if (!section || !line) return;
    const rect     = section.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1,
        (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
    ));
    line.style.width = (progress * 100) + '%';
}

// ── FAQ ──────────────────────────────────────────────────
function toggleFaq(btn) {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('active');
    document.querySelectorAll('.faq-item.active').forEach(i => i.classList.remove('active'));
    if (!isOpen) item.classList.add('active');
}

// ── BADGE ROTATION ───────────────────────────────────────
const badgeRing = document.querySelector('.badge-ring');
if (badgeRing) {
    let angle = 0;
    setInterval(() => {
        angle += 0.4;
        badgeRing.querySelector('.badge-svg').style.transform = `rotate(${angle}deg)`;
    }, 16);
}

// ── ACTIVE NAV LINK ON SCROLL ────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}, { passive: true });
