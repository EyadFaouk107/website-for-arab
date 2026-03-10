/**
 * Main Entry Point
 */

import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initCounters } from './modules/counters.js';
import { initSlider } from './modules/slider.js';
import { initProjects } from './modules/projects.js';
import { initForms } from './modules/forms.js';
import { initYouTube } from './modules/youtube.js';
import { initTranslation } from './modules/translation.js';

function initApp() {
  console.log('Arab Contractors Website Initialized');
  
  initTranslation();
  initNavigation();
  initAnimations();
  initCounters();
  initSlider();
  initProjects();
  initForms();
  initYouTube();

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
