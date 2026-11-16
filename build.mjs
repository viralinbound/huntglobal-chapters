// Hunt Global — Sample 15 "Chapters": the journey idea (every chapter has its own background, a chapter rail)
// on the real-data site. All copy is huntglobal.co's own (verified line by line against the live site, 2026-11-16).
// Hunt Global — Sample 14 "Real": every visual is real material (photos, product screens, the client film, NASA Earth)
// arranged with motionsites.ai patterns (orbit sphere, arch frame, cover-flow shelf, depth stacks).
// Hunt Global — Sample 13 "3D" (Sample 12 + a content-matched 3D scene in every section; engine: assets/js/scenes.js)
// Hunt Global — Sample 12 "Group": the Hunt Global hub in huntglobal.co's own brand look (black/white,
// Hanken Grotesk, blue accent), mirroring the live sitemap, plus a redesigned website for every portfolio
// company that has one (written by ventures.mjs into /ventures/<id>/). All copy comes from the live sites
// (crawled 2026-11-16). Run:  node build.mjs   — never hand-edit the generated html.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const V = 30; // cache-bust for css/js

/* ======================= MEDIA ======================= */
const HERO_VID = '/assets/vid/hero-sunrise.mp4';
const I = n => `/assets/img/${n}.jpg`;
const VID = n => `/assets/vid/${n}.mp4`;

/* ======================= DATA (huntglobal.co) ======================= */
const COMPANIES = [
  { slug: 'biltflow', name: 'Biltflow', cat: 'Construction Intelligence', loc: 'Global Operations', site: 'https://biltflow.com/', img: I('pr-construction'), vid: null,
    story: 'One intelligent agentic workflow.', head: 'The AI operating system for construction.',
    desc: 'The AI operating system for construction — BiltFlow OS™ connects every team, document, estimate, and supplier into one intelligent agentic workflow, from site discovery to project closeout.',
    body: ['BiltFlow OS™ is designed to unify the fragmented construction industry. By connecting every team, document, estimate, and supplier into a single intelligent agentic workflow, we bring unprecedented transparency and control to complex projects.', 'Operating globally, Biltflow provides commercial intelligence, data modeling, and operational oversight, orchestrating everything from site discovery to project closeout.'],
    chips: ['BiltFlow OS™', 'Agentic workflow', 'Commercial intelligence', 'Data modeling', 'Operational oversight'] },
  { slug: 'replaice-technologies', name: 'Replaice Technologies', short: 'Replaice', cat: 'Technology and Engineering', loc: 'Bangalore', site: 'https://replaice.ai/', img: I('aerial-bangalore'), vid: VID('bangalore'),
    story: 'Enterprise-grade autonomous systems.', head: 'Autonomous AI agents for enterprise growth.',
    desc: 'Autonomous AI Agents for enterprise growth — agentic CRM/ERP/HRMS/DMS systems, enterprise RAG (eRAG), AI Agent Workspace, LLM gateway.',
    body: ['Replaice Technologies delivers enterprise-grade autonomous systems. Our suite includes agentic CRM, ERP, HRMS, and DMS solutions powered by enterprise RAG (eRAG) infrastructure.', 'Headquartered operationally in Bangalore with governance from Singapore, Replaice provides the AI Agent Workspace and LLM gateways that secure and scale institutional AI deployment, fully compliant with international and MAS Technology Risk Management frameworks.'],
    chips: ['Agentic CRM', 'ERP', 'HRMS', 'DMS', 'eRAG', 'AI Agent Workspace', 'LLM gateway'] },
  { slug: 'huntjobs', name: 'HuntJobs', cat: 'AI · Talent Marketplace', loc: 'Global Operations', site: 'https://huntjobs.ai/', img: I('global-cities'), vid: null,
    story: 'Your next opportunity, delivered in a heartbeat.', head: 'AI-powered talent matching at scale.',
    desc: 'Your next opportunity, delivered in a heartbeat. An AI-powered jobs marketplace matching professionals with employers globally. Mobile apps available on the App Store and Google Play; used by candidates hired at major global companies.',
    body: ['HuntJobs is a sophisticated talent marketplace leveraging AI to match top-tier professionals with employers globally. Delivering candidates in a heartbeat, the platform significantly reduces time-to-hire while improving retention outcomes.', 'Available on the App Store and Google Play, HuntJobs is utilized by major global companies and is a cornerstone of our human capital infrastructure.'],
    chips: ['AI matching', 'App Store', 'Google Play', 'Global employers'] },
  { slug: 'northstar', name: 'Northstar', full: 'Northstar Humanoids and Robotics', cat: 'Humanoids · Robotics', loc: 'Singapore · Bangalore · San Francisco', locDetail: 'San Francisco', site: null, img: '/assets/co/biltflow/class-industrial-1200.webp', vid: null,
    story: 'Robust hardware. Proprietary AI.', head: 'Humanoids for industry.',
    desc: 'Humanoids for industry. Northstar builds humanoid robotics and operational intelligence for industrial environments, operating from Singapore, Bangalore and San Francisco — orchestrated and governed from Singapore.',
    body: ['Northstar builds humanoid robotics and advanced operational intelligence specifically designed for industrial environments. We combine robust hardware engineering with proprietary AI models to automate physical tasks safely and efficiently.', 'Operating from San Francisco and Bangalore, with strict governance and orchestration from Singapore, Northstar represents the convergence of deep-tech talent and institutional capital.'],
    chips: ['Humanoid robotics', 'Operational intelligence', 'Proprietary AI models', 'Industrial environments'] },
  { slug: 'tribe', name: 'Tribe', cat: 'Property and Lifestyle Technology', loc: 'Global Operations', site: 'https://tribeapp.com.au/', img: I('aerial-sydney'), vid: VID('sydney'),
    story: 'The entire rental journey, one connected platform.', head: 'The intelligent operating system for rental living.',
    desc: 'The AI-powered operating and lifestyle platform for modern rental communities - connecting leasing, residents, property teams and neighbourhood services through one intelligent experience.',
    body: ['Tribe brings the entire rental journey into one connected platform - from property discovery and applications to leasing, payments, maintenance, amenities and everyday resident services.', 'Built around an AI-first operating model, Tribe connects residents, property teams and neighbourhood partners through intelligent workflows and a unified digital experience.', 'Residents can manage their home, access building services, book amenities, raise maintenance requests and discover nearby services from one place, while property teams gain greater automation, visibility and operational control.', 'With integrated AI assistants working across leasing, resident support and property operations, Tribe enables communities to operate more efficiently while delivering a more personalised living experience.'],
    chips: ['Leasing', 'Payments', 'Maintenance', 'Amenities', 'Resident services', 'AI assistants'] }
];
const co = s => COMPANIES.find(c => c.slug === s);
const VENTURES = { 'biltflow': 'biltflow', 'replaice-technologies': 'replaice', 'huntjobs': 'huntjobs', 'tribe': 'tribe' };
const nm = c => c.short || c.name;
const PRACTICES = [ // descriptions exactly as on huntglobal.co/practice
  { slug: 'investment', t: 'Investment', lead: 'Permanent Capital.', img: I('sg-arch'), p: 'We deploy our own patient capital with complete alignment and active ownership.' },
  { slug: 'venture-building', t: 'Venture Building', lead: 'Operational Depth.', img: I('pr-venture'), p: 'Our 120+ team works inside every venture — we build from within, not advise from sidelines.' },
  { slug: 'technology-engineering', t: 'Technology & Engineering', lead: 'IP at the Core.', img: I('pr-tech'), p: 'Proprietary, patent-protected technology designed to compound and define industries.' },
  { slug: 'construction-intelligence', t: 'Construction Intelligence', lead: '', img: I('pr-construction'), p: 'Advanced construction systems, commercial intelligence, data modeling, and operational control globally.' }
];
const PRACTICE_BODY = ['Our practice areas represent the convergence of capital, technology, and operating capability. We invest our own capital (Permanent Capital) and deploy our 120+ team worldwide (Operational Depth) to ensure the success of our ventures.', 'With IP at the core of our strategy, we build proprietary systems designed to compound, scaling these innovations globally from our Singapore headquarters.'];
// huntglobal.co/about/approach words the four principles differently from /about
const APPROACH = [
  ['Permanent Capital', 'We invest our own capital, ensuring complete alignment with the long-term success of our portfolio.'],
  ['Operational Depth', 'Our 120+ team works inside every venture. We build from within, we do not advise from the sidelines.'],
  ['IP at the Core', 'We develop proprietary, patent-protected technology designed to compound value over time.'],
  ['Global by Design', 'Orchestrated from our Singapore headquarters, we scale our ventures across five global cities from Asia-Pacific to the Americas.']
];
// the five operating cities and their roles (huntglobal.co data)
const NODES = [
  ['Singapore', 'APAC', 'Group HQ — capital strategy, IP management, enterprise commercial ops.', 'Asia/Singapore'],
  ['Sydney', 'APAC', 'APAC enterprise partnerships and commercial operations.', 'Australia/Sydney'],
  ['Bangalore', 'APAC', 'Engineering & innovation centre; Replaice home.', 'Asia/Kolkata'],
  ['London', 'UK/Europe', 'UK/Europe enterprise partnerships.', 'Europe/London'],
  ['San Francisco', 'North America', 'Deep-tech talent, North America expansion.', 'America/Los_Angeles']
];
const PRINCIPLES = [
  ['Permanent Capital', "We invest our own capital, ensuring complete alignment with our ventures. We don't dabble. We dominate."],
  ['Operational Depth', 'Our 120+ team works inside every venture. We build from within, we do not advise from the sidelines — forming companies, developing commercial models and scaling operating infrastructure.'],
  ['IP at the Core', 'With 39+ patents filed across our portfolio, we develop proprietary, patent-protected technology designed to compound into long-term structural advantage.'],
  ['Global by Design', 'We grow our core regions through autonomous products and partner with enterprises building their own AI — consistently governed from our Singapore headquarters.']
];
const REGIONS = [
  ['APAC', 'Group HQ in Singapore, scaling autonomous intelligence across South East Asia, India and Australia.'],
  ['MENA', 'Enterprise AI deployments and strategic partnerships across the Gulf region.'],
  ['UK/Europe', 'Capital integration and enterprise operating infrastructure for European markets.'],
  ['North America', 'Deep-tech integration and scaling autonomous products across the Americas.']
];
const CITIES = [
  { n: 'Singapore', s: 'Group HQ', tz: 'Asia/Singapore', img: I('aerial-singapore'), vid: VID('singapore'), hq: true },
  { n: 'Sydney', s: 'Australia', tz: 'Australia/Sydney', img: I('aerial-sydney'), vid: VID('sydney') },
  { n: 'Bangalore', s: 'India', tz: 'Asia/Kolkata', img: I('aerial-bangalore'), vid: VID('bangalore') },
  { n: 'San Francisco', s: 'USA', tz: 'America/Los_Angeles', img: I('aerial-sf'), vid: VID('san-francisco') },
  { n: 'London', s: 'UK', tz: 'Europe/London' }
];
const BADGES = ['SOC 2 Type II', 'ISO/IEC 27001', 'ISO/IEC 42001 (AI)', 'GDPR', 'Singapore PDPA', 'MAS TRM Aligned', 'ACRA Registered'];
const VALUES = ['Conviction', 'Discipline', 'Ownership', 'Execution', 'Partnership', 'Long-term thinking'];
const POST = { slug: 'institutional-ai', t: 'Enterprise AI and Institutional Governance', d: 'How rigorous MAS and ACRA frameworks accelerate our global AI deployment.', year: '2024',
  body: ['Enterprise AI does not fail on capability. It fails on trust. Boards, regulators, and enterprise counterparties do not ask whether a system is intelligent — they ask whether it is governed. This is where Singapore gives Hunt Global a structural advantage.', 'Operating within the MAS technology risk framework and as an ACRA-registered institution, every platform we build is designed for institutional scrutiny from day one: auditable decision trails, controlled model deployment, and data governance aligned with PDPA and GDPR. Governance is not a constraint on our velocity — it is the reason enterprises deploy our systems at all.', 'As autonomous systems move from pilots to production across construction, talent, and robotics, the companies that win will be those whose intelligence is matched by their accountability. We build both, from Singapore, for the world.'] };

const NAV = [['/about/', 'About'], ['/portfolio/', 'Portfolio'], ['/practice/', 'Practice'], ['/regions/', 'Global Presence'], ['/insights/', 'Insights'], ['/careers/', 'Careers']];
const GROUPS = [
  [['/about/', 'Overview'], ['/about/vision-values/', 'Vision & Values'], ['/about/approach/', 'Approach'], ['/about/why-singapore/', 'Why Singapore'], ['/about/recognition/', 'Recognition']],
  [['/portfolio/', 'All companies'], ...COMPANIES.map(c => [`/portfolio/${c.slug}/`, nm(c)])],
  [['/practice/', 'Overview'], ...PRACTICES.map(p => [`/practice/${p.slug}/`, p.t])],
  [['/regions/', 'Global Presence'], ['/insights/', 'Insights'], ['/careers/', 'Careers'], ['/contact/', 'Contact']],
  [['/privacy/', 'Privacy Policy'], ['/terms/', 'Terms & Conditions']]
];

/* ======================= PARTIALS ======================= */
const amp = s => String(s).replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const attr = s => amp(s).replace(/"/g, '&quot;');

// staircase heading: "a|b|c" = explicit lines; otherwise words are packed into short lines.
// second half of the lines steps in, last line in accent cyan.
const stair = (text, { tag = 'h2', size = 'l', from, s2 = false, cls = '', max = 22, keep = false } = {}) => {
  let lines;
  if (keep) lines = text.split('|').map(s => s.trim());
  else { text = text.replace(/\s*\|\s*/g, ' ');
    lines = []; let cur = '';
    for (const w of text.split(/\s+/)) {
      const len = w.replace(/&[a-z]+;/g, '&').length;
      if (cur && (cur.replace(/&[a-z]+;/g, '&').length + 1 + len > max)) { lines.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w;
    }
    if (cur) lines.push(cur);
  }
  const n = lines.length, start = from ?? (n <= 1 ? 99 : Math.ceil(n / 2));
  return `<${tag} class="st st-${size}${s2 ? ' s2' : ''} rv${cls ? ' ' + cls : ''}">${lines.map((l, i) =>
    `<span class="l${i >= start ? ' in' : ''}${i === n - 1 && n > 1 ? ' ac' : ''}" style="--i:${i}">${amp(l)}</span>`).join('')}</${tag}>`;
};
const REAL = {
  hub: ['aerial-singapore', 'sg-night', 'aerial-sydney', 'pr-construction', 'aerial-bangalore', 'sg-arch', 'aerial-sf', 'pr-tech', 'global-cities', 'pr-venture', 'contact'].map(I)
    .concat(['biltflow/class-highdensity-v2-1200.webp', 'tribe/party-1200.webp', 'biltflow/plate-development.webp', 'biltflow/class-datacentres-1200.webp', 'tribe/supper-1200.webp', 'replaice/biltflow-vault.webp', 'biltflow/class-hospitality-v5-1200.webp', 'huntjobs/hero-mobile.webp', 'biltflow/class-commercial-1200.webp', 'tribe/bbq-1200.webp', 'biltflow/plate-commercial.webp', 'biltflow/class-healthcare-1200.webp', 'tribe/movie-1200.webp', 'biltflow/class-education-1200.webp'].map(x => '/assets/co/' + x)),
  card: { biltflow: '/assets/co/biltflow/plate-development.webp', 'replaice-technologies': '/assets/co/replaice/biltflow-vault.webp', huntjobs: '/assets/co/huntjobs/hero-mobile.webp', northstar: '/assets/co/biltflow/class-industrial-1200.webp', tribe: '/assets/co/tribe/party-1200.webp' },
  stack: { biltflow: ['biltflow/plate-development.webp', 'biltflow/plate-commercial.webp', 'biltflow/plate-construction.webp'], 'replaice-technologies': ['replaice/biltflow-vault.webp', 'replaice/biltflow-feasibility.webp', 'replaice/biltflow-pulse.webp'], huntjobs: ['huntjobs/hero-mobile.webp'], tribe: ['tribe/party-1200.webp', 'tribe/bbq-1200.webp', 'tribe/supper-1200.webp'] }
};
// depth stack: real images layered in perspective, tilting with the pointer
const POS = [[['8%', '10%', '84%', '0px']], [['4%', '6%', '70%', '0px'], ['30%', '40%', '66%', '90px']], [['2%', '4%', '64%', '-40px'], ['30%', '22%', '62%', '50px'], ['14%', '52%', '60%', '140px']]];
const dstack = (srcs, { cls = '', alt = '' } = {}) => `<div class="dstack${cls ? ' ' + cls : ''}" role="img" aria-label="${attr(alt)}"><div class="ds-in">${srcs.map((u, i) => { const [x, y, w, z] = POS[srcs.length - 1][i]; return `<img class="ds-l" src="${u}" alt="" loading="lazy" style="--x:${x};--y:${y};--w:${w};--z:${z}">`; }).join('')}</div></div>`;
const x3d = (scene, { k = '', cls = '', tone = 'dark', label = '', imgs = null, mode = '' } = {}) => `<div class="x3d${cls ? ' ' + cls : ''}" data-3d="${scene}"${k ? ` data-k="${k}"` : ''} data-tone="${tone}"${imgs ? ` data-imgs="${imgs.join(',')}"` : ''}${mode ? ` data-mode="${mode}"` : ''} role="img" aria-label="${attr(label || '3D illustration')}"></div>`;
const INTRO = `<div class="intro" hidden aria-hidden="true"><div><span class="in-clip"><span class="in-w">${[...'HUNT GLOBAL'].map((c, i) => `<span style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</span></span><i class="in-line"></i><p class="in-sub">A Singapore institution. Built for the world.</p></div></div>
<script>try{if(!sessionStorage.getItem('hg-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.currentScript.previousElementSibling.hidden=false;sessionStorage.setItem('hg-intro','1');document.documentElement.classList.add('intro-on')}}catch(e){}</script>`;
const kick = t => `<p class="kick rv">${amp(t)}</p>`;
const media = (m, { cls = '', alt = '', lazy = true } = {}) => `<div class="hue${cls ? ' ' + cls : ''}">${m.vid
  ? `<video muted playsinline loop autoplay preload="${lazy ? 'none' : 'auto'}" poster="${m.img}" data-auto><source src="${m.vid}" type="video/mp4"></video>`
  : `<img src="${m.img}" alt="${attr(alt)}"${lazy ? ' loading="lazy"' : ''}>`}</div>`;
const paras = l => l.map(p => `<p>${amp(p)}</p>`).join('');
const btn = (href, label, { dark = false, ext = false, sm = false } = {}) => `<a class="cbtn${dark ? ' dark' : ''}${ext ? ' ext' : ''}${sm ? ' sm' : ''}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${amp(label)}</a>`;
const tlink = (href, label) => `<a class="tlink" href="${href}">${amp(label)}</a>`;
const stats = (dark = false) => `<div class="stats rv">
      <div><b data-count="5">0</b><span>Portfolio companies</span></div>
      <div><b data-count="120" data-suffix="+">0</b><span>Team worldwide</span></div>
      <div><b data-count="4">0</b><span>Operating regions</span></div>
      <div><b data-count="39" data-suffix="+">0</b><span>Patents filed</span></div>
    </div>`;
// each company shows its name once (text, no logo beside it)
const rows = (list, compact = false) => `<ul class="rows${compact ? ' compact' : ''}">${list.map(c => `<li class="row rv" data-focus="${COMPANIES.indexOf(c)}"><a href="/portfolio/${c.slug}/">
      ${media(c)}
      <div><span class="r-cat">${amp(c.cat)}</span><h3>${amp(nm(c))}</h3></div>
      <p>${amp(c.head)}</p>
      <span class="r-go" aria-hidden="true">&rarr;</span></a></li>`).join('\n')}</ul>`;
const nodes = (list = NODES) => `<ul class="nodes">${list.map(([n, r, d, tz]) => `<li class="rv"><span class="nd-r">${amp(r)}</span><b>${n}</b><p>${amp(d)}</p><time data-tz="${tz}">--:--</time></li>`).join('')}</ul>`;
const plist = (L = PRINCIPLES) => `<ol class="plist">${L.map(([t, p]) => `<li class="rv"><h3>${t}</h3><p>${amp(p)}</p></li>`).join('')}</ol>`;
const regions = () => `<ul class="regions">${REGIONS.map(([t, p]) => `<li class="rv"><h3>${amp(t)}</h3><p>${p}</p></li>`).join('')}</ul>`;
const cityTiles = () => `<ul class="cities">${CITIES.filter(c => c.img).map(c => `<li class="city rv${c.hq ? ' hq' : ''}">${media(c, { alt: c.n })}<div class="city-m"><div><b>${c.n}</b><br><span>${c.s}</span></div><time data-tz="${c.tz}">--:--</time></div></li>`).join('')}</ul>`;
const cityText = () => `<ul class="ctext">${CITIES.map(c => `<li class="rv"><b>${c.n}</b><span>${c.s}</span><span><time data-tz="${c.tz}">--:--</time></span></li>`).join('')}</ul>`;
const badges = (l = BADGES) => `<ul class="badges rv">${l.map(b => `<li>${b}</li>`).join('')}</ul>`;
const chips = l => `<ul class="chips rv">${l.map(x => `<li>${amp(x)}</li>`).join('')}</ul>`;
const llist = l => `<ul class="llist">${l.map(([h, t, d]) => `<li class="rv"><a href="${h}"><b>${amp(t)}</b><span>${amp(d)}</span><i aria-hidden="true">&rarr;</i></a></li>`).join('')}</ul>`;
const next = (href, label, k = 'Next') => `<a class="next rv" href="${href}"><span>${amp(k)}</span><b>${amp(label)} <em>&rarr;</em></b></a>`;
const crumb = l => `<p class="crumb rv"><a href="/">Hunt Global</a>${l.map(([t, h]) => `<i></i>${h ? `<a href="${h}">${amp(t)}</a>` : `<b>${amp(t)}</b>`}`).join('')}</p>`;
const LIGHTS = ['sand', 'sky', 'lav', 'gold', 'sage', 'blush', 'mist', 'paper', 'lav2'], DARKS = ['ink', 'navy', 'forest', 'plum'];
let LI = 0, DI = 0, PG = 0;
const nextBg = dark => dark ? DARKS[DI++ % DARKS.length] : LIGHTS[LI++ % LIGHTS.length];
const sec = (inner, cls = '') => `<section class="sec${cls ? ' ' + cls : ''}" data-bg="${nextBg(/\bdark\b/.test(cls))}">\n${inner}\n</section>`;
const chap = (bg, name, inner, cls = '') => `<section class="sec${cls ? ' ' + cls : ''}" data-bg="${bg}" data-chapter="${attr(name)}">\n${inner}\n</section>`;
// real photo that sets the environment of a page (the project's own world)
const ENV = { biltflow: '/assets/co/biltflow/class-highdensity-v2-1200.webp', 'replaice-technologies': '/assets/img/aerial-bangalore.jpg', huntjobs: '/assets/img/global-cities.jpg', northstar: '/assets/img/aerial-sf.jpg', tribe: '/assets/co/tribe/merrylands-2-1200.webp', '/regions/': '/assets/img/aerial-singapore.jpg', '/about/why-singapore/': '/assets/img/sg-night.jpg', '/about/': '/assets/img/sg-arch.jpg', '/careers/': '/assets/img/pr-venture.jpg', '/portfolio/': '/assets/img/global-cities.jpg', '/practice/': '/assets/img/pr-tech.jpg' };
const EK = { biltflow: 'biltflow', 'replaice-technologies': 'replaice', huntjobs: 'huntjobs', northstar: 'northstar', tribe: 'tribe' };
const EDARK = new Set(['biltflow', 'replaice', 'northstar']);
const SITE = { biltflow: ['biltflow.com', 'https://biltflow.com/'], 'replaice-technologies': ['replaice.ai', 'https://replaice.ai/'], huntjobs: ['huntjobs.ai', 'https://huntjobs.ai/'], tribe: ['tribeapp.com.au', 'https://tribeapp.com.au/'] };
const envCls = slug => (EDARK.has(EK[slug]) ? 'dark ' : '') + 'env env-' + EK[slug];
// the company's real website in a browser frame, with one real product image popping out
const browser = c => SITE[c.slug] ? `<figure class="browser"><a href="${SITE[c.slug][1]}" target="_blank" rel="noopener" aria-label="Open ${SITE[c.slug][0]}"><span class="br-bar"><i></i><i></i><i></i><b>${SITE[c.slug][0]}</b></span><img src="/assets/co/${EK[c.slug]}/site.jpg" alt="The live ${amp(nm(c))} website" loading="lazy"></a>${REAL.stack[c.slug] && REAL.stack[c.slug].length > 1 ? `<img class="br-pop" src="/assets/co/${REAL.stack[c.slug][REAL.stack[c.slug].length === 1 ? 0 : 1]}" alt="" loading="lazy">` : ''}</figure>` : media(c, { cls: 'cut', alt: 'San Francisco' });
const C = { sg: '1.35,103.82', syd: '-33.87,151.21', blr: '12.97,77.59', ind: '21,78', sf: '37.77,-122.42' };
const DOCKCITY = { biltflow: [C.sg, 'Biltflow · Global operations'], 'replaice-technologies': [C.blr, 'Replaice · Bangalore'], huntjobs: [C.ind, 'HuntJobs · jobs across India'], northstar: [C.sf, 'Northstar · San Francisco'], tribe: [C.syd, 'Tribe · Sydney'] };
const dock = (cls, city, place, night = false) => `<div class="dock ${cls}" data-city="${city}"${night ? ' data-night' : ''} aria-hidden="true"></div>`;

const MARK = `<svg viewBox="0 0 520 490" aria-hidden="true"><g transform="translate(0,490) scale(0.1,-0.1)"><path d="M2175 4409 c-16 -12 -115 -74 -220 -138 l-190 -118 -3 -1032 -2 -1031 -238 -1 c-130 -1 -304 -3 -387 -5 -82 -1 -162 0 -177 3 l-28 5 0 759 c0 418 -2 759 -4 759 -2 0 -62 -37 -133 -82 -71 -46 -165 -105 -211 -133 l-82 -50 0 -1321 0 -1321 217 -134 c119 -74 221 -135 225 -137 4 -2 9 302 10 675 l3 678 403 3 402 2 0 -347 c0 -192 3 -594 7 -895 l6 -548 217 0 217 0 6 422 c10 581 9 4008 0 4007 -5 0 -21 -9 -38 -20z"/><path d="M2612 2081 c1 -5 75 -72 162 -150 l159 -141 261 -2 c144 -1 329 -3 411 -3 83 -1 151 -4 153 -8 1 -4 2 -157 2 -339 l-1 -333 -237 -139 c-493 -290 -1207 -720 -1214 -730 -4 -6 -8 -62 -8 -123 l0 -113 264 0 264 0 358 218 c198 120 445 271 549 336 105 65 237 148 295 183 58 35 108 67 112 71 4 4 8 293 9 642 l2 635 -772 3 c-446 1 -771 -2 -769 -7z"/><path fill="#15BCDF" d="M2584 4256 c-55 -37 -64 -55 -64 -127 0 -53 21 -85 75 -119 30 -18 44 -21 88 -15 28 4 63 13 77 20 30 16 61 51 53 59 -30 30 243 -39 392 -99 702 -281 1214 -882 1374 -1610 58 -264 67 -638 22 -890 -104 -583 -417 -1089 -897 -1452 -16 -12 -24 -22 -18 -22 18 -1 154 106 261 205 382 354 627 834 699 1364 30 224 14 559 -37 800 -122 567 -497 1106 -1004 1444 -184 122 -411 226 -627 286 -134 37 -167 48 -152 49 14 1 2 64 -16 86 -15 19 -113 55 -148 55 -15 0 -50 -15 -78 -34z"/></g></svg>`;
const MAIL = `<svg viewBox="0 0 17 13" aria-hidden="true"><rect x=".7" y=".7" width="15.6" height="11.6"/><path d="M.7 .9 8.5 7.2 16.3 .9"/></svg>`;

const nav = path => `<header class="nav" id="nav">
  <a class="logo" href="/" aria-label="Hunt Global — home"><span class="logo-m">${MARK}</span><span class="logo-w">hunt global</span></a>
  <ul class="nav-links">
${NAV.map(([h, l]) => `    <li><a href="${h}"${path.startsWith(h) ? ' aria-current="page"' : ''}>${amp(l)}</a></li>`).join('\n')}
  </ul>
  <a class="nav-cta" href="/contact/">${MAIL}Contact us</a>
  <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mmenu"><i></i><i></i><i></i></button>
  <ul class="mmenu" id="mmenu">
    <li><a href="/">Home</a></li>
${NAV.map(([h, l]) => `    <li><a href="${h}">${amp(l)}</a></li>`).join('\n')}
    <li><a href="/contact/">Contact us</a></li>
    <li><a class="mail" href="mailto:hello@huntglobal.co">hello@huntglobal.co</a></li>
  </ul>
</header>`;

const subnav = path => {
  const g = GROUPS.find(l => l.some(([h]) => h === path));
  if (!g) return '';
  const parent = path === g[0][0] ? '/' : g[0][0];
  return `<nav class="subnav" aria-label="In this section"><a class="back" href="${parent}">Back</a>${g.map(([h, l]) => `<a href="${h}"${h === path ? ' class="on" aria-current="page"' : ''}>${amp(l)}</a>`).join('')}</nav>`;
};

const footer = () => `<footer class="foot">
  <div class="foot-top">
    <div>
      <a class="logo" href="/"><span class="logo-m">${MARK}</span><span class="logo-w">hunt global</span></a>
      <p class="foot-tag">Singapore's Global Technology Holding Group. Building companies for an autonomous world.</p>
    </div>
    <form class="news" id="news">
      <label for="newsEmail">Subscribe to our newsletter</label>
      <div><input id="newsEmail" type="email" placeholder="Email address" required autocomplete="email"><button class="cbtn sm" type="submit">Submit</button></div>
    </form>
  </div>
  <div class="foot-cols">
    <div><h4>Hunt Global</h4><p>Level 8, 2 Venture Drive<br>Singapore 608526</p><a href="mailto:hello@huntglobal.co">hello@huntglobal.co</a><a href="/contact/">Contact</a></div>
    <div><h4>About</h4><a href="/about/">About Us</a><a href="/about/vision-values/">Vision &amp; Values</a><a href="/about/approach/">Approach</a><a href="/about/why-singapore/">Why Singapore</a><a href="/about/recognition/">Recognition</a></div>
    <div><h4>Portfolio</h4>${COMPANIES.map(c => `<a href="/portfolio/${c.slug}/">${c.name}</a>`).join('')}</div>
    <div><h4>Practice</h4>${PRACTICES.map(p => `<a href="/practice/${p.slug}/">${amp(p.t)}</a>`).join('')}</div>
    <div><h4>Company websites</h4><a href="/ventures/biltflow/">Biltflow</a><a href="/ventures/replaice/">Replaice</a><a href="/ventures/huntjobs/">HuntJobs</a><a href="/ventures/tribe/">Tribe</a></div>
    <div><h4>Explore</h4><a href="/regions/">Global Presence</a><a href="/insights/">Insights</a><a href="/careers/">Careers</a><a href="https://linkedin.com/" target="_blank" rel="noopener">LinkedIn</a></div>
  </div>
  <p class="foot-word" aria-hidden="true">Hunt Global<span>.</span></p>
  <div class="foot-bot"><span>© 2026 Hunt Global PTE Ltd. All rights reserved.</span><span><a href="/privacy/">Privacy Policy</a> · <a href="/terms/">Terms &amp; Conditions</a></span></div>
</footer>`;

const layout = ({ path, title, desc, body, home = false }) => `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${home ? 'Hunt Global — Building companies for an autonomous world' : `${amp(title)} — Hunt Global`}</title>
<meta name="description" content="${attr(desc)}">
<meta name="theme-color" content="#000000">
<meta property="og:title" content="${attr(home ? 'Hunt Global' : title + ' — Hunt Global')}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:type" content="website">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23000'/%3E%3Crect x='12' y='12' width='16' height='16' fill='%235B9BFF' transform='rotate(45 20 20)'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Hanken+Grotesk:wght@400;500;600;700&family=Archivo:wght@500;600&family=Poppins:wght@500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/site.css?v=${V}">
<link rel="stylesheet" href="/assets/css/real.css?v=${V}">
<link rel="stylesheet" href="/assets/css/chapters.css?v=${V}">
<link rel="stylesheet" href="/assets/css/luxe.css?v=${V}">
<script>document.documentElement.classList.replace('no-js','js')</script>
</head>
<body class="${home ? 'home' : 'pg'}">
${home ? INTRO : ''}
<a class="skip" href="#main">Skip to content</a>
${home ? '' : nav(path)}
${home ? '' : subnav(path)}
<main id="main">
${body}
</main>
${footer()}
<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"}}</script>
<script type="module" src="/assets/js/scenes.js?v=${V}"></script>
<script src="/assets/js/depth.js?v=${V}" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/bg.js?v=${V}" defer></script>
<script src="/assets/js/journey.js?v=${V}" defer></script>
<script src="/assets/js/hero.js?v=${V}" defer></script>
<script src="/assets/js/motion.js?v=${V}" defer></script>
<script src="/assets/js/luxe.js?v=${V}" defer></script>
<script src="/assets/js/site.js?v=${V}" defer></script>
</body>
</html>
`;

// sub-page hero: crumbs + staircase title + lead, media flush to the right edge
const phero = ({ crumbs, kicker, title, lead, m, extra = '', max }) => `<section class="phero" data-bg="${nextBg(false)}">
  <div class="phero-l">
    ${crumb(crumbs)}
    ${kicker ? kick(kicker) : ''}
    ${stair(title, { tag: 'h1', size: 'l', max })}
    ${lead ? `<p class="lead rv">${amp(lead)}</p>` : ''}
    ${extra}
  </div>
  <div class="phero-r rv">${media(m, { lazy: false })}</div>
</section>`;

/* ======================= HOME ======================= */
const home = layout({ path: '/', home: true, title: 'Home', desc: "Singapore's Global Technology Holding Group. Capital, technology and operating capability under one house — building companies for an autonomous world.", body: `
<section class="jhero" aria-label="Hunt Global">
  <div class="jh-back" aria-hidden="true">
    ${x3d('earth', { cls: 'jh-earth', mode: 'hero', label: 'The Earth from NASA imagery, turning to Singapore' })}
    <video class="jh-film" muted loop playsinline preload="none" poster="/assets/img/sg-night.jpg"><source src="${HERO_VID}" type="video/mp4"></video>
    <div class="jh-shade"></div>
  </div>
  <div class="jh-front">
    ${nav('/')}
    <div class="jh-beat b1 on">
      <p class="kick">Singapore · Global technology holding group</p>
      ${stair('Building companies|for an autonomous world', { tag: 'h1', size: 'xl', keep: true })}
      <p class="hero-sub">A Singapore institution. Built for the world.</p>
      <div class="btns">${btn('/portfolio/', 'Explore our portfolio')}${btn('/contact/', 'Start a conversation', { dark: true })}</div>
    </div>
    <div class="jh-beat b2" aria-hidden="true">
      <p class="kick">Who we are</p>
      <p class="jh-big">We build the companies <span>that define industries.</span></p>
      <p class="hero-sub">We invest our own capital, operate from within, and hold proprietary IP designed to compound.</p>
    </div>
    <div class="jh-beat b3" aria-hidden="true">
      <p class="kick">Hunt Global</p>
      <p class="jh-big">Capital, technology and operating capability <span>under one house.</span></p>
      <div class="jh-stats"><div><b>5</b><span>Portfolio companies</span></div><div><b>120+</b><span>Team worldwide</span></div><div><b>4</b><span>Operating regions</span></div><div><b>39+</b><span>Patents filed</span></div></div>
    </div>
    <div class="jh-route" aria-hidden="true"><span class="on">The world</span><span>Who we are</span><span>One house</span><i><b></b></i></div>
    <p class="jh-hint" aria-hidden="true">Scroll to begin the journey</p>
  </div>
</section>

<div id="traveller" class="traveller" data-3d="earth" data-travel data-lat="1.35" data-lon="103.82" role="img" aria-label="The Earth, from NASA imagery, turning to the city each chapter is about"></div>

<div class="names" aria-hidden="true"><div class="names-tr">${[...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES].map(c => `<span>${amp(c.full || c.name)}</span><i>${amp(c.cat)}</i>`).join('')}</div></div>

${chap('cream', 'Who we are', `  <div class="chap">
    <div>
      ${kick('Who we are')}
      ${stair('Capital, technology and operating capability under one house.', { size: 'm', max: 26 })}
      <div class="prose rv" style="margin-top:22px"><p>Singapore's Global Technology Holding Group. We build the companies that define industries. We invest our own capital, operate from within, and hold proprietary IP designed to compound.</p></div>
      <div class="btns rv" style="margin-top:30px">${btn('/about/', 'About Hunt Global')}</div>
    </div>
    <div class="chap-m rv"><div class="orbit">${dock('d-big', C.sg, 'Singapore · where it all starts')}<span class="chip c1"><b>5</b>Portfolio companies</span><span class="chip c2"><b>120+</b>Team worldwide</span><span class="chip c3"><b>4</b>Operating regions</span><span class="chip c4"><b>39+</b>Patents filed</span></div></div>
  </div>`)}

${chap('aqua', 'How we operate', `  <div class="sec-head">
    <div>${kick('How we operate')}${stair('Four principles behind every company we build.', { size: 'm', max: 26 })}</div>
  </div>
  <div class="how-wrap"><ol class="how">${PRINCIPLES.map(([t, p], i) => `<li class="rv"><h3>${t}</h3><p>${amp(p)}</p></li>`).join('')}</ol>${dock('d-big', C.sg, 'Run from Singapore')}</div>`)}

${chap('navy', 'The Heart', `  <div class="heart">
    <div>
      ${kick('Operations')}
      ${stair('The Heart.', { size: 'l', max: 14 })}
      <p class="lead rv" style="margin-top:22px">Orchestrated from Singapore. Scaling globally across APAC, MENA, UK/Europe and North America.</p>
      <p class="rv" style="margin-top:14px;max-width:34em;opacity:.86">Our portfolio operates synchronously through a unified agentic framework. We partner with large enterprises across our key regions to build and deploy autonomous AI solutions, optimizing infrastructure and driving regional growth, all governed from our central HQ.</p>
      <div class="sys rv" aria-label="System core">
        <div class="sys-h"><span>System core</span><span>The Heart — Singapore HQ</span></div>
        <div class="sys-g"><div><small>Tasks today</small><b data-tick="140283" data-step="5">140,283</b></div><div><small>Messages exchanged</small><b data-tick="892105" data-step="15">892,105</b></div></div>
        <p>An AI-first operating core. Specialized agents across Biltflow, Replaice, HuntJobs, Northstar and Group HQ process data, monitor capital flows and execute operational directives around the clock — orchestrated and governed from Singapore.</p>
      </div>
    </div>
    <div class="rv">${dock('d-tall', C.sg, 'The Heart · Singapore HQ, at night', true)}</div>
  </div>`, 'dark')}

${chap('paper', 'Operating Companies', `  <div class="sec-head">
    <div>${kick('Portfolio & divisions')}${stair('Operating Companies', { size: 'l', max: 12 })}<p class="lead rv" style="margin-top:20px">Our portfolio comprises technology, construction intelligence, talent, robotics and property-related platforms operating globally.</p></div>
  </div>
  <div class="pf-grid"><div class="pf-stick"><div class="cf-wrap"><div class="cflow" tabindex="0" aria-label="Operating companies">${COMPANIES.map(c => `<a class="cf-card" href="/portfolio/${c.slug}/"><img src="${REAL.card[c.slug]}" alt="" loading="lazy"><span class="cf-cap"><small>${amp(c.cat)}</small><b>${amp(nm(c))}</b></span></a>`).join('')}</div><div class="cf-nav"><button class="cf-prev" aria-label="Previous company">&larr;</button><button class="cf-next" aria-label="Next company">&rarr;</button></div></div></div>${dock('d-big', C.sg, 'Five companies, one house')}</div>`)}

${COMPANIES.map((c, i) => { return chap('e-' + EK[c.slug], nm(c), `  <div class="chap">
    <div>
      ${kick(c.cat)}
      ${stair(c.full || c.name, { size: 'l', max: 14 })}
      <p class="lead rv">${amp(c.desc)}</p>
      <div class="btns rv" style="margin-top:28px">${btn(`/portfolio/${c.slug}/`, 'View details', { sm: true })}${VENTURES[c.slug] ? btn(`/ventures/${VENTURES[c.slug]}/`, 'Company website', { dark: true, sm: true }) : ''}</div>
    </div>
    <div class="chap-m rv col">${dock('d-sm', ...DOCKCITY[c.slug])}${browser(c)}</div>
  </div>`, envCls(c.slug)); }).join('\n\n')}

${chap('blush', 'How we build', `  <div class="sec-head">
    <div>${kick('Practice')}${stair('How we build', { size: 'l', max: 14 })}<p class="lead rv" style="margin-top:20px">Strategic operating capabilities across four key practices.</p></div>
    ${dock('d-sm', C.sg, 'Built from Singapore')}
  </div>
  <div class="tiles">${PRACTICES.map(p => `<article class="tile rv">${media(p, { alt: p.t })}<p class="kick">${amp(p.t)}</p><h3>${amp(p.lead || p.t)}</h3><p>${amp(p.p)}</p>${tlink(`/practice/${p.slug}/`, 'Explore practice')}</article>`).join('')}</div>`)}

${chap('mist', 'Global Presence', `  <div class="sec-head">
    <div>${kick('Global presence')}${stair('Governed from Singapore', { size: 'l', max: 14 })}</div>
    <p class="lead rv">Our presence across APAC, MENA, UK/Europe, and North America enables deep integration with regional enterprises.</p>
  </div>
  <div class="globe-grid"><ul class="regions v">${REGIONS.map(([t, p]) => `<li class="rv"><h3>${amp(t)}</h3><p>${p}</p></li>`).join('')}</ul>${dock('d-big', C.sg, 'Governed from Singapore')}</div>
  <div style="margin-top:clamp(36px,4vw,56px)">${nodes()}</div>`)}

${chap('forest', 'Security & Governance', `  <div class="gov">
    <div>${kick('Governance')}${stair('Enterprise-grade Security & Governance', { size: 'm', max: 20 })}</div>
    <div>${dock('d-sm', C.sg, 'MAS · ACRA · Singapore PDPA')}<p class="lead rv">Rigorous security and institutional governance are the foundations for our global enterprise AI deployment.</p>${badges()}</div>
  </div>`, 'dark')}

${chap('lav2', 'Insights', `  <div class="sec-head">
    <div>${kick('Insights')}${stair('Research, updates, and market perspectives.', { size: 'm', max: 24 })}</div>
    <div class="hd-r">${dock('d-sm', C.sg, 'Perspectives from Singapore')}<div class="rv">${tlink('/insights/', 'All insights')}</div></div>
  </div>
  <a class="icard rv" href="/insights/${POST.slug}/">${media({ img: I('sg-night') }, { alt: '' })}<div><span class="meta">Articles · ${POST.year}</span><h3>${POST.t}</h3><p>${POST.d}</p><span class="tlink">Read article</span></div></a>`)}

${chap('plum', 'Work with us', `  <div class="cta">
    <div>${kick('Contact')}${stair('Let’s build what comes next.', { size: 'l', max: 16 })}</div>
    <div>${dock('d-sm', C.sg, 'Level 8, 2 Venture Drive · Singapore')}<div class="prose rv"><p>For investment opportunities, strategic partnerships and portfolio enquiries, speak with Hunt Global. Governed from Singapore.</p></div><div class="btns rv">${btn('/contact/', 'Start a conversation')}${btn('mailto:hello@huntglobal.co', 'Email us', { dark: true })}</div></div>
  </div>`, 'dark')}
` });

/* ======================= SUB PAGES ======================= */
const pages = { '/': home };
const PAGEREAL = (p, title) => {
  const m = p.match(/^\/portfolio\/([^/]+)\/$/);
  if (m && REAL.stack[m[1]]) return dstack(REAL.stack[m[1]].map(x => '/assets/co/' + x), { cls: 'phero-ds', alt: title + ' — product and imagery' });
  const q = p.match(/^\/practice\/([^/]+)\/$/);
  if (q) { const pr = PRACTICES.find(x => x.slug === q[1]); return dstack([pr.img, I(['aerial-singapore', 'global-cities', 'sg-night', 'aerial-bangalore'][PRACTICES.indexOf(pr)])], { cls: 'phero-ds', alt: pr.t }); }
  if (p === '/regions/') return x3d('earth', { cls: 'phero-3d', label: 'Earth from NASA imagery, Singapore facing you' });
  if (['/about/', '/careers/', '/insights/'].includes(p)) return x3d('sphere', { cls: 'phero-3d', imgs: REAL.hub, label: 'An orbit sphere of real photographs — drag to turn it' });
  return null;
};
const page = (path, title, desc, body) => {
  let html = layout({ path, title, desc, body: body.join('\n\n') }); const alt = PAGEREAL(path, title);
  PG++; LI = PG * 2; DI = PG;
  // each project / practice / place page opens in its own environment: a real photo of that world behind
  // the stage, and (for companies) the company's own tint on every other section
  const cm = path.match(/^\/portfolio\/([^/]+)\/$/), pm = path.match(/^\/practice\/([^/]+)\/$/);
  const env = cm ? ENV[cm[1]] : pm ? PRACTICES.find(p => p.slug === pm[1]).img : ENV[path];
  if (env) html = html.replace('<body class="pg">', `<body class="pg" data-env="${cm ? cm[1] : pm ? pm[1] : 'place'}" style="--env:url('${env}')">`);
  if (cm) { const k = EK[cm[1]]; let i = 0; html = html.replace(/data-bg="[a-z0-9]+"/g, () => `data-bg="e-${k}${i++ % 2 ? '-b' : ''}"`).replace(/<section class="(sec|phero)/g, (m, c) => `<section class="${c} ${envCls(cm[1])}`).replace(/ style="--env:url\('[^']*'\)"/, ''); }
  pages[path] = alt ? html.replace(/<div class="phero-r rv"><div class="hue">[\s\S]*?<\/div><\/div>/, `<div class="phero-r rv">${alt}</div>`) : html;
};

/* About — huntglobal.co/about */
page('/about/', 'About', "Singapore's Global Technology Holding Group. We build the companies that define industries.", [
  phero({ crumbs: [['About']], kicker: 'About Hunt Global', title: 'We build the companies that define industries.', lead: 'A Singapore institution. Built for the world.', m: { img: I('sg-night') } }),
  sec(`  ${kick('Who we are')}
  ${stair("Singapore's global technology holding group.", { size: 'm', max: 26 })}
  <p class="lead rv" style="margin-top:28px">Singapore's Global Technology Holding Group. We build the companies that define industries. We invest our own capital, operate from within, and hold proprietary IP designed to compound.</p>
  ${stats()}`, 'alt'),
  sec(`  ${kick('How we operate')}
  ${stair('Four principles behind every company we build.', { size: 'm', max: 26 })}
  <div style="margin-top:clamp(40px,5vw,70px)">${plist()}</div>`),
  sec(`  <div class="heart">
    <div>${kick('Why Singapore')}<blockquote class="quote-xl rv">“Singapore is not where we happen to be. It is the strategic foundation everything we build is designed around.”</blockquote>
      <div class="prose rv" style="margin-top:24px"><p>Institutional IP framework. World-class governance. The gateway connecting enterprise partners across Sydney, Bangalore, London and San Francisco.</p></div>
      <div class="rv" style="margin-top:26px">${tlink('/about/why-singapore/', 'Read more')}</div></div>
    <div class="rv">${media({ img: I('sg-arch') }, { cls: 'cut', alt: 'Singapore architecture' })}</div>
  </div>`, 'dark'),
  sec(`  ${kick('Group HQ · Singapore')}
  ${regions()}`, 'alt'),
  sec(`  ${kick('Explore')}
  ${stair('More about Hunt Global.', { size: 'm', max: 26 })}
  <div style="margin-top:clamp(36px,5vw,60px)">${llist([['/about/vision-values/', 'Vision & Values', 'Operating principles that guide our venture building.'], ['/about/approach/', 'Our Approach', 'Permanent capital, operational depth, IP at the core.'], ['/about/why-singapore/', 'Why Singapore', 'Singapore as the strategic foundation for everything we build.'], ['/about/recognition/', 'Recognition', 'Institutional validation across our operating regions.']])}</div>`),
  sec(`  <div class="gov">
    <div>${kick('Governance')}${stair('Enterprise-grade Security & Governance', { size: 'm', max: 20 })}</div>
    <div><p class="lead rv">Rigorous security and institutional governance are the foundations for our global enterprise AI deployment.</p>${badges()}</div>
  </div>`, 'dark'),
  sec(`  <div class="cta">
    <div>${kick('Work with us')}${stair('Let’s build together.', { size: 'l', max: 14 })}</div>
    <div class="btns rv">${btn('/contact/', 'Contact Hunt Global')}</div>
  </div>`, 'white')
]);

/* huntglobal.co/about/vision-values */
page('/about/vision-values/', 'Vision & Values', 'Operating principles that guide our venture building.', [
  phero({ crumbs: [['About', '/about/'], ['Vision & Values']], title: 'Vision & Values', lead: 'Operating principles that guide our venture building.', m: { img: I('global-cities') } }),
  sec(`  <p class="lead rv">Hunt Global is built on a foundation of Conviction, Discipline, Ownership, Execution, Partnership, and Long-term thinking. We do not dabble. We dominate.</p>
  <ul class="values rv">${VALUES.map(v => `<li>${v}</li>`).join('')}</ul>
  <div class="prose rv" style="margin-top:40px"><p>Our conviction is backed by our own capital, ensuring complete alignment with the ventures we build. We execute with precision, leveraging our 120+ team of operators who work from within, driving growth rather than advising from the sidelines.</p></div>
  ${next('/about/approach/', 'Our Approach')}`, 'alt')
]);

/* huntglobal.co/about/approach */
page('/about/approach/', 'Our Approach', "Permanent capital, operational depth, IP at the core. We don't dabble. We dominate.", [
  phero({ crumbs: [['About', '/about/'], ['Our Approach']], title: 'Our Approach', lead: 'We don’t dabble. We dominate.', m: { img: I('pr-tech') } }),
  sec(`  ${plist(APPROACH)}
  ${next('/about/why-singapore/', 'Why Singapore')}`, 'alt')
]);

/* huntglobal.co/about/why-singapore */
page('/about/why-singapore/', 'Why Singapore', 'Singapore as the strategic foundation for everything we build.', [
  `<section class="sgh" data-bg="ink" aria-label="Why Singapore">
  <div class="sgh-media" aria-hidden="true"><video muted playsinline loop autoplay preload="auto" poster="${I('aerial-singapore')}"><source src="${VID('singapore')}" type="video/mp4"></video></div>
  <div class="sgh-shade" aria-hidden="true"></div>
  <div class="sgh-in">
    ${crumb([['About', '/about/'], ['Why Singapore']])}
    <p class="kick">Why Singapore</p>
    <h1 class="sgh-q">“Singapore is not where we happen to be. <em>It is the strategic foundation everything we build is designed around.</em>”</h1>
    <p class="sgh-lead">Institutional IP framework. World-class governance. The gateway connecting enterprise partners across Sydney, Bangalore, London and San Francisco.</p>
  </div>
  <p class="sgh-scroll" aria-hidden="true">Scroll</p>
</section>`,
  sec(`  <div class="prose wide rv">${paras(['Singapore provides the institutional IP framework, world-class governance, and stability required to build enduring global enterprises. Operating within the robust MAS framework and registered with ACRA, we leverage Singapore as the ultimate gateway to global capital.', 'From this strategic foundation, we seamlessly connect enterprise partners across APAC, MENA, UK/Europe and North America with our operational centers in Sydney, Bangalore, London and San Francisco.'])}</div>`, 'dark'),
  sec(`  ${kick('Strategic Nodes')}
  ${nodes()}
  ${next('/about/recognition/', 'Recognition')}`, 'alt')
]);

/* huntglobal.co/about/recognition */
page('/about/recognition/', 'Recognition', 'Institutional validation across our operating regions.', [
  phero({ crumbs: [['About', '/about/'], ['Recognition']], title: 'Recognition', lead: 'Institutional validation.', m: { img: I('sg-arch') } }),
  sec(`  <div class="prose wide rv">${paras(['As a Singapore-headquartered institution, our commitment to excellence, governance, and technological innovation is continuously recognized across our operating regions.', 'Our portfolio companies frequently achieve industry accolades for advancements in enterprise AI, construction intelligence, and robotics, reflecting our core strategy of building proprietary, patent-protected IP.'])}</div>
  ${next('/portfolio/', 'Portfolio')}`, 'alt')
]);

/* huntglobal.co/portfolio — company cards with a working sector filter */
const SECTORS = [...new Set(COMPANIES.map(c => c.cat))];
page('/portfolio/', 'Portfolio', 'Companies built for long-term relevance — technology, construction intelligence, talent, robotics and property platforms.', [
  phero({ crumbs: [['Portfolio']], kicker: 'Portfolio & Divisions', title: 'Companies built for long-term relevance.', lead: 'Our portfolio comprises technology, construction intelligence, talent, robotics and property-related platforms operating globally.', m: { img: I('global-cities') } }),
  sec(`  <div class="pf-filter rv" role="group" aria-label="Filter by sector"><button class="on" data-sector="all">All Divisions</button>${SECTORS.map(x => `<button data-sector="${attr(x)}">${amp(x)}</button>`).join('')}</div>
  <div class="pcards">${COMPANIES.map(c => `<article class="pcard rv" data-sector="${attr(c.cat)}">
    <a class="pc-img" href="/portfolio/${c.slug}/" tabindex="-1" aria-hidden="true"><img src="${REAL.card[c.slug]}" alt="" loading="lazy"></a>
    <div class="pc-tx"><span class="r-cat">${amp(c.cat)}</span><h3>${amp(c.full || c.name)}</h3><p>${amp(c.desc)}</p>
      <dl><div><dt>Location</dt><dd>${amp(c.loc)}</dd></div><div><dt>Governance</dt><dd>Singapore HQ</dd></div></dl>
      <div class="btns">${btn(`/portfolio/${c.slug}/`, 'View details', { sm: true })}${c.site ? btn(c.site, 'Visit website', { dark: true, ext: true, sm: true }) : ''}</div></div>
  </article>`).join('')}</div>
  ${next('/practice/', 'How we build')}`)
]);

COMPANIES.forEach((c, i) => {
  const nx = COMPANIES[(i + 1) % COMPANIES.length];
  page(`/portfolio/${c.slug}/`, c.full || c.name, c.desc, [
    phero({ crumbs: [['Portfolio', '/portfolio/'], [nm(c)]], kicker: c.cat, title: c.full || c.name, max: 12, lead: c.desc, m: c,
      extra: `<dl class="pmeta rv"><div><dt>Location</dt><dd>${amp(c.locDetail || c.loc)}</dd></div><div><dt>Governance</dt><dd>Singapore HQ</dd></div></dl>
    ${c.site ? `<div class="btns rv">${btn(c.site, 'Visit ' + c.name, { ext: true })}</div>` : ''}` }),
    sec(`  <div class="gov">
    <div>${stair(c.head, { size: 'm', max: 18 })}</div>
    <div class="prose rv">${paras(c.body)}</div>
  </div>
  ${VENTURES[c.slug] ? `<a class="vlink rv" href="/ventures/${VENTURES[c.slug]}/"><div><span>Company website · redesigned</span><b>Explore the full ${amp(nm(c))} website</b></div><i aria-hidden="true">&rarr;</i></a>` : ''}`, 'alt'),
    sec(`  ${kick('Also in the portfolio')}
  ${rows(COMPANIES.filter(o => o !== c), true)}
  ${next(`/portfolio/${nx.slug}/`, nm(nx), 'Next company')}`)
  ]);
});

/* huntglobal.co/practice */
page('/practice/', 'Practice', 'How we build — strategic operating capabilities across four key practices.', [
  phero({ crumbs: [['Practice']], title: 'How we build', lead: 'Strategic operating capabilities across four key practices.', m: { img: I('pr-venture') } }),
  sec(`  <div class="tiles">${PRACTICES.map(p => `<article class="tile rv">${media(p, { alt: p.t })}<p class="kick">${amp(p.t)}</p><h3>${amp(p.lead || p.t)}</h3><p>${amp(p.p)}</p>${tlink(`/practice/${p.slug}/`, 'Explore practice')}</article>`).join('')}</div>
  ${next('/regions/', 'Global Presence')}`, 'alt')
]);

PRACTICES.forEach((p, i) => {
  const nx = PRACTICES[(i + 1) % PRACTICES.length];
  page(`/practice/${p.slug}/`, p.t, `${p.t} — ${p.lead} ${p.p}`, [
    phero({ crumbs: [['Practice', '/practice/'], [p.t]], kicker: 'Practice', title: p.t, max: 12, lead: 'Deep operational and capital deployment.', m: p }),
    sec(`  <p class="lead rv">${amp([p.lead, p.p].filter(Boolean).join(' '))}</p>
  <div class="prose wide rv" style="margin-top:28px">${paras(PRACTICE_BODY)}</div>
  ${next(`/practice/${nx.slug}/`, nx.t, 'Next practice')}`, 'alt')
  ]);
});

/* huntglobal.co/regions */
page('/regions/', 'Global Presence', 'Governed from Singapore. Delivering autonomous intelligence to the world.', [
  phero({ crumbs: [['Global Presence']], title: 'Global Presence', lead: 'Governed from Singapore. Delivering autonomous intelligence to the world.', m: { img: I('aerial-singapore'), vid: VID('singapore') } }),
  sec(`  <div class="gov">
    <div>${kick('Enterprise partnership')}${stair('Regional growth through autonomous technology.', { size: 'm', max: 20 })}</div>
    <div class="prose rv">${paras(['Our global footprint is defined not by capital deployment, but by enterprise partnership. We partner with large institutional clients across our key regions to build, integrate, and scale autonomous AI solutions.', 'By deploying our proprietary operating systems into these markets, we help accelerate regional growth, enabling our partners to operate with unprecedented intelligence and efficiency. Every deployment is orchestrator-led and governed from our Singapore headquarters, ensuring institutional-grade security and capability globally.'])}</div>
  </div>`, 'alt'),
  sec(`  ${kick('Strategic Nodes')}
  <p class="lead rv">Our presence across APAC, MENA, UK/Europe, and North America enables deep integration with regional enterprises.</p>
  <div style="margin-top:clamp(36px,5vw,60px)">${nodes(NODES.filter(n => n[0] !== 'London'))}</div>`),
  sec(`  ${kick('Operating regions')}
  ${regions()}
  ${next('/insights/', 'Insights')}`, 'dark')
]);

/* huntglobal.co/insights */
page('/insights/', 'Insights', 'Research, updates, and market perspectives from the Hunt Global portfolio.', [
  phero({ crumbs: [['Insights']], title: 'Insights', lead: 'Research, updates, and market perspectives from the Hunt Global portfolio.', m: { img: I('sg-night') } }),
  sec(`  <div class="sec-head">${kick('Latest')}<div class="filters rv" id="insFilters"><button class="on" data-ins="all">All Insights</button><button data-ins="articles">Articles</button><button data-ins="news">News</button></div></div>
  <div id="insList">
    <a class="icard rv" data-type="articles" href="/insights/${POST.slug}/">${media({ img: I('sg-arch') }, { alt: '' })}<div><span class="meta">Articles · ${POST.year}</span><h3>${POST.t}</h3><p>${POST.d}</p><span class="tlink">Read article</span></div></a>
    <p class="empty" hidden>No news published yet.</p>
  </div>
  ${next('/contact/', 'Contact')}`, 'alt')
]);
page(`/insights/${POST.slug}/`, POST.t, POST.d, [
  phero({ crumbs: [['Insights', '/insights/'], ['Articles']], kicker: `Articles · ${POST.year}`, title: POST.t, max: 18, lead: POST.d, m: { img: I('sg-arch') } }),
  sec(`  <article class="article">
    <p class="lead rv">${POST.body[0]}</p>
    ${POST.body.slice(1).map(p => `<p class="rv">${p}</p>`).join('\n    ')}
  </article>
  ${next('/insights/', 'All insights', 'Back to')}`, 'alt')
]);

/* huntglobal.co/careers */
page('/careers/', 'Careers', 'Build the companies that define industries. Join our team of 120+ operators worldwide.', [
  phero({ crumbs: [['Careers']], title: 'Careers', lead: 'Build the companies that define industries.', m: { img: I('pr-venture') },
    extra: `<div class="btns rv">${btn('mailto:hello@huntglobal.co?subject=Careers%20at%20Hunt%20Global', 'Contact our talent team')}</div>` }),
  sec(`  <div class="prose wide rv">${paras(['Join our team of 120+ operators worldwide. We seek individuals with extreme conviction, operational depth, and a desire to build from within.', 'Whether in engineering at our Bangalore innovation center, enterprise partnerships in Sydney or London, robotics in San Francisco, or group strategy in Singapore, a career at Hunt Global means complete alignment with the ventures you scale.'])}</div>
  <div style="margin-top:clamp(40px,5vw,70px)">${nodes()}</div>
  ${next('/contact/', 'Contact')}`, 'alt')
]);

/* huntglobal.co/contact */
page('/contact/', 'Contact', 'For investment opportunities, strategic partnerships and portfolio enquiries.', [
  sec(`  ${crumb([['Contact']])}
  <div class="cgrid">
    <div>
      ${stair('Start a conversation.', { tag: 'h1', size: 'l', max: 14 })}
      <p class="lead rv" style="margin-top:28px">For investment opportunities, strategic partnerships and portfolio enquiries.</p>
      <dl class="cinfo rv">
        <div><dt>Direct email</dt><dd><a href="mailto:hello@huntglobal.co">hello@huntglobal.co</a></dd></div>
        <div><dt>Registered office</dt><dd>Level 8, 2 Venture Drive<br>Singapore 608526</dd></div>
        <div><dt>Operating regions</dt><dd>APAC · MENA · UK/Europe</dd></div>
      </dl>
      ${x3d('earth', { cls: 'contact-3d', label: 'Governed from Singapore, connected to the world' })}
    </div>
    <form class="form rv" id="enquiry" novalidate>
      <div class="frow"><label class="field"><span>Full name *</span><input name="name" required autocomplete="name"></label>
      <label class="field"><span>Email address *</span><input name="email" type="email" required autocomplete="email"></label></div>
      <div class="frow"><label class="field"><span>Company</span><input name="company" autocomplete="organization"></label>
      <label class="field"><span>Position</span><input name="position" autocomplete="organization-title"></label></div>
      <div class="frow"><label class="field"><span>Region *</span><select name="region" required><option value="">Select a region</option><option>APAC</option><option>MENA</option><option>UK/Europe</option><option>ANZ</option><option>North America</option><option>Other</option></select></label>
      <label class="field"><span>Enquiry type *</span><select name="topic" required><option value="">Select enquiry type</option><option>Investment opportunity</option><option>Strategic partnership</option><option>Portfolio enquiry</option><option>Technology and engineering</option><option>Construction intelligence</option><option>Media</option><option>Careers</option><option>General</option></select></label></div>
      <label class="field"><span>Message *</span><textarea name="message" rows="4" required></textarea></label>
      <div><button class="cbtn" type="submit">Send Enquiry</button></div>
      <p class="note" id="formNote" role="status">Opens your email app, addressed to hello@huntglobal.co</p>
    </form>
  </div>`, 'alt')
]);

/* huntglobal.co/privacy, /terms */
page('/privacy/', 'Privacy Policy', 'Institutional data governance — Singapore PDPA and GDPR.', [
  phero({ crumbs: [['Privacy Policy']], title: 'Privacy Policy', lead: 'Institutional Data Governance.', m: { img: I('sg-arch') } }),
  sec(`  <div class="prose wide rv">${paras(['As an ACRA-registered Singapore institution operating globally, Hunt Global PTE Ltd adheres to the strictest international data protection standards, including the Singapore PDPA and GDPR.', 'Our commitment to enterprise-grade security means your data is managed with the same rigor we apply to our proprietary IP and capital operations.'])}</div>
  ${next('/terms/', 'Terms & Conditions')}`, 'alt')
]);
page('/terms/', 'Terms & Conditions', 'Terms of use for the Hunt Global platform and corporate resources.', [
  phero({ crumbs: [['Terms & Conditions']], title: 'Terms & Conditions', lead: 'Terms of Use.', m: { img: I('contact') } }),
  sec(`  <div class="prose wide rv">${paras(['These terms govern your use of the Hunt Global platform and corporate resources. Hunt Global PTE Ltd is a Singapore-based investment holding company operating within the robust MAS framework.', 'All proprietary technology, including patents filed across our portfolio (Biltflow, Replaice, HuntJobs, Northstar), are protected intellectual property.'])}</div>
  ${next('/privacy/', 'Privacy Policy')}`, 'alt')
]);

/* 404 */
pages['/404/'] = layout({ path: '/404/', title: 'Not found', desc: 'Page not found.', body: phero({ crumbs: [['Not found']], title: 'Page|not found.', lead: 'The page you are looking for has moved. Start from the home page or explore the portfolio.', m: { img: I('global-cities') }, extra: `<div class="btns rv">${btn('/', 'Back home')}${btn('/portfolio/', 'Portfolio', { dark: true })}</div>` }) });

/* ======================= WRITE ======================= */
for (const [path, html] of Object.entries(pages)) {
  const file = path === '/' ? 'index.html' : path === '/404/' ? '404.html' : path.slice(1) + 'index.html';
  mkdirSync(dirname(file) || '.', { recursive: true });
  writeFileSync(file, html);
}
console.log('built', Object.keys(pages).length, 'hub pages');
await import('./ventures.mjs');
