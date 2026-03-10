/**
 * projects.js
 * Filter + search for the projects page.
 * Reads ?sector= query param on load to pre-activate a filter.
 */

export function initProjects() {
  const grid      = document.querySelector('#project-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.querySelector('#project-search');

  if (!grid) return;

  const items = Array.from(grid.querySelectorAll('.project-card-wrapper'));

  // ── Apply a filter + search ──────────────────────────────────
  const applyFilter = () => {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter ?? 'all';
    const query = searchInput?.value.trim().toLowerCase() ?? '';

    items.forEach(item => {
      const category = item.dataset.category ?? '';
      const title    = item.querySelector('h3')?.textContent.toLowerCase() ?? '';

      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !query || title.includes(query);
      const show = matchesFilter && matchesSearch;

      // Smooth show/hide via opacity + height instead of display:none
      item.style.transition = 'opacity 0.3s, transform 0.3s';
      item.style.opacity    = show ? '1' : '0';
      item.style.pointerEvents = show ? '' : 'none';
      item.style.transform  = show ? '' : 'scale(0.96)';

      // Collapse hidden items so grid reflows
      setTimeout(() => {
        item.style.display = show ? '' : 'none';
      }, show ? 0 : 300);
    });
  };

  // ── Filter button clicks ─────────────────────────────────────
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter();
    });
  });

  // ── Live search ──────────────────────────────────────────────
  searchInput?.addEventListener('input', applyFilter);

  // ── Pre-select filter from URL ?sector= param ────────────────
  const sectorParam = new URLSearchParams(location.search).get('sector');
  if (sectorParam) {
    const matchingBtn = [...filterBtns].find(b => b.dataset.filter === sectorParam);
    if (matchingBtn) {
      filterBtns.forEach(b => b.classList.remove('active'));
      matchingBtn.classList.add('active');
    }
  }

  applyFilter();
}
