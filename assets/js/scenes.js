/* Hunt Global — Sample 14 "Real". Only REAL material is rendered in 3D:
   - 'sphere': an orbit sphere tiled with the group's own photographs and product screens (motionsites "Orbit Sphere" pattern)
   - 'earth' : NASA Blue Marble day + city-lights night textures, focused on Singapore, arcs to the operating cities
   One shared WebGL canvas draws every visible [data-3d] slot (scissor), so it stays light on phones. */
import * as THREE from 'three';

const slots = [...document.querySelectorAll('[data-3d]')];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOBILE = matchMedia('(max-width: 760px)').matches;
const css = n => getComputedStyle(document.body).getPropertyValue(n).trim();
const ACC = new THREE.Color(css('--acc') || '#5B9BFF');

let renderer = null;
if (slots.length) { try { renderer = new THREE.WebGLRenderer({ antialias: !MOBILE, alpha: true, powerPreference: 'high-performance' }); } catch (e) { renderer = null; } }
if (!renderer) slots.forEach(s => s.classList.add('nogl'));
else boot();

const TAU = Math.PI * 2;
const loader = new THREE.TextureLoader();
const texCache = new Map();
const tex = (url, srgb = true) => {
  if (!texCache.has(url)) { const t = loader.load(url); t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 4; texCache.set(url, t); }
  return texCache.get(url);
};
const fib = (n, r) => { const out = [], g = Math.PI * (3 - Math.sqrt(5)); for (let i = 0; i < n; i++) { const y = 1 - (i / (n - 1)) * 2, rr = Math.sqrt(1 - y * y), t = g * i; out.push(new THREE.Vector3(Math.cos(t) * rr * r, y * r, Math.sin(t) * rr * r)); } return out; };
const ll = (lat, lon, r) => { const p = (90 - lat) * Math.PI / 180, t = (lon + 180) * Math.PI / 180; return new THREE.Vector3(-r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t)); };
const cam = (z, fov = 35) => { const c = new THREE.PerspectiveCamera(fov, 1, .1, 100); c.position.set(0, 0, z); c.lookAt(0, 0, 0); return c; };

/* drag-to-rotate with inertia on the slot itself (canvas ignores pointers) */
function dragger(slot) {
  const d = { vx: 0, vy: 0, rx: 0, ry: 0, down: false, lx: 0, ly: 0, used: false };
  slot.style.touchAction = 'pan-y'; slot.style.cursor = 'grab';
  slot.addEventListener('pointerdown', e => { d.down = true; d.used = true; d.lx = e.clientX; d.ly = e.clientY; slot.style.cursor = 'grabbing'; slot.setPointerCapture(e.pointerId); });
  slot.addEventListener('pointermove', e => { if (!d.down) return; d.vy = (e.clientX - d.lx) * .005; d.vx = (e.clientY - d.ly) * .003; d.lx = e.clientX; d.ly = e.clientY; });
  const up = () => { d.down = false; slot.style.cursor = 'grab'; };
  slot.addEventListener('pointerup', up); slot.addEventListener('pointercancel', up);
  d.step = auto => { d.ry += d.vy + (d.down ? 0 : auto); d.rx = Math.max(-.6, Math.min(.6, d.rx + d.vx)); d.vy *= .94; d.vx *= .9; };
  return d;
}

const SCENES = {
  /* orbit sphere of real photographs */
  sphere(slot) {
    const imgs = (slot.dataset.imgs || '').split(',').map(s => s.trim()).filter(Boolean);
    const s = new THREE.Scene(), c = cam(MOBILE ? 10.4 : 9.8);
    const g = new THREE.Group(); s.add(g);
    const R = 2.6, N = MOBILE ? 56 : 84, pts = fib(N, R);
    const W = .78, H = .56, geo = new THREE.PlaneGeometry(W, H, 6, 4);
    // bend each tile slightly so it sits on the sphere
    const pa = geo.attributes.position; for (let i = 0; i < pa.count; i++) { const x = pa.getX(i), y = pa.getY(i); pa.setZ(i, -(x * x + y * y) / (2 * R)); }
    const mats = imgs.map(u => {
      const t = tex(u);
      const m = new THREE.MeshBasicMaterial({ map: t, side: THREE.FrontSide, transparent: true, opacity: 1 });
      t.onUpdate = null;
      const fit = () => { const a = t.image.width / t.image.height, ta = W / H; t.repeat.set(a > ta ? ta / a : 1, a > ta ? 1 : a / ta); t.offset.set((1 - t.repeat.x) / 2, (1 - t.repeat.y) / 2); };
      if (t.image && t.image.width) fit(); else { const iv = setInterval(() => { if (t.image && t.image.width) { fit(); clearInterval(iv); } }, 120); }
      return m;
    });
    const tiles = pts.map((p, i) => { const m = new THREE.Mesh(geo, mats[i % mats.length]); m.position.copy(p); m.lookAt(p.clone().multiplyScalar(2)); g.add(m); return m; });
    const d = dragger(slot);
    g.rotation.x = .18;
    return { s, c, tick(t, p) {
      d.step(RM ? 0 : .0018);
      g.rotation.y = d.ry + p.x * .15; g.rotation.x = .18 + d.rx + p.y * .08;
      // tiles facing away fade so the front reads clearly
      tiles.forEach(m => { const z = m.getWorldPosition(new THREE.Vector3()).z; m.material.opacity = 1; m.visible = z > -R * .55; });
    } };
  },

  /* NASA Earth, Singapore facing the viewer */
  earth(slot) {
    const night = slot.dataset.mode === 'night';
    const s = new THREE.Scene(), c = cam(MOBILE ? 7.6 : 6.6);
    const g = new THREE.Group(); s.add(g); const R = 1.9;
    const mat = new THREE.ShaderMaterial({
      uniforms: { day: { value: tex('/assets/earth/earth-day-2k.jpg', false) }, nite: { value: tex('/assets/earth/earth-night-2k.jpg', false) }, sun: { value: new THREE.Vector3() }, k: { value: night ? 1.6 : 1.1 } },
      vertexShader: 'varying vec2 vUv; varying vec3 vN; void main(){ vUv=uv; vN=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: 'uniform sampler2D day; uniform sampler2D nite; uniform vec3 sun; uniform float k; varying vec2 vUv; varying vec3 vN; void main(){ float d=dot(normalize(vN),normalize(sun)); float m=smoothstep(-.18,.22,d); vec3 dc=texture2D(day,vUv).rgb; vec3 nc=texture2D(nite,vUv).rgb*k + dc*.035; vec3 col=mix(nc,dc,m); float rim=pow(1.-max(dot(normalize(vN),vec3(0.,0.,1.)),0.),3.); col+=vec3(.25,.45,.9)*rim*.35; gl_FragColor=vec4(col,1.); }'
    });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(R, 72, 48), mat); g.add(earth);
    const atm = new THREE.Mesh(new THREE.SphereGeometry(R * 1.06, 64, 48), new THREE.ShaderMaterial({ side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: 'varying vec3 vN; void main(){ vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: 'varying vec3 vN; void main(){ float i=pow(.72-dot(vN,vec3(0.,0.,1.)),3.); gl_FragColor=vec4(.35,.6,1.,1.)*i; }' }));
    s.add(atm);
    const CITIES = [['Singapore', 1.35, 103.82], ['Sydney', -33.87, 151.21], ['Bangalore', 12.97, 77.59], ['San Francisco', 37.77, -122.42], ['London', 51.51, -.13]];
    const sg = ll(CITIES[0][1], CITIES[0][2], R);
    const arcs = CITIES.map(([, la, lo], i) => {
      const v = ll(la, lo, R * 1.003);
      const mk = new THREE.Mesh(new THREE.SphereGeometry(i ? .028 : .045, 16, 12), new THREE.MeshBasicMaterial({ color: i ? 0xffffff : 0xffd27a })); mk.position.copy(v); g.add(mk);
      const halo = new THREE.Mesh(new THREE.RingGeometry(.06, .075, 32), new THREE.MeshBasicMaterial({ color: i ? 0xffffff : 0xffd27a, transparent: true, side: THREE.DoubleSide })); halo.position.copy(v); halo.lookAt(v.clone().multiplyScalar(2)); g.add(halo);
      if (!i) return { halo };
      const mid = sg.clone().add(v).multiplyScalar(.5); mid.setLength(R + sg.distanceTo(v) * .38);
      const cur = new THREE.QuadraticBezierCurve3(sg, mid, v);
      g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(cur.getPoints(80)), new THREE.LineBasicMaterial({ color: 0xffd27a, transparent: true, opacity: .55 })));
      const dot = new THREE.Mesh(new THREE.SphereGeometry(.022, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); g.add(dot);
      return { cur, dot, halo, o: i * .21 };
    });
    const face = Math.atan2(-sg.x, sg.z);
    const sunDir = night ? new THREE.Vector3(-.75, .2, -1.25) : new THREE.Vector3(.9, .35, 1);
    const SUN_DAY = new THREE.Vector3(.9, .35, 1), SUN_NIGHT = new THREE.Vector3(-.75, .2, -1.25);
    /* journey traveller: no dragging (it floats over the page); it turns to the city each chapter names */
    if (slot.hasAttribute('data-travel')) {
      const focus = new THREE.Mesh(new THREE.RingGeometry(.1, .13, 48), new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, side: THREE.DoubleSide, depthWrite: false })); g.add(focus);
      const fdot = new THREE.Mesh(new THREE.SphereGeometry(.05, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffd27a })); g.add(fdot);
      let ry = face, rx = .1; const sunNow = SUN_DAY.clone(), ft = new THREE.Vector3();
      const wrap = a => Math.atan2(Math.sin(a), Math.cos(a));
      return { s, c, tick(t, p) {
        const lat = +slot.dataset.lat || 1.35, lon = +slot.dataset.lon || 103.82;
        const v = ll(lat, lon, R * 1.004);
        const ty = Math.atan2(-v.x, v.z) + .28, tx = Math.max(-.7, Math.min(.7, lat * Math.PI / 180 * .85));
        const k = RM ? 1 : .045;
        ry += wrap(ty - ry) * k; rx += (tx - rx) * k;
        g.rotation.y = ry + p.x * .08 + (RM ? 0 : Math.sin(t * .2) * .03); g.rotation.x = rx + p.y * .05;
        sunNow.lerp(slot.hasAttribute('data-night') ? SUN_NIGHT : SUN_DAY, k); mat.uniforms.sun.value.copy(sunNow);
        ft.copy(v); fdot.position.lerp(ft, k * 2); focus.position.copy(fdot.position); focus.lookAt(fdot.position.clone().multiplyScalar(2));
        const q = (t * .6) % 1; focus.scale.setScalar(1 + q * 2.2); focus.material.opacity = 1 - q;
        arcs.forEach(a => { if (a.dot) a.dot.position.copy(a.cur.getPoint((t * .3 + a.o) % 1)); const kk = (t * .7 + (a.o || 0)) % 1; a.halo.scale.setScalar(1 + kk * 1.6); a.halo.material.opacity = 1 - kk; });
      } };
    }
    const d = dragger(slot); d.ry = face + .35; g.rotation.x = .12;
    return { s, c, tick(t, p) {
      d.step(RM ? 0 : .0007);
      g.rotation.y = d.ry + p.x * .12; g.rotation.x = .12 + d.rx + p.y * .06;
      mat.uniforms.sun.value.copy(sunDir);
      arcs.forEach(a => { if (a.dot) a.dot.position.copy(a.cur.getPoint((t * .3 + a.o) % 1)); const k = (t * .7 + (a.o || 0)) % 1; a.halo.scale.setScalar(1 + k * 1.6); a.halo.material.opacity = 1 - k; });
    } };
  }
};

function boot() {
  const cv = renderer.domElement; cv.className = 'x3d-canvas'; cv.setAttribute('aria-hidden', 'true'); document.body.appendChild(cv);
  renderer.setScissorTest(true); renderer.setClearColor(0x000000, 0);
  /* Two modes. "single": when one slot is on screen (most of the time) the canvas is only as large as that
     slot (grow-only, 64px buckets) and is moved with a transform, so the browser composites a small layer
     instead of a full-screen one. "full": several slots on screen -> one viewport-sized canvas, scissored. */
  let mode = '', cw = 0, ch = 0;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, MOBILE ? 1 : 1.25));
  const setCanvas = (w, h) => { if (w === cw && h === ch) return; cw = w; ch = h; renderer.setSize(w, h, false); cv.style.width = w + 'px'; cv.style.height = h + 'px'; };
  const toFull = () => { mode = 'full'; cv.style.transform = 'none'; cv.style.clipPath = 'none'; setCanvas(innerWidth, innerHeight); };
  const toSingle = () => { mode = 'single'; cw = ch = 0; };
  addEventListener('resize', () => { if (mode === 'full') toFull(); else toSingle(); });
  const live = new Map(), vis = new Set();
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { vis.add(e.target); if (!live.has(e.target)) { const f = SCENES[e.target.dataset['3d']]; if (f) { live.set(e.target, f(e.target)); e.target.classList.add('gl-on'); } } } else vis.delete(e.target); }), { rootMargin: '250px 0px' });
  slots.forEach(s => io.observe(s));
  const ptr = { x: 0, y: 0 }, tgt = { x: 0, y: 0 };
  addEventListener('pointermove', e => { tgt.x = e.clientX / innerWidth * 2 - 1; tgt.y = e.clientY / innerHeight * 2 - 1; }, { passive: true });
  const stickies = [...document.querySelectorAll('.subnav, .vh')];
  const clock = new THREE.Clock(); let t = 0, fno = 0;
  const rectOf = sl => sl._rect || sl.getBoundingClientRect();
  const frame = () => {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const dt = Math.min(clock.getDelta(), .05); if (!RM) t += dt;
    ptr.x += (tgt.x - ptr.x) * .05; ptr.y += (tgt.y - ptr.y) * .05;
    let top = 0; stickies.forEach(s => { const r = s.getBoundingClientRect(); if (r.top <= 1 && r.bottom > top) top = r.bottom; });
    const H = innerHeight;
    const on = [...vis].filter(sl => { if (!live.get(sl) || sl.style.visibility === 'hidden') return false; const r = rectOf(sl); return !(r.bottom < top || r.top > H || r.width < 2 || r.height < 2); });
    if (!on.length) { if (cv.style.visibility !== 'hidden') cv.style.visibility = 'hidden'; return; }
    if (cv.style.visibility === 'hidden') cv.style.visibility = 'visible';
    if (on.length === 1) {
      if (mode !== 'single') toSingle();
      const slot = on[0], sc = live.get(slot), r = rectOf(slot);
      setCanvas(Math.max(cw, Math.ceil(r.width / 64) * 64), Math.max(ch, Math.ceil(r.height / 64) * 64));
      cv.style.transform = `translate3d(${r.left.toFixed(1)}px,${r.top.toFixed(1)}px,0)`;
      const ct = Math.max(0, top - r.top);
      cv.style.clipPath = ct > 0 ? `inset(${ct.toFixed(1)}px 0 0 0)` : 'none';
      // a resting globe only needs to redraw every other frame (moving the canvas is free)
      if (slot._still && (++fno & 1) && sc.drawn) return;
      sc.drawn = true;
      sc.c.aspect = r.width / r.height;
      if (!sc.z0) sc.z0 = sc.c.position.length();
      sc.c.position.setLength(sc.z0 * (sc.c.aspect < 1 ? 1 / Math.max(sc.c.aspect, .6) : 1));
      sc.c.updateProjectionMatrix();
      sc.tick(t, ptr);
      renderer.setScissor(0, 0, cw, ch); renderer.clear();
      renderer.setViewport(0, ch - r.height, r.width, r.height);
      renderer.setScissor(0, ch - r.height, r.width, r.height);
      renderer.render(sc.s, sc.c);
      return;
    }
    if (mode !== 'full') toFull();
    renderer.setScissor(0, 0, innerWidth, innerHeight); renderer.clear();
    on.forEach(slot => {
      const sc = live.get(slot); if (!sc || slot.style.visibility === 'hidden') return;
      const r = slot.getBoundingClientRect();
      if (r.bottom < top || r.top > H || r.width < 2 || r.height < 2) return;
      const y0 = Math.max(r.top, top), y1 = Math.min(r.bottom, H); if (y1 <= y0) return;
      const x0 = Math.max(r.left, 0), x1 = Math.min(r.right, innerWidth);
      sc.c.aspect = r.width / r.height;
      if (!sc.z0) sc.z0 = sc.c.position.length();
      sc.c.position.setLength(sc.z0 * (sc.c.aspect < 1 ? 1 / Math.max(sc.c.aspect, .6) : 1));
      sc.c.updateProjectionMatrix();
      sc.tick(t, ptr);
      renderer.setViewport(r.left, H - r.bottom, r.width, r.height);
      renderer.setScissor(x0, H - y1, x1 - x0, y1 - y0);
      renderer.render(sc.s, sc.c);
    });
  };
  frame();
}
