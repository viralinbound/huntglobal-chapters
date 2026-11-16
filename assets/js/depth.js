/* Sample 14 — CSS 3D with real images: tilting depth stacks of real product screens / photos,
   a cover-flow "shelf" of the five companies, floating stat chips. No libraries. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* depth stacks follow the pointer */
  const stacks = [...document.querySelectorAll('.dstack')];
  if (stacks.length && !RM) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
    const vis = new Set();
    let running = false;
    const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); if (vis.size && !running) { running = true; requestAnimationFrame(loop); } });
    stacks.forEach(s => io.observe(s));
    const loop = t => {
      if (!vis.size) { running = false; return; }
      cx += (mx - cx) * .06; cy += (my - cy) * .06;
      vis.forEach(s => {
        const r = s.getBoundingClientRect(), k = (r.top + r.height / 2) / innerHeight - .5; // scroll position adds a gentle turn
        const ry = (FINE ? cx * 14 : 0) + Math.sin(t / 2600) * 3 - 4, rx = (FINE ? -cy * 10 : 0) + k * 8 + 6;
        s.firstElementChild.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });
      requestAnimationFrame(loop);
    };
  }

  /* cover-flow shelf of companies, steered by the list beside it */
  document.querySelectorAll('.cflow').forEach(flow => {
    const cards = [...flow.querySelectorAll('.cf-card')];
    let cur = 0, timer = null, hold = false;
    const place = () => cards.forEach((c, i) => {
      let o = i - cur; const n = cards.length; if (o > n / 2) o -= n; if (o < -n / 2) o += n;
      const a = Math.abs(o);
      c.style.transform = `translateX(${o * 46}%) translateZ(${-a * 220}px) rotateY(${-o * 32}deg) scale(${a ? .86 : 1})`;
      c.style.zIndex = String(10 - a); c.style.opacity = a > 2 ? '0' : String(1 - a * .22);
      c.classList.toggle('on', !a); c.tabIndex = a ? -1 : 0;
    });
    const go = i => { cur = (i + cards.length) % cards.length; place(); };
    const auto = () => { clearInterval(timer); if (!RM) timer = setInterval(() => { if (!hold) go(cur + 1); }, 3600); };
    cards.forEach((c, i) => c.addEventListener('click', e => { if (i !== cur) { e.preventDefault(); go(i); } }));
    flow.addEventListener('pointerenter', () => { hold = true; }); flow.addEventListener('pointerleave', () => { hold = false; });
    flow.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(cur + 1); if (e.key === 'ArrowLeft') go(cur - 1); });
    const prev = flow.parentElement.querySelector('.cf-prev'), next = flow.parentElement.querySelector('.cf-next');
    prev && prev.addEventListener('click', () => go(cur - 1)); next && next.addEventListener('click', () => go(cur + 1));
    document.querySelectorAll('[data-focus]').forEach(el => {
      el.addEventListener('mouseenter', () => { hold = true; go(+el.dataset.focus); });
      el.addEventListener('focusin', () => go(+el.dataset.focus));
      el.addEventListener('mouseleave', () => { hold = false; });
    });
    // touch swipe
    let sx = null; flow.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    flow.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); sx = null; });
    place(); auto();
  });
})();
