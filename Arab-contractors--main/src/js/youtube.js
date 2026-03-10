/**
 * youtube.js
 * Fetches the latest videos from the Arab Contractors YouTube channel
 * via the rss2json proxy. Falls back to static placeholder cards on error.
 */

const CHANNEL_ID  = 'UChK3hIjEocqsIQhj_3WtXSg';
const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`;
const FEED_URL    = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
)}`;
const VIDEO_COUNT = 6;

const FALLBACK_VIDEOS = [
  {
    title: 'Rod El Farag Axis Bridge — Engineering Masterpiece',
    link:  `${CHANNEL_URL}`,
    pubDate: new Date().toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600',
  },
  {
    title: 'Arab Contractors: Building the Future Since 1955',
    link:  `${CHANNEL_URL}`,
    pubDate: new Date().toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600',
  },
  {
    title: 'Sustainable Construction Initiatives',
    link:  `${CHANNEL_URL}`,
    pubDate: new Date().toISOString(),
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600',
  },
];

export async function initYouTube() {
  const container = document.querySelector('#youtube-videos-container');
  if (!container) return;

  container.innerHTML = `
    <div style="grid-column:1/-1; text-align:center; padding: 2rem 0;">
      <div class="spinner"></div>
      <p class="text-sm text-muted" style="margin-top:1rem;">Loading latest videos…</p>
    </div>`;

  try {
    const res = await fetch(FEED_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (data.status !== 'ok') throw new Error(data.message ?? 'Feed parse error');

    const videos = (data.items ?? []).slice(0, VIDEO_COUNT);
    if (!videos.length) throw new Error('Empty feed');

    renderVideos(videos, container);
  } catch (err) {
    console.warn('[YouTube] Falling back to static cards.', err.message);
    renderVideos(FALLBACK_VIDEOS, container);
  }
}

// ── Helpers ─────────────────────────────────────────────────────

/** Extract YouTube video ID from any YouTube URL */
const getVideoId = (url) => {
  const match = url?.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? '';
};

/** Format a date string into a readable label */
const formatDate = (str) =>
  str ? new Date(str).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';

function renderVideos(videos, container) {
  container.innerHTML = '';

  videos.forEach((video, i) => {
    const videoId   = getVideoId(video.link);
    const thumbnail = video.thumbnail
      ?? (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : FALLBACK_VIDEOS[0].thumbnail);
    const date  = formatDate(video.pubDate);
    const title = video.title ?? 'Watch on YouTube';
    const link  = video.link  ?? CHANNEL_URL;

    const card = document.createElement('div');
    card.className = 'card reveal reveal--up';
    card.dataset.delay = String(Math.min(i + 1, 5));

    card.innerHTML = `
      <a href="${link}" target="_blank" rel="noopener noreferrer"
         class="block" style="display:flex;flex-direction:column;height:100%;">
        <div class="relative overflow-hidden" style="aspect-ratio:16/9;">
          <img
            src="${thumbnail}"
            alt="${title}"
            class="w-full h-full object-cover"
            style="transition: transform 0.6s var(--ease);"
            referrerpolicy="no-referrer"
            loading="lazy"
            onerror="this.src='${FALLBACK_VIDEOS[0].thumbnail}'"
          >
          <div style="
            position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
            background:rgba(0,0,0,0.28);opacity:0;transition:opacity 0.3s;
          " class="play-overlay">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="white"
                 style="filter:drop-shadow(0 2px 8px rgba(0,0,0,0.5));">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="card__body">
          ${date ? `<p class="card__date">${date}</p>` : ''}
          <h3 class="line-clamp-2" style="font-size:1.05rem;margin-bottom:.75rem;">${title}</h3>
          <span class="card__link" style="margin-top:auto;">
            WATCH NOW →
          </span>
        </div>
      </a>`;

    // Hover interaction for play overlay + image
    const img     = card.querySelector('img');
    const overlay = card.querySelector('.play-overlay');
    card.addEventListener('mouseenter', () => {
      if (img)     img.style.transform     = 'scale(1.06)';
      if (overlay) overlay.style.opacity   = '1';
    });
    card.addEventListener('mouseleave', () => {
      if (img)     img.style.transform     = '';
      if (overlay) overlay.style.opacity   = '0';
    });

    container.appendChild(card);
  });

  // Trigger reveal observer for newly added cards
  requestAnimationFrame(() => {
    container.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('is-visible');
    });
  });
}
