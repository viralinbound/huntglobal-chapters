/* company sites: mobile menu + accessible tabs (site.js handles reveal, videos, counters) */
(() => {
  const b = document.querySelector('.vburger'), m = document.getElementById('vmenu');
  if (b && m) {
    b.addEventListener('click', () => { const o = !m.classList.contains('open'); m.classList.toggle('open', o); b.setAttribute('aria-expanded', String(o)); });
    m.addEventListener('click', e => { if (e.target.closest('a')) { m.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); } });
  }
  document.querySelectorAll('[data-tabs]').forEach(root => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const select = (t, focus) => {
      tabs.forEach(x => {
        const on = x === t;
        x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
      });
    });
  });
})();
