/**
 * translation.js
 * Reliable EN ↔ AR toggle via the Google Translate widget combo select API.
 *
 * Strategy:
 *  1. Load the hidden Google Translate widget.
 *  2. On toggle click, drive the hidden <select.goog-te-combo> directly.
 *  3. Persist chosen language in localStorage — restored on every page load.
 *  4. Update the <html lang / dir> attributes for layout (RTL support).
 */

const STORAGE_KEY = 'ac_lang';
const DEFAULT_LANG = 'en';
const MAX_WAIT_MS  = 3000;
const POLL_MS      = 100;

export function initTranslation() {
  // ── 1. Inject hidden GT container ───────────────────────────
  const container = document.createElement('div');
  container.id = 'google_translate_element';
  document.body.appendChild(container);

  // ── 2. Register GT callback ──────────────────────────────────
  window.googleTranslateElementInit = () => {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'ar,en',
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    );

    const saved = getSavedLang();
    if (saved === 'ar') applyLanguage('ar');
    syncButtons();
  };

  // ── 3. Load GT script (once) ─────────────────────────────────
  if (!document.querySelector('script[src*="translate.google"]')) {
    const script = document.createElement('script');
    script.src = 'https://translate.googleapis.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }

  // ── 4. Wire toggle buttons ───────────────────────────────────
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const next = getSavedLang() === 'ar' ? 'en' : 'ar';
      applyLanguage(next);
      saveLang(next);
      syncButtons();
    });
  });

  // Set initial button labels
  syncButtons();
}

// ── Helpers ─────────────────────────────────────────────────────

function getSavedLang() {
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_LANG;
}

function saveLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
}

/**
 * Drive the Google Translate hidden <select> to apply the translation.
 * Retries until the widget is ready or the timeout is reached.
 */
function applyLanguage(lang) {
  const deadline = Date.now() + MAX_WAIT_MS;

  const attempt = () => {
    const select = document.querySelector('.goog-te-combo');

    if (!select) {
      if (Date.now() < deadline) setTimeout(attempt, POLL_MS);
      return;
    }

    if (lang === 'en') {
      // Restore original page — GT exposes a restore link
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

    // Keep HTML attributes in sync for RTL layout
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  };

  attempt();
}

/** Keep all toggle buttons showing the *target* language label */
function syncButtons() {
  const current = getSavedLang();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.textContent = current === 'ar' ? 'EN' : 'AR';
    btn.setAttribute('aria-label', current === 'ar' ? 'Switch to English' : 'Switch to Arabic');
  });
}
