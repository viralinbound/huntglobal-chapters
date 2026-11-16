/* Sample 15 — background stage + chapter rail.
   Every [data-bg] section names a background; a fixed stage crossfades to the one under the middle of the screen.
   [data-chapter] sections also appear in a side rail (names only, no numbering). */
(() => {
  const secs = [...document.querySelectorAll('[data-bg]')];
  if (!secs.length) return;
  const DARK = new Set(['ink', 'navy', 'forest', 'plum', 'e-biltflow', 'e-biltflow-b', 'e-replaice', 'e-replaice-b', 'e-northstar', 'e-northstar-b']);
  const stage = document.createElement('div'); stage.className = 'bgstage'; stage.setAttribute('aria-hidden', 'true');
  const layers = {};
  [...new Set(secs.map(s => s.dataset.bg))].forEach(n => { const d = document.createElement('div'); d.className = 'bg bg-' + n; stage.appendChild(d); layers[n] = d; });
  document.body.prepend(stage);
  document.documentElement.classList.add('staged');

  const chapters = secs.filter(s => s.dataset.chapter);
  let rail = null, dots = [];
  if (chapters.length > 2) {
    rail = document.createElement('nav'); rail.className = 'rail'; rail.setAttribute('aria-label', 'Chapters');
    dots = chapters.map(c => { const b = document.createElement('button'); b.type = 'button'; b.innerHTML = `<span>${c.dataset.chapter}</span><i></i>`; b.addEventListener('click', () => c.scrollIntoView({ behavior: 'smooth', block: 'start' })); rail.appendChild(b); return b; });
    document.body.appendChild(rail);
  }

  let cur = null, curCh = -1, tick = false;
  const update = () => {
    tick = false;
    const mid = innerHeight * .5; let act = null;
    for (const s of secs) { const r = s.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) { act = s; break; } }
    const name = act ? act.dataset.bg : null;
    if (name !== cur) {
      if (cur && layers[cur]) layers[cur].classList.remove('on');
      if (name) layers[name].classList.add('on');
      cur = name; document.documentElement.dataset.tone = name ? (DARK.has(name) ? 'dark' : 'light') : 'hero';
    }
    if (rail) {
      let ci = -1; chapters.forEach((c, i) => { if (c.getBoundingClientRect().top <= mid) ci = i; });
      const last = chapters[chapters.length - 1].getBoundingClientRect();
      rail.classList.toggle('show', ci >= 0 && last.bottom > mid);
      if (ci !== curCh) { dots.forEach((d, i) => d.classList.toggle('on', i === ci)); curCh = ci; }
    }
  };
  const req = () => { if (!tick) { tick = true; requestAnimationFrame(update); } };
  addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); update();
})();
