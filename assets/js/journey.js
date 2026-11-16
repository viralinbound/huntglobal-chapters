/* Sample 15 — the journey (in the spirit of blueyard.com / huntglobal-journey):
   ONE real NASA Earth travels down the home page. Every chapter has a .dock placeholder (in a column that holds
   no text); the traveller rests in the dock nearest the middle of the screen, then glides — shrinking slightly —
   to the next one, turning to the city that chapter is about. A caption names the place.
   Performance: dock positions are measured only on load/resize/layout change (never during scroll), the
   traveller is moved with transform only (no width/height writes), and work happens only when scrolling. */
(() => {
  const tr = document.getElementById('traveller'), cap = document.getElementById('travCap');
  const docks = [...document.querySelectorAll('.dock')];
  if (!tr || !docks.length) return;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BASE = 600; // the traveller element is BASE x BASE and scaled to each dock
  tr.style.width = tr.style.height = BASE + 'px';
  const ss = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  let pos = [], mobile = false, lastPlace = '', capTimer = 0, queued = false, capW = 0;

  const measure = () => {
    mobile = innerWidth <= 900;
    pos = docks.map(d => { const r = d.getBoundingClientRect(); return { d, x: r.left + r.width / 2, y: r.top + scrollY + r.height / 2, w: r.width, h: r.height }; }).filter(o => o.w > 4 && o.h > 4);
    queue();
  };
  const update = () => {
    queued = false;
    if (!pos.length) { tr.style.visibility = 'hidden'; tr._rect = null; return; }
    const mid = scrollY + innerHeight * .5;
    let i = 0; pos.forEach((o, n) => { if (o.y <= mid) i = n; });
    const A = pos[i], B = pos[Math.min(i + 1, pos.length - 1)];
    let k = A === B || B.y <= A.y || A.y > mid ? 0 : ss(.3, .7, (mid - A.y) / (B.y - A.y));
    if (RM) k = k < .5 ? 0 : 1;
    const L = (a, b) => a + (b - a) * k, shrink = 1 - .28 * Math.sin(Math.PI * k);
    const w = L(A.w, B.w) * shrink, h = L(A.h, B.h) * shrink, x = L(A.x, B.x), y = L(A.y, B.y) - scrollY;
    tr.style.transform = `translate3d(${(x - w / 2).toFixed(1)}px,${(y - h / 2).toFixed(1)}px,0) scale(${(w / BASE).toFixed(4)},${(h / BASE).toFixed(4)})`;
    // hand the rect to the 3D engine so it never has to read layout
    tr._rect = { left: x - w / 2, top: y - h / 2, width: w, height: h, right: x + w / 2, bottom: y + h / 2 };
    tr._still = k === 0 || k === 1;
    const hide = mobile && k > .04 && k < .96;
    tr.style.visibility = hide ? 'hidden' : 'visible';
    const at = (k < .5 ? A : B).d;
    const [lat, lon] = (at.dataset.city || '1.35,103.82').split(',');
    if (tr.dataset.lat !== lat) tr.dataset.lat = lat;
    if (tr.dataset.lon !== lon) tr.dataset.lon = lon;
    tr.toggleAttribute('data-night', at.hasAttribute('data-night'));
    if (cap) {
      const cx = Math.max(capW / 2 + 12, Math.min(innerWidth - capW / 2 - 12, x)); // keep the label on screen
      cap.style.transform = `translate3d(${cx.toFixed(1)}px,${(y + h / 2 + 8).toFixed(1)}px,0) translateX(-50%)`;
      cap.style.visibility = hide ? 'hidden' : 'visible';
      const place = (at.dataset.place || '') + (at.dataset.km ? ' · ' + at.dataset.km + ' km from Singapore' : '');
      if (place !== lastPlace) { lastPlace = place; cap.classList.remove('on'); clearTimeout(capTimer); capTimer = setTimeout(() => { cap.textContent = place; capW = cap.offsetWidth; cap.classList.toggle('on', !!place); queue(); }, 180); }
      cap.classList.toggle('moving', k > .08 && k < .92);
    }
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', measure);
  addEventListener('load', measure);
  // layout can shift as images and fonts load: re-measure when the page height changes
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
  measure();
})();
