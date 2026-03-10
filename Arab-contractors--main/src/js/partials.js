/**
 * partials.js  —  Shared HTML fragments
 *
 * Usage: import { renderHeader, renderFooter } from './partials.js'
 * and call them from each page's inline <script type="module">.
 *
 * This eliminates copy-paste duplication across all HTML pages.
 * The active nav link is set automatically by navigation.js based on the URL.
 */

const NAV_LINKS = [
  { href: 'index.html',          label: 'Home' },
  { href: 'about.html',          label: 'About' },
  { href: 'projects.html',       label: 'Projects', hasMega: true },
  { href: 'sectors.html',        label: 'Sectors' },
  { href: 'news.html',           label: 'News' },
  { href: 'careers.html',        label: 'Careers' },
  { href: 'contact.html',        label: 'Contact' },
];

const LOGO_SVG = `
  <svg width="180" height="56" viewBox="0 0 180 56" xmlns="http://www.w3.org/2000/svg" aria-label="Arab Contractors logo">
    <circle cx="28" cy="28" r="24" fill="#003366"/>
    <text x="28" y="36" font-family="Arial" font-size="22" fill="white" text-anchor="middle" font-weight="bold">AC</text>
    <text x="62" y="24" font-family="Arial" font-size="16" fill="#003366" font-weight="bold">ARAB CONTRACTORS</text>
    <text x="62" y="44" font-family="Arial" font-size="13" fill="#E8A317" font-weight="bold">المقاولون العرب</text>
  </svg>`;

const MEGA_MENU = `
  <div class="mega-menu">
    <div class="container grid grid-3">
      <div>
        <h4 class="mb-4">By Sector</h4>
        <ul style="display:flex;flex-direction:column;gap:.5rem;">
          <li><a href="projects.html?sector=infrastructure">Infrastructure</a></li>
          <li><a href="projects.html?sector=buildings">Buildings</a></li>
          <li><a href="projects.html?sector=energy">Energy</a></li>
          <li><a href="projects.html?sector=water">Water</a></li>
        </ul>
      </div>
      <div>
        <h4 class="mb-4">By Region</h4>
        <ul style="display:flex;flex-direction:column;gap:.5rem;">
          <li><a href="projects.html?region=egypt">Egypt</a></li>
          <li><a href="projects.html?region=africa">Africa</a></li>
          <li><a href="projects.html?region=middle-east">Middle East</a></li>
        </ul>
      </div>
      <div>
        <h4 class="mb-4">Featured</h4>
        <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400"
             alt="Rod El Farag Bridge" class="mega-menu-img" referrerpolicy="no-referrer">
        <p class="text-sm text-muted">Rod El Farag Axis Bridge</p>
      </div>
    </div>
  </div>`;

function buildNavLinks() {
  return NAV_LINKS.map(({ href, label, hasMega }) => `
    <li${hasMega ? ' class="has-mega-menu relative"' : ''}>
      <a href="${href}" class="nav-link">${label}${hasMega ? ' ▾' : ''}</a>
      ${hasMega ? MEGA_MENU : ''}
    </li>`).join('');
}

function buildDrawerLinks() {
  return NAV_LINKS.map(({ href, label }) => `
    <li><a href="${href}">${label}</a></li>`).join('');
}

export function renderHeader() {
  const el = document.querySelector('#site-header');
  if (!el) return;

  el.className = 'header z-nav';
  el.innerHTML = `
    <div class="container flex-between h-full">
      <a href="index.html" class="logo" aria-label="Arab Contractors – Home">
        ${LOGO_SVG}
      </a>

      <nav class="nav-desktop" aria-label="Main navigation">
        <ul class="flex gap-8">${buildNavLinks()}</ul>
      </nav>

      <div class="nav-actions flex items-center gap-4">
        <button class="search-trigger" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
        <button class="lang-btn notranslate" aria-label="Switch language">AR</button>
        <button class="nav-mobile-toggle mobile-only" aria-label="Open menu" aria-expanded="false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>`;
}

export function renderDrawer() {
  const el = document.querySelector('#nav-drawer');
  if (!el) return;

  el.className = 'nav-drawer';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-label', 'Navigation menu');
  el.innerHTML = `
    <div class="drawer-header flex-between">
      <span class="eyebrow">Menu</span>
      <button class="nav-close" aria-label="Close menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <nav aria-label="Mobile navigation">
      <ul class="drawer-links">${buildDrawerLinks()}</ul>
    </nav>`;
}

export function renderFooter() {
  const el = document.querySelector('#site-footer');
  if (!el) return;

  el.className = 'footer';
  el.innerHTML = `
    <div class="container">
      <div class="grid grid-4 mb-12">
        <!-- Brand -->
        <div>
          <svg width="150" height="48" viewBox="0 0 180 56" xmlns="http://www.w3.org/2000/svg" class="mb-6">
            <circle cx="28" cy="28" r="24" fill="white"/>
            <text x="28" y="36" font-family="Arial" font-size="22" fill="#003366" text-anchor="middle" font-weight="bold">AC</text>
            <text x="62" y="24" font-family="Arial" font-size="16" fill="white" font-weight="bold">ARAB CONTRACTORS</text>
            <text x="62" y="44" font-family="Arial" font-size="13" fill="#E8A317" font-weight="bold">المقاولون العرب</text>
          </svg>
          <p style="font-size:.875rem;color:rgba(255,255,255,.65);line-height:1.7;">
            One of the largest construction companies in the Middle East &amp; Africa, with roots extending back more than half a century.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <p class="footer__heading">Quick Links</p>
          <ul class="footer__links">
            <li><a href="about.html">About Us</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="sectors.html">Sectors</a></li>
            <li><a href="innovation.html">Innovation</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="news.html">News</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <p class="footer__heading">Contact</p>
          <p class="footer__contact-item">34 Adly Street, Cairo, Egypt</p>
          <p class="footer__contact-item">+20 2 23959500</p>
          <p class="footer__contact-item">info@arabcont.com</p>
        </div>

        <!-- Social -->
        <div>
          <p class="footer__heading">Follow Us</p>
          <div class="footer__social">
            <a href="#" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" aria-label="X / Twitter">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/UChK3hIjEocqsIQhj_3WtXSg"
               target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">© ${new Date().getFullYear()} Arab Contractors (Osman Ahmed Osman &amp; Co.). All rights reserved.</p>
        <div class="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>`;
}
