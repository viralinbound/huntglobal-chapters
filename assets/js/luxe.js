/* Hunt Global — luxe layer behaviour.
   - Splits the hero's big statements into words that rise one by one each time a beat comes in.
   - Draws a hairline across the top of every chapter as it enters (once).
   - Replays the first beat after the opening curtain lifts, and removes the curtain afterwards.
   Transforms and classes only; nothing runs per frame. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* words of the hero statements (keeps inner <span> accents) */
  const splitWords = root => {
    let d = 0;
    const walk = n => [...n.childNodes].forEach(c => {
      if (c.nodeType === 1) { walk(c); return; }
      if (c.nodeType !== 3 || !c.textContent.trim()) return;
      const f = document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(p => {
        if (!p) return;
        if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(' ')); return; }
        const w = document.createElement('span'); w.className = 'lw';
        const i = document.createElement('span'); i.className = 'lwi'; i.style.setProperty('--d', d++); i.textContent = p;
        w.appendChild(i); f.appendChild(w);
      });
      c.replaceWith(f);
    });
    walk(root);
  };
  document.querySelectorAll('.jh-big, .sgh-q').forEach(b => { b.querySelectorAll(':scope > span').forEach(s => s.classList.add('ac')); splitWords(b); });

  /* chapter hairlines */
  const secs = [...document.querySelectorAll('main .sec')];
  const rules = secs.map(s => { const i = document.createElement('i'); i.className = 'lux-rule'; i.setAttribute('aria-hidden', 'true'); s.prepend(i); return i; });
  if (RM || !('IntersectionObserver' in window)) rules.forEach(r => r.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.querySelector(':scope > .lux-rule')?.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -18% 0px' });
    secs.forEach(s => io.observe(s));
  }

  /* Why Singapore banner: words rise on arrival, the film drifts slower than the page */
  const sgh = document.querySelector('.sgh');
  if (sgh) {
    const go = () => sgh.classList.add('on');
    if (document.querySelector('.intro:not([hidden])')) setTimeout(go, 2300); else requestAnimationFrame(() => requestAnimationFrame(go));
    const vid = sgh.querySelector('.sgh-media video');
    if (vid && !RM) { let q = false; const par = () => { q = false; const y = Math.min(scrollY, innerHeight * 1.2); vid.style.transform = `translate3d(0,${(y * .22 - innerHeight * .06).toFixed(1)}px,0)`; }; addEventListener('scroll', () => { if (!q) { q = true; requestAnimationFrame(par); } }, { passive: true }); par(); }
  }

  /* company sites: content images open like a curtain as they enter */
  if (document.body.dataset.v && !RM && 'IntersectionObserver' in window) {
    const imgs = [...document.querySelectorAll('main .sec img')].filter(i => !i.closest('.dstack, .panel, .vlogo, .tablist') && i.getBoundingClientRect().width > 140);
    const io2 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
    imgs.forEach(i => { i.classList.add('lux-img'); io2.observe(i); });
  }


  /* depth: cards tilt toward the pointer (mouse only), product frames settle in 3D, photos drift slower than the page */
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!RM) {
    if (FINE) document.querySelectorAll('.tile, .pcard, .card, .icard, .prod, .hood, .mode, .phero-r, .vlink').forEach(el => {
      el.classList.add('lux-tilt'); if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      let raf = 0, ev = null;
      const apply = () => { raf = 0; const r = el.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
        const ax = (.5 - y) * 6, ay = (x - .5) * 7, ang = Math.hypot(ax, ay) || .0001; el.style.setProperty('--ax', (ax / ang).toFixed(3)); el.style.setProperty('--ay', (ay / ang).toFixed(3)); el.style.setProperty('--ang', ang.toFixed(2) + 'deg');
        el.style.setProperty('--gx', (x * 100).toFixed(1) + '%'); el.style.setProperty('--gy', (y * 100).toFixed(1) + '%'); };
      el.addEventListener('pointerenter', () => el.classList.add('lux-on'));
      el.addEventListener('pointermove', e => { ev = e; if (!raf) raf = requestAnimationFrame(apply); });
      el.addEventListener('pointerleave', () => { el.classList.remove('lux-on'); el.style.setProperty('--ang', '0deg'); });
    });
    const rise = [...document.querySelectorAll('.browser, .vhero .media, .lux-mosaic')];
    const par = [...document.querySelectorAll('.tile .hue, .icard .hue, .hood .im')].filter(h => h.querySelector('img'));
    rise.forEach(e => e.classList.add('lux-rise')); par.forEach(e => e.classList.add('lux-par'));
    const live = new Set();
    const io3 = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? live.add(e.target) : live.delete(e.target)), { rootMargin: '120px 0px' });
    [...rise, ...par].forEach(e => io3.observe(e));
    let q = false;
    const tick = () => { q = false; const H = innerHeight;
      live.forEach(el => { const r = el.getBoundingClientRect(), c = (r.top + r.height / 2 - H / 2) / H; // -1 .. 1 across the screen
        if (el.classList.contains('lux-rise')) { const k = Math.max(0, Math.min(1, c)); el.style.setProperty('--rise', (k * 14).toFixed(2) + 'deg'); el.style.setProperty('--lift', (k * 40).toFixed(1) + 'px'); }
        else el.style.setProperty('--py', (c * -26).toFixed(1) + 'px'); }); };
    addEventListener('scroll', () => { if (!q) { q = true; requestAnimationFrame(tick); } }, { passive: true }); tick();
  }

  /* opening curtain: let the first beat play as the curtain lifts */
  const intro = document.querySelector('.intro:not([hidden])');
  if (intro) {
    const b1 = document.querySelector('.jh-beat.b1');
    if (b1 && scrollY < 40) { b1.classList.remove('on'); setTimeout(() => { if (!document.querySelector('.jh-beat.on')) b1.classList.add('on'); }, 2350); }
    setTimeout(() => { intro.remove(); document.documentElement.classList.remove('intro-on'); }, 3400);
  }
})();
