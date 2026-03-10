/**
 * translation.js
 * Reliable EN ↔ AR toggle via the Google Translate widget combo-select API.
 * Persists language choice in localStorage across page navigations.
 */

const STORAGE_KEY = 'ac_lang';
const MAX_WAIT_MS = 3000;
const POLL_MS = 100;

export function initTranslation() {
  // ── 1. Inject hidden GT container ─────────────────────────────
  const container = document.createElement('div');
  container.id = 'google_translate_element';
  container.style.cssText = 'position:absolute;top:-9999px;left:-9999px;visibility:hidden;';
  document.body.appendChild(container);

  // ── 2. GT callback — fires once widget is loaded ───────────────
  window.googleTranslateElementInit = function () {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'ar,en',
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    );

    // Restore saved language on every page load
    const saved = getSavedLang();
    if (saved === 'ar') applyLanguage('ar');
    syncButtons();
  };

  // ── 3. Load GT script once ─────────────────────────────────────
  if (!document.querySelector('script[src*="translate.google"]')) {
    const script = document.createElement('script');
    script.src = 'https://translate.googleapis.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }

  // ── 4. Wire all toggle buttons ────────────────────────────────
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const next = getSavedLang() === 'ar' ? 'en' : 'ar';
      saveLang(next);
      applyLanguage(next);
      syncButtons();
    });
  });

  // Set initial labels without waiting for GT
  syncButtons();
}

// ── Helpers ───────────────────────────────────────────────────────

function getSavedLang() {
  return localStorage.getItem(STORAGE_KEY) || 'en';
}

function saveLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
}

function applyLanguage(lang) {
  const deadline = Date.now() + MAX_WAIT_MS;

  const attempt = () => {
    const select = document.querySelector('.goog-te-combo');

    if (!select) {
      if (Date.now() < deadline) setTimeout(attempt, POLL_MS);
      return;
    }

    if (lang === 'en') {
      // Use GT's own restore link if available, otherwise set select to 'en'
      const restoreLink = document.querySelector('.goog-te-gadget a');
      if (restoreLink) {
        restoreLink.click();
      } else {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
      }
    } else {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    }

    // Keep <html> attributes in sync for RTL layout
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  };

  attempt();
}

function syncButtons() {
  const current = getSavedLang();
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.textContent = current === 'ar' ? 'EN' : 'AR';
    btn.setAttribute('aria-label', current === 'ar' ? 'Switch to English' : 'Switch to Arabic');
  });
}
