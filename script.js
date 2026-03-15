/* 
   script.js — Kwame Aboagye-Gyedu Portfolio
   */

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close menu when a nav link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* ---- SMOOTH SCROLL — CTA BUTTON ---- */
function scrollToProjects() {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

/* ---- CUSTOM CURSOR (desktop / mouse only) ---- */
const cursor = document.querySelector('.cursor');
if (cursor && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
}

/* ---- TYPING EFFECT ---- */
const phrases = [
  'Computer Engineer',
  'Web Developer',
  'Creative Technologist'
];

const typingEl = document.getElementById('typing');
let phraseIdx  = 0;
let charIdx    = 0;
let deleting   = false;

function type() {
  const current = phrases[phraseIdx];

  typingEl.textContent = deleting
    ? current.substring(0, charIdx--)
    : current.substring(0, charIdx++);

  let speed = deleting ? 40 : 70;

  if (!deleting && charIdx > current.length) {
    speed    = 1800; // pause before deleting
    deleting = true;
  } else if (deleting && charIdx < 0) {
    deleting  = false;
    charIdx   = 0;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    speed     = 400; // pause before typing next phrase
  }

  setTimeout(type, speed);
}

type();

/* ---- SCROLL REVEAL ---- */
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));
