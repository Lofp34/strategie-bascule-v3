// =============================================
// strategie-bascule-v3 — Édition Premium
// Guide pas à pas avec UX/UI de luxe
// =============================================

// ── State ──────────────────────────────────────
const STORAGE_KEY = 'strate…e-v3';

const defaultState = {
  currentStep: 0,
  completedSteps: [],
  theme: 'dark',
  diagnostic: {
    currentVoter: 'laurent', // 'laurent' | 'lilian'
    laurent: { q1: null, q2: null, q3: null, q4: null, q5: null },
    lilian:  { q1: null, q2: null, q3: null, q4: null, q5: null },
  },
  roadmapChecks: {},
  actionChecks: {},
};

let state = loadState();
let confettiRAF = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch (e) {}
  return { ...defaultState };
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}

// ── Data ───────────────────────────────────────
const data = {
  ecosystem: {
    title: 'Écosystème Agent', subtitle: '11 agents en 3 couches interconnectées',
    layers: [
      { id: 'infrastructure', name: 'Infrastructure', icon: '⚙️', color: '#3b82f6',
        agents: [
          { name: 'CRM Manager', role: 'Base de données clients/deals/tâches', maturity: 'robuste', label: 'Robuste' },
          { name: 'Main / ClawdIA', role: 'Orchestrateur, conseil stratégique', maturity: 'robuste', label: 'Robuste' },
          { name: 'Workspace Cleaner', role: 'Maintenance workspaces', maturity: 'fonctionnel', label: 'Fonctionnel' },
        ]},
      { id: 'production', name: 'Production Commerciale', icon: '🏭', color: '#FF6B35',
        agents: [
          { name: 'Executive Assistant', role: 'Propositions, briefings, debriefs', maturity: 'fonctionnel', label: 'Fonctionnel' },
          { name: 'Sales-Coach', role: 'Analyse d\'appels, coaching', maturity: 'fonctionnel', label: 'Fonctionnel' },
          { name: 'Copywriter-Publisher', role: 'Articles, LinkedIn, voix Laurent', maturity: 'robuste', label: 'Robuste' },
          { name: 'Video Montage', role: 'Témoignages, sous-titres, YouTube', maturity: 'fonctionnel', label: 'Fonctionnel' },
          { name: 'Site Maintainer', role: 'SEO/GEO, laurentserre.com', maturity: 'fonctionnel', label: 'Fonctionnel' },
        ]},
      { id: 'prospection', name: 'Prospection & Relation', icon: '🎯', color: '#10b981',
        agents: [
          { name: 'Prospector', role: 'Veille LinkedIn des contacts CRM', maturity: 'emergent', label: 'Émergent' },
          { name: 'Target Hunter', role: 'Sourcing et ciblage', maturity: 'a-creer', label: 'À créer' },
          { name: 'Construct', role: 'Marque LSD Agents, site, catalogue', maturity: 'fonctionnel', label: 'Fonctionnel' },
        ]}
    ],
    clients: [
      { name: 'Flora Assistante Bot', client: 'Flora / audioprothésistes' },
      { name: 'MCB', client: 'Mon Coach Brico / Dimitri' },
    ],
    note: 'Tous les agents de production interagissent avec le CRM Manager via protocole @CRM'
  },
  bascule: {
    title: 'La Bascule', subtitle: 'De la formation commerciale à l\'écosystème d\'agents IA',
    past: { model: 'Formation classique', items: [
      { label: 'Modèle', desc: 'Prestations en présentiel, TJM limité' },
      { label: 'Scalabilité', desc: '1 formateur = N stagiaires max, contrainte physique' },
      { label: 'Récurrence', desc: 'Revenu one-shot, dépendance au cycle de vente' },
      { label: 'Effet de levier', desc: 'Temps = argent, pas d\'effet multiplicateur' },
    ]},
    future: { model: 'Écosystème d\'agents IA', items: [
      { label: 'Modèle', desc: 'Abonnements agents IA, revenu récurrent' },
      { label: 'Scalabilité', desc: 'N clients simultanés sans contrainte physique' },
      { label: 'Récurrence', desc: 'MRR prédictible, indépendant du temps' },
      { label: 'Effet de levier', desc: 'Code et agents qui travaillent 24/7' },
    ]},
    pillars: [
      { icon: '🧠', name: 'Expertise métier', desc: '20 ans de formation commerciale, connaissance terrain' },
      { icon: '🤖', name: 'Agents spécialisés', desc: 'Chaque agent excelle sur une tâche précise' },
      { icon: '📡', name: 'Infrastructure interconnectée', desc: 'CRM central, protocoles standardisés' },
      { icon: '🎓', name: 'Formation continue', desc: 'Les agents apprennent et s\'améliorent' },
    ]
  },
  roadmap: {
    title: 'Roadmap', subtitle: 'Les phases de la bascule — cochez chaque jalon',
    phases: [
      { id: 'p1', name: 'Phase 1 — Fondations', period: 'Avril-Mai 2026', status: 'en-cours', label: 'En cours', progress: 75, color: '#FF6B35',
        milestones: [
          { label: 'CRM unifié', detail: 'Schéma standardisé, tous les agents connectés' },
          { label: 'Protocole @CRM', detail: 'Format standard interactions agent→CRM' },
          { label: 'Workspace cleaner', detail: 'Maintenance automatique des workspaces' },
          { label: 'Design system', detail: 'Design tokens, composants cohérents' },
        ]},
      { id: 'p2', name: 'Phase 2 — Production', period: 'Juin-Août 2026', status: 'planifie', label: 'Planifié', progress: 10, color: '#3b82f6',
        milestones: [
          { label: 'Site LSD Agents', detail: 'Vitrine institutionnelle, catalogue d\'agents' },
          { label: 'Prospector optimisé', detail: 'Routine 8h, veille LinkedIn automatisée' },
          { label: 'Sales-Coach v2', detail: 'Dashboard enrichi, recommandations' },
          { label: 'Video Montage pipeline', detail: 'Workflow industrialisé, délai < 48h' },
          { label: 'Site laurentserre.com v2', detail: 'SEO/GEO, tunnel conversion' },
        ]},
      { id: 'p3', name: 'Phase 3 — Scale', period: 'Sept-Déc 2026', status: 'planifie', label: 'Planifié', progress: 0, color: '#10b981',
        milestones: [
          { label: 'Target Hunter actif', detail: 'Sourcing et ciblage automatisé' },
          { label: 'Agents clients x5', detail: 'Déploiement chez 5 nouveaux clients' },
          { label: 'Dashboard client', detail: 'Portail client pour suivre ses agents' },
          { label: 'Automatisation commerciale', detail: 'Devis→contrat→onboarding automatisés' },
        ]},
      { id: 'p4', name: 'Phase 4 — Domination', period: '2027', status: 'planifie', label: 'Planifié', progress: 0, color: '#a855f7',
        milestones: [
          { label: 'Marketplace d\'agents', detail: 'Catalogue public, souscription en ligne' },
          { label: 'Agents auto-apprenants', detail: 'Fine-tuning continu sur données clients' },
          { label: 'Expansion internationale', detail: 'Agents multilingues, FR/BE/CH/CA' },
        ]}
    ]
  },
  metrics: {
    title: 'Métriques', subtitle: 'Les indicateurs clés de la bascule',
    items: [
      { label: 'Agents en production', current: 11, target: 15, unit: '', trend: 'up' },
      { label: 'Agents robustes', current: 3, target: 8, unit: '', trend: 'up' },
      { label: 'Clients actifs', current: 2, target: 5, unit: '', trend: 'up' },
      { label: 'Articles/mois', current: 4, target: 8, unit: '', trend: 'down' },
      { label: 'Tâches CRM/sem.', current: 45, target: 100, unit: '', trend: 'up' },
      { label: 'Délai prod (j)', current: 3, target: 1, unit: 'j', trend: 'down' },
    ]
  },
  actions: {
    title: 'Plan d\'action', subtitle: 'Vos prochaines actions prioritaires',
    items: [
      { id: 'a1', text: 'Finaliser le schéma CRM unifié', detail: 'Valider les champs avec tous les agents', priority: 'haute' },
      { id: 'a2', text: 'Déployer le site LSD Agents', detail: 'Vitrine institutionnelle, catalogue d\'agents', priority: 'haute' },
      { id: 'a3', text: 'Lancer le digest CRM hebdomadaire', detail: 'Résumé automatique chaque vendredi 18h', priority: 'moyenne' },
      { id: 'a4', text: 'Optimiser le Prospector (routine 8h)', detail: 'Script de veille LinkedIn automatisée', priority: 'haute' },
      { id: 'a5', text: 'Produire 2 témoignages clients vidéo', detail: 'Flora + MCB, montage < 48h', priority: 'moyenne' },
      { id: 'a6', text: 'Créer le portail client dashboard', detail: 'Vue client sur l\'activité de ses agents', priority: 'moyenne' },
      { id: 'a7', text: 'Redéfinir la mission Target Hunter', detail: 'Scinder Prospector : veille vs sourcing', priority: 'haute' },
      { id: 'a8', text: 'Auditer les performances SEO du site', detail: 'GSC, Analytics, plan d\'optimisation', priority: 'moyenne' },
    ]
  }
};

// ── tsParticles ────────────────────────────────
async function initParticles() {
  if (typeof tsParticles === 'undefined') return;
  await tsParticles.load({
    id: 'particles',
    options: {
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: { value: 40, density: { enable: true } },
        color: { value: state.theme === 'light' ? '#3b82f6' : '#22d3ee' },
        links: {
          enable: true,
          distance: 150,
          color: state.theme === 'light' ? '#94a3b8' : '#3b82f6',
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none',
          random: true,
          straight: false,
          outModes: 'bounce',
        },
        size: { value: { min: 1, max: 3 } },
        opacity: { value: 0.5 },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.3 } },
        },
      },
      detectRetina: true,
    }
  });
}

async function updateParticlesTheme() {
  if (typeof tsParticles === 'undefined') return;
  const container = tsParticles.domItem(0);
  if (!container) return;
  const isLight = state.theme === 'light';
  container.options.particles.color.value = isLight ? '#3b82f6' : '#22d3ee';
  container.options.particles.links.color = isLight ? '#94a3b8' : '#3b82f6';
  await container.refresh();
}

// ── Confetti ───────────────────────────────────
function fireConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add('active');

  const colors = ['#FF6B35', '#22d3ee', '#a855f7', '#10b981', '#f59e0b', '#3b82f6', '#ef4444'];
  const particles = [];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 4,
      h: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 5,
      opacity: 1,
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.vy += 0.05;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      if (frame > 60) p.opacity -= 0.015;
      if (p.opacity <= 0) return;
      alive = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    frame++;
    if (alive && frame < 150) {
      confettiRAF = requestAnimationFrame(animate);
    } else {
      canvas.classList.remove('active');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  if (confettiRAF) cancelAnimationFrame(confettiRAF);
  animate();
}

// ── Theme ──────────────────────────────────────
function initTheme() {
  if (state.theme === 'light') document.body.classList.add('light');
  updateThemeToggle();
}

function toggleTheme() {
  document.body.classList.toggle('light');
  state.theme = document.body.classList.contains('light') ? 'light' : 'dark';
  updateThemeToggle();
  updateParticlesTheme();
  saveState();
}

function updateThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = state.theme === 'light' ? '☀️' : '🌙';
}

// ── Toast ──────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2000);
}

// ── Stepper navigation ────────────────────────
function updateStepper() {
  const steps = document.querySelectorAll('.step');
  const lines = document.querySelectorAll('.step-line');

  steps.forEach((btn, i) => {
    btn.classList.remove('active', 'completed');
    btn.removeAttribute('aria-current');
    btn.disabled = false;

    if (state.completedSteps.includes(i)) btn.classList.add('completed');
    if (i === state.currentStep) { btn.classList.add('active'); btn.setAttribute('aria-current', 'true'); }
  });

  lines.forEach((line, i) => {
    if (state.completedSteps.includes(i)) line.classList.add('done');
    else line.classList.remove('done');
  });

  document.getElementById('progressBadge').textContent = `${state.completedSteps.length}/6`;

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  prevBtn.disabled = state.currentStep === 0;
  nextBtn.textContent = state.currentStep === 5 ? '✓ Terminé' : 'Suivant →';

  // Step indicator dots
  const dots = document.getElementById('stepDots');
  dots.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement('span');
    dot.className = 'step-indicator-dot';
    if (state.completedSteps.includes(i)) dot.classList.add('done');
    if (i === state.currentStep) dot.classList.add('active');
    dots.appendChild(dot);
  }
}

// ── Step rendering ─────────────────────────────

// ── Diagnostic questions (room-specific, generated from past transcripts) ──
const diagnosticQuestions = [
  {
    id: 'q1', title: 'Quel est le vrai blocage du CRM cette semaine ?',
    opts: [
      { v: 'adresse', l: '📍 Adresse qui change à chaque relance — il faut un déploiement stable sur Vercel/GitHub' },
      { v: 'interface', l: '🖥️ Interface — on n\'a toujours pas les tâches cochables et le lettrage barré' },
      { v: 'protocole', l: '📋 Protocole — les autres agents ne savent pas encore interagir avec l\'agent CRM' },
      { v: 'donnees', l: '📥 Données — les transcriptions mails ne sont pas encore automatiquement intégrées' },
    ]
  },
  {
    id: 'q2', title: 'Mardi matin, où en est VRAIMENT l\'agent Sandra ?',
    opts: [
      { v: 'fiable', l: '✅ Pipeline fiable — on finalise les sorties propres ce matin' },
      { v: 'moyen', l: '⚠️ Itérations Codex moyennes — il faut encore corriger des erreurs d\'alignement' },
      { v: 'bifurquer', l: '🔄 Bifurquer — plutôt que reproduire son tableau artisanal, proposer une app de visualisation' },
      { v: 'appeler', l: '📞 Si blocage à midi, j\'appelle Sandra pour discuter d\'une solution applicative' },
    ]
  },
  {
    id: 'q3', title: 'Comment organiser le travail de Lilian cette semaine ?',
    opts: [
      { v: 'journee', l: '📅 Planning journée par journée — priorités du matin, ajustements le soir' },
      { v: 'semaine', l: '🎯 Objectifs semaine avec sous-objectifs, découpés en tâches dans le planning' },
      { v: 'longterme', l: '🗓️ Planning projet 2-3 semaines, réévalué chaque lundi' },
      { v: 'flottant', l: '🌊 Priorités flottantes — l\'important c\'est que Sandra et le CRM avancent' },
    ]
  },
  {
    id: 'q4', title: 'Quel niveau de supervision pour les agents de Laurent cette semaine ?',
    opts: [
      { v: 'audit', l: '🔍 Audit complet de chaque agent (fonctionnalités, outils, mémoire, problèmes) — livrable mardi' },
      { v: 'rapport', l: '📊 Rapport quotidien automatique (tokens, appels d\'outils, insatisfactions) — archivé si OK' },
      { v: 'continu', l: '🖧 Branchement sur OpenClaw de Laurent + monitoring continu, comme un administrateur' },
      { v: 'apres', l: '⏸️ On se concentre d\'abord sur Sandra et le CRM, le monitoring viendra après' },
    ]
  },
  {
    id: 'q5', title: 'Quelle est la priorité commerciale concrète pour cette semaine ?',
    opts: [
      { v: 'stabiliser', l: '🛡️ Stabiliser les agents existants (MCB, AC66, Sales Coach) avant de démarcher' },
      { v: 'site', l: '🌐 Finaliser le site LSD Agents avec le pricing validé (Pack Dirigeant 495€)' },
      { v: 'clients', l: '👥 Avancer sur les 2 clients actuels et trouver le 3ème — objectif 5 clients en production' },
      { v: 'prospection', l: '🎯 Préparer Target Interactif pour reprendre la prospection en fin de semaine' },
    ]
  }
];

function voterLabel(voter) {
  return voter === 'laurent' ? '👤 Laurent' : '👤 Lilian';
}

function voterHasAnswered(voter) {
  const answers = state.diagnostic[voter];
  return answers && Object.values(answers).every(v => v !== null);
}

function bothAnswered() {
  return voterHasAnswered('laurent') && voterHasAnswered('lilian');
}

function renderVoterSwitcher() {
  const current = state.diagnostic.currentVoter;
  const laurentDone = voterHasAnswered('laurent');
  const lilianDone = voterHasAnswered('lilian');

  let h = `<div class="voter-switcher">`;
  h += `<button class="voter-btn${current === 'laurent' ? ' active' : ''}${laurentDone ? ' done' : ''}" data-voter="laurent">`;
  h += `<span class="voter-avatar">👤</span><span class="voter-name">Laurent</span>`;
  if (laurentDone) h += `<span class="voter-check">✓</span>`;
  h += `</button>`;
  h += `<button class="voter-btn${current === 'lilian' ? ' active' : ''}${lilianDone ? ' done' : ''}" data-voter="lilian">`;
  h += `<span class="voter-avatar">👤</span><span class="voter-name">Lilian</span>`;
  if (lilianDone) h += `<span class="voter-check">✓</span>`;
  h += `</button>`;
  h += `</div>`;
  return h;
}

function renderDiagnosticQuestions(voter) {
  const answers = state.diagnostic[voter];
  let h = '';
  diagnosticQuestions.forEach(q => {
    h += `<div class="glass-card diagnostic-question"><h3>${q.title}</h3><div class="option-group">`;
    q.opts.forEach(o => {
      const sel = answers[q.id] === o.v ? ' selected' : '';
      h += `<button class="option-btn${sel}" data-q="${q.id}" data-v="${o.v}">${o.l}</button>`;
    });
    h += `</div></div>`;
  });
  return h;
}

function renderComparison() {
  const laurent = state.diagnostic.laurent;
  const lilian = state.diagnostic.lilian;
  let aligned = 0;
  let total = diagnosticQuestions.length;

  let h = `<div class="step-header"><span class="step-icon">🔬</span><h2>Comparaison du diagnostic</h2><p>Convergences et divergences entre les deux participants.</p></div>`;

  // Summary
  diagnosticQuestions.forEach(q => {
    if (laurent[q.id] === lilian[q.id]) aligned++;
  });
  const pct = Math.round((aligned / total) * 100);
  const alignColor = pct >= 80 ? 'var(--accent-emerald)' : pct >= 50 ? '#f59e0b' : '#ef4444';

  h += `<div class="comparison-summary" style="border-left: 4px solid ${alignColor}">`;
  h += `<div class="comp-summary-value" style="color:${alignColor}">${aligned}/${total} questions alignées (${pct}%)</div>`;
  h += `<div class="comp-summary-hint">${pct >= 80 ? '🟢 Forte convergence — vous êtes sur la même longueur d\'onde' : pct >= 50 ? '🟡 Alignement partiel — discutez les points de divergence' : '🔴 Divergence forte — prenez le temps d\'explorer vos différences de vision'}</div>`;
  h += `</div>`;

  // Per-question comparison
  diagnosticQuestions.forEach(q => {
    const same = laurent[q.id] === lilian[q.id];
    const laurentOpt = q.opts.find(o => o.v === laurent[q.id]);
    const lilianOpt = q.opts.find(o => o.v === lilian[q.id]);

    h += `<div class="comparison-card ${same ? 'aligned' : 'divergent'}">`;
    h += `<div class="comp-header"><span class="comp-icon">${same ? '✅' : '⚠️'}</span><h3>${q.title}</h3></div>`;
    h += `<div class="comp-answers">`;
    h += `<div class="comp-answer laurent"><span class="comp-voter">👤 Laurent</span><span class="comp-choice">${laurentOpt ? laurentOpt.l : '—'}</span></div>`;
    h += `<div class="comp-answer lilian"><span class="comp-voter">👤 Lilian</span><span class="comp-choice">${lilianOpt ? lilianOpt.l : '—'}</span></div>`;
    h += `</div></div>`;
  });

  // Button to switch back to voting
  h += `<div style="text-align:center;margin-top:1.5rem"><button class="btn-nav btn-primary" id="backToVote">✏️ Modifier les réponses</button></div>`;
  return h;
}

function renderStep0() {
  const currentVoter = state.diagnostic.currentVoter;

  // If both answered, show comparison
  if (bothAnswered()) {
    return renderComparison();
  }

  let h = `<div class="step-header"><span class="step-icon">🎯</span><h2>Diagnostic de la semaine</h2><p>5 questions pour aligner vos priorités. Chaque participant répond, puis comparez vos visions.</p></div>`;
  h += renderVoterSwitcher();
  h += `<div class="voter-hint">Répondez en tant que <strong>${voterLabel(currentVoter)}</strong></div>`;
  h += renderDiagnosticQuestions(currentVoter);
  h += `<div style="text-align:center;margin-top:1rem">`;
  if (voterHasAnswered(currentVoter)) {
    h += `<button class="btn-nav btn-primary" id="switchVoterBtn">Passer à l'autre participant →</button>`;
  } else {
    h += `<span style="color:var(--text-tertiary);font-size:0.82rem">Répondez aux 5 questions ci-dessus</span>`;
  }
  h += `</div>`;
  return h;
}

function renderStep1() {
  const eco = data.ecosystem;
  let h = `<div class="step-header"><span class="step-icon">🗺️</span><h2>${eco.title}</h2><p>${eco.subtitle}</p></div>`;

  eco.layers.forEach(l => {
    h += `<div class="layer-card"><h3 style="color:${l.color}">${l.icon} ${l.name} <span style="font-size:0.72rem;color:var(--text-tertiary);font-weight:400">(${l.agents.length} agents)</span></h3><div class="agent-grid">`;
    l.agents.forEach(a => {
      h += `<div class="agent-tag"><span class="agent-name">${a.name}</span><span class="agent-role">${a.role}</span><span class="maturity-badge maturity-${a.maturity}">${a.label}</span></div>`;
    });
    h += `</div></div>`;
  });

  h += `<div class="layer-card"><h3>🤝 Agents clients</h3><div class="agent-grid">`;
  eco.clients.forEach(c => {
    h += `<div class="agent-tag"><span class="agent-name">${c.name}</span><span class="agent-role">${c.client}</span><span class="maturity-badge maturity-production">En production</span></div>`;
  });
  h += `</div></div><p style="color:var(--text-tertiary);font-size:0.82rem;text-align:center;margin-top:0.5rem">🔗 ${eco.note}</p>`;
  return h;
}

function renderStep2() {
  const b = data.bascule;
  let h = `<div class="step-header"><span class="step-icon">🔄</span><h2>${b.title}</h2><p>${b.subtitle}</p></div>`;

  h += `<div class="bascule-grid">`;
  h += `<div class="bascule-panel past"><h3>⬅️ D'où l'on vient</h3><p class="bascule-model">${b.past.model}</p><ul class="checklist">`;
  b.past.items.forEach(i => h += `<li><div><strong>${i.label}</strong><br><span style="color:var(--text-tertiary);font-size:0.72rem">${i.desc}</span></div></li>`);
  h += `</ul></div>`;
  h += `<div class="bascule-arrow">⟶</div>`;
  h += `<div class="bascule-panel future"><h3>➡️ Où l'on va</h3><p class="bascule-model">${b.future.model}</p><ul class="checklist">`;
  b.future.items.forEach(i => h += `<li><div><strong>${i.label}</strong><br><span style="color:var(--text-tertiary);font-size:0.72rem">${i.desc}</span></div></li>`);
  h += `</ul></div></div>`;

  h += `<div class="glass-card"><h3 style="margin-bottom:1rem;text-align:center">🏛️ Les piliers de la bascule</h3><div class="pillars-grid">`;
  b.pillars.forEach(p => h += `<div class="pillar-item"><div class="pillar-icon">${p.icon}</div><div class="pillar-name">${p.name}</div><div class="pillar-desc">${p.desc}</div></div>`);
  h += `</div></div>`;
  return h;
}

function renderStep3() {
  const r = data.roadmap;
  let h = `<div class="step-header"><span class="step-icon">🛤️</span><h2>${r.title}</h2><p>${r.subtitle}</p></div>`;

  r.phases.forEach(p => {
    h += `<div class="phase-card"><div class="phase-header"><div><div class="phase-name">${p.name}</div><div class="phase-period">${p.period}</div></div><span class="status-badge status-${p.status}">${p.label}</span></div>`;
    h += `<div class="progress-track"><div class="progress-fill" style="width:${p.progress}%;background:linear-gradient(90deg,${p.color},${p.color}88)"></div></div>`;
    h += `<div class="milestones">`;
    p.milestones.forEach((m, mi) => {
      const key = `${p.id}-${mi}`;
      const done = state.roadmapChecks[key];
      h += `<div class="milestone-item${done ? ' done' : ''}" data-rk="${key}"><div class="milestone-check">${done ? '✓' : ''}</div><div><div class="milestone-label">${m.label}</div><div class="milestone-detail">${m.detail}</div></div></div>`;
    });
    h += `</div></div>`;
  });
  return h;
}

function renderStep4() {
  const m = data.metrics;
  let h = `<div class="step-header"><span class="step-icon">📊</span><h2>${m.title}</h2><p>${m.subtitle}</p></div><div class="metrics-grid">`;

  m.items.forEach(metric => {
    const pct = metric.target > 0 ? Math.min(100, Math.round((metric.current / metric.target) * 100)) : 0;
    const trend = metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→';
    const trendColor = metric.trend === 'up' ? 'var(--accent-emerald)' : metric.trend === 'down' ? '#ef4444' : 'var(--text-tertiary)';
    h += `<div class="metric-card"><div class="metric-label">${metric.label}</div><div class="metric-values"><span class="metric-current">${metric.current}<span class="metric-unit"> ${metric.unit}</span></span><span class="metric-target">Cible: ${metric.target} ${metric.unit}</span><span class="metric-trend" style="color:${trendColor}">${trend}</span></div><div class="metric-bar"><div class="metric-fill" style="width:${pct}%"></div></div></div>`;
  });

  h += `</div>`;
  return h;
}

function renderStep5() {
  const a = data.actions;
  const total = a.items.length;
  const done = a.items.filter(act => state.actionChecks[act.id]).length;
  const roadmapDone = Object.keys(state.roadmapChecks).filter(k => state.roadmapChecks[k]).length;
  const diagDone = bothAnswered();

  let h = `<div class="step-header"><span class="step-icon">✅</span><h2>${a.title}</h2><p>${a.subtitle}</p></div>`;

  h += `<div class="summary-box"><h3>📋 Votre progression</h3><div class="summary-stats">`;
  h += `<div class="summary-stat"><div class="stat-value">${state.completedSteps.length}/6</div><div class="stat-label">Étapes</div></div>`;
  h += `<div class="summary-stat"><div class="stat-value">${diagDone ? '✓' : '—'}</div><div class="stat-label">Diagnostic</div></div>`;
  h += `<div class="summary-stat"><div class="stat-value">${roadmapDone}</div><div class="stat-label">Jalons</div></div>`;
  h += `<div class="summary-stat"><div class="stat-value">${done}/${total}</div><div class="stat-label">Actions</div></div>`;
  h += `</div></div>`;

  h += `<div class="action-list">`;
  a.items.forEach(act => {
    const isDone = state.actionChecks[act.id];
    h += `<div class="action-item${isDone ? ' done' : ''}" data-aid="${act.id}"><div class="action-check">${isDone ? '✓' : ''}</div><div class="action-content"><div class="action-text">${act.text}</div><div class="action-detail">${act.detail}</div></div><span class="action-priority priority-${act.priority}">${act.priority === 'haute' ? '🔴 Haute' : '🟡 Moy.'}</span></div>`;
  });
  h += `</div>`;
  return h;
}

const renderers = [renderStep0, renderStep1, renderStep2, renderStep3, renderStep4, renderStep5];

// ── Render ─────────────────────────────────────
function renderAll() {
  const content = document.getElementById('stepContent');
  content.innerHTML = renderers[state.currentStep]();
  updateStepper();
  attachListeners();

  // Animate step content
  if (typeof gsap !== 'undefined') {
    gsap.fromTo('#stepContent', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'all' });
  }

  // Animate headings with SplitType
  setTimeout(() => {
    if (typeof SplitType !== 'undefined') {
      try {
        document.querySelectorAll('.step-header h2').forEach(h2 => {
          const st = new SplitType(h2, { types: 'lines,words' });
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(st.words, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out' });
          }
        });
      } catch(e) {}
    }
  }, 50);

  window.scrollTo({ top: 0, behavior: 'instant' });
}

function attachListeners() {
  // Step 0: voter switcher
  document.querySelectorAll('.voter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const voter = btn.dataset.voter;
      state.diagnostic.currentVoter = voter;
      saveState();
      renderAll();
    });
  });

  // Step 0: options (per-voter)
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.q;
      const v = btn.dataset.v;
      const voter = state.diagnostic.currentVoter;
      btn.parentElement.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.diagnostic[voter][q] = v;
      saveState();
      showToast('Réponse enregistrée ✓');
      // If this was the last unanswered question, offer switch
      if (voterHasAnswered(voter)) {
        setTimeout(() => renderAll(), 600);
      }
    });
  });

  // Step 0: switch voter button
  const switchBtn = document.getElementById('switchVoterBtn');
  if (switchBtn) {
    switchBtn.addEventListener('click', () => {
      const other = state.diagnostic.currentVoter === 'laurent' ? 'lilian' : 'laurent';
      state.diagnostic.currentVoter = other;
      saveState();
      renderAll();
    });
  }

  // Step 0: back to vote from comparison
  const backBtn = document.getElementById('backToVote');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.diagnostic.currentVoter = 'laurent';
      saveState();
      renderAll();
    });
  }

  // Step 3: milestones
  document.querySelectorAll('.milestone-item').forEach(item => {
    item.addEventListener('click', () => {
      const key = item.dataset.rk;
      if (state.roadmapChecks[key]) {
        delete state.roadmapChecks[key];
        item.classList.remove('done');
        item.querySelector('.milestone-check').textContent = '';
      } else {
        state.roadmapChecks[key] = true;
        item.classList.add('done');
        item.querySelector('.milestone-check').textContent = '✓';
        // Small confetti burst on milestone completion
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(item.querySelector('.milestone-check'), { scale: 1.5 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
        }
      }
      saveState();
    });
  });

  // Step 5: actions
  document.querySelectorAll('.action-item').forEach(item => {
    item.addEventListener('click', () => {
      const aid = item.dataset.aid;
      if (state.actionChecks[aid]) {
        delete state.actionChecks[aid];
        item.classList.remove('done');
        item.querySelector('.action-check').textContent = '';
      } else {
        state.actionChecks[aid] = true;
        item.classList.add('done');
        item.querySelector('.action-check').textContent = '✓';
        // Check if all done
        const allDone = data.actions.items.every(a => state.actionChecks[a.id]);
        if (allDone) {
          setTimeout(() => fireConfetti(), 400);
          showToast('🎉 Toutes les actions sont complétées !');
        }
      }
      saveState();
      renderAll();
    });
  });
}

// ── Navigation ─────────────────────────────────
function goToStep(idx) {
  if (idx === state.currentStep) return;
  state.currentStep = idx;
  saveState();
  renderAll();
}

function nextStep() {
  if (!state.completedSteps.includes(state.currentStep)) {
    state.completedSteps.push(state.currentStep);
    // Fire confetti when completing step 5 (last)
    if (state.currentStep === 5) {
      setTimeout(() => fireConfetti(), 300);
      showToast('🎉 Guide terminé ! Félicitations !');
    }
  }
  if (state.currentStep < 5) state.currentStep++;
  saveState();
  renderAll();
}

function prevStep() {
  if (state.currentStep > 0) { state.currentStep--; saveState(); renderAll(); }
}

function resetState() {
  if (confirm('Réinitialiser toute votre progression ?')) {
    localStorage.removeItem(STORAGE_KEY);
    state = { ...defaultState };
    renderAll();
    showToast('Progression réinitialisée');
  }
}

// ── Keyboard ───────────────────────────────────
function onKeyDown(e) {
  if (e.key === 'ArrowRight' && !e.target.closest('button, input, textarea')) nextStep();
  else if (e.key === 'ArrowLeft' && !e.target.closest('button, input, textarea')) prevStep();
}

// ── Init ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  await initParticles();
  renderAll();

  document.querySelectorAll('.step').forEach(btn => {
    btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.step)));
  });

  document.getElementById('prevBtn').addEventListener('click', prevStep);
  document.getElementById('nextBtn').addEventListener('click', nextStep);
  document.getElementById('resetBtn').addEventListener('click', resetState);
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.addEventListener('keydown', onKeyDown);

  // Resize confetti canvas
  window.addEventListener('resize', () => {
    const c = document.getElementById('confetti');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  });

  // Animate initial elements
  if (typeof gsap !== 'undefined') {
    gsap.fromTo('.topbar', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
    gsap.fromTo('.stepper', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: 'power2.out' });
  }
});
