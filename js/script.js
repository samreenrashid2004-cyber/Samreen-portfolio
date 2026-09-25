/* =========================================================
   SAMREEN RASHID PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const year = document.getElementById('year');
  const cursorGlow = document.getElementById('cursorGlow');
  const navbar = document.getElementById('navbar');
  const menuButton = document.getElementById('menuButton');
  const navLinks = document.getElementById('navLinks');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  const progressBar = document.getElementById('progressBar');
  const themeButton = document.getElementById('themeButton');
  const themePanel = document.getElementById('themePanel');
  const closeTheme = document.getElementById('closeTheme');
  const themeOptions = document.querySelectorAll('.theme-option');
  const typingText = document.getElementById('typing-text') || document.getElementById('typingText');
  const backTop = document.getElementById('backTop');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  window.addEventListener('load', () => {
    setTimeout(() => preloader?.classList.add('hidden'), 700);
  });

  if (year) year.textContent = new Date().getFullYear();

  if (cursorGlow && window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('pointermove', (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  function updateNavbar() {
    navbar?.classList.toggle('scrolled', window.scrollY > 30);
  }

  function updateActiveNav() {
    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    navItems.forEach((item) => {
      item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
    });
  }

  function updateProgress() {
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
    backTop?.classList.toggle('visible', window.scrollY > 700);
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveNav();
    updateProgress();
  });

  updateNavbar();
  updateActiveNav();
  updateProgress();

  menuButton?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
    menuButton.querySelector('i')?.classList.toggle('fa-bars', !isOpen);
    menuButton.querySelector('i')?.classList.toggle('fa-xmark', Boolean(isOpen));
  });

  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('active');
      menuButton?.setAttribute('aria-expanded', 'false');
      const icon = menuButton?.querySelector('i');
      icon?.classList.add('fa-bars');
      icon?.classList.remove('fa-xmark');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const savedTheme = localStorage.getItem('portfolioTheme') || localStorage.getItem('portfolio-theme') || 'violet';

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem('portfolioTheme', theme);
    themeOptions.forEach((option) => option.classList.toggle('active', option.dataset.theme === theme));
  }

  applyTheme(savedTheme);
  themeButton?.addEventListener('click', () => themePanel?.classList.toggle('open'));
  closeTheme?.addEventListener('click', () => themePanel?.classList.remove('open'));

  themeOptions.forEach((option) => {
    option.addEventListener('click', () => {
      applyTheme(option.dataset.theme);
      themePanel?.classList.remove('open');
    });
  });

  document.addEventListener('click', (event) => {
    if (themePanel?.classList.contains('open') && !themePanel.contains(event.target) && !themeButton?.contains(event.target)) {
      themePanel.classList.remove('open');
    }
  });

  if (typingText) {
    const roles = ['HTML & CSS', 'JavaScript', 'React', 'Python & Django', 'REST APIs', 'Responsive Design'];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeRole() {
      const role = roles[roleIndex];
      typingText.textContent = deleting ? role.substring(0, charIndex - 1) : role.substring(0, charIndex + 1);
      charIndex += deleting ? -1 : 1;

      if (!deleting && charIndex === role.length) {
        deleting = true;
        setTimeout(typeRole, 1800);
        return;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 500);
        return;
      }

      setTimeout(typeRole, deleting ? 75 : 120);
    }

    typeRole();
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.counter || 0);
      let current = 0;
      const increment = target / (1000 / 30);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = `${target}+`;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current);
        }
      }, 30);
      observer.unobserve(element);
    });
  }, { threshold: 0.8 });

  document.querySelectorAll('[data-counter]').forEach((counter) => counterObserver.observe(counter));

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      projectCards.forEach((card) => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
    });
  });

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !subject || !message) {
      if (formStatus) formStatus.textContent = 'Please complete all fields.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (formStatus) formStatus.textContent = 'Please enter a valid email address.';
      return;
    }

    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(`Name: ${name}\n\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:samreenrashid2004@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    if (formStatus) formStatus.textContent = 'Opening your email application...';
  });

  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.btn, .hero-socials a, .theme-button').forEach((button) => {
      button.addEventListener('mousemove', (event) => {
        const rect = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.08}px, ${(event.clientY - rect.top - rect.height / 2) * 0.08}px)`;
      });
      button.addEventListener('mouseleave', () => { button.style.transform = ''; });
    });

    document.querySelectorAll('.project-card, .about-card, .skill-group').forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
        const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

});
