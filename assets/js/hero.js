/* The journey begins: a sticky hero driven by scroll (CSS sticky, no JS pinning).
   Beat 1 "The world": the real NASA Earth beside the headline, turning toward Singapore.
   Beat 2 "Singapore": the camera dives toward Singapore, routes to the other cities appear.
   Beat 3 "One house": the Earth dissolves into the client's real Singapore sunrise film.
   Work happens only on scroll; the 3D engine reads slot._p / slot._alpha. */
(() => {
  const H = document.querySelector('.jhero'); if (!H) return;
  const slot = H.querySelector('[data-3d]'), film = H.querySelector('.jh-film');
  const beats = [...H.querySelectorAll('.jh-beat')], stops = [...H.querySelectorAll('.jh-route span')];
  const bar = H.querySelector('.jh-route b'), hint = H.querySelector('.jh-hint');
  const ss = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  let top = 0, len = 1, beat = -1, queued = false, playing = false;
  const measure = () => { top = H.getBoundingClientRect().top + scrollY; len = Math.max(1, H.offsetHeight - innerHeight); update(); };
  const update = () => {
    queued = false;
    const y = scrollY - top, p = Math.max(0, Math.min(1, y / len));
    if (slot) { slot._p = p; slot._alpha = 1 - ss(.66, .84, p); slot.style.opacity = slot._alpha.toFixed(3); }
    if (film) {
      film.style.opacity = ss(.62, .8, p).toFixed(3);
      const want = p > .55 && y < len + innerHeight;
      if (want && !playing) { playing = true; film.preload = 'auto'; const pr = film.play(); pr && pr.catch && pr.catch(() => { playing = false; }); }
      else if (!want && playing) { playing = false; film.pause(); }
    }
    const b = p < .34 ? 0 : p < .66 ? 1 : 2;
    if (b !== beat) {
      beat = b;
      beats.forEach((e, i) => { e.classList.toggle('on', i === b); e.setAttribute('aria-hidden', String(i !== b)); });
      stops.forEach((e, i) => e.classList.toggle('on', i <= b));
    }
    // once the hero is fully scrolled past, drop its two full-screen sticky layers from compositing
    const gone = y > len + innerHeight;
    if (gone !== H._gone) { H._gone = gone; H.classList.toggle('jh-gone', gone); }
    if (bar) bar.style.transform = `scaleX(${p.toFixed(3)})`;
    if (hint) hint.style.opacity = String(1 - ss(0, .06, p));
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', measure); addEventListener('load', measure);
  measure();
})();
