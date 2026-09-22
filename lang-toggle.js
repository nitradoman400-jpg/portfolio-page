(function () {
  const STORAGE_KEY = 'lang';

  function detectBrowserLang() {
    const browserLang = navigator.language || navigator.userLanguage || 'de';
    return browserLang.toLowerCase().startsWith('de') ? 'de' : 'en';
  }

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || detectBrowserLang();
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    const button = document.getElementById('lang-toggle');
    if (button) {
      button.textContent = lang === 'de' ? 'EN' : 'DE';
    }

    document.querySelectorAll('[data-de][data-en]').forEach((el) => {
      el.innerHTML = lang === 'de' ? el.dataset.de : el.dataset.en;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(getLang());

    const button = document.getElementById('lang-toggle');
    if (button) {
      button.addEventListener('click', () => {
        const nextLang = getLang() === 'de' ? 'en' : 'de';
        localStorage.setItem(STORAGE_KEY, nextLang);
        applyLang(nextLang);
      });
    }
  });
})();
