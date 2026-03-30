// ===== Header scroll effect =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile menu toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close menu when a nav link is clicked
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('open');
  });
});

// ===== Scroll animations (Intersection Observer) =====
const animateElements = document.querySelectorAll(
  '.about-grid, .course-card, .other-course-item, .gallery-item, .staff-card, .access-grid, .contact-method, .contact-form, .feature-item'
);

animateElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
);

animateElements.forEach(el => observer.observe(el));

// ===== Contact form (frontend only) =====
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (!data.name || !data.email) {
    alert('お名前とメールアドレスは必須です。');
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = '送信しました！ありがとうございます';
  btn.disabled = true;
  btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
    btn.style.background = '';
    form.reset();
  }, 3000);
});
