/* Auto TOC, Author expand/collapse, YMAL slider controls */
document.addEventListener('DOMContentLoaded', () => {
  // Build TOC from H2/H3
  const content = document.querySelector('#erf-article-content');
  const tocLists = document.querySelectorAll('[data-auto-toc]');
  if (content && tocLists.length) {
    const headings = content.querySelectorAll('h2, h3');
    headings.forEach((h, idx) => {
      if (!h.id) h.id = `section-${idx + 1}`;
      tocLists.forEach((list) => {
        const li = document.createElement('li');
        li.className = 'erf-toc__item';
        const a = document.createElement('a');
        a.href = `#${h.id}`;
        a.textContent = h.textContent.trim();
        li.appendChild(a);
        list.appendChild(li);
      });
    });
  }

  // Author bio expand/collapse (default clamp = 2 lines)
  const card = document.querySelector('.erf-author__card');
  if (card) {
    const linesAttr = card.getAttribute('data-lines');
    const lines = linesAttr ? parseInt(linesAttr, 10) : 2;
    const bio = card.querySelector('.erf-author__bio');
    const toggle = card.querySelector('[data-toggle="author"]');
    if (bio && toggle) {
      bio.style.setProperty('--erf-author-lines', String(lines));
      toggle.addEventListener('click', () => {
        const expanded = bio.classList.toggle('is-expanded');
        toggle.textContent = expanded ? 'Show Less' : 'Learn More';
      });
    }
  }

  // YMAL slider controls (mobile only) – fix listener reset
  const track = document.querySelector('[data-slider]');
  function bindMobileControls() {
    const prev = document.querySelector('.erf-ymal__prev');
    const next = document.querySelector('.erf-ymal__next');
    if (!track || !prev || !next) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Clean listeners by cloning properly
    const prevClone = prev.cloneNode(true);
    const nextClone = next.cloneNode(true);
    prev.parentNode.replaceChild(prevClone, prev);
    next.parentNode.replaceChild(nextClone, next);

    if (isMobile) {
      const scrollAmount = () => Math.min(600, track.clientWidth * 0.9);
      prevClone.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });
      nextClone.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });
    }
  }

  bindMobileControls();
  window.addEventListener('resize', bindMobileControls);
});