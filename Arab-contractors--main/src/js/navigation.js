/**
 * navigation.js
 * Handles: sticky header, mobile drawer + backdrop, mega menu hover, active link.
 */

export function initNavigation() {
  const header    = document.querySelector('.header');
  const drawer    = document.querySelector('.nav-drawer');
  const backdrop  = document.querySelector('.drawer-backdrop');
  const openBtn   = document.querySelector('.nav-mobile-toggle');
  const closeBtn  = document.querySelector('.nav-close');

  if (!header) return;

  // ── Sticky shadow on scroll ──────────────────────────────────
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── Mobile drawer open / close ───────────────────────────────
  const openDrawer = () => {
    drawer?.classList.add('open');
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  // Close on any drawer link click
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  // ── Mega menu (desktop hover) ────────────────────────────────
  document.querySelectorAll('.has-mega-menu').forEach(item => {
    const menu = item.querySelector('.mega-menu');
    if (!menu) return;

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024) menu.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
      menu.classList.remove('active');
    });
  });

  // ── Active nav link (based on current page) ──────────────────
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop()?.split('?')[0];
    link.classList.toggle('active', href === currentPath);
  });
}
