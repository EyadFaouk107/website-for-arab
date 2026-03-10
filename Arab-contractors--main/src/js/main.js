/**
 * main.js  —  Application entry point
 *
 * Imports and initialises all modules.
 * Each module is self-contained and guards against missing DOM nodes.
 */

import { initNavigation }  from './modules/navigation.js';
import { initAnimations }  from './modules/animations.js';
import { initCounters }    from './modules/counters.js';
import { initSlider }      from './modules/slider.js';
import { initProjects }    from './modules/projects.js';
import { initForms }       from './modules/forms.js';
import { initYouTube }     from './modules/youtube.js';
import { initTranslation } from './modules/translation.js';

// ── Bootstrap ────────────────────────────────────────────────────

function bootstrap() {
  initTranslation();
  initNavigation();
  initAnimations();
  initCounters();
  initSlider();
  initProjects();
  initForms();
  initYouTube();
  initBackToTop();
}

// ── Back-to-top button ───────────────────────────────────────────

function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => btn.classList.toggle('visible', window.scrollY > 400),
    { passive: true }
  );

  btn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// ── Run after DOM is ready ────────────────────────────────────────

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
