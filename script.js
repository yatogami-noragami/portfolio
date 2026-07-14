(function () {
  'use strict';

  var body = document.body;
  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById('themeToggle');
  var savedTheme = null;
  try { savedTheme = localStorageSafe(); } catch (e) { savedTheme = null; }

  function localStorageSafe() {
    // localStorage is unavailable in some sandboxed contexts; guard for it.
    return window.localStorage ? window.localStorage.getItem('wyo-theme') : null;
  }

  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    root.classList.add('dark');
  }

  themeToggle.addEventListener('click', function () {
    root.classList.toggle('dark');
    try {
      window.localStorage.setItem('wyo-theme', root.classList.contains('dark') ? 'dark' : 'light');
    } catch (e) { /* ignore */ }
  });

  /* ---------- Mobile nav ---------- */
  var navBurger = document.getElementById('navBurger');
  var mainNav = document.getElementById('mainNav');
  navBurger.addEventListener('click', function () {
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
      mainNav.classList.remove('open');
    });
  });

  /* ---------- Language switch dropdown ---------- */
  var langSwitch = document.getElementById('langSwitch');
  var langCurrent = document.getElementById('langCurrent');
  langCurrent.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = langSwitch.classList.toggle('open');
    langCurrent.setAttribute('aria-expanded', isOpen);
  });
  document.addEventListener('click', function () {
    langSwitch.classList.remove('open');
    langCurrent.setAttribute('aria-expanded', 'false');
  });

  /* ---------- Scroll progress bar ---------- */
  var progressLine = document.getElementById('progressLine');
  var toTopBtn = document.getElementById('toTop');

  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressLine.style.width = Math.min(pct, 100) + '%';

    if (scrollTop > 480) {
      toTopBtn.classList.add('visible');
    } else {
      toTopBtn.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Scroll reveal + skill bar fill ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var skillEls = document.querySelectorAll('.skill');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    skillEls.forEach(function (el) { skillObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
    skillEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll('main .section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    var scrollPos = window.scrollY + window.innerHeight * 0.3;
    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

})();

// --- i18n Translation Logic ---

// --- Responsive i18n Translation Logic ---

function applyLang(lang) {
  const selectedLang = translations[lang] ? lang : 'en';
  let dictionary = JSON.parse(JSON.stringify(translations[selectedLang])); // Deep clone to prevent mutating original dictionary

  // Tweak for Mobile/Tablet Screens (Less than 768px wide)
  const isMobileOrTablet = window.innerWidth <= 768;
  if (isMobileOrTablet) {
    // 1. Remove rigid line breaks in the hero title so it flows naturally on narrow screens
    if (dictionary.hero_title) {
      dictionary.hero_title = dictionary.hero_title.replace(/<br\s*\/?>/gi, ' ');
    }
    // 2. Shorten structural words if they risk overflowing sidebar wrappers or badges
    if (selectedLang === 'en' && dictionary.fact_occupation_val) {
      dictionary.fact_occupation_val = "Full-Stack Dev (Self-Taught)";
    }
  }

  // Update HTML tag attribute
  document.documentElement.setAttribute('lang', selectedLang);

  // Update all elements with a [data-i18n] attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (dictionary[key]) {
      element.innerHTML = dictionary[key];
    }
  });

  // Update the dropdown current label visual
  const langCurrentBtn = document.getElementById('langCurrent');
  if (langCurrentBtn) {
    langCurrentBtn.innerHTML = `${selectedLang.toUpperCase()} <span class="chevron">▾</span>`;
  }

  // Save state
  localStorage.setItem('preferredLang', selectedLang);

  // Update URL parameters dynamically
  const url = new URL(window.location);
  url.searchParams.set('lang', selectedLang);
  window.history.pushState({}, '', url);
}

// Determine initial language on page load
function initLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  const storedLang = localStorage.getItem('preferredLang');

  let browserLang = navigator.language || navigator.userLanguage;
  browserLang = browserLang.toLowerCase().startsWith('zh') ? 'tw' :
    browserLang.toLowerCase().startsWith('ja') ? 'jp' : 'en';

  const targetLang = urlLang || storedLang || browserLang;
  applyLang(targetLang);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();

  // Re-run alignment check if screen orientation changes or window resizes
  window.addEventListener('resize', () => {
    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    applyLang(currentLang);
  });

  const langMenu = document.getElementById('langMenu');
  if (langMenu) {
    langMenu.addEventListener('click', (e) => {
      const targetLink = e.target.closest('[data-lang]');
      if (targetLink) {
        e.preventDefault();
        const selectedLang = targetLink.getAttribute('data-lang');
        applyLang(selectedLang);
        langMenu.classList.remove('show');
      }
    });
  }
});