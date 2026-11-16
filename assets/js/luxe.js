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
  document.querySelectorAll('.jh-big').forEach(b => { b.querySelectorAll(':scope > span').forEach(s => s.classList.add('ac')); splitWords(b); });

  /* chapter hairlines */
  const secs = [...document.querySelectorAll('main .sec[data-bg]')];
  const rules = secs.map(s => { const i = document.createElement('i'); i.className = 'lux-rule'; i.setAttribute('aria-hidden', 'true'); s.prepend(i); return i; });
  if (RM || !('IntersectionObserver' in window)) rules.forEach(r => r.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.querySelector(':scope > .lux-rule')?.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -18% 0px' });
    secs.forEach(s => io.observe(s));
  }

  /* opening curtain: let the first beat play as the curtain lifts */
  const intro = document.querySelector('.intro:not([hidden])');
  if (intro) {
    const b1 = document.querySelector('.jh-beat.b1');
    if (b1 && scrollY < 40) { b1.classList.remove('on'); setTimeout(() => { if (!document.querySelector('.jh-beat.on')) b1.classList.add('on'); }, 2350); }
    setTimeout(() => { intro.remove(); document.documentElement.classList.remove('intro-on'); }, 3400);
  }
})();
