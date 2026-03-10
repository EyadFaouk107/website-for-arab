/**
 * slider.js
 * Auto-advancing hero slider with pause-on-hover.
 */

export function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  const INTERVAL = 6000;
  let current = 0;
  let timer   = null;

  const goTo = (index) => {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');

    // Re-trigger hero content animation
    const content = slides[current].querySelector('.hero-content');
    if (content) {
      content.classList.remove('anim-fade-up');
      void content.offsetWidth; // force reflow
      content.classList.add('anim-fade-up');
    }
  };

  const next = () => goTo(current + 1);

  const start = () => { timer = setInterval(next, INTERVAL); };
  const stop  = () => clearInterval(timer);

  start();

  // Pause on hover for accessibility / usability
  const heroEl = document.querySelector('.hero');
  heroEl?.addEventListener('mouseenter', stop);
  heroEl?.addEventListener('mouseleave', start);
}
