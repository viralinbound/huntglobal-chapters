// Redesigned websites for the Hunt Global portfolio companies, generated into /ventures/<id>/.
// Copy comes verbatim from each company's live site (crawled 2026-11-16): biltflow.com, replaice.ai,
// huntjobs.ai, tribeapp.com.au. Images are the companies' own, saved in /assets/co/<id>/.
// Primary actions point at the live company site / app stores so every button still works.
import { mkdirSync, writeFileSync } from 'node:fs';

const V = 27;
const esc = s => String(s).replace(/&(?!amp;|#|[a-z]+;)/g, '&amp;');
const A = (id, f) => `/assets/co/${id}/${f}`;
const x3d = (scene, cls, label, tone = 'dark') => `<div class="x3d ${cls}" data-3d="${scene}" data-tone="${tone}" role="img" aria-label="${label}"></div>`;
const POS = [[['8%', '8%', '84%', '0px']], [['2%', '4%', '72%', '0px'], ['26%', '40%', '70%', '90px']], [['0%', '2%', '66%', '-40px'], ['30%', '20%', '64%', '50px'], ['12%', '50%', '62%', '140px']]];
const dstack = (srcs, cls, alt) => `<div class="dstack ${cls}" role="img" aria-label="${alt}"><div class="ds-in">${srcs.map((u, i) => { const [x, y, w, z] = POS[srcs.length - 1][i]; return `<img class="ds-l" src="${u}" alt="" loading="lazy" style="--x:${x};--y:${y};--w:${w};--z:${z}">`; }).join('')}</div></div>`;
const sphere = (imgs, cls, alt) => `<div class="x3d ${cls}" data-3d="sphere" data-imgs="${imgs.join(',')}" role="img" aria-label="${alt}"></div>`;
const lbl = t => `<p class="lbl">${esc(t)}</p>`;
const ul = (l, cls = '') => `<ul${cls ? ` class="${cls}"` : ''}>${l.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;

const shell = ({ id, title, desc, theme, logo, nav, cta, body, foot }) => `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc).replace(/"/g, '&quot;')}">
<meta name="theme-color" content="${theme}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/ventures.css?v=${V}">
<link rel="stylesheet" href="/assets/css/real.css?v=${V}">
<script>document.documentElement.classList.replace('no-js','js')</script>
</head>
<body data-v="${id}">
<div class="gbar"><div class="w"><a href="/portfolio/">&larr; Hunt Global portfolio</a><span>A Hunt Global company · Governed from Singapore</span></div></div>
<header class="vh"><div class="w">
  <a class="vlogo" href="#top" aria-label="${esc(title)} — top">${logo}</a>
  <ul class="vnav">${nav.map(([h, t]) => `<li><a href="${h}">${esc(t)}</a></li>`).join('')}</ul>
  <a class="btn" href="${cta[0]}"${cta[0].startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(cta[1])}</a>
  <button class="vburger" aria-label="Open menu" aria-expanded="false" aria-controls="vmenu"><i></i><i></i><i></i></button>
  <ul class="vmenu" id="vmenu">${nav.map(([h, t]) => `<li><a href="${h}">${esc(t)}</a></li>`).join('')}<li><a href="${cta[0]}">${esc(cta[1])}</a></li></ul>
</div></header>
<main id="top">
${body}
</main>
<footer class="vfoot"><div class="w">
  <div class="top"><div><a class="vlogo" href="#top">${logo}</a><p class="tag">${esc(foot.tag)}</p></div>
  <nav aria-label="Footer">${foot.links.map(([h, t]) => `<a href="${h}"${h.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(t)}</a>`).join('')}</nav></div>
  <div class="bot"><span>${esc(foot.copy)}</span><span>Part of <a href="/">Hunt Global</a> · <a href="${foot.site}" target="_blank" rel="noopener">Live site &nearr;</a></span></div>
</div></footer>
<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"}}</script>
<script type="module" src="/assets/js/scenes.js?v=${V}"></script>
<script src="/assets/js/site.js?v=${V}" defer></script>
<script src="/assets/js/ventures.js?v=${V}" defer></script>
<script src="/assets/js/depth.js?v=${V}" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/motion.js?v=${V}" defer></script>
</body>
</html>
`;

const out = {};

/* =========================== BILTFLOW =========================== */
{
  const id = 'biltflow', B = f => A(id, f);
  const STAGES = [
    ['Development', 'Know what works. Before you commit.', 'Site sourcing · Feasibility · Approvals', 'Biltflow learns from your real project data to test feasibility, model costs and track every approval — so you can see risk earlier and make better development decisions.', ['Feasibility, cost and approval risk.', 'Tests scenarios and recommends the best path forward.', 'Updates workflows, tracks approvals and moves actions forward.'], 'plate-development.webp'],
    ['Design', 'Resolve it in design. Before it reaches site.', 'Design · Coordination · Documentation', 'Biltflow continuously reviews drawings, models and project requirements to identify conflicts early, work out the resolution and move the right actions forward — before they become site problems.', ['Detects clashes, inconsistencies and design risk.', 'Finds the issue, understands the impact and recommends the best resolution.', 'Creates actions, updates workflows and gets the right people moving.'], 'plate-design.webp'],
    ['Procurement', 'Buy with certainty. Before you commit the cost.', 'Estimating · Tendering · Procurement', 'Biltflow brings scope, pricing, programme and supplier intelligence together — comparing every bid, exposing risk and recommending the best path before you award.', ['Finds gaps, exclusions, pricing anomalies and procurement risk.', 'Compares options and recommends the best commercial outcome.', 'Runs workflows, prepares comparisons and moves packages toward award.'], 'plate-procurement.webp'],
    ['Commercial', 'Keep it on budget. Before it goes off track.', 'Contracts · Cost · Forecasting', 'Biltflow continuously analyses cost, contracts and change events to spot risk early, forecast the outcome and recommend the right action — so you stay in control before it goes off track.', ['Identifies cost risk, contract exposure and potential overruns.', 'Analyses the impact and recommends the best course of action.', 'Creates actions, updates workflows and keeps projects on track.'], 'plate-commercial.webp'],
    ['Construction', 'Keep the build moving. Before delays take hold.', 'Programme · Delivery · Compliance', 'Biltflow connects programme, site progress and compliance in real time — spotting what’s falling behind, working out what needs to happen next, and moving the right actions forward.', ['Detects delays, programme risk and site issues early.', 'Understands the impact and determines the best recovery path.', 'Creates actions, coordinates teams and keeps delivery moving.'], 'plate-construction.webp'],
    ['Asset care', 'Turn handover into long-term value.', 'Handover · Defects · Maintenance', 'Biltflow connects handover, defects and maintenance in one place — giving you full visibility, faster resolution and better performing assets from day one.', ['Identifies defects, risks and outstanding handover items early.', 'Understands the impact and recommends the best course of action.', 'Creates actions, coordinates teams and tracks to resolution.'], 'plate-asset-care.webp']
  ];
  const CLASSES = [['High-density residential', 'Apartments · BTR · Mixed-use residential', 'class-highdensity-v2-1200.webp'], ['Hotels & hospitality', 'Hotels · Resorts · Serviced apartments', 'class-hospitality-v5-1200.webp'], ['Commercial', 'Offices · Workplace · Mixed-use', 'class-commercial-1200.webp'], ['Healthcare', 'Hospitals · Medical · Aged care', 'class-healthcare-1200.webp'], ['Education', 'Schools · Universities · Campuses', 'class-education-1200.webp'], ['Industrial & logistics', 'Warehouses · Logistics · Advanced manufacturing', 'class-industrial-1200.webp'], ['Data centres', 'Hyperscale · Colocation · Mission-critical', 'class-datacentres-1200.webp'], ['Mixed-use', 'Residential · Retail · Commercial · Hospitality', 'class-mixed-v2-1200.webp']];
  const LIVE = 'https://biltflow.com/';
  out[id] = shell({ id, theme: '#05081f', title: 'Biltflow — The AI-native operating system for construction', desc: 'Biltflow is one AI-native system for running your entire construction operation — from development and design to procurement, commercial, delivery and asset care.',
    logo: `<img src="${B('logo-white.svg')}" alt="Biltflow">`,
    nav: [['#how', 'How it works'], ['#stages', 'Every stage'], ['#why', 'Why Biltflow'], ['#who', 'Who it’s for'], ['#classes', 'Asset classes']],
    cta: [LIVE, 'Book a walkthrough'],
    foot: { tag: 'Biltflow — Construction Intelligence. Built to think ahead.', links: [['#how', 'How it works'], ['#stages', 'Every stage'], ['#why', 'Why Biltflow'], ['#who', 'Who it’s for'], ['#classes', 'Asset classes'], ['https://www.linkedin.com/company/biltflow/home/', 'LinkedIn']], copy: '© 2026 Hunt Global Pte. Ltd., Singapore. All rights reserved.', site: LIVE },
    body: `
<section class="vhero"><div class="w grid">
  <div>${lbl('Construction Intelligence')}
    <h1 class="h1 rv">Construction Intelligence. <em>Built to think ahead.</em></h1>
    <p class="lead rv">Biltflow is one AI-native system for running your entire construction operation — from development and design to procurement, commercial, delivery and asset care. Trained on data from more than $5 billion in live construction projects, Biltflow brings proven construction intelligence to every workflow.</p>
    <div class="btns rv"><a class="btn" href="#stages">Explore the platform</a><a class="btn ghost ext" href="${LIVE}" target="_blank" rel="noopener">Book a walkthrough</a></div>
  </div>
  <div class="media rv">${dstack([B('plate-development.webp'), B('plate-commercial.webp'), B('plate-construction.webp')], 'ds-hero', 'Biltflow development, commercial and construction workspaces')}</div>
</div></section>

<section class="sec alt"><div class="w split">
  <div>${lbl('The problem')}<h2 class="h2 rv">Disconnected data creates <em>uncertainty.</em></h2></div>
  <p class="lead rv">Drawings, costs, contracts and site records live in separate systems that don’t talk to each other. Teams waste time chasing information, decisions get delayed, and critical insights are lost — and what one building teaches rarely reaches the next.</p>
</div></section>

<section class="sec" id="how"><div class="w">
  <div class="head"><div>${lbl('How Biltflow works')}<h2 class="h2 rv">Sees it. Solves it. <em>Does it.</em></h2></div><p class="lead rv">Biltflow sees what others miss, works out what happens next, and gets the work done. You decide how far it goes — Manual, Copilot or Autopilot.</p></div>
  <div class="modes">
    <div class="mode rv"><b>Manual</b><h3>You’re in control.</h3><p>Biltflow gives you the intelligence to act.</p><div class="bar"><i style="width:33%"></i></div></div>
    <div class="mode rv"><b>Copilot</b><h3>Work together.</h3><p>Biltflow does the work. You review and approve.</p><div class="bar"><i style="width:66%"></i></div></div>
    <div class="mode rv"><b>Autopilot</b><h3>Let Biltflow run it.</h3><p>Approved workflows happen automatically, within the rules you set.</p><div class="bar"><i style="width:100%"></i></div></div>
  </div>
</div></section>

<section class="sec alt" id="stages"><div class="w">
  <div class="head"><div>${lbl('From intelligence to action')}<h2 class="h2 rv">Every stage. <em>One connected intelligence.</em></h2></div></div>
  <div class="tabs" data-tabs>
    <div class="tablist" role="tablist" aria-label="Lifecycle stages">${STAGES.map((s, i) => `<button role="tab" id="t${i}" aria-controls="p${i}" aria-selected="${!i}"${i ? ' tabindex="-1"' : ''}><i>0${i + 1}</i><b>${esc(s[0])}</b><span>${esc(s[2])}</span></button>`).join('')}</div>
    <div>${STAGES.map((s, i) => `<article class="panel" role="tabpanel" id="p${i}" aria-labelledby="t${i}"${i ? ' hidden' : ''}>
      <div><p class="tags">0${i + 1} / ${esc(s[0])} · ${esc(s[2])}</p><h3>${esc(s[1])}</h3><p>${esc(s[3])}</p>
        <div class="sss"><div><b>Sees it</b><span>${esc(s[4][0])}</span></div><div><b>Solves it</b><span>${esc(s[4][1])}</span></div><div><b>Does it</b><span>${esc(s[4][2])}</span></div></div></div>
      <div class="im"><img src="${B(s[5])}" alt="Biltflow ${esc(s[0].toLowerCase())} workspace" loading="lazy"></div>
    </article>`).join('')}</div>
  </div>
</div></section>

<section class="sec"><div class="w split">
  <div>${lbl('One connected intelligence')}<p class="statement rv"><span>Build.</span><span>Learn.</span><span>Improve.</span><span>Repeat.</span></p></div>
  <div><h2 class="h2 rv">Every project makes the next one <em>smarter.</em></h2><p class="lead rv">Every decision. Every cost. Every delay. Every outcome.</p><div class="photo-row rv">${['class-highdensity-v2-1200.webp', 'class-datacentres-1200.webp', 'class-healthcare-1200.webp'].map(x => `<img src="${B(x)}" alt="" loading="lazy">`).join('')}</div></div>
</div></section>

<section class="sec alt" id="why"><div class="w">
  <div class="split">
    <div>${lbl('Why Biltflow')}<h2 class="h2 rv">Intelligence built from real buildings, <em>not theory.</em></h2></div>
    <div><p class="lead rv">Biltflow understands drawings, costs, contracts, programmes, site records and compliance — and how they connect. Built on the patterns, decisions and outcomes of completed projects.</p>
      <div class="metrics rv" style="margin-top:36px;grid-template-columns:1fr"><div><b>$5B+</b><span>Of real project data behind the intelligence. Higher productivity. Lower risk. Smarter projects.</span></div></div></div>
  </div>
  <div class="head" style="margin-top:clamp(70px,9vw,120px)"><div>${lbl('You stay in control')}<h2 class="h2 rv">Deploy AI <em>your way.</em></h2></div><p class="lead rv">Every agent operates within the permissions you set. You decide what AI can see, recommend and execute — and when human approval is required.</p></div>
  <div class="cards">
    <div class="card rv"><span class="k">Connect your systems</span><h3 class="h3">Keep the technology that works.</h3><p>Connect your existing systems, data and workflows through one intelligence layer.</p></div>
    <div class="card rv"><span class="k">Run Biltflow native</span><h3 class="h3">Use Biltflow as the system.</h3><p>Run workflows directly in Biltflow — AI-native from the ground up.</p></div>
    <div class="card rv"><span class="k">Your stack. Your choice.</span><h3 class="h3">Integrate, go native, or use both.</h3><p>Keep your existing stack while bringing more of your operation into Biltflow.</p></div>
  </div>
</div></section>

<section class="sec" id="who"><div class="w split">
  <div>${lbl('Who it’s for')}<h2 class="h2 rv">Built for the people <em>who build.</em></h2></div>
  <div><p class="lead rv">One intelligence layer across development, design, procurement, commercial, construction and asset care. From the first feasibility to the final handover — Biltflow connects the people, systems and decisions behind every project.</p><p class="note rv">Same teams. Same tools. A smarter way to build.</p></div>
</div></section>

<section class="sec alt" id="classes"><div class="w">
  <div class="head"><div>${lbl('Built across asset classes')}<h2 class="h2 rv">One intelligence. <em>Every kind of build.</em></h2></div><p class="lead rv">Biltflow adapts to the way different assets are developed, designed, procured, built and operated.</p></div>
  <div class="tiles">${CLASSES.map(([t, d, f]) => `<article class="tile rv"><div class="im"><img src="${B(f)}" alt="${esc(t)}" loading="lazy"></div><div class="tx"><h3>${esc(t)}</h3><p>${esc(d)}</p></div></article>`).join('')}</div>
  <p class="note rv">Different buildings. Different complexity. One connected intelligence.</p>
</div></section>

<section class="sec"><div class="w">
  <div class="head"><div>${lbl('Built for people who build')}<h2 class="h2 rv">Your expertise. <em>Amplified by intelligence.</em></h2></div><p class="lead rv">Biltflow puts AI behind the people who know construction best — connecting knowledge, automating the repetitive and acting when you want it to. Your people stay in control.</p></div>
  <div class="metrics rv"><div><b>6</b><span>Lifecycle stages. One connected intelligence.</span></div><div><b>100+</b><span>Specialist AI agents. One coordinated workforce.</span></div><div><b>90+</b><span>Systems connected. Plus Biltflow native.</span></div><div><b>Global</b><span>Built to operate across markets, projects and portfolios.</span></div></div>
</div></section>

<section class="sec alt vcta"><div class="w">${lbl('A more intelligent built world')}<h2 class="h2 rv">Build what’s next. <em>With intelligence built in.</em></h2><p class="lead rv">One connected intelligence across every stage, every project and every asset class. Smarter projects. Stronger portfolios. A brighter tomorrow.</p><div class="btns rv"><a class="btn ext" href="${LIVE}" target="_blank" rel="noopener">Book a walkthrough</a><a class="btn ghost" href="/portfolio/biltflow/">Biltflow at Hunt Global</a></div></div></section>`
  });
}

/* =========================== REPLAICE =========================== */
{
  const id = 'replaice', R = f => A(id, f), LIVE = 'https://replaice.ai/';
  const PRODUCTS = [
    { k: 'Construction & compliance OS', t: 'BiltFlow', s: 'The intelligent operating system for construction.', p: 'Connect feasibility, drawings and takeoff with procurement, project delivery, claims and reporting.', f: ['BOQ Engine & Estimator', 'Vault & ProcureFlow', 'Pulse, PayFlow & ResourceFlow'], href: '/ventures/biltflow/', img: R('biltflow-feasibility.webp'), flowCap: 'BiltFlow workflow', flow: ['Feasibility — assess the site before committing', 'Vault — review drawing revisions', 'Pulse + ProcureFlow — review schedule and tender impacts', 'ResourceFlow — match workforce capacity to demand'] },
    { k: 'Physical AI & robotics', t: 'NorthStar', s: 'See more. Detect earlier. Act smarter.', p: 'Use drones, robotics and visual AI to inspect physical sites and connect observations to project records.', f: ['Autonomous inspection', 'Visual risk detection', 'Drawing & schedule links'], href: 'https://northstar.biltflow.com', flowCap: 'NorthStar workflow · illustrative data', flow: ['Start drone inspection · Zone B', 'Scan facade and flag deviation', 'Compare against the baseline', 'Link observation to drawing and schedule'], extra: 'Drone · Humanoid · Quadruped · AI & IoT enabled smart wearable' },
    { k: 'Enterprise knowledge intelligence', t: 'HybridRAG Agent', s: 'Give every agent the context it needs.', p: 'Turn documents, data and institutional knowledge into grounded context for enterprise AI.', f: ['Multimodal ingestion', 'Vector, graph & BM25 retrieval', 'MCP & API integration'], href: 'https://hybridragagent.com', flowCap: 'How it grounds answers', flow: ['ETL for AI data — cleanse and process images, documents, and connected data sources', 'Structure them into datasets that preserve meaning for retrieval', 'High-precision hybrid search — vector, BM25 full-text and tensor retrieval', 'Custom scoring and reranking select the most relevant context'] },
    { k: 'Autonomous IT & customer support', t: 'Replaice Desk', s: 'Resolve requests across every channel.', p: 'Handle Level 1 support and assist Level 2 teams across voice, messaging, email and web.', f: ['Omnichannel intake', 'Knowledge-backed resolution', 'Smart escalation & human handoff'], href: 'https://desk.dev.replaice.co/', flowCap: 'Replaice Desk workflow · illustrative data', flow: ['Receive account access request', 'Classify ticket and retrieve policy', 'Execute authorized reset workflow', 'Close ticket or route exception to an agent'] },
    { k: 'Secure document intelligence', t: 'Janavy', s: 'Protect documents and govern access.', p: 'Share sensitive files and manage agreement workflows with controlled access and audit visibility.', f: ['Secure document sharing', 'NDA and agreement workflows', 'Document analytics'], href: 'https://janavy.com', flowCap: 'Janavy workflow · illustrative data', flow: ['Upload confidential agreement', 'Configure viewer access and NDA', 'Record authorized recipient view', 'Update document activity history'] },
    { k: 'Agentic omnichannel engagement', t: 'Engage', s: 'Coordinate every customer journey.', p: 'Personalize outreach across email, WhatsApp, SMS, voice and digital channels.', f: ['Real-time segmentation', 'Journey orchestration', 'AI personalization'], href: 'https://engage.dev.replaice.co/', flowCap: 'Engage workflow · illustrative data', flow: ['Customer enters renewal segment', 'Agent selects the next action', 'Send WhatsApp and schedule email follow-up', 'Adapt journey to the customer response'] },
    { k: 'Agentic AI for healthcare', t: 'ReplaiceCare', s: 'Connected Intelligence. Coordinated Care. Better Outcomes.', p: 'ReplaiceCare unifies fragmented clinical, operational, and administrative systems through specialized AI agents. It connects healthcare data, coordinates multistep workflows, and helps providers and health plans reduce administrative burden while preserving human oversight.', f: ['Clinical and Operational Intelligence', 'EHR and Payer System Integration', 'Patient Access and Care Coordination', 'Claims and Revenue Cycle Automation', 'Healthcare Knowledge and Guidelines', 'Governed Agentic Workflows'], href: 'https://replaice.ai/platform/replaicecare', flowCap: 'Authorized sources · fictional demo', flow: ['Electronic Health Record', 'Billing System', 'Payer Platform', 'Clinical Guidelines', 'Approved Regulatory Data'] }
  ];
  out[id] = shell({ id, theme: '#071029', title: 'Replaice — Enterprise Agentic AI & Physical AI Platforms', desc: 'Replaice transforms enterprise expertise, data, and operational complexity into intelligent action, powered by Agentic AI & Physical AI.',
    logo: `<img src="${R('logo.png')}" alt="Replaice">`,
    nav: [['#platforms', 'Platforms'], ['#what', 'What we do'], ['#security', 'Security'], ['#solutions', 'Solutions']],
    cta: ['https://replaice.ai/contact/', 'Request a demo'],
    foot: { tag: 'Enterprise Agentic AI + Physical AI. Specialized platforms for construction, robotics, compliance, enterprise knowledge, customer support, engagement and healthcare.', links: [['#platforms', 'Platforms'], ['#solutions', 'Solutions'], ['#security', 'Security'], ['https://replaice.ai/contact/', 'Contact'], ['https://replaice.ai/privacy/', 'Privacy'], ['https://replaice.ai/terms/', 'Terms']], copy: '© 2026 Replaice Technologies · A Hunt Global company', site: LIVE },
    body: `
<section class="vhero sec deep" style="padding-top:clamp(70px,10vw,140px)"><div class="w grid">
  <div>${lbl('Enterprise Agentic AI + Physical AI')}
    <h1 class="h1 rv">From Enterprise Complexity to <em>Intelligent Action.</em></h1>
    <p class="lead rv"><strong style="color:#fff">Powered by Agentic AI &amp; Physical AI.</strong> Replaice transforms enterprise expertise, data, and operational complexity into intelligent action. Our specialized AI platforms combine enterprise knowledge, autonomous agents, and physical intelligence to help organizations adopt AI, orchestrate mission-critical workflows, and accelerate business transformation.</p>
    <div class="btns rv"><a class="btn" href="#platforms">Explore our platforms</a><a class="btn ghost ext" href="https://replaice.ai/contact/" target="_blank" rel="noopener">Talk to our AI team</a></div>
  </div>
  <div class="media rv">${dstack([R('biltflow-vault.webp'), R('biltflow-feasibility.webp'), R('biltflow-pulse.webp')], 'ds-hero', 'Replaice platform screens: Vault drawing review, Feasibility and Pulse')}</div>
</div></section>

<section class="sec"><div class="w">
  <div class="metrics m3 rv">
    <div><b>7</b><span>Specialized AI platforms</span></div><div><b>40+</b><span>Distinct language models</span></div><div><b>110 hours</b><span>Saved per user per year</span></div>
    <div><b>275+</b><span>Work app and data source connections</span></div><div><b>3+ billion</b><span>Cumulative searches across documents and knowledge objects</span></div><div><b>99.9%+</b><span>Uptime across core search and AI services</span></div>
  </div>
  <p class="note">Illustrative enterprise AI benchmarks, as published by Replaice.</p>
</div></section>

<section class="sec deep" id="architecture"><div class="w split">
  <div>${lbl('Replaice platform architecture')}<h2 class="h2 rv">One platform. <em>Four layers.</em></h2><p class="lead rv">Illustrative enterprise systems and data flow — from ERP and CRM up to your enterprise AI co-worker.</p><div style="margin-top:34px"><div class="stack rv" style="max-width:560px" aria-label="Replaice platform architecture">
    <div class="layer top"><b>Replaice AI Agent</b><span>Your enterprise AI co-worker.</span></div>
    <div class="layer"><b>Replaice Intelligence</b><span>Orchestrate AI for enterprise work.<small>Task routing · AI usage controls · Model access · APIs &amp; MCP</small></span></div>
    <div class="layer"><b>Replaice Enterprise Context</b><span>Ground AI in the people, knowledge, and systems behind your work.</span></div>
    <div class="layer"><b>Replaice Governance</b><span>Set boundaries for enterprise AI.<small>Permissions · Agent guardrails · Human approvals · Audit history</small></span></div>
    <div class="layer sys"><span>ERP</span><span>CRM</span></div>
  </div></div></div>
  <div class="media rv">${dstack([R('biltflow-resourceflow.webp'), R('hybrid-search.webp')], 'ds-hero', 'ResourceFlow and HybridRAG search screens')}</div>
</div></section>

<section class="sec alt" id="what"><div class="w">
  <div class="head"><div>${lbl('What we do')}<h2 class="h2 rv">Enterprise intelligence. <em>Built around your business.</em></h2></div><p class="lead rv">Replaice combines enterprise technology expertise with purpose-built AI platforms to help organizations move from experimentation to intelligent, autonomous operations.</p></div>
  <div class="cards">
    <div class="card rv"><span class="k">Enterprise AI transformation</span><h3 class="h3">Turn institutional knowledge into production-ready intelligence.</h3><p>Transform enterprise data, workflows and expertise into secure AI systems.</p>${ul(['Discover high-impact AI opportunities', 'Connect business knowledge, applications and models', 'Deploy governed workflows and measure performance'])}</div>
    <div class="card rv"><span class="k">Agentic AI platforms</span><h3 class="h3">Put intelligence to work.</h3><p>Automate complex processes and coordinate execution across enterprise systems.</p>${ul(['Specialized enterprise AI for operational workflows', 'Agents that plan and take authorized actions', 'Cross-system orchestration with human oversight'])}</div>
    <div class="card rv"><span class="k">Physical AI & robotics</span><h3 class="h3">Bring intelligence into the real world.</h3><p>NorthStar combines drones, robotics, computer vision and agents to optimize physical operations.</p>${ul(['Autonomous site capture and analysis', 'Visual detection of progress, quality and safety issues', 'Evidence linked to drawings, quantities and schedules'])}</div>
  </div>
</div></section>

<section class="sec" id="platforms"><div class="w">
  <div class="head"><div>${lbl('The Replaice product ecosystem')}<h2 class="h2 rv">Purpose-built AI. <em>Enterprise-wide impact.</em></h2></div><p class="lead rv">Seven specialized AI platforms for construction, robotics, compliance, enterprise knowledge, customer support, engagement and healthcare.</p></div>
  <div class="prods">${PRODUCTS.map(p => `<article class="prod rv">
    <div><span class="k">${esc(p.k)}</span><h3>${esc(p.t)}</h3><h4>${esc(p.s)}</h4><p>${esc(p.p)}</p>${ul(p.f)}<a class="btn${p.href.startsWith('http') ? ' ext' : ''}" href="${p.href}"${p.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>Explore ${esc(p.t)}</a></div>
    <div class="pm">${p.img ? `<img src="${p.img}" alt="${esc(p.t)} interface" loading="lazy" style="margin-bottom:16px">` : ''}<p class="cap">${esc(p.flowCap)}</p><ol class="flow">${p.flow.map(x => `<li>${esc(x)}</li>`).join('')}</ol>${p.extra ? `<p class="note">${esc(p.extra)}</p>` : ''}</div>
  </article>`).join('')}</div>
</div></section>

<section class="sec deep" id="security"><div class="w">
  <div class="head"><div>${lbl('Enterprise security')}<h2 class="h2 rv">Keep enterprise AI <em>under control.</em></h2></div><p class="lead rv">Give AI agents the access they need, define when a person must approve an action, and keep a record of what happened.</p></div>
  <div class="cards">
    <div class="card rv" style="background:transparent"><span class="k">Permission-aware access</span><p>Use access rules to define which data and actions are available to users and AI agents.</p></div>
    <div class="card rv" style="background:transparent"><span class="k">Workflow observability</span><p>Review agent activity, workflow outcomes, exceptions, and audit history.</p></div>
    <div class="card rv" style="background:transparent"><span class="k">Data and action governance</span><p>Set operating boundaries and route sensitive actions to people for approval.</p></div>
  </div>
  <div class="metrics rv" style="margin-top:56px"><div><b style="font-size:clamp(26px,2.4vw,36px)">ISO/IEC 27001</b><span>Information security management</span></div><div><b style="font-size:clamp(26px,2.4vw,36px)">SOC 2</b><span>Independent controls reporting</span></div><div><b style="font-size:clamp(26px,2.4vw,36px)">HIPAA</b><span>Health information safeguards</span></div><div><b style="font-size:clamp(26px,2.4vw,36px)">GDPR</b><span>Personal data protection</span></div></div>
  <p class="note">Standards for your security review — discuss applicable requirements and available assurance documentation for your deployment.</p>
</div></section>

<section class="sec alt" id="solutions"><div class="w">
  <div class="head"><div>${lbl('Solutions')}<h2 class="h2 rv">Find the right <em>enterprise AI solution.</em></h2></div></div>
  <div class="cards c2">
    <a class="card rv" href="https://replaice.ai/solutions/enterprise-ai/" target="_blank" rel="noopener"><span class="k">Enterprise AI</span><h3 class="h3">Enterprise AI platforms and implementation services</h3><p>Replaice helps enterprises select AI use cases, connect business data and applications, and deploy governed agentic workflows.</p></a>
    <a class="card rv" href="https://replaice.ai/solutions/construction-ai/" target="_blank" rel="noopener"><span class="k">Construction AI</span><h3 class="h3">AI platform for construction operations</h3><p>BiltFlow is Replaice’s construction AI platform for feasibility, drawing review, quantity takeoff, procurement, project scheduling, claims and reporting.</p></a>
    <a class="card rv" href="https://replaice.ai/solutions/agentic-ai/" target="_blank" rel="noopener"><span class="k">Agentic AI</span><h3 class="h3">Agentic AI solutions and implementation</h3><p>Replaice designs agentic AI workflows that use enterprise knowledge, coordinate tasks across applications and take authorized actions with human oversight.</p></a>
    <a class="card rv" href="https://replaice.ai/solutions/ai-customer-support-it-helpdesk/" target="_blank" rel="noopener"><span class="k">Support & IT</span><h3 class="h3">Agentic AI for customer support and IT help desks</h3><p>Replaice Desk handles customer service and IT support requests across voice, email, messaging and web. It supports autonomous Level 1 resolution and escalation to Level 2 teams.</p></a>
  </div>
</div></section>

<section class="sec vcta"><div class="w">${lbl('Get started')}<h2 class="h2 rv">Your enterprise is ready for <em>intelligent action.</em></h2><p class="lead rv">Build connected operations with specialized agentic platforms.</p><div class="btns rv"><a class="btn ext" href="https://replaice.ai/contact/" target="_blank" rel="noopener">Request a demo</a><a class="btn ghost" href="/portfolio/replaice-technologies/">Replaice at Hunt Global</a></div></div></section>`
  });
}

/* =========================== HUNTJOBS =========================== */
{
  const id = 'huntjobs', H = f => A(id, f), LIVE = 'https://huntjobs.ai/';
  const PLAY = 'https://play.google.com/store/apps/details?id=com.huntapp.india', IOS = 'https://apps.apple.com/in/app/hunt-jobs/id6504902709';
  const TRADES = ['Construction Laborer', 'Carpenter', 'Mason / Bricklayer', 'Electrician', 'Plumber', 'Welder / Metalworker', 'Painter', 'Roofer', 'HVAC Technician', 'Appliance Repair Technician', 'Heavy Equipment Operator', 'Machine Operator', 'Industrial Maintenance Technician', 'Quality Control Inspector', 'Forklift Operator', 'Warehouse Worker / Packer', 'Truck Driver', 'Delivery Courier', 'Factory Assembler', 'Mechanic', 'Machinist', 'CNC Technician', 'Telecom Installer', 'Mining / Quarry Worker', 'Food Processing Worker', 'Field Sales Agent', 'Pharmacy Technician'];
  const TRADES2 = ['IT Technician', 'Medical Technician', 'Paramedic / EMS', 'Dental Assistant', 'Automotive Engineer Technician', 'Drone Operator', 'Solar / Renewable Energy Technician', 'Semiconductor Technician', 'CAD Technician / Drafter', 'Flight Attendant / Pilot', 'Chef / Cook', 'Lab Technician', 'Security Officer', 'Firefighter', 'School Administrator / Educator', 'Customer Support / BPO Executive', 'Data Entry Operator'];
  const NAMES = ['Samsung Electronics', 'Hyundai Motor Company', 'Foxconn', 'Rio Tinto', 'Bosch', 'Nestlé', 'Sony', 'Volkswagen Group', 'Toyota Motor', 'Mitsubishi', 'Siemens', 'Mercedes-Benz Group', 'Saudi Aramco', 'Vedanta', 'Enel', 'Eni'];
  const QUOTES = [['Neha Sharma', 'Marketing Executive, Pune', 'I was struggling to find relevant job openings until I tried HuntJobs.ai. The recommendations matched my skills perfectly, and within two weeks, I landed interviews with three companies and accepted an offer aligned with my career goals.'], ['Ravi Kumar', 'Software Developer, Bengaluru', 'HuntJobs.ai stood out with its user-friendly interface and smart filters. I uploaded my resume, and the AI instantly suggested roles that suited my experience. I secured a position at a leading tech firm.'], ['Meena Devi', 'Customer Support Associate, Patna', 'Having limited experience with job portals, I found HuntJobs.ai simple to use. The step-by-step guidance helped me build my profile and apply with confidence. I received interview calls quickly.'], ['Anil Mehta', 'Sales Manager, Delhi', 'The personalized job suggestions really impressed me. The application tracking feature made follow-ups easy, and I was hired within a month.'], ['Rajesh Kumar', 'CCTV Installation Technician, Delhi', 'After completing my ITI in electronics, HuntJobs.ai connected me with multiple security companies. I secured a job paying ₹18,000 monthly.'], ['Radha', 'Store Keeper, Mumbai', 'HuntJobs.ai helped me transition from unorganized retail to a structured warehouse operation. I now enjoy proper benefits and regular hours at ₹16,000 per month.']];
  const marq = (l, cls = '') => `<div class="marq${cls ? ' ' + cls : ''}" aria-label="${cls.includes('names') ? 'Companies' : 'Roles'}"><div class="tr">${[...l, ...l].map((x, i) => `<span${i >= l.length ? ' aria-hidden="true"' : ''}>${esc(x)}</span>`).join('')}</div></div>`;
  out[id] = shell({ id, theme: '#ffffff', title: 'HuntJobs — Your next opportunity, delivered in a heartbeat', desc: 'An AI-powered jobs marketplace matching professionals with employers. Find verified jobs, or find your next hire.',
    logo: `<span class="hjlogo"><i aria-hidden="true">H</i><span>hunt<b>jobs</b>.ai</span></span>`,
    nav: [['#seekers', 'Find a job'], ['#recruiters', 'For recruiters'], ['#how', 'How it works'], ['#stories', 'Stories']],
    cta: [LIVE, 'Start now for free'],
    foot: { tag: 'Your next opportunity, delivered in a heartbeat. An AI-powered jobs marketplace — on the App Store and Google Play.', links: [['https://huntjobs.ai/for-recruiters', 'For recruiters'], ['https://huntjobs.ai/blogs', 'Blogs'], ['https://huntjobs.ai/faqs', 'FAQs'], ['https://huntjobs.ai/contact', 'Contact'], ['https://www.linkedin.com/company/huntjobs/', 'LinkedIn'], ['https://www.instagram.com/huntjobs.ai/', 'Instagram'], ['https://huntjobs.ai/privacy-policy', 'Privacy'], ['https://huntjobs.ai/terms-and-conditions', 'Terms']], copy: '© 2026 HuntJobs.ai · A Hunt Global company', site: LIVE },
    body: `
<section class="vhero"><div class="w grid">
  <div>${lbl('AI · Talent marketplace')}
    <h1 class="h1 rv">Your next opportunity. <em>Delivered in a heartbeat.</em></h1>
    <p class="lead rv">You’re not just browsing jobs. You’re searching for a real match — where your expertise is valued, your craft is respected, and your next step is a leap forward.</p>
    <div class="btns rv"><a class="btn ext" href="${LIVE}" target="_blank" rel="noopener">Find your next job</a><a class="btn ghost ext" href="https://huntjobs.ai/for-recruiters" target="_blank" rel="noopener">Find your next hire</a></div>
    <div class="badges rv"><a href="${IOS}" target="_blank" rel="noopener">&#63743; App Store</a><a href="${PLAY}" target="_blank" rel="noopener">&#9654; Google Play</a></div>
  </div>
  <div class="media rv"><img src="${H('hero-mobile.webp')}" alt="HuntJobs app showing a matched delivery partner role"></div>
</div></section>

<section class="sec alt band"><div class="w split">
  <div>${lbl('AI matching')}<h2 class="h2 rv">A real match. <em>In a heartbeat.</em></h2><p class="lead rv">Our platform uses AI to match your skills and experience with the best job opportunities — and surfaces hidden talent recruiters might otherwise miss.</p></div>
  <div class="media rv">${dstack([H('hero-mobile.webp')], 'ds-phone', 'The HuntJobs app matching a delivery partner role')}</div>
</div></section>

<section class="sec" style="padding:clamp(40px,5vw,70px) 0"><div class="w"><p class="lbl" style="justify-content:center;display:flex">Get hired by top companies worldwide</p></div>${marq(NAMES, 'names')}</section>

<section class="sec alt" id="seekers"><div class="w">
  <div class="cards c2">
    <div class="card rv"><span class="k">Got talent?</span><h3 class="h2" style="font-size:clamp(30px,3.4vw,52px)">Why job seekers love us</h3>${ul(['Connect directly with hiring managers and founders — no middlemen, just real opportunities.', 'See everything upfront: salary, perks, and company details before you apply.', 'Skip the cover letters — your profile is your application. Apply in one click.', 'Discover exclusive jobs that you won’t find anywhere else.'])}<p><a class="btn ext" href="${LIVE}" target="_blank" rel="noopener">Find your next job</a></p></div>
    <div class="card rv" id="recruiters"><span class="k">Need talent?</span><h3 class="h2" style="font-size:clamp(30px,3.4vw,52px)">Why recruiters love us</h3>${ul(['Instantly access a curated network of skilled, job-ready candidates — no endless searching or outdated resumes.', 'Launch your hiring campaign in minutes: create branded job posts, set your requirements, and let our AI handle the rest.', 'Enjoy seamless applicant tracking, built-in chat for real-time communication, and effortless interview scheduling — all in one place.', 'Our intelligent AI matches you with candidates who fit your needs, even surfacing hidden talent you might otherwise miss.'])}<p><a class="btn ext" href="https://huntjobs.ai/for-recruiters" target="_blank" rel="noopener">Find your next hire</a></p></div>
  </div>
</div></section>

<section class="sec"><div class="w split">
  <div>${lbl('For recruiters')}<h2 class="h2 rv">Find top talent, <em>faster and smarter.</em></h2><p class="lead rv">Post jobs and access a pool of qualified candidates, powered by AI and modern recruitment tools.</p>
    <ul class="ticks rv"><li>AI-driven job matching and candidate filtering</li><li>Customizable job posting templates, including AI-generated job descriptions</li><li>Advanced applicant tracking and communication tools</li><li>Access to a community of top-tier trades professionals</li></ul></div>
  <div><p class="lbl">#1 platform to hire or get hired</p>${marq(TRADES)}${marq(TRADES2, 'rev')}</div>
</div></section>

<section class="sec alt" id="how"><div class="w">
  <div class="head"><div>${lbl('Swipe into your future')}<h2 class="h2 rv">Transform your job search with <em>AI-powered precision.</em></h2></div></div>
  <ol class="steps">
    <li class="rv"><h3>Tailored job matches instantly</h3><p>Our platform uses AI to match your skills and experience with the best job opportunities in the skilled trades.</p></li>
    <li class="rv"><h3>Effortless application and profile creation</h3><p>Your profile is reviewed and matched to suitable roles. Our intelligent screening process ensures you’re considered for the best-fit opportunities.</p></li>
    <li class="rv"><h3>Smart resume building and optimization</h3><p>Engage with employers through video interviews and personalized interactions. Receive timely updates and feedback throughout the hiring process.</p></li>
    <li class="rv"><h3>Seamless interview scheduling and communication</h3><p>Get selected and receive offers directly through the platform. Accept, negotiate, and onboard with ease.</p></li>
    <li class="rv"><h3>Empowered career growth with AI insights</h3><p>Get selected and receive offers directly through the platform. Accept, negotiate, and onboard with ease.</p></li>
  </ol>
</div></section>

<section class="sec" id="stories"><div class="w">
  <div class="head"><div>${lbl('Stories')}<h2 class="h2 rv">Why job seekers choose <em>HuntJobs.ai</em></h2></div></div>
  <div class="quotes">${QUOTES.map(([n, r, q]) => `<figure class="quote rv" style="margin:0"><p>“${esc(q)}”</p><figcaption><b>${esc(n)}</b><span>${esc(r)}</span></figcaption></figure>`).join('')}</div>
</div></section>

<section class="sec deep vcta"><div class="w">${lbl('Ready for your next move?')}<h2 class="h2 rv">Hire or get hired. <em>In a heartbeat.</em></h2><p class="lead rv">Download HuntJobs on the App Store and Google Play, or start on the web for free.</p><div class="btns rv"><a class="btn ext" href="${LIVE}" target="_blank" rel="noopener">Start now for free</a><a class="btn ghost ext" href="${PLAY}" target="_blank" rel="noopener">Google Play</a><a class="btn ghost ext" href="${IOS}" target="_blank" rel="noopener">App Store</a></div></div></section>`
  });
}

/* =========================== TRIBE =========================== */
{
  const id = 'tribe', T = f => A(id, f), LIVE = 'https://tribeapp.com.au/';
  const IOS = 'https://apps.apple.com/in/app/tribe-mvp/id6796440341', PLAY = 'https://play.google.com/store/apps/details?id=com.tribe.user.app.dev';
  const HOODS = [['Harris Park', '2150', true], ['Merrylands', '2160', true], ['Erskineville', '2043', false], ['Waterloo', '2017', false], ['St Leonards', '2065', false], ['St Peters', '2044', false], ['Ashfield', '2131', false]];
  out[id] = shell({ id, theme: '#f4f1ec', title: 'Tribe — A place to belong, not just a place to live', desc: 'The AI-powered operating and lifestyle platform for modern rental communities — connecting leasing, residents, property teams and neighbourhood services through one intelligent experience.',
    logo: `<span style="font:700 26px/1 var(--f);letter-spacing:-.04em">tribe<span style="color:var(--acc)">.</span></span>`,
    nav: [['#rent', 'Rent and rewards'], ['#hoods', 'Tribehoods'], ['#sarah', 'Ask Sarah'], ['#app', 'The app']],
    cta: [LIVE, 'Find my home'],
    foot: { tag: 'A place to belong, not just a place to live. Rent and Rewards across Sydney’s Tribehoods.', links: [['#rent', 'Rent and rewards'], ['#hoods', 'Tribehoods'], ['#app', 'The app'], ['https://tribeapp.com.au/tribev6/terms', 'Terms'], ['https://tribeapp.com.au/tribev6/privacy', 'Privacy']], copy: '© 2026 Tribe · A Hunt Global company', site: LIVE },
    body: `
<section class="vhero" style="padding-bottom:clamp(80px,10vw,140px)"><div class="w grid">
  <div>${lbl('Rent with Tribe')}
    <h1 class="h1 rv">live well. <em>When you rent with Tribe.</em></h1>
    <p class="lead rv">A place to belong, not just a place to live. Tribe brings the entire rental journey into one connected platform — from property discovery and applications to leasing, payments, maintenance, amenities and everyday resident services.</p>
    <div class="btns rv"><a class="btn ext" href="${LIVE}" target="_blank" rel="noopener">Find my Tribe home</a><a class="btn ghost" href="#sarah">Ask Sarah</a></div>
  </div>
  <div class="media rv" style="min-height:520px">
    <div class="photos" aria-hidden="true"><img src="${T('party-1200.webp')}" alt="" style="width:38%;aspect-ratio:4/5;left:0;top:0"><img src="${T('bbq-1200.webp')}" alt="" style="width:30%;aspect-ratio:1;right:2%;top:2%"><img src="${T('supper-1200.webp')}" alt="" style="width:34%;aspect-ratio:4/3;left:4%;bottom:0"><img src="${T('movie-1200.webp')}" alt="" style="width:28%;aspect-ratio:3/4;right:0;bottom:4%"></div>
    <div class="chat" id="sarah" style="position:relative;top:70px">
      <div class="chat-h"><i>S</i><div><b>Sarah</b><span>Tribe’s AI concierge · available 24x7</span></div></div>
      <ul><li>How do I get my bond back?</li><li>Can I bring my dog?</li><li>Urgent repairs?</li></ul>
      <div class="opts"><span>Studio</span><span>1 bed</span><span>2 bed</span><span>3 bed</span><span>Pool</span><span>Parking</span><span>Furnished</span></div>
      <div class="in">Where do you want to live?<b aria-hidden="true">&uarr;</b></div>
    </div>
  </div>
</div></section>

<section class="sec deep"><div class="w split">
  <p class="statement rv"><span>Move in faster.</span><span>Real rewards.</span><span>Take back control.</span><span>Join the movement.</span></p>
  <div><p class="lead rv">Built around an AI-first operating model, Tribe connects residents, property teams and neighbourhood partners through intelligent workflows and a unified digital experience.</p><p class="lead rv" style="margin-top:18px">Residents can manage their home, access building services, book amenities, raise maintenance requests and discover nearby services from one place.</p></div>
</div></section>

<section class="sec band"><div class="w">
  <div class="head"><div>${lbl('Tribehoods')}<h2 class="h2 rv">A place to belong, <em>not just a place to live.</em></h2></div><p class="lead rv">Homes, buildings and the neighbourhood around them — connected in one place, with Sarah on hand 24x7.</p></div>
  ${sphere(['party-1200.webp', 'bbq-1200.webp', 'supper-1200.webp', 'movie-1200.webp', '012-1200.webp', '008.webp', '058.webp', 'hero-15.webp', 'hero-25.webp', 'hero-30.webp', 'parramatta-1-1200.webp', 'merrylands-2-1200.webp', 'mason-and-main-merrylands.webp', 'the-erskineville-village.webp', 'nation-parramatta-city.webp'].map(T), 'hood-3d', 'An orbit sphere of Tribe residents, buildings and neighbourhoods — drag to turn it')}<p class="note" style="text-align:center">Drag to explore the Tribehoods</p>
</div></section>

<section class="sec" id="rent"><div class="w">
  <div class="head"><div>${lbl('Rent and rewards')}<h2 class="h2 rv">The people who <em>make it home.</em></h2></div><p class="lead rv">Tribe buildings where renting comes with rewards.</p></div>
  <div class="hoods">
    <article class="hood rv"><div class="im"><img src="${T('parramatta-1-1200.webp')}" alt="Harris Park" loading="lazy"></div><div class="tx"><div><small>Rent and rewards · 2150</small><h3>Harris Park</h3></div><span class="pill live">Renting now</span></div></article>
    <article class="hood rv"><div class="im"><img src="${T('mason-and-main-merrylands.webp')}" alt="Mason &amp; Main, Merrylands" loading="lazy"></div><div class="tx"><div><small>Mason &amp; Main · 2160</small><h3>Merrylands</h3></div><span class="pill live">Renting now</span></div></article>
    <article class="hood rv"><div class="im"><img src="${T('the-erskineville-village.webp')}" alt="The Erskineville Village" loading="lazy"></div><div class="tx"><div><small>The Erskineville Village · 2043</small><h3>Erskineville</h3></div><span class="pill">Coming soon</span></div></article>
  </div>
</div></section>

<section class="sec alt" id="hoods"><div class="w split">
  <div>${lbl('Tribehoods')}<h2 class="h2 rv">Find your <em>Tribe.</em></h2><p class="lead rv">Where you live is just the beginning. Discover the neighbourhoods, people and places that make you feel like you belong.</p>
    <div class="metrics rv" style="grid-template-columns:1fr 1fr;margin-top:34px"><div><b>2</b><span>Tribehoods live</span></div><div><b>6</b><span>Coming soon</span></div></div>
    <div class="hoodlist rv">${HOODS.map(([n, pc, live]) => `<span${live ? ' class="live"' : ''}>${n} ${pc}</span>`).join('')}</div></div>
  <div class="rv">
    <div class="tile" style="border-radius:22px"><div class="im" style="aspect-ratio:16/11"><img src="${T('merrylands-2-1200.webp')}" alt="Harris Park neighbourhood" loading="lazy"></div>
    <div class="tx" style="padding:26px"><p class="lbl" style="margin-bottom:10px">Harris Park · Charlie Parker</p><h3 style="font-size:26px">Parramatta’s CBD on one side, the river on the other.</h3><p style="margin-top:8px">And a station you can walk to before your coffee goes cold. Station ~5 min · Renting now · 4 local picks.</p>
    <p class="lbl" style="margin:22px 0 0">In the building</p><div class="amen">${['Study nook', 'Pool', 'Gym', 'Cinema', 'Outdoor terrace', 'Sauna', 'Co-working lounge', 'Secure parking', 'Private dining room'].map(a => `<span>${a}</span>`).join('')}</div></div></div>
  </div>
</div></section>

<section class="sec" id="app"><div class="w split">
  <div>${lbl('In the app')}<h2 class="h2 rv">Your Tribe concierge <em>in your pocket.</em></h2><p class="lead rv">Speak to Sarah. Tell her how you want to live. She answers straight — and remembers. Only what fits you, your neighbourhood, member priced.</p>
    <div class="btns rv" style="margin-top:30px"><a class="btn ext" href="${IOS}" target="_blank" rel="noopener">App Store</a><a class="btn ghost ext" href="${PLAY}" target="_blank" rel="noopener">Google Play</a></div></div>
  <div class="cards c2 rv">
    <div class="card"><span class="k">For residents</span><p>Manage your home, access building services, book amenities, raise maintenance requests and discover nearby services from one place.</p></div>
    <div class="card"><span class="k">For property teams</span><p>Greater automation, visibility and operational control, with integrated AI assistants working across leasing, resident support and property operations.</p></div>
  </div>
</div></section>

<section class="sec alt vcta"><div class="w">${lbl('Your Tribe, unlocked')}<h2 class="h2 rv">This is what renting was always <em>supposed to feel like.</em></h2><div class="btns rv" style="margin-top:34px"><a class="btn ext" href="${LIVE}" target="_blank" rel="noopener">Find my Tribe home</a><a class="btn ghost" href="/portfolio/tribe/">Tribe at Hunt Global</a></div></div></section>`
  });
}

for (const [id, html] of Object.entries(out)) { mkdirSync(`ventures/${id}`, { recursive: true }); writeFileSync(`ventures/${id}/index.html`, html); }
console.log('built', Object.keys(out).length, 'company sites:', Object.keys(out).join(', '));
