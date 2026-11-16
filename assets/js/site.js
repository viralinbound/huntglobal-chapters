/* Hunt Global — Sample 11 shared behaviour (no dependencies). */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* mobile menu */
  const burger = $('#burger'), menu = $('#mmenu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) burger.click(); });
  }

  /* videos: always muted, retry play every second + on first interaction; off-screen ones pause */
  const vids = $$('video[data-auto]');
  const tryPlay = v => { v.muted = true; const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  const visible = new Set();
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { visible.add(e.target); if (e.target.preload === 'none') e.target.preload = 'auto'; tryPlay(e.target); }
      else { visible.delete(e.target); e.target.pause(); }
    }), { rootMargin: '120px 0px' });
    vids.forEach(v => io.observe(v));
  } else vids.forEach(v => visible.add(v));
  if (!RM) {
    setInterval(() => visible.forEach(v => { if (v.paused) tryPlay(v); }), 1000);
    const kick = () => { visible.forEach(tryPlay); document.removeEventListener('click', kick); document.removeEventListener('touchstart', kick); };
    document.addEventListener('click', kick); document.addEventListener('touchstart', kick, { passive: true });
  } else vids.forEach(v => { v.removeAttribute('autoplay'); v.pause(); });

  /* reveal once, on the way down; anything already above the fold or passed shows immediately */
  const rv = $$('.rv');
  if ('IntersectionObserver' in window && !RM) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  /* counters */
  const counters = $$('[data-count]');
  const run = el => {
    const n = +el.dataset.count, suf = el.dataset.suffix || '';
    const put = v => { el.innerHTML = v + (suf ? `<em>${suf}</em>` : ''); };
    if (RM) return put(n);
    const t0 = performance.now(), d = 1600;
    const step = t => { const k = Math.min(1, (t - t0) / d); put(Math.round(n * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
    setTimeout(() => put(n), d + 200); // final value even if rAF is throttled
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting || e.boundingClientRect.top < 0) { run(e.target); io.unobserve(e.target); } }), { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  } else counters.forEach(run);

  /* clocks */
  const fmt = tz => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date());
  const tick = () => $$('time[data-tz]').forEach(t => { t.textContent = fmt(t.dataset.tz); });
  tick(); setInterval(tick, 20000);

  /* insights filter */
  const filters = $('#insFilters');
  if (filters) filters.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', filters).forEach(x => x.classList.toggle('on', x === b));
    let shown = 0;
    $$('#insList [data-type]').forEach(c => { const ok = b.dataset.ins === 'all' || c.dataset.type === b.dataset.ins; c.hidden = !ok; if (ok) shown++; });
    $('#insList .empty').hidden = shown > 0;
  });

  /* enquiry form -> mailto (no backend) */
  const form = $('#enquiry');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    $$('input[required],textarea[required],select[required]', form).forEach(i => {
      const bad = !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value));
      i.closest('.field').classList.toggle('err', bad); if (bad) ok = false;
    });
    const note = $('#formNote');
    if (!ok) { note.textContent = 'Please complete the highlighted fields.'; return; }
    const d = new FormData(form);
    const body = `Name: ${d.get('name')}\nEmail: ${d.get('email')}\nCompany: ${d.get('company') || '-'}\nPosition: ${d.get('position') || '-'}\nRegion: ${d.get('region') || '-'}\n\n${d.get('message')}`;
    location.href = `mailto:hello@huntglobal.co?subject=${encodeURIComponent(d.get('topic') + ' — ' + d.get('name'))}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Opening your email app…';
  });
  const news = $('#news');
  if (news) news.addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#newsEmail').value.trim();
    if (!/^\S+@\S+\.\S+$/.test(v)) return $('#newsEmail').focus();
    location.href = `mailto:hello@huntglobal.co?subject=${encodeURIComponent('Newsletter subscription')}&body=${encodeURIComponent('Please subscribe: ' + v)}`;
  });
})();
