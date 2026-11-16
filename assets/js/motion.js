/* Sample 14 — motion system (GSAP + ScrollTrigger + Lenis, all optional: the page works without them).
   Rules kept from earlier client feedback: reveals play once on the way DOWN and never hide content when
   scrolling up; nothing is JS-pinned (sticky is CSS only); everything respects prefers-reduced-motion. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- System Core counters (as on huntglobal.co: tick every 2s) ---------- */
  $$('[data-tick]').forEach(el => {
    let v = +el.dataset.tick; const step = +el.dataset.step || 5;
    const put = () => { el.textContent = v.toLocaleString('en-US'); };
    put(); if (!RM) setInterval(() => { v += Math.floor(Math.random() * step); put(); el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }, 2000);
  });

  /* ---------- portfolio sector filter ---------- */
  const pf = document.querySelector('.pf-filter');
  if (pf) pf.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    pf.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    $$('.pcard').forEach(c => { const ok = b.dataset.sector === 'all' || c.dataset.sector === b.dataset.sector; c.hidden = !ok; if (ok && window.gsap && !RM) gsap.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .7, ease: 'expo.out' }); });
    window.ScrollTrigger && ScrollTrigger.refresh();
  });

  /* ---------- scroll progress ---------- */
  const bar = document.createElement('div'); bar.className = 'progress'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
  const prog = () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; };
  addEventListener('scroll', prog, { passive: true }); prog();

  /* ---------- page transitions (internal links) ---------- */
  const veil = document.createElement('div'); veil.className = 'veil'; veil.setAttribute('aria-hidden', 'true'); document.body.appendChild(veil);
  requestAnimationFrame(() => document.documentElement.classList.add('entered'));
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if (!a || RM) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || u.hash && u.pathname === location.pathname || a.hasAttribute('download')) return;
    e.preventDefault(); document.documentElement.classList.add('leaving'); setTimeout(() => { location.href = u.href; }, 420);
  });
  addEventListener('pageshow', e => { if (e.persisted) document.documentElement.classList.remove('leaving'); });

  /* ---------- custom cursor (desktop) ---------- */
  if (FINE && !RM) {
    const cur = document.createElement('div'); cur.className = 'cursor'; cur.innerHTML = '<span></span>'; document.body.appendChild(cur);
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; }, { passive: true });
    const lab = cur.firstChild;
    document.addEventListener('pointerover', e => {
      const t = e.target;
      const drag = t.closest('[data-3d],.cflow'), link = t.closest('a,button,select,input,textarea,label');
      cur.className = 'cursor' + (drag ? ' big' : link ? ' hov' : '');
      lab.textContent = drag ? 'Drag' : '';
    });
    const tick = () => { cx += (x - cx) * .2; cy += (y - cy) * .2; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(tick); };
    tick(); document.documentElement.classList.add('has-cursor');
  }

  if (RM || !window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('gsap');

  /* ---------- smooth scroll ---------- */
  if (false) { // smooth-scroll library removed: native scrolling feels instant and costs nothing
    const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    // keep the 3D drag from scrolling the page
    $$('[data-3d],.cflow').forEach(el => el.setAttribute('data-lenis-prevent', ''));
  }

  /* ---------- split headings into masked words ---------- */
  const split = el => {
    const walk = n => [...n.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const f = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(p => { if (!p) return; if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(' ')); return; } const w = document.createElement('span'); w.className = 'w'; const i = document.createElement('span'); i.className = 'wi'; i.textContent = p; w.appendChild(i); f.appendChild(w); });
        c.replaceWith(f);
      } else if (c.nodeType === 1 && !c.classList.contains('w')) walk(c);
    });
    walk(el); return el.querySelectorAll('.wi');
  };
  const once = (el, fn, start = 'top 88%') => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight * .88 && r.bottom > 0) { fn(); return; }       // already in view: play now
    if (r.bottom <= 0) return;                                            // already passed: leave visible
    ScrollTrigger.create({ trigger: el, start, once: true, onEnter: fn });
  };

  $$('.st, .h1, .h2, .statement, .quote-xl').forEach(h => {
    const words = split(h);
    const r = h.getBoundingClientRect(); if (r.bottom <= 0) return; // passed already — keep visible
    gsap.set(words, { yPercent: 110 });
    once(h, () => gsap.to(words, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: .035 }));
  });

  /* ---------- image reveals + parallax ---------- */
  $$('.hue, .tile .hue, .pc-img, .arch-img, .photo-row img, .tiles .hue').forEach(box => {
    const r = box.getBoundingClientRect(); if (r.bottom <= 0) return;
    gsap.set(box, { clipPath: 'inset(12% 8% 12% 8%)' });
    const img = box.querySelector('img,video');
    img && gsap.set(img, { scale: 1.25 });
    once(box, () => { gsap.to(box, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' }); img && gsap.to(img, { scale: 1.06, duration: 1.8, ease: 'expo.out' }); });
    if (img) gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- staggered groups ---------- */
  [['.plist li', 'x'], ['.regions li', 'y'], ['.badges li', 'y'], ['.stats > div', 'y'], ['.nodes li', 'y'], ['.row', 'x'], ['.values li', 'y'], ['.chips li', 'y'], ['.pcard', 'y'], ['.cards .card', 'y'], ['.tiles .tile', 'y']].forEach(([sel, ax]) => {
    const groups = new Map(); $$(sel).forEach(el => { const p = el.parentElement; if (!groups.has(p)) groups.set(p, []); groups.get(p).push(el); });
    groups.forEach((els, parent) => {
      const r = parent.getBoundingClientRect(); if (r.bottom <= 0) return;
      els.forEach(e => e.classList.add('in'));
      gsap.set(els, { opacity: 0, [ax]: ax === 'x' ? -40 : 40 });
      once(parent, () => gsap.to(els, { opacity: 1, [ax]: 0, duration: 1, ease: 'expo.out', stagger: .08 }));
    });
  });

  /* ---------- hero: film zooms back, content drifts, as you leave ---------- */
  const hero = document.querySelector('.hero');
  if (hero) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    tl.to('.hero-body', { yPercent: -18, opacity: .2, ease: 'none' }, 0).to('.hero-stats', { yPercent: -40, ease: 'none' }, 0);
    gsap.from('.hero-stats > div', { opacity: 0, y: 30, duration: 1.2, ease: 'expo.out', stagger: .1, delay: .5 });
  }
  $$('.phero-r').forEach(r => gsap.fromTo(r, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1.5, ease: 'expo.inOut', delay: .1 }));

  /* ---------- company-name marquee speeds up with scroll ---------- */
  const tr = document.querySelector('.names-tr');
  if (tr) {
    let x = 0, v = 0; const w = () => tr.scrollWidth / 4;
    ScrollTrigger.create({ onUpdate: s => { v = s.getVelocity() / 300; } });
    gsap.ticker.add(() => { x -= .6 + Math.abs(v); v *= .92; if (-x > w()) x += w(); tr.style.transform = `translateX(${x}px) skewX(${Math.max(-12, Math.min(12, -v * 2))}deg)`; });
  }

  /* ---------- magnetic buttons ---------- */
  if (FINE) $$('.cbtn, .btn, .nav-cta, .vlink i, .r-go').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .35, duration: .4, ease: 'power3.out' }); });
    b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.4)' }));
  });

  /* ---------- section labels draw their line ---------- */
  $$('.kick, .lbl').forEach(k => once(k, () => k.classList.add('drawn')));

  addEventListener('load', () => ScrollTrigger.refresh());
})();
